import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Admin } from 'src/admin/admin.entity';
import { MongoRepository } from 'typeorm';
import { Role } from '../Roles';
import { SingInUserDTO } from '../dtos/signinUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin) private adminRepository: MongoRepository<Admin>,
    private jwtService: JwtService,
  ) { }

  async signUp(admin: Admin): Promise<Admin> {
    const hash = await argon.hash(admin.mdp);
    admin.mdp = hash;
    const importing = admin.ImportExcel;
    const demande = admin.OperationsDemande;
    const ens = admin.OperationsEns;
    const etud = admin.OperationsEtud;
    const event = admin.OperationsEvent;
    const stat = admin.OperationsStats;
    const SuperAdmin = admin.SuperAdmin;
    if (importing == undefined) {
      admin.ImportExcel = true;
    }
    if (demande == undefined) {
      admin.OperationsDemande = true;
    }
    if (ens == undefined) {
      admin.OperationsEns = true;
    }
    if (etud == undefined) {
      admin.OperationsEtud = true;
    }
    if (event == undefined) {
      admin.OperationsEvent = true;
    }
    if (stat == undefined) {
      admin.OperationsStats = true;
    }
    if (SuperAdmin == undefined) {
      admin.SuperAdmin = false;
    }
    admin.roles = [Role.Admin];
    return this.adminRepository.save(admin);
  }

  async signIn(
    singInUserdto: SingInUserDTO,
  ): Promise<{ access_token: string }> {
    const user = await this.adminRepository.findOneBy({
      login: singInUserdto.login,
    });
    if (!user) {
      throw new NotFoundException('Admin Not found ... ! ');
    } else {
      const passwordVerify = await argon.verify(user.mdp, singInUserdto.mdp);
      if (!passwordVerify) {
        throw new ForbiddenException('Invalid Credentials ... ! ');
      } else {
        return this.signToken(user.idAdmin, user.mdp, user.roles);
      }
    }
  }
  async signToken(
    id: String,
    mdp: string,
    roles,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      mdp,
      roles,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: 'schoolManager',
      expiresIn: '15m',
    });
    return {
      access_token: access_token,
    };
  }
}

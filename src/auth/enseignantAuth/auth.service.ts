import { Enseignant } from './../../enseignant/enseignant.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { SingInUserDTO } from '../dtos/signinUser.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../Roles';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Enseignant)
    private enseignantRepository: MongoRepository<Enseignant>,
    private jwtService: JwtService,
  ) {}

  async signup(createAuth: Enseignant): Promise<Enseignant> {
    // hash the password
    const hash = await argon.hash(createAuth.mdp);
    // save the new hashed password
    createAuth.mdp = hash;
    createAuth.roles = [Role.Enseignant];
    return this.enseignantRepository.save(createAuth);
  }
  async signIn(signIndto: SingInUserDTO): Promise<{ access_token: string }> {
    const enseignant = await this.enseignantRepository.findOneBy({
      login: signIndto.login,
    });
    if (!enseignant) {
      throw new ForbiddenException('User not Found .. Please Verify !');
    } else {
      // verify the password with the hashed one , argon will convert it
      const passwordVerify = argon.verify(enseignant.mdp, signIndto.mdp);
      if (!passwordVerify) {
        throw new ForbiddenException('Wrong Credentials...!');
      } else {
        return this.signToken(enseignant.idEnseignant, enseignant.mdp, enseignant.roles);
      }
    }
  }
  async signToken(
    id: string,
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

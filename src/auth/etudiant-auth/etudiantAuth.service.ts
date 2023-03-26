import { JwtStrategy } from './../strategy/jwt.strategy';
import { SingInUserDTO } from './../dtos/signinUser.dto';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../Roles';
import { EtudiantAlumni } from 'src/etudiant-alumni/etudiantAlumni.entity';

@Injectable()
export class EtudiantAuthService {
  constructor(
    @InjectRepository(EtudiantAlumni)
    private etudiantAlumniRepository: Repository<EtudiantAlumni>,
    @InjectRepository(EtudiantActuel)
    private etudiantActuelRepository: Repository<EtudiantActuel>,
    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,
    private jwtService: JwtService,
  ) {}

  async signUp(etudiant: Etudiant , userType: string): Promise<Etudiant> {
    const hash = await argon.hash(etudiant.mdp);
    etudiant.mdp = hash;
    etudiant.roles = [Role.Etudiant];
    if (userType === 'actuel') {
      return await this.etudiantActuelRepository.save(etudiant as EtudiantActuel);
    } else if (userType === 'alumni') {
      return await this.etudiantAlumniRepository.save(etudiant as EtudiantAlumni);
    } else {
      throw new Error('Invalid user type');
    }
  }

  async signIn(signInUser: SingInUserDTO): Promise<{ access_token: string }> {
    const etudiant: EtudiantAlumni = await this.etudiantAlumniRepository.findOneBy({
      login: signInUser.login,
    });
    if (!etudiant) {
      const etudiant: EtudiantActuel = await this.etudiantActuelRepository.findOneBy({
        login: signInUser.login,
      });
      if (!etudiant){
        throw new ForbiddenException('Etudiant not found');
      }else{
        const passwordVerify = await argon.verify(etudiant.mdp, signInUser.mdp);
        if (passwordVerify) {   
          return this.signToken(etudiant.EtudiantActId, etudiant.mdp, etudiant.roles);
        } else {
          throw new ForbiddenException('Invalid credentials ...');
        }
      }
    } else {
      const passwordVerify = await argon.verify(etudiant.mdp, signInUser.mdp);
      if (passwordVerify) {
        return this.signToken(etudiant.EtudiantAluId, etudiant.mdp, etudiant.roles);
      } else {
        throw new ForbiddenException('Invalid credentials ...');
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

import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { etudiantAuthController } from './etudiantAuth.controller';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { EtudiantAuthService } from './etudiantAuth.service';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { EtudiantAlumni } from 'src/etudiant-alumni/etudiantAlumni.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant, EtudiantActuel, EtudiantAlumni]), JwtModule.register({})],
  controllers: [etudiantAuthController],
  providers: [EtudiantAuthService, JwtStrategy],
})
export class EtudiantAuthModule {}

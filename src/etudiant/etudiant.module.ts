import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from './etudiant.entity';
import { EtudiantActuelModule } from 'src/etudiant-actuel/etudiant-actuel.module';
import { EtudiantAlumniModule } from 'src/etudiant-alumni/etudiant-alumni.module';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { EtudiantAlumni } from 'src/etudiant-alumni/etudiantAlumni.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Etudiant, EtudiantActuel, EtudiantAlumni]),EtudiantActuelModule,EtudiantAlumniModule],
  providers: [EtudiantService],
  controllers: [EtudiantController],
  exports:[EtudiantService]
})
export class EtudiantModule {}

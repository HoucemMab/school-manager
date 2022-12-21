import { Module } from '@nestjs/common';
import { EtudiantAlumniController } from './etudiant-alumni.controller';
import { EtudiantAlumniService } from './etudiant-alumni.service';

@Module({
  controllers: [EtudiantAlumniController],
  providers: [EtudiantAlumniService]
})
export class EtudiantAlumniModule {}

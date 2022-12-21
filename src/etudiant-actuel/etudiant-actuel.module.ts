import { Module } from '@nestjs/common';
import { EtudiantActuelController } from './etudiant-actuel.controller';
import { EtudiantActuelService } from './etudiant-actuel.service';

@Module({
  controllers: [EtudiantActuelController],
  providers: [EtudiantActuelService]
})
export class EtudiantActuelModule {}

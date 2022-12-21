import { Module } from '@nestjs/common';
import { EnseignantController } from './enseignant.controller';
import { EnseignantService } from './enseignant.service';

@Module({
  controllers: [EnseignantController],
  providers: [EnseignantService]
})
export class EnseignantModule {}

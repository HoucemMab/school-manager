import { Module } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { EvenementController } from './evenement.controller';

@Module({
  providers: [EvenementService],
  controllers: [EvenementController]
})
export class EvenementModule {}

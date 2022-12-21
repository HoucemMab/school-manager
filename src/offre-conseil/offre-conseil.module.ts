import { Module } from '@nestjs/common';
import { OffreConseilService } from './offre-conseil.service';
import { OffreConseilController } from './offre-conseil.controller';

@Module({
  providers: [OffreConseilService],
  controllers: [OffreConseilController]
})
export class OffreConseilModule {}

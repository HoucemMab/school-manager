import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { OffreConseilService } from './offre-conseil.service';
import { OffreConseilController } from './offre-conseil.controller';
import { OffreConseil } from './offreConseil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OffreConseil])],
  providers: [OffreConseilService],
  controllers: [OffreConseilController]
})
export class OffreConseilModule {}

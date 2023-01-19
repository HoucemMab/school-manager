import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ParticipationController } from './participation.controller';
import { Participation } from './participation.entity';
import { ParticipationService } from './participation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participation])],
  controllers: [ParticipationController],
  providers: [ParticipationService]
})
export class ParticipationModule {}

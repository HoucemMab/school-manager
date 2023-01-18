import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { EvenementService } from './evenement.service';
import { Evenement } from './evenement.entity';
import { EvenementController } from './evenement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evenement])],
  providers: [EvenementService],
  controllers: [EvenementController]
})
export class EvenementModule {}

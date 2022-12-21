import { Module } from '@nestjs/common';
import { StageEteController } from './stage-ete.controller';
import { StageEteService } from './stage-ete.service';

@Module({
  controllers: [StageEteController],
  providers: [StageEteService]
})
export class StageEteModule {}

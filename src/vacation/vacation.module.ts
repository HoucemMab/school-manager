import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from './vacation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation])],
  providers: [VacationService],
  controllers: [VacationController]
})
export class VacationModule {}

import { Module } from '@nestjs/common';
import { ContratExpertController } from './contrat-expert.controller';
import { ContratExpertService } from './contrat-expert.service';
import { ContratExpert } from './contrat-expert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContratExpert])],
  controllers: [ContratExpertController],
  providers: [ContratExpertService]
})
export class ContratExpertModule {}

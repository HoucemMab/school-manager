import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PfaController } from './pfa.controller';
import { PfaService } from './pfa.service';
import { Pfa } from './pfa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pfa])],
  controllers: [PfaController],
  providers: [PfaService],
})
export class PfaModule {}

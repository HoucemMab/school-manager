import { Module } from '@nestjs/common';
import { PfeService } from './pfe.service';
import { PfeController } from './pfe.controller';

@Module({
  providers: [PfeService],
  controllers: [PfeController]
})
export class PfeModule {}

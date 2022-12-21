import { Module } from '@nestjs/common';
import { PfaController } from './pfa.controller';
import { PfaService } from './pfa.service';

@Module({
  controllers: [PfaController],
  providers: [PfaService]
})
export class PfaModule {}

import { Module } from '@nestjs/common';
import { ResponsableController } from './responsable.controller';
import { ResponsableService } from './responsable.service';

@Module({
  controllers: [ResponsableController],
  providers: [ResponsableService]
})
export class ResponsableModule {}

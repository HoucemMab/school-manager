import { Module } from '@nestjs/common';
import { PfeService } from './pfe.service';
import { PfeController } from './pfe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pfe } from './pfe.entity';
import { NotificationServiceGateway } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pfe]), NotificationModule],
  providers: [PfeService],
  controllers: [PfeController],
  exports: [PfeService],
})
export class PfeModule {}

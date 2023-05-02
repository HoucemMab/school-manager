import { Module } from '@nestjs/common';
import { NotificationServiceGateway } from './notification.service';
import { NotificationController } from './notification.controller';
import { EtudiantActuelModule } from 'src/etudiant-actuel/etudiant-actuel.module';
import { NotificationEntity } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationController],
  providers: [NotificationServiceGateway],
  exports: [NotificationServiceGateway],
})
export class NotificationModule {}

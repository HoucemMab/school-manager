import { MailingService } from './../mailing/mailing.service';
import { EtudiantActuel } from './etudiantActuel.entity';
import { Module } from '@nestjs/common';
import { EtudiantActuelController } from './etudiant-actuel.controller';
import { EtudiantActuelService } from './etudiant-actuel.service';
import { MailingModule } from 'src/mailing/mailing.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EtudiantActuel]), MailingModule],
  controllers: [EtudiantActuelController],
  providers: [EtudiantActuelService],
  exports:[EtudiantActuelService]

})
export class EtudiantActuelModule {}

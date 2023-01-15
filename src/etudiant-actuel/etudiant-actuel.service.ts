import { EtudiantActuel } from './etudiantActuel.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { MongoRepository } from 'typeorm';

@Injectable()
export class EtudiantActuelService {
  constructor(
    private mailingService: MailingService,
    @InjectRepository(EtudiantActuel)
    private etudiantActuelRepository: MongoRepository<EtudiantActuel>,
  ) {}
  //Partie Mailling , A ne pas modifier
  //@Cron(new Date('October 15, 2023 08:30:00'))
  // async sendDiplomaMails() {
  //   const etudiants: EtudiantActuel[] =
  //     await this.etudiantActuelRepository.find();
  //   const email: String[] = [];
  //   const etudiantSansDiplome = etudiants.filter(
  //     (etudiant) => etudiant.dateObtentionDiplome == null,
  //   );
  //   etudiantSansDiplome.map(
  //     (e) => console.log(e),
  //     //   async (e) =>
  //     //     await this.mailingService.sendEmailToAddDiploma(e.email, e.nom),
  //     //
  //   );
  // }
  // async sendJobEmail() {
  //   const etudiants: Etudiant[] = await this.etudiantActuelRepository.find();
  //   etudiants.map((e) => this.mailingService.sendEmailToAddJob(e.email, e.nom));
  // }
}

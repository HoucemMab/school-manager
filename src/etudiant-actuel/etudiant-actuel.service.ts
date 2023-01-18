import { EtudiantActuel } from './etudiantActuel.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { MongoRepository } from 'typeorm';
import { getManager, Repository } from 'typeorm';
import { Etudianttoupdate } from './etudiantact.dto';


@Injectable()
export class EtudiantActuelService {
  constructor(
    private mailingService: MailingService,
    @InjectRepository(EtudiantActuel)
    private etudiantActuelRepository: MongoRepository<EtudiantActuel>,
    private etudiantrepository: Repository<EtudiantActuel>
  ) {
    
  }
  async get() {
    return await this.etudiantrepository.find();
}
async findOne(nom: any): Promise<EtudiantActuel> {
    const etudiant = this.etudiantrepository.findOneBy({
      EtudiantActId: nom,
    })
    if (!etudiant) {
        throw new ForbiddenException('Not found');
    }
    return etudiant;
}
async insertOne(EtudiantActuel: EtudiantActuel): Promise<EtudiantActuel> {
    return await this.etudiantrepository.save(EtudiantActuel);
}
async updateOne(EtudiantActuel: Etudianttoupdate) {
    const toUpdate: EtudiantActuel = await this.etudiantrepository.findOneBy({
      EtudiantActId: EtudiantActuel.id,
    });
    console.log(toUpdate);
    if (toUpdate) {

        return await this.etudiantrepository.save(toUpdate);
    } else {
        throw new ForbiddenException('Student not found .. !');
    }
}
async deleteOne(id: any) {
    const Etudiant: EtudiantActuel = await this.findOne(id);
    if (Etudiant) {
      return this.etudiantrepository.delete({ EtudiantActId: id });
    } else {
      throw new ForbiddenException('Error happened');
    }    }
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

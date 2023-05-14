import { EnseignantService } from './../enseignant/enseignant.service';
import { Enseignant } from './../enseignant/enseignant.entity';
import { PfeService } from './../pfe/pfe.service';
import { EtudiantActuel } from './etudiantActuel.entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { MongoRepository } from 'typeorm';
import { getManager, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Etudiantacttoupdate } from './etudiantact.dto';
import { Cv } from 'src/stage/entities/cv.entity';
import { StageEteService } from 'src/stage-ete/stage-ete.service';
import { StageEte } from 'src/stage-ete/stageEte.entity';
import * as argon from 'argon2';
import { Pfe } from 'src/pfe/pfe.entity';
import { NotificationServiceGateway } from 'src/notification/notification.service';

@Injectable()
export class EtudiantActuelService {
  constructor(
    private mailingService: MailingService,
    @InjectRepository(EtudiantActuel)
    private etudiantrepository: Repository<EtudiantActuel>,
    private stageEteService: StageEteService,
    private pfeService: PfeService,
    private enseignantService: EnseignantService,
    private notificationGatewayService: NotificationServiceGateway,
  ) {}
  async get() {
    return await this.etudiantrepository.find();
  }
  async findOne(id: string): Promise<EtudiantActuel> {
    const etudiant = await this.etudiantrepository.findOneBy({
      EtudiantActId: id,
    });
    console.log('from find ', etudiant);
    return etudiant;
  }
  async insertOne(EtudiantActuel: EtudiantActuel): Promise<EtudiantActuel> {
    const hash = await argon.hash(EtudiantActuel.mdp);
    console.log('hash ==>', hash);
    EtudiantActuel.mdp = hash;
    EtudiantActuel.Reussi = 0;
    console.log(' inserting ===>', EtudiantActuel);
    return await this.etudiantrepository.save(EtudiantActuel);
  }
  async updateOne(EtudiantActuel: Etudiantacttoupdate) {
    const toUpdate: EtudiantActuel = await this.etudiantrepository.findOneBy({
      EtudiantActId: EtudiantActuel.EtudiantActId,
    });
    console.log(toUpdate);
    if (toUpdate) {
      toUpdate.dateNaissance = EtudiantActuel.dateNaissance;
      toUpdate.nom = EtudiantActuel.nom;
      toUpdate.prenom = EtudiantActuel.prenom;
      toUpdate.pfa = EtudiantActuel.pfa;
      toUpdate.pfe = EtudiantActuel.pfe;
      toUpdate.login = EtudiantActuel.login;
      toUpdate.Classe = EtudiantActuel.Classe;
      toUpdate.stages = EtudiantActuel.stages;
      toUpdate.formation = EtudiantActuel.formation;
      toUpdate.email = EtudiantActuel.email;
      // toUpdate.mdp = EtudiantActuel.mdp;
      toUpdate.poste = EtudiantActuel.poste;
      toUpdate.niveau = EtudiantActuel.niveau;
      toUpdate.visibilite = EtudiantActuel.visibilite;
      toUpdate.anneEtudet = EtudiantActuel.anneEtudet;
      toUpdate.Reussi = EtudiantActuel.Reussi;

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
    }
  }
  async addstage(id: string, stage: StageEte) {
    const etudiant = await this.findOne(id);
    if (!etudiant) {
      throw new Error('Verify student Id');
    } else if (etudiant) {
      const stageCreated = await this.stageEteService.addStageEte(stage);
      console.log('From Service etudiantActuel', stageCreated);
      if (stageCreated) {
        etudiant.stages.push(stageCreated);
      } else {
        throw new BadRequestException('Cannot Create Stage');
      }

      //(await etudiant).login=1234512345;
      return this.updateOne(etudiant);
    }
  }

  async addPFE(id: string, stage: Pfe) {
    const etudiant = await this.findOne(id);
    const enseignant: Enseignant =
      await this.enseignantService.getEnseignantById(stage.idEnseignant);
    if (!etudiant || !enseignant) {
      throw new Error('Vérifier les cordonnées saisie ! ');
    } else if (etudiant) {
      stage.idEtudiant = id;
      const stageCreated = await this.pfeService.addPfe(stage);
      console.log(stageCreated);
      if (stageCreated) {
        etudiant.pfe = stageCreated;
      } else {
        throw new BadRequestException('Cannot Create PFE');
      }

      //(await etudiant).login=1234512345;
      return this.updateOne(etudiant);
    }
  }

  async updatecv(id: string, cv: Cv) {
    const etudiant = await this.findOne(id);
    if (etudiant) {
      etudiant.cv.Competences = cv.Competences;
      etudiant.cv.experience = cv.experience;
      etudiant.cv.formation = cv.formation;
      return await this.updateOne(etudiant);
    } else {
      throw new ForbiddenException('Wrong Student Id ');
    }
  }

  async getPfe() {
    let pfeList = await this.pfeService.findAllPfe();

    let formztedList = Promise.all(
      pfeList.map(async (pfeEle) => {
        return {
          ...pfeEle,
          etudiant: {
            ...(await this.etudiantrepository.findOneBy({
              EtudiantActId: pfeEle.idEtudiant,
            })),
            mdp: undefined,
          },
        };
      }),
    );
    console.log('form', formztedList);
    return formztedList;
  }
  //Partie Mailling , A ne pas modifier

  @Cron(new Date('October 15, 2023 08:30:00'))
  @Cron(new Date('July 15, 2023 08:30:00'))
  async sendDiplomaMails() {
    const etudiants: EtudiantActuel[] = await this.etudiantrepository.find();
    const etudiantSansDiplome = etudiants.filter(
      (etudiant) => etudiant.dateObtentionDiplome == null,
    );
    etudiantSansDiplome.map(async (e) => {
      await this.mailingService.sendEmailToAddDiploma(e.email, e.nom),
        await this.notificationGatewayService.sendDiplomaNotification(
          e.EtudiantActId,
          'Veuillez Ajouter Votre diplome ..! ',
        );
    });
  }
  // @Cron('0 0 1 */6 *')
  async sendJobEmail() {
    const etudiants: Etudiant[] = await this.etudiantrepository.find();
    etudiants.map(async (e) => {
      this.mailingService.sendEmailToAddJob(e.email, e.nom),
        await this.notificationGatewayService.sendJobNotification(
          e.login.toString(),
          "Si vous avez decrocher une nouvelle oppurtunité , Veuillez l'ajouter S'il vous plait . Merci :) !",
        );
    });
  }
}

import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { MongoRepository, Repository } from 'typeorm';
import { UpdateEvenementDto } from './dto/updateEvenement.dto';
import { Evenement } from './evenement.entity';
import { AnneuniversitaireService } from 'src/anneuniversitaire/anneuniversitaire.service';
import { CreateEvenementDto } from './dto/createEvent.dto';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private evenementRepository: MongoRepository<Evenement>,
    private anneUniversitaireService: AnneuniversitaireService,
  ) {}

  async addEvenement(evenement: CreateEvenementDto): Promise<Evenement> {
    console.log(evenement.anneuniversitaireName);
    const anneUniversite = await this.anneUniversitaireService.findOne(
      evenement.anneuniversitaireName,
    );
    console.log(anneUniversite);
    const event: Evenement = new Evenement();
    event.anneuniversitaire = anneUniversite;
    event.dateEvenement = evenement.dateEvenement;
    event.description = evenement.description;
    event.nom = evenement.nom;

    return await this.evenementRepository.save(event);
  }

  async findAll(): Promise<Evenement[]> {
    return this.evenementRepository.find();
  }

  async findEvenementById(id: string): Promise<Evenement> {
    const evenement: Evenement = await this.evenementRepository.findOneBy({
      idEvenement: id,
    });
    console.log(evenement, id);
    if (!evenement) {
      throw new ForbiddenException('Event Not Found');
    } else {
      return evenement;
    }
  }

  async deleteEvenement(id: string): Promise<Evenement> {
    const evenement: Evenement = await this.evenementRepository.findOneBy({
      idEvenement: id,
    });
    if (!evenement) {
      throw new NotFoundException('Error');
    } else {
      await this.evenementRepository.delete({ idEvenement: id });
      return evenement;
    }
  }

  async updateEvenement(
    updateEvenementDto: UpdateEvenementDto,
  ): Promise<Evenement> {
    const toUpdate: Evenement = await this.evenementRepository.findOneBy({
      idEvenement: updateEvenementDto.idEvenement,
    });
    console.log(toUpdate);
    if (toUpdate) {
      toUpdate.nom = updateEvenementDto.nom;
      toUpdate.dateEvenement = updateEvenementDto.dateEvenement;
      toUpdate.description = updateEvenementDto.description;
      return await this.evenementRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Evenement not found .. !');
    }
  }
}

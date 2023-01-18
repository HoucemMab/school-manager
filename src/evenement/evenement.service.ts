import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEvenementDto } from './dto/updateEvenement.dto';
import { Evenement } from './evenement.entity';

@Injectable()
export class EvenementService {
    
    constructor(
        @InjectRepository(Evenement)
        private evenementRepository: Repository<Evenement>,
    ) {}

    async addEvenement(evenement: Evenement): Promise<Evenement> {
        return this.evenementRepository.save(evenement);
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
          throw new ForbiddenException('Error');
        } else {
          return evenement;
        }
    }

    async deleteEvenement(id: string): Promise<Evenement> {
        const evenement: Evenement = await this.evenementRepository.findOneBy({ idEvenement: id });
        if (!evenement) {
            throw new NotFoundException('Error');
        } else {
            await this.evenementRepository.delete({ idEvenement: id });
            return evenement;
        }
    }

    async updateEvenement(updateEvenementDto: UpdateEvenementDto): Promise<Evenement> {
        const toUpdate: Evenement = await this.evenementRepository.findOneBy({
            idEvenement: updateEvenementDto.idEvenement,
        });
        if (toUpdate) {
          toUpdate.nom = updateEvenementDto.nom;
          toUpdate.dateEvenement = updateEvenementDto.dateEvenement;
          return await this.evenementRepository.save(toUpdate);
        } else {
          throw new ForbiddenException('Evenement not found .. !');
        }
    }
}

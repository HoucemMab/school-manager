import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { Evenement } from 'src/evenement/evenement.entity';
import { MongoRepository } from 'typeorm';
import { Participation } from './participation.entity';

@Injectable()
export class ParticipationService {

    constructor(
        @InjectRepository(Participation) 
        private participationRepository: MongoRepository<Participation>
    ) {}

    async addParticipation(participation:Participation): Promise<Participation> {
        participation.validite=false;
        const date = new Date();
        participation.dateParticipation= date;
        return await this.participationRepository.save(participation);
    }


}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratExpert } from './contrat-expert.entity';
import { CreateContratExpertDto } from './dtos/createContratExpert.dto';

@Injectable()
export class ContratExpertService {
    constructor(
        @InjectRepository(ContratExpert)
        private contratExpertRepository: Repository<ContratExpert>,
    ) {}

    async create(createContratExpertDto: CreateContratExpertDto): Promise<ContratExpert> {
        const contratExpert = new ContratExpert();
        let id=0;
        let vac: ContratExpert = await this.contratExpertRepository.findOneBy(
            {
                idContratExpert: id.toString(),
            },
        );
        while(vac!=null){
            id++;
            vac = await this.contratExpertRepository.findOneBy(
                {
                    idContratExpert: id.toString(),
                },
            );
        }
        contratExpert.idContratExpert=id.toString();
        contratExpert.titre = createContratExpertDto.titre;
        contratExpert.description = createContratExpertDto.description;
        contratExpert.EtudiantAluId = createContratExpertDto.EtudiantAluId;
        contratExpert.competences = createContratExpertDto.competences;
        contratExpert.accepted=false;
    
        return this.contratExpertRepository.save(contratExpert);
      }

    async getAll(): Promise<ContratExpert[]> {
        return this.contratExpertRepository.find();
    }

    async getContratExpertById(id: string): Promise<ContratExpert> {
        const contratExpert: ContratExpert = await this.contratExpertRepository.findOneBy(
            {
            idContratExpert: id,
            },
        );
        if (!contratExpert) {
            throw new ForbiddenException('Error');
        } else {
            return contratExpert;
        }
    }
}

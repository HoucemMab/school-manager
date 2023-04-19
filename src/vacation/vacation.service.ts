import { ForbiddenException, Injectable } from '@nestjs/common';
import { Vacation } from './vacation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVacationDto } from './dtos/createVacation.dto';

@Injectable()
export class VacationService {
    constructor(
        @InjectRepository(Vacation)
        private vacationRepository: Repository<Vacation>,
    ) {}

    async create(createVacationDto: CreateVacationDto): Promise<Vacation> {
        const vacation = new Vacation();
        let id=0;
        let vac: Vacation = await this.vacationRepository.findOneBy(
            {
                idVacation: id.toString(),
            },
        );
        while(vac!=null){
            id++;
            vac = await this.vacationRepository.findOneBy(
                {
                    idVacation: id.toString(),
                },
            );
        }
        vacation.idVacation=id.toString();
        vacation.titre = createVacationDto.titre;
        vacation.description = createVacationDto.description;
        vacation.EtudiantAluId = createVacationDto.EtudiantAluId;
        vacation.competences = createVacationDto.competences;
        vacation.accepted=false;
    
        return this.vacationRepository.save(vacation);
      }

    async getAll(): Promise<Vacation[]> {
    return this.vacationRepository.find();
    }

    async getVacationById(id: string): Promise<Vacation> {
    const vacation: Vacation = await this.vacationRepository.findOneBy(
        {
        idVacation: id,
        },
    );
    if (!vacation) {
        throw new ForbiddenException('Error');
    } else {
        return vacation;
    }
    }
}

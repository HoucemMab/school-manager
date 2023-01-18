import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EtudiantAlumanitoupdate } from './etudiantalu.dto';
import { EtudiantAlumni } from './etudiantAlumni.entity';

@Injectable()
export class EtudiantAlumniService {
    constructor(
        @InjectRepository(EtudiantAlumni)
        private etudiantrepository: Repository<EtudiantAlumni>) { }
        async get() {
            return await this.etudiantrepository.find();
        }
        async findOne(nom: any): Promise<EtudiantAlumni> {
            const etudiant = this.etudiantrepository.findOneBy({
                EtudiantAluId: nom,
            })
            if (!etudiant) {
                throw new ForbiddenException('Not found');
            }
            return etudiant;
        }
        async insertOne(EtudiantAlumni: EtudiantAlumni): Promise<EtudiantAlumni> {
            return await this.etudiantrepository.save(EtudiantAlumni);
        }
        async updateOne(EtudiantAlumni: EtudiantAlumanitoupdate) {
            const toUpdate: EtudiantAlumni = await this.etudiantrepository.findOneBy({
                EtudiantAluId: EtudiantAlumni.id,
            });
            console.log(toUpdate);
            if (toUpdate) {
    
                return await this.etudiantrepository.save(toUpdate);
            } else {
                throw new ForbiddenException('Student not found .. !');
            }
        }
        async deleteOne(id: any) {
            const Etudiant: EtudiantAlumni = await this.findOne(id);
            if (Etudiant) {
              return this.etudiantrepository.delete({ EtudiantAluId: id });
            } else {
              throw new ForbiddenException('Error happened');
            }    }
}
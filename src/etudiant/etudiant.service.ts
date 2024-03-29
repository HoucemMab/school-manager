import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtudiantActuelService } from 'src/etudiant-actuel/etudiant-actuel.service';
import { EtudiantAlumniService } from 'src/etudiant-alumni/etudiant-alumni.service';
import { Repository } from 'typeorm';
import { ChangerMdpEtudiant } from './dtos/changemdp.dto';
import { Etudiant } from './etudiant.entity';
import * as argon from 'argon2';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { EtudiantAlumni } from 'src/etudiant-alumni/etudiantAlumni.entity';

@Injectable()
export class EtudiantService {
    constructor(
        @InjectRepository(Etudiant)
        private etudiantrepository: Repository<Etudiant>,
        @InjectRepository(EtudiantActuel)
        private etudiantactuelrepository: Repository<EtudiantActuel>,
        @InjectRepository(EtudiantAlumni)
        private etudiantalumnirepository: Repository<EtudiantAlumni>,
        private alumniservice: EtudiantAlumniService,
        private actuelservice: EtudiantActuelService,) { }

    async get() {
        const etudiantactuel = await this.actuelservice.get();
        const etudiantalu = await this.alumniservice.get();

   let all = [...etudiantactuel,...etudiantalu];
   return all;



    } async findOne(id: any): Promise<Etudiant> {

        const etudiantactuel = await this.actuelservice.findOne(id);
        if (etudiantactuel) {
            return etudiantactuel;
        } else {
            const etudiantalumni = await this.alumniservice.findOne(id);
            if (etudiantalumni) {
                return etudiantalumni;
            } else {
                throw new ForbiddenException('Not found');

            }

        }
    }
    async insertOne(Etudiant: Etudiant): Promise<Etudiant> {
        return await this.etudiantrepository.save(Etudiant);
    }
    /* async updateOne(Etudiant: Etudianttoupdate) {
         const toUpdate: Etudiant = await this.etudiantrepository.findOneBy({
             EtudiantId: Etudiant.id,
         });
         console.log(toUpdate);
         if (toUpdate) {
 
             return await this.etudiantrepository.save(toUpdate);
         } else {
             throw new ForbiddenException('Student not found .. !');
         }
     }
     async deleteOne(id: any) {
         const Etudiant: Etudiant = await this.findOne(id);
         if (Etudiant) {
             return this.etudiantrepository.delete({ EtudiantId: id });
         } else {
             throw new ForbiddenException('Error happened');
         }
     }*/

     async changerMdpEtudiant(
        changerMdpEtudiant: ChangerMdpEtudiant,
      ): Promise<Etudiant> {
        const etudiantactuel : EtudiantActuel  =  await this.etudiantactuelrepository.findOneBy({
            EtudiantActId: changerMdpEtudiant.id,
          });
        if (etudiantactuel != null) {
            const isPasswordCorrect = await argon.verify(etudiantactuel.mdp, changerMdpEtudiant.oldmdp);
            if (!isPasswordCorrect) {
                throw new ForbiddenException('Current password is incorrect');
            } else{
                etudiantactuel.mdp = await argon.hash(changerMdpEtudiant.mdp);
                return this.etudiantactuelrepository.save(etudiantactuel);
            }  
        } else {
            const etudiantalumni : EtudiantAlumni = await this.etudiantalumnirepository.findOneBy({
                EtudiantAluId: changerMdpEtudiant.id,
              });
            if (etudiantalumni != null) {
                
                const isPasswordCorrect = await argon.verify(etudiantalumni.mdp, changerMdpEtudiant.oldmdp);
                if (!isPasswordCorrect) {
                    throw new ForbiddenException('Current password is incorrect');
                } else{
                    etudiantalumni.mdp = await argon.hash(changerMdpEtudiant.mdp);
                    return this.etudiantalumnirepository.save(etudiantalumni);
                }  
            } else {
                throw new ForbiddenException('Etudiant Not Found');
            }
        }
      }
}

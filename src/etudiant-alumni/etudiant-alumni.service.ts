import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from 'src/stage/entities/cv.entity';
import { Repository } from 'typeorm';
import { EtudiantAlumanitoupdate } from './etudiantalu.dto';
import { EtudiantAlumni } from './etudiantAlumni.entity';
import * as argon from 'argon2';
@Injectable()
export class EtudiantAlumniService {
  constructor(
    @InjectRepository(EtudiantAlumni)
    private etudiantrepository: Repository<EtudiantAlumni>,
  ) {}
  async get() {
    return await this.etudiantrepository.find();
  }
  async findOne(id: string): Promise<EtudiantAlumni> {
    const etudiant = await this.etudiantrepository.findOneBy({
      EtudiantAluId: id,
    });
    console.log('from find ', etudiant);
    return etudiant;
  }
  async insertOne(EtudiantAlumni: EtudiantAlumni): Promise<EtudiantAlumni> {
    const hash = await argon.hash(EtudiantAlumni.mdp);
    EtudiantAlumni.mdp = hash;
    return await this.etudiantrepository.save(EtudiantAlumni);
  }
  async insertAfterSucess(EtudiantAlumni: EtudiantAlumni): Promise<EtudiantAlumni> {
    return await this.etudiantrepository.save(EtudiantAlumni);
  }
  async updateOne(EtudiantAlumni: EtudiantAlumanitoupdate) {
    const toUpdate: EtudiantAlumni = await this.etudiantrepository.findOneBy({
      EtudiantAluId: EtudiantAlumni.EtudiantAluId,
    });
    console.log(toUpdate);
    toUpdate.dateNaissance = EtudiantAlumni.dateNaissance;
    toUpdate.email = EtudiantAlumni.email;
    toUpdate.nom = EtudiantAlumni.nom;
    toUpdate.prenom = EtudiantAlumni.prenom;
    toUpdate.societe = EtudiantAlumni.societe;
    toUpdate.pays = EtudiantAlumni.pays;
    if (toUpdate) {
      return await this.etudiantrepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Student not found .. !');
    }
  }
  async deleteOne(id: string) {
    const Etudiant: EtudiantAlumni = await this.findOne(id);
    console.log('Info etudiant', Etudiant);
    if (Etudiant) {
      return this.etudiantrepository.delete({ EtudiantAluId: id });
    } else {
      throw new ForbiddenException('Error happened');
    }
  }
  async stats() {
    const all = await this.get();
    const DateObtention: any = [];
    var counting = 0;

    const all_etudiants = (await all).reduce(
      (all_etudiants: { [key: string]: any }, item) => {
        const etudiant =
          all_etudiants[new Date(item.dateObtentionDiplome).getFullYear()] ||
          [];
        etudiant.push(item);
        all_etudiants[new Date(item.dateObtentionDiplome).getFullYear()] =
          etudiant;
        return all_etudiants;
      },
      {},
    );
    Object.keys(all_etudiants).map((etudiant) => {
      counting = 0;
      var y;
      const value = all_etudiants[etudiant];
      value.map((d: any) => {
        console.log(etudiant);
        y = new Date(d.dateObtentionDiplome).getFullYear();
        if (
          new Date(d.dateObtentionDiplome).getFullYear().toString() == etudiant
        ) {
          counting++;
        }
      }),
        DateObtention.push({
          DateObtention: etudiant,
          etudiant: counting,
        });
    });
    console.log(DateObtention);
    return DateObtention;
  }

  async countAlumniPerCountry() {
    const all = await this.get();
    const countryCounts: { [key: string]: number } = {};
  
    for (const alumni of all) {
      const country = alumni.pays;
      if (!countryCounts[country]) {
        countryCounts[country] = 1;
      } else {
        countryCounts[country]++;
      }
    }
  
    const results = [];
    for (const [country, count] of Object.entries(countryCounts)) {
      if (!country.includes('undefined')){results.push({ country, count });}
      
    }
  
    console.log(results);
    return results;
  }

  async countAlumniPerSociete() {
    const all = await this.get();
    const societeCounts: { [key: string]: number } = {};
  
    for (const alumni of all) {
      const societe = alumni.societe;
      if (!societeCounts[societe]) {
        societeCounts[societe] = 1;
      } else {
        societeCounts[societe]++;
      }
    }
  
    const results = [];
    for (const [societe, count] of Object.entries(societeCounts)) {
      if (!societe.includes('undefined')){results.push({ societe, count });}
    }
  
    console.log(results);
    return results;
  }

  async chomage() {
    try {
      const all = await this.get();
      let days = 0;
      let count = 0;
  
      all.forEach((etudiant) => {
        if (etudiant.dateEmbacuhe && etudiant.dateObtentionDiplome) {
          const diff =
            new Date(etudiant.dateEmbacuhe).getTime() -
            new Date(etudiant.dateObtentionDiplome).getTime();
  
          if (!isNaN(diff)) {
            days += diff;
            count++;
          }
        }
      });
  
      const avgDays = count > 0 ? days / (1000 * 60 * 60 * 24 * count) : 0;
      const roundedAvgDays = Number(avgDays.toFixed(2)); // Round to 2 decimal places

      console.log(`Count: ${count}, Total Days: ${days}, Avg Days: ${roundedAvgDays}`);
  
      return roundedAvgDays;
    } catch (error) {
      console.error(error);
      return NaN;
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

  async validerCompte(id : string) {
    const etudiant = await this.findOne(id);
    if (etudiant) {
      etudiant.verified = true;
      return await this.etudiantrepository.save(etudiant);
    } else {
      throw new ForbiddenException('Etudiant Inexistant')
    }
  }

  async refuserCompte(id : string) {
    const etudiant = await this.findOne(id);
    if (etudiant) {
      etudiant.verified = false;
      return await this.etudiantrepository.save(etudiant);
    } else {
      throw new ForbiddenException('Etudiant Inexistant')
    }
  }
}

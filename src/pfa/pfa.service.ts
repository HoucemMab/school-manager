import { UpdatePfaDto } from './dtos/updatePfa.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pfa } from './pfa.entity';
import { DeleteResult, MongoRepository } from 'typeorm';
import { EtudiantActuelService } from 'src/etudiant-actuel/etudiant-actuel.service';

@Injectable()
export class PfaService {
  constructor(
    @InjectRepository(Pfa) private pfaRepository: MongoRepository<Pfa>,
    private actuelservice: EtudiantActuelService
  ) { }

  async addPfa(pfa: Pfa): Promise<Pfa> {
    return this.pfaRepository.save(pfa);
  }
  async findAllPfa(): Promise<Pfa[]> {
    return this.pfaRepository.find();
  }

  async findPfaById(id: string): Promise<Pfa> {
    const pfa = await this.pfaRepository.findOneBy({
      idPfa: id,
    });
    console.log(pfa);
    if (!pfa) {
      throw new ForbiddenException('Not found');
    }
    return pfa;
  }
  async deletePfaById(id: string): Promise<DeleteResult> {
    const pfa: Pfa = await this.findPfaById(id);
    if (pfa) {
      return this.pfaRepository.delete({ idPfa: id });
    } else {
      throw new ForbiddenException('Error happened');
    }
  }
  async updatePfaById(updatePfaDto: UpdatePfaDto) {
    console.log(updatePfaDto);

    const toUpdate: Pfa = await this.pfaRepository.findOneBy({
      idPfa: updatePfaDto.idPfa,
    });
    console.log(toUpdate);
    if (toUpdate) {
      toUpdate.description = updatePfaDto.description;
      toUpdate.titre = updatePfaDto.titre;
      toUpdate.idEtudiant = updatePfaDto.idEtudiant;
      return await this.pfaRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Pfa not found .. !');
    }
  }
  async choosePfa(id: string, idEtudiant: string) {
    const pfa = await this.findPfaById(id);
    const etudiant =await this.actuelservice.findOne(idEtudiant);
    if (!pfa || !etudiant) {
      throw new ForbiddenException('Verify Student or Pfa Id');
    } else if (await this.verifyetudiant(idEtudiant) == true) {
      console.log("Error");
      console.log(etudiant);
      
      throw new ForbiddenException('Student already has a PFA ... !');
    } else if (pfa.nbEtudiants == pfa.idEtudiant.length) {
      throw new ForbiddenException('PFA has been already affected !');
    } else {
      pfa.idEtudiant.push(idEtudiant);
      return this.updatePfaById(pfa);
    }

  }
  async verifyetudiant(idEtudiant: string): Promise<boolean> {
    var has_A_Pfa = false;
    const allpfa = this.findAllPfa();
    (await allpfa).map((pfa) => {
      for (var i = 0; i < pfa.idEtudiant.length; i++) {
        if (pfa.idEtudiant[i] === idEtudiant) {
          has_A_Pfa = true;
        }
      }
    })
    return has_A_Pfa
  }
}

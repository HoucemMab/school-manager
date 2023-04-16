import { ChangerMdpEnseignant } from './dtos/changemdp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enseignant } from './enseignant.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { MongoRepository, DeleteResult } from 'typeorm';
import * as argon from 'argon2';
import { UpdateEnseignantDto } from './dtos/updateEnseignant.dto';

@Injectable()
export class EnseignantService {
  constructor(
    @InjectRepository(Enseignant)
    private enseignantRepository: MongoRepository<Enseignant>,
  ) {}
  async addEnseignant(enseignant: Enseignant): Promise<Enseignant> {
    enseignant.idEnseignant = enseignant.login.toString();
    return this.enseignantRepository.save(enseignant);
  }

  async getAllEnseignant(): Promise<Enseignant[]> {
    return this.enseignantRepository.find();
  }
  async getEnseignantById(id: string): Promise<Enseignant> {
    const enseignant: Enseignant = await this.enseignantRepository.findOneBy({
      idEnseignant: id,
    });
    console.log(enseignant, id);
    if (!enseignant) {
      throw new ForbiddenException('Error');
    } else {
      return enseignant;
    }
  }
  async deleteEnseignantById(id: string): Promise<DeleteResult> {
    const enseignant: Enseignant = await this.getEnseignantById(id);
    if (!enseignant) {
      throw new Error('Cannot Find User');
    } else {
      return await this.enseignantRepository.delete({ idEnseignant: id });
    }
  }

  async changerMdpEnseignant(
    changerMdpEnseignant: ChangerMdpEnseignant,
  ): Promise<Enseignant> {
    const enseignant: Enseignant = await this.getEnseignantById(
      changerMdpEnseignant.id,
    );
    if (!enseignant) {
      throw new ForbiddenException('Enseignant Not Found');
    } else {
      const isPasswordCorrect = await argon.verify(
        enseignant.mdp,
        changerMdpEnseignant.oldmdp,
      );
      if (!isPasswordCorrect) {
        throw new ForbiddenException('Current password is incorrect');
      } else {
        enseignant.mdp = await argon.hash(changerMdpEnseignant.mdp);
      }
    }
    return this.enseignantRepository.save(enseignant);
  }

  async updateEnseignant(
    updateEnseignantDto: UpdateEnseignantDto,
  ): Promise<Enseignant> {
    const toUpdate: Enseignant = await this.enseignantRepository.findOneBy({
      idEnseignant: updateEnseignantDto.idEnseignant,
    });
    if (toUpdate) {
      toUpdate.nom = updateEnseignantDto.nom;
      toUpdate.prenom = updateEnseignantDto.prenom;
      toUpdate.email = updateEnseignantDto.email;
      return await this.enseignantRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Enseignant not found .. !');
    }
  }
}

// Il manque voir cv etudiants
// Voir et choisir pfe

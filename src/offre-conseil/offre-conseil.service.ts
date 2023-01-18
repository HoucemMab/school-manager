import { Injectable,ForbiddenException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OffreConseil } from './offreConseil.entity';
import { MongoRepository } from 'typeorm';
import { UpdateOffreConseilDto } from './dto/updateOffreConseil.dto';

@Injectable()
export class OffreConseilService {
  constructor(
      @InjectRepository(OffreConseil) 
      private offreConseilRepository: MongoRepository<OffreConseil>,
  ) {}

  async addOffreConseil(offreConseil: OffreConseil): Promise<OffreConseil> {
      return this.offreConseilRepository.save(offreConseil);
  }

  async getAll(): Promise<OffreConseil[]> {
      return this.offreConseilRepository.find();
  }

  async getOffreConseilById(id: string): Promise<OffreConseil> {
      const offreConseil: OffreConseil = await this.offreConseilRepository.findOneBy({
        idOffreConseil: id,
      });
      console.log(offreConseil, id);
      if (!offreConseil) {
        throw new ForbiddenException('Error');
      } else {
        return offreConseil;
      }
  }

  async updateOffreConseil(updateOffreConseilDto: UpdateOffreConseilDto): Promise<OffreConseil> {
    const toUpdate: OffreConseil = await this.offreConseilRepository.findOneBy({
      idOffreConseil: updateOffreConseilDto.idOffreConseil,
    });
    if (toUpdate) {
      toUpdate.id_etudiant = updateOffreConseilDto.id_etudiant;
      toUpdate.contenu = updateOffreConseilDto.contenu;
      return await this.offreConseilRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('OffreConseil not found .. !');
    }
  }

  async deleteOffreConseil(id: string): Promise<OffreConseil> {
    const offreConseil: OffreConseil = await this.offreConseilRepository.findOneBy({ idOffreConseil: id });
    if (!offreConseil) {
        throw new NotFoundException('Error');
    } else {
        await this.offreConseilRepository.delete({ idOffreConseil: id });
        return offreConseil;
    }
  }

}
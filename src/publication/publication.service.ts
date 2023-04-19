import { Injectable,ForbiddenException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { MongoRepository } from 'typeorm';
import { UpdatePublicationDto } from './dto/updatePublication.dto';
import { CreatePublicationDto } from './dto/createPublication.dto';

@Injectable()
export class PublicationService {
  constructor(
      @InjectRepository(Publication) 
      private publicationRepository: MongoRepository<Publication>,
  ) {}

  async addPublication(createPublicationDto: CreatePublicationDto): Promise<Publication> {

    const publication = new Publication();
        let id=0;
        let pub: Publication = await this.publicationRepository.findOneBy(
            {
                idPublication: id.toString(),
            },
        );
        while(pub!=null){
            id++;
            pub = await this.publicationRepository.findOneBy(
                {
                    idPublication: id.toString(),
                },
            );
        }
        publication.idPublication=id.toString();
        publication.contenu = createPublicationDto.contenu;
        publication.type = createPublicationDto.type;
        publication.EtudiantAluId = createPublicationDto.EtudiantAluId;
      return this.publicationRepository.save(publication);
  }

  async getAll(): Promise<Publication[]> {
      return this.publicationRepository.find();
  }

  async getPublicationById(id: string): Promise<Publication> {
    const publication: Publication = await this.publicationRepository.findOneBy({
      idPublication: id,
    });
    console.log(publication, id);
    if (!publication) {
      throw new ForbiddenException('Error');
    } else {
      return publication;
    }
  }

  async updatePublication(updatePublicationDto: UpdatePublicationDto): Promise<Publication> {
    const toUpdate: Publication = await this.publicationRepository.findOneBy({
      idPublication: updatePublicationDto.idPublication,
    });
    if (toUpdate) {
      toUpdate.contenu = updatePublicationDto.contenu;
      toUpdate.type = updatePublicationDto.type;
      return await this.publicationRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Publication not found .. !');
    }
  }

  async deletePublication(id: string): Promise<Publication> {
    const publication: Publication = await this.publicationRepository.findOneBy({ idPublication: id });
    if (!publication) {
        throw new NotFoundException('Error');
    } else {
        await this.publicationRepository.delete({ idPublication: id });
        return publication;
    }
  }

}
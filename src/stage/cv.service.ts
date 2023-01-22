import { MongoRepository } from 'typeorm';
import { Injectable, ForbiddenException } from '@nestjs/common';

import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private CvRepository: MongoRepository<Cv>,
  ) {}
  create(createCv: Cv) {
    return this.CvRepository.save(createCv);
  }

  async findAll(): Promise<Cv[]> {
    return await this.CvRepository.find();
  }

  async findOne(id: string): Promise<Cv> {
    return await this.CvRepository.findOneBy({ idCv: id });
  }

  async update(id: string, updateCvDto: Cv): Promise<Cv> {
    let Cvtoupdate = await this.findOne(id);
    Cvtoupdate=updateCvDto;
    return await this.CvRepository.save(Cvtoupdate);
  }

  async remove(id: string) {
    const Cvtodelete = await this.findOne(id);
    if (Cvtodelete) {
      return await this.CvRepository.delete({ idCv: id });
    } else {
      throw new ForbiddenException('Impossible to delete this ... ! ');
    }
  }
}

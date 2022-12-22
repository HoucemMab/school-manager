import { UpdatePfaDto } from './dtos/updatePfa.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pfa } from './pfa.entity';
import { DeleteResult, MongoRepository } from 'typeorm';

@Injectable()
export class PfaService {
  constructor(
    @InjectRepository(Pfa) private pfaRepository: MongoRepository<Pfa>,
  ) {}

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
      idPfa: updatePfaDto.id,
    });
    console.log(toUpdate);
    if (toUpdate) {
      toUpdate.description = updatePfaDto.description;
      toUpdate.titre = updatePfaDto.titre;
      return await this.pfaRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Pfa not found .. !');
    }
  }
}

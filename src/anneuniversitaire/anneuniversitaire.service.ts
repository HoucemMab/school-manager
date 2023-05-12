import { Injectable } from '@nestjs/common';
import { CreateAnneuniversitaireDto } from './dto/create-anneuniversitaire.dto';
import { UpdateAnneuniversitaireDto } from './dto/update-anneuniversitaire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anneuniversitaire } from './entities/anneuniversitaire.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnneuniversitaireService {
  constructor(
    @InjectRepository(Anneuniversitaire)
    private anneUniversitaireRepository: Repository<Anneuniversitaire>,
  ) {}
  async create(
    createAnneuniversitaireDto: Anneuniversitaire,
  ): Promise<Anneuniversitaire> {
    return await this.anneUniversitaireRepository.save(
      createAnneuniversitaireDto,
    );
  }

  async findAll(): Promise<Anneuniversitaire[]> {
    return await this.anneUniversitaireRepository.find();
  }

  async findOne(a: string): Promise<Anneuniversitaire> {
    return await this.anneUniversitaireRepository.findOneBy({ anne: a });
  }

  async remove(id: string) {
    return await this.anneUniversitaireRepository.delete(id);
  }
}

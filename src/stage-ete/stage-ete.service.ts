import { EtudiantActuel } from './../etudiant-actuel/etudiantActuel.entity';
import { EtudiantActuelService } from 'src/etudiant-actuel/etudiant-actuel.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { StageEte } from './stageEte.entity';

@Injectable()
export class StageEteService {
  constructor(
    @InjectRepository(StageEte)
    private stageRepo: Repository<StageEte>,
  ) {}

  async addStageEte(stage: StageEte): Promise<StageEte> {
    const stageCreated: StageEte = await this.stageRepo.save(stage);

    return stageCreated;
  }
  async findAllStageEte(): Promise<StageEte[]> {
    return await this.stageRepo.find();
  }

  async findStageEteById(id: number): Promise<StageEte> {
    const StageEte = await this.stageRepo.findOneBy({
      idStage: id,
    });
    console.log(StageEte);
    if (!StageEte) {
      throw new ForbiddenException('Not found');
    }
    return StageEte;
  }
  async deleteStageEteById(id: number): Promise<DeleteResult> {
    const StageEte: StageEte = await this.findStageEteById(id);
    if (StageEte) {
      return this.stageRepo.delete({ idStage: id });
    } else {
      throw new ForbiddenException('Error happened');
    }
  }
}

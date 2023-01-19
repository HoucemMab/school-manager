import { MongoRepository } from 'typeorm';
import { Injectable, ForbiddenException } from '@nestjs/common';

import { Stage } from './entities/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage) private stageRepository: MongoRepository<Stage>,
  ) {}
  create(createStage: Stage) {
    return this.stageRepository.save(createStage);
  }

  async findAll(): Promise<Stage[]> {
    return await this.stageRepository.find();
  }

  async findOne(id: string): Promise<Stage> {
    return await this.stageRepository.findOneBy({ idStage: id });
  }

  async update(id: string, updateStageDto: string): Promise<Stage> {
    const stagetoupdate = await this.findOne(id);
    stagetoupdate.sujet = updateStageDto;
    return await this.stageRepository.save(stagetoupdate);
  }

  async remove(id: string) {
    const stagetodelete = await this.findOne(id);
    if (stagetodelete) {
      return await this.stageRepository.delete({ id: id });
    } else {
      throw new ForbiddenException('Impossible to delete this ... ! ');
    }
  }
}

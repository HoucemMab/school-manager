import { Test, TestingModule } from '@nestjs/testing';
import { StageEteController } from './stage-ete.controller';

describe('StageEteController', () => {
  let controller: StageEteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StageEteController],
    }).compile();

    controller = module.get<StageEteController>(StageEteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

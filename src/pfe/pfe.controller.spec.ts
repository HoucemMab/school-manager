import { Test, TestingModule } from '@nestjs/testing';
import { PfeController } from './pfe.controller';

describe('PfeController', () => {
  let controller: PfeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PfeController],
    }).compile();

    controller = module.get<PfeController>(PfeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

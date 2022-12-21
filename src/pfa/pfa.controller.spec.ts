import { Test, TestingModule } from '@nestjs/testing';
import { PfaController } from './pfa.controller';

describe('PfaController', () => {
  let controller: PfaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PfaController],
    }).compile();

    controller = module.get<PfaController>(PfaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

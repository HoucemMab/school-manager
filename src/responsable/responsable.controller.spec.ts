import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableController } from './responsable.controller';

describe('ResponsableController', () => {
  let controller: ResponsableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsableController],
    }).compile();

    controller = module.get<ResponsableController>(ResponsableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

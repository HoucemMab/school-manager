import { Test, TestingModule } from '@nestjs/testing';
import { EtudiantController } from './etudiant.controller';

describe('EtudiantController', () => {
  let controller: EtudiantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtudiantController],
    }).compile();

    controller = module.get<EtudiantController>(EtudiantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

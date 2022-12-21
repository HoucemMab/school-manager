import { Test, TestingModule } from '@nestjs/testing';
import { OffreConseilController } from './offre-conseil.controller';

describe('OffreConseilController', () => {
  let controller: OffreConseilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffreConseilController],
    }).compile();

    controller = module.get<OffreConseilController>(OffreConseilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

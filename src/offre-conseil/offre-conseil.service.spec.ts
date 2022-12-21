import { Test, TestingModule } from '@nestjs/testing';
import { OffreConseilService } from './offre-conseil.service';

describe('OffreConseilService', () => {
  let service: OffreConseilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffreConseilService],
    }).compile();

    service = module.get<OffreConseilService>(OffreConseilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

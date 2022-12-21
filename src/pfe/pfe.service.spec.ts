import { Test, TestingModule } from '@nestjs/testing';
import { PfeService } from './pfe.service';

describe('PfeService', () => {
  let service: PfeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PfeService],
    }).compile();

    service = module.get<PfeService>(PfeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

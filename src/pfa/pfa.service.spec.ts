import { Test, TestingModule } from '@nestjs/testing';
import { PfaService } from './pfa.service';

describe('PfaService', () => {
  let service: PfaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PfaService],
    }).compile();

    service = module.get<PfaService>(PfaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableService } from './responsable.service';

describe('ResponsableService', () => {
  let service: ResponsableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsableService],
    }).compile();

    service = module.get<ResponsableService>(ResponsableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

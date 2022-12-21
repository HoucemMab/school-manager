import { Test, TestingModule } from '@nestjs/testing';
import { StageEteService } from './stage-ete.service';

describe('StageEteService', () => {
  let service: StageEteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StageEteService],
    }).compile();

    service = module.get<StageEteService>(StageEteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

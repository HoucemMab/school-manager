import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContratExpert } from './contrat-expert.entity';
import { ContratExpertService } from './contrat-expert.service';
import { CreateContratExpertDto } from './dtos/createContratExpert.dto';

@Controller('contrat-expert')
export class ContratExpertController {
    constructor(private contratExpertService: ContratExpertService) {}
    
    @Post('/create')
    async addNewContratExpert(@Body() contratExpert: CreateContratExpertDto): Promise<ContratExpert> {
      return this.contratExpertService.create(contratExpert);
    }

    @Get()
    async getAll(): Promise<ContratExpert[]> {
    return this.contratExpertService.getAll();
    }

    @Get('/:id')
    async getContratExpertById(@Param() params): Promise<ContratExpert> {
    return this.contratExpertService.getContratExpertById(params.id);
    }
}

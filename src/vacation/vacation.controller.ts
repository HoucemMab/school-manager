import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { Vacation } from './vacation.entity';
import { CreateVacationDto } from './dtos/createVacation.dto';

@Controller('vacation')
export class VacationController {
    constructor(private vacationService: VacationService) {}
    
    @Post('/create')
    async addNewVacation(@Body() vacation: CreateVacationDto): Promise<Vacation> {
      return this.vacationService.create(vacation);
    }

    @Get()
    async getAll(): Promise<Vacation[]> {
    return this.vacationService.getAll();
    }

    @Get('/:id')
    async getVacationById(@Param() params): Promise<Vacation> {
    return this.vacationService.getVacationById(params.id);
    }
}

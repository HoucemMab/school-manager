import { Controller , Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateEvenementDto } from './dto/updateEvenement.dto';
import { Evenement } from './evenement.entity';
import { EvenementService } from './evenement.service';


@Controller('evenement')
export class EvenementController {
    constructor(private evenementService: EvenementService) {}

    @Post('/create')
    async addNewEvenement(@Body() evenement: Evenement): Promise<Evenement> {
        return this.evenementService.addEvenement(evenement);
    }

    @Get()
    async getAll(): Promise<Evenement[]> {
        return this.evenementService.findAll();
    }

    @Get('/:id')
    async getEvenementById(@Param() params): Promise<Evenement> {
        console.log(params);
        return this.evenementService.findEvenementById(params.id);
    }

    @Delete('/:id')
    async deleteEvenement(@Param() params): Promise<Evenement> {
        return this.evenementService.deleteEvenement(params.id);
    }

    @Put()
    async updateEvenement(@Body() evenement: UpdateEvenementDto): Promise<Evenement> {
        return this.evenementService.updateEvenement(evenement);
    }
}

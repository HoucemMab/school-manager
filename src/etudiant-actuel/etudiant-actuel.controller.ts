import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EtudiantActuelService } from './etudiant-actuel.service';
import { Etudianttoupdate } from './etudiantact.dto';
import { EtudiantActuel } from './etudiantActuel.entity';

@Controller('etudiant-actuel')
export class EtudiantActuelController {

    constructor(private etudiantactuel: EtudiantActuelService) { }

    @Get('/all')
    async getallEtudiantact(): Promise<EtudiantActuel[]> {
        return this.etudiantactuel.get();
    }

    @Get('/:nom')
    async getEtudiantActuel(@Param('nom') params:string): Promise<EtudiantActuel> {
        return await this.etudiantactuel.findOne(params);
    }
    @Post('/inserting')
    async addEdutact(@Body() EtudiantActuel: EtudiantActuel): Promise<EtudiantActuel> {
        return this.etudiantactuel.insertOne(EtudiantActuel);
    }
    @Delete('/:id')
    async deleteEtudact(@Param() params) {
        return await this.etudiantactuel.deleteOne(params.id);
    }

    @Put('update')
    async updateEtudact(@Body() updatestudent: Etudianttoupdate) {
        return await this.etudiantactuel.updateOne(updatestudent);
    }
}


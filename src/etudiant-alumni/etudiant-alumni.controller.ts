import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, Req } from '@nestjs/common/decorators';
import { EtudiantAlumniService } from './etudiant-alumni.service';
import { EtudiantAlumanitoupdate } from './etudiantalu.dto';
import { EtudiantAlumni } from './etudiantAlumni.entity';

@Controller('etudiant-alumni')
export class EtudiantAlumniController {
    constructor(private EtudiantAlumni: EtudiantAlumniService) {}

    @Get('/all')
    async getallEtudiantact(): Promise<EtudiantAlumni[]> {
        return this.EtudiantAlumni.get();
    }

    @Get('/:nom')
    async getEtudiantAlumni(@Param('nom') params:string): Promise<EtudiantAlumni> {
        return await this.EtudiantAlumni.findOne(params);
    }
    @Post('/inserting')
    async addEtudal(@Body() EtudiantAlumni: EtudiantAlumni): Promise<EtudiantAlumni> {
        return this.EtudiantAlumni.insertOne(EtudiantAlumni);
    }
    @Delete('/:id')
    async deleteEtudal(@Param() params) {
        return await this.EtudiantAlumni.deleteOne(params.id);
    }

    @Put('update')
    async updateEtudiantAl(@Body() updatestudent: EtudiantAlumanitoupdate) {
        return await this.EtudiantAlumni.updateOne(updatestudent);
    }

}

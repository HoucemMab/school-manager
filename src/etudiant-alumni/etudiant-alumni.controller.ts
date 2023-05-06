import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common/decorators';
import { Cv } from 'src/stage/entities/cv.entity';
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
  @Get('/stat')
  async getstats(): Promise<any> {
    return this.EtudiantAlumni.stats();
  }

  @Get('/paysstat')
  async getPaystats(): Promise<any> {
    return this.EtudiantAlumni.countAlumniPerCountry();
  }

  @Get('/societestat')
  async getSocietestats(): Promise<any> {
    return this.EtudiantAlumni.countAlumniPerSociete();
  }
  @Get('/chomage')
  async getchomage(): Promise<any> {
    return this.EtudiantAlumni.chomage();
  }
  @Get('/:id')
  async getEtudiantAlumni(
    @Param('id') params: string,
  ): Promise<EtudiantAlumni> {
    return await this.EtudiantAlumni.findOne(params);
  }
  @Post('/inserting')
  async addEtudal(
    @Body() EtudiantAlumni: EtudiantAlumni,
  ): Promise<EtudiantAlumni> {
    console.log(EtudiantAlumni);
    return this.EtudiantAlumni.insertOne(EtudiantAlumni);
  }
  @Post('/updateCv/:id')
  async addCv(@Param('id') id: string, @Body() cv: Cv) {
    return await this.EtudiantAlumni.updatecv(id, cv);
  }
  @Delete('/:id')
  async deleteEtudal(@Param('id') params: string) {
    return await this.EtudiantAlumni.deleteOne(params);
  }

  @Put('update')
  async updateEtudiantAl(@Body() updatestudent: EtudiantAlumanitoupdate) {
    return await this.EtudiantAlumni.updateOne(updatestudent);
  }

  @Put('valider/:id')
  async validerCompte(@Param('id') params : string){
    return await this.EtudiantAlumni.validerCompte(params);
  }

  @Put('refuser/:id')
  async refuserCompte(@Param('id') params : string){
    return await this.EtudiantAlumni.refuserCompte(params);
  }
}

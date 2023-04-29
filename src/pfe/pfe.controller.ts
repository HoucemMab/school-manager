import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EncadrantDto, UpdatePfeDto } from './pfe.dto';
import { Pfe } from './pfe.entity';
import { PfeService } from './pfe.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from 'src/auth/Roles';

@Controller('pfe')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class PfeController {
  constructor(private pfeService: PfeService) {}
  @Get()
  // @Roles(Role.Admin)
  async getAllPfe(): Promise<Pfe[]> {
    return this.pfeService.findAllPfe();
  }

  @Get('/enseignant/:id')
  async getPfeByEnseignant(@Param('id') id: string): Promise<Pfe[]> {
    return this.pfeService.findPfeByEnseignant(id);
  }
  @Get('/stat')
  async getstats(): Promise<any> {
    return this.pfeService.stats();
  }

  @Get('/:id')
  async getPfeById(@Param('id') params: string): Promise<Pfe> {
    console.log(params);
    return await this.pfeService.findPfeById(params);
  }
  @Post('/create')
  async addPfe(@Body() pfe: Pfe): Promise<Pfe> {
    console.log('Controller');

    return this.pfeService.addPfe(pfe);
  }
  @Delete('/:id')
  async deletePfe(@Param('id') params) {
    return await this.pfeService.deletePfeById(params);
  }

  @Put('/update')
  async updatePfe(@Body() updatePfadto: UpdatePfeDto) {
    return await this.pfeService.updatePfeById(updatePfadto);
  }
  @Post('/encadrant')
  async affectencadrant(@Body() toEncader: EncadrantDto) {
    const pfe = await this.pfeService.beEncadrant(
      toEncader.idpfe,
      toEncader.idEnseignant,
    );
    console.log(toEncader.idEnseignant);
    return pfe;
  }
}

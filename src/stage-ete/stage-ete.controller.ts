import { Controller, Post } from '@nestjs/common';
import { Body, Get, Param, UseGuards } from '@nestjs/common/decorators';
import { StageEteService } from './stage-ete.service';
import { StageEte } from './stageEte.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from 'src/auth/Roles';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stage-ete')
export class StageEteController {
  constructor(private StageSetrvice: StageEteService) {}
  @Get()
  async getallstages(): Promise<StageEte[]> {
    return this.StageSetrvice.findAllStageEte();
  }
  @Post('/post')
  @Roles(Role.Etudiant, Role.Admin)
  async postStage(@Body() stageEte: StageEte): Promise<StageEte> {
    return this.StageSetrvice.addStageEte(stageEte);
  }
}

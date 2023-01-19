import { UseGuards } from '@nestjs/common/decorators';
import { UpdatePfaDto } from './dtos/updatePfa.dto';
import { Pfa } from './pfa.entity';
import { PfaService } from './pfa.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/Roles';
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PfaController {
  constructor(private pfaService: PfaService) {}
  @Get('pfa')
  async getAllPfa(): Promise<Pfa[]> {
    return this.pfaService.findAllPfa();
  }
  @Get('pfa/:id')
  async getPfaById(@Param() params): Promise<Pfa> {
    return await this.pfaService.findPfaById(params.id);
  }

  @Post('pfa')
  @Roles(Role.Enseignant)
  async addPfa(@Body() pfa: Pfa): Promise<Pfa> {
    return this.pfaService.addPfa(pfa);
  }
  @Delete('pfa/:id')
  @Roles(Role.Enseignant)
  async deletePfa(@Param() params) {
    return await this.pfaService.deletePfaById(params.id);
  }

  @Put('pfa')
  @Roles(Role.Enseignant)
  async updatePfa(@Body() updatePfadto: UpdatePfaDto) {
    return await this.pfaService.updatePfaById(updatePfadto);
  }
}

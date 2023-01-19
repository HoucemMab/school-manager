import { UseGuards } from '@nestjs/common/decorators';
import { OffreConseilService } from './offre-conseil.service';
import { OffreConseil } from './offreConseil.entity';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UpdateOffreConseilDto } from './dto/updateOffreConseil.dto';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from 'src/auth/Roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('offre-conseil')
@UseGuards(JwtAuthGuard)
export class OffreConseilController {
  constructor(private offreConseilService: OffreConseilService) {}

  @Roles(Role.Etudiant)
  @Post('/create')
  async addNewOffreConseil(
    @Body() offreConseil: OffreConseil,
  ): Promise<OffreConseil> {
    return this.offreConseilService.addOffreConseil(offreConseil);
  }

  @Get()
  async getAll(): Promise<OffreConseil[]> {
    return this.offreConseilService.getAll();
  }

  @Get('/:id')
  async getOffreConseilById(@Param() params): Promise<OffreConseil> {
    console.log(params);
    return this.offreConseilService.getOffreConseilById(params.id);
  }

  @Put()
  async updateOffreConseil(
    @Body() offreConseil: UpdateOffreConseilDto,
  ): Promise<OffreConseil> {
    return this.offreConseilService.updateOffreConseil(offreConseil);
  }

  @Delete('/:id')
  async deleteOffreConseil(@Param() params): Promise<OffreConseil> {
    return this.offreConseilService.deleteOffreConseil(params.id);
  }
}

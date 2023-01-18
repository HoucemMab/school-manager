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

@Controller('offre-conseil')
export class OffreConseilController {
  
  constructor(private offreConseilService: OffreConseilService) {}

  @Post('/create')
  async addNewOffreConseil(@Body() offreConseil: OffreConseil): Promise<OffreConseil> {
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
  async updateOffreConseil(@Body() offreConseil: UpdateOffreConseilDto): Promise<OffreConseil> {
    return this.offreConseilService.updateOffreConseil(offreConseil);
  }

  @Delete('/:id')
  async deleteOffreConseil(@Param() params): Promise<OffreConseil> {
    return this.offreConseilService.deleteOffreConseil(params.id);
  }
  
}

import { UseGuards } from '@nestjs/common/decorators';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from 'src/auth/Roles';

@Controller('Cv')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Etudiant)
export class CvController {
  constructor(private readonly CvService: CvService) {}

  @Post()
  create(@Body() createCvDto: Cv) {
    return this.CvService.create(createCvDto);
  }

  @Get()
  findAll() {
    return this.CvService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.CvService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCv: Cv) {
    return this.CvService.update(id, updateCv);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CvService.remove(id);
  }
}

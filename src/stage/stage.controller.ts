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
import { StageService } from './stage.service';
import { Stage } from './entities/stage.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from 'src/auth/Roles';

@Controller('stage')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Etudiant)
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  create(@Body() createStageDto: Stage) {
    return this.stageService.create(createStageDto);
  }

  @Get()
  findAll() {
    return this.stageService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.stageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStage: string) {
    return this.stageService.update(id, updateStage);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stageService.remove(id);
  }
}

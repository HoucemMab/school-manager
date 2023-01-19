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

@Controller('stage')
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

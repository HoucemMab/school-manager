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

@Controller()
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
  async addPfa(@Body() pfa: Pfa): Promise<Pfa> {
    return this.pfaService.addPfa(pfa);
  }
  @Delete('pfa/:id')
  async deletePfa(@Param() params) {
    return await this.pfaService.deletePfaById(params.id);
  }

  @Put('pfa')
  async updatePfa(@Body() updatePfadto: UpdatePfaDto) {
    return await this.pfaService.updatePfaById(updatePfadto);
  }
}

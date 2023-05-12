import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnneuniversitaireService } from './anneuniversitaire.service';
import { CreateAnneuniversitaireDto } from './dto/create-anneuniversitaire.dto';
import { UpdateAnneuniversitaireDto } from './dto/update-anneuniversitaire.dto';
import { Anneuniversitaire } from './entities/anneuniversitaire.entity';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from 'src/auth/Roles';

@Controller('anneuniversitaire')
export class AnneuniversitaireController {
  constructor(
    private readonly anneuniversitaireService: AnneuniversitaireService,
  ) {}
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createAnneuniversitaireDto: Anneuniversitaire) {
    return await this.anneuniversitaireService.create(
      createAnneuniversitaireDto,
    );
  }

  @Roles(Role.Admin, Role.Enseignant)
  @Get()
  async findAll() {
    return await this.anneuniversitaireService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.anneuniversitaireService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anneuniversitaireService.remove(id);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateAnneuniversitaireDto } from './create-anneuniversitaire.dto';

export class UpdateAnneuniversitaireDto extends PartialType(CreateAnneuniversitaireDto) {}

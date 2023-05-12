import { Module } from '@nestjs/common';
import { AnneuniversitaireService } from './anneuniversitaire.service';
import { AnneuniversitaireController } from './anneuniversitaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anneuniversitaire } from './entities/anneuniversitaire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anneuniversitaire])],
  controllers: [AnneuniversitaireController],
  providers: [AnneuniversitaireService],
  exports: [AnneuniversitaireService],
})
export class AnneuniversitaireModule {}

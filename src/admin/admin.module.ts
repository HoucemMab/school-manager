import { Etudiant } from 'src/etudiant/etudiant.entity';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant,Admin])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

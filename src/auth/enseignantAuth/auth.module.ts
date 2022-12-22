import { Enseignant } from './../../enseignant/enseignant.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enseignant])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

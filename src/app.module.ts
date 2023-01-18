import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { ResponsableModule } from './responsable/responsable.module';
import { AdminModule } from './admin/admin.module';
import { PfaModule } from './pfa/pfa.module';
import { PfeModule } from './pfe/pfe.module';
import { StageEteModule } from './stage-ete/stage-ete.module';
import { EvenementModule } from './evenement/evenement.module';
import { OffreConseilModule } from './offre-conseil/offre-conseil.module';
import { EtudiantAlumniModule } from './etudiant-alumni/etudiant-alumni.module';
import { EtudiantActuelModule } from './etudiant-actuel/etudiant-actuel.module';
import { AuthModule } from './auth/enseignantAuth/auth.module';
import { MailingModule } from './mailing/mailing.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),

    UserModule,
    EtudiantModule,
    EnseignantModule,
    ResponsableModule,
    AdminModule,
    PfaModule,
    PfeModule,
    StageEteModule,
    EvenementModule,
    OffreConseilModule,
    EtudiantAlumniModule,
    EtudiantActuelModule,
    AuthModule,
    MailingModule,
    AssetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

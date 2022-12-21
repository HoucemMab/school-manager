import { Column, Entity } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantAlumni extends Etudiant {
  @Column()
  dateObtentionDiplome: Date;
  @Column()
  dateEmbacuhe: Date;
  @Column()
  vacation: Boolean;
  @Column()
  ContratExpert: Boolean;
}

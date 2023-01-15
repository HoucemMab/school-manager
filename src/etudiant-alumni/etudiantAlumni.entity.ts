import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantAlumni extends Etudiant {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  idEtudiantAlumni: string;
  @Column()
  dateObtentionDiplome: Date;
  @Column()
  dateEmbacuhe: Date;
  @Column()
  vacation: Boolean;
  @Column()
  ContratExpert: Boolean;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantAlumni extends Etudiant {
  @PrimaryGeneratedColumn({
    name: 'EtudiantAluId',
  })
  EtudiantAluId: number;
  @Column()
  dateObtentionDiplome: Date;
  @Column()
  dateEmbacuhe: Date;
  @Column()
  vacation: Boolean;
  @Column()
  ContratExpert: Boolean;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantAlumni extends Etudiant {
  @PrimaryGeneratedColumn({
    name: 'EtudiantAluId',
  })
  EtudiantAluId: string;
  @Column()
  dateObtentionDiplome: number;
  @Column()
  dateEmbacuhe: Date;
  @Column()
  vacation: Boolean;
  @Column()
  ContratExpert: Boolean;
}

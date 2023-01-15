import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantActuel extends Etudiant {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  idEtudiantActuel: string;
  @Column()
  niveau: string;

  @Column()
  Classe: string;

  @Column()
  anneEtudet: Number;

  @Column()
  dateObtentionDiplome: Date = null;
}

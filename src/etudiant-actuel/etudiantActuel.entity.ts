import { Column, Entity } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantActuel extends Etudiant {
  @Column()
  niveau: string;

  @Column()
  Classe: string;

  @Column()
  anneEtudet: Number;
}

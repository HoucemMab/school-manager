import { Pfa } from 'src/pfa/pfa.entity';
import { Pfe } from 'src/pfe/pfe.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantActuel extends Etudiant {
  @PrimaryGeneratedColumn({
    name: 'EtudiantActId',
  })
  EtudiantActId: number;
  @Column()
  niveau: string;

  @Column()
  Classe: string;

  @Column()
  anneEtudet: Number;

  @Column()
  pfa:Pfa;

  @Column()
  pfe:Pfe;
}

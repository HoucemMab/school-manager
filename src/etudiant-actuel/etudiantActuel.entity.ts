import { Pfa } from 'src/pfa/pfa.entity';
import { Pfe } from 'src/pfe/pfe.entity';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Etudiant } from './../etudiant/etudiant.entity';
@Entity()
export class EtudiantActuel extends Etudiant {
  @PrimaryColumn({
    name: 'EtudiantActId',
    unique : true
  })
  EtudiantActId: string;
  @Column()
  niveau: string;

  @Column()
  Classe: string;

  @Column()
  anneEtudet: Number;

  @Column()
  pfa: Pfa;

  @Column()
  pfe: Pfe;
  @Column()
  dateObtentionDiplome: Date = null;
}

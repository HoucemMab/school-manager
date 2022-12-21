import { Column, Entity } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Etudiant extends User {
  @Column()
  nom: string;
  @Column()
  prenom: string;
  @Column()
  dateNaissance: Date;
  @Column()
  formation: string;
  @Column()
  poste: string;

  @Column()
  visibilite: Boolean;
}

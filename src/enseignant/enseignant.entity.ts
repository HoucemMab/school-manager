import { User } from 'src/user/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Enseignant extends User {
  @Column()
  nom: string;

  @Column()
  prenom: string;
}

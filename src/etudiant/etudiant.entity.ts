import { Role } from './../auth/Roles';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Etudiant extends User {
  @PrimaryColumn({
    name: 'EtudiantId',
    unique : true
  })
  EtudiantId: string;
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
  @Column()
  alumni: Boolean;

  @Column()
  roles: Role[];
}

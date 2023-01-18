import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Etudiant extends User {
  @PrimaryGeneratedColumn({
    name: 'EtudiantId',
  })
  EtudiantId: number;
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
  alumni:Boolean;
}
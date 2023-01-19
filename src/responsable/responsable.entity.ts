import { User } from 'src/user/user.entity';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Responsable extends User {

  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  idResponsable: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;
  
  @Column()
  role: string;
}

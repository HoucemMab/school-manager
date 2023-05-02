import { Role } from 'src/auth/Roles';
import { User } from 'src/user/user.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class Admin extends User {

  @PrimaryColumn({ unique: true })
  idAdmin: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;
  
  @Column()
  roles: Role[];

  
}

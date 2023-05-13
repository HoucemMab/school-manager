import { Role } from 'src/auth/Roles';
import { User } from 'src/user/user.entity';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Admin extends User {

  @PrimaryGeneratedColumn()
  idAdmin: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  roles: Role[];

  @Column({ type: 'boolean', default: true})
  OperationsEtud: boolean = true;

  @Column({ type: 'boolean', default: true})
  ImportExcel: boolean = true;

  @Column({ type: 'boolean', default: true })
  OperationsEvent: boolean = true;

  @Column({ type: 'boolean', default: true})
  OperationsEns: boolean = true;

  @Column({ type: 'boolean', default: true })
  OperationsStats: boolean = true;

  @Column({ type: 'boolean', default: true})
  OperationsDemande: boolean = true;

  @Column()
  SuperAdmin: boolean = false;



}

import { Role } from 'src/auth/Roles';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Vacation {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn({ unique: true })
  idVacation: string;

  @Column()
  EtudiantAluId: string;
  
  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  competences: string[];

  @Column()
  accepted: boolean;
}

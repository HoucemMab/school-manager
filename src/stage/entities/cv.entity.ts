import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cv {
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn()
  idCv: string;

  @Column()
  Competences: string[];

  @Column()
  formation: string[];

  @Column()
  experience: string[];
}

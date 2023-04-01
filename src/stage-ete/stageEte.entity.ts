import {
  Column,
  Entity,
  Generated,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StageEte {
  @ObjectIdColumn()
  _id: string;
  @PrimaryGeneratedColumn()
  idStage: number;
  @Column()
  sujet: string;
  @Column()
  dateDebut: Date;
  @Column()
  dateFin: Date;
  @Column()
  societe: string;
}

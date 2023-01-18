import { Entity, Column, ObjectIdColumn, PrimaryColumn } from 'typeorm';


@Entity()
export class Participation {

  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  idParticipation: string;

  @Column()
  idEtudiant: string;

  @Column()
  idEvenement: string;

  @Column()
  dateParticipation: Date;

  @Column()
  validite: boolean;

}

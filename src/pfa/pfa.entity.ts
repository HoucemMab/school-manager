import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Pfa {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  idPfa: string;
  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  technologie: string;

  @Column()
  nbEtudiants: Number;

  @Column()
  idEtudiant:string[];
}

import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Pfe {
  @ObjectIdColumn()
  _id: string;
  @Column()
  idpfe: string;
  @Column()
  type: string;

  @Column()
  societe: string;

  @Column()
  pays: string;

  @Column()
  idEnseignant: string;

  @Column()
  sujet: string;

  @Column()
  idEtudiant: string;
}

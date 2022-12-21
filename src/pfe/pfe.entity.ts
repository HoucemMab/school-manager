import { Column, Entity } from 'typeorm';
@Entity()
export class Pfe {
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
}

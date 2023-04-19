import { Column, Entity, PrimaryColumn,ObjectIdColumn } from 'typeorm';

@Entity()
export class Publication {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn({ unique: true })
  idPublication: string;

  @Column()
  EtudiantAluId: string;

  @Column()
  contenu: string;

  @Column()
  type: string;
}

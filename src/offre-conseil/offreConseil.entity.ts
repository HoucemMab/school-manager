import { Column, Entity, PrimaryColumn,ObjectIdColumn } from 'typeorm';

@Entity()
export class OffreConseil {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  idOffreConseil: string;

  @Column()
  id_etudiant: string;

  @Column()
  contenu: string;
}

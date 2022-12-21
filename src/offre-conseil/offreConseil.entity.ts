import { Column, Entity } from 'typeorm';

@Entity()
export class OffreConseil {
  @Column()
  id_etudiant: string;

  @Column()
  contenu: string;
}

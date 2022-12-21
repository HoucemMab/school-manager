import { Column, Entity } from 'typeorm';

@Entity()
export class evenement {
  @Column()
  nom: string;
  @Column()
  dateEvenement: Date;
}

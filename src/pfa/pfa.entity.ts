import { Column, Entity } from 'typeorm';

@Entity()
export class Pfa {
  @Column()
  titre: string;

  @Column()
  descrtiption: string;

  @Column()
  technologie: string;

  @Column()
  isDispo: Boolean;
}

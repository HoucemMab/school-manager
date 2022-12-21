import { Column, Entity } from 'typeorm';

@Entity()
export class Responsable {
  @Column()
  role: string;
}

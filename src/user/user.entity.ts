import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  login: Number;

  @Column()
  mdp: Number;
}

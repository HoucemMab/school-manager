import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: String;
  @Column()
  login: Number;

  @Column()
  mdp: string;
}

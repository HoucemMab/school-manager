import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: String;
  @Column({ unique: true })
  login: Number;

  @Column()
  mdp: string;

  @Column()
  email: string;
}

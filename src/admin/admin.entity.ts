import { User } from 'src/user/user.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Admin extends User {
  @Column()
  role: string;
}

import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NotificationEntity {
  @ObjectIdColumn()
  id: string;
  @PrimaryGeneratedColumn()
  idNotification: string;
  @Column()
  idUser: string;

  @Column()
  data: string;

  @Column()
  date: Date;
}

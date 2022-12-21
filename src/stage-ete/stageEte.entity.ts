import { Column, Entity } from 'typeorm';

@Entity()
export class StageEte {
  @Column()
  sujet: string;
}

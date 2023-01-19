import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Stage {
  @ObjectIdColumn()
  id: string;

  @PrimaryColumn()
  idStage: string;

  @Column()
  sujet: string;
}

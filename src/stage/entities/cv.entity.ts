import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Cv {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn({unique:true})
  idCv: string;

  @Column()
  Competences: string[];

  @Column()
  formation:string[];

  @Column()
  experience:string[];

}

import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Anneuniversitaire {
  @ObjectIdColumn()
  id: string;
  @Column()
  anne: string;
  @Column()
  nbsemestre: number;
}

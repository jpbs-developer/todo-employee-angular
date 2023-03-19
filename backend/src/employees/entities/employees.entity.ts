import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  jobRole: string;
  @Column('float')
  salary: number;
  @Column('date')
  birthDate: Date;
  @Column('int')
  registry: number;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {

  @PrimaryGeneratedColumn('uuid')
    id: number;

  @Column()
    username: string;

  @Column()
    password: string;

  @Column()
    email: string;

}

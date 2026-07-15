import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "nome": string;

  @Column({ unique: true })
  "email": string;

  @Column()
  "senha": string;

}
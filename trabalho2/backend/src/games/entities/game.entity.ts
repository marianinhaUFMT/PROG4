import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "titulo": string;

  @Column('text')
  "conteudo": string;

  @Column({ nullable: true })
  "imagem": string;

  @Column({ default: 0 })
  "ordem": number;

  @Column()
  "ano": number;

  @Column('simple-array')        // ex: ['Nintendo Switch', 'Wii U']
  "plataformas": string[];

  @Column({ nullable: true })    // ex: 'Jogo do Ano', 'Obra Prima'
  "badge": string;

  @Column({ unique: true })      // ex: 'OoT', 'BotW' — ancora no front
  "abreviacao": string;
}
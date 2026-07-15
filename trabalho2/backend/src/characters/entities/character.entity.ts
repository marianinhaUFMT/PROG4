import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CharacterTipo {
  PERSONAGEM = 'personagem',
  INIMIGO    = 'inimigo',
}

@Entity('characters')
export class Character {
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

  @Column({ type: 'simple-enum', enum: CharacterTipo, default: CharacterTipo.PERSONAGEM })
  "tipo": CharacterTipo;

  @Column('simple-array', { nullable: true })  // ex: ['OoT', 'BotW', 'TotK']
  "aparicoes": string[];

}
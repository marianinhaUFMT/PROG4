import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, Min, IsInt } from 'class-validator';
import { CharacterTipo } from '../entities/character.entity';
import { ApiProperty } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateCharacterDto {
  @IsString()
  @ApiProperty({ example: 'Link' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  "titulo": string;

  @IsString()
  @ApiProperty({ example: 'Protagonista da série.' })
  @IsNotEmpty({ message: 'O conteúdo é obrigatório' })
  "conteudo": string;

  @IsString()
  @ApiProperty({ example: 'https://example.com/imagem.jpg' })
  @IsOptional()
  "imagem"?: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 1 })
  @IsOptional()
  "ordem"?: number;

  @IsEnum(CharacterTipo, { message: 'Tipo deve ser "personagem" ou "inimigo"' })
  @ApiProperty({ example: 'personagem' })
  @IsOptional()
  "tipo"?: CharacterTipo;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['OoT', 'BotW'] })
  @IsOptional()
  "aparicoes"?: string[];   // abreviacao dos jogos: ['OoT', 'BotW']
}
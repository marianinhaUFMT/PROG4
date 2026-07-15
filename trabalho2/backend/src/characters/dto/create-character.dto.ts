import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, Min, IsInt } from 'class-validator';
import { CharacterTipo } from '../entities/character.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty({ 
    example: 'Link', 
    description: 'Nome do personagem ou entidade' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  "titulo": string;

  @ApiProperty({ 
    example: 'O herói de Hyrule escolhido pelas deusas para portar a Triforça da Coragem.', 
    description: 'Lore ou história do personagem' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O conteúdo é obrigatório' })
  "conteudo": string;

  @ApiProperty({ 
    example: 'https://example.com/imagem.jpg', 
    description: 'URL da imagem de perfil do personagem',
    required: false 
  })
  @IsString()
  @IsOptional()
  "imagem"?: string;

  @ApiProperty({ 
    example: 1, 
    description: 'Sequência de ordenação de exibição',
    minimum: 0,
    required: false 
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  "ordem"?: number;

  @ApiProperty({ 
    example: 'personagem', 
    enum: CharacterTipo,
    description: 'Classificação no universo do jogo',
    required: false 
  })
  @IsEnum(CharacterTipo, { message: 'Tipo deve ser "personagem" ou "inimigo"' })
  @IsOptional()
  "tipo"?: CharacterTipo;

  @ApiProperty({ 
    example: ['OoT', 'BotW'], 
    description: 'Abreviaturas dos jogos que registram aparição deste personagem',
    type: [String],
    required: false 
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  "aparicoes"?: string[];
}
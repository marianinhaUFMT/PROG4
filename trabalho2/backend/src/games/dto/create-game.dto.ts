import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ 
    example: 'The Legend of Zelda: Ocarina of Time', 
    description: 'Título oficial do jogo' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  "titulo": string;

  @ApiProperty({ 
    example: 'Aclamado jogo de aventura lançado para o Nintendo 64.', 
    description: 'Descrição ou conteúdo detalhado sobre o jogo' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O conteúdo é obrigatório' })
  "conteudo": string;

  @ApiProperty({ 
    example: 'https://example.com/imagem.jpg', 
    description: 'Link/URL direta da capa ou arte do jogo',
    required: false 
  })
  @IsString()
  @IsOptional()
  "imagem"?: string;

  @ApiProperty({ 
    example: 1, 
    description: 'Ordem de ordenação de exibição',
    minimum: 0,
    required: false 
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  "ordem"?: number;

  @ApiProperty({ 
    example: 1998, 
    description: 'Ano de lançamento original do título' 
  })
  @IsInt()
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  "ano": number;

  @ApiProperty({ 
    example: ['Nintendo 64', 'GameCube'], 
    description: 'Lista de consoles em que o jogo foi lançado',
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Informe ao menos uma plataforma' })
  "plataformas": string[];

  @ApiProperty({ 
    example: 'Jogo do Ano', 
    description: 'Selo ou destaque honorário do jogo',
    required: false 
  })
  @IsString()
  @IsOptional()
  "badge"?: string;

  @ApiProperty({ 
    example: 'OoT', 
    description: 'Abreviatura curta padrão da franquia utilizada como identificador único para as aparições' 
  })
  @IsString()
  @IsNotEmpty({ message: 'A abreviação é obrigatória' })
  "abreviacao": string;
}
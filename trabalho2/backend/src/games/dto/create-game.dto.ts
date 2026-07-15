import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateGameDto {
  @ApiProperty({ example: 'The Legend of Zelda: Ocarina of Time' })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  "titulo": string;

  @ApiProperty({ example: 'Conteúdo do jogo' })
  @IsString()
  @IsNotEmpty({ message: 'O conteúdo é obrigatório' })
  "conteudo": string;

  @ApiProperty({ example: 'https://example.com/imagem.jpg' })
  @IsString()
  @IsOptional()
  "imagem"?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  @IsOptional()
  "ordem"?: number;

  @ApiProperty({ example: 1998 })
  @IsInt()
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  "ano": number;

  @ApiProperty({ example: ['Nintendo 64', 'GameCube'] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Informe ao menos uma plataforma' })
  "plataformas": string[];

  @ApiProperty({ example: 'Jogo do Ano' })
  @IsString()
  @IsOptional()
  "badge"?: string;

  @ApiProperty({ example: 'OoT'})
  @IsString()
  @IsNotEmpty({ message: 'A abreviacao é obrigatório' })
  "abreviacao": string;
}
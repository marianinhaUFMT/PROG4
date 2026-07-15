import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'Mariana', 
    description: 'Nome completo do usuário' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  "nome": string;

  @ApiProperty({ 
    example: 'mariana@example.com', 
    description: 'Endereço de e-mail exclusivo para login' 
  })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  "email": string;

  @ApiProperty({ 
    example: 'minha-senha-segura', 
    description: 'Senha de acesso do usuário (mínimo de 8 caracteres)',
    minLength: 8
  })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  "senha": string;
}
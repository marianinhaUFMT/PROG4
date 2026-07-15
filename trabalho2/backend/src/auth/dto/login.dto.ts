import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    example: 'mariana@example.com', 
    description: 'E-mail cadastrado do usuário' 
  })
  @IsEmail()
  "email": string;

  @ApiProperty({ 
    example: '12345678', 
    description: 'Senha correspondente à conta',
    minLength: 8
  })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  "senha": string;
}
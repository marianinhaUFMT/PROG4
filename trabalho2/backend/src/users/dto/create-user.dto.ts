import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Mariana' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  "nome": string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @ApiProperty({ example: 'mariana@example.com' })
  "email": string;

  @IsString()
  @ApiProperty({ example: 'minha-senha-segura' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  "senha": string;
}
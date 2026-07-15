import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService = {
    create: jest.fn(),
    findOneByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('token_mockado'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve chamar usersService.create com os dados corretos', async () => {
      const dto = { nome: 'Mariana', email: 'mariana@email.com', senha: '123456' };
      mockUsersService.create.mockResolvedValue({ id: 1, ...dto });

      const result = await authService.register(dto);

      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('id', 1);
    });
  });

  describe('login', () => {
    it('deve retornar access_token quando credenciais são válidas', async () => {
      const hash = await bcrypt.hash('123456', 10);
      mockUsersService.findOneByEmail.mockResolvedValue({
        id: 1,
        nome: 'Mariana',
        email: 'mariana@email.com',
        senha: hash,
      });

      const result = await authService.login({
        email: 'mariana@email.com',
        senha: '123456',
      });

      expect(result).toHaveProperty('access_token', 'token_mockado');
      expect(result.usuario).toHaveProperty('email', 'mariana@email.com');
    });

    it('deve lançar UnauthorizedException quando usuário não existe', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'naoexiste@email.com', senha: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException quando senha está errada', async () => {
      const hash = await bcrypt.hash('senha_correta', 10);
      mockUsersService.findOneByEmail.mockResolvedValue({
        id: 1,
        email: 'mariana@email.com',
        senha: hash,
      });

      await expect(
        authService.login({ email: 'mariana@email.com', senha: 'senha_errada' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
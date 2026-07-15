import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(authController).toBeDefined();
  });

  it('deve chamar authService.login e retornar token', async () => {
    mockAuthService.login.mockResolvedValue({ access_token: 'token_mockado' });

    const result = await authController.login({ email: 'mariana@email.com', senha: '123456' });

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(result).toHaveProperty('access_token');
  });
});
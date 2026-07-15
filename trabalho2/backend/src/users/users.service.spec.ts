import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(usersService).toBeDefined();
  });

  it('deve lançar ConflictException se e-mail já existe', async () => {
    mockRepository.findOneBy.mockResolvedValue({ id: 1, email: 'mariana@email.com' });

    await expect(
      usersService.create({ nome: 'Mariana', email: 'mariana@email.com', senha: '123456' }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve criar usuário e não retornar a senha', async () => {
    mockRepository.findOneBy.mockResolvedValue(null);
    mockRepository.create.mockReturnValue({ nome: 'Mariana', email: 'mariana@email.com', senha: 'hash' });
    mockRepository.save.mockResolvedValue({ id: 1, nome: 'Mariana', email: 'mariana@email.com', senha: 'hash' });

    const result = await usersService.create({ nome: 'Mariana', email: 'mariana@email.com', senha: '123456' });

    expect(result).not.toHaveProperty('senha');
  });
});
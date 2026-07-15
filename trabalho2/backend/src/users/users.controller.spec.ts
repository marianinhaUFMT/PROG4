import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(usersController).toBeDefined();
  });

  it('deve chamar usersService.findAll', async () => {
    mockUsersService.findAll.mockResolvedValue([]);
    await usersController.findAll();
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });
});
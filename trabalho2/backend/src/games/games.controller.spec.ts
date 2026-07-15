import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let gamesController: GamesController;

  const mockGamesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [{ provide: GamesService, useValue: mockGamesService }],
    }).compile();

    gamesController = module.get<GamesController>(GamesController);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(gamesController).toBeDefined();
  });

  it('deve chamar gamesService.findAll', async () => {
    mockGamesService.findAll.mockResolvedValue([]);
    await gamesController.findAll();
    expect(mockGamesService.findAll).toHaveBeenCalled();
  });

  it('deve chamar gamesService.findOne com o id correto', async () => {
    mockGamesService.findOne.mockResolvedValue({ id: 1, titulo: 'OoT' });
    await gamesController.findOne('1');
    expect(mockGamesService.findOne).toHaveBeenCalledWith(1);
  });
});
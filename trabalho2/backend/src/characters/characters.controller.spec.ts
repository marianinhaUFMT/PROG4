import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
  let charactersController: CharactersController;

  const mockCharactersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [{ provide: CharactersService, useValue: mockCharactersService }],
    }).compile();

    charactersController = module.get<CharactersController>(CharactersController);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(charactersController).toBeDefined();
  });

  it('deve chamar charactersService.findAll sem filtro', async () => {
    mockCharactersService.findAll.mockResolvedValue([]);
    await charactersController.findAll(undefined);
    expect(mockCharactersService.findAll).toHaveBeenCalledWith(undefined);
  });
});
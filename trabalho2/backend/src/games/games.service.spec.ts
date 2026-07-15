import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';

describe('GamesService', () => {
  let gamesService: GamesService;

  const mockGame: Game = {
    id: 1,
    titulo: 'Ocarina of Time',
    conteudo: 'Link parte em jornada...',
    imagem: 'oot.png',
    ordem: 3,
    ano: 1998,
    plataformas: ['Nintendo 64'],
    badge: 'Obra Prima',
    abreviacao: 'OoT',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: getRepositoryToken(Game), useValue: mockRepository },
      ],
    }).compile();

    gamesService = module.get<GamesService>(GamesService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar lista de jogos ordenada por ordem', async () => {
      mockRepository.find.mockResolvedValue([mockGame]);

      const result = await gamesService.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].titulo).toBe('Ocarina of Time');
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { ordem: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar um jogo pelo id', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockGame);

      const result = await gamesService.findOne(1);

      expect(result).toEqual(mockGame);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('deve lançar NotFoundException quando jogo não existe', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(gamesService.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('deve criar e salvar um novo jogo', async () => {
      const dto = {
        titulo: 'Majora\'s Mask',
        conteudo: 'O mais sombrio da série...',
        ordem: 4,
        ano: 2000,
        plataformas: ['Nintendo 64'],
        abreviacao: 'MM',
      };

      mockRepository.create.mockReturnValue(dto);
      mockRepository.save.mockResolvedValue({ id: 2, ...dto });

      const result = await gamesService.create(dto as any);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('id', 2);
    });
  });

  describe('remove', () => {
    it('deve remover o jogo e retornar mensagem de sucesso', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockGame);
      mockRepository.remove.mockResolvedValue(mockGame);

      const result = await gamesService.remove(1);

      expect(mockRepository.remove).toHaveBeenCalledWith(mockGame);
      expect(result.mensagem).toContain('Ocarina of Time');
    });

    it('deve lançar NotFoundException ao tentar remover jogo inexistente', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(gamesService.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
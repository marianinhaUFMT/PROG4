import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CharactersService } from './characters.service';
import { Character, CharacterTipo } from './entities/character.entity';

describe('CharactersService', () => {
  let charactersService: CharactersService;

  const mockCharacter: Character = {
    id: 1,
    titulo: 'Link',
    conteudo: 'Protagonista da série.',
    imagem: 'link.png',
    ordem: 1,
    tipo: CharacterTipo.PERSONAGEM,
    aparicoes: ['OoT', 'BotW'],
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
        CharactersService,
        { provide: getRepositoryToken(Character), useValue: mockRepository },
      ],
    }).compile();

    charactersService = module.get<CharactersService>(CharactersService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar todos os personagens ordenados', async () => {
      mockRepository.find.mockResolvedValue([mockCharacter]);

      const result = await charactersService.findAll();

      expect(result).toHaveLength(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {},
        order: { ordem: 'ASC' },
      });
    });

    it('deve filtrar por tipo quando informado', async () => {
      mockRepository.find.mockResolvedValue([mockCharacter]);

      await charactersService.findAll(CharacterTipo.PERSONAGEM);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { tipo: CharacterTipo.PERSONAGEM },
        order: { ordem: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar um personagem pelo id', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockCharacter);

      const result = await charactersService.findOne(1);

      expect(result.titulo).toBe('Link');
    });

    it('deve lançar NotFoundException quando personagem não existe', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(charactersService.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deve remover personagem e retornar mensagem', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockCharacter);
      mockRepository.remove.mockResolvedValue(mockCharacter);

      const result = await charactersService.remove(1);

      expect(result.mensagem).toContain('Link');
    });
  });
});
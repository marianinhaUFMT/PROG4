import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gamesRepository.create(createGameDto);
    return this.gamesRepository.save(game);
  }

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find({
      order: { ordem: 'ASC' }, // campo de ordenação da spec
    });
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gamesRepository.findOneBy({ id });
    if (!game) {
      throw new NotFoundException(`Jogo #${id} não encontrado`);
    }
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id); // já lança 404 se não existir
    Object.assign(game, updateGameDto);
    return this.gamesRepository.save(game);
  }

  async remove(id: number): Promise<{ mensagem: string }> {
    const game = await this.findOne(id);
    await this.gamesRepository.remove(game);
    return { mensagem: `Jogo "${game.titulo}" removido com sucesso` };
  }
}

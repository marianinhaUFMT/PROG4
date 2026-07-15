import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character, CharacterTipo } from './entities/character.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
  ) {}

  create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const character = this.charactersRepository.create(createCharacterDto);
    return this.charactersRepository.save(character);
  }

  findAll(tipo?: CharacterTipo): Promise<Character[]> {
    return this.charactersRepository.find({
      where: tipo ? { tipo } : {},     // filtra por personagem ou inimigo se informado
      order: { ordem: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Character> {
    const character = await this.charactersRepository.findOneBy({ id });
    if (!character) {
      throw new NotFoundException(`Personagem #${id} não encontrado`);
    }
    return character;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    const character = await this.findOne(id);
    Object.assign(character, updateCharacterDto);
    return this.charactersRepository.save(character);
  }

  async remove(id: number): Promise<{ mensagem: string }> {
    const character = await this.findOne(id);
    await this.charactersRepository.remove(character);
    return { mensagem: `Personagem "${character.titulo}" removido com sucesso` };
  }
}
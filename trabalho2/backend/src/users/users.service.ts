import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'senha'>> {
    const existe = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (existe) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const hash = await bcrypt.hash(createUserDto.senha, 10);
    const user = this.usersRepository.create({ ...createUserDto, senha: hash });
    const salvo = await this.usersRepository.save(user);

    const { senha, ...resultado } = salvo; // nunca retorna o hash
    return resultado;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: { id: true, nome: true, email: true},
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
    // retorna com senha para o Auth poder comparar o hash
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: { id: true, nome: true, email: true },
    });
    if (!user) throw new NotFoundException(`Usuário #${id} não encontrado`);
    return user;
  }
}
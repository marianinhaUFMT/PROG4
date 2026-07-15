import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // apenas usuários autenticados podem criar jogos
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastrar novo jogo (requer token)' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os jogos' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um jogo pelo ID' })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // apenas usuários autenticados podem atualizar jogos
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um jogo pelo ID (requer token)' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // apenas usuários autenticados podem excluir jogos
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir um jogo (requer token)' })
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}

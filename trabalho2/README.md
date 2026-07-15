# Trabalho 2 - Integração Back-end com Front-end implementado no Trabalho 1

# 🗡️ Wiki Zelda — Backend API

API REST desenvolvida com **NestJS**, **TypeORM** e **SQLite** para o projeto prático de Programação IV.  
Gerencia o ciclo de vida completo das entidades **Games**, **Characters** e **Users**, com autenticação via **JWT**.

---

## 📋 Requisitos

- Node.js v18+
- npm v9+

---

## ⚙️ Instalação

**1. Clone o repositório e entre na pasta do backend:**
```bash
cd backend
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:
```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=8h
```

> O banco de dados SQLite é criado automaticamente na pasta `.db/` ao iniciar o servidor — nenhuma configuração adicional necessária.

---

## ▶️ Execução

**Modo desenvolvimento (com hot reload):**
```bash
npm run start:dev
```

**Modo produção:**
```bash
npm run start
```

O servidor sobe em `http://localhost:3000`.  
A documentação interativa Swagger fica disponível em `http://localhost:3000/api`.

---

## 🧪 Testes

**Rodar todos os testes unitários:**
```bash
npm test
```

**Resultado esperado:**
```
Test Suites: 9 passed, 9 total
Tests:       28 passed, 28 total
```

**O que é testado:**

| Suite | Testes |
|---|---|
| `auth.service.spec.ts` | Register, login válido, usuário inexistente, senha errada |
| `auth.controller.spec.ts` | Controller definido, chamada ao login |
| `games.service.spec.ts` | findAll, findOne, create, remove, 404 |
| `games.controller.spec.ts` | Controller definido, findAll, findOne |
| `characters.service.spec.ts` | findAll, filtro por tipo, findOne, remove, 404 |
| `characters.controller.spec.ts` | Controller definido, findAll sem filtro |
| `users.service.spec.ts` | Create, e-mail duplicado, senha não exposta |
| `users.controller.spec.ts` | Controller definido, findAll |
| `app.controller.spec.ts` | Health check |

---

## 🗺️ Endpoints da API

### 🔐 Auth — `/auth`

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/auth/register` | Cadastrar novo usuário | Pública |
| POST | `/auth/login` | Autenticar e receber token JWT | Pública |

**Exemplo — Register:**
```json
POST /auth/register
{
  "nome": "Mariana",
  "email": "mariana@email.com",
  "senha": "123456"
}
```

**Exemplo — Login:**
```json
POST /auth/login
{
  "email": "mariana@email.com",
  "senha": "123456"
}
```
Resposta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { "id": 1, "nome": "Mariana", "email": "mariana@email.com" }
}
```

---

### 🎮 Games — `/games`

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/games` | Listar todos os jogos (ordenados por `ordem`) | Pública |
| GET | `/games/:id` | Buscar jogo por ID | Pública |
| POST | `/games` | Cadastrar novo jogo | 🔒 JWT |
| PATCH | `/games/:id` | Atualizar jogo | 🔒 JWT |
| DELETE | `/games/:id` | Remover jogo | 🔒 JWT |

**Campos obrigatórios (POST):**
```json
{
  "titulo": "Ocarina of Time",
  "conteudo": "Descrição do jogo...",
  "imagem": "https://url-da-capa.png",
  "ordem": 3,
  "ano": 1998,
  "plataformas": ["Nintendo 64"],
  "badge": "Obra Prima",
  "abreviacao": "OoT"
}
```
> `imagem`, `ordem` e `badge` são opcionais.

---

### 🧝 Characters — `/characters`

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/characters` | Listar todos (ordenados por `ordem`) | Pública |
| GET | `/characters?tipo=personagem` | Filtrar só personagens | Pública |
| GET | `/characters?tipo=inimigo` | Filtrar só inimigos | Pública |
| GET | `/characters/:id` | Buscar por ID | Pública |
| POST | `/characters` | Cadastrar personagem ou inimigo | 🔒 JWT |
| PATCH | `/characters/:id` | Atualizar | 🔒 JWT |
| DELETE | `/characters/:id` | Remover | 🔒 JWT |

**Campos obrigatórios (POST):**
```json
{
  "titulo": "Link",
  "conteudo": "Protagonista da série...",
  "imagem": "https://url-da-imagem.png",
  "ordem": 1,
  "tipo": "personagem",
  "aparicoes": ["OoT", "BotW", "TotK"]
}
```
> `imagem`, `ordem`, `tipo` e `aparicoes` são opcionais. Valor padrão de `tipo`: `"personagem"`.

---

### 👤 Users — `/users`

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/users` | Listar usuários (sem senha) | Pública |
| GET | `/users/:id` | Buscar usuário por ID | Pública |

> Cadastro de usuários é feito via `/auth/register`.

---

## 🔒 Como usar o token JWT

Após o login, inclua o token no header de todas as requisições protegidas:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

No Swagger (`/api`), clique no cadeado 🔒 no topo da página e cole o token para autenticar todas as requisições.

---

## 🗂️ Estrutura do Projeto

```
backend/
├── src/
│   ├── auth/                   # Módulo de autenticação JWT
│   │   ├── dto/login.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   └── jwt-auth.guard.ts
│   ├── games/                  # Módulo de jogos
│   │   ├── dto/
│   │   ├── entities/game.entity.ts
│   │   ├── games.controller.ts
│   │   ├── games.service.ts
│   │   └── games.module.ts
│   ├── characters/             # Módulo de personagens e inimigos
│   │   ├── dto/
│   │   ├── entities/character.entity.ts
│   │   ├── characters.controller.ts
│   │   ├── characters.service.ts
│   │   └── characters.module.ts
│   ├── users/                  # Módulo de usuários
│   │   ├── dto/
│   │   ├── entities/user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── main.ts
│   └── ormconfig.ts
├── .db/                        # Banco SQLite (gerado automaticamente)
├── .env.example
└── README.md
```

---

## 🛡️ Decisões Técnicas

| Decisão | Motivo |
|---|---|
| SQLite com `better-sqlite3` | Zero configuração de servidor, ideal para desenvolvimento |
| `synchronize: true` | TypeORM cria/atualiza tabelas automaticamente (apenas em dev) |
| GET público, escrita protegida | Wiki é leitura pública; edição exige autenticação |
| `simple-array` para plataformas e aparições | Evita complexidade de tabelas relacionais desnecessárias |
| `simple-enum` para tipo do personagem | Compatível com SQLite, que não tem tipo ENUM nativo |
| Senha nunca retornada nas respostas | Segurança: hash bcrypt fica apenas no banco |

---

*Projeto desenvolvido por Mariana Sanchez Pedroni — Programação IV, UFMT*
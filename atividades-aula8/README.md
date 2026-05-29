# Exercício - Banco de Dados Pessoa

## Objetivo

Crie uma tabela correspondente a entidade criada na aula anterior. Faça duas inserções dentro da tabela. Após isso faça a seleção de todas as entidades registradas, documente tudo em um arquivo e suba para o github.

---

# 0. Acesso ao MySQL pelo Terminal

```bash
mysql -u root -p
```

Depois de executar o comando:

* digite a senha do MySQL;
* pressione ENTER.

Após conectar, execute os comandos SQL do exercício.


# 1. Criação do Banco de Dados

```sql
CREATE DATABASE IF NOT EXISTS pessoa;
USE pessoa;
```

---

# 2. Criação da Tabela

```sql
CREATE TABLE IF NOT EXISTS pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL
);
```

### Estrutura da tabela

| Campo | Tipo         | Descrição                |
| ----- | ------------ | ------------------------ |
| id    | SERIAL       | Identificador automático |
| nome  | VARCHAR(255) | Nome da pessoa           |
| idade | INT          | Idade da pessoa          |

---

# 3. Inserção de Dados

```sql
INSERT INTO pessoa (nome, idade) VALUES ('Mariana', 21);
INSERT INTO pessoa (nome, idade) VALUES ('Anna', 20);
```

---

# 4. Consulta dos Dados

```sql
SELECT * FROM pessoa;
```

### Resultado esperado

| id | nome    | idade |
| -- | ------- | ----- |
| 1  | Mariana | 21    |
| 2  | Anna    | 20    |



# 🥗 NutriJá Backend

<p align="center">
  <img src=src\imagens\nutrijá.png width="500" alt="NutriJá Logo" />
</p>

<p align="center">
  Sua plataforma de delivery saudável preferida! Backend construído com NestJS para gerenciar produtos, categorias e usuários de forma eficiente e segura.
</p>

## Sobre o Projeto

O **NutriJá** é uma API RESTful desenvolvida com NestJS que oferece uma solução completa para gerenciamento de produtos saudáveis, categorias e autenticação de usuários. O projeto utiliza TypeORM para persistência de dados e implementa autenticação JWT para segurança.

## Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[MySQL](https://www.mysql.com/)** - Banco de dados relacional (desenvolvimento)
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional (produção)
- **[Passport](http://www.passportjs.org/)** - Autenticação
- **[JWT](https://jwt.io/)** - JSON Web Tokens
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[Swagger](https://swagger.io/)** - Documentação da API
- **[Jest](https://jestjs.io/)** - Framework de testes

## Diagrama Entidade-Relacionamento (DER)

<p align="center">
  <img src=src\imagens\DER.png width="500" alt="NutriJá Logo" />
</p>

### Relacionamentos

- **Usuario → Produto**: Um usuário pode criar vários produtos (1:N)
- **Categoria → Produto**: Uma categoria pode ter vários produtos (1:N)
- **Produto → Categoria**: Um produto pertence a uma categoria (N:1) - DELETE RESTRICT
- **Produto → Usuario**: Um produto pode ser criado por um usuário (N:1) - DELETE SET NULL

## Estrutura do Projeto

```
nutrija-backend/
├── src/
│   ├── auth/                 # Módulo de autenticação
│   │   ├── bcrypt/           # Serviço de criptografia
│   │   ├── constants/        # Constantes JWT
│   │   ├── controllers/      # Controller de autenticação
│   │   ├── entities/         # DTO de login
│   │   ├── guard/            # Guards JWT e Local
│   │   ├── services/         # Serviço de autenticação
│   │   └── strategy/         # Estratégias Passport
│   ├── categoria/            # Módulo de categorias
│   │   ├── controllers/      # Controller de categorias
│   │   ├── entities/         # Entidade Categoria
│   │   └── service/          # Serviço de categorias
│   ├── produto/              # Módulo de produtos
│   │   ├── controllers/      # Controller de produtos
│   │   ├── entities/         # Entidade Produto
│   │   └── service/          # Serviço de produtos
│   ├── usuario/              # Módulo de usuários
│   │   ├── controllers/      # Controller de usuários
│   │   ├── entities/         # Entidade Usuario
│   │   └── services/         # Serviço de usuários
│   ├── data/                 # Configurações de banco de dados
│   │   └── services/         # Dev e Prod services
│   ├── app.controller.ts     # Controller principal
│   ├── app.module.ts         # Módulo principal
│   ├── app.service.ts        # Serviço principal
│   └── main.ts               # Arquivo de inicialização
├── test/                     # Testes E2E
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências do projeto
└── tsconfig.json             # Configuração TypeScript
```

## Configuração e Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- MySQL (desenvolvimento) ou PostgreSQL (produção)
- NPM ou Yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/projeto-int-grup-3/nutrija-backend.git
cd nutrija-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto:

```env
# Porta da aplicação
PORT=4000

# Banco de dados (Produção - PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/db_nutrija

# Timezone
TZ=-03:00
```

4. Configure o banco de dados:

**Para desenvolvimento (MySQL):**
- Edite o arquivo `src/data/services/dev.service.ts` com suas credenciais
- O banco de dados `db_nutrija` será criado automaticamente

**Para produção (PostgreSQL):**
- Configure a variável `DATABASE_URL` no `.env`
- O arquivo `src/data/services/pro.service.ts` será usado

### Executando a Aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod

# Debug
npm run start:debug
```

A aplicação estará disponível em `http://localhost:4000`

A documentação Swagger estará em `http://localhost:4000/swagger`

## Documentação da API

### Endpoints Principais

#### Autenticação

| Método | Endpoint | Descrição | Status HTTP | Autenticação |
|--------|-----------|------------|--------------|---------------|
| POST | `/usuarios/cadastrar` | Cadastrar novo usuário | 201 Created | Não |
| POST | `/usuarios/logar` | Fazer login | 200 OK | Não |

#### Usuários

| Método | Endpoint | Descrição | Status HTTP | Autenticação |
|--------|-----------|------------|--------------|---------------|
| GET | `/usuarios/all` | Listar todos os usuários | 200 OK | Sim |
| GET | `/usuarios/:id` | Buscar usuário por ID | 200 OK | Sim |
| PUT | `/usuarios/atualizar` | Atualizar usuário | 200 OK | Sim |

#### Categorias

| Método | Endpoint | Descrição | Status HTTP | Autenticação |
|--------|-----------|------------|--------------|---------------|
| GET | `/categorias` | Listar todas as categorias | 200 OK | Sim |
| GET | `/categorias/:id` | Buscar categoria por ID | 200 OK | Sim |
| GET | `/categorias/nome/:nome` | Buscar categoria por nome | 200 OK | Sim |
| POST | `/categorias` | Criar nova categoria | 201 Created | Sim |
| PUT | `/categorias` | Atualizar categoria | 200 OK | Sim |
| DELETE | `/categorias/:id` | Deletar categoria | 204 No Content | Sim |

#### Produtos

| Método | Endpoint | Descrição | Status HTTP | Autenticação |
|--------|-----------|------------|--------------|---------------|
| GET | `/produtos` | Listar todos os produtos | 200 OK | Sim |
| GET | `/produtos/:id` | Buscar produto por ID | 200 OK | Sim |
| GET | `/produtos/nome/:nome` | Buscar produtos por nome | 200 OK | Sim |
| GET | `/produtos/similar/:id` | Buscar produtos similares | 200 OK | Sim |
| POST | `/produtos` | Criar novo produto | 201 Created | Sim |
| PUT | `/produtos` | Atualizar produto | 200 OK | Sim |
| DELETE | `/produtos/:id` | Deletar produto | 204 No Content | Sim |

### Exemplos de Requisição

#### Cadastrar Usuário

```json
POST /usuarios/cadastrar
Content-Type: application/json

{
  "nome": "João Silva",
  "usuario": "joao@email.com",
  "senha": "senha123",
  "foto": "https://exemplo.com/foto.jpg"
}
```

#### Login

```json
POST /usuarios/logar
Content-Type: application/json

{
  "usuario": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "usuario": "joao@email.com",
  "senha": "",
  "foto": "https://exemplo.com/foto.jpg",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Criar Produto

```json
POST /produtos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Salada Caesar",
  "descricao": "Salada fresca com alface, croutons e molho caesar",
  "preco": 25.90,
  "quantidade": 10,
  "categoria": {
    "id": 1
  }
}
```

## Segurança

- **Autenticação JWT**: Tokens com expiração de 1 hora
- **Bcrypt**: Hash de senhas com 10 rounds de salt
- **Guards**: Proteção de rotas com JWT Authentication Guard
- **Validação**: Class-validator para validação de dados
- **CORS**: Habilitado para permitir requisições cross-origin


## Formatação e Lint

```bash
# Formatar código
npm run format

# Executar lint
npm run lint
```

## Build

```bash
# Build para produção
npm run build
```

## Deploy

O projeto está configurado para deploy em plataformas cloud. As principais configurações incluem:

- **PostgreSQL** como banco de dados de produção
- **SSL** habilitado para conexões seguras
- **Variáveis de ambiente** para configurações sensíveis
- **Sincronização automática** do schema do banco de dados

### Deploy no Render/Heroku

1. Configure a variável de ambiente `DATABASE_URL`
2. Configure a variável `PORT` (opcional, padrão: 4000)
3. O comando de start será executado automaticamente

## Funcionalidades Principais

### Sistema de Autenticação
- Cadastro de usuários com validação de email único
- Login com geração de token JWT
- Proteção de rotas com Guards
- Hash de senhas com Bcrypt

### Gerenciamento de Produtos
- CRUD completo de produtos
- Busca por nome (case-insensitive)
- Sistema de produtos similares por categoria e preço
- Validação de estoque
- Relacionamento com categorias e usuários

### Sistema de Categorias
- CRUD completo de categorias
- Busca por nome
- Restrição de deleção (RESTRICT) quando há produtos associados

### Recursos Adicionais
- Documentação automática com Swagger
- Validação de dados com class-validator
- Relacionamentos TypeORM otimizados
- Tratamento de erros padronizado

## Equipe

Projeto desenvolvido pelo **Grupo 3** — *Projeto Integrador*  

<p align="center">
  <strong>Membros</strong><br><br>
  Eduardo Alves<br>
  Edvaldo Verissimo<br>
  Fernanda Brito<br>
  Jefferson Carvalho<br>
  Joe Chriszel<br>
  Mariana Santana<br>
  Mayara Oliveira
</p>


## Links Úteis

- [Documentação NestJS](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Swagger UI](http://localhost:4000/swagger) (após iniciar o projeto)
- [Repositório GitHub](https://github.com/projeto-int-grup-3/nutrija-backend)

---

<p align="center">Feito com ❤️ pelo Grupo 3</p>
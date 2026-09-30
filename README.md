<div align="center">

# 🚀 Production-Ready Express & TypeScript Boilerplate

[![Node.js Version](https://img.shields.io/badge/Node.js-v20.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![CI Status](https://img.shields.io/badge/CI-GitHub%20Actions-blue)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

_Um modelo de API RESTful em Node.js focado em padrões corporativos, observabilidade, segurança e arquitetura desacoplada._

[Destaques](#-principais-recursos) • [Arquitetura](#-arquitetura-e-padrões) • [Como Executar](#-como-executar) • [Documentação da API](#-documentação-da-api) • [Testes](#-testes-e-qualidade)

</div>

---

## 📌 Visão Geral

Este repositório fornece uma estrutura base para microsserviços e APIs corporativas em Node.js com TypeScript. Projetado com base nos princípios de arquitetura limpa e Fail-Fast, o projeto isola regras de negócio das camadas de infraestrutura e garante rastreabilidade e segurança prontas para ambientes de produção.

### 🌟 Principais Recursos

- **Fail-Fast Environment Validation:** A aplicação interrompe a inicialização no boot caso variáveis essenciais do `.env` estejam ausentes ou incorretas (via **Zod**).
- **Rastreabilidade Ponta a Ponta:** Atribuição de um UUID único em cada requisição (`X-Correlation-ID`) propagado em todas as etapas de log para rápido troubleshooting.
- **Tratamento Global e Centralizado de Erros:** Separação explícita entre erros operacionais conhecidos (`AppError`, `4xx`) e exceções críticas não tratadas (`500`).
- **Injeção de Dependências & Repository Pattern:** Camadas desacopladas permitindo fácil substituição de persistência de dados e testes unitários simplificados.
- **Segurança Nativa:** Proteção de cabeçalhos (`Helmet`), suporte a `CORS`, limitação de requisições por taxa (`Rate Limiting`) e validação estrita de esquemas em rotas.
- **Pronto para Conteinerização:** `Dockerfile` multi-stage otimizado rodando como usuário sem privilégios de `root` (`node`) e orquestração via `docker-compose`.
- **Encerramento:** Captura de sinais `SIGTERM`/`SIGINT` para fechamento adequado de conexões antes de interromper o processo.

---

## 📐 Arquitetura

O projeto adota uma arquitetura em camadas bem definida com fluxo unidirecional:

```text
[ Requisição HTTP ]
       │
       ▼
[ Middlewares ] ────► (Rate Limit, Helmet, Logger/CorrelationID, Auth, Zod Validation)
       │
       ▼
[ Controllers ] ────► (Tratamento da camada HTTP e parsing do DTO)
       │
       ▼
[ Services ]    ────► (Regras de negócio e casos de uso)
       │
       ▼
[ Repositories ]───► (Abstração e acesso aos dados / Banco de Dados)
```

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem & Runtime:** Node.js v20 (LTS), TypeScript 5.x
- **Framework Web:** Express.js
- **Validação de Dados:** Zod
- **Logs Estruturados:** Winston (JSON format)
- **Segurança:** Helmet, Express Rate Limit, CORS
- **Qualidade & Linter:** ESLint (Flat Config)
- **Testes:** Jest, Supertest, TS-Jest
- **DevOps & CI:** Docker, Docker Compose, GitHub Actions

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** v20 ou superior
- **npm** v10 ou superior
- **Docker** e **Docker Compose** _(opcional para execução em contêiner)_

---

### Opção 1: Execução Local (Desenvolvimento)

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/laurabgularte/corporate-api-template.git
   cd corporate-api-template
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env
   ```

4. **Inicie a aplicação em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A API estará acessível em `http://localhost:3000`.

---

### Opção 2: Execução via Docker Compose (Recomendado)

Suba o ambiente completo (compilação + execução segura) com um único comando:

```bash
docker compose up --build
```

Para encerrar:

```bash
docker compose down
```

---

## 📋 Documentação da API

### Autenticação

A API utiliza verificação via cabeçalho corporativo.

- **Cabeçalho Obrigatório:** `X-API-KEY`
- **Valor Padrão no `.env.example`:** `secret_corporate_token`

---

### Endpoints Principais

#### 1. Healthcheck

- **GET** `/health`
- **Autenticação:** Não necessária
- **Resposta (200 OK):**
  ```json
  {
    "status": "UP",
    "timestamp": "2026-09-30T14:24:35.000Z",
    "uptime": 12.45,
    "memoryUsage": { ... }
  }
  ```

---

#### 2. Criar Usuário

- **POST** `/api/v1/users`
- **Headers:**
  - `X-API-KEY: secret_corporate_token`
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "Maria Silva",
    "email": "maria.silva@empresa.com",
    "role": "ADMIN"
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "status": "success",
    "data": {
      "id": "e9b81f12-581d-4f01-9a3c-b2e1f34a5d6e",
      "name": "Maria Silva",
      "email": "maria.silva@empresa.com",
      "role": "ADMIN",
      "createdAt": "2026-09-30T14:24:35.000Z"
    }
  }
  ```
- **Resposta de Erro de Validação (400 Bad Request):**
  ```json
  {
    "status": "error",
    "statusCode": 400,
    "message": "Dados de entrada inválidos: [body.email: E-mail em formato inválido]",
    "correlationId": "f7d23a10-2b1d-4e92-823a-c321098871ab"
  }
  ```

---

#### 3. Listar Usuários

- **GET** `/api/v1/users`
- **Headers:** `X-API-KEY: secret_corporate_token`
- **Resposta (200 OK):**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "e9b81f12-581d-4f01-9a3c-b2e1f34a5d6e",
        "name": "Maria Silva",
        "email": "maria.silva@empresa.com",
        "role": "ADMIN",
        "createdAt": "2026-09-30T14:24:35.000Z"
      }
    ]
  }
  ```

---

## 🧪 Testes e Qualidade

O repositório possui suporte a testes automatizados focados na camada de domínio e rotas.

```bash
# Executar verificação do Linter
npm run lint

# Executar todos os testes unitários
npm run test

# Executar testes gerando relatório de cobertura de código
npm run test:coverage

# Compilar o código TypeScript para produção
npm run build
```

---

## 🛡️ Observabilidade e Padronização de Logs

Os logs são emitidos no formato JSON no console em ambientes não locais, facilitando a ingestão por agregadores como ELK, Datadog ou AWS CloudWatch:

```json
{
  "level": "info",
  "message": "Requisição HTTP processada",
  "service": "corporate-api",
  "correlationId": "8f03221e-128a-49bd-a3e9-74d1297921ba",
  "method": "POST",
  "url": "/api/v1/users",
  "statusCode": 201,
  "durationMs": "14ms",
  "timestamp": "2026-09-30 14:24:35"
}
```

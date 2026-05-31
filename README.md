# 🌍 API de Consulta de Cidades e Clima

> API RESTful para consulta de informações de cidades brasileiras e dados climáticos.

Desenvolvido com Node.js e Express para demonstrar integração com APIs externas de geolocalização e clima.

## 🎯 Sobre o Projeto

Esta API foi desenvolvida para demonstrar a integração entre múltiplas APIs externas, oferecendo uma solução centralizada para consultar:
- Informações de cidades brasileiras
- Dados climáticos em tempo real

O projeto implementa boas práticas de desenvolvimento como separação de responsabilidades, tratamento de erros estruturado e testes automatizados.

---

## ✨ Funcionalidades

- ✅ Consulta de clima por nome de cidade (Brasil)
- ✅ Integração com APIs de geolocalização (Geocoding)
- ✅ Integração com APIs meteorológicas(BrasilAPI)
- ✅ Validação de cidades brasileiras
- ✅ Tratamento de erros customizados
- ✅ Testes automatizados via Postman/Newman
- ✅ CORS habilitado para requisições frontend

---

## 🛠️ Tecnologias

| Categoria | Tecnologias |
|-----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5.2.1 |
| **Teste** | Newman (Postman CLI) |
| **Utilities** | CORS |

---

## 🚀 Instalação

### 1. Clonar o Repositório
```bash
git clone <url-do-repositorio>
cd projeto-consulta-cidade-clima
```

### 2. Instalar Dependências
```bash
npm install
```

Isso irá instalar todas as dependências listadas em `package.json`:

- express
- cors
- newman

---

## 💻 Como Usar

### Iniciar o Servidor

```bash
npm start
```

O servidor iniciará em: **http://localhost:3000**

**Output esperado:**
```
Servidor rodando na porta 3000...
```

---

## 🔌 Endpoints

### Health check

**Função:** checa a saúde da API 

```http
GET /api/v1/health
```

**Exemplo de Requisição:**
```bash
GET "http://localhost:3000/api/v1/health"
```

**Exemplo de Resposta:**
```bash
{
  "status": "healthy",
  "versao": "1.0.0",
  "timestamp": "2026-05-31T23:10:54.243Z"
}
```

### Listar cidades de um estado

**Função:** Lista todas as cidades do estado solicitado

```http
GET /api/v1/cidades/:estado?limite=x
```

**Parâmetros:**
- `estado` (string, obrigatório): Nome do estado brasileiro
- `limite` (inteiro, opcional): Quantidade maxima de cidades que serão retornadas

**Exemplo de Requisição:**
```bash
GET "http://localhost:3000/api/v1/cidades/CE?limite=2"
```

**Exemplo de Resposta:**
```bash
{
  "uf": "CE",
  "quantidade_retornada": 2,
  "cidades": [
    {
      "nome": "ABAIARA"
    },
    {
      "nome": "ACARAPE"
    }
  ]
}
```

### Busca clima

**Função:** Retorna informações atuais sobre o clima da cidade requisitada

```http
GET /api/v1/clima/:cidade
```

**Parâmetros:**
- `cidade` (string, obrigatório): Nome de cidade brasileira

**Exemplo de Requisição:**
```bash
GET "http://localhost:3000/api/v1/clima/fortaleza"
```

**Exemplo de Resposta:**
```bash
{
  "nome": "Fortaleza",
  "estado": "CE",
  "clima": {
    "condicao": "pn",
    "condicao_desc": "Parcialmente Nublado",
    "min": 23,
    "max": 32,
    "indice_uv": 0
  },
  "unidades": {
    "temperatura": "°C"
    },
  "consultado_em": "2026-05-31T23:15:17.033Z"
}
```

---

## 🧪 Testes

### Rodar Testes Automatizados

```bash
npm test
```

Isso executa a suite de testes do Postman via Newman.

**O que é testado:**
- ✅ Resposta válida para cidades brasileiras
- ✅ Validação de campos obrigatórios
- ✅ Rejeição de cidades inválidas
- ✅ Rejeição de cidades fora do Brasil
- ✅ Formato correto de respostas JSON
- ✅ Códigos HTTP apropriados


---

## 📁 Estrutura do Projeto

```
projeto-consulta-cidade-clima/
├── src/
│   │
│   ├── controller/
│   │   ├── publicController.js   # Controllers de rotas públicas
│   │   └── utilsController.js    # Controllers utilitários
│   │
│   ├── service/
│   │   ├── publicServices.js     # Lógica de negócio pública
│   │   └── utilsServices.js      # Serviços utilitários
│   │
│   ├── routes/
│   │   ├── publicRoutes.js       # Rotas públicas da API
│   │   └── utilsRoutes.js        # Rotas auxiliares
│   │
│   └── APIs/
│       ├── brasilAPI.js          # Integração BrasilAPI
│       └── geoCoding.js          # Integração open-meteo geocoding
│
├── tests/
│   └── api_test.js               # Runner de testes
│
├── docs/
│   └── Projeto consulta cidade clima.postman_collection #collection de testes
│
├── package.json                  # Dependências e scripts
├── README.md                     # Este arquivo
└── server.js                     # Arquivo principal do servidor
```

---

## 📖 APIs Externas Utilizadas

### BrasilAPI
- **Uso:** Consulta de informações de cidades brasileiras e informações climáticas
- **Documentação:** https://brasilapi.com.br/docs

### Geocoding
- **Uso:** Consulta de coordenadas atraves de nome de cidades
- **URL:** https://open-meteo.com/en/docs/geocoding-api

---

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor em produção |
| `npm test` | Executa testes automatizados |

---

## ✍️ Autores

**Integrantes:** Veja arquivo [INTEGRANTES.md](./INTEGRANTES.md)




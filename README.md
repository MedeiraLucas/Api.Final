# API RESTful com Node.js, Express e Sequelize/MySQL

## Tecnologias Utilizadas

| Tecnologia         | Descrição                                     
|--------------------|----------------------------------------------- |
| Node.js            | Ambiente de execução de JavaScript no servidor |
| Express.js         | Framework web para APIs RESTful                |
| MySQL              | Banco de dados relacional                      |
| TypeORM/Sequelize  | ORM para abstração e manipulação de dados      | 
| bcryptjs           | Criptografia de senhas                         | 
| JWT                | Autenticação com tokens seguros                | 
| dotenv             | Gerenciamento de variáveis de ambiente         |
| Swagger            | Documentação interativa da API                 | 
| Nodemon            | Reinicialização automática em desenvolvimento  |  

---

## 📁 Estrutura do Projeto

O projeto foi estruturado com base em boas práticas e separação de responsabilidades:

/src
├── 🛠️  config/       → Configurações gerais (banco de dados, variáveis de ambiente)
├── 🎮  controllers/  → Lógica das rotas (entrada de dados e respostas)
├── 🧱  models/       → Modelos de dados (tabelas do banco via ORM)
├── 🛡️  middlewares/  → Autenticação, tratamento de erros, logs, etc.
├── 🌐  routes/       → Definição das rotas da API, agrupadas por módulo
├── 🧠  services/     → Regras de negócio isoladas (opcional)
├── 📚  docs/         → Documentação da API (Swagger)
├── 🧰  utils/        → Funções auxiliares reutilizáveis (opcional)
├── 🚪  app.js        → Configuração e carregamento do Express
└── 🖥️  server.js     → Inicialização do servidor HTTP


---

## ✅ Funcionalidades Implementadas

### 🔐 Autenticação e Usuários

- Cadastro de usuário com hash de senha
- Login com geração de JWT
- Middleware de verificação de token
- Atualização de perfil
- Exclusão de conta
- Consulta de perfil autenticado

### 📦 Gestão de Produtos

- Cadastro de produtos com nome, descrição, preço e quantidade de estoque
- Listagem geral e individual de produtos
- Atualização e exclusão de produtos
- Relacionamento com categorias (1:N)

### 🗂️ Categorias de Produto

- Criação de categorias
- Listagem de todas as categorias
- Associação de produtos a uma categoria
- Atualização e exclusão de categorias (com checagem de produtos associados)

### 🧾 Pedidos

- Criação de pedidos por usuários autenticados
- Cada pedido pode conter múltiplos produtos
- Relacionamento N:N com tabela intermediária
- Consulta de pedidos por usuário e por ID
- Cancelamento de pedidos

---


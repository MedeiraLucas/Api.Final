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
├── config/ # Configurações do projeto (DB, .env, etc.)
├── controllers/ # Lógica de controle de cada rota
├── models/ # Entidades do TypeORM/Sequelize (tabelas do banco)
├── middlewares/ # Autenticação, erros, logs
├── routes/ # Rotas da API agrupadas por módulo
├── services/ # Lógica de negócio (se necessário)
├── docs/ # Documentação Swagger
├── utils/ # Funções auxiliares (se necessário)
├── app.js # Inicialização do Express (se necessário)
└── server.js # Inicialização do servidor


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


// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importações principais
const express = require('express');
const cors = require('cors'); // Permite requisições de outros domínios (ex: frontend)
const { db } = require('./config/database'); // Conexão com o banco de dados
const { swaggerUi, swaggerSpec } = require('./swagger'); // Documentação Swagger

// Importação de models 
const { User, Category, Product, Order, OrderProduct } = require('./models');

// Cria a aplicação Express
const app = express();

// Middleware de log (personalizado)
const logger = require('./middleware/logger.js');
app.use(logger); // Aplica o middleware de log

// Middleware que habilita o CORS
app.use(cors());

// Middleware para trabalhar com JSON no corpo das requisições
app.use(express.json());

// Rotas da aplicação
const userRoutes     = require('./routes/UserRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes  = require('./routes/ProductRoutes');
const orderRoutes    = require('./routes/OrderRoutes');

// Middleware para mostrar o método e a URL de cada requisição
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rota da documentação Swagger
app.use('/api-rodando', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota inicial
app.get('/', (req, res) => {
  res.send('API Rodando ');
});

// Definição das rotas principais da API
app.use('/api/users',      userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/orders',     orderRoutes);

// Conecta e sincroniza com o banco de dados
db.sync({ force: true })
  .then(() => {
    console.log('✅ Banco de dados conectado e sincronizado');

    // Inicia o servidor na porta definida no .env ou padrão 3000
    app.listen(process.env.PORT || 3000, () => {
      console.log(` Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

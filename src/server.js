// src/server.js
require('dotenv').config();
const express    = require('express');
const { db } = require('./config/database');
const { User, Category, Product, Order, OrderProduct } = require('./models');
const { swaggerUi, swaggerSpec } = require('./swagger'); // Importa o arquivo swagger.js
const cors = require('cors'); // Importa o middleware CORS

const app = express();
const logger = require('./middleware/logger.js');

app.use(logger);
app.use(cors()); // Usa o middleware CORS

app.use(express.json()); 

const userRoutes     = require('./routes/UserRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes  = require('./routes/ProductRoutes');
const orderRoutes    = require('./routes/OrderRoutes');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// Rota de documentação
app.use('/api-rodando', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  res.send('Api Rodando');
}); 


app.use('/api/users',     userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/orders',    orderRoutes);

db.sync({ force: true })  // authenticate() 
  .then(() => {
    console.log('Banco de dados conectado e sincronizado');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
  })
  .catch(console.error);

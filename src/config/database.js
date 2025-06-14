//config/database.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { Sequelize } = require('sequelize');

// Verifica se o dialect está sendo lido corretamente
console.log('DB_DIALECT:', process.env.DB_DIALECT); 

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql', // Define o dialect padrão como 'mysql'
    port: process.env.DB_PORT
  }
);


db.authenticate()
  .then(() => console.log('Conectado ao MySQL!'))
  .catch(err => console.error('Erro ao conectar:', err));

module.exports = { db, Sequelize };
// src/models/index.js

// Importando os modelos
const User = require('./user');
const Category = require('./category');
const Product = require('./product');
const Order = require('./order');
const OrderProduct = require('./orderProduct');

// Relacionamento: Um usuário pode ter vários pedidos
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Relacionamento: Uma categoria pode ter vários produtos
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Relacionamento N:N entre pedidos e produtos (tabela intermediária: OrderProduct)
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'orderId',
  otherKey: 'productId'
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'productId',
  otherKey: 'orderId'
});

// Exportando os modelos pra usar em outros arquivos
module.exports = { User, Category, Product, Order, OrderProduct };

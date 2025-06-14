// src/controllers/orderController.js
const { Order, Product, OrderProduct } = require('../models');

// Função para criar um novo pedido
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;           // Pega o ID do usuário autenticado
    const { items } = req.body;           // Recebe os itens do corpo da requisição

    // Cria o pedido com o ID do usuário
    const order = await Order.create({ userId });

    // Cria os registros de cada item do pedido (produto + quantidade)
    const orderProducts = items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity || 1         // Se não mandar quantidade, considera 1
    }));
    await OrderProduct.bulkCreate(orderProducts); // Salva todos de uma vez só

    // Busca o pedido com os produtos relacionados
    const newOrder = await Order.findByPk(order.id, {
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] } // mostra só a quantidade na relação
      }]
    });

    res.status(201).json(newOrder); // Retorna o pedido criado
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao criar pedido',
      error: error.message
    });
  }
};

// Função para listar todos os pedidos do usuário logado
exports.getByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Busca todos os pedidos do usuário com os produtos
    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }
      }]
    });

    res.json(orders); // Retorna a lista de pedidos
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar pedidos',
      error: error.message
    });
  }
};

// Função para buscar um pedido específico do usuário
exports.getById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Busca o pedido pelo ID e verifica se é do usuário
    const order = await Order.findOne({
      where: { id, userId },
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }
      }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar pedido',
      error: error.message
    });
  }
};

// Função para cancelar um pedido (excluir ou marcar como cancelado)
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Verifica se o pedido existe e pertence ao usuário
    const order = await Order.findOne({
      where: { id, userId }
    });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Remove os itens do pedido da tabela de junção
    await OrderProduct.destroy({ where: { orderId: order.id } });

    // Remove o próprio pedido
    await order.destroy();

    res.json({ message: 'Pedido cancelado com sucesso' });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao cancelar pedido',
      error: error.message
    });
  }
};

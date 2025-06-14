// src/controllers/productController.js
const { Product, OrderProduct } = require('../models');

// Lista todos os produtos cadastrados
exports.getAll = async (_req, res) => {
  try {
    const prods = await Product.findAll(); // Busca todos os produtos
    res.json(prods);                      // Retorna em formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
  }
};

// Busca um produto específico pelo ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const prod = await Product.findByPk(id); // Busca pela chave primária
    if (!prod) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(prod); // Retorna o produto
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

// Cria um novo produto
exports.create = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    // Cria um novo registro na tabela de produtos
    const newProd = await Product.create({ name, price, categoryId });

    res.status(201).json(newProd); // Retorna o produto criado
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
  }
};

// Atualiza os dados de um produto existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;

    // Procura o produto pelo ID
    const prod = await Product.findByPk(id);
    if (!prod) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Atualiza os campos se foram enviados na requisição
    prod.name       = name       || prod.name;
    prod.price      = price      || prod.price;
    prod.categoryId = categoryId || prod.categoryId;

    await prod.save(); // Salva as alterações no banco

    res.json(prod); // Retorna o produto atualizado
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

// Deleta um produto, se não estiver vinculado a pedidos
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Procura o produto pelo ID
    const prod = await Product.findByPk(id);
    if (!prod) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verifica se o produto está vinculado a algum pedido
    const count = await OrderProduct.count({ where: { productId: prod.id } });
    if (count > 0) {
      return res.status(409).json({
        message: 'A exclusão foi bloqueada: o produto está vinculado a pedidos ativos'
      });
    }

    await prod.destroy(); // Remove o produto do banco
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
  }
};

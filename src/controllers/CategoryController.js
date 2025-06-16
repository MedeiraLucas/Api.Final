const { Category, Product } = require('../models');

// Lista todas as categorias do banco
exports.getAll = async (_req, res) => {
  try {
    const categories = await Category.findAll(); // Busca todas as categorias
    res.json(categories);                        // Retorna em formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error: error.message });
  }
};

// Busca uma categoria específica pelo ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const cat = await Category.findByPk(id); // Busca a categoria pela chave primária
    if (!cat) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.json(cat); // Retorna a categoria encontrada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categoria', error: error.message });
  }
};

// Cria uma nova categoria
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    // Cria a categoria com o nome recebido no corpo da requisição
    const newCategory = await Category.create({ name });

    res.status(201).json(newCategory); // Retorna a categoria criada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
  }
};

// Atualiza uma categoria existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Busca a categoria pelo ID
    const cat = await Category.findByPk(id);
    if (!cat) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Atualiza o nome se foi enviado no corpo
    cat.name = name || cat.name;
    await cat.save(); // Salva a alteração

    res.json(cat); // Retorna a categoria atualizada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error: error.message });
  }
};

// Exclui uma categoria, se não tiver produtos vinculados
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const cat = await Category.findByPk(id); // Busca a categoria
    if (!cat) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Verifica se existem produtos vinculados à categoria
    const produtosRelacionados = await Product.count({ where: { categoryId: cat.id } });
    if (produtosRelacionados > 0) {
      return res.status(409).json({
        message: 'Exclusão não permitida: há produtos associados a esta categoria'
      });
    }

    await cat.destroy(); // Remove a categoria do banco
    res.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir categoria', error: error.message });
  }
};

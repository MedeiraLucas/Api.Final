/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operações com categorias
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Lista de categorias retornada com sucesso
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retorna categoria por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Categoria encontrada
 *       '404':
 *         description: Categoria não encontrada
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Eletrônicos
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso
 *       '400':
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Informática
 *     responses:
 *       '200':
 *         description: Categoria atualizada com sucesso
 *       '404':
 *         description: Categoria não encontrada
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria (se não houver produtos vinculados)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       '200':
 *         description: Categoria deletada com sucesso
 *       '404':
 *         description: Categoria não encontrada
 *       '409':
 *         description: Não é possível deletar categoria vinculada a produtos
 */





const express = require('express');
const router = express.Router();
const auth = require('../middleware/Middleware');
const CategoryController = require('../controllers/CategoryController');

// Rotas públicas (consulta de categorias)
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

// Rotas protegidas exigem token
router.post('/', auth, CategoryController.create);
router.put('/:id', auth, CategoryController.update);
router.delete('/:id', auth, CategoryController.delete);

module.exports = router;

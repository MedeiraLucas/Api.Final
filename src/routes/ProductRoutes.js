/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operações com produtos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Lista de produtos
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retorna produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Produto encontrado
 *       '404':
 *         description: Produto não encontrado
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, categoryId]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Produto A
 *               price:
 *                 type: number
 *                 example: 99.99
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Produto Atualizado
 *               price:
 *                 type: number
 *                 example: 149.90
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *       '404':
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Produto deletado com sucesso
 *       '404':
 *         description: Produto não encontrado
 */


//ProductRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/Middleware');
const ProductController = require('../controllers/ProductController');

// Rotas públicas
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

// Rotas protegidas
router.post('/', auth, ProductController.create);
router.put('/:id', auth, ProductController.update);
router.delete('/:id', auth, ProductController.delete);

module.exports = router;

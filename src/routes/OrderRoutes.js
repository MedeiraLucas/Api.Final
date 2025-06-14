/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operações com pedidos
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 description: Lista de produtos no pedido
 *                 items:
 *                   type: object
 *                   required: [productId, quantity]
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       '201':
 *         description: Pedido criado com sucesso
 *       '400':
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista todos os pedidos do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de pedidos retornada com sucesso
 *       '401':
 *         description: Não autorizado
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retorna um pedido específico do usuário
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: Pedido encontrado
 *       '404':
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancela um pedido (soft delete)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: Pedido cancelado com sucesso
 *       '404':
 *         description: Pedido não encontrado
 */


const express = require('express');
const router = express.Router();
const auth = require('../middleware/Middleware');
const OrderController = require('../controllers/OrderController');

// Todas as rotas de pedido exigem autenticação
router.post('/', auth, OrderController.createOrder);
router.get('/', auth, OrderController.getByUser);
router.get('/:id', auth, OrderController.getById);
router.delete('/:id', auth, OrderController.cancelOrder);

module.exports = router;

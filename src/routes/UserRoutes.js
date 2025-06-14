/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações com usuários
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lucas
 *               email:
 *                 type: string
 *                 example: lucas@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *       '409':
 *         description: Email já cadastrado
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '200':
 *         description: Retorna token JWT
 *       '401':
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Retorna perfil do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil retornado com sucesso
 *       '401':
 *         description: Token ausente ou inválido
 */

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Atualiza perfil do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: novoemail@exemplo.com
 *     responses:
 *       '200':
 *         description: Perfil atualizado
 *       '404':
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /api/users/profile/password:
 *   put:
 *     summary: Altera a senha do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: senha123
 *               newPassword:
 *                 type: string
 *                 example: novaSenha456
 *     responses:
 *       '200':
 *         description: Senha alterada com sucesso
 *       '400':
 *         description: Senha atual incorreta
 */

/**
 * @swagger
 * /api/users/profile:
 *   delete:
 *     summary: Deleta a conta do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Conta deletada com sucesso
 *       '404':
 *         description: Usuário não encontrado
 */


const express = require('express');
const router = express.Router();
const auth = require('../middleware/Middleware');
const Usercontroller = require('../controllers/userController');

// Rotas públicas
router.post('/register', Usercontroller.register);
router.post('/login', Usercontroller.login);

// Rotas protegidas (exigem token JWT válido)
router.get('/profile', auth, Usercontroller.getProfile);
router.put('/profile', auth, Usercontroller.updateProfile);
router.put('/profile/password', auth, Usercontroller.changePassword);
router.delete('/profile', auth, Usercontroller.deleteAccount);

module.exports = router;

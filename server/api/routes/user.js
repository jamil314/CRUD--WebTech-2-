const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../auth/auth_jwt');

router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:userId', userController.getUserById);
router.patch('/:userId', checkAuth, userController.updateUser);

module.exports = router;
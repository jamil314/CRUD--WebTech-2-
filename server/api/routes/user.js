const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middlewares/auth_jwt');

router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/byid/:userId', userController.getUserById);
router.patch('/', checkAuth, userController.updateUser);
router.patch('/changepassword', checkAuth, userController.changePass);
router.post('/check', userController.userNameAvailable);
router.get('/auth', checkAuth, userController.authUser);

module.exports = router;
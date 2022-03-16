const express = require('express');
const authController = require('../controllers/authController');
const { validateUser } = require('../middleware');

const authRouter = express.Router();

authRouter.post('/login', validateUser, authController.loginUser);
authRouter.post('/register', validateUser, authController.registerUser);

module.exports = authRouter;

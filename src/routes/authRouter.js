const express = require('express');
const authController = require('../controllers/authController');
const { validateUser, validateRegistration } = require('../middleware');

const authRouter = express.Router();

authRouter.post('/login', validateUser, authController.loginUser);
authRouter.post('/register', validateRegistration, authController.registerUser);

module.exports = authRouter;

/* eslint-disable comma-dangle */
const express = require('express');
const accountsController = require('../controllers/accountsController');
const { validateToken } = require('../middleware');

const accountsRouter = express.Router();

accountsRouter.post(
  '/accounts',
  validateToken,
  accountsController.postAccounts
);

module.exports = accountsRouter;

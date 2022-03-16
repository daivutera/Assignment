const express = require('express');
const billsController = require('../controllers/billsController');
const { validateToken } = require('../middleware');

const billsRouter = express.Router();

billsRouter.post('/bills', validateToken, billsController.postBillToGroup);
billsRouter.get('/bills/:id', validateToken, billsController.getBillsById);

module.exports = billsRouter;

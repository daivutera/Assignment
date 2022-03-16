/* eslint-disable camelcase */
const { ErrorCase, successCase } = require('../helpers');
const { postBillToGroupDb, getBillsByIdDb } = require('../models/billsModel');

async function getBillsById(req, res) {
  const group_id = req.params.id;
  const users = await getBillsByIdDb(group_id);
  if (users === false) {
    ErrorCase(res);
    return;
  }
  successCase(res, users);
}

async function postBillToGroup(req, res) {
  const { group_id, amount, description } = req.body;
  const users = await postBillToGroupDb(group_id, amount, description);
  if (users === false) {
    ErrorCase(res);
    return;
  }
  successCase(res, users);
}

module.exports = { getBillsById, postBillToGroup };

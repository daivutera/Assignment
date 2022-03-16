/* eslint-disable camelcase */
const { ErrorCase, successCase } = require('../helpers');
const { accountsToDb } = require('../models/accountsModel');

async function postAccounts(req, res) {
  const { group_id } = req.body;
  const user_id = req.userId;
  const users = await accountsToDb(group_id, user_id);
  if (users === false) {
    ErrorCase(res);
    return;
  }
  successCase(res, users);
}

module.exports = { postAccounts };

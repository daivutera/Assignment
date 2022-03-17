/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const {
  ErrorCase,
  successCase,
  verifyHash,
  generateJwtToken,
  hashPass,
} = require('../helpers');
const { userLoginDb, registerUserToDb } = require('../models/authModel');

async function loginUser(req, res) {
  const { email, password } = req.body;
  const users = await userLoginDb(email);

  if (users === false) {
    ErrorCase(res);
    return;
  }
  if (!users.length) {
    return ErrorCase(res, 'password or email does not match 1');
  }

  const foundUserObj = users[0];

  if (!verifyHash(password, foundUserObj)) {
    return ErrorCase(res, 'password or email does not match 2');
  }
  const token = generateJwtToken(foundUserObj);
  successCase(res, token);
}

async function registerUser(req, res) {
  const { full_name, email, password } = req.body;
  const passwordHashed = hashPass(password);
  const users = await registerUserToDb(full_name, email, passwordHashed);
  if (users === false) {
    ErrorCase(res);
    return;
  }
  successCase(res, users);
}

module.exports = { loginUser, registerUser };

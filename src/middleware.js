/* eslint-disable consistent-return */
/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { verifyJwtToken, ErrorCase } = require('./helpers');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().min(4).max(100).required(),
    password: Joi.string().min(5).max(100).required(),
  });
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log('error from joi', error);
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
      success: false,
    }));
    console.log('formatedError', formatedError);
    res.status(400).json({ formatedError, success: false });
  }
}

function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return ErrorCase(res, 'no token', 401);

  const verifyResult = verifyJwtToken(tokenGotFromUser);
  if (verifyResult === false) return ErrorCase(res, 'invalid token', 403);
  console.log('verifyResult===', verifyResult);
  req.userId = verifyResult.id;
  next();
}

module.exports = { validateUser, validateToken };

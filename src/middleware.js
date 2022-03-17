/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
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
    res.status(400).json({ formatedError, success: false });
  }
}
async function validateRegistration(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().min(2).max(100).required(),
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
    res.status(400).json({ formatedError, success: false });
  }
}

function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return ErrorCase(res, 'no token', 401);

  const verifyData = verifyJwtToken(tokenGotFromUser);
  if (verifyData === false)
    return ErrorCase(res, 'Your session expired, please login again', 403);
  req.userId = verifyData.id;
  next();
}

module.exports = { validateUser, validateToken, validateRegistration };

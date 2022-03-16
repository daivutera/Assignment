const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function successCase(res, data, status = 200) {
  res.status(status).json({
    success: true,
    data,
  });
}

function ErrorCase(res, message = 'error with db function', status = 500) {
  res.status(status).json({
    success: false,
    message,
  });
}

function hashPass(receivedPassword) {
  return bcrypt.hashSync(receivedPassword, 10);
}

function verifyHash(receivedPass, userObj) {
  return bcrypt.compareSync(receivedPass, userObj.password);
}
function generateJwtToken(userObj) {
  const jwtSecret = process.env.JWT_TOKEN_SECRET;
  return jwt.sign({ id: userObj.id }, jwtSecret, { expiresIn: '1h' });
}

function verifyJwtToken(token) {
  const jwtSecret = process.env.JWT_TOKEN_SECRET;

  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (err) {
    // err
    console.log('err ===', err.message);
    return false;
  }
}
module.exports = {
  successCase,
  ErrorCase,
  hashPass,
  verifyHash,
  generateJwtToken,
  verifyJwtToken,
};

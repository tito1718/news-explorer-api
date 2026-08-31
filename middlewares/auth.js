const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const { JWT_SECRET = 'development-secret' } = process.env;

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new UnauthorizedError());
  }

  Object.assign(req, { user: payload });
  return next();
};

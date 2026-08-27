const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'development-secret' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'Authorization required',
    });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).send({
      message: 'Authorization required',
    });
  }

  Object.assign(req, { user: payload });
  return next();
};

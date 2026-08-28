const { isCelebrateError } = require('celebrate');

const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (isCelebrateError(err)) {
    return res.status(400).send({
      message: 'Invalid request data',
    });
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};

module.exports = errorHandler;

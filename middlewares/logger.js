const winston = require('winston');
const expressWinston = require('express-winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: logFormat,
  requestWhitelist: ['method', 'url', 'originalUrl'],
  responseWhitelist: ['statusCode'],
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
  format: logFormat,
  requestWhitelist: ['method', 'url', 'originalUrl'],
  responseWhitelist: ['statusCode'],
});

module.exports = {
  requestLogger,
  errorLogger,
};

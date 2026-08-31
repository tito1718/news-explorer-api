const AppError = require('./app-error');

class UnauthorizedError extends AppError {
  constructor(message = 'Authorization required') {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;

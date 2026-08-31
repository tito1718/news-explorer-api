const AppError = require('./app-error');

class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403);
  }
}

module.exports = ForbiddenError;

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

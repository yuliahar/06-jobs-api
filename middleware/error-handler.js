const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // General error handling
  const error = {
    status: 'error',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
  };

  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
};

module.exports = errorHandlerMiddleware;


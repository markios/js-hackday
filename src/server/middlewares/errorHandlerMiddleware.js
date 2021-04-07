import boom from 'boom';
import sendError from '../utils/sendError.js';

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const { output: { statusCode }, message } = err.isBoom ? err : boom.badImplementation();
  sendError({ res, statusCode, message });
};

export default errorMiddleware;
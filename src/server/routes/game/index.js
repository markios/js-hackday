import boom from 'boom';
import sendError from '../../utils/sendError.js';

const { message, output: { statusCode } } = boom.notFound();
const notFoundMiddleware = (_, res) => sendError({ res, message, statusCode });

export default notFoundMiddleware;
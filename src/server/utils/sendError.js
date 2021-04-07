const sendError = ({ res, statusCode, message }) => {
  res.status(statusCode).json({ message });
};

export default sendError;
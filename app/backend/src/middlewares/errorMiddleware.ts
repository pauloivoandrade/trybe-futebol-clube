import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(status).json({ message });
};

export default errorMiddleware;

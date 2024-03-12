import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  const token = authorization.split(' ');
  console.log(token[1]);

  try {
    const user = jwt.verify(token[1], process.env.JWT_SECRET as string);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authMiddleware;

import { NextFunction, Request, Response } from 'express';
import userValidation from '../services/validations/userValidation';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const message = userValidation(req.body);

  if (message) return res.status(400).json({ message });

  next();
};

export default validateLogin;

import { NextFunction, Request, Response } from 'express';
import userValidation from '../services/validations/userValidation';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const error = userValidation(req.body);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  next();
};

export default validateLogin;

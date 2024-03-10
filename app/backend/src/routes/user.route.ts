import * as express from 'express';
import UserService from '../services/user.service';
import authMiddleware from '../middlewares/authorization';
import validateLogin from '../middlewares/loginValidation';
import UserController from '../controller/user.controller';
import validateToken from '../middlewares/tokenValidation';

const loginRoute = express.Router();

const usersController = new UserController(new UserService());

loginRoute.get('/validate', authMiddleware, usersController.findRole);
loginRoute.post('/', usersController.login, validateLogin);
loginRoute.get('/role', validateToken, (req, res) => {
  const role = req.user?.role;
  res.status(200).json({ role });
});

export default loginRoute;

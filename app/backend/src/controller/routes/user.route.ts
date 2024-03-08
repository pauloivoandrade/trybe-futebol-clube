import * as express from 'express';
import UserService from '../../services/user.service';
import authMiddleware from '../../middlewares/authorization';
import validateLogin from '../../middlewares/loginValidation';
import UserController from '../user.controller';

const loginRoute = express.Router();

const usersController = new UserController(new UserService());

loginRoute.get('/validate', authMiddleware, usersController.findRole);
loginRoute.post('/', validateLogin, usersController.login);

export default loginRoute;

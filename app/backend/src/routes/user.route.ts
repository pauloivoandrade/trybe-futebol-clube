import * as express from 'express';
import UserService from '../middlewares/user.service';
import authMiddleware from '../middlewares/authorization';
import validateLogin from '../middlewares/loginValidation';
import UserController from '../controller/user.controller';
// import validateToken from '../middlewares/tokenValidation';

const loginRoute = express.Router();

const usersController = new UserController(new UserService());

loginRoute.post('/', validateLogin, usersController.login);
loginRoute.get('/role', authMiddleware, usersController.findRole);
// loginRoute.get('/role', validateToken, usersController.findRole);

export default loginRoute;

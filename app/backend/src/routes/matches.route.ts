import * as express from 'express';
import authMiddleware from '../middlewares/authorization';
import MatchService from '../services/matches.service';
import MatchController from '../controller/matches.controller';

const matchRoute = express.Router();

const matchController = new MatchController(new MatchService());

matchRoute.get('/', matchController.findAll);
matchRoute.patch('/:id/finish', authMiddleware, matchController.finishMatch);

export default matchRoute;

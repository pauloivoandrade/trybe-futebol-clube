import * as express from 'express';
import MatchService from '../services/matches.service';
import MatchController from '../controller/matches.controller';

const matchRoute = express.Router();

const matchController = new MatchController(new MatchService());

matchRoute.get('/', matchController.findAll);

export default matchRoute;

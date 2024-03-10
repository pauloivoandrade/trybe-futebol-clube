import * as express from 'express';
import TeamService from '../services/teams.service';
import TeamController from '../controller/teams.controller';

const teamRoute = express.Router();

const teamController = new TeamController(new TeamService());

teamRoute.get('/', teamController.findAll);
teamRoute.get('/:id', teamController.findByPk);

export default teamRoute;

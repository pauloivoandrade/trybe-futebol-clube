import * as express from 'express';
import LeaderboardService from '../services/leaderBoard.service';
import LeaderboardController from '../controller/leaderBoard.controller';

const tabulationRoute = express.Router();

const leaderboardController = new LeaderboardController(new LeaderboardService());

tabulationRoute.get('/home', leaderboardController.getLeaderHome);
tabulationRoute.get('/away', leaderboardController.getLeaderAway);
tabulationRoute.get('/', leaderboardController.getGeneralLeader);

export default tabulationRoute;

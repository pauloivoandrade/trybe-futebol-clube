import { Request, Router, Response } from 'express';
import TeamController from '../controller/teams.controller';

const teamsRouter = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsRouter.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsRouter.getTeamById(req, res));

export default router;

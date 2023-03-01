import * as express from 'express';
import TeamsController from '../controller/TeamsController';

const router = express.Router();

const teamsController = new TeamsController();

router.get('/', (req, res)=>teamsController.teste(req, res));

export default router;
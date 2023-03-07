import * as express from 'express';
import MatchesController from '../controller/MatchesController';

const router = express.Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.fetchMatchesInfo(req, res));

export default router;

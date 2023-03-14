import * as express from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = express.Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getHomeLeaderBoard(req, res));
router.get('/away', (req, res) => leaderboardController.getAwayLeaderBoard(req, res));

export default router;

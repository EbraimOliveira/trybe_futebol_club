import * as express from 'express';
import LeaderboardController from '../controller/LeaderboardController';
// import JwtValidator from '../middlewares/JwtValidator';
// import JwtGenerator from '../utils/JwtGenerator';

const router = express.Router();

const leaderboardController = new LeaderboardController();
// const jwtGenerator = new JwtGenerator();
// const jwtValidator = new JwtValidator(jwtGenerator.secret);

router.get('/home', (req, res) => leaderboardController.finishedMatches(req, res));

export default router;

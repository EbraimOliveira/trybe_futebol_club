import * as express from 'express';
import JwtValidator from '../middlewares/JwtValidator';
import MatchesController from '../controller/MatchesController';
import JwtGenerator from '../utils/JwtGenerator';

const router = express.Router();

const matchesController = new MatchesController();
const jwtGenerator = new JwtGenerator();
const jwtValidator = new JwtValidator(jwtGenerator.secret);

router.get(
  '/',
  (req, res) => matchesController.fetchMatchesInfo(req, res),
);
router.patch(
  '/:id/finish',
  jwtValidator.tokenValidator,
  (req, res) => matchesController.finishMatch(req, res),
);

export default router;

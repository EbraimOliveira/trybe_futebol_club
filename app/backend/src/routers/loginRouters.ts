import * as express from 'express';
import JwtValidator from '../middlewares/JwtValidator';
import LoginController from '../controller/LoginController';
import UserValidator from '../middlewares/UserValidator';
import JwtGenerator from '../utils/JwtGenerator';

const router = express.Router();

const loginController = new LoginController();
const userValidator = new UserValidator();
const jwtGenerator = new JwtGenerator();
const jwtValidator = new JwtValidator(jwtGenerator.secret);

router.post(
  '/',
  userValidator.emailValidation,
  userValidator.passwordValidation,
  (req, res) => loginController.login(req, res),
);

router.get(
  '/role',
  jwtValidator.tokenValidator,
  (req, res) => loginController.getUserRole(req, res),
);

export default router;

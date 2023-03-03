import * as express from 'express';
import LoginController from '../controller/LoginController';
import UserValidation from '../middlewares/UserValidation';

const router = express.Router();

const loginController = new LoginController();
const userValidation = new UserValidation();

router.get(
  '/',
  userValidation.emailValidation,
  userValidation.passwordValidation,
  (req, res) => loginController.login(req, res),
);

export default router;

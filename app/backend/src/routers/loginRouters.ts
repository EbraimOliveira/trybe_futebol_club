import * as express from 'express';
import LoginController from '../controller/LoginController';

const router = express.Router();

const loginController = new LoginController();

router.get('/', (req, res) => loginController.teste(req, res));

export default router;

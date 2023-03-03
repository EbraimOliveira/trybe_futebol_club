import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from '../utils/statusCode';
import LoginService from '../service/LoginService';
import tokenGeneration from '../utils/tokenGeneration';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public async login(req:Request, res: Response)
    :Promise <Response> {
    const { email, password } = req.body;
    const user = await this._loginService.login(email, password);
    if (!user) {
      return res.status(BAD_REQUEST)
        .json({ message: 'Invalid email or password' });
    }
    const userId = user.id;
    const newToken = tokenGeneration(userId);
    return res.status(OK).json({ token: newToken });
  }
}

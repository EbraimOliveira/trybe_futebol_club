import { Request, Response } from 'express';
import { OK } from '../utils/statusCode';
import LoginService from '../service/LoginService';
// import tokenGeneration from '../utils/tokenGeneration';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public async login(req:Request, res: Response)
    :Promise <Response> {
    const {password} = req.body;
    const {email}= req.body;
    const user = await this._loginService.login(email, password);
    // const newToken = tokenGeneration(a)
    return res.status(OK).json(user);
  }
}

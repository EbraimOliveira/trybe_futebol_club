import { Request, Response } from 'express';
import { OK } from '../statusCode';
import LoginService from '../service/LoginService';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public async teste(_req:Request, res: Response)
    :Promise <Response> {
    const teams = await this._loginService.teste();
    return res.status(OK).json(teams);
  }
}

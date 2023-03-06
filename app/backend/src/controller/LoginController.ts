import { Request, Response } from 'express';
import { OK, UNAUTHORIZED } from '../utils/statusCode';
import LoginService from '../service/LoginService';
import JwtGenerator from '../utils/JwtGenerator';

export default class LoginController {
  private _loginService: LoginService;
  private _jwtGenerator: JwtGenerator;

  constructor() {
    this._loginService = new LoginService();
    this._jwtGenerator = new JwtGenerator();
  }

  public async login(req:Request, res: Response)
    :Promise <Response> {
    const { email, password } = req.body;
    const user = await this._loginService.login(email, password);
    if (!user) {
      return res.status(UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }
    const userId = user.id;
    const newToken = this._jwtGenerator.tokenGenerator(userId);
    return res.status(OK).json({ token: newToken });
  }

  public async getUserRole(req:Request, res:Response)
    :Promise <Response> {
    const { id } = req.body;

    const user = await this._loginService.getUser(id);
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'user Id not found' });
    }
    return res.status(OK).json({ role: user.role });
  }
}

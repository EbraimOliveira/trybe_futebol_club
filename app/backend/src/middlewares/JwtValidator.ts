import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { UNAUTHORIZED } from '../utils/statusCode';

type JwtPayload = {
  userId: string
};

export default class JwtValidator {
  private _secret:string;

  constructor(secret:string) {
    this._secret = secret;
  }

  public tokenValidator = (req:Request, res:Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
    }

    try {
      const payload = jwt.verify(token, this._secret);
      // as é um cast. interprete o resultado desse verify como sendo do tipo estipulado
      const { userId } = payload as JwtPayload;
      req.body.id = userId;

      next();
    } catch (error) {
      return res.status(UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    }
  };
}

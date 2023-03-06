import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { UNAUTHORIZED } from '../utils/statusCode';

type JwtPayload = {
  userId: string;
};

const { verify } = jwt;

export default class JwtValidator {
  private _secret:string;

  constructor(secret:string) {
    this._secret = secret;
  }

  public tokenValidator = async (req:Request, res:Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
    }

    try {
      const { userId } = await verify(token, this._secret) as JwtPayload;
      // as é um cast. interprete o resultado desse verify como sendo do tipo estipulado
      req.body.id = userId;
    } catch (error) {
      return res.status(UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    }

    next();
  };
}

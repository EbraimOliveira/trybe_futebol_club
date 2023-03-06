import { NextFunction, Request, Response } from 'express';

import { BAD_REQUEST, UNAUTHORIZED } from '../utils/statusCode';

export default class UserValidator {
  public emailValidation = (req:Request, res:Response, next: NextFunction) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const verify = regex.test(email);
    if (!email) {
      return res.status(BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }
    if (!verify) {
      return res.status(UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }
    next();
  };

  public passwordValidation = (req:Request, res:Response, next: NextFunction) => {
    const { password } = req.body;
    const MIN = 6;
    if (!password) {
      return res.status(BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }
    if (password.length < MIN) {
      return res.status(UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    }
    next();
  };
}

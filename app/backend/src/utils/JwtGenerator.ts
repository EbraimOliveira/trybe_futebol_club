import * as jwt from 'jsonwebtoken';

export default class JwtGenerator {
  private _secret: string;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'secret';
  }

  get secret():string {
    return this._secret;
  }

  public tokenGenerator = (userId: number):string | undefined => {
    const token = jwt.sign({ userId }, this._secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  };
}

// o sign serve para 'assinar' o jwt. Contem 3 partes:
// 1. um payload (informações que permitem identificar o usuario depois)
// 2. um secret, que é uma assinatura digital.
// 3. metadados do jwt,

import * as jwt from 'jsonwebtoken'; // <<<< extenão serve para gerar e verificar tokens

const secret = process.env.JWT_SECRET || 'secret';

export default (userId: number) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  // o sign serve para 'assinar' o jwt. Contem 3 partes:
  // 1. um payload (informações que permitem identificar o usuario depois)
  // 2. um secret, que é uma assinatura digital.
  // 3. metadados do jwt,
  return token;
};

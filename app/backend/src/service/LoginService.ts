import { compare } from 'bcryptjs';
import User from '../database/models/User';

export default class LoginService {
  public login = async (email: string, password: string)
  :Promise<User | null> => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  };

  // hash é a senha criptografada após a aplicação de um algoritmo no plainText;
  // plainText é a senha de fato, sem criptografar;
  // o compare vai passar novamente o plainText e comparar o hash resultante com o do banco;

  public getUser = async (id:number):Promise<User | null> => {
    const user = await User.findOne({ where: { id } });
    return user;
  };
}

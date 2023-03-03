import { compare } from 'bcryptjs';
import User from '../database/models/User';

export default class LoginService {
  public login = async (email: string, password: string)
  :Promise<User | null> => {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const validatedUser = await compare(password, user.password);
      if (validatedUser) {
        return user;
      }
    }
    return null;
  };
}

import User from '../database/models/User';
import { compare } from 'bcryptjs'


export default class LoginService {
  public login = async (email: string, password: string)
  :Promise<User | null> => {

    try{
      const user = await User.findOne({ where: { email}});
    if(user){
      const validatedUser = await  compare(password, user.password):Promise<boolean>
      return user;
    }
    } catch (error) {
        return null
    }
}
}

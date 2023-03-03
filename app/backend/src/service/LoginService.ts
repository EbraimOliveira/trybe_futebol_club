import Team from '../database/models/Team';

export default class LoginService {
  public teste = async ():Promise<Array<Team>> => {
    const teams = await Team.findAll();
    return teams;
  };
}

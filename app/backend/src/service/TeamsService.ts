import Team from '../database/models/Team';

export default class TeamsService {
  public findAll = async ():Promise<Array<Team>> => {
    const teams = await Team.findAll();
    return teams;
  };

  public getById = async (id:number):Promise<Team | null> => {
    const team = await Team.findByPk(id);
    return team;
  };
}

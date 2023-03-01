import Team from '../database/models/Team';

type team = {
  id:number,
  teamName:string,
};

export default class TeamsService {
  public findAll = async ():Promise<Array<team>> => {
    const teams = await Team.findAll();
    return teams;
  };

  public getById = async (id:number):Promise<team | null> => {
    const team = await Team.findByPk(id);
    return team;
  };
}

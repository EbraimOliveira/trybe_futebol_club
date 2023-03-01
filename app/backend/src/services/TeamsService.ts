import Team from '../database/models/Team';

export default class TeamsService {
  public async findAll():Promise<Array<any>> {
    const teams = await Team.findAll();
    return teams;
  }

  public async getById(id:number):Promise<any> {
    try {
      const team = await Team.findByPk(id);
      return team;
    } catch (error) {
      console.log(error);
    }
  }
}

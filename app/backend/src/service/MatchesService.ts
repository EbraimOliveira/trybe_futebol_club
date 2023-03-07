import Match from '../database/models/Match';

export default class MatchesService {
  public fetchMatchesInfo = async ():Promise<Match[]> => {
    const teams = await Match.findAll();
    return teams;
  };
}

import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchesService {
  public fetchMatchesInfo = async (inProgress:any):Promise<Match[]> => {
    let teams:Array<Match>;

    const inProgressBoolean = (inProgress === 'true');
    const associations = 
        [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ]

    if (inProgress) {
      teams = await Match.findAll({
        where: { inProgress: inProgressBoolean },
        include: associations });
    }

    teams = await Match.findAll(
      { include: associations },
    );

    return teams;
  };
}

// Linha 10: da model Team quero usar o atributo 'teamName' de homeTeam (que foi definido na model Match).

import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchesService {
  public fetchMatchesInfo = async (inProgress:any):Promise<Match[]> => {
    let teams:Array<Match>;

    const inProgressBoolean = (inProgress === 'true');
    console.log(inProgressBoolean);
    
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

// A função fetchMatchesInfo recebe o param inProgress do req.body e é validada se existe.
// No caso de não existir (!inProgress) retorna todas as partidas, sem filtros, que é o retorno default.
// No caso de existir entao vai cair no if. 
// Caso exista, o inProgress recebe um 'true' ou 'false' na query e eu crio um bollean comparando esse retorno com uma string 'true' no inProgressBoolean
// Então, dentro do if, comparo o boolean gerado com o dado da tabela, no campo inProgress, dentro do where.
// Se o boolean gerado no inProgressBolean for false então o findAll do if retornará todas as partidas onde o campo inProgress é === false.

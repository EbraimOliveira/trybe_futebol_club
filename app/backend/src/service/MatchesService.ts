import Team from '../database/models/Team';
import Match from '../database/models/Match';

const associations = [
  { model: Team, as: 'homeTeam', attributes: ['teamName'] },
  { model: Team, as: 'awayTeam', attributes: ['teamName'] },
];

export default class MatchesService {
  public fetchMatchesInfo = async (inProgress: string | undefined):Promise<Match[]> => {
    let matches:Array<Match>;

    const inProgressBoolean = (inProgress === 'true');
    if (inProgress) {
      matches = await Match.findAll(
        {
          where: { inProgress: inProgressBoolean },
          include: associations,
        },
      );
      return matches;
    }
    matches = await Match.findAll(
      { include: associations },
    );
    return matches;
  };

  public finishMatch = async (id:number) => Match
    .update({ inProgress: false }, { where: { id } });

  public updateMatch = async (id:number, homeTeamGoals:number, awayTeamGoals:number) => Match
    .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  public newMatch = async (body: Match):Promise<string> => {
    const { id, ...myBody } = body;

    if (body.awayTeamId === body.homeTeamId) {
      return 'sameTeam';
    }
    const homeTeam = await Team.findByPk(body.homeTeamId);
    const awayTeam = await Team.findByPk(body.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return 'nonexistent';
    }
    await Match.create({ ...myBody, inProgress: true });
    return 'created';
  };
}

// Associations: da model Team quero usar o atributo 'teamName' de homeTeam (que foi definido na model Match).

// A função fetchMatchesInfo recebe o param inProgress do req.body e é validada se existe.
// No caso de não existir (!inProgress) retorna todas as partidas, sem filtros, que é o retorno default.
// No caso de existir entao vai cair no if.
// Caso exista, o inProgress recebe um 'true' ou 'false' na query e eu crio um bollean comparando esse retorno com uma string 'true' no inProgressBoolean
// Então, dentro do if, comparo o boolean gerado com o dado da tabela, no campo inProgress, dentro do where.
// Se o boolean gerado no inProgressBolean for false então o findAll do if retornará todas as partidas onde o campo inProgress é === false.

// O delete body.id foi necessario porque o id estava sendo salvo no body quando valida o jwt, poreḿ o LINT reclamou e substitui pela desconstrução do objeto, excluindo o id e armazendo o resto das informações no myBody.

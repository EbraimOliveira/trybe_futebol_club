import Match from '../database/models/Match';

export default class LeaderboardService {
  public finishedMatches = async ():Promise<Array<Match> | any> => {
    const closedMatches = await Match
      .findAll(
        {
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
        },
      );

    const objetosComTodosOsDados = closedMatches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        const matchCompleto = {
          name: match.homeTeamId,
          totalPoints: 3,
          totalGames: 1,
          totalVictories: 1,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: match.homeTeamGoals,
          goalsOwn: match.awayTeamGoals,
        };
        return matchCompleto;
      }

      if (match.homeTeamGoals < match.awayTeamGoals) {
        const matchCompleto = {
          name: match.awayTeamId,
          totalPoints: 3,
          totalGames: 1,
          totalVictories: 1,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: match.awayTeamGoals,
          goalsOwn: match.homeTeamGoals,
        };
        return matchCompleto;
      }

      if (match.homeTeamGoals === match.awayTeamGoals) {
        const matchCompleto = {
          name: [match.awayTeamId, match.homeTeamId],
          totalPoints: 1,
          totalGames: 1,
          totalVictories: 0,
          totalDraws: 1,
          totalLosses: 0,
          goalsFavor: match.awayTeamGoals,
          goalsOwn: match.homeTeamGoals,
        };
        return matchCompleto;
      }
    });

    return objetosComTodosOsDados;

    // return closedMatches;
  };
}

// if( homeTeamGoals > awayTeamGoals) {
//    - name = name
//     totalPoints = totalPoints + 3
//     totalGames = totalGames +1
//     totalVictories = totalVictories +1
//     totalDraws = totalDraws
//     totalLosses = totalLosses
//     goalsFavor = goalsFavor + homeTeamGoals
//     goalsOwn = goalsOwn + awayTeamGoals
//     goalsBalance = GoalBalance(goalsFavor, goalsOwn)
//     efficiency = Efficiency(totalPoints,totalGames)
//   }

// function Efficiency(points:number, matches:number) {
//   const efficiency = ((points / (matches * 3)) * 100).toFixed(2);
//   console.log(efficiency);
//   return efficiency;
// }

//  function GoalsBalance(homeTeamGoals:number,awayTeamGoals:number) {
//   const goalsBalance = homeTeamGoals - awayTeamGoals
//   console.log(goalsBalance);
//   return goalsBalance;
//  }

// {
//   "homeTeamId": 16,
//   "homeTeamGoals": 1,
//   "awayTeamId": 8,
//   "awayTeamGoals": 1
// },

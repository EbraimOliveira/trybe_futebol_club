import Match from '../database/models/Match';

export default class LeaderboardService {
  public finishedMatches = async ():Promise<Array<Match>> => {
    const closedMatches = await Match.findAll({ where: { inProgress: false } });
    return closedMatches;
  };

  if( homeTeamGoals > awayTeamGoals) {
    name = name   
    totalPoints = totalPoints + 3
    totalGames = totalGames +1
    totalVictories = totalVictories +1
    totalDraws = totalDraws
    totalLosses = totalLosses
    goalsFavor = goalsFavor + homeTeamGoals
    goalsOwn = goalsOwn + awayTeamGoals
    goalsBalance = GoalBalance(goalsFavor, goalsOwn)
    efficiency = Efficiency(totalPoints,totalGames)

  }

}

const data = 
  [{
      name: "Palmeiras",
      totalPoints: 13,
      totalGames: 5,
      totalVictories: 4,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 17,
      goalsOwn: 5,
      goalsBalance: 12,
      efficiency: 86.67 }, 

    { id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
  }]





// function Efficiency(points:number, matches:number) {
//   const efficiency = ((points / (matches * 3)) * 100).toFixed(2);
//   console.log(efficiency);
// }


//  function GoalsBalance(homeTeamGoals:number,awayTeamGoals:number) {
//   const goalsBalance = homeTeamGoals - awayTeamGoals
//   console.log(goalsBalance);
//  }

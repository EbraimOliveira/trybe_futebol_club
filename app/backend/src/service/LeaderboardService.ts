import TeamSummary from '../Teams/TeamSummary';
import Match from '../database/models/Match';
// import Team from '../database/models/Team';

// const associations = [
//   { model: Team, as: 'homeTeam', attributes: ['teamName'] },
//   { model: Team, as: 'awayTeam', attributes: ['teamName'] },
// ];

export default class LeaderboardService {
  public finishedMatches = async ():Promise<Array<Match> | any> => {
    const closedMatches = await Match
      .findAll(
        {
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
          // include: associations,
        },
      );

    console.log('HERE>.......', closedMatches); // pq tem um retorno no log e outro na hof ?

    const newList = closedMatches.map((match) => {
      const homeTeamSummary = new TeamSummary(`name_${match.homeTeamId}`);
      homeTeamSummary.update(match.homeTeamGoals, match.awayTeamGoals);
      // const awayTeamSummary = new TeamSummary(`name_${match.awayTeamId}`);
      // awayTeamSummary.update(match.homeTeamGoals, match.awayTeamGoals);
      return homeTeamSummary;
    });

    // const newNewList = newList.reduce((acc, time)=>{
    //   const teamSummary2 = new TeamSummary(`name_${time.name}`);
    //   teamSummary2.update(time.goalsFavor, time.goalsOwn);
    //   return teamSummary2;
    // },{})

    return newList;
    // return closedMatches;
  };
}

//   {
//     "homeTeamId": 16,
//     "homeTeamGoals": 1,
//     "awayTeamId": 8,
//     "awayTeamGoals": 1
//   },

// ..........................................................................................
// GREIN:
// const newList:any = [];
//   closedMatches.forEach((match)=>{
//       const goalsFavor = match.homeTeamGoals;
//       const goalsOwn = match.awayTeamGoals;

//       const home = new TeamSummary(`name_${match.homeTeamId}`)
//       const away = new TeamSummary(`name_${match.awayTeamId}`)

//       home.totalPoints = match.homeTeamGoals;
//       home.goalsFavor = match.homeTeamGoals;
//       away.totalPoints = match.awayTeamGoals;
//       away.goalsFavor = match.awayTeamGoals;

//      const result = goalsFavor > goalsOwn ? 'win' : (goalsFavor < goalsOwn ? 'lose' : 'draw');
//       switch (result) {
//     case 'win': {
//       home.totalVicotories = 1;
//       home.totalPoints = 3;
//       away.totalLosses = 1;
//     }
//     case 'lose': {
//       this._totalLosses += 1;
//     }
//     default: {
//       this._totalDraws += 1;
//       this._totalPoints += 1;
//     }
//   }
//       newList.push(home, away)
//     })

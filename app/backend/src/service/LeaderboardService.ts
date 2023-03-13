import TeamSummary from '../Teams/TeamSummary';
import Match from '../database/models/Match';
import TeamsService from './TeamsService';

type match = {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number
};

export default class LeaderboardService {
  public _teamsStatusList: Array<TeamSummary>;
  private _teamService: TeamsService;

  constructor() {
    this._teamsStatusList = [];
    this._teamService = new TeamsService();
  }

  private finishedMatches = async ():Promise<Array<match>> => {
    const closedMatches = await Match
      .findAll(
        {
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
        },
      );

    return closedMatches;
  };

  public async setTeamStatus() {
    const matches = await this.finishedMatches();
    const teamsNames = await this._teamService.findAll();

    matches.forEach((match) => {
      const hasTeam = this._teamsStatusList
        .find((team) => team.name === teamsNames[match.homeTeamId - 1].teamName);

      if (!hasTeam) {
        const homeTeamSummary = new TeamSummary(teamsNames[match.homeTeamId - 1].teamName);
        homeTeamSummary.update(match.homeTeamGoals, match.awayTeamGoals);
        this._teamsStatusList.push(homeTeamSummary);
      }

      if (hasTeam) {
        hasTeam.update(match.homeTeamGoals, match.awayTeamGoals);
      }
    });
    return this._teamsStatusList;
  }
}

// const response = this.mathhees.map((match) => {

//   const summaryExists = teams.find((team) => {
//     team.name === `name_${match.homeTeamId}`;
//   });

//   if (!summaryExists) {
//     const homeTeamSummary = new TeamSummary(`name_${match.homeTeamId}`);
//     homeTeamSummary.update(match.homeTeamGoals, match.awayTeamGoals);

//     teams.push(homeTeamSummary);
//   }
//   if(summaryExists)
//   summaryExists.update(match.homeTeamGoals, match.awayTeamGoals);
//   return this.response
// });

// return newList;
// return closedMatches;

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

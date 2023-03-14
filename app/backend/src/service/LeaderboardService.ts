import TeamSummary from '../leaderboards/TeamSummary';
import Match from '../database/models/Match';
import TeamsService from './TeamsService';

type match = {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number
};

export default class LeaderboardService {
  public _teamsSummary: Array<TeamSummary>;
  private _teamService: TeamsService;
  private _id: string;

  constructor() {
    this._teamsSummary = [];
    this._teamService = new TeamsService();
    this._id = 'homeTeamId';
  }

  public set setId(id:string) {
    this._id = id;
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

  private async createLeaderBoard() {
    const matches = await this.finishedMatches();
    const T = await this._teamService.findAll();
    matches.forEach((match) => {
      let thisId = match.homeTeamId;
      let homeGoals = match.homeTeamGoals;
      let awayGoals = match.awayTeamGoals;
      if (this._id === 'awayTeamId') {
        thisId = match.awayTeamId; homeGoals = match.awayTeamGoals; awayGoals = match.homeTeamGoals;
      }
      const hasTeam = this._teamsSummary.find((team) => team.teamName === T[thisId - 1].teamName);
      if (!hasTeam) {
        const homeTeamSummary = new TeamSummary(T[thisId - 1].teamName);
        homeTeamSummary.update(homeGoals, awayGoals);
        this._teamsSummary.push(homeTeamSummary);
      }
      hasTeam?.update(homeGoals, awayGoals);
    });
    return this._teamsSummary;
  }

  private static sortByGoalsOwn(a: TeamSummary, b:TeamSummary) {
    return a.myGoalsOwn - b.myGoalsOwn;
  }

  private static sortByGoalsFavor(a: TeamSummary, b:TeamSummary) {
    const byGoals = b.myGoals - a.myGoals;
    if (byGoals === 0) {
      return LeaderboardService.sortByGoalsOwn(a, b);
    }
    return byGoals;
  }

  private static sortByGoalsBalance(a: TeamSummary, b:TeamSummary) {
    const byBalace = b.balance - a.balance;
    if (byBalace === 0) {
      return LeaderboardService.sortByGoalsFavor(a, b);
    }
    return byBalace;
  }

  private static sortByVictories(a: TeamSummary, b:TeamSummary) {
    const byVictories = b.victories - a.victories;
    if (byVictories === 0) {
      return LeaderboardService.sortByGoalsBalance(a, b);
    }
    return byVictories;
  }

  private static sortByPoints(a: TeamSummary, b:TeamSummary) {
    const byPoint = b.points - a.points;
    if (byPoint === 0) {
      return LeaderboardService.sortByVictories(a, b);
    }
    return byPoint;
  }

  public async getLeaderboard() {
    const leaderBoard = await this.createLeaderBoard();

    const ordenedLeaderBoard = leaderBoard
      .sort(LeaderboardService.sortByPoints);

    return ordenedLeaderBoard;
  }
}

// matches é um array com os objetos abaixo:
// {
// homeTeamId: 16,
// awayTeamId: 8,
// homeTeamGoals: 2,
// awayTeamGoals: 2,
// }

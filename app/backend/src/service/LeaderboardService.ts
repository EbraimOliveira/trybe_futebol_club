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
  public _teamsSummary: Array<TeamSummary>;
  private _teamService: TeamsService;

  constructor() {
    this._teamsSummary = [];
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

  private async getTeamStatus() {
    const matches = await this.finishedMatches();
    const teamsNames = await this._teamService.findAll();

    // matches é um array com os objetos abaixo:
    // {
    // homeTeamId: 16,
    // awayTeamId: 8,
    // homeTeamGoals: 2,
    // awayTeamGoals: 2,
    // }

    matches.forEach((match) => {
      const hasTeam = this._teamsSummary
        .find((team) => team.teamName
        === teamsNames[match.homeTeamId - 1].teamName);

      if (!hasTeam) {
        const homeTeamSummary = new TeamSummary(
          teamsNames[match.homeTeamId - 1].teamName,
        );
        homeTeamSummary.update(match.homeTeamGoals, match.awayTeamGoals);
        this._teamsSummary.push(homeTeamSummary);
      }

      hasTeam?.update(match.homeTeamGoals, match.awayTeamGoals);
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
    const leaderBoard = await this.getTeamStatus();

    const ordenedLeaderBoard = leaderBoard
      .sort(LeaderboardService.sortByPoints);

    return ordenedLeaderBoard;
  }
}

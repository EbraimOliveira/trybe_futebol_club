import TeamSummary from '../leaderboards/TeamSummary';
import Match from '../database/models/Match';
import TeamsService from './TeamsService';
import ApplySort from '../leaderboards/ApplySort';

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

  public async getLeaderboard() {
    const leaderBoard = await this.createLeaderBoard();

    const ordenedLeaderBoard = leaderBoard
      .sort(ApplySort.sortByPoints);

    return ordenedLeaderBoard;
  }
}

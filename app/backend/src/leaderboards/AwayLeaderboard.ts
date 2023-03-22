import TeamSummary from './TeamSummary';
import Match from '../database/models/Match';
import TeamsService from '../service/TeamsService';

type match = {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number
};

export default class AwayLeaderboard {
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

  public async createAwayLeaderBoard() {
    const matches = await this.finishedMatches();
    const teams = await this._teamService.findAll();

    matches.forEach(({ awayTeamId, homeTeamGoals, awayTeamGoals }) => {
      const hasTeam = this._teamsSummary
        .find((team) => team.teamName === teams[awayTeamId - 1].teamName);

      if (!hasTeam) {
        const homeTeamSummary = new TeamSummary(teams[awayTeamId - 1].teamName);
        homeTeamSummary
          .update(awayTeamGoals, homeTeamGoals);
        this._teamsSummary.push(homeTeamSummary);
      }
      hasTeam?.update(awayTeamGoals, homeTeamGoals);
    });
    return this._teamsSummary;
  }
}

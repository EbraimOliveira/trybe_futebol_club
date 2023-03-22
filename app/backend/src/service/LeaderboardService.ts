import ApplySort from '../leaderboards/ApplySort';
import AwayLeaderboard from '../leaderboards/AwayLeaderboard';
import HomeLeaderboard from '../leaderboards/HomeLeaderboard';

export default class LeaderboardService {
  private _awayLeaderboard: AwayLeaderboard;
  private _homeLeaderboard: HomeLeaderboard;

  constructor() {
    this._awayLeaderboard = new AwayLeaderboard();
    this._homeLeaderboard = new HomeLeaderboard();
  }

  private async createLeaderBoard(leader:string) {
    if (leader === '/home') {
      return this._homeLeaderboard.createHomeLeaderBoard();
    }
    return this._awayLeaderboard.createAwayLeaderBoard();
  }

  public async getLeaderboard(leader:string) {
    const leaderBoard = await this.createLeaderBoard(leader);

    const ordenedLeaderBoard = leaderBoard
      .sort(ApplySort.sortByPoints);

    return ordenedLeaderBoard;
  }
}

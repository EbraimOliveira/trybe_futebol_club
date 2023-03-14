import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import { OK } from '../utils/statusCode';

export default class LeaderboardController {
  // private _leaderboardService: LeaderboardService;
  // constructor() {
  // }

  public async finishedMatches(_req: Request, res:Response) {
    console.log(this.finishedMatches);

    const leaderboardService = new LeaderboardService();
    const response = await leaderboardService.getLeaderboard();
    return res.status(OK).json(response);
  }
}

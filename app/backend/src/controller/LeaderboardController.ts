import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import { OK } from '../utils/statusCode';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;
  constructor() {
    this._leaderboardService = new LeaderboardService();
  }

  public async finishedMatches(_req: Request, res:Response) {
    const response = await this._leaderboardService.finishedMatches();
    return res.status(OK).json(response);
  }
}

import LeaderboardService from '../service/LeaderboardService';
import { Request, Response } from 'express';
import { OK } from '../utils/statusCode';

export default class LeaderboardController{
  private _leaderboardService: LeaderboardService;
  constructor(){
    this._leaderboardService = new LeaderboardService();
  }

  public async TEST(req: Request, res:Response){
    const {body}= req;
    const response = await this._leaderboardService.TEST(body);  
    return res.status(OK).json(response)
  }
}
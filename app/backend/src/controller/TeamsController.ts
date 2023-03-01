import { Request, Response } from 'express';
import status from '../statusCode'
import TeamsService from '../services/TeamsService'

export default class TeamsController {
  private _teamsService: TeamsService;
  
  constructor() {
    this._teamsService = new TeamsService()
  }

  public async findAll(_req:Request , res: Response)
  :Promise <Response<any, Record<string, any>>>
  {
    const teams = await this._teamsService.findAll()
    return res.status(status.OK).json(teams)
  }
}
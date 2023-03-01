import { Request, Response } from 'express';
import status from '../statusCode'
import TeamsService from '../services/TeamsService'

export default class TeamsController {
  private _teamsService: TeamsService;
  
  constructor() {
    this._teamsService = new TeamsService()
  }

  public teste(req:Request , res: Response):Response<any, Record<string, any>>{
    const param = req.body;
    const response = this._teamsService.teste(param)
    return res.status(status.OK).json(response)
  }
}
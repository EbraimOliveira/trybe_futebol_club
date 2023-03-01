import { Request, Response } from 'express';
import { OK } from '../statusCode';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  private _teamsService: TeamsService;

  constructor() {
    this._teamsService = new TeamsService();
  }

  public async findAll(_req:Request, res: Response)
    :Promise <Response> {
    const teams = await this._teamsService.findAll();
    return res.status(OK).json(teams);
  }

  public async getById(req:Request, res: Response)
    :Promise <Response> {
    const { id } = req.params;
    const team = await this._teamsService.getById(Number(id));
    return res.status(OK).json(team);
  }
}

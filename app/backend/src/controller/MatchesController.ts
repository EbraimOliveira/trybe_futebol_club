import { Request, Response } from 'express';
import { OK } from '../utils/statusCode';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
  }

  public async fetchMatchesInfo(_req:Request, res:Response)
    :Promise<Response> {
    const matchesInfo = await this._matchesService.fetchMatchesInfo();
    return res.status(OK).json(matchesInfo);
  }
}

import { Request, Response } from 'express';
import { OK } from '../utils/statusCode';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
  }

  public async fetchMatchesInfo(req:Request, res:Response)
    :Promise<Response> {
    const { inProgress } = req.query;
    const matchesInfo = await this._matchesService.fetchMatchesInfo(inProgress);
    return res.status(OK).json(matchesInfo);
  }
}

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

  public async finishMatch(req:Request, res:Response)
    :Promise<Response> {
    const { id } = req.params;

    this._matchesService.finishMatch(Number(id));
    return res.status(OK).json({ message: 'Finished' });
    // return res.status(OK).json(response);
  }
}

// A queryParam inProgress pode ou não existir, então eu assumo que existe e passo na 'fetchMatchesInfo' para verificar na Service.

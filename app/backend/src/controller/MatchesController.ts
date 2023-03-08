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
    console.log('HERE>>>>>>', inProgress);
    
    const matchesInfo = await this._matchesService.fetchMatchesInfo(inProgress);
    return res.status(OK).json(matchesInfo);
  }
}


// A queryParam inProgress pode ou não existir, então eu assumo que existe e passo na 'fetchMatchesInfo' para verificar na Service.

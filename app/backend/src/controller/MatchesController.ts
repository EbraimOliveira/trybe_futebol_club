import { Request, Response } from 'express';
import { CREATED, NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from '../utils/statusCode';
import MatchesService from '../service/MatchesService';
import Match from '../database/models/Match';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
  }

  public async fetchMatchesInfo(req:Request, res:Response)
    :Promise<Response> {
    const { inProgress } = req.query;

    const matchesInfo = await this._matchesService
      .fetchMatchesInfo(inProgress as string | undefined);
    return res.status(OK).json(matchesInfo);
  }

  public async finishMatch(req:Request, res:Response)
    :Promise<Response> {
    const { id } = req.params;

    this._matchesService.finishMatch(Number(id));
    return res.status(OK).json({ message: 'Finished' });
  }

  public async updateMatch(req:Request, res:Response)
    :Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    this._matchesService
      .updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(OK).json({ message: 'Finished' });
  }

  public async newMatch(req:Request, res:Response)
    :Promise<Response> {
    const { body } = req;
    const response = await this._matchesService.newMatch(body as Match);

    switch (response) {
      case 'nonexistent':
        return res.status(NOT_FOUND)
          .json({ message: 'There is no team with such id!' });
      case 'sameTeam':
        return res.status(UNPROCESSABLE_ENTITY)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      default:
        return res.status(CREATED).json(response);
    }
  }
}
// }

// A queryParam inProgress pode ou não existir, então eu assumo que existe e passo na 'fetchMatchesInfo' para verificar na Service.

// const setStatus = {
//   nonexistent: {
//     status: NOT_FOUND,
//     message: 'There is no team with such id!'
//   },
//   sameTeam: {
//     status: UNPROCESSABLE_ENTITY,
//     message: 'It is not possible to create a match with two equal teams'
//   },
//   success: {
//     status:CREATED,
//     message: 'created'
//   }
// };

// const { status, message } = setStatus[response as keyof typeof setStatus];

// return res.status(status).json(message)

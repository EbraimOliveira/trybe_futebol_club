import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import { OK } from '../utils/statusCode';

export default class LeaderboardController {
  public async getHomeLeaderBoard(_req: Request, res:Response) {
    console.log(this.getHomeLeaderBoard);

    const leaderboardService = new LeaderboardService();
    const response = await leaderboardService.getLeaderboard();
    return res.status(OK).json(response);
  }

  public async getAwayLeaderBoard(_req: Request, res:Response) {
    console.log(this.getHomeLeaderBoard);

    const leaderboardService = new LeaderboardService();
    leaderboardService.setId = 'awayTeamId';
    const response = await leaderboardService.getLeaderboard();
    return res.status(OK).json(response);
  }
}

// o consoleLog(this.finishedMatches) é uma gambiarra para corrigir um problema de Lint.

// o objeto LeaderBoardService instanciado no constructor estva gerando uma situação onde a cada requisição o valor na tabela era acumulado. Criar o objeto dentro do metodo evita esse problema. Pesquisar sobre memoryLeak.

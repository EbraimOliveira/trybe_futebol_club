export default class TeamSummary {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance:number;
  private efficiency: number;

  constructor(name:string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  public get teamName() {
    return this.name;
  }

  public get points() {
    return this.totalPoints;
  }

  public get victories() {
    return this.totalVictories;
  }

  public get balance() {
    return this.goalsBalance;
  }

  public get myGoals() {
    return this.goalsFavor;
  }

  private GoalsBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private Efficiency() {
    this.efficiency = Number(
      ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2),
    );
  }

  private always(goalsFavor: number, goalsOwn: number) {
    this.totalGames += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.GoalsBalance();
    this.Efficiency();
  }

  private setVictory() {
    this.totalVictories += 1;
    this.totalPoints += 3;
  }

  private setLoss() {
    this.totalLosses += 1;
  }

  private setDraw() {
    this.totalDraws += 1;
    this.totalPoints += 1;
  }

  private static findResult(goalsFavor: number, goalsOwn: number) {
    if (goalsFavor > goalsOwn) {
      return 'win';
    }
    if (goalsFavor < goalsOwn) {
      return 'lose';
    }
    return 'draw';
  }

  public update(goalsFavor: number, goalsOwn: number) {
    const resultCases = {
      win: () => this.setVictory(),
      lose: () => this.setLoss(),
      draw: () => this.setDraw(),
    };

    const result = TeamSummary.findResult(goalsFavor, goalsOwn);
    resultCases[result]();
    this.always(goalsFavor, goalsOwn);
  }
}

// ........................................................................................
//  o metodo upadte acima substtui o switch case (abaixo) pois evita percorrer todas as opções sempre e acessa apenas a que for pertinente.

// public update( goalsFavor: number, goalsOwn: number ) {
//   const result = goalsFavor > goalsOwn ? 'win' : (goalsFavor < goalsOwn ? 'lose' : 'draw');
//   switch (result) {
//     case 'win': {
//       this.totalVictories += 1;
//       this.totalPoints += 3;
//     }
//     case 'lose': {
//       this._totalLosses + 1;
//     }
//     default: {
//       this._totalDraws += 1;
//       this.totalPoints += ;
//     }
//   }
//   this.always(goalsFavor, goalsOwn);
// }

export default class TeamSummary {
  private _name: string | number;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance:number;
  private _efficiency: number;

  constructor(name:string | number) {
    this._name = name;
    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = 0;
  }

  public set name(param:number) {
    this._name = param;
  }

  public set goalsFavor(param:number) {
    this._goalsFavor = param;
  }

  public set goalsOwn(param:number) {
    this._goalsOwn = param;
  }

  private goalsBalance() {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  private efficiency() {
    this._efficiency = Number(
      ((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2),
    );
  }

  private always(goalsFavor: number, goalsOwn: number) {
    this._totalGames += 1;
    this._goalsFavor += goalsFavor;
    this._goalsOwn += goalsOwn;
    this.goalsBalance();
    this.efficiency();
  }

  private setVictory() {
    this._totalVictories += 1;
    this._totalPoints += 3;
  }

  private setLoss() {
    this._totalLosses += 1;
  }

  private setDraw() {
    this._totalDraws += 1;
    this._totalPoints += 1;
  }

  private findResult(goalsFavor: number, goalsOwn: number) {
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

    const result = this.findResult(goalsFavor, goalsOwn);
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
//       this._totalVictories += 1;
//       this._totalPoints += 3;
//     }
//     case 'lose': {
//       this._totalLosses += 1;
//     }
//     default: {
//       this._totalDraws += 1;
//       this._totalPoints += 1;
//     }
//   }
//   this.always(goalsFavor, goalsOwn);
// }

// ....................................................................................
// GREIN:

// public set totalPoints( param:number ){
//  this._totalPoints = param;
// }

// public set goalsFavor( param:number ){
//  this._goalsFavor = param;
// }

// public set totalVicotories( param:number ){
//   this._totalVictories = param;
// }

// public set totalLosses( param:number ){
//   this._totalLosses = param;
// }

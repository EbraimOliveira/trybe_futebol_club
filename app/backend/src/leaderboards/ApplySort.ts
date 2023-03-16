import TeamSummary from "./TeamSummary";

export default class ApplySort {
    private static sortByGoalsOwn(a: TeamSummary, b:TeamSummary) {
    return a.myGoalsOwn - b.myGoalsOwn;
  }

  private static sortByGoalsFavor(a: TeamSummary, b:TeamSummary) {
    const byGoals = b.myGoals - a.myGoals;
    if (byGoals === 0) {
      return ApplySort.sortByGoalsOwn(a, b);
    }
    return byGoals;
  }

  private static sortByGoalsBalance(a: TeamSummary, b:TeamSummary) {
    const byBalace = b.balance - a.balance;
    if (byBalace === 0) {
      return ApplySort.sortByGoalsFavor(a, b);
    }
    return byBalace;
  }

  private static sortByVictories(a: TeamSummary, b:TeamSummary) {
    const byVictories = b.victories - a.victories;
    if (byVictories === 0) {
      return ApplySort.sortByGoalsBalance(a, b);
    }
    return byVictories;
  }

  public static sortByPoints(a: TeamSummary, b:TeamSummary) {
    const byPoint = b.points - a.points;
    if (byPoint === 0) {
      return ApplySort.sortByVictories(a, b);
    }
    return byPoint;
  }
}
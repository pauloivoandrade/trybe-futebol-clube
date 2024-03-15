import IMatch from './IMatch';

export interface Leaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class LeaderboardRow {
  victories = 0;
  draws = 0;
  loss = 0;
  goalsFavor = 0;
  goalsOwn = 0;

  constructor(public teamName: string) { }

  getTotalGames() {
    return this.victories + this.draws + this.loss;
  }

  getTotalPoints() {
    return this.victories * 3 + this.draws;
  }

  getGoalsBalance() {
    return this.goalsFavor - this.goalsOwn;
  }

  getEfficiency() {
    return +((this.getTotalPoints() / (this.getTotalGames() * 3)) * 100).toFixed(2);
  }

  getFormattedData(): Leaderboard {
    return {
      name: this.teamName,
      totalPoints: this.getTotalPoints(),
      totalGames: this.getTotalGames(),
      totalVictories: this.victories,
      totalDraws: this.draws,
      totalLosses: this.loss,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.getGoalsBalance(),
      efficiency: this.getEfficiency(),
    };
  }

  addHomeMatchData(matches: IMatch[]) {
    matches.forEach((match) => {
      this.goalsFavor += match.homeTeamGoals;
      this.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.victories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        this.draws += 1;
      } else {
        this.loss += 1;
      }
    });
  }

  addAwayMatchData(matches: IMatch[]) {
    matches.forEach((match) => {
      this.goalsFavor += match.awayTeamGoals;
      this.goalsOwn += match.homeTeamGoals;
      if (match.awayTeamGoals > match.homeTeamGoals) {
        this.victories += 1;
      } else if (match.awayTeamGoals === match.homeTeamGoals) {
        this.draws += 1;
      } else {
        this.loss += 1;
      }
    });
  }
}

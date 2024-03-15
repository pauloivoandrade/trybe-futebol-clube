import ILeaderBoard from '../Interfaces/ILeaderBoard';

const leaderBoard = () => ({
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const teamsInfo = (home: ILeaderBoard, away: ILeaderBoard) => {
  const team = leaderBoard();
  team.name = home.name;
  team.totalPoints = Number(home.totalPoints) + Number(away.totalPoints);
  console.log(home.totalPoints);
  team.totalGames = Number(home.totalGames) + Number(away.totalGames);
  team.totalVictories = Number(home.totalVictories) + Number(away.totalVictories);
  team.totalDraws = Number(home.totalDraws) + Number(away.totalDraws);
  team.totalLosses = Number(home.totalLosses) + Number(away.totalLosses);
  team.goalsFavor = Number(home.goalsFavor) + Number(away.goalsFavor);
  team.goalsOwn = Number(home.goalsOwn) + Number(away.goalsOwn);
  return team;
};

const sortTeams = (array: ILeaderBoard[]) => {
  array.sort((a, b) => (b.totalPoints - a.totalPoints) || (b.totalVictories - a.totalVictories)
  || (b.goalsBalance - a.goalsBalance) || (b.goalsFavor - a.goalsFavor)
  || (b.goalsOwn - a.goalsOwn));
};

const leaderBoardCreate = (home: ILeaderBoard[], away: ILeaderBoard[]) => {
  const array: ILeaderBoard[] = [];

  const awayMap: { [key: string]: ILeaderBoard } = {};
  away.forEach((team) => {
    awayMap[team.name] = team;
  });

  home.forEach((homeTeam) => {
    const awayTeam = awayMap[homeTeam.name];
    if (awayTeam) {
      const team = teamsInfo(homeTeam, awayTeam);
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      team.efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;
      team.efficiency = +(team.efficiency.toFixed(2));
      array.push(team);
    }
  });

  sortTeams(array);
  return array;
};

export default leaderBoardCreate;

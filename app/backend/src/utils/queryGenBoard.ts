const query = `
  SELECT
    t.team_name AS name,
    (
      (SUM(m.away_team_goals > m.home_team_goals) * 3) +
      SUM(m.away_team_goals = m.home_team_goals)
    ) AS totalPoints,
    COUNT(m.id) AS totalGames,
    SUM(m.away_team_goals > m.home_team_goals) AS totalVictories,
    SUM(m.away_team_goals = m.home_team_goals) AS totalDraws,
    SUM(m.away_team_goals < m.home_team_goals) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    (SUM(m.away_team_goals) - SUM(m.home_team_goals)) AS goalsBalance
  FROM TRYBE_FUTEBOL_CLUBE.matches AS m
  INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.away_team_id = t.id
  WHERE m.in_progress = 0
  GROUP BY name
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

export default query;

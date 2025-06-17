const positionKeys = ['fwd', 'mid', 'def', 'gol', 'sub'];

const calculatePlayerStats = (player) => {
const totals = { fwd: 0, mid: 0, def: 0, gol: 0, sub: 0 };

const gamesArray = Array.isArray(player.postionTimeStats) ? player.postionTimeStats : [];

for (const game of gamesArray) {
  const posTimes = game.posTimes || {};
  for (const pos of positionKeys) {
    const entries = Array.isArray(posTimes[pos]) ? posTimes[pos] : [];
    for (const { st = 0, fin = 0 } of entries) {
      const duration = Math.max(0, fin - st);
      if (duration > 0 && duration < 1000000) {
        totals[pos] += duration;
      }
    }
  }
}

const onFieldTime = totals.fwd + totals.mid + totals.def + totals.gol;
const totalTime = onFieldTime + totals.sub;
const percent = (val) => (totalTime > 0 ? Math.round((val / totalTime) * 100) : 0);

return {
  playerName: player.playerName,
  playerId: player.playerId,
  id: player.id,
  percentTotal: percent(onFieldTime).toString(),
  fwdTotalPercent: (percent(totals.fwd) - 0).toString(),
  midTotalPercent: (percent(totals.mid) - 0).toString(),
  defTotalPercent: (percent(totals.def) - 0).toString(),
  golTotalPercent: (percent(totals.gol) - 0).toString(),
  fwdTotalTime: totals.fwd,
  midTotalTime: totals.mid,
  defTotalTime: totals.def,
  golTotalTime: totals.gol,
  subTotalTime: totals.sub,
};
};

// Step 1: Get season stats for all team players
const seasonStats = games[playerIndex].teamPlayers.map(calculatePlayerStats);

// Step 2: Merge with live stats from current game
const mergedStats = combineSeasonAndLiveStats(
  seasonStats,
  games[playerIndex].teamPlayers.map(p => p.liveStats)
);

// Step 3: Assign players to positions using improved logic (random if equal lowest time)
const assignLowestTimePlayers = () => {
  const assigned = {};
  const usedPlayerIds = new Set();

  for (const pos of ['fwd', 'mid', 'def', 'gol']) {
    let candidates = [];

    for (const player of games[playerIndex].teamPlayers) {
      const stats = mergedStats.find(p => p.playerId === player.playerId);
      const isEligible = player.playerPositions?.[pos];

      if (!isEligible || usedPlayerIds.has(player.playerId)) continue;

      const timeKey = `${pos}TotalTime`;
      const time = stats?.[timeKey] ?? Infinity;

      candidates.push({
        playerName: player.playerName,
        playerId: player.playerId,
        assignedPosition: pos,
        totalTimePlayedInPosition: time
      });
    }

    const minTime = Math.min(...candidates.map(c => c.totalTimePlayedInPosition));
    const lowestCandidates = candidates.filter(c => c.totalTimePlayedInPosition === minTime);
    const chosen = lowestCandidates[Math.floor(Math.random() * lowestCandidates.length)];

    if (chosen) {
      assigned[pos] = chosen;
      usedPlayerIds.add(chosen.playerId);
    }
  }

  return assigned;
};

const positionAssignments = assignLowestTimePlayers();
console.log(positionAssignments);

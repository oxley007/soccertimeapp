// playerStatsUtils.js

//const sixtySecondsMark = 60;  // If you use this constant in calculatePlayerLiveStats, define it or import accordingly.

const calculatePlayerLiveStats = (player, sixtySecondsMark) => {
  const { playerName, playerId, currentPosition, gameStats, postionTimes } = player;

  const toArray = (pos) =>
    Array.isArray(pos) ? pos : typeof pos === 'object' && Object.keys(pos).length > 0 ? [pos] : [];

  const calcTotalTime = (arr) =>
    toArray(arr).reduce((sum, t) => {
      const start = typeof t.st === 'number' ? t.st : 0;
      const end =
        typeof t.fin === 'number'
          ? (t.fin === 99999999 ? sixtySecondsMark : t.fin)
          : sixtySecondsMark;
      return sum + Math.max(0, end - start);
    }, 0);

  const fwdTotalTime = calcTotalTime(postionTimes?.fwd);
  const midTotalTime = calcTotalTime(postionTimes?.mid);
  const defTotalTime = calcTotalTime(postionTimes?.def);
  const golTotalTime = calcTotalTime(postionTimes?.gol);
  const subTotalTime = calcTotalTime(postionTimes?.sub);

  const total = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime;

  const percent = (val) => (total > 0 ? ((val / total) * 100).toFixed(1) : 0);

  return {
    playerName,
    playerId,
    position: currentPosition,
    stats: gameStats,
    percentTotal: total > 0 ? 100 : 0,
    fwdTotalTime,
    fwdTotalPercent: percent(fwdTotalTime),
    midTotalTime,
    midTotalPercent: percent(midTotalTime),
    defTotalTime,
    defTotalPercent: percent(defTotalTime),
    golTotalTime,
    golTotalPercent: percent(golTotalTime),
    subTotalTime,
    positionDetails: {
      row: player.positionDetails?.row,
      column: player.positionDetails?.column
    },
  };
};


const positionKeys = ['fwd', 'mid', 'def', 'gol', 'sub'];

const calculatePlayerStats = (player) => {
  console.log('check player here ' + JSON.stringify(player));
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

const combineSeasonAndLiveStats = (seasonStats, liveStats) => {
  return seasonStats.map((seasonPlayer) => {
    const livePlayer = liveStats.find((p) => p.playerId === seasonPlayer.playerId);

    if (!livePlayer) return seasonPlayer;

    const add = (a, b) => (Number(a) || 0) + (Number(b) || 0);

    const fwd = add(seasonPlayer.fwdTotalTime, livePlayer.fwdTotalTime);
    const mid = add(seasonPlayer.midTotalTime, livePlayer.midTotalTime);
    const def = add(seasonPlayer.defTotalTime, livePlayer.defTotalTime);
    const gol = add(seasonPlayer.golTotalTime, livePlayer.golTotalTime);
    const sub = add(seasonPlayer.subTotalTime, livePlayer.subTotalTime);

    const totalTime = fwd + mid + def + gol + sub;
    const onFieldTime = totalTime - sub;

    const safePercent = (value) => (totalTime > 0 ? Math.round((value / totalTime) * 100) : 0);

    return {
      ...seasonPlayer,
      fwdTotalTime: fwd,
      midTotalTime: mid,
      defTotalTime: def,
      golTotalTime: gol,
      subTotalTime: sub,
      percentTotal: safePercent(onFieldTime),
      fwdTotalPercent: safePercent(fwd),
      midTotalPercent: safePercent(mid),
      defTotalPercent: safePercent(def),
      golTotalPercent: safePercent(gol),
      liveStats: livePlayer,
    };
  });
};

export { calculatePlayerLiveStats, calculatePlayerStats, combineSeasonAndLiveStats };

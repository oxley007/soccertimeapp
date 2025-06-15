const PositionTimes = {
  savePositionTime(player, secondsElapsed) {
    try {
      const positionFwdTimeIndex = player.postionTimes.fwd.findIndex(x => x.fin === 99999999);

      if (positionFwdTimeIndex !== -1 ) {
        player.postionTimes.fwd[positionFwdTimeIndex].fin = secondsElapsed
      }
    }
    catch {
      //do nothing.
    }

      try {
        const positionMidTimeIndex = player.postionTimes.mid.findIndex(x => x.fin === 99999999);
        if (positionMidTimeIndex !== -1 ) {
          player.postionTimes.mid[positionMidTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }

      try {
      const positionDefTimeIndex = player.postionTimes.def.findIndex(x => x.fin === 99999999);
      if (positionDefTimeIndex !== -1 ) {
        player.postionTimes.def[positionDefTimeIndex].fin = secondsElapsed
      }
    }
    catch {
      //do nothing.
    }

    try {
      const positionGolTimeIndex = player.postionTimes.gol.findIndex(x => x.fin === 99999999);
      if (positionGolTimeIndex !== -1 ) {
        player.postionTimes.gol[positionGolTimeIndex].fin = secondsElapsed
      }
    }
    catch {
      //do nothing.
    }

    try {
      const positionSubTimeIndex = player.postionTimes.sub.findIndex(x => x.fin === 99999999);
      if (positionSubTimeIndex !== -1 ) {
        player.postionTimes.sub[positionSubTimeIndex].fin = secondsElapsed
      }
    }
    catch {
    //console.log('in case this is hit save finc');
      //do nothing.
    }

  //console.log(JSON.stringify(player) + ' player when in save function - what we got?');

    return [player]

},

getPositionTime(player, secondsElapsed, gameHalfTime, halfTime, naCount) {

  function normalizePositionTimes(postionTimes) {
    const validPositions = ['fwd', 'mid', 'def', 'gol', 'sub'];
    for (const pos of validPositions) {
      if (!Array.isArray(postionTimes[pos])) {
        postionTimes[pos] = [];
      }
    }
  }

  console.log(JSON.stringify(player) + ' player getPositionTime');
  const activeTimeValue = 99999999;
  const currentPosition = player.currentPosition;
  const postionTimes = player.postionTimes;
  const gameFullTime = gameHalfTime * 2

  normalizePositionTimes(postionTimes);

  console.log(postionTimes[currentPosition] + ' postionTimes[currentPosition] is ?');
  if (!postionTimes[currentPosition]) {
    postionTimes[currentPosition] = [];
  }

  const currentTimes = postionTimes[currentPosition]
  const activeIndex = currentTimes.findIndex(t => t.fin === activeTimeValue);

  if (activeIndex === -1 && halfTime < 4) {
    // No active segment for currentPosition, so push a new one
    currentTimes.push({ st: secondsElapsed, fin: activeTimeValue });
    return [player, naCount];
  }

  // Handle logic when there's an active time block
  const isBeforeHalfTime = secondsElapsed <= gameHalfTime;
  const isSecondHalf = secondsElapsed > gameHalfTime;

  // If before halftime and not at half 3 or 4, do nothing
  if (isBeforeHalfTime && halfTime < 3) return [player, naCount];

  // If second half and halfTime < 4, do nothing
  if (isSecondHalf && halfTime < 4 && halfTime !== 3) return [player, naCount];

  // If second half and halfTime == 3, finish current segment
  /*
  if (isSecondHalf && halfTime === 2) {
    currentTimes[activeIndex].fin = secondsElapsed;
    return;
  }
  */

  try {
    if (halfTime === 4) {
      currentTimes[activeIndex].fin = gameFullTime;
      return [player, naCount];
    }
  }
  catch {
    //nothing.
  }

  // Finish segments in other positions (not current)
  for (const [pos, times] of Object.entries(postionTimes)) {
    if (pos !== currentPosition && Array.isArray(times)) {
      const otherActiveIndex = times.findIndex(t => t.fin === activeTimeValue);
      if (otherActiveIndex !== -1) {
        times[otherActiveIndex].fin = secondsElapsed;
      }
    }
  }

  return [player, naCount]

}

/*
getPositionTime(player, secondsElapsed, naCount, fromEndGame) {

  if (player.delete === true) {
    //do nothing.
  }
  else if (player.currentPosition === 'NA') {
    naCount = naCount + 1
  }
  else if (player.currentPosition === 'fwd') {
  //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
  //console.log(JSON.stringify(player.postionTimes.fwd) + ' what is player.postionTimes[0].fwd');
    try {
      try {
        console.log(JSON.stringify(player.postionTimes.fwd) + ' player.postionTimes.fwd here!');
        const positionFwdTimeIndex = player.postionTimes.fwd.findIndex(x => x.fin === 99999999);
        console.log(positionFwdTimeIndex + ' positionFwdTimeIndex');
        if (positionFwdTimeIndex !== -1 ) {
          console.log('player.postionTimes.fwd hit 1');
          player.postionTimes.fwd[positionFwdTimeIndex].fin = secondsElapsed
        }
        else if (fromEndGame === true) {
          console.log('player.postionTimes.fwd hit 2');
          player.postionTimes.fwd[positionMidTimeIndex].fin = secondsElapsed
        }
        else {
          console.log('player.postionTimes.fwd hit 2');
          player.postionTimes.fwd.push({st: secondsElapsed, fin: 99999999})
        }
      }
      catch {
        //do nothing.
      }
      console.log('must be hitting htis alot fwd');
      console.log('player.postionTimes.fwd hit 3');
      player.postionTimes.fwd.push({st: secondsElapsed, fin: 99999999})
    }
    catch {
      console.log('player.postionTimes.fwd hit 4');
      player.postionTimes.fwd = [{st: secondsElapsed, fin: 99999999}]
    }
  }
  else if (player.currentPosition === 'mid') {
  //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
  //console.log(JSON.stringify(player.postionTimes.mid) + ' what is player.postionTimes[0].mid');
    try {
      try {
        const positionMidTimeIndex = player.postionTimes.mid.findIndex(x => x.fin === 99999999);
        console.log(positionMidTimeIndex + ' positionMidTimeIndex');
        if (positionMidTimeIndex !== -1 ) {
          player.postionTimes.mid[positionMidTimeIndex].fin = secondsElapsed
        }
        else if (fromEndGame === true) {
          player.postionTimes.mid[positionMidTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }
      console.log('must be hitting htis alot mid');
      player.postionTimes.mid.push({st: secondsElapsed, fin: 99999999})
    }
    catch {
      player.postionTimes.mid = [{st: secondsElapsed, fin: 99999999}]
    }
  }
  else if (player.currentPosition === 'def') {
  //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
  //console.log(JSON.stringify(player.postionTimes.def) + ' what is player.postionTimes[0].def');
    try {
      try {
      const positionDefTimeIndex = player.postionTimes.def.findIndex(x => x.fin === 99999999);
      if (positionDefTimeIndex !== -1 ) {
        player.postionTimes.def[positionDefTimeIndex].fin = secondsElapsed
      }
      else if (fromEndGame === true) {
        player.postionTimes.def[positionMidTimeIndex].fin = secondsElapsed
      }
    }
    catch {
      //do nothing.
    }
    console.log('must be hitting htis alot def');
      player.postionTimes.def.push({st: secondsElapsed, fin: 99999999})
    }
    catch {
      player.postionTimes.def = [{st: secondsElapsed, fin: 99999999}]
    }
  }
  else if (player.currentPosition === 'gol') {
  //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
  //console.log(JSON.stringify(player.postionTimes.gol) + ' what is player.postionTimes[0].gol');

  try {
    try {
      const positionGolTimeIndex = player.postionTimes.gol.findIndex(x => x.fin === 99999999);
      if (positionDefTimeIndex !== -1 ) {
          player.postionTimes.gol[positionGolTimeIndex].fin = secondsElapsed
      }
      else if (fromEndGame === true) {
          player.postionTimes.gol[positionGolTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }
      console.log('must be hitting htis alot def');
        player.postionTimes.gol.push({st: secondsElapsed, fin: 99999999})
      }
      catch {
        player.postionTimes.gol = [{st: secondsElapsed, fin: 99999999}]
      }
  }
  else if (player.currentPosition === 'sub') {
  //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
  //console.log(JSON.stringify(player.postionTimes.sub) + ' what is player.postionTimes[0].sub');
    try {
      try {
        const positionSubTimeIndex = player.postionTimes.sub.findIndex(x => x.fin === 99999999);
        if (positionSubTimeIndex !== -1 ) {
          player.postionTimes.sub[positionSubTimeIndex].fin = secondsElapsed
        }
        else if (fromEndGame === true) {
          player.postionTimes.sub[positionMidTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }
      console.log('must be hitting htis alot sub');
      player.postionTimes.sub.push({st: secondsElapsed, fin: 99999999})
    }
    catch {
      player.postionTimes.sub = [{st: secondsElapsed, fin: 99999999}]
    }
  }

  return [player, naCount]

}
*/
}


export default PositionTimes;

/*
current 4.4
hightest 11.1

current 4*6 = 24 + 4 = 28balls
highest 11*6 = 66 + 1 = 67ball

67 - 28 = 39
39 goes into 6 x times (6 overs)
get the reminader (3 balls)
need to survive 6.3over to get highest partnetship. boom.
*/

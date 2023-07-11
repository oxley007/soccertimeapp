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

getPositionTime(player, secondsElapsed, naCount) {

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
        const positionFwdTimeIndex = player.postionTimes.fwd.findIndex(x => x.fin === 99999999);

        if (positionFwdTimeIndex !== -1 ) {
          player.postionTimes.fwd[positionFwdTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }
      player.postionTimes.fwd.push({st: secondsElapsed, fin: 99999999})
    }
    catch {
      player.postionTimes.fwd = [{st: secondsElapsed, fin: 99999999}]
    }
  }
  else if (player.currentPosition === 'mid') {
    //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
    //console.log(JSON.stringify(player.postionTimes.mid) + ' what is player.postionTimes[0].mid');
    try {
      try {
        const positionMidTimeIndex = player.postionTimes.mid.findIndex(x => x.fin === 99999999);
        if (positionMidTimeIndex !== -1 ) {
          player.postionTimes.mid[positionMidTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }
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
    }
    catch {
      //do nothing.
    }
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
        let positionGolTimeIndex = -1
        try {
         positionGolTimeIndex = player.postionTimes.gol.findIndex(x => x.fin === 99999999);
        }
        catch {
          positionGolTimeIndex = -1
        }
        if (positionGolTimeIndex !== -1 ) {
          player.postionTimes.gol[positionGolTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }
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
      }
      catch {
        //do nothing.
      }
      player.postionTimes.sub.push({st: secondsElapsed, fin: 99999999})
    }
    catch {
      player.postionTimes.sub = [{st: secondsElapsed, fin: 99999999}]
    }
  }

  return [player, naCount]

}

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

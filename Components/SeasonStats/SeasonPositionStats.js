import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

const SeasonPositionStats = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getFwdTime, setFwdTime] = useState(0);
  const [getFwdPercent, setFwdPercent] = useState(0);
  const [getMidTime, setMidTime] = useState(0);
  const [getMidPercent, setMidPercent] = useState(0);
  const [getDefTime, setDefTime] = useState(0);
  const [getDefPercent, setDefPercent] = useState(0);
  const [getGolTime, setGolTime] = useState(0);
  const [getGolPercent, setGolPercent] = useState(0);
  const [getSubTime, setSubTime] = useState(0);
  const [getSubPercent, setSubPercent] = useState(0);

  //let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData
  const whereFrom = props.whereFrom
  const whatData = props.whatData

  let fwdTimeArray = []
  let midTimeArray = []
  let defTimeArray = []
  let golTimeArray = []
  let subTimeArray = []

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)

    useEffect(() => {

      //console.log(whereFrom + ' what is whereFrom?');

      if (whereFrom === 1 || whereFrom === 'endGame') {

      let fwdTimeArray = []
      let midTimeArray = []
      let defTimeArray = []
      let golTimeArray = []
      let subTimeArray = []

      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      // this is the issue! statsBoardPlayerId
      let playerIndex = 0
      if (whereFrom === 1) {
        const playerIndex = _games[0].teamPlayers.findIndex(x => x.id === statsBoardPlayerId);
      }
      else {
        playerIndex = _games[0].teamPlayers.findIndex(x => x.id === props.playerData.id);
      }

      try {
          if (whatData === 1) {
            playerData.postionTimes.fwd.map(fwd => {
              //console.log(JSON.stringify(fwd) + ' fwd data 1');
              const totalTime = getPositionTimes(fwd)
              fwdTimeArray.push({totalTime})
            })
          }
          else {
          //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.fwd) + ' _games[0].teamPlayers[playerIndex] firsy fws check.');
          //console.log(_games[0].teamPlayers[playerIndex].playerName + ' up here player name');
          _games[0].teamPlayers[playerIndex].postionTimes.fwd.map(fwd => {
            //console.log(JSON.stringify(fwd) + ' fwd data 2');
            const totalTime = getPositionTimes(fwd)
            fwdTimeArray.push({totalTime})
          })
        }
      }
      catch {
        //console.log('this is a hit _games[0].teamPlayers[playerIndex] firsy fws check');
        const totalTime = 0
        fwdTimeArray.push({totalTime})
      }

      try {
          if (whatData === 1) {
            playerData.postionTimes.mid.map(mid => {
              //console.log(mid + ' mid check.');
              const totalTime = getPositionTimes(mid)
              midTimeArray.push({totalTime})
            })
          }
          else {
          //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.mid) + ' firsy mid check new.');
          _games[0].teamPlayers[playerIndex].postionTimes.mid.map(mid => {
            //console.log(mid + ' mid check.');
            const totalTime = getPositionTimes(mid)
            midTimeArray.push({totalTime})
          })
        }
      }
      catch {
        const totalTime = 0
        midTimeArray.push({totalTime})
      }

      try {
          if (whatData === 1) {
            playerData.postionTimes.def.map(def => {
              //console.log(def + ' mid check.');
              const totalTime = getPositionTimes(def)
              defTimeArray.push({totalTime})
            })
          }
          else {
          //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.def) + ' firsy def check new.');
          _games[0].teamPlayers[playerIndex].postionTimes.def.map(def => {
            //console.log(def + ' mid check.');
            const totalTime = getPositionTimes(def)
            defTimeArray.push({totalTime})
          })
        }
      }
      catch {
        const totalTime = 0
        defTimeArray.push({totalTime})
      }

      try {
          if (whatData === 1) {
            playerData.postionTimes.gol.map(gol => {
              //console.log(gol + ' gol check.');
              const totalTime = getPositionTimes(gol)
              golTimeArray.push({totalTime})
            })
          }
          else {
          //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.gol) + ' firsy gol check new.');
          _games[0].teamPlayers[playerIndex].postionTimes.gol.map(gol => {
            //console.log(gol + ' gol check.');
            const totalTime = getPositionTimes(gol)
            golTimeArray.push({totalTime})
          })
        }
      }
      catch {
        const totalTime = 0
        golTimeArray.push({totalTime})
      }

      try {
          if (whatData === 1) {
            playerData.postionTimes.sub.map(sub => {
              //console.log(sub + ' sub check.');
              const totalTime = getPositionTimes(sub)
              subTimeArray.push({totalTime})
            })
          }
          else {
          //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.sub) + ' firsy sub check new.');
          _games[0].teamPlayers[playerIndex].postionTimes.sub.map(sub => {
            //console.log(sub + ' sub check.');
            const totalTime = getPositionTimes(sub)
            subTimeArray.push({totalTime})
          })
        }
      }
      catch {
        const totalTime = 0
        subTimeArray.push({totalTime})
      }

      const fwdTotalTime = getTotalTime(fwdTimeArray)
      //const fwdTotalPercent = getTotalPercent(fwdTotalTime)

      setFwdTime(fwdTotalTime)
      //setFwdPercent(fwdTotalPercent)

      const midTotalTime = getTotalTime(midTimeArray)
      //const midTotalPercent = getTotalPercent(midTotalTime)

      setMidTime(midTotalTime)
      //setMidPercent(midTotalPercent)

      const defTotalTime = getTotalTime(defTimeArray)
      //const defTotalPercent = getTotalPercent(defTotalTime)

      //console.log(defTotalTime + ' defTotalTime up here.');
      setDefTime(defTotalTime)
      //setDefPercent(defTotalPercent)

      const golTotalTime = getTotalTime(golTimeArray)
      //const golTotalPercent = getTotalPercent(golTotalTime)

      setGolTime(golTotalTime)
      //setGolPercent(golTotalPercent)

      const subTotalTime = getTotalTime(subTimeArray)
      //const subTotalPercent = getTotalPercent(subTotalTime)

      setSubTime(subTotalTime)
      //setSubPercent(subTotalPercent)
    }

    },[sixtySecondsMark])

  const getPositionTimesDisplay = () => {

    let statDisplay = ''

    if (whereFrom === 1 && whatData !== 1) {
      //console.log(statsBoardPlayerId + ' i assume this will be undefined aye.');
      const playerIndex = teamPlayers.findIndex(x => x.id === statsBoardPlayerId);

      const playerData = teamPlayers[playerIndex]
      //console.log(JSON.stringify(playerData) + ' i need to chck playerData here ok.');
      statDisplay = runPlayerPosStats(playerData)
      //return statDisplay
    }
    else {

    teamPlayers.map(player => {

      if (playerData.id === player.id) {
        statDisplay = runPlayerPosStats(player)
        }
      })

    }

    return statDisplay

  }


    const runPlayerPosStats = (player) => {

      let fwdTotalTime = 0
      let fwdTotalPercent = 0
      let midTotalTime = 0
      let midTotalPercent = 0
      let defTotalTime = 0
      let defTotalPercent = 0
      let golTotalTime = 0
      let golTotalPercent = 0
      let subTotalTime = 0
      let subTotalPercent = 0

      try {
    player.postionTimeStats.map(stat => {

      if (stat.season === seasonsDisplayId) {

    try {
      //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check..');
      stat.posTimes.fwd.map(fwd => {
        //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check.. 1');
        const totalTime = getPositionTimes(fwd)
        //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check.. 2');
        fwdTimeArray.push({totalTime})
      })
    }
    catch {
      //console.log('this is a hit playerData firsy fws check');
      const totalTime = 0
      fwdTimeArray.push({totalTime})
    }

    try {
      //console.log(JSON.stringify(stat.posTimes.mid) + ' firsy mid check new.');
      stat.posTimes.mid.map(mid => {
        //console.log(mid + ' mid check.');
        const totalTime = getPositionTimes(mid)
        midTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      midTimeArray.push({totalTime})
    }

    try {
      //console.log(JSON.stringify(stat.posTimes.def) + ' firsy def check new.');
      stat.posTimes.def.map(def => {
        //console.log(def + ' mid check.');
        const totalTime = getPositionTimes(def)
        defTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      defTimeArray.push({totalTime})
    }

    try {
      //console.log(JSON.stringify(stat.posTimes.gol) + ' firsy gol check new.');
      stat.posTimes.gol.map(gol => {
        //console.log(gol + ' gol check.');
        const totalTime = getPositionTimes(gol)
        golTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      golTimeArray.push({totalTime})
    }

    try {
      //console.log(JSON.stringify(stat.posTimes.sub) + ' firsy sub check new.');
      stat.posTimes.sub.map(sub => {
        //console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        subTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push({totalTime})
    }

    //console.log(JSON.stringify(fwdTimeArray) + ' fwdTimeArray just got check now inside.');
  }
  else {

    fwdTimeArray.push(0)
    midTimeArray.push(0)
    defTimeArray.push(0)
    golTimeArray.push(0)
    subTimeArray.push(0)

  }

    })
  }
  catch {

  }

    //console.log(JSON.stringify(fwdTimeArray) + ' fwdTimeArray just got check now.');

    fwdTotalTime = getTotalTime(fwdTimeArray)
    fwdTotalTime = fwdTotalTime + getFwdTime


    //setFwdTime(fwdTotalTime)
    //setFwdPercent(fwdTotalPercent)

    //console.log(fwdTotalTime + ' what is seasson fwdTotalTime');
    //console.log(fwdTotalPercent + ' what is seasson fwdTotalPercent');

    midTotalTime = getTotalTime(midTimeArray)
    midTotalTime = midTotalTime + getMidTime


    //setMidTime(midTotalTime)
    //setMidPercent(midTotalPercent)

    defTotalTime = getTotalTime(defTimeArray)
    //console.log(getDefTime + ' getDefTime what is it..');
    defTotalTime = defTotalTime + getDefTime


    //setDefTime(defTotalTime)
    //setDefPercent(defTotalPercent)

    golTotalTime = getTotalTime(golTimeArray)
    golTotalTime = golTotalTime + getGolTime


    //setGolTime(golTotalTime)
    //setGolPercent(golTotalPercent)

    subTotalTime = getTotalTime(subTimeArray)
    subTotalTime = subTotalTime + getSubTime

    //console.log(player.playerName + ' player name');
    //console.log(getFwdTime + " getFwdTime");
    //console.log(getMidTime + " getMidTime");
    //console.log(getDefTime + " getDefTime");
    //console.log(getGolTime + " getGolTime");
    //console.log(getSubTime + " getSubTime.");

    let totalGameTime = 0
    if (whereFrom === 'endGame') {
      //console.log('hitting huh?');
      totalGameTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime + subTotalTime + getFwdTime + getMidTime + getDefTime + getGolTime + getSubTime
    }
    else {
        totalGameTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime + subTotalTime
    }


    //console.log(totalGameTime + " totalGameTime");
    //console.log(fwdTotalTime + " fwdTotalTime");
    //console.log(midTotalTime + " midTotalTime");
    //console.log(defTotalTime + " defTotalTime");
    //console.log(golTotalTime + " golTotalTime");
    //console.log(subTotalTime + " subTotalTime.");

    fwdTotalPercent = getTotalPercent(fwdTotalTime, totalGameTime)
    midTotalPercent = getTotalPercent(midTotalTime, totalGameTime)
    defTotalPercent = getTotalPercent(defTotalTime, totalGameTime)
    golTotalPercent = getTotalPercent(golTotalTime, totalGameTime)
    subTotalPercent = getTotalPercent(subTotalTime, totalGameTime)
    //setSubTime(subTotalTime)
    //setSubPercent(subTotalPercent)



  return (
    <HStack>
    <Box minW="20%"alignSelf="center" mt="3">
      <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>FWD</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(fwdTotalTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({fwdTotalPercent}%)</Text></Button>
    </Box>
    <Box minW="20%"alignSelf="center" mt="3">
      <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>MID</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(midTotalTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({midTotalPercent}%)</Text></Button>
    </Box>
    <Box minW="20%"alignSelf="center" mt="3">
      <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>DEF</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(defTotalTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({defTotalPercent}%)</Text></Button>
    </Box>
    <Box minW="20%" alignSelf="center" mt="3">
      <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>GOL</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(golTotalTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({golTotalPercent}%)</Text></Button>
    </Box>
    <Box minW="20%"alignSelf="center" mt="3">
      <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>SUB</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(subTotalTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({subTotalPercent}%)</Text></Button>
    </Box>
    </HStack>
  )

  }

  const getTotalTime = (posTimeArray) => {
    //console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check.');
    const posTotalTime = posTimeArray.reduce((a,v) =>  a = a + v.totalTime , 0 )
    return posTotalTime
  }

  const getPositionTimes = (pos) => {

    //console.log(pos.st + ' checking fwd.st');
    //console.log(pos.fin + ' checking fwd.fin');
    let startTime = 0
    let endTime = 0
  try {
    startTime = pos.st
    endTime = pos.fin
  }
  catch {
    startTime = 0
    endTime = 0
  }

//console.log(' am i gtting as far as hwere. 1');


  if (endTime === 99999999) {
    //console.log(sixtySecondsMark + ' check sixtySecondsMark');
    //endTime = sixtySecondsMark
    endTime = secondsElapsed
  }

  //console.log(' am i gtting as far as hwere. 2');

  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalPercent = (posTotalTime, totalGameTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      posPercent = ((posTotalTime / totalGameTime) * 100).toFixed(0)
    }
    catch {
      posPercent = 0
    }

    if (isNaN(posPercent)) {
      posPercent = 0
    }

    return posPercent

  }

        return (

          <HStack>
            {games.length <= 1 &&
              <Box>
                </Box>
            }
            {seasonsDisplay !== '' &&
            <Box>
                {getPositionTimesDisplay()}
              </Box>
            }
            {seasonsDisplay === '' &&
            <Box>
              <Box minW="100%" bg="primary.100" mt="2" pt="2" pb="2" pl="2" pr="2" style={{borderRadius: 5, borderColor: '#fff', borderWidth: 2}}><Text style={{color: '#0891b2', fontSize: 16, lineHeight: 0}}>Select Season from dropdown menu above to show current season positions played</Text></Box>
              </Box>
            }
          </HStack>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default SeasonPositionStats;

/*
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>FWD</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getFwdTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getFwdPercent}%)</Text></Button>
</Box>
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>MID</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getMidTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getMidPercent}%)</Text></Button>
</Box>
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>DEF</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getDefTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getDefPercent}%)</Text></Button>
</Box>
<Box minW="20%" alignSelf="center" mt="3">
  <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>GOL</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getGolTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getGolPercent}%)</Text></Button>
</Box>
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>SUB</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getSubTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getSubPercent}%)</Text></Button>
</Box>
*/

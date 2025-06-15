import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateStatsSort } from '../../Reducers/statsSort';

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
  let statsSort = useSelector(state => state.statsSort.statsSort);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);


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

    const { navigate } = props.navigation;

    useEffect(() => {

   //console.log(whereFrom + ' what is whereFrom?..');

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
     //console.log('this is a hit _games[0].teamPlayers[playerIndex] firsy fws check sixtySecondsMark');
        const totalTime = 0
        fwdTimeArray.push({totalTime})
      }

      try {
          if (whatData === 1) {
            playerData.postionTimes.mid.map(mid => {
           //console.log(mid + ' mid check. sixtySecondsMark');
              const totalTime = getPositionTimes(mid)
              midTimeArray.push({totalTime})
            })
          }
          else {
       //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.mid) + ' firsy mid check new. sixtySecondsMark');
          _games[0].teamPlayers[playerIndex].postionTimes.mid.map(mid => {
         //console.log(mid + ' mid check. sixtySecondsMark');
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
           //console.log(def + ' mid check. sixtySecondsMark');
              const totalTime = getPositionTimes(def)
              defTimeArray.push({totalTime})
            })
          }
          else {
       //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.def) + ' firsy def check new. sixtySecondsMark');
          _games[0].teamPlayers[playerIndex].postionTimes.def.map(def => {
         //console.log(def + ' mid check. sixtySecondsMark');
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
           //console.log(gol + ' gol check.. sixtySecondsMark');
              const totalTime = getPositionTimes(gol)
              golTimeArray.push({totalTime})
            })
          }
          else {
       //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.gol) + ' firsy gol check new. sixtySecondsMark');
          _games[0].teamPlayers[playerIndex].postionTimes.gol.map(gol => {
         //console.log(gol + ' gol check. sixtySecondsMark');
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
           //console.log(sub + ' sub check. sixtySecondsMark');
              const totalTime = getPositionTimes(sub)
              subTimeArray.push({totalTime})
            })
          }
          else {
       //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.sub) + ' firsy sub check new. sixtySecondsMark');
          _games[0].teamPlayers[playerIndex].postionTimes.sub.map(sub => {
         //console.log(sub + ' sub check. sixtySecondsMark');
            const totalTime = getPositionTimes(sub)
            subTimeArray.push({totalTime})
          })
        }
      }
      catch {
        const totalTime = 0
        subTimeArray.push({totalTime})
      }

      const fwdTotalTime = getTotalTime(fwdTimeArray, 0)
      //const fwdTotalPercent = getTotalPercent(fwdTotalTime)

      setFwdTime(fwdTotalTime)
      //setFwdPercent(fwdTotalPercent)

      const midTotalTime = getTotalTime(midTimeArray, 0)
      //const midTotalPercent = getTotalPercent(midTotalTime)

      setMidTime(midTotalTime)
      //setMidPercent(midTotalPercent)

      const defTotalTime = getTotalTime(defTimeArray, 0)
      //const defTotalPercent = getTotalPercent(defTotalTime)

   //console.log(defTotalTime + ' defTotalTime up here. sixtySecondsMark');
      setDefTime(defTotalTime)
      //setDefPercent(defTotalPercent)

      const golTotalTime = getTotalTime(golTimeArray, 0)
      //const golTotalPercent = getTotalPercent(golTotalTime)

      setGolTime(golTotalTime)
      //setGolPercent(golTotalPercent)

      const subTotalTime = getTotalTime(subTimeArray, 0)
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
    if (whereFrom === 78) {

      const playerData = props.playerData
   //console.log(JSON.stringify(playerData) + ' i need to chck playerData here ok props.playerData.');
      statDisplay = runPlayerPosStats(playerData)
      //return statDisplay
    }
    else {
   //console.log('i guess were else?');
    teamPlayers.map(player => {

      if (playerData.id === player.id) {
        statDisplay = runPlayerPosStats(player)
        }
      })

    }

    return statDisplay

  }

  const buyPro = () => {
    navigate('Iap');
  }

  const displayPosTotalTimeText = (posTotalTime, posTotalPercent) => {

    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
      return (
        <View>
          <Text style={styles.textEighteen}>{formattedSeconds(posTotalTime)}min</Text>
          <Text style={styles.textEighteen}>({posTotalPercent}%)</Text>
        </View>
      )
    }
    else {
      return (
        <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>Buy Pro!</Button>
      )
    }

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
      let totalPlayedPercent = 0

      try {
    player.postionTimeStats.map(stat => {

      if (stat.season === seasonsDisplayId) {

    try {
   //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check..');
      stat.posTimes.fwd.map(fwd => {
     //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check.. 1');
        const totalTime = getPositionTimes(fwd)
     //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check.. 2');
     //console.log(totalTime + ' need to look at totalTime here..');
        const totalTimeNum = Number(totalTime)
        fwdTimeArray.push(totalTimeNum)
      })
    }
    catch {
   //console.log('this is a hit playerData firsy fws check');
      const totalTime = 0
      fwdTimeArray.push(totalTime)
    }

    try {
   //console.log(JSON.stringify(stat.posTimes.mid) + ' firsy mid check new.');
      stat.posTimes.mid.map(mid => {
     //console.log(mid + ' mid check.');
        const totalTime = getPositionTimes(mid)
        const totalTimeNum = Number(totalTime)
        midTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      midTimeArray.push(totalTime)
    }

    try {
   //console.log(JSON.stringify(stat.posTimes.def) + ' firsy def check new.');
      stat.posTimes.def.map(def => {
     //console.log(def + ' mid check.');
        const totalTime = getPositionTimes(def)
        const totalTimeNum = Number(totalTime)
        defTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      defTimeArray.push(totalTime)
    }

    try {
   //console.log(JSON.stringify(stat.posTimes.gol) + ' firsy gol check new.');
      stat.posTimes.gol.map(gol => {
     //console.log(gol + ' gol check.');
        const totalTime = getPositionTimes(gol)
        const totalTimeNum = Number(totalTime)
        golTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      golTimeArray.push(totalTime)
    }

    try {
   //console.log(JSON.stringify(stat.posTimes.sub) + ' firsy sub check new.');
      stat.posTimes.sub.map(sub => {
     //console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        const totalTimeNum = Number(totalTime)
        subTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push(totalTime)
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

    fwdTotalTime = getTotalTime(fwdTimeArray, 1)
    fwdTotalTime = fwdTotalTime + getFwdTime


    //setFwdTime(fwdTotalTime)
    //setFwdPercent(fwdTotalPercent)

 //console.log(fwdTotalTime + ' what is seasson fwdTotalTime');
 //console.log(fwdTotalPercent + ' what is seasson fwdTotalPercent');

    midTotalTime = getTotalTime(midTimeArray, 1)
    midTotalTime = midTotalTime + getMidTime


    //setMidTime(midTotalTime)
    //setMidPercent(midTotalPercent)

    defTotalTime = getTotalTime(defTimeArray, 1)
 //console.log(getDefTime + ' getDefTime what is it..');
    defTotalTime = defTotalTime + getDefTime


    //setDefTime(defTotalTime)
    //setDefPercent(defTotalPercent)

    golTotalTime = getTotalTime(golTimeArray, 1)
    golTotalTime = golTotalTime + getGolTime


    //setGolTime(golTotalTime)
    //setGolPercent(golTotalPercent)

    subTotalTime = getTotalTime(subTimeArray, 1)
    subTotalTime = subTotalTime + getSubTime

 //console.log(whereFrom + ' where is this coming from?');
 //console.log(player.playerName + ' player name');
 //console.log(getFwdTime + " getFwdTime");
 //console.log(getMidTime + " getMidTime");
 //console.log(getDefTime + " getDefTime");
 //console.log(getGolTime + " getGolTime");
 //console.log(getSubTime + " getSubTime.");
 //console.log(fwdTotalTime + " fwdTotalTime");
 //console.log(midTotalTime + " midTotalTime");
 //console.log(defTotalTime + " defTotalTime");
 //console.log(golTotalTime + " golTotalTime");
 //console.log(subTotalTime + " subTotalTime.");

    let totalGameTime = 0
    let totalGameTimePlayed = 0
    if (whereFrom === 'endGame') {
      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      const totalGameTimeSeconds = _games.sixtySecondsMark
      totalGameTime = totalGameTimeSeconds / 60
      totalGameTimePlayed = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime
    }
    else {
        totalGameTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime + subTotalTime
        totalGameTimePlayed = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime
    }


 //console.log(totalGameTime + " totalGameTime 11");
 //console.log(fwdTotalTime + " fwdTotalTime 12");
 //console.log(midTotalTime + " midTotalTime 13");
 //console.log(defTotalTime + " defTotalTime 14");
 //console.log(golTotalTime + " golTotalTime 15");
 //console.log(subTotalTime + " subTotalTime 16");

 //console.log(totalGameTime + ' totalGameTime? 17');

    if (isNaN(totalGameTime)) {
   //console.log('Must be NaN');
      totalGameTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime + subTotalTime
      totalGameTimePlayed = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime
    }

    fwdTotalPercent = getTotalPercent(fwdTotalTime, totalGameTime)
    midTotalPercent = getTotalPercent(midTotalTime, totalGameTime)
    defTotalPercent = getTotalPercent(defTotalTime, totalGameTime)
    golTotalPercent = getTotalPercent(golTotalTime, totalGameTime)
    subTotalPercent = getTotalPercent(subTotalTime, totalGameTime)
    totalPlayedPercent = getTotalPercent(totalGameTimePlayed, totalGameTime)
    //setSubTime(subTotalTime)
    //setSubPercent(subTotalPercent)


    if (props.whereFrom === 78) {
        return (
          <VStack>
          <HStack>
          <Heading pt="2" pb="2" style={{color: '#fff'}}>
            Total Time:
          </Heading>
          </HStack>
          <HStack>

          <Box minW="20%"alignSelf="center" mr="2" mt="3">
            <Button bg="cyan.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
              <Text style={styles.textTwentyBold}>PLAYED</Text>
              <Box mt="1" mb="1">
                <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
              </Box>
              <View>
                <Text style={styles.textEighteen}>{formattedSeconds(totalGameTimePlayed)}min</Text>
                <Text style={styles.textEighteen}>({totalPlayedPercent}%)</Text>
              </View>
            </Button>
          </Box>
          <Box minW="20%"alignSelf="center" ml="2" mt="3">
            <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
              <Text style={styles.textTwentyBold}>SUBSTITUTE</Text>
              <Box mt="1" mb="1">
                <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
              </Box>
              <View>
                <Text style={styles.textEighteen}>{formattedSeconds(subTotalTime)}min</Text>
                <Text style={styles.textEighteen}>({subTotalPercent}%)</Text>
              </View>
            </Button>
          </Box>
          </HStack>
          <HStack>
          <Heading pt="2" pb="2" style={{color: '#fff'}}>
            Total Time: <Heading style={{color: '#fff', fontWeight: '400'}}>In each position</Heading>
          </Heading>
          </HStack>
        <HStack>
        <Box alignSelf="center" mt="3" mr="2">
          <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
            <Text style={styles.textTwentyBold}>FORWARD</Text>
            <Box mt="1" mb="1">
              <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
            </Box>
            {displayPosTotalTimeText(fwdTotalTime, fwdTotalPercent)}
          </Button>
        </Box>
        <Box minW="20%"alignSelf="center" mt="3" ml="2">
          <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
            <Text style={styles.textTwentyBold}>MIDFIELD</Text>
            <Box mt="1" mb="1">
              <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
            </Box>
            {displayPosTotalTimeText(midTotalTime, midTotalPercent)}
            </Button>
        </Box>
        </HStack>
        <HStack>

        <Box minW="20%"alignSelf="center" mr="2" mt="3">
          <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
            <Text style={styles.textTwentyBold}>DEFENCE</Text>
            <Box mt="1" mb="1">
              <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
            </Box>
            {displayPosTotalTimeText(defTotalTime, defTotalPercent)}
            </Button>
        </Box>
        <Box minW="20%" alignSelf="center" ml="2" mt="3">
          <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
            <Text style={styles.textTwentyBold}>GOLIE</Text>
            <Box mt="1" mb="1">
              <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
            </Box>
            {displayPosTotalTimeText(golTotalTime, golTotalPercent)}
            </Button>
        </Box>

        </HStack>
        <HStack>
        <Box minW="20%"alignSelf="center" mt="3">
          <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="100%" size="xs">
            <Text style={styles.textTwentyBold}>SUBSTITUTE</Text>
            <Box mt="1" mb="1">
              <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
            </Box>
              {displayPosTotalTimeText(subTotalTime, subTotalPercent)}
          </Button>
        </Box>
        </HStack>
        </VStack>
      )
    }
    else if (props.whereFrom === 79) {


      //const sortTeamPlayersArray = {playerName: props.playerData.playerName, totalPercent: subTotalPercent}]
      /*
      let _statsSort = []
      try {
        _statsSort = [...statsSort]
      }
      catch {
        _statsSort = [{...statsSort}]
      }

      _statsSort.push({playerName: props.playerData.playerName, totalPercent: subTotalPercent})

      dispatch(updateStatsSort(_statsSort))

   //console.log(_statsSort + ' statsSort is wha?');
   //console.log(statsSort + ' statsSort is wha?');
      */

    }
    else {

  return (
    <HStack>
    <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
      {displayPosTotalTimeTextTwo('fwd', fwdTotalTime, fwdTotalPercent)}
    </Box>
    <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
      {displayPosTotalTimeTextTwo('mid', midTotalTime, midTotalPercent)}
    </Box>
    <Box style={{minWidth: '20%', maxWidth: '20%'}}alignSelf="center" mt="3">
      {displayPosTotalTimeTextTwo('def', defTotalTime, defTotalPercent)}
    </Box>
    <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
      {displayPosTotalTimeTextTwo('gol', golTotalTime, golTotalPercent)}
    </Box>
    <Box style={{minWidth: '20%', maxWidth: '20%'}}alignSelf="center" mt="3">
      {displayPosTotalTimeTextTwo('sub', subTotalTime, subTotalPercent)}
    </Box>
    </HStack>
  )
}

  }

  const displayPosTotalTimeTextTwo = (posType, posTotalTime, posTotalPercent) => {

    //if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {

      if (posType === 'fwd') {
        return (
          <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={styles.firstBlock}>
            <Text style={styles.textPos}>FWD</Text>
            <Text style={styles.textPosSec}>{formattedSeconds(posTotalTime)}min</Text>
            <Text style={styles.textPos}>({posTotalPercent}%)</Text>
          </Button>
          )
        }
        else if (posType === 'mid') {
          return (
          <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={styles.middleBlock}>
            <Text style={styles.textPos}>MID</Text>
            <Text style={styles.textPosSec}>{formattedSeconds(posTotalTime)}min</Text>
            <Text style={styles.textPos}>({posTotalPercent}%)</Text>
          </Button>
        )
      }
      else if (posType === 'def') {
        return (
          <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={styles.middleBlock}>
            <Text style={styles.textPos}>DEF</Text>
            <Text style={styles.textPosSec}>{formattedSeconds(posTotalTime)}min</Text>
            <Text style={styles.textPos}>({posTotalPercent}%)</Text>
          </Button>
        )
      }
      else if (posType === 'gol') {
        return (
          <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={styles.middleBlock}>
            <Text style={styles.textPos}>GOL</Text>
            <Text style={styles.textPosSec}>{formattedSeconds(posTotalTime)}min</Text>
            <Text style={styles.textPos}>({posTotalPercent}%)</Text>
          </Button>
        )
      }
      else if (posType === 'sub') {
        return (
          <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={styles.endBlock}>
            <Text style={styles.textPos}>SUB</Text>
            <Text style={styles.textPosSec}>{formattedSeconds(posTotalTime)}min</Text>
            <Text style={styles.textPos}>({posTotalPercent}%)</Text>
          </Button>
        )
      }
    /*}
    else {
        if (posType === 'fwd' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
          return (

              <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" size="xs" style={styles.firstBlock}>
                <Text style={styles.textPos}>FWD</Text>
                <Text style={styles.textPos}>--%</Text>
                <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
                <Text style={styles.textPosPro}>Buy</Text>
                <Text style={styles.textPosPro}>Pro</Text>
                </Button>
              </Button>

            )
          }
          else if (posType === 'mid' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
            return (

                <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" size="xs" style={styles.middleBlock}>
                  <Text style={styles.textPos}>MID</Text>
                  <Text style={styles.textPos}>--%</Text>
                  <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
                  <Text style={styles.textPosPro}>Buy</Text>
                  <Text style={styles.textPosPro}>Pro</Text>
                  </Button>
                </Button>

          )
        }
        else if (posType === 'def' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
          return (

              <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={styles.middleBlock}>
                <Text style={styles.textPos}>DEF</Text>
                <Text style={styles.textPos}>--%</Text>
                <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
                <Text style={styles.textPosPro}>Buy</Text>
                <Text style={styles.textPosPro}>Pro</Text>
                </Button>
              </Button>

          )
        }
        else if (posType === 'gol' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
          return (

              <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={styles.middleBlock}>
                <Text style={styles.textPos}>GOL</Text>
                <Text style={styles.textPos}>--%</Text>
                <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
                <Text style={styles.textPosPro}>Buy</Text>
                <Text style={styles.textPosPro}>Pro</Text>
                </Button>
              </Button>

          )
        }
        else if (posType === 'sub' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
          return (

              <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={styles.endBlock}>
                <Text style={styles.textPos}>SUB</Text>
                <Text style={styles.textPos}>--%</Text>
                <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
                <Text style={styles.textPosPro}>Buy</Text>
                <Text style={styles.textPosPro}>Pro</Text>
                </Button>
              </Button>

          )
        }
        else {
          return (
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>Buy Pro!</Button>
          )
        }
    }
    */
  }

  const getTotalTime = (posTimeArray, posTimeType) => {
 //console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check...');
    let posTotalTime = 0
    if (posTimeType === 0) {
      posTotalTime = posTimeArray.reduce((a,v) =>  a = a + v.totalTime , 0 )
    }
    else {
        posTotalTime = posTimeArray.reduce((partialSum, a) => partialSum + a, 0);
    }


 //console.log(posTotalTime + ' posTotalTime check 1');
    if (posTotalTime === NaN || isNaN(posTotalTime)) {
      posTotalTime = 0
    }
 //console.log(posTotalTime + ' posTotalTime check 2.');
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
   //console.log(totalGameTime + ' inside totalGameTime');
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

//console.log('do we get here? ok checking.');
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
              <Box minW="100%" bg="primary.100" mt="2" pt="2" pb="2" pl="2" pr="2" style={{borderRadius: 5, borderColor: '#fff', borderWidth: 2}}><Text style={styles.textSixteen}>Re-select Season from dropdown menu above to show current season positions played</Text></Box>
              </Box>
            }
          </HStack>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textPos: {
    color: '#0891b2',
    fontSize: 12,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 12,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textPosSec: {
    color: '#0891b2',
    fontSize: 10,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 10,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  firstBlock: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      /*
      ...Platform.select({
        ios: {
          minWidth: '18.5%',
        },
        android: {
          minWidth: '18.5%',
          maxWidth: '18.5%',
        },
        default: {
          minWidth: '18.5%',
        }
        })
        */
    },
    middleBlock: {
      borderRadius: 0,
      /*
      ...Platform.select({
        ios: {
          minWidth: '18.5%',
        },
        android: {
          minWidth: '18.5%',
          maxWidth: '18.5%',
        },
        default: {
          minWidth: '18.5%',
        }
        })
        */
    },
    textPosPro :{
      color: '#fff',
      fontSize: 14,
      textAlign: 'center',
      ...Platform.select({
        ios: {
          lineHeight: 0,
        },
        android: {
          lineHeight: 14,
        },
        default: {
          lineHeight: 0,
        }
        })
    },
    endBlock: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    textEighteen :{
      color: '#0891b2',
      fontSize: 18,
      textAlign: 'center',
      ...Platform.select({
        ios: {
          lineHeight: 0,
        },
        android: {
          lineHeight: 18,
        },
        default: {
          lineHeight: 0,
        }
        })
    },
    textTwentyBold :{
      color: '#0891b2',
      fontSize: 20,
      textAlign: 'center',
      fontWeight: '600',
      ...Platform.select({
        ios: {
          lineHeight: 0,
        },
        android: {
          lineHeight: 20,
        },
        default: {
          lineHeight: 0,
        }
        })
    },
    textSixteen :{
      color: '#0891b2',
      fontSize: 16,
      ...Platform.select({
        ios: {
          lineHeight: 0,
        },
        android: {
          lineHeight: 16,
        },
        default: {
          lineHeight: 0,
        }
        })
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

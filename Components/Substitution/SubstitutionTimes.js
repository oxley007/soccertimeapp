import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

import SelectPlayerList from '../AddPlayers/SelectPlayerList.js'
import StatsBoard from '../Stats/StatsBoard.js'

const SubstitutionTimes = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getFwdTime, setFwdTime] = useState([]);
  const [getFwdPercent, setFwdPercent] = useState([]);
  const [getMidTime, setMidTime] = useState([]);
  const [getMidPercent, setMidPercent] = useState([]);
  const [getDefTime, setDefTime] = useState([]);
  const [getDefPercent, setDefPercent] = useState([]);
  const [getGolTime, setGolTime] = useState([]);
  const [getGolPercent, setGolPercent] = useState([]);
  const [getSubTime, setSubTime] = useState([]);
  const [getSubPercent, setSubPercent] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const postionTimes = props.postionTimes
  const currentPosition = props.currentPosition
  const playerId = props.playerId
  const playerData = props.playerData
  const whereFrom = props.whereFrom

  let startTime = 0
  let endTime = 0
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
 //console.log(playerId + ' player id');
 //console.log(JSON.stringify(postionTimes.fwd) + 'checking postimes.');

    try {
   //console.log(JSON.stringify(postionTimes.fwd) + ' firsy mid check.');
      postionTimes.fwd.map(fwd => {
        const totalTime = getPositionTimes(fwd)
        fwdTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      fwdTimeArray.push({totalTime})
    }


    try {
   //console.log(JSON.stringify(postionTimes.mid) + ' firsy mid check new.');
      postionTimes.mid.map(mid => {
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
   //console.log(JSON.stringify(postionTimes.def) + ' firsy def check new.');
      postionTimes.def.map(def => {
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
   //console.log(JSON.stringify(postionTimes.gol) + ' firsy gol check new.');
      postionTimes.gol.map(gol => {
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
   //console.log(JSON.stringify(postionTimes.sub) + ' firsy sub check new.');
      postionTimes.sub.map(sub => {
     //console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        subTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push({totalTime})
    }

   //console.log(';whne hit say hi');
   //console.log(JSON.stringify(fwdTimeArray) + ' fwdTimeArray;whne hit say hi');
      const fwdTotalTime = getTotalTime(fwdTimeArray)
   //console.log(fwdTotalTime + ' fwdTotalTime new');
      const fwdTotalPercent = getTotalPercent(fwdTotalTime)
   //console.log(fwdTotalPercent + ' fwdTotalPercent new');

      setFwdTime(fwdTotalTime)
      setFwdPercent(fwdTotalPercent)

   //console.log(JSON.stringify(midTimeArray) + ' midTimeArray;whne hit say hi');
      const midTotalTime = getTotalTime(midTimeArray)
   //console.log(midTotalTime + ' midTotalTime');
      const midTotalPercent = getTotalPercent(midTotalTime)

      setMidTime(midTotalTime)
      setMidPercent(midTotalPercent)

   //console.log(JSON.stringify(defTimeArray) + ' defTimeArray;whne hit say hi');
      const defTotalTime = getTotalTime(defTimeArray)
      const defTotalPercent = getTotalPercent(defTotalTime)

      setDefTime(defTotalTime)
      setDefPercent(defTotalPercent)

   //console.log(JSON.stringify(golTimeArray) + ' golTimeArray;whne hit say hi');
      const golTotalTime = getTotalTime(golTimeArray)
      const golTotalPercent = getTotalPercent(golTotalTime)

      setGolTime(golTotalTime)
      setGolPercent(golTotalPercent)

   //console.log(JSON.stringify(subTimeArray) + ' subTimeArray;whne hit say hi');
      const subTotalTime = getTotalTime(subTimeArray)
      const subTotalPercent = getTotalPercent(subTotalTime)

      setSubTime(subTotalTime)
      setSubPercent(subTotalPercent)




  },[postionTimes, sixtySecondsMark])

const getPositionTimes = (pos) => {

 //console.log(pos.st + ' checking fwd.st');
 //console.log(pos.fin + ' checking fwd.fin');
try {
  startTime = pos.st
  endTime = pos.fin
}
catch {
  startTime = 0
  endTime = 0
}


if (endTime === 99999999) {
 //console.log(sixtySecondsMark + ' check sixtySecondsMark');
  endTime = sixtySecondsMark
}


const totalTime = endTime - startTime

return totalTime

}

const getTotalTime = (posTimeArray) => {
 //console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check.');
  const posTotalTime = posTimeArray.reduce((a,v) =>  a = a + v.totalTime , 0 )
  return posTotalTime
}

const getTotalPercent = (posTotalTime) => {
  let posPercent = 0
 //console.log(props.whereFrom + ' props.whereFrom');
  try {
    if (props.whereFrom === 'prevGame' || props.whereFrom === 55){
   //console.log('we are in prevGame');
   //console.log(props.prevGameTime + ' props.prevGameTime');
      let gameHalfTime = 0
      if (props.dataFrom === 183) {
          gameHalfTime = props.prevGameTimePlayer
      }
      else {
        gameHalfTime = props.prevGameTime
      }
      gameHalfTime = gameHalfTime * 2
   //console.log(gameHalfTime + ' gameHalfTime?>');
   //console.log(posTotalTime + ' posTotalTime');
   //console.log(gameHalfTime + ' gameHalfTime');
    posPercent = ((posTotalTime / gameHalfTime) * 100).toFixed(0)
    }
    else if (props.whereFrom === 'endGame') {
   //console.log(posTotalTime + ' posTotalTime');
   //console.log(sixtySecondsMark + ' sixtySecondsMark');
      const gameFullTime = games[0].gameHalfTime * 2
   //console.log(gameFullTime + ' gameFullTime');
    posPercent = ((posTotalTime / gameFullTime) * 100).toFixed(0)
    }
    else {
    posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
    }

  }
  catch {
    posPercent = 0
  }

  if (isNaN(posPercent)) {
    posPercent = 0
  }

  return posPercent

}


  const getPosType = () => {

    if (whereFrom === 'endGame') {
      return (
        <View>
        <HStack minW='100%' mt="2">
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="primary.50" _pressed={{ backgroundColor: 'primary.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={styles.textTenBlue}>{formattedSeconds(getFwdTime)}min</Text><Text style={styles.textTwelveBlue}>({getFwdPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={styles.textTenBlue}>{formattedSeconds(getMidTime)}min</Text><Text style={styles.textTwelveBlue}>({getMidPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="warning.100" _pressed={{ backgroundColor: 'warning.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={styles.textTenBlue}>{formattedSeconds(getDefTime)}min</Text><Text style={styles.textTwelveBlue}>({getDefPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="fuchsia.100" _pressed={{ backgroundColor: 'fuchsia.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={styles.textTenBlue}>{formattedSeconds(getGolTime)}min</Text><Text style={styles.textTwelveBlue}>({getGolPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="emerald.100" _pressed={{ backgroundColor: 'emerald.250', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={styles.textTenBlue}>{formattedSeconds(getSubTime)}min</Text><Text style={styles.textTwelveBlue}>({getSubPercent}%)</Text></Button>
          </Box>

        </HStack>
        {getGameStats()}
        </View>

      )
    }
    if (whereFrom === 'prevGame' || whereFrom === 55) {
      return (
        <View>
        <HStack minW='100%' mt="2">
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="primary.50" _pressed={{ backgroundColor: 'primary.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={styles.textTenBlue}>FWD</Text><Text style={styles.textTenBlue}>{formattedSeconds(getFwdTime)}min</Text><Text style={styles.textTwelveBlue}>({getFwdPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={styles.textTenBlue}>MID</Text><Text style={styles.textTenBlue}>{formattedSeconds(getMidTime)}min</Text><Text style={styles.textTwelveBlue}>({getMidPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="warning.100" _pressed={{ backgroundColor: 'warning.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={styles.textTenBlue}>DEF</Text><Text style={styles.textTenBlue}>{formattedSeconds(getDefTime)}min</Text><Text style={styles.textTwelveBlue}>({getDefPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="fuchsia.100" _pressed={{ backgroundColor: 'fuchsia.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={styles.textTenBlue}>GOL</Text><Text style={styles.textTenBlue}>{formattedSeconds(getGolTime)}min</Text><Text style={styles.textTwelveBlue}>({getGolPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="emerald.100" _pressed={{ backgroundColor: 'emerald.250', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={styles.textTenBlue}>SUB</Text><Text style={styles.textTenBlue}>{formattedSeconds(getSubTime)}min</Text><Text style={styles.textTwelveBlue}>({getSubPercent}%)</Text></Button>
          </Box>

        </HStack>
        {getGameStats()}
        </View>

      )
    }
    else {


    return (
      <Box>
      <StatsBoard statsPlayerId={props.playerId} />
      {props.selectPlayer !== true &&
        <View>
      <HStack pb="2">
        <Box ml="1" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
        </Box>
        <Box minW="32%" ml="3">
          <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Game Times/Stats</Text>
        </Box>
        <Box ml="3" minW="39%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
        </Box>
      </HStack>
      <HStack minW='100%'>
        <Box minW="20%" alignSelf="center" mt="0">
          <Button bg="primary.50" _pressed={{ backgroundColor: 'primary.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
            <Text style={styles.textTwelveBlue}>FWD</Text>
            <Text style={styles.textTenBlue}>{formattedSeconds(getFwdTime)}min</Text>
            <Text style={styles.textTwelveBlue}>({getFwdPercent}%)</Text>
          </Button>
        </Box>
        <Box minW="20%" alignSelf="center" mt="0">
          <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textTwelveBlue}>MID</Text>
            <Text style={styles.textTenBlue}>{formattedSeconds(getMidTime)}min</Text>
            <Text style={styles.textTwelveBlue}>({getMidPercent}%)</Text>
          </Button>
        </Box>
        <Box minW="20%" alignSelf="center" mt="0">
          <Button bg="warning.100" _pressed={{ backgroundColor: 'warning.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textTwelveBlue}>DEF</Text>
            <Text style={styles.textTenBlue}>{formattedSeconds(getDefTime)}min</Text>
            <Text style={styles.textTwelveBlue}>({getDefPercent}%)</Text>
          </Button>
        </Box>
        <Box minW="20%" alignSelf="center" mt="0">
          <Button bg="fuchsia.100" _pressed={{ backgroundColor: 'fuchsia.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textTwelveBlue}>GOL</Text>
            <Text style={styles.textTenBlue}>{formattedSeconds(getGolTime)}min</Text>
            <Text style={styles.textTwelveBlue}>({getGolPercent}%)</Text>
          </Button>
        </Box>
        <Box minW="20%" alignSelf="center" mt="0">
          <Button bg="emerald.100" _pressed={{ backgroundColor: 'emerald.250', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
            <Text style={styles.textTwelveBlue}>SUB</Text>
            <Text style={styles.textTenBlue}>{formattedSeconds(getSubTime)}min</Text>
            <Text style={styles.textTwelveBlue}>({getSubPercent}%)</Text>
          </Button>
        </Box>
      </HStack>
      </View>
    }
    {props.selectPlayer !== true &&
      <View>
        {getGameStats()}
      </View>
    }
      </Box>

    )
  }

  }

  const checkStatsAvailable = (stat) => {

    if (stat === 'gol') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={styles.textEighteen}>{playerData.gameStats[0].gol}</Text><Text style={styles.textTwelve}>Goals</Text><Text style={styles.textTwelve}></Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={styles.textEighteen}>0</Text><Text style={styles.textTwelve}>Goals</Text><Text style={styles.textTwelve}></Text></Button>)
      }
    }
    else if (stat === 'asst') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={styles.textEighteen}>{playerData.gameStats[0].asst}</Text><Text style={styles.textTwelve}>Assists</Text><Text style={styles.textTwelve}></Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={styles.textEighteen}>0</Text><Text style={styles.textTwelve}>Assists</Text><Text style={styles.textTwelve}></Text></Button>)
      }
    }
    else if (stat === 'defTac') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={styles.textEighteen}>{playerData.gameStats[0].defTac}</Text><Text style={styles.textTwelve}>Def. </Text><Text style={styles.textTwelve}>Tackle</Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={styles.textEighteen}>0</Text><Text style={styles.textTwelve}>Def. </Text><Text style={styles.textTwelve}>Tackle</Text></Button>)
      }
    }
    else if (stat === 'golSave') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0}}><Text style={styles.textEighteen}>{playerData.gameStats[0].golSave}</Text><Text style={styles.textTwelve}>Goal</Text><Text style={styles.textTwelve}>Save</Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0}}><Text style={styles.textEighteen}>0</Text><Text style={styles.textTwelve}>Goal</Text><Text style={styles.textTwelve}>Save</Text></Button>)
      }
    }

  }

  const getGameStats = () => {
    return (
      <HStack>
      <Box minW="25%" alignSelf="center" mt="3">
        {checkStatsAvailable('gol')}
      </Box>
      <Box minW="25%"alignSelf="center" mt="3">
        {checkStatsAvailable('asst')}
      </Box>
      <Box minW="25%"alignSelf="center" mt="3">
        {checkStatsAvailable('defTac')}
      </Box>
      <Box minW="25%" alignSelf="center" mt="3">
        {checkStatsAvailable('golSave')}
      </Box>
      </HStack>
    )
  }

//console.log(JSON.stringify(fwdTimeArray) + ' befoer render fwdTimeArray');

        return (
          <View>
              {getPosType()}
          </View>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textTwelveBlue: {
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
  textTenBlue: {
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
  textEighteen: {
    color: '#fff',
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
  textTwelve: {
    color: '#fff',
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
})

export default SubstitutionTimes;

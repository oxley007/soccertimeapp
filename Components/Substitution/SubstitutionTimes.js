import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

import SelectPlayerList from '../AddPlayers/SelectPlayerList.js'

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
    ////console.log(playerId + ' player id');
    ////console.log(JSON.stringify(postionTimes.fwd) + 'checking postimes.');

    try {
      ////console.log(JSON.stringify(postionTimes.fwd) + ' firsy mid check.');
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
      ////console.log(JSON.stringify(postionTimes.mid) + ' firsy mid check new.');
      postionTimes.mid.map(mid => {
        ////console.log(mid + ' mid check.');
        const totalTime = getPositionTimes(mid)
        midTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      midTimeArray.push({totalTime})
    }

    try {
      ////console.log(JSON.stringify(postionTimes.def) + ' firsy def check new.');
      postionTimes.def.map(def => {
        ////console.log(def + ' mid check.');
        const totalTime = getPositionTimes(def)
        defTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      defTimeArray.push({totalTime})
    }

    try {
      ////console.log(JSON.stringify(postionTimes.gol) + ' firsy gol check new.');
      postionTimes.gol.map(gol => {
        ////console.log(gol + ' gol check.');
        const totalTime = getPositionTimes(gol)
        golTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      golTimeArray.push({totalTime})
    }

    try {
      ////console.log(JSON.stringify(postionTimes.sub) + ' firsy sub check new.');
      postionTimes.sub.map(sub => {
        ////console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        subTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push({totalTime})
    }


      ////console.log(';whne hit say hi');
      ////console.log(JSON.stringify(fwdTimeArray) + ' fwdTimeArray;whne hit say hi');
      const fwdTotalTime = getTotalTime(fwdTimeArray)
      const fwdTotalPercent = getTotalPercent(fwdTotalTime)

      setFwdTime(fwdTotalTime)
      setFwdPercent(fwdTotalPercent)

      ////console.log(JSON.stringify(midTimeArray) + ' midTimeArray;whne hit say hi');
      const midTotalTime = getTotalTime(midTimeArray)
      const midTotalPercent = getTotalPercent(midTotalTime)

      setMidTime(midTotalTime)
      setMidPercent(midTotalPercent)

      ////console.log(JSON.stringify(defTimeArray) + ' defTimeArray;whne hit say hi');
      const defTotalTime = getTotalTime(defTimeArray)
      const defTotalPercent = getTotalPercent(defTotalTime)

      setDefTime(defTotalTime)
      setDefPercent(defTotalPercent)

      ////console.log(JSON.stringify(golTimeArray) + ' golTimeArray;whne hit say hi');
      const golTotalTime = getTotalTime(golTimeArray)
      const golTotalPercent = getTotalPercent(golTotalTime)

      setGolTime(golTotalTime)
      setGolPercent(golTotalPercent)

      ////console.log(JSON.stringify(subTimeArray) + ' subTimeArray;whne hit say hi');
      const subTotalTime = getTotalTime(subTimeArray)
      const subTotalPercent = getTotalPercent(subTotalTime)

      setSubTime(subTotalTime)
      setSubPercent(subTotalPercent)




  },[postionTimes])

const getPositionTimes = (pos) => {

  ////console.log(pos.st + ' checking fwd.st');
  ////console.log(pos.fin + ' checking fwd.fin');
try {
  startTime = pos.st
  endTime = pos.fin
}
catch {
  startTime = 0
  endTime = 0
}


if (endTime === 99999999) {
  ////console.log(sixtySecondsMark + ' check sixtySecondsMark');
  endTime = sixtySecondsMark
}


const totalTime = endTime - startTime

return totalTime

}

const getTotalTime = (posTimeArray) => {
  ////console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check.');
  const posTotalTime = posTimeArray.reduce((a,v) =>  a = a + v.totalTime , 0 )
  return posTotalTime
}

const getTotalPercent = (posTotalTime) => {
  let posPercent = 0

  try {
    if (props.whereFrom === 'prevGame'){
      let gameHalfTime = _games.gameHalfTime
      gameHalfTime = gameHalfTime * 2
    posPercent = ((posTotalTime / gameHalfTime) * 100).toFixed(0)
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
        <HStack minW='100%' mt="2">
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="primary.50" _pressed={{ backgroundColor: 'primary.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getFwdTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getFwdPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getMidTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getMidPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="warning.100" _pressed={{ backgroundColor: 'warning.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getDefTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getDefPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="fuchsia.100" _pressed={{ backgroundColor: 'fuchsia.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getGolTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getGolPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="emerald.100" _pressed={{ backgroundColor: 'emerald.250', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getSubTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getSubPercent}%)</Text></Button>
          </Box>
        </HStack>

      )
    }
    if (whereFrom === 'prevGame') {
      return (
        <HStack minW='100%' mt="2">
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="primary.50" _pressed={{ backgroundColor: 'primary.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>FWD</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getFwdTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getFwdPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>MID</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getMidTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getMidPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="warning.100" _pressed={{ backgroundColor: 'warning.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>DEF</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getDefTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getDefPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="fuchsia.100" _pressed={{ backgroundColor: 'fuchsia.50', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>GOL</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getGolTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getGolPercent}%)</Text></Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="0">
            <Button bg="emerald.100" _pressed={{ backgroundColor: 'emerald.250', opacity: 1 }} pl="1" pr="1" minW="20%"  size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>SUB</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getSubTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getSubPercent}%)</Text></Button>
          </Box>
        </HStack>

      )
    }
    else {


    return (
      <HStack minW='100%'>
        <Box minW="16%" alignSelf="center" mt="0">
          <Button bg="primary.50" _pressed={{ backgroundColor: 'primary.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getFwdTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getFwdPercent}%)</Text></Button>
        </Box>
        <Box minW="16%" alignSelf="center" mt="0">
          <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getMidTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getMidPercent}%)</Text></Button>
        </Box>
        <Box minW="16%" alignSelf="center" mt="0">
          <Button bg="warning.100" _pressed={{ backgroundColor: 'warning.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getDefTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getDefPercent}%)</Text></Button>
        </Box>
        <Box minW="16%" alignSelf="center" mt="0">
          <Button bg="fuchsia.100" _pressed={{ backgroundColor: 'fuchsia.50', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getGolTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getGolPercent}%)</Text></Button>
        </Box>
        <Box minW="16%" alignSelf="center" mt="0">
          <Button bg="emerald.100" _pressed={{ backgroundColor: 'emerald.250', opacity: 1 }} pl="1" pr="1" minW="16%"  size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getSubTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getSubPercent}%)</Text></Button>
        </Box>
      </HStack>

    )
  }

  }

  const checkStatsAvailable = (stat) => {

    if (stat === 'gol') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].gol}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goals</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>0</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goals</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>)
      }
    }
    else if (stat === 'asst') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].asst}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Assists</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>0</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Assists</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>)
      }
    }
    else if (stat === 'defTac') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].defTac}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Def. </Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Tackle</Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>0</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Def. </Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Tackle</Text></Button>)
      }
    }
    else if (stat === 'golSave') {
      try {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].golSave}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goal</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Save</Text></Button>)
      }
      catch {
        return (<Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>0</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goal</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Save</Text></Button>)
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

  //////console.log(JSON.stringify(fwdTimeArray) + ' befoer render fwdTimeArray');

        return (
          <View>
              {getPosType()}
              {getGameStats()}
          </View>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default SubstitutionTimes;

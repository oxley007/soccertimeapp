import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import GameStatsDisplay from './GameStatsDisplay'
import SeasonStats from '../SeasonStats/SeasonStats'
import SeasonPositionStats from '../SeasonStats/SeasonPositionStats'

import { updateGames } from '../../Reducers/games';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';

const GameStatsLive = (props)=>{

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getGameOptionBoardDisplay, setGameOptionBoardDisplay] = useState(false);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const _games[0].teamPlayers[playerIndex] = props._games[0].teamPlayers[playerIndex]
  const statsPlayerId = props.statsPlayerId

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


    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    const playerIndex = _games[0].teamPlayers.findIndex(x => x.id === statsPlayerId);

    try {
   //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.fwd) + ' _games[0].teamPlayers[playerIndex] firsy fws check.');
      _games[0].teamPlayers[playerIndex].postionTimes.fwd.map(fwd => {
        const totalTime = getPositionTimes(fwd)
        fwdTimeArray.push({totalTime})
      })
    }
    catch {
   //console.log('this is a hit _games[0].teamPlayers[playerIndex] firsy fws check');
      const totalTime = 0
      fwdTimeArray.push({totalTime})
    }

    try {
   //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.mid) + ' firsy mid check new.');
      _games[0].teamPlayers[playerIndex].postionTimes.mid.map(mid => {
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
   //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.def) + ' firsy def check new.');
      _games[0].teamPlayers[playerIndex].postionTimes.def.map(def => {
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
   //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.gol) + ' firsy gol check new.');
      _games[0].teamPlayers[playerIndex].postionTimes.gol.map(gol => {
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
   //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.sub) + ' firsy sub check new.');
      _games[0].teamPlayers[playerIndex].postionTimes.sub.map(sub => {
     //console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        subTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push({totalTime})
    }

    const fwdTotalTime = getTotalTime(fwdTimeArray)
    const fwdTotalPercent = getTotalPercent(fwdTotalTime)

    setFwdTime(fwdTotalTime)
    setFwdPercent(fwdTotalPercent)

    const midTotalTime = getTotalTime(midTimeArray)
    const midTotalPercent = getTotalPercent(midTotalTime)

    setMidTime(midTotalTime)
    setMidPercent(midTotalPercent)

    const defTotalTime = getTotalTime(defTimeArray)
    const defTotalPercent = getTotalPercent(defTotalTime)

    setDefTime(defTotalTime)
    setDefPercent(defTotalPercent)

    const golTotalTime = getTotalTime(golTimeArray)
    const golTotalPercent = getTotalPercent(golTotalTime)

    setGolTime(golTotalTime)
    setGolPercent(golTotalPercent)

    const subTotalTime = getTotalTime(subTimeArray)
    const subTotalPercent = getTotalPercent(subTotalTime)

    setSubTime(subTotalTime)
    setSubPercent(subTotalPercent)


  },[getGameOptionBoardDisplay, getStatsBoardDisplay])

  const getTotalTime = (posTimeArray) => {
 //console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check.');
    const posTotalTime = posTimeArray.reduce((a,v) =>  a = a + v.totalTime , 0 )
    return posTotalTime
  }

  const getName = () => {

    try {
 //console.log(statsPlayerId + ' something wrong withthis getting pasewed. statsPlayerId');
 //console.log(JSON.stringify(games[0].teamPlayers) + ' just a quick look cause of bug games[0].teamPlayers');
    const playerIndex = games[0].teamPlayers.findIndex(x => x.id === statsPlayerId);
 //console.log(playerIndex + ' need to cehck playerIndex here trhanks');
 //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].playerName) + ' just a quick look cause of bug games[0].teamPlayers[playerIndex].playerName');
    const playerName = games[0].teamPlayers[playerIndex].playerName

    return playerName
  }
  catch {
    return ''
  }
  }

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
    //endTime = sixtySecondsMark
    endTime = secondsElapsed
  }


  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalPercent = (posTotalTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      posPercent = ((posTotalTime / secondsElapsed) * 100).toFixed(0)
    }
    catch {
      posPercent = 0
    }

    if (isNaN(posPercent)) {
      posPercent = 0
    }

    return posPercent

  }

  const setOpenStatus = (isOpen, id) => {

    setIsOpen(isOpen)

  }

  const closeStatsBox = () => {
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateGameOptionBoard(false, 0))
  }

        return (
          <Box mb="5">
          <HStack>

          <VStack minW="75%">
          <Center style={{alignItems: 'flex-start'}}>
          <Text style={{color: '#fff', fontSize: 20, marginTop: 20, textAlign: 'left'}}>
            {getName()}
          </Text>
          </Center>
          </VStack>
          <VStack minW="25%">
          <Center>
            <Button p="0" mt="5" pl="5" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => closeStatsBox()}>
              Close
            </Button>
            </Center>
          </VStack>

          </HStack>
          <HStack>
            <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
            <Box minW="32%" ml="3">
              <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Game Stats</Text>
            </Box>
            <Box mr="3" minW="47.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
          </HStack>
          <HStack>
            <Box minW="18.5%"alignSelf="center" mt="3">
              <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={styles.textTwelve}>FWD</Text><Text style={styles.textTen}>{formattedSeconds(getFwdTime)}min</Text><Text style={styles.textTwelve}>({getFwdPercent}%)</Text></Button>
            </Box>
            <Box minW="18.5%"alignSelf="center" mt="3">
              <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}><Text style={styles.textTwelve}>MID</Text><Text style={styles.textTen}>{formattedSeconds(getMidTime)}min</Text><Text style={styles.textTwelve}>({getMidPercent}%)</Text></Button>
            </Box>
            <Box minW="18.5%"alignSelf="center" mt="3">
              <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}><Text style={styles.textTwelve}>DEF</Text><Text style={styles.textTen}>{formattedSeconds(getDefTime)}min</Text><Text style={styles.textTwelve}>({getDefPercent}%)</Text></Button>
            </Box>
            <Box minW="18.5%" alignSelf="center" mt="3">
              <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}><Text style={styles.textTwelve}>GOL</Text><Text style={styles.textTen}>{formattedSeconds(getGolTime)}min</Text><Text style={styles.textTwelve}>({getGolPercent}%)</Text></Button>
            </Box>
            <Box minW="18.5%"alignSelf="center" mt="3">
              <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={styles.textTwelve}>SUB</Text><Text style={styles.textTen}>{formattedSeconds(getSubTime)}min</Text><Text style={styles.textTwelve}>({getSubPercent}%)</Text></Button>
            </Box>
          </HStack>
          <HStack>
            <GameStatsDisplay statsPlayerId={statsPlayerId}/>
          </HStack>
          <Center>
            <HStack mt="3">
            <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
            </HStack>
          </Center>
          {isOpen === true &&
            <Box>
          <HStack>
            <SeasonStats playerData={null} statsPlayerId={statsPlayerId} whereFrom={1} navigation={props.navigation} />
          </HStack>
          <HStack>
            <SeasonPositionStats playerData={null} statsPlayerId={statsPlayerId} whereFrom={1} navigation={props.navigation} />
          </HStack>
          </Box>
          }
          {isOpen === false &&
            <Box mb="5"></Box>
          }

          </Box>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textTwelve: {
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
  textTen: {
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
})

export default GameStatsLive;

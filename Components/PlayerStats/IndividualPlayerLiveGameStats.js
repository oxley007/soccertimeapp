import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';


const IndividualPlayerLiveGameStats = (props)=>{

  const [getGame, setGame] = useState([]);
  const [gethomeTeamShortName, sethomeTeamShortName] = useState('');
  const [getscoreHomeTeam, setscoreHomeTeam] = useState(0);
  const [getscoreAwayTeam, setscoreAwayTeam] = useState([]);
  const [getawayTeamShortName, setawayTeamShortName] = useState('');
  const [getGameId, setGameId] = useState(0);
  const [getteamIdCode, setteamIdCode] = useState(0);
  const [getGameDate, setGameDate] = useState('');

  //let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)



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



  if (endTime === 99999999) {
  //console.log(sixtySecondsMark + ' check sixtySecondsMark');
    //endTime = sixtySecondsMark
    endTime = props.gameFullTime
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

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      posPercent = ((posTotalTime / props.gameFullTime) * 100).toFixed(0)
    }
    catch {
      posPercent = 0
    }

    if (isNaN(posPercent)) {
      posPercent = 0
    }

    return posPercent

  }

  const statsPerGame = () => {

  //console.log(JSON.stringify(props.playerData) + ' cehcking prop.playerdata.');

    const playerDataStats = props.playerData.gameStats
    const playerPositionStatsRaw = props.playerData.postionTimes

    const playerPositionStats = [playerPositionStatsRaw]
    let playerStatsDisplay = []

  try {
    playerStatsDisplay = playerDataStats.map(game => {
    //console.log(JSON.stringify(game) + ' game check');
      const golStat = game.gol
      const asstStat = game.asst
      const defTacStat = game.defTac
      const golSaveStat = game.golSave

      return (
        <View>
          <HStack>

          <Box minW="25%" alignSelf="center" mt="3">
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
              <Text style={styles.textEighteen}>{golStat}</Text>
              <Text style={styles.textTwelve}>Goals</Text>
              <Text style={styles.textTwelve}></Text>
            </Button>
          </Box>
          <Box minW="25%"alignSelf="center" mt="3">
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
              <Text style={styles.textEighteen}>{asstStat}</Text>
              <Text style={styles.textTwelve}>Assists</Text>
              <Text style={styles.textTwelve}></Text>
            </Button>
          </Box>
          <Box minW="25%"alignSelf="center" mt="3">
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
              <Text style={styles.textEighteen}>{defTacStat}</Text>
              <Text style={styles.textTwelve}>Def. </Text>
              <Text style={styles.textTwelve}>Tackle</Text>
              </Button>
          </Box>
          <Box minW="25%" alignSelf="center" mt="3">
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textEighteen}>{golSaveStat}</Text>
              <Text style={styles.textTwelve}>Goal</Text>
              <Text style={styles.textTwelve}>Save</Text>
            </Button>
          </Box>
          </HStack>
          </View>

      )

    })

  }
  catch {
    //nothing.
  }

    let gameIndex = 0
  //console.log('just marking here');
  //console.log(JSON.stringify(playerPositionStats) + ' playerPositionStats here');
    playerPositionStatsDisplay = playerPositionStats.map(stat => {



    //console.log(JSON.stringify(stat) + ' just cehcking stat...')
    //console.log(JSON.stringify(stat.fwd) + ' just cehcking stat.postionTimes.fwd..')


      let fwdTimeArray = []
      let midTimeArray = []
      let defTimeArray = []
      let golTimeArray = []
      let subTimeArray = []

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.fwd) + ' _games[0].teamPlayers[playerIndex] firsy fws check.');
        stat.fwd.map(fwd => {
          const totalTime = getPositionTimes(fwd, props.gameFullTime)
          fwdTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        fwdTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.mid) + ' firsy mid check new.');
        stat.mid.map(mid => {
        //console.log(mid + ' mid check.');
          const totalTime = getPositionTimes(mid, props.gameFullTime)
          midTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        midTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.def) + ' firsy def check new.');
        stat.def.map(def => {
        //console.log(def + ' mid check.');
          const totalTime = getPositionTimes(def, props.gameFullTime)
          defTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        defTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.gol) + ' firsy gol check new.');
        stat.gol.map(gol => {
        //console.log(gol + ' gol check.');
          const totalTime = getPositionTimes(gol, props.gameFullTime)
          golTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        golTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.sub) + ' firsy sub check new.');
        stat.sub.map(sub => {
        //console.log(sub + ' sub check.');
          const totalTime = getPositionTimes(sub, props.gameFullTime)
          subTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        subTimeArray.push({totalTime})
      }

   //console.log(props.gameFullTime + ' props.gameFullTime is?');

      const fwdTotalTime = getTotalTime(fwdTimeArray)
      const fwdTotalPercent = getTotalPercent(fwdTotalTime, props.gameFullTime)

      const midTotalTime = getTotalTime(midTimeArray)
      const midTotalPercent = getTotalPercent(midTotalTime, props.gameFullTime)

      const defTotalTime = getTotalTime(defTimeArray)
      const defTotalPercent = getTotalPercent(defTotalTime, props.gameFullTime)

      const golTotalTime = getTotalTime(golTimeArray)
      const golTotalPercent = getTotalPercent(golTotalTime, props.gameFullTime)

      const subTotalTime = getTotalTime(subTimeArray)
      const subTotalPercent = getTotalPercent(subTotalTime, props.gameFullTime)

      return (
        <View>
        <HStack>
          <Box minW="20%"alignSelf="center" mt="3">
            <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
              <Text style={styles.textTwelveBlue}>FWD</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(fwdTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({fwdTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box minW="20%"alignSelf="center" mt="3">
            <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>MID</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(midTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({midTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box minW="20%"alignSelf="center" mt="3">
            <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>DEF</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(defTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({defTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box minW="20%" alignSelf="center" mt="3">
            <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>GOL</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(golTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({golTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box minW="20%"alignSelf="center" mt="3">
            <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
              <Text style={styles.textTwelveBlue}>SUB</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(subTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({subTotalPercent}%)</Text>
            </Button>
          </Box>
        </HStack>
          </View>

      )

    })

    /*
    const homeTeamShortName = games[gameIndex].teamNames.homeTeamShortName
    const scoreHomeTeam = games[gameIndex].score.homeTeam
    const awayTeamShortName = games[gameIndex].teamNames.awayTeamShortName
    const scoreAwayTeam = games[gameIndex].score.awayTeam
    const gameDate = games[gameIndex].gameDate
    const gameId = games[gameIndex].id
    */


    const display =
      <View>
      <Box shadow="7">
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientGameStats}>
        {props.whereFrom !== 191 &&
        <Heading style={{paddingTop: 20, paddingBottom: 10, color: '#fff'}}>Live Player Stats:</Heading>
      }
        {props.whereFrom === 191 &&
          <Heading style={{paddingTop: 20, paddingBottom: 10, color: '#fff'}}>{props.playerData.playerName} Live Stats:</Heading>
        }
        <VStack>
        {playerStatsDisplay}
        </VStack>
        <VStack>
        {playerPositionStatsDisplay}
        </VStack>
        </LinearGradient>
        </Box>
      </View>

      return display


  }



  //const teamType = props.route.params.teamType

//console.log(getGame + ' what is getGame');

//console.log(props.playerData + ' need to check this what deos it shiw?');

        return (

          <View>

              {statsPerGame()}

      </View>


        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradientGameStats: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: '100%',
    marginBottom: 10
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
  textFourteen: {
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
})

export default IndividualPlayerLiveGameStats;

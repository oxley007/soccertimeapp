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


const IndividualPlayerEachGameStats = (props)=>{

  const [getGame, setGame] = useState([]);
  const [gethomeTeamShortName, sethomeTeamShortName] = useState('');
  const [getscoreHomeTeam, setscoreHomeTeam] = useState(0);
  const [getscoreAwayTeam, setscoreAwayTeam] = useState([]);
  const [getawayTeamShortName, setawayTeamShortName] = useState('');
  const [getGameId, setGameId] = useState(0);
  const [getteamIdCode, setteamIdCode] = useState(0);
  const [getGameDate, setGameDate] = useState('');
  const [pro_forever_indivState, setPro_forever_indivState] = useState(false);
  const [pro_yearly_indivState, setPro_yearly_indivState] = useState(false);
  const [pro_yearly_teamState, setPro_yearly_teamState] = useState(false);
  const [pro_forever_teamState, setPro_forever_teamState] = useState(false);
  const [pro_yearly_playerState, setPro_yearly_playerState] = useState(false);
  const [pro_forever_playerState, setPro_forever_playerState] = useState(false);

  let games = useSelector(state => state.games.games);
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


  const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)

    const { navigate } = props.navigation;

    /*
    useEffect(() => {

      //console.log(pro_forever_indiv[0].purchased + ' hit?');
        setPro_forever_indivState(pro_forever_indiv[0].purchased)
        setPro_yearly_indivState(pro_yearly_indiv[0].purchased)
        setPro_yearly_teamState(pro_yearly_team[0].purchased)
        setPro_forever_teamState(pro_forever_team[0].purchased)
        setPro_yearly_playerState(pro_yearly_player[0].purchased)
        setPro_forever_playerState(pro_forever_player[0].purchased)

    },[pro_forever_indiv[0].purchased, pro_yearly_indiv[0].purchased, pro_yearly_team[0].purchased, pro_forever_team[0].purchased, pro_yearly_player[0].purchased, pro_forever_player[0].purchased])
    */

  const getPositionTimes = (pos, gameFullTime) => {

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
    endTime = gameFullTime
  }


  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalTime = (posTimeArray) => {
  //console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check.');
    const posTotalTime = posTimeArray.reduce((a,v) =>  a = a + v.totalTime , 0 )
    return posTotalTime
  }

  const getTotalPercent = (posTotalTime, gameFullTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      posPercent = ((posTotalTime / gameFullTime) * 100).toFixed(0)
    }
    catch {
      posPercent = 0
    }

    if (isNaN(posPercent)) {
      posPercent = 0
    }

    return posPercent

  }

  const buyPro = () => {
    navigate('Iap');
  }

  const displayPosStatsText = (posType, posStat, posTypeTwo) => {

    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {

      if (posType === 'Goals') {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
            <Text style={styles.textEighteen}>{posStat}</Text>
            <Text style={styles.textTwelve}>Goals</Text>
            <Text style={styles.textTwelve}></Text>
          </Button>
          )
        }
        else if (posType === 'Assists') {
          return (
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
              <Text style={styles.textEighteen}>{posStat}</Text>
              <Text style={styles.textTwelve}>Assists</Text>
              <Text style={styles.textTwelve}></Text>
            </Button>
        )
      }
      else if (posType === 'Def.') {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
            <Text style={styles.textEighteen}>{posStat}</Text>
            <Text style={styles.textTwelve}>Def. </Text>
            <Text style={styles.textTwelveExtra}>Tackle</Text>
          </Button>
        )
      }
      else if (posType === 'Goal') {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textEighteen}>{posStat}</Text>
            <Text style={styles.textTwelve}>Goal</Text>
            <Text style={styles.textTwelveExtra}>Save</Text>
          </Button>
        )
      }
    }
    else {
      return (
        <View>
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textTwelve}>{posType}</Text>
            <Text style={styles.textTwelveExtra}>{posTypeTwo}</Text>
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={styles.textFourteen}>Buy</Text>
            <Text style={styles.textFourteen}>Pro</Text>
            </Button>
          </Button>


        </View>
      )
    }

  }

  const statsPerGame = () => {

  //console.log(JSON.stringify(props.playerData) + ' cehcking prop.playerdata.');


    const playerDataStats = props.playerData.stats
    const playerPositionStats = props.playerData.postionTimeStats

  //console.log(JSON.stringify(playerPositionStats) + ' check playerPositionStats');

  const seasonIds = []
  let ids = []

try {
  ids = [...new Set(playerDataStats.map(i=>i.gameId))];

  //console.log(props.seasonId + ' what do they show for props.season?');



  ids.map(id => {

      games.map(game => {
      if (id === game.id && game.season.id === props.seasonId) {
        seasonIds.push(id)
      }
    })
  })
}
catch {
  console.log('hit this catch top here now.');
}

console.log(JSON.stringify(seasonIds) + ' now what is seasonIds?');


  let playerStatsDisplay = ''
  let playerPositionStatsDisplay = ''
  let gameDisplay = ''

  gameDisplay = seasonIds.map(id => {




  try {
    playerStatsDisplay = playerDataStats.map(game => {

      if (game.gameId === id) {

    //console.log(JSON.stringify(game) + ' just cehcking game..')
    //console.log(JSON.stringify(game.stats) + ' just cehcking game.stats..')
    //console.log(JSON.stringify(game.stats[0].gol) + ' just cehcking game.stats[0].gol..')

      const golStat = game.stats[0].gol
      const asstStat = game.stats[0].asst
      const defTacStat = game.stats[0].defTac
      const golSaveStat = game.stats[0].golSave

      return (
        <View>
          <HStack>

          <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center" mt="3">
            {displayPosStatsText('Goals', golStat, '')}
          </Box>
          <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center" mt="3">
            {displayPosStatsText('Assists', asstStat, '')}
          </Box>
          <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center" mt="3">
            {displayPosStatsText('Def.', defTacStat, 'Tackle')}
          </Box>
          <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center" mt="3">
            {displayPosStatsText('Goal', golSaveStat, 'Save')}
          </Box>
          </HStack>
          </View>

      )
    }

    })

  }
  catch {
    //nothing.
  }

    let gameIndex = 0
  //console.log('just marking here');
    playerPositionStatsDisplay = playerPositionStats.map(stat => {



    //console.log(JSON.stringify(stat) + ' just cehcking stat...')
    //console.log(JSON.stringify(stat.posTimes) + ' just cehcking stat.postionTimes..')
    //console.log(JSON.stringify(stat.posTimes.fwd) + ' just cehcking stat.postionTimes.fwd..')

      const gameId = stat.gameId


      if (gameId === id) {

      gameIndex = games.findIndex(x => x.id === gameId);
      const gameHalfTime = games[gameIndex].gameHalfTime
      const gameFullTime = gameHalfTime * 2

      let fwdTimeArray = []
      let midTimeArray = []
      let defTimeArray = []
      let golTimeArray = []
      let subTimeArray = []

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.fwd) + ' _games[0].teamPlayers[playerIndex] firsy fws check.');
        stat.posTimes.fwd.map(fwd => {
          const totalTime = getPositionTimes(fwd, gameFullTime)
          fwdTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        fwdTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.mid) + ' firsy mid check new.');
        stat.posTimes.mid.map(mid => {
        //console.log(mid + ' mid check.');
          const totalTime = getPositionTimes(mid, gameFullTime)
          midTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        midTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.def) + ' firsy def check new.');
        stat.posTimes.def.map(def => {
        //console.log(def + ' mid check.');
          const totalTime = getPositionTimes(def, gameFullTime)
          defTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        defTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.gol) + ' firsy gol check new.');
        stat.posTimes.gol.map(gol => {
        //console.log(gol + ' gol check.');
          const totalTime = getPositionTimes(gol, gameFullTime)
          golTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        golTimeArray.push({totalTime})
      }

      try {
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].postionTimes.sub) + ' firsy sub check new.');
        stat.posTimes.sub.map(sub => {
        //console.log(sub + ' sub check.');
          const totalTime = getPositionTimes(sub, gameFullTime)
          subTimeArray.push({totalTime})
        })
      }
      catch {
        const totalTime = 0
        subTimeArray.push({totalTime})
      }

      const fwdTotalTime = getTotalTime(fwdTimeArray)
      const fwdTotalPercent = getTotalPercent(fwdTotalTime, gameFullTime)

      const midTotalTime = getTotalTime(midTimeArray)
      const midTotalPercent = getTotalPercent(midTotalTime, gameFullTime)

      const defTotalTime = getTotalTime(defTimeArray)
      const defTotalPercent = getTotalPercent(defTotalTime, gameFullTime)

      const golTotalTime = getTotalTime(golTimeArray)
      const golTotalPercent = getTotalPercent(golTotalTime, gameFullTime)

      const subTotalTime = getTotalTime(subTimeArray)
      const subTotalPercent = getTotalPercent(subTotalTime, gameFullTime)

      return (
        <View>
          {displayPosTimesText(fwdTotalTime, fwdTotalPercent, midTotalTime, midTotalPercent, defTotalTime, defTotalPercent, golTotalTime, golTotalPercent, subTotalTime, subTotalPercent)}
          </View>

      )
    }

    })

    const homeTeamShortName = games[gameIndex].teamNames.homeTeamShortName
    const scoreHomeTeam = games[gameIndex].score.homeTeam
    const awayTeamShortName = games[gameIndex].teamNames.awayTeamShortName
    const scoreAwayTeam = games[gameIndex].score.awayTeam
    const gameDate = games[gameIndex].gameDate
    const gameId = games[gameIndex].id


    const display =
      <View>
      <Box shadow="7">
      <VStack>
      <Box minW="100%" bg="#fff" style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}} pt="3" pb="1" pl="5" pr="5" mt="2">
      <Center>
      <Text style={{fontSize: 20, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 30}}>
        {homeTeamShortName}
        <Center>
        <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
          <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
           {scoreHomeTeam}
          </Text>
        </Box>
        </Center>
         vs
         <Center>
         <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
           <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
            {scoreAwayTeam}
           </Text>
         </Box>
         </Center> {awayTeamShortName}
      </Text>
      <Box mt="0" pt="0" pb="1" minW="100%">
        <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
      </Box>
      <Text style={{fontSize: 12, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
        {gameDate} | Game ID: {gameId}
      </Text>
      </Center>
      </Box>
      </VStack>

      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#333', '#333']} style={styles.linearGradientGameStats}>
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

    })


  return gameDisplay

  }

  const displayPosTimesText = (fwdTotalTime, fwdTotalPercent, midTotalTime, midTotalPercent, defTotalTime, defTotalPercent, golTotalTime, golTotalPercent, subTotalTime, subTotalPercent) => {

    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
      return (
        <HStack>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
              <Text style={styles.textTwelveBlue}>FWD</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(fwdTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({fwdTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>MID</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(midTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({midTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>DEF</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(defTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({defTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>GOL</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(golTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({golTotalPercent}%)</Text>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
              <Text style={styles.textTwelveBlue}>SUB</Text>
              <Text style={styles.textTenBlue}>{formattedSeconds(subTotalTime)}min</Text>
              <Text style={styles.textTwelveBlue}>({subTotalPercent}%)</Text>
            </Button>
          </Box>
        </HStack>
      )
    }
    else {
      return (
        <HStack>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}>
              <Text style={styles.textTwelveBlue}>FWD</Text>
              <Text style={styles.textTwelveBlue}>--%</Text>
              <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
              <Text style={styles.textFourteen}>Buy</Text>
              <Text style={styles.textFourteen}>Pro</Text>
              </Button>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>MID</Text>
              <Text style={styles.textTwelveBlue}>--%</Text>
              <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
              <Text style={styles.textFourteen}>Buy</Text>
              <Text style={styles.textFourteen}>Pro</Text>
              </Button>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>DEF</Text>
              <Text style={styles.textTwelveBlue}>--%</Text>
              <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
              <Text style={styles.textFourteen}>Buy</Text>
              <Text style={styles.textFourteen}>Pro</Text>
              </Button>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textTwelveBlue}>GOL</Text>
              <Text style={styles.textTwelveBlue}>--%</Text>
              <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
              <Text style={styles.textFourteen}>Buy</Text>
              <Text style={styles.textFourteen}>Pro</Text>
              </Button>
            </Button>
          </Box>
          <Box style={{minWidth: '20%', maxWidth: '20%'}} alignSelf="center" mt="3">
            <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="18.5%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
              <Text style={styles.textTwelveBlue}>SUB</Text>
              <Text style={styles.textTwelveBlue}>--%</Text>
              <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
              <Text style={styles.textFourteen}>Buy</Text>
              <Text style={styles.textFourteen}>Pro</Text>
              </Button>
            </Button>
          </Box>
        </HStack>
      )
    }


  }



  //const teamType = props.route.params.teamType

//console.log(getGame + ' what is getGame');

//console.log(props.playerData + ' need to check this what deos it shiw?');

        return (

          <View>
          <Heading style={{paddingTop: 20, paddingBottom: 10, color: '#fff'}}>Player Stats For Each Game:</Heading>

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
  textTwelveExtra: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 16.3,
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

export default IndividualPlayerEachGameStats;

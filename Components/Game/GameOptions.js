import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateCheckSort } from '../../Reducers/checkSort';

import PositionTimes from '../../Util/PositionTimes.js';

const GameOptions = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getStatsPlayerId, setStatsPlayerId] = useState(99999999);
  const [isOpen, setIsOpen] = React.useState(false);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)
  let gameOptionBoard = useSelector(state => state.gameOptionBoard.gameOptionBoard)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let laps = useSelector(state => state.stopwatch.laps)
  let lastClearedIncrementer = useSelector(state => state.stopwatch.lastClearedIncrementer)
  let incrementer = useSelector(state => state.stopwatch.incrementer)
  let avgBall = useSelector(state => state.stopwatch.avgBall)
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let stopTimer = useSelector(state => state.stopwatch.stopTimer)
  let pauseTimer = useSelector(state => state.stopwatch.pauseTimer)


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;
  const whereFrom = props.whereFrom
  const optionFrom = props.optionFrom

  useEffect(() => {

    //////console.log(statsBoard + ' hit and check statsBoard');
    setStatsBoardDisplay(statsBoard)
    setStatsPlayerId(statsBoardPlayerId)

  },[statsBoard, statsBoardPlayerId])


  const halftimeButton = () => {

    let naCount = 0

    if (games[0].halfTime === 0) {
   //console.log(' working out savning time 2');
   //console.log('auto start half-time.');
      games[0].halfTime = 2
      games[0].gameEvents.push({eventType: 'ht', eventText: 'Half-Time', eventTime: secondsElapsed})

      games[0].teamPlayers.map(player => {

     //console.log(JSON.stringify(player) + ' check player before functions.');
        const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed);
        const positionTimesSaveFirst = positionTimesSave[0];

     //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst');
        player = positionTimesSaveFirst


        const positionTimesGet = PositionTimes.getPositionTime(player, secondsElapsed, games[0].gameHalfTime, games[0].halfTime);
        const positionTimesGetSecond = positionTimesGet[0];
        naCount = positionTimesGet[1];

        player = positionTimesGetSecond

      })

      const gameHalfTimeTemp = games[0].gameHalfTime

      dispatch(updateStopwatch(
        gameHalfTimeTemp,
        laps,
        lastClearedIncrementer,
        incrementer,
        avgBall,
        gameHalfTimeTemp,
        stopTimer,
        pauseTimer
      ))

      dispatch(updateGames(games))

      const teamIdCodeGames = games[0].teamIdCode
      const gameIdDb = games[0].gameIdDb

      firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
         game: games[0],
       })
     }

  }

  const wariningButton = () => {

    Alert.alert(
    'Are you sure you want to exit the game?',
    'If you want to exit the game please select your save option.',
    [
      {text: 'Save Game Data', onPress: () => {

        let _games = []
        try {
          _games = [...games]
        }
        catch {
          _games = [{...games}]
        }

        if (games[0].halfTime === 0) {
          _games.shift();

          dispatch(updateGames(_games))

          navigate('Home',{
            updateHome: gameId
          });

        }
        else {
          fulltimeButton()
        }


      }},
      {text: "Don't Save Game Data", onPress: () => {


      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      if (games[0].halfTime < 4) {
        _games.shift();

        dispatch(updateGames(_games))
      }

      const gameId = games[0].gameId

      navigate('Home',{
        updateHome: gameId
      });

      }},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );

  }

  const fulltimeButton = () => {

    /*
    games[0].halfTime = 4
    games[0].gameEvents.push({eventType: 'ft', eventText: 'fulltime', eventTime: secondsElapsed})

    games[0].teamPlayers.map(player => {

    //console.log(JSON.stringify(player) + ' check player before functions Home.');
      const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed);
      const positionTimesSaveFirst = positionTimesSave[0];

    //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst Home');
      player = positionTimesSaveFirst
    //console.log(JSON.stringify(player) + ' now check player after update. Home');

    })

    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: games[0],
     })

     */

     const teamIdCode = games[0].teamIdCode
     const teamPlayers = games[0].teamPlayers

  //console.log('check gameOption fulltimeButton 1');

     teamPlayers.map(player => {
    //console.log('check gameOption fulltimeButton 2');
       if (player.teamId === games[0].teamId) {
         const playerIndex = games[0].teamPlayers.findIndex(x => x.id === player.id);
         const currentPos = games[0].teamPlayers[playerIndex].currentPosition

         if (currentPos !== 'abs') {
        //console.log('check gameOption fulltimeButton 3');
         //console.log(JSON.stringify(player.stats) + ' check player sats here.');
         //console.log(JSON.stringify(player) + ' check player here.');

         //console.log(JSON.stringify(games[0].teamPlayers) + ' wtf 2 game stats for player here.');
         //console.log(JSON.stringify(games[0].teamPlayers[playerIndex]) + ' wtf game stats for player here.');
         //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].gameStats) + ' game stats for player here.');
         //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].gameStats[0]) + ' game stats[0] for player here.');

           let currentSeason = ''
           if (games[0].season.id === undefined || games[0].season.id === 99999998 || games[0].season.id < 1) {
          //console.log('check gameOption fulltimeButton 4');
             currentSeason = seasonsDisplayId
             games[0].season.id = seasonsDisplayId
             games[0].season.season = seasonsDisplay
           }
           else {
          //console.log('check gameOption fulltimeButton 5');
             currentSeason = games[0].season.id
           }

           const playerStats = games[0].teamPlayers[playerIndex].gameStats
           //player.stats = [player.stats]
           if (playerStats.length > 0 ) {
          //console.log('check gameOption fulltimeButton 6');
           try {
             player.stats.push({gameId: games[0].id, season: currentSeason, stats: playerStats})
           }
           catch {
             player.stats = []
             player.stats.push({gameId: games[0].id, season: currentSeason, stats: playerStats})
           }
           }

           const postionTimes = games[0].teamPlayers[playerIndex].postionTimes
        //console.log('check gameOption fulltimeButton 7');
           //player.postionTimeStats = [player.postionTimeStats]
           if (postionTimes.def.length > 0 || postionTimes.fwd.length > 0 || postionTimes.gol.length > 0 || postionTimes.mid.length > 0 || postionTimes.sub.length > 0) {
          //console.log('check gameOption fulltimeButton 8');
             try {
           if (player.postionTimeStats.length > 0 || player.postionTimeStats !== undefined || player.postionTimeStats !== '') {
             try {
             player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
             }
             catch {
               player.postionTimeStats = []
               player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
             }
           }
           else {
          //console.log('check gameOption fulltimeButton 9');
             player.postionTimeStats = []
             player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
           }
          }
           catch {
             player.postionTimeStats = []
             player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
           }
           }

           const postionTimeStatsRaw = player.postionTimeStats
           const statsRaw = player.stats
           const playerId = player.playerId

        //console.log('check gameOption fulltimeButton 10');
           let timeIndex = 0
           let timeCount = 0
           postionTimeStatsRaw.map(time => {
             if (time.gameId === games[0].id) {
               if (timeCount > 0) {
                  postionTimeStatsRaw.splice(timeIndex, 1); // 2nd parameter means remove one item only
               }
               timeCount++
             }
             else {
               timeCount = 0
             }
             timeIndex++
           })

           //need to get teamId and player Id.

        //console.log(teamIdCode + ' waht is teamIdCode?');
        //console.log(playerId + ' waht is playerId?');
        //console.log(JSON.stringify(postionTimeStatsRaw) + ' postionTimeStatsRaw plz');
        //console.log(JSON.stringify(statsRaw) + ' statsRaw plz');



           firestore().collection(teamIdCode).doc(playerId).update({
              postionTimeStats: postionTimeStatsRaw,
              stats: statsRaw
            })

            userRef.doc(playerId).update({
              postionTimeStats: postionTimeStatsRaw,
              stats: statsRaw
              })
              .catch(error => this.setState({ errorMessage: error.message }))
          }
       }



     })

     dispatch(updateTeamPlayers(teamPlayers))

     games[0].halfTime = 5
     const gameHalfTimeTime = games[0].gameHalfTime
     //const fullTimeSeconds = gameHalfTimeTime * 2
     const fullTimeSeconds = gameHalfTimeTime / 60
     games[0].sixtySecondsMark = fullTimeSeconds
     dispatch(updateGames(games))

     const teammIndex = teamNames.findIndex(x => x.teamId === games[0].teamIdCode);

     let gameIds = teamNames[teammIndex].gameIds
     const teamId = games[0].teamIdCode
     const gameIdDbNew = games[0].gameIdDb
     //const teamId = games[0].teamId
     const seasonIdNew = games[0].season.id
     const homeTeamName = games[0].teamNames.homeTeamName
     const awayTeamName = games[0].teamNames.awayTeamName
     const homeTeamShortName = games[0].teamNames.homeTeamShortName
     const awayTeamShortName = games[0].teamNames.awayTeamShortName
     const homeTeamScore = games[0].score.homeTeam
     const awayTeamScore = games[0].score.awayTeam
     const gameDate = games[0].gameDate

     const awayTeamId = games[0].teamNames.awayTeamId
     const gameId = games[0].id

     //const gameIdData = {gameIdDb: gameIdDbNew, status: 5}
     const gameIdData = {gameIdDb: gameIdDbNew, status: 5, teamId: teamId, gameId: gameId, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: homeTeamScore, awayTeamScore: awayTeamScore, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}}

     //gameIds.push(gameIdData)
     gameIds[gameIds.length-1] = gameIdData;

  //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');

     teamNames[teammIndex].gameIds = gameIds

     //const gameIdsFb = [gameIds]

  //console.log(JSON.stringify(teamNames[teammIndex].gameIds) + ' etf teamNames.gameIds hah?');

     dispatch(updateTeamNames(teamNames))

  //console.log(teamId + ' teamId check here thnks.');
  //console.log(teamId + ' teamId check here thnks.');
  //console.log(JSON.stringify(gameIds[0]) + ' gameIds[0] check here thnks.');
  //console.log(JSON.stringify(gameIds) + ' gameIds check here thnks.');


     firestore().collection(teamId).doc(teamId).update({
       gameIds: gameIds
     })
     .catch(error => console.log(error.message))

      /*
      firestore()
        .collection(teamId)
        .doc(teamId)
        .update({
          gameIds: gameIds,
        })
        .then(() => {
       //console.log('Team updated!');
        });
        */

     const teamIdCodeGames = games[0].teamIdCode
     const gameIdDb = games[0].gameIdDb

  //console.log(JSON.stringify(games[0]) + ' games[0] check here thnks.');
  //console.log(teamIdCodeGames + ' teamIdCodeGames check here thnks.');
  //console.log(gameIdDb + ' gameIdDb check here thnks.');

     firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
        game: games[0],
      })
      .catch(error => console.log(error.message))

   //console.log(gameIdDb + ' gameIdDb?');

      userRef.doc(gameIdDb).update({
          game: games[0],
        })
        .catch(error => console.log(error.message))

        dispatch(updateStopwatch(
          0,
          [],
          null,
          null,
          [],
          0,
          false,
          false,
        ))

    navigate('GameEnds');

  }

  const addOppGoal = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    let awayTeamScore = _games[0].score.awayTeam
    awayTeamScore = awayTeamScore + 1
    _games[0].score.awayTeam = awayTeamScore
    const homeTeamScore = _games[0].score.homeTeam
    const homeTeamName = _games[0].teamNames.homeTeamName
    const awayTeamName = _games[0].teamNames.awayTeamName
    const eventScoreText = homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
    //try {
      //////console.log('oppGoal add event hit here 1');
      _games[0].gameEvents.push({eventType: 'goal', eventText: 'Opposition Goal', eventTime: secondsElapsed})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
    /*
    }
    catch {
      //////console.log('oppGoal add event hit here 2');
      _games[0].gameEvents = []
      _games[0].gameEvents.push({eventType: 'goal', eventText: 'Opposition Goal', eventTime: secondsElapsed})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
    }
    */

    const eventBoardText = 'Opposition Goal Added'

    dispatch(updateGames(_games))
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateGameOptionBoard(false, 99999999))
    dispatch(updateEventDisplayBoard(true, statsBoardPlayerId, eventBoardText))

    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: _games[0],
     })

  }

  const addGoal = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    let eventBoardText = 'Opposition Goal Added'

    let homeTeamScore = _games[0].score.homeTeam
    homeTeamScore = homeTeamScore + 1
    _games[0].score.homeTeam = homeTeamScore
    const awayTeamScore = _games[0].score.awayTeam
    const homeTeamName = _games[0].teamNames.homeTeamName
    const awayTeamName = _games[0].teamNames.awayTeamName
    const eventScoreText = homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
    //try {
      //////console.log('oppGoal add event hit here 1');
      _games[0].gameEvents.push({eventType: 'goal', eventText: 'Own Goal by Opposition Player', eventTime: secondsElapsed})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
    /*
    }
    catch {
      //////console.log('oppGoal add event hit here 2');
      _games[0].gameEvents = []
      _games[0].gameEvents.push({eventType: 'goal', eventText: 'Own Goal by Opposition Player', eventTime: secondsElapsed})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
    }
    */

    eventBoardText = 'Opposition Own-Goal Added'

    dispatch(updateGames(_games))
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateGameOptionBoard(false, 99999999))
    dispatch(updateEventDisplayBoard(true, statsBoardPlayerId, eventBoardText))

    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: _games[0],
     })

  }

  const setOpenStatus = (isOpen, id) => {

    setIsOpen(isOpen)

  }

  const removeOppGoal = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    let awayTeamScore = _games[0].score.awayTeam
    if (awayTeamScore > 0) {
      awayTeamScore = awayTeamScore - 1
    }
    _games[0].score.awayTeam = awayTeamScore
    const homeTeamScore = _games[0].score.homeTeam
    const homeTeamName = _games[0].teamNames.homeTeamName
    const awayTeamName = _games[0].teamNames.awayTeamName
    //const eventScoreText = 'Goal removed: ' + homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
    const eventScoreText = homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
    //try {
      //////console.log('oppGoal add event hit here 1');

      _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: 'Goal removed', eventTime: secondsElapsed})
      //_games[0].gameEvents.push({eventType: 'score', eventText: 'Goal removed', eventTime: secondsElapsed})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
      //_games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
    /*
    }
    catch {
      //////console.log('oppGoal add event hit here 2');
      _games[0].gameEvents = []
      _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
    }
    */

    const eventBoardText = 'Opposition Goal Removed'

    dispatch(updateGames(_games))
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateGameOptionBoard(false, 99999999))
    dispatch(updateEventDisplayBoard(true, statsBoardPlayerId, eventBoardText))

    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: _games[0],
     })

  }

        return (
          <Box>
          <HStack>
          {whereFrom === 1 && isOpen === false &&
                  <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                    {isOpen ? <VStack><Text>Hide</Text><Text>Game Options</Text></VStack> : '+Show Game Options'}
                  </Button>
                }
                {whereFrom === 1 && isOpen === true &&
                  <HStack>
                  <Box minW="28%"alignSelf="center" mt="3" shadow="5">
                    <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addOppGoal()}>
                      <HStack>
                        <Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text>
                          <VStack>
                            <Text style={styles.buttonText}>Add</Text>
                            <Text style={styles.buttonText}>Opposition Goal</Text>
                          </VStack>
                        </HStack>
                      </Button>
                  </Box>
                  <Box minW="28%"alignSelf="center" mt="3" shadow="5">
                    <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "sm"}} onPress={() => removeOppGoal()}>
                      <HStack>
                      <Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>- </Text>
                        <VStack>
                          <Text style={styles.buttonText}>Remove</Text>
                          <Text style={styles.buttonText}>Opposition Goal</Text>
                        </VStack>
                      </HStack>
                    </Button>
                  </Box>
                  <Button variant="unstyled" _text={{color: '#fff'}} onPress={() => setOpenStatus(false)}>
                    {isOpen ? <Center><VStack><Text style={styles.textSize}>Hide Game</Text><Text style={styles.textSize}>Options</Text></VStack></Center> : 'Show Game Options'}
                  </Button>
                  </HStack>
                }
                </HStack>
                {whereFrom !== 1 &&
                <HStack>
                {optionFrom !== 'exitGame' &&
                <Box>
                <HStack>
                <VStack>
                <Box minW="28%"alignSelf="center" mt="3" shadow="5">
                  <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addOppGoal()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text><VStack><Text style={styles.buttonText}>Add</Text><Text style={styles.buttonText}>Opposition Goal</Text></VStack></HStack></Button>
                </Box>
                </VStack>
                <VStack>
                <Box minW="28%"alignSelf="center" pl="5" mt="3" shadow="5">
                  <Button minW="28%" bg="#666" p="1" size="md" _text={{fontSize: "sm"}} onPress={() => removeOppGoal()}>
                    <HStack>
                    <Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>- </Text>
                      <VStack>
                        <Text style={styles.buttonText}>Remove</Text>
                        <Text style={styles.buttonText}>Opposition Goal</Text>
                      </VStack>
                    </HStack>
                  </Button>
                </Box>
                </VStack>
                </HStack>
                </Box>
                }
                </HStack>
              }


                {optionFrom === 'exitGame' &&
                <HStack>

                  <Box minW="28%" alignSelf="center" mt="3" ml="3" shadow="5">
                  {games[0].halfTime === 0 &&
                    <Button minW="28%" bg="#a855f7" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => halftimeButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={styles.buttonText}>Finish</Text><Text style={styles.buttonText}>First Half..</Text></VStack></HStack></Button>
                  }
                  {games[0].halfTime === 3 &&
                    <Button minW="28%" bg="#a855f7" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => wariningButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={styles.buttonText}>Finish</Text><Text style={styles.buttonText}>Second Half</Text></VStack></HStack></Button>
                  }
                  </Box>
                </HStack>
              }

              {whereFrom !== 1 &&
                <HStack>
                {optionFrom === 'exitGame' &&
                <Box minW="28%" ml="3" alignSelf="center" mt="3" shadow="5">
                  <Button minW="28%" bg="#fb7185" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => wariningButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={styles.buttonText}>Finish</Text><Text style={styles.buttonText}>Game</Text></VStack></HStack></Button>
                </Box>
              }
              </HStack>
            }

            {optionFrom === 'exitGame' &&
              <HStack>
                <Box minW="28%" alignSelf="center" mt="3" ml="3" shadow="5">
                  <Button minW="28%" bg="transparent" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => forceClose()}><HStack><Text style={{fontSize: 16, color: '#a855f7', marginTop: 5, textDecorationLine: "underline"}}></Text><VStack><Text style={styles.buttonText}>Force Close Game (no Save)</Text></VStack></HStack></Button>
                </Box>
              </HStack>
            }

        </Box>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textSize: {
    color: '#fff',
    textDecorationLine: "underline",
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
  buttonText: {
    fontSize: 12,
    color: '#fff',
    ...Platform.select({
      ios: {
        lineHeight: -5
      },
      android: {
        lineHeight: 12,
      },
      default: {
        lineHeight: -5
      }
      })
  }
})

export default GameOptions;

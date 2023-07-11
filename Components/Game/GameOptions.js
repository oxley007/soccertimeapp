import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';

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

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;
  const whereFrom = props.whereFrom

  useEffect(() => {

    ////////////console.log(statsBoard + ' hit and check statsBoard');
    setStatsBoardDisplay(statsBoard)
    setStatsPlayerId(statsBoardPlayerId)

  },[statsBoard, statsBoardPlayerId])

  const halftimeButton = () => {

    games[0].halfTime = 1
    games[0].gameEvents.push({eventType: 'ht', eventText: 'Half-Time', eventTime: secondsElapsed})

    dispatch(updateGames(games))

    navigate('SubstitutionHome', {
      whereFrom: 'HT'
    });

  }

  const fulltimeButton = () => {

    games[0].halfTime = 4

    games[0].teamPlayers.map(player => {

      ////////////console.log(JSON.stringify(player) + ' check player before functions Home.');
      const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed);
      const positionTimesSaveFirst = positionTimesSave[0];

      ////////////console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst Home');
      player = positionTimesSaveFirst
      ////////////console.log(JSON.stringify(player) + ' now check player after update. Home');

    })

    dispatch(updateGames(games))
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateGameOptionBoard(false, 99999999))

    const teamId = games[0].homeTeamId

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
      ////////////console.log('oppGoal add event hit here 1');
      _games[0].gameEvents.push({eventType: 'goal', eventText: 'Opposition Goal', eventTime: secondsElapsed})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
    /*
    }
    catch {
      ////////////console.log('oppGoal add event hit here 2');
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

  }

  const addGoal = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    let eventBoardText = ''

    let homeTeamScore = _games[0].score.homeTeam
    homeTeamScore = homeTeamScore + 1
    _games[0].score.homeTeam = homeTeamScore
    const awayTeamScore = _games[0].score.awayTeam
    const homeTeamName = _games[0].teamNames.homeTeamName
    const awayTeamName = _games[0].teamNames.awayTeamName
    const eventScoreText = homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
    //try {
      ////////////console.log('oppGoal add event hit here 1');
      _games[0].gameEvents.push({eventType: 'goal', eventText: 'Own Goal by Opposition Player', eventTime: secondsElapsed})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
    /*
    }
    catch {
      ////////////console.log('oppGoal add event hit here 2');
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

  }

  const setOpenStatus = (isOpen, id) => {

    setIsOpen(isOpen)

  }

        return (
          <Box>
          <HStack>
          {whereFrom === 1 && isOpen === false &&
                  <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: true}} onPress={() => setOpenStatus(true)}>
                    {isOpen ? <VStack><Text>Hide</Text><Text>Game Options</Text></VStack> : '+Show Game Options'}
                  </Button>
                }
                {whereFrom === 1 && isOpen === true &&
                  <HStack>
                  <Box minW="28%"alignSelf="center" mt="3" shadow="5">
                    <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addOppGoal()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Add</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Opposition Goal</Text></VStack></HStack></Button>
                  </Box>
                  <Box minW="28%" alignSelf="center" mt="3" ml="3" shadow="5">
                    <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addGoal()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Add Opposition</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Own Goal</Text></VStack></HStack></Button>
                  </Box>
                  <Button variant="unstyled" _text={{color: '#fff'}} onPress={() => setOpenStatus(false)}>
                    {isOpen ? <Center><VStack><Text style={{lineHeight: 0, color: '#fff', textDecorationLine: true}}>Hide Game</Text><Text style={{lineHeight: 0, color: '#fff', textDecorationLine: true}}>Options</Text></VStack></Center> : 'Show Game Options'}
                  </Button>
                  </HStack>
                }
                </HStack>
                {whereFrom !== 1 &&
                <HStack>
                <Box minW="28%"alignSelf="center" mt="3" shadow="5">
                  <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addOppGoal()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Add</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Opposition Goal</Text></VStack></HStack></Button>
                </Box>
                <Box minW="28%" alignSelf="center" mt="3" ml="3" shadow="5">
                  <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addGoal()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Add Opposition</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Own Goal</Text></VStack></HStack></Button>
                </Box>

                <Box minW="28%" alignSelf="center" mt="3" ml="3" shadow="5">
                {games[0].halfTime === 0 &&
                  <Button minW="28%" bg="#a855f7" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => halftimeButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Finish</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>First Half</Text></VStack></HStack></Button>
                }
                {games[0].halfTime === 3 &&
                  <Button minW="28%" bg="#a855f7" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => fulltimeButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Finish</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Second Half</Text></VStack></HStack></Button>
                }
                </Box>

                </HStack>
              }
              {whereFrom !== 1 &&
                <HStack>
                <Box minW="28%" alignSelf="center" mt="3" shadow="5">
                  <Button minW="28%" bg="#a855f7" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => fulltimeButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Finsih</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Game</Text></VStack></HStack></Button>
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
})

export default GameOptions;

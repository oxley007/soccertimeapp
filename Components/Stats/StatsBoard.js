import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import GameOptions from '../Game/GameOptions';
import GameOptionsUndo from '../Game/GameOptionsUndo';

import { updateGames } from '../../Reducers/games';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateGamePlayerBoard } from '../../Reducers/gamePlayerBoard';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';


const StatsBoard = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getStatsPlayerId, setStatsPlayerId] = useState(99999999);
  const [getPlayerData, setPlayerData] = useState(99999999);
  const [isOpen, setIsOpen] = React.useState(false);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const statsPlayerId = props.statsPlayerId
  //const { navigate } = props.navigation;

  useEffect(() => {

    //console.log(statsBoard + ' hit and check statsBoard');
    setStatsBoardDisplay(statsBoard)
    setStatsPlayerId(statsBoardPlayerId)

  },[statsBoard, statsBoardPlayerId])



  const addStat = (stat) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    let eventBoardText = ''

    //console.log(JSON.stringify(_games[0].teamPlayers) + ' stats boar dchek games.teamPlayers');
    const playerIndex = _games[0].teamPlayers.findIndex(x => x.id === statsPlayerId);
    //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex]) + ' _games[0].teamPlayers[playerIndex] stats boar dchek games.teamPlayers');

    if (stat === 'gol') {
      let gameStatsGol = _games[0].teamPlayers[playerIndex].gameStats[0].gol
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats) + ' games[0].teamPlayers[playerIndex].gameStats pop4');
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats[0].gol) + ' games[0].teamPlayers[playerIndex].gameStats.gol pop4');
      //console.log(gameStatsGol + ' first thing fitst gameStatsGol');
      //let gameStatsGolInt = Number(gameStatsGol)
      gameStatsGol = gameStatsGol + 1
      //console.log(gameStatsGol + ' prob should chej gameStatsGol 2');
      _games[0].teamPlayers[playerIndex].gameStats[0].gol = gameStatsGol
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats) + ' stats boar dchek games.teamPlayers after');
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats[0].gol) + ' stats boar dchek games.teamPlayers.gol after');

      let homeTeamScore = _games[0].score.homeTeam
      homeTeamScore = homeTeamScore + 1
      _games[0].score.homeTeam = homeTeamScore
      const awayTeamScore = _games[0].score.awayTeam
      const homeTeamName = _games[0].teamNames.homeTeamName
      const awayTeamName = _games[0].teamNames.awayTeamName
      const eventScoreText = homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
      const eventText = 'Goal by ' + _games[0].teamPlayers[playerIndex].playerName
      //try {
        ////////////console.log('oppGoal add event hit here 1');
        _games[0].gameEvents.push({eventType: 'goal', eventText: eventText, eventTime: secondsElapsed})
        _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
      /*
      }
      catch {
        ////////////console.log('oppGoal add event hit here 2');
        _games[0].gameEvents = []
        _games[0].gameEvents.push({eventType: 'goal', eventText: eventText, eventTime: secondsElapsed})
        _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
      }
      */
      eventBoardText = 'Goal Added'
    }
    else if (stat === 'asst') {
      let gameStat = _games[0].teamPlayers[playerIndex].gameStats[0].asst
      gameStat = gameStat + 1
      _games[0].teamPlayers[playerIndex].gameStats[0].asst = gameStat
      const eventText = 'Assist by ' + _games[0].teamPlayers[playerIndex].playerName
      //try {
        ////////////console.log('oppGoal add event hit here 1');
        _games[0].gameEvents.push({eventType: 'asst', eventText: eventText, eventTime: secondsElapsed})
      /*
      }
      catch {
        ////////////console.log('oppGoal add event hit here 2');
        _games[0].gameEvents = []
        _games[0].gameEvents.push({eventType: 'asst', eventText: eventText, eventTime: secondsElapsed})
      }
      */
      eventBoardText = 'Assist Added'
    }
    else if (stat === 'defTac') {
      let gameStat = _games[0].teamPlayers[playerIndex].gameStats[0].defTac
      gameStat = gameStat + 1
      _games[0].teamPlayers[playerIndex].gameStats[0].defTac = gameStat
      const eventText = 'Good deffence by ' + _games[0].teamPlayers[playerIndex].playerName
      //try {
        ////////////console.log('oppGoal add event hit here 1');
        _games[0].gameEvents.push({eventType: 'defTac', eventText: eventText, eventTime: secondsElapsed})
      /*
      }
      catch {
        ////////////console.log('oppGoal add event hit here 2');
        _games[0].gameEvents = []
        _games[0].gameEvents.push({eventType: 'defTac', eventText: eventText, eventTime: secondsElapsed})
      }
      */
      eventBoardText = 'Defensive Tackle Added'
    }
    else if (stat === 'golSave') {
      let gameStat = _games[0].teamPlayers[playerIndex].gameStats[0].golSave
      gameStat = gameStat + 1
      _games[0].teamPlayers[playerIndex].gameStats[0].golSave = gameStat
      const eventText = 'Great save by ' + _games[0].teamPlayers[playerIndex].playerName
      //try {
        ////////////console.log('oppGoal add event hit here 1');
        _games[0].gameEvents.push({eventType: 'golSave', eventText: eventText, eventTime: secondsElapsed})
      /*
      }
      catch {
        ////////////console.log('oppGoal add event hit here 2');
        _games[0].gameEvents = []
        _games[0].gameEvents.push({eventType: 'golSave', eventText: eventText, eventTime: secondsElapsed})
      }
      */
      eventBoardText = 'Goal Save Added'
    }

    dispatch(updateGames(_games))
    dispatch(updateStatsBoard(false, statsBoardPlayerId))
    dispatch(updateGamePlayerBoard(false, statsBoardPlayerId))
    dispatch(updateEventDisplayBoard(true, statsBoardPlayerId, eventBoardText))
  }

  const removeStat = (stat) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    let eventBoardText = ''

    //console.log(JSON.stringify(_games[0].teamPlayers) + ' stats boar dchek games.teamPlayers');
    const playerIndex = _games[0].teamPlayers.findIndex(x => x.id === statsPlayerId);
    //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex]) + ' _games[0].teamPlayers[playerIndex] stats boar dchek games.teamPlayers');

    if (stat === 'gol') {
      let gameStatsGol = _games[0].teamPlayers[playerIndex].gameStats[0].gol
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats) + ' games[0].teamPlayers[playerIndex].gameStats pop4');
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats[0].gol) + ' games[0].teamPlayers[playerIndex].gameStats.gol pop4');
      //console.log(gameStatsGol + ' first thing fitst gameStatsGol');
      //let gameStatsGolInt = Number(gameStatsGol)
      if (gameStatsGol > 0) {
        gameStatsGol = gameStatsGol - 1
      }
      //console.log(gameStatsGol + ' prob should chej gameStatsGol 2');
      _games[0].teamPlayers[playerIndex].gameStats[0].gol = gameStatsGol
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats) + ' stats boar dchek games.teamPlayers after');
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex].gameStats[0].gol) + ' stats boar dchek games.teamPlayers.gol after');

      let homeTeamScore = _games[0].score.homeTeam
      if (homeTeamScore > 0) {
        homeTeamScore = homeTeamScore - 1
      }
      _games[0].score.homeTeam = homeTeamScore
      const awayTeamScore = _games[0].score.awayTeam
      const homeTeamName = _games[0].teamNames.homeTeamName
      const awayTeamName = _games[0].teamNames.awayTeamName
      const eventScoreRemovedText = 'Goal removed'
      const eventScoreText = homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
      //try {
        ////////////console.log('oppGoal add event hit here 1');
        _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreRemovedText, eventTime: secondsElapsed})
        _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
      /*
      }
      catch {
        ////////////console.log('oppGoal add event hit here 2');
        _games[0].gameEvents = []
        _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
      }
      */
      eventBoardText = 'Goal Removed'
    }
    else if (stat === 'asst') {
      let gameStat = _games[0].teamPlayers[playerIndex].gameStats[0].asst
      if (gameStat > 0) {
        gameStat = gameStat - 1
      }
      _games[0].teamPlayers[playerIndex].gameStats[0].asst = gameStat
      eventBoardText = 'Assist Removed'
    }
    else if (stat === 'defTac') {
      let gameStat = _games[0].teamPlayers[playerIndex].gameStats[0].defTac
      if (gameStat > 0) {
        gameStat = gameStat - 1
      }
      _games[0].teamPlayers[playerIndex].gameStats[0].defTac = gameStat
      eventBoardText = 'Defencive Tackle Removed'
    }
    else if (stat === 'golSave') {
      let gameStat = _games[0].teamPlayers[playerIndex].gameStats[0].golSave
      if (gameStat > 0) {
        gameStat = gameStat - 1
      }
      _games[0].teamPlayers[playerIndex].gameStats[0].golSave = gameStat
      eventBoardText = 'Goal Save Removed'
    }

    dispatch(updateGames(_games))
    dispatch(updateStatsBoard(false, statsBoardPlayerId))
    dispatch(updateGamePlayerBoard(false, statsBoardPlayerId))
    dispatch(updateEventDisplayBoard(true, statsBoardPlayerId, eventBoardText))
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

  const setOpenStatus = (isOpen, id) => {

    setIsOpen(isOpen)

  }

        return (
          <Box mb="7">
              <HStack>
                <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                <Box minW="22%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 14}}>Add Stats</Text>
                </Box>
                <Box mr="3" minW="63%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
              </HStack>
              <HStack mt="2">
              <Box minW="28%"alignSelf="center" shadow="5">
                <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xl"}} onPress={() => addStat('gol')}>+Goal</Button>
              </Box>
              <Box minW="28%" alignSelf="center" ml="3" shadow="5">
                <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xl"}} onPress={() => addStat('asst')}>+Assist</Button>
              </Box>
              <Box minW="28%" alignSelf="center" ml="3" shadow="5">
                <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addStat('defTac')}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Defensive</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Tackle</Text></VStack></HStack></Button>
              </Box>
              </HStack>
              <HStack>
              <Box minW="28%" alignSelf="center" mt="3" shadow="5">
                <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => addStat('golSave')}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}>+ </Text><VStack><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Goal Saving</Text><Text style={{fontSize: 12, color: '#fff', lineHeight: -5}}>Tackle/Save</Text></VStack></HStack></Button>
              </Box>
              </HStack>
              <HStack mt={2}>
                <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                <Box minW="20%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 14}}>Undo</Text>
                </Box>
                <Box mr="3" minW="65%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
              </HStack>
              {isOpen === false &&
                <HStack>
                      <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: true}} onPress={() => setOpenStatus(true)}>
                        {isOpen ? <VStack><Text>Hide</Text><Text>Undo</Text></VStack> : '+Show Undo Options'}
                      </Button>
                      </HStack>
                    }
                    {isOpen === true &&
                      <VStack>
                      <HStack mt="2">
                        <Box minW="20%"alignSelf="center" shadow="5">
                          <Button minW="20%" bg="fuchsia.400" p="1" size="xs" _text={{fontSize: "xs"}} onPress={() => removeStat('gol')}>-Goal</Button>
                        </Box>
                        <Box minW="20%" alignSelf="center" ml="2" shadow="5">
                          <Button minW="20%" bg="fuchsia.400" p="1" size="xs" _text={{fontSize: "xs"}} onPress={() => removeStat('asst')}>-Assist</Button>
                        </Box>
                        <Box minW="20%" alignSelf="center" ml="2" shadow="5">
                          <Button minW="20%" bg="fuchsia.400" p="1" size="xs" _text={{fontSize: "xs"}} onPress={() => removeStat('defTac')}>-Def. Tackle</Button>
                        </Box>
                        <Box minW="20%" alignSelf="center" ml="2" shadow="5">
                          <Button minW="20%" bg="fuchsia.400" p="1" size="xs" _text={{fontSize: "xs"}} onPress={() => removeStat('golSave')}>-Goal Save</Button>
                        </Box>
                      </HStack>
                      <HStack>
                        <GameOptionsUndo />
                        <Button variant="unstyled" _text={{color: '#fff'}} onPress={() => setOpenStatus(false)}>
                          {isOpen ? <Center><VStack><Text style={{lineHeight: 0, color: '#fff', textDecorationLine: true}}>Hide Undo</Text><Text style={{lineHeight: 0, color: '#fff', textDecorationLine: true}}>Options</Text></VStack></Center> : 'Show Undo Options'}
                        </Button>
                      </HStack>
                      </VStack>
                    }

        </Box>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default StatsBoard;

/*
<HStack>
  <GameOptions navigation={props.navigation} whereFrom={1}/>
</HStack>
*/

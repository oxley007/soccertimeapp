import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';

import PositionTimes from '../../Util/PositionTimes.js';

const GameOptionsUndo = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const whereFrom = props.whereFrom



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
    const eventScoreText = 'Goal removed: ' + homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
    //try {
      //////console.log('oppGoal add event hit here 1');
      _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
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

  const addGoal = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    console.log(_games[0].halfTime, "what is _games[0].halfTime?");

    if (_games[0].halfTime === 0) {
      Alert.alert(
        'Unable to add a goal',
        "You must kick-off a game before you can add a goal.",
        [
          {
            text: 'Back',
            onPress: () => {
              // Do nothing or show manual sort UI
            },
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );
    }
    else {

      let eventBoardText = ''

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

  }

  const removeGoal = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    if (_games[0].halfTime === 0) {
      Alert.alert(
        'Unable to remove a goal',
        "You must kick-off a game before you can remove a goal.",
        [
          {
            text: 'Back',
            onPress: () => {
              // Do nothing or show manual sort UI
            },
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );
    }
    else {

      let homeTeamScore = _games[0].score.homeTeam
      if (homeTeamScore > 0) {
        homeTeamScore = homeTeamScore - 1
      }
      _games[0].score.homeTeam = homeTeamScore
      const awayTeamScore = _games[0].score.awayTeam
      const homeTeamName = _games[0].teamNames.homeTeamName
      const awayTeamName = _games[0].teamNames.awayTeamName
      //const eventScoreRemovedText = 'Goal removed'
      const eventScoreText = homeTeamName + ' ' + homeTeamScore +' vs ' + awayTeamScore + ' ' + awayTeamName
      //try {
        //////console.log('oppGoal add event hit here 1');
        _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: 'Goal removed', eventTime: secondsElapsed, oppGoal: true})
        //_games[0].gameEvents.push({eventType: 'score', eventText: 'Goal removed', eventTime: secondsElapsed})
        _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
      /*
      }
      catch {
        //////console.log('oppGoal add event hit here 2');
        _games[0].gameEvents = []
        _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
      }
      */

      const eventBoardText = 'Opposition Own-Goal Removed'

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

  }

        return (
          <HStack>
          <Box minW="32%" alignSelf="center" mt="3" shadow="5">
            <Button minW="32%" bg="fuchsia.400" p="2" size="md" _text={{fontSize: "xs"}} onPress={() => addGoal()}>
              <HStack>
                <Text style={{fontSize: 22, color: '#fff'}}>+ </Text>
                  <VStack>
                    <Text style={styles.buttonText}>Add Goal</Text>
                  </VStack>
                </HStack>
              </Button>
          </Box>
            <Box minW="32%" alignSelf="center" mt="3" ml="3" shadow="5">
              <Button minW="32%" bg="#666" p="2" size="md" _text={{fontSize: "sm"}} onPress={() => removeGoal()}>
                <HStack>
                  <Text style={{fontSize: 22, color: '#fff'}}>- </Text>
                  <VStack>
                    <Text style={styles.buttonText}>Remove Goal</Text>
                  </VStack>
                </HStack>
              </Button>
            </Box>
        </HStack>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    ...Platform.select({
      ios: {
        lineHeight:0
      },
      android: {
        lineHeight: 18,
      },
      default: {
        lineHeight: 0
      }
      })
  }
})

export default GameOptionsUndo;

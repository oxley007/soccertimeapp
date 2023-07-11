import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';

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
      ////////////console.log('oppGoal add event hit here 1');
      _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
    /*
    }
    catch {
      ////////////console.log('oppGoal add event hit here 2');
      _games[0].gameEvents = []
      _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
    }
    */

    const eventBoardText = 'Opposition Goal removed'

    dispatch(updateGames(_games))
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateEventDisplayBoard(true, statsBoardPlayerId, eventBoardText))

  }

  const removeGoal = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

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
      _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreRemovedText, eventTime: secondsElapsed, oppGoal: true})
      _games[0].gameEvents.push({eventType: 'score', eventText: eventScoreText, eventTime: secondsElapsed})
    /*
    }
    catch {
      ////////////console.log('oppGoal add event hit here 2');
      _games[0].gameEvents = []
      _games[0].gameEvents.push({eventType: 'scoreUndo', eventText: eventScoreText, eventTime: secondsElapsed})
    }
    */

    const eventBoardText = 'Opposition Own-Goal Removed'

    dispatch(updateGames(_games))
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateEventDisplayBoard(true, statsBoardPlayerId, eventBoardText))

  }

        return (
          <HStack>
            <Box minW="28%"alignSelf="center" mt="3" shadow="5">
              <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => removeOppGoal()}>-Opp. Goal</Button>
            </Box>
            <Box minW="28%" alignSelf="center" mt="3" ml="3" shadow="5">
              <Button minW="28%" bg="fuchsia.400" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => removeGoal()}>-Opp Own Goal</Button>
            </Box>
        </HStack>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default GameOptionsUndo;

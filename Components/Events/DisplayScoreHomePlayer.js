import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={16} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={16} color="#0891b2" />;

import EventsDisplay from './EventsDisplay.js';

import { updateGames } from '../../Reducers/games';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateEventsVersion } from '../../Reducers/eventsVersion';

//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

  const formattedSecondsFull = (sec) =>
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)

const DisplayScoreHomePlayer = (props)=>{

  const [getGame, setGame] = useState([]);
  const [getHalfTime, setHalfTime] = useState([{textOne: '', textTwo: ''}]);
  const [getSecondsElapsed, setSecondsElapsed] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [getIncrementer, setIncrementer] = useState(null);
  const [getSecondHalfFlagged, setSecondHalfFlagged] = useState(false);
  const [getSecondHalfKoCheck, setSecondHalfKoCheck] = useState(false);
  const [getNowTime, setNowTime] = useState(0);
  const [secondHalfFlagRedux, setSecondHalfFlagRedux] = useState(false);
  const [gameOverFlagRedux, setGameOverFlagRedux] = useState(false);


  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let laps = useSelector(state => state.stopwatch.laps)
  let startTimeEpochDateRedux = useSelector(state => state.stopwatch.lastClearedIncrementer)
  let incrementer = useSelector(state => state.stopwatch.incrementer)
  let avgBall = useSelector(state => state.stopwatch.avgBall)
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let saveTimerDetails = useSelector(state => state.stopwatch.stopTimer)
  let pauseTimer = useSelector(state => state.stopwatch.pauseTimer)
  let eventsVersion = useSelector(state => state.eventsVersion.eventsVersion)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamId = props.route.params.teamId
  //const gameIdDb = props.route.params.gameIdDb


  const { navigate } = props.navigation;


  useEffect(() => {

    setSecondsElapsed(0)
    setStartTime(0)
    console.log(startTime + ' StartTime now 5');
    console.log(getSecondsElapsed + ' check getSecondsElapsed before cearling');
    //clearInterval(incrementer);
    clearInterval(getIncrementer);

    //setSecondsElapsed(games[0].sixtySecondsMark)

    const incrementer = setInterval( () =>
        setSecondsElapsed(getSecondsElapsed => getSecondsElapsed + 1), 1000);


        setIncrementer(incrementer)

    },[])


  useEffect(() => {

    const gameHalfTime = props.gameHalfTime
    const gameFullTime = gameHalfTime * 2

    console.log(props.halfTimeFlag + ' props.halfTimeFlag here now hcek top');

    if (props.halfTimeFlag === 0) {
      console.log(getSecondsElapsed + ' getSecondsElapsed games[0].halfTime === 0');
      setSecondsElapsed(0)
      dispatch(updateStopwatch(
        0,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        0,
        saveTimerDetails,
        pauseTimer
      ))
      const eventsVersionNew = eventsVersion + 1
      //dispatch(updateEventsVersion(eventsVersionNew))
    }
    else if (props.halfTimeFlag === 2 || (props.halfTimeFlag === 1 && getSecondsElapsed >= gameHalfTime)) {
      console.log('props.halfTimeFlag === 2 || getSecondsElapsed >= gameHalfTime');
      setSecondsElapsed(gameHalfTime)

      if (secondHalfFlagRedux === false) {
        dispatch(updateStopwatch(
          gameHalfTime,
          laps,
          startTimeEpochDateRedux,
          incrementer,
          avgBall,
          gameHalfTime,
          saveTimerDetails,
          pauseTimer
        ))
        const eventsVersionNew = eventsVersion + 1
        //dispatch(updateEventsVersion(eventsVersionNew))
        setSecondHalfFlagRedux(true)
      }

    }
    else if (props.halfTimeFlag === 3 && getSecondHalfKoCheck === false) {
      console.log('props.halfTimeFlag === 3 && getSecondHalfKoCheck === false');
      setSecondsElapsed(gameHalfTime)
      setSecondHalfKoCheck(true)
      dispatch(updateStopwatch(
        gameHalfTime,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        gameHalfTime,
        saveTimerDetails,
        pauseTimer
      ))
      const eventsVersionNew = eventsVersion + 1
      //dispatch(updateEventsVersion(eventsVersionNew))
    }
    else if (props.halfTimeFlag === 4 || (props.halfTimeFlag === 3 && getSecondsElapsed >= gameFullTime)) {
      console.log('props.halfTimeFlag === 4 || getSecondsElapsed >= gameFullTime');
      setSecondsElapsed(gameFullTime)
      if (gameOverFlagRedux === false) {
        dispatch(updateStopwatch(
          gameFullTime,
          laps,
          startTimeEpochDateRedux,
          incrementer,
          avgBall,
          gameFullTime,
          saveTimerDetails,
          pauseTimer
        ))
      }
      const eventsVersionNew = eventsVersion + 1
      //dispatch(updateEventsVersion(eventsVersionNew))
      setGameOverFlagRedux(true)
    }
    else if (getSecondsElapsed === 0 || getSecondsElapsed === 60 || getSecondsElapsed === 120 || getSecondsElapsed === 180 || getSecondsElapsed === 240 || getSecondsElapsed === 300 || getSecondsElapsed === 360 || getSecondsElapsed === 420 || getSecondsElapsed === 480 || getSecondsElapsed === 540 || getSecondsElapsed === 600 || getSecondsElapsed === 660 || getSecondsElapsed === 720 || getSecondsElapsed === 780 || getSecondsElapsed === 840 || getSecondsElapsed === 900 || getSecondsElapsed === 960 || getSecondsElapsed === 1020 || getSecondsElapsed === 1080 || getSecondsElapsed === 1140 || getSecondsElapsed === 1200 || getSecondsElapsed === 1260 || getSecondsElapsed === 1320 || getSecondsElapsed === 1380 || getSecondsElapsed === 1440 || getSecondsElapsed === 1500 || getSecondsElapsed === 1560 || getSecondsElapsed === 1620 || getSecondsElapsed === 1680 || getSecondsElapsed === 1740 || getSecondsElapsed === 1800 || getSecondsElapsed === 1860 || getSecondsElapsed === 1920 || getSecondsElapsed === 1980 || getSecondsElapsed === 2040 || getSecondsElapsed === 2100 || getSecondsElapsed === 2160 || getSecondsElapsed === 2220 || getSecondsElapsed === 2280 || getSecondsElapsed === 2340 || getSecondsElapsed === 2400 || getSecondsElapsed === 2460 || getSecondsElapsed === 2520 || getSecondsElapsed === 2580 || getSecondsElapsed === 2640 || getSecondsElapsed === 2700) {
      dispatch(updateStopwatch(
        getSecondsElapsed,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        getSecondsElapsed,
        saveTimerDetails,
        pauseTimer
      ))
    }
    else {

      //If nowTime more than startTime + getSecondsElapsed + 30 && halfTime === 1

      const epochDate = new Date();
      //console.log(Math.floor(new Date(epochDate).getTime() / 1000))
      const nowTime = Math.floor(new Date(epochDate).getTime() / 1000)
      setNowTime(nowTime)
      const startTime = props.startTimeLive
      const appTimerPlusThirty = startTime + getSecondsElapsed + 30
      const appTimerPlusThirtySeondHalf = startTime + getSecondsElapsed - props.gameHalfTime + 30

      console.log(startTime + ' startTime here first');
      console.log(nowTime + ' nowTime here second');
      console.log(appTimerPlusThirty + ' appTimerPlusThirty here third');
      console.log(props.halfTimeFlag + ' props.halfTimeFlag here now');

      if (nowTime > appTimerPlusThirty && props.halfTimeFlag === 1) {
        //getSecondselapsed = nowTime - StartTime (i.e. getSeondsElapsed = 1200 - 1000 = 200)
        const gameTimeUpdated = nowTime - startTime
        setSecondsElapsed(gameTimeUpdated)
        dispatch(updateStopwatch(
          gameTimeUpdated,
          laps,
          startTimeEpochDateRedux,
          incrementer,
          avgBall,
          gameTimeUpdated,
          saveTimerDetails,
          pauseTimer
        ))
        const eventsVersionNew = eventsVersion + 1
        //dispatch(updateEventsVersion(eventsVersionNew))
      }
      else if (nowTime > appTimerPlusThirtySeondHalf && props.halfTimeFlag === 3) {
        const gameTimeUpdated = nowTime - startTime + props.gameHalfTime
        setSecondsElapsed(gameTimeUpdated)
        dispatch(updateStopwatch(
          gameTimeUpdated,
          laps,
          startTimeEpochDateRedux,
          incrementer,
          avgBall,
          gameTimeUpdated,
          saveTimerDetails,
          pauseTimer
        ))
        const eventsVersionNew = eventsVersion + 1
        //dispatch(updateEventsVersion(eventsVersionNew))
      }
    }

    },[getSecondsElapsed])

    /*
  useEffect(() => {

    console.log(getSecondsElapsed + ' getSecondsElapsed useEffect Hit!');


    console.log(games[0].sixtySecondsMark);
    const sixtySecondsMarkLive = games[0].sixtySecondsMark
    const sixtySecondsMarkLivePlusTwoMin = sixtySecondsMarkLive + 120

    const gameHalfTime = games[0].gameHalfTime
    //const gameHalfTimePlusOne = gameHalfTime + 1
    //const gameHalfTimePlusTwo = gameHalfTime + 2
    const gameFullTime = gameHalfTime * 2
    const gameFullTimePlusOne = gameFullTime + 1
    if (games[0].halfTime === 0) {
      console.log(getSecondsElapsed + ' getSecondsElapsed games[0].halfTime === 0');
      setSecondsElapsed(0)
      dispatch(updateStopwatch(
        0,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        0,
        saveTimerDetails,
        pauseTimer
      ))
    }
    if (getSecondsElapsed < 1 && games[0].halfTime < 4) {
      console.log(getSecondsElapsed + ' getSecondsElapsed < 1');
      setSecondsElapsed(games[0].sixtySecondsMark)
      dispatch(updateStopwatch(
        games[0].sixtySecondsMark,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        games[0].sixtySecondsMark,
        saveTimerDetails,
        pauseTimer
      ))
    }
    else if (saveTimerDetails === false) {
      console.log(getSecondsElapsed + ' getSecondsElapsed saveTimerDetails === false');
      const epochDate = new Date();
      //console.log(Math.floor(new Date(epochDate).getTime() / 1000))
      let startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)

      //if (games[0].halfTime < 2) {
        startTimeEpochDate  = startTimeEpochDate - sixtySecondsMark

        dispatch(updateStopwatch(
          getSecondsElapsed,
          laps,
          startTimeEpochDate,
          incrementer,
          avgBall,
          getSecondsElapsed,
          true,
          pauseTimer
        ))
    }
    else if (games[0].halfTime === 4 || games[0].halfTime === 5) {
      console.log(getSecondsElapsed + ' getSecondsElapsed games[0].halfTime === 4 || games[0].halfTime === 5');
   //console.log('game stopped or 10min over game time hit now!');
      setSecondsElapsed(gameFullTime)
      dispatch(updateStopwatch(
        gameFullTime,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        gameFullTime,
        saveTimerDetails,
        pauseTimer
      ))

      handleStopClick();
    }
    else if (games[0].halfTime === 2) {
      console.log(getSecondsElapsed + ' getSecondsElapsed games[0].halfTime === 2');
   //console.log('game stopped or 10min over game time hit now!');
      setSecondsElapsed(gameHalfTime)
      dispatch(updateStopwatch(
        gameHalfTime,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        gameHalfTime,
        saveTimerDetails,
        pauseTimer
      ))


      setSecondHalfFlagged(true)
    }
    else if (games[0].halfTime === 1 && getSecondsElapsed >= gameHalfTime) {
      console.log(getSecondsElapsed + ' getSecondsElapsed games[0].halfTime === 1 && getSecondsElapsed >= gameHalfTime');
   //console.log('game stopped or 10min over game time hit now!');
      setSecondsElapsed(gameHalfTime)
      dispatch(updateStopwatch(
        gameHalfTime,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        gameHalfTime,
        saveTimerDetails,
        pauseTimer
      ))

    }
    else if (games[0].halfTime === 3 && getSecondsElapsed >= gameFullTime) {
      console.log(getSecondsElapsed + ' getSecondsElapsed games[0].halfTime === 3 && getSecondsElapsed >= gameFullTime');
   //console.log('game stopped or 10min over game time hit now!');
      setSecondsElapsed(gameFullTime)
      dispatch(updateStopwatch(
        gameFullTime,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        gameFullTime,
        saveTimerDetails,
        pauseTimer
      ))

    }
    else if (getSecondHalfFlagged == false && games[0].halfTime === 3) {

      console.log(getSecondsElapsed + ' getSecondsElapsed getSecondHalfFlagged == false && games[0].halfTime === 3!');
      const currentStartTimeEpochDate = startTimeEpochDateRedux

      const epochDate = new Date();
      //console.log(Math.floor(new Date(epochDate).getTime() / 1000))
      let startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)



      //currentStartTimeEpochDate = 1100
      //startTimeEpochDate = 1118
      //sixtySecondsMark = 15
      //halftime was this long = 3
      //gameHalfTime = 10

      const gametimeInclHalfTIme = startTimeEpochDate - currentStartTimeEpochDate
      //(18)

      //const halftimeAmount = gametimeInclHalfTIme - sixtySecondsMark
      let halftimeAmount = 0
      if (gametimeInclHalfTIme > sixtySecondsMark) {
          halftimeAmount = gametimeInclHalfTIme - sixtySecondsMark
      }
      //(3)

      const minStartForSecondHalf = startTimeEpochDate - halftimeAmount
      //(1115)

      const minusForSecondHalf = currentStartTimeEpochDate + halftimeAmount
      //(1103)

      const secondHalfTime = minStartForSecondHalf - minusForSecondHalf
      //(1115 - 1103 = 12)

      dispatch(updateStopwatch(
        secondHalfTime,
        laps,
        minusForSecondHalf,
        incrementer,
        avgBall,
        secondHalfTime,
        true,
        pauseTimer
      ))

      setSecondHalfFlagged(true)
      setSecondsElapsed(secondHalfTime)


    }
    else {

      console.log(getSecondsElapsed + ' getSecondsElapsed else!');
   //console.log(new Date() + ' Date.');

   const epochDate = new Date();
   //console.log(Math.floor(new Date(epochDate).getTime() / 1000))
   const currentEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)
   console.log(startTimeEpochDateRedux + ' startTimeEpochDateRedux');
   const getSecondsElapsedPlusThirty = startTimeEpochDateRedux + getSecondsElapsed + 30


    if (currentEpochDate > getSecondsElapsedPlusThirty) {
      console.log(getSecondsElapsed + ' getSecondsElapsed currentEpochDate > getSecondsElapsedPlusThirty!');


      const currentStartTimeEpochDate = startTimeEpochDateRedux

      const epochDate = new Date();
      //console.log(Math.floor(new Date(epochDate).getTime() / 1000))
      let startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)



      //currentStartTimeEpochDate = 1100
      //startTimeEpochDate = 1118
      //sixtySecondsMark = 15
      //halftime was this long = 3
      //gameHalfTime = 10

      const gametimeInclHalfTIme = startTimeEpochDate - currentStartTimeEpochDate
      //(18)
      console.log(gametimeInclHalfTIme + ' gametimeInclHalfTIme');

      let halftimeAmount = 0
      if (gametimeInclHalfTIme > sixtySecondsMark) {
          halftimeAmount = gametimeInclHalfTIme - sixtySecondsMark
      }

      //(3)
      console.log(halftimeAmount + ' halftimeAmount');

      const minStartForSecondHalf = startTimeEpochDate - halftimeAmount
      //(1115)
      console.log(minStartForSecondHalf + ' minStartForSecondHalf');

      const minusForSecondHalf = currentStartTimeEpochDate + halftimeAmount
      //(1103)
      console.log(minusForSecondHalf + ' minusForSecondHalf');

      const gameTimeLive = minStartForSecondHalf - minusForSecondHalf
      console.log(gameTimeLive + ' gameTimeLive');
      ///(1115 - 1103 = 12)

      //setSecondHalfFlagged(true)
      setSecondsElapsed(gameTimeLive)
      dispatch(updateStopwatch(
        gameTimeLive,
        laps,
        startTimeEpochDateRedux,
        incrementer,
        avgBall,
        gameTimeLive,
        saveTimerDetails,
        pauseTimer
      ))


      }
      else {
        dispatch(updateStopwatch(
          getSecondsElapsed,
          laps,
          startTimeEpochDateRedux,
          incrementer,
          avgBall,
          getSecondsElapsed,
          saveTimerDetails,
          pauseTimer
        ))
      }


      console.log(getSecondsElapsed + ' getSecondsElapsed last!');



    }

  },[getSecondsElapsed])
  */

  const handleStopClick = () => {

    setSecondsElapsed(0)
    dispatch(updateStopwatch(
      0,
      laps,
      startTimeEpochDateRedux,
      incrementer,
      avgBall,
      0,
      saveTimerDetails,
      pauseTimer
    ))
    setStartTime(0)
    console.log(startTime + ' StartTime now 5');
    //clearInterval(incrementer);
    clearInterval(getIncrementer);

  }

  const displayScore = () => {

    /*
 //console.log(JSON.stringify(getGame) + ' getGame score display');
 //console.log(JSON.stringify(getGame.game) + ' getGame.game score display');
 //console.log(JSON.stringify(getGame.game.score) + ' getGame.game.score score display');
 //console.log(JSON.stringify(getGame.game.score.homeTeam) + ' getGame.game.score.homeTeam score display.');
    */

    try {
    const homeTeamScore = props.homeTeamScore
    const awayTeamScore = props.awayTeamScore
    const homeTeamShortName = props.homeTeamShortName
    const awayTeamShortName = props.awayTeamShortName
    const secondsElapsed = props.secondsElapsed
    let sixtySecondsMark = props.sixtySecondsMark
    const halfTimeFlag = props.halfTimeFlag
    const gameHalfTime = props.gameHalfTime
    const gameFullTimeRaw = gameHalfTime * 2
    const gameFullTime = gameFullTimeRaw / 60
    const firstHalf = props.firstHalf
    const secondHalf = props.secondHalf

    console.log(sixtySecondsMark + " waht is this when we start a game?");


    if (sixtySecondsMark === null || sixtySecondsMark === undefined) {
      sixtySecondsMark = 0
    }


    //halfTimeFlag = games[0].halfTime

 //console.log('do we get her?1');

    let halfTimeStr = []

    if (firstHalf === true) {
    //console.log('now, am i hit hmm?');
      //halfTimeStr = 'H1'
      halfTimeStr.push({textOne: '1st', textTwo: 'Half'})
    }
    /*
    else if (secondsElapsed === gameHalfTime) {
      //halfTimeStr = 'HT'
      halfTimeStr.push({textOne: 'Half', textTwo: 'Time'})
    }

    else if (secondsElapsed > gameHalfTime && secondsElapsed < gameFullTimeRaw) {
      //halfTimeStr = 'HT'
      halfTimeStr.push({textOne: 'Half', textTwo: 'Time'})
    }
    else if (secondsElapsed >== gameFullTimeRaw) {
      //halfTimeStr = 'HT'
      halfTimeStr.push({textOne: 'Full', textTwo: 'Time'})
    }
    */
    else {
      //halfTimeStr = 'H2'
      halfTimeStr.push({textOne: '2nd', textTwo: 'Half'})
    }

 //console.log(JSON.stringify(halfTimeStr) + ' halfTimeStr');

    return (
      <Center bg="#111" pt="5" pl="5" pb="5">
        <HStack>
          <VStack minW="100%" >
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '800'}}><Text style={{fontSize: 20, color: '#eee', fontWeight: '800'}}>{homeTeamShortName} </Text> <Text style={{backgroundColor: '#000'}}> {homeTeamScore} </Text> <Text style={{fontSize: 18, color: '#999'}}>vs</Text> <Text style={{backgroundColor: '#000'}}> {awayTeamScore} </Text> <Text style={{fontSize: 20, color: '#eee'}}> {awayTeamShortName}</Text></Text>
              <HStack minW="100%">
                <Text style={{fontSize: 18, textAlign: 'left', color: '#fff', width: '70%', marginTop: 5}} color="primary.400">
                  {formattedSeconds(getSecondsElapsed)}<Text style={{fontSize: 10, textAlign: 'center', color: '#fff'}} color="primary.400"> min </Text><Text style={{fontSize: 10, textAlign: 'center', color: '#999'}} color="primary.400">(of {gameFullTime}min total)</Text>
                </Text>
                <Text style={styles.textSizeHalf} fontSize="xs" color="primary.900">{halfTimeStr[0].textOne} {halfTimeStr[0].textTwo}</Text>
                    </HStack>
          </VStack>
        </HStack>
        </Center>
    )
  }
  catch {
    //do nothing.
  }
  }

  const displayHlafTimeFullTimeText = () => {

    const halfTimeFlag = props.halfTimeFlag
    const gameHalfTime = props.gameHalfTime
    const gameFullTimeRaw = gameHalfTime * 2

    if (getSecondsElapsed >= gameHalfTime && props.halfTimeFlag.halfTime === 1) {
      return (
        <Box style={styles.userProfileFourMessages}>
            <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>Half-time! When the second half is ready to begin, please have the coach tap ‘Kick-off Second Half’ on their phone to restart the timer.</Text>
        </Box>
      )
    }
    else if (getSecondsElapsed >= gameFullTimeRaw && games[0].halfTime === 3) {
      return (
        <Box style={styles.userProfileFourMessages}>
           <Text style={{fontSize: 18, color: '#fff', marginLeft: 15}}>Game complete! Please ensure the coach saves the data on their phone so player stats are recorded.</Text>
        </Box>
      )
    }
  }

  const testingData = () => {

    return (
      <Box>
        <Text style={styles.textSizeHalf} fontSize="xs" color="primary.900">{formattedSecondsFull(getSecondsElapsed)} new</Text>
        <Text style={styles.textSizeHalf} fontSize="xs" color="primary.900">{props.startTimeLive} startTimeLive</Text>
        <Text style={styles.textSizeHalf} fontSize="xs" color="primary.900">{getNowTime} getNowTime</Text>
        <Text style={styles.textSizeHalf} fontSize="xs" color="primary.900">{props.halfTimeFlag} halfTimeFlag</Text>
        <Text style={styles.textSizeHalf} fontSize="xs" color="primary.900">sixty: {sixtySecondsMark} </Text>
      </Box>
    )

  }


        return (
                <Box mt="5">
                  {displayScore()}

                </Box>

        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  linearGradientText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  linearGradientBg: {
    minWidth: '100%',
    minHeight: '100%',
  },
  textSize: {
    textAlign: 'center',
    color: '#ddd',
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
  textSizeHalf: {
    textAlign: 'center',
    color: '#999',
    position: 'right',
    textAlign: 'right',
    width: '25%',
    paddingTop: 10,
    paddingight: 5,
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
  userProfileFourMessages: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
  },
})

export default DisplayScoreHomePlayer;

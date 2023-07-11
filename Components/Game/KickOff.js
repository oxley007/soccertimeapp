import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="pluscircleo" size={50} color="#fff" />;

import { updateGames } from '../../Reducers/games';
import { updateStopwatch } from '../../Reducers/stopwatch';

const KickOff = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getSecondsElapsed, setSecondsElapsed] = useState(0);
  const [getSixtySecondsFlag, setSixtySecondsFlag] = useState(0);
  const [getLaps, setLaps] = useState([]);
  const [getLastClearedIncrementer, setLastClearedIncrementer] = useState(null);
  const [getIncrementer, setIncrementer] = useState(null);
  const [getStopTimer, setStopTimer] = useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [getContinueFlag, setContinueFlagFlag] = useState(false);



  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
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

  const startTimer = () => {

    const halfTimeStatus = games[0].halfTime
    ////console.log(halfTimeStatus + ' what is halfTimeStatus');
    if (halfTimeStatus === 2) {
      games[0].firstHalf = false
      games[0].secondHalf = true
      games[0].halfTime = 3
      games[0].gameEvents.push({eventType: 'ko2', eventText: 'Kick-Off Second Half', eventTime: secondsElapsed})
    }
    else {
        games[0].firstHalf = true
        games[0].secondHalf = false
        try {
          ////////////console.log('oppGoal add event hit here 1');
          games[0].gameEvents.push({eventType: 'ko', eventText: 'Kick-Off', eventTime: secondsElapsed})
        }
        catch {
          ////////////console.log('oppGoal add event hit here 2');
          games[0].gameEvents = []
          games[0].gameEvents.push({eventType: 'ko', eventText: 'Kick-Off', eventTime: secondsElapsed})
        }
    }

    ////console.log(games + ' games after kick off here.');
    const halftimeFlag = games[0].halfTime
    setHalfTimeFlag(halftimeFlag)
    dispatch(updateGames(games))

    ////console.log('entering start timer');
    //todo.
    stopWatch()



  }

  const restartTimer = () => {
    const halfTimeStatus = games[0].halfTime
    ////console.log(halfTimeStatus + ' what is halfTimeStatus');
    if (halfTimeStatus <= 2) {
      games[0].firstHalf = false
      games[0].secondHalf = true
      games[0].halfTime = 3
      games[0].gameEvents.push({eventType: 'ko2', eventText: 'Kick-Off Second Half', eventTime: secondsElapsed})
    }
    else {
        games[0].firstHalf = true
        games[0].secondHalf = false
    }

    ////console.log(games + ' games after kick off here.');

    const halftimeFlag = games[0].halfTime
    setHalfTimeFlag(halftimeFlag)
    dispatch(updateGames(games))

  }

  useEffect(() => {

    const halftimeFlag = games[0].halfTime
    setHalfTimeFlag(halftimeFlag)

  },[games[0].halfTime])

  useEffect(() => {
    ////console.log(games[0].firstHalf + ' what is first half flag?');
    //console.log(secondsElapsed + ' now what is it?');
    //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it?');
    const gameHalfTime = games[0].gameHalfTime
    const gameHalfTimePlusOne = gameHalfTime + 1
    const gameHalfTimePlusTwo = gameHalfTime + 2
    const gameFullTime = gameHalfTime * 2
    const gameFullTimePlusOne = gameFullTime + 1
    if (games[0].halfTime === 4) {
      //console.log('game stopped or 10min over game time hit now!');
      handleStopClick();
    }
    else if (stopTimer === true || (getSecondsElapsed >= gameHalfTimePlusOne && games[0].firstHalf === true) || (getSecondsElapsed >= gameFullTimePlusOne && games[0].secondHalf === true) ) {
      //console.log('stopTimer hit now!');
      //console.log(secondsElapsed + ' now what is it 2?');
      //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it 2?');
      setSecondsElapsed(secondsElapsed)
      dispatch(updateStopwatch(
        secondsElapsed,
        laps,
        lastClearedIncrementer,
        incrementer,
        avgBall,
        sixtySecondsMark,
        stopTimer,
        pauseTimer
      ))
    }
    else if (secondsElapsed === 0 || secondsElapsed === 60 || secondsElapsed === 120 || secondsElapsed === 180 || secondsElapsed === 240 || secondsElapsed === 300 || secondsElapsed === 360 || secondsElapsed === 420 || secondsElapsed === 480 || secondsElapsed === 540 || secondsElapsed === 600 || secondsElapsed === 660 || secondsElapsed === 720 || secondsElapsed === 780 || secondsElapsed === 840 || secondsElapsed === 900 || secondsElapsed === 960 || secondsElapsed === 1020 || secondsElapsed === 1080 || secondsElapsed === 1140 || secondsElapsed === 1200 || secondsElapsed === 1260 || secondsElapsed === 1320 || secondsElapsed === 1380 || secondsElapsed === 1440 || secondsElapsed === 1500 || secondsElapsed === 1560 || secondsElapsed === 1620 || secondsElapsed === 1680 || secondsElapsed === 1740 || secondsElapsed === 1800 || secondsElapsed === 1860 || secondsElapsed === 1920 || secondsElapsed === 1980 || secondsElapsed === 2040 || secondsElapsed === 2100 || secondsElapsed === 2160 || secondsElapsed === 2220 || secondsElapsed === 2280 || secondsElapsed === 2340 || secondsElapsed === 2400 || secondsElapsed === 2460 || secondsElapsed === 2520 || secondsElapsed === 2580 || secondsElapsed === 2640 || secondsElapsed === 2700 || secondsElapsed === gameHalfTimePlusTwo) {
      //console.log('secondsElapsed === 60 prob hitting this each time 2?');
      //console.log(secondsElapsed + ' now what is it 3?');
      //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it 3?');
      if (getContinueFlag !== true) {
        games[0].secondsElapsed = secondsElapsed
        dispatch(updateGames(games))
      }
      dispatch(updateStopwatch(
        getSecondsElapsed,
        laps,
        lastClearedIncrementer,
        incrementer,
        avgBall,
        secondsElapsed,
        stopTimer,
        pauseTimer
      ))
    }
    else {
      //console.log('hitting normal.');
      //console.log(secondsElapsed + ' now what is it 4?');
      //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it 4?');
      dispatch(updateStopwatch(
        getSecondsElapsed,
        laps,
        lastClearedIncrementer,
        incrementer,
        avgBall,
        sixtySecondsMark,
        stopTimer,
        pauseTimer
      ))
    }

    })


  const handleStopClick = () => {
    clearInterval(incrementer);
    dispatch(updateStopwatch(
      secondsElapsed,
      laps,
      incrementer,
      incrementer,
      avgBall,
      sixtySecondsMark,
      stopTimer,
      pauseTimer,
    ))
    }

    useEffect(() => {

      if (getContinueFlag === false && props.fromContinue === 1) {
        setContinueFlagFlag(true)
      }

    },[])

  const stopWatch = () => {

    //console.log(getSecondsElapsed + ' getSecondsElapsed what is true?');
    incrementer = setInterval( () =>
        setSecondsElapsed(getSecondsElapsed => getSecondsElapsed + 1), 1000);


        incrementer = setInterval( () =>
        setSixtySecondsFlag(getSixtySecondsFlag => getSecondsElapsed), 6000);



    /*
    ////console.log('entering stio wathc new.');
    ////console.log(stopTimer + ' what is stoptimer??')
    let _stopTimer = stopTimer
  incrementer = setInterval( () => {
      ////console.log( 'stop timer true hit?');

      secondsElapsed = secondsElapsed + 1

      lastClearedIncrementer = null
      incrementer = null
      //const __stopTimer = _stopTimer
      dispatch(updateStopwatch(
        secondsElapsed,
        laps,
        lastClearedIncrementer,
        incrementer,
        avgBall,
        sixtySecondsMark,
        __stopTimer,
        pauseTimer,
      ))
    }, 1000)
    */
    }

    const gameStatus = () => {

      let gameStatusText = ''
      if (getHalfTimeFlag === 5) {
       gameStatusText = 'New Game'
      }
      else if (getHalfTimeFlag <= 4 && games[0].gameSetup === false) {
        gameStatusText = 'Continue Game'
      }
      else {
        gameStatusText = 'New Game'
      }

      return (
        <Text style={{color: "#ffffff",
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 40}}>
          {gameStatusText}
        </Text>
      )

    }

    const restartTimerFromContinueGame = () => {
      //to do

      if (getHalfTimeFlag <= 4 && games[0].gameSetup === false) {

          //do other stuff.
          //console.log(getSecondsElapsed + ' what is it at this stage?');
          //console.log(secondsElapsed + ' secondsElapsed what is it at this stage?');
          const gameSecondsElapsed = games[0].secondsElapsed
          //console.log(gameSecondsElapsed + ' gameSecondsElapsed what is it at this stage?');



          if (getSecondsElapsed === 0 && secondsElapsed === 0 && gameSecondsElapsed === 0) {

            let zeroSecondsElapsed = 0
            if (games[0].firstHalf === true) {
              zeroSecondsElapsed = 1
            }
            else if (games[0].secondHalf === true) {
              let gameHalfTime = games[0].gameHalfTime
              gameHalfTime = gameHalfTime + 1
              zeroSecondsElapsed = gameHalfTime
            }

            //console.log(zeroSecondsElapsed + ' zeroSecondsElapsed');

            setSecondsElapsed(zeroSecondsElapsed)
            dispatch(updateStopwatch(
              zeroSecondsElapsed,
              laps,
              incrementer,
              incrementer,
              avgBall,
              gameSecondsElapsed,
              stopTimer,
              pauseTimer,
            ))
            stopWatch()
            setContinueFlagFlag(false)
          }
            else if (getSecondsElapsed === 0 && secondsElapsed === 0) {
              //console.log(gameSecondsElapsed + ' gameSecondsElapsed what is it at this stage 2?');
          setSecondsElapsed(gameSecondsElapsed)
          dispatch(updateStopwatch(
            gameSecondsElapsed,
            laps,
            incrementer,
            incrementer,
            avgBall,
            gameSecondsElapsed,
            stopTimer,
            pauseTimer,
          ))
          stopWatch()
          setContinueFlagFlag(false)
          }
          else {
            setContinueFlagFlag(false)
          }

      }
      else {

        let _games = []
        try {
          _games = [...games]
        }
        catch {
          _games = [{...games}]
        }
        //console.log(JSON.stringify(_games) + ' chcking _games here ok.');

        let gamesLength  = 0
        try {
        gamesLength = games.length
        }
        catch {
          gamesLength = 0
        }

        _games.unshift({gameSetup: true, season: {season: '', id: 99999999}, id: gamesLength, halfTime: 0, firstHalf: false, secondHalf: false, gameHalfTime: 0, score: {homeTeam: 0, awayTeam: 0}, teamNames: {homeTeamName: '', awayTeamName: '', homeTeamShortName: '', awayTeamShortName: '', homeTeamId: 99999998, awayTeamId: 99999998}, gameEvents:{}, grade: '', secondsElapsed: 0})

        dispatch(updateGames(_games))

        userRef.doc("games").update({
            games: _games,
          })
          .catch(error => this.setState({ errorMessage: error.message }))

          navigate('AddTeamHome', {
            teamType: 0
          });
          setContinueFlagFlag(false)
      }

    }

        return (
          <Center style={getContinueFlag === true ? styles.showOneHuundered : getHalfTimeFlag === 0 && games[0].firstHalf === false || getHalfTimeFlag === 2 ? styles.showOneHuundered : styles.showZero}>
          <Text>where? {getContinueFlag}</Text>
            <Box style={{position:'absolute', left: 0, top: 0, right: 0, height: '100%', zIndex: 3, elevation: 3, backgroundColor: 'transparent', justifyContent: 'center' }} bg="#333" p="0" mt="0" pl="8" pr="8" minW="100%" h="300" shadow="9" _text={{color: "white"
            }}>
            {getContinueFlag === true &&
              <Box>
              <Text style={{color: '#fff'}}>where? {getContinueFlag}</Text>
                <Text style={{color: "#fff", fontSize: 22, marginBottom: 10}}>Restart Timer -</Text>
                <Text style={{color: "#fff", fontSize: 22, marginBottom: 20}}>tap "restart" to start timer!</Text>
              <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => restartTimerFromContinueGame()}>Restart Timer!</Button>
              </Box>
            }
          {games[0].halfTime === 2 &&
            <Box>
              <Text style={{color: "#fff", fontSize: 22, marginBottom: 10}}>When you're ready -</Text>
              <Text style={{color: "#fff", fontSize: 22, marginBottom: 20}}>tap "Kick Off" to start second half!</Text>
            <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => restartTimer()}>Kick Off Second Half!</Button>
            </Box>
          }
          {games[0].halfTime === 0 && games[0].firstHalf === false &&
            <Box>
              <Text style={{color: "#fff", fontSize: 22, marginBottom: 10}}>When you're ready -</Text>
              <Text style={{color: "#fff", fontSize: 22, marginBottom: 20}}>tap "Kick Off" to start the timer!</Text>
            <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => startTimer()}>Kick Off!</Button>
            </Box>
          }
          </Box>
          </Center>


        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  showOneHuundered: {
    position:'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: '86.5%',
    zIndex: 3,
    elevation: 3,
    backgroundColor: 'rgba(20,20,20,0.7)',
    justifyContent: 'center',
    minHeight: '100%'
  },
  showZero: {
    position:'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: '0%',
    zIndex: 3,
    elevation: 3,
    backgroundColor: 'rgba(20,20,20,0.7)',
    justifyContent: 'center'
  },
  showButton: {
    //position:'relative',
  }
})

export default KickOff;

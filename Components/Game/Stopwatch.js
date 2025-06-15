import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const plusCircle = <IconAnt name="pluscircle" size={20} color="#999" />;
const minusCircle = <IconAnt name="minuscircle" size={20} color="#999"   />;
const helpCircle = <Entypo name="help-with-circle" size={20} color="#fff" />;
const refreshSub = <FontAwesome name="refresh" size={12} color="#E879F9" />;


import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateGameOptionBoardFrom } from '../../Reducers/gameOptionBoardFrom';
import { updateStatsBoard } from '../../Reducers/statsBoard';

import KickOff from './KickOff.js';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

  const formattedSecondsShort = (sec) =>
    Math.floor(sec / 60)

const Stopwatch = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getHalf, setHalf] = useState([]);
  const [getHalfTime, setHalfTime] = useState([{textOne: '', textTwo: ''}]);
  const [getScore, setScore] = useState([{homeTeam: 0, awayTeam: 0}]);
  const [getDisplayBar, setDisplayBar] = useState([{homeTeam: 0, awayTeam: 0}]);
  const [getSecondsElapsed, setSecondsElapsed] = useState(0);
  const [getFullTIme, setFullTime] = useState(99999999);
  const [getHalfTimeNumber, setHalfTimeNumber] = useState(99999999);

  //let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  //let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let laps = useSelector(state => state.stopwatch.laps)
  let lastClearedIncrementer = useSelector(state => state.stopwatch.lastClearedIncrementer)
  let incrementer = useSelector(state => state.stopwatch.incrementer)
  let avgBall = useSelector(state => state.stopwatch.avgBall)
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let stopTimer = useSelector(state => state.stopwatch.stopTimer)
  let pauseTimer = useSelector(state => state.stopwatch.pauseTimer)
  const eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const secondsElapsed = props.secondsElapsed

  const { navigate } = props.navigation;

  let halfStr = ''
  let halfTimeFlag = 0
  let halfTimeStr = ''

  useEffect(() => {

    if (props.fromFooter === true) {
      setDisplayBar('0%')
    }

  },[])

  useEffect(() => {


    console.log('it him Stopwatch on eventsVersion!');
    console.log(props.avgTimePerPlayer + ' what? is games[0].avgTimePerPlayer stopwatch')

  },[eventsVersion])

  useEffect(() => {

      const firstHalf = games[0].firstHalf
      const secondHalf = games[0].secondHalf
      //const halfTimeStatus = games[0].halfTime
    //console.log(games[0].firstHalf + ' hi ya ? games[0].firstHalf');
    console.log(firstHalf + ' hi ya ? firstHalf');
    console.log(games[0].gameIdDb + ' hi ya ? games[0].gameIdDb');
    console.log(secondHalf + ' halfTimeStatus is?');

      if (firstHalf === true && secondHalf === false) {
      //console.log('now, am i hit hmm?');
        halfStr = '1st Half'
        setHalf(halfStr)
      }
      else if (firstHalf === false && secondHalf === true) {
        halfStr = '2nd Half'
        setHalf(halfStr)
      }
      else {
        halfStr = ''
        setHalf(halfStr)
      }

      halfTimeFlag = games[0].halfTime
      console.log(halfTimeFlag + ' huh ay? halfTimeFlag');

      if (halfTimeFlag === 0 || halfTimeFlag === 1) {
      //console.log('now, am i hit hmm?');
        halfTimeStr = 'H1'
        setHalfTime([{textOne: '1st', textTwo: 'Half'}])
      }
      else if (halfTimeFlag === 2) {
        halfTimeStr = 'HT'
        setHalfTime([{textOne: 'Half', textTwo: 'Time'}])
      }
      else if (halfTimeFlag === 3) {
        halfTimeStr = 'H2'
        setHalfTime([{textOne: '2nd', textTwo: 'Half'}])
      }
      else if (halfTimeFlag === 4) {
        halfTimeStr = 'HT'
        setHalfTime([{textOne: 'Full', textTwo: 'Time'}])
      }
      else {
        halfTimeStr = 'H1'
        setHalfTime([{textOne: '1st', textTwo: 'Half'}])
      }


  },[sixtySecondsMark])

  useEffect(() => {

    const homeTeamScore = games[0].score.homeTeam
    const awayTeamScore = games[0].score.awayTeam

    setScore([{homeTeam: homeTeamScore, awayTeam: awayTeamScore}]);

  },[games[0].score.homeTeam, games[0].score.awayTeam])

  useEffect(() => {

    const gameHalfTime = games[0].gameHalfTime
    const gameHalfTimePlusOne = gameHalfTime + 1
    const gameFullTime = gameHalfTime * 2
    const gameFullTimePlusOne = gameFullTime + 1

    const gameHalfTimeNumber = Number(gameHalfTime)
    const secondsElapsedNumber = Number(secondsElapsed)
    console.log(gameHalfTimeNumber + ' what si gameHalfTimeNumber aye?');
    setHalfTimeNumber(gameHalfTimeNumber)
    //setHalfTime(gameHalfTime)
    setFullTime(gameFullTime)
    console.log(secondsElapsedNumber + ' secondsElapsedNumber what is aye');
    setSecondsElapsed(secondsElapsedNumber)
 //console.log(getSecondsElapsed + ' what is getSecondsElapsed');
 //console.log(getFullTIme + ' what is getFullTIme');


  },[sixtySecondsMark])


  const pauseTime = () => {
    //let _stoptimer = stopTimer
    stopTimer = true
    //todo.

    dispatch(updateStopwatch(secondsElapsed, laps, lastClearedIncrementer, incrementer, avgBall, sixtySecondsMark, stopTimer, pauseTimer ))

  }

  const startTimer = () => {
    //let _stoptimer = stopTimer
    stopTimer = false
    //todo.

    dispatch(updateStopwatch(secondsElapsed, laps, lastClearedIncrementer, incrementer, avgBall, sixtySecondsMark, stopTimer, pauseTimer ))
  }

  const setGameOptionsOpenStatus = (isGameOptionOpen, gameOptionBoardFromButton) => {

  //console.log('are we hitting? setGameOptionBoardDisplay(gameOptionBoard)');
    dispatch(updateGameOptionBoard(isGameOptionOpen, 0))
    dispatch(updateStatsBoard(false, 99999999))
    dispatch(updateGameOptionBoardFrom(gameOptionBoardFromButton))
  }

  const editTime = () => {

    navigate('EditGameTime');

  }


  const checkDisplay = () => {

    if (props.fromContinue === 'fromEvents') {
      //do nothing.
    }
    else {

    return (
      <HStack>
        <Button pl="0" pr="2" variant="unstyled" onPress={() => setGameOptionsOpenStatus(true, 0)}>
          <HStack >
          <Center pl="2" style={{height: 20}}>
          {Platform.OS !== 'ios' &&
            <Text style={{color: '#000'}}>k</Text>
          }
            {plusCircle}
            </Center>
          </HStack>
        </Button>
        <Button pl="0" pr="0" variant="unstyled" onPress={() =>  setGameOptionsOpenStatus(true, 0)}>
          <HStack >
          <Center style={{height: 20}}>
          {Platform.OS !== 'ios' &&
            <Text style={{color: '#000'}}>k</Text>
          }
            {minusCircle}
            </Center>
          </HStack>
        </Button>
      </HStack>
    )
  }

  }

  const goToHelpLive = () => {

    navigate('StepFirst', {
      helpFromLiveGame: true
    });

  }

  const showAvgTimePopup = () => {
    navigate('SelectPlayerTimeDesc', {
      avgTimePerPlayer: props.avgTimePerPlayer
    });
  }

  const showSubTimeDesc = (sixtySecondsMarkInSeconds, subEveryThisMinutes, playersRemainderDisplay) => {
    navigate('SelectSubTimeDesc', {
      sixtySecondsMarkInSeconds: sixtySecondsMarkInSeconds,
      subEveryThisMinutes: subEveryThisMinutes,
      playersRemainderDisplay: playersRemainderDisplay,
    });
  }



    const getHalfTimeNumberPlusOne = getHalfTimeNumber + 1
    const getHalfTimeNumberMinusOne = getHalfTimeNumber - 1

    const displayAvgTimePerPlayer = () => {
        console.log(props.avgTimePerPlayer + ' one last time');

        const gameAllTime = games[0].gameHalfTime * 2

        const avgTimePerPlayerLive = formattedSecondsShort(props.avgTimePerPlayer)

        if (avgTimePerPlayerLive > 90) {
          return (
            <Center>
            <Button pl="" pt="1.5" pr="0" variant="unstyled" style={{borderRadius: 50, borderColor: '#E879F9', borderWidth: 4, height: 40, width: 40}} onPress={() => showAvgTimePopup()}>

              <Text style={{color: '#fff', fontSize: 14, padding: 0}}>
              </Text>

            </Button>
            </Center>
          )
        }
        else {
          return (
            <Center>
            <Button pl="" pt="1.5" pr="0" variant="unstyled" style={{borderRadius: 50, borderColor: '#E879F9', borderWidth: 4, height: 40, width: 40}} onPress={() => showAvgTimePopup()}>

              <Text style={{color: '#fff', fontSize: 14, padding: 0}}>
                {avgTimePerPlayerLive}
              </Text>

            </Button>
            </Center>
          )
        }
    }

    const displayAiSubTime = () => {

      console.log(games[0].sixtySecondsMark + ' games[0].sixtySecondsMark on stopwatch');
      console.log(games[0].aiSubTime + ' games[0].aiSubTime on stopwatch');

      let gameSeconds = games[0].sixtySecondsMark
      const gametime = games[0].gameHalfTime
      const gametimeSeconds = gametime / 60
      const gameFulltime = games[0].gameHalfTime * 2
      const gameFulltimeSeconds = gameFulltime / 60

      const playersRemainder = games[0].playersRemainder
      let playersRemainderDisplay = ''
      if (playersRemainder > 0) {
        playersRemainderDisplay = 'x' + playersRemainder
      }

      if (!gameSeconds) {
        gameSeconds = 0
      }

      const sixtySecondsMarkInSeconds = gameSeconds / 60
      const subEveryThisMinutes = games[0].aiSubTime

      const gametimeSecondsSubs = Math.floor(gametimeSeconds / subEveryThisMinutes);
      console.log(gametimeSecondsSubs + ' gametimeSecondsSubs what hte is htis?');
      const gametimeSecondsSubsTimesSixty = gametimeSecondsSubs * 60


      const intervalsPassed = Math.floor(sixtySecondsMarkInSeconds / subEveryThisMinutes);
      const nextSubMinutePlusThree = (intervalsPassed + 3) * subEveryThisMinutes;
      const nextSubMinutePlusTwo = (intervalsPassed + 2) * subEveryThisMinutes;
      const nextSubMinute = (intervalsPassed + 1) * subEveryThisMinutes;
      const lastSubMinute = (intervalsPassed) * subEveryThisMinutes;
      const lastLastSubMinute = (intervalsPassed - 1) * subEveryThisMinutes;

      const gametimeSecondsThreeBlocksAway = subEveryThisMinutes * 2

      console.log(gametimeSecondsThreeBlocksAway + ' gametimeSecondsThreeBlocksAway is?');
      console.log(gameSeconds + ' gameSeconds check is?');
      console.log(formattedSecondsShort(nextSubMinutePlusTwo) + ' nextSubMinutePlusTwo what is ya?');
      console.log(gameFulltimeSeconds + ' gameFulltimeSeconds what is ya?');

      if (gametimeSecondsThreeBlocksAway > sixtySecondsMarkInSeconds) {
        return (
          <Button pl="" pt="0" m="0" pr="0" variant="unstyled" onPress={() => showSubTimeDesc(sixtySecondsMarkInSeconds, subEveryThisMinutes, playersRemainderDisplay)}>
            <Center>
            <Text style={styles.subTimes}>
              {refreshSub} {formattedSecondsShort(nextSubMinute)}min {playersRemainderDisplay}.
            </Text>
            {formattedSecondsShort(nextSubMinutePlusTwo) < gameFulltimeSeconds &&
              <Text style={styles.subTimes}>
                {refreshSub} {formattedSecondsShort(nextSubMinutePlusTwo)}min {playersRemainderDisplay}
              </Text>
            }
            {formattedSecondsShort(nextSubMinutePlusThree) < gameFulltimeSeconds &&
              <Text style={styles.subTimes}>
                {refreshSub} {formattedSecondsShort(nextSubMinutePlusThree)}min {playersRemainderDisplay}
              </Text>
            }

              </Center>
          </Button>
        )
      }
      else {
        return (
          <Button pl="" pt="0" m="0" pr="0" variant="unstyled" onPress={() => showSubTimeDesc(sixtySecondsMarkInSeconds, subEveryThisMinutes, playersRemainderDisplay)}>
            <Center>
            <Text style={styles.subTimes}>
              {refreshSub} {formattedSecondsShort(lastLastSubMinute)}min {playersRemainderDisplay}
            </Text>
              {formattedSecondsShort(lastSubMinute) < gameFulltimeSeconds &&
                <Text style={styles.subTimes}>
                  {refreshSub} {formattedSecondsShort(lastSubMinute)}min {playersRemainderDisplay}
                </Text>
              }
              {formattedSecondsShort(nextSubMinute) < gameFulltimeSeconds &&
                <Text style={styles.subTimes}>
                  {refreshSub} {formattedSecondsShort(nextSubMinute)}min {playersRemainderDisplay}
                </Text>
            }

              </Center>
          </Button>
        )
      }
    }



        return (
          <Center style={props.secondsElapsed >= getFullTIme ? styles.paddingForScore : props.secondsElapsed === getHalfTimeNumber ? styles.paddingForScore : props.secondsElapsed === getHalfTimeNumberPlusOne ? styles.paddingForScore : props.secondsElapsed === getHalfTimeNumberMinusOne ? styles.paddingForScore : props.secondsElapsed === 0 ? styles.paddingForScore : styles.paddingForScoreZero} >
            <HStack minW="100%">
            <Center>
              <HStack>
              <VStack minW="15%" mr="4">
                <Center>
                          {displayAvgTimePerPlayer()}
                </Center>
              </VStack>
              <VStack minW="15%" >
                <Center>
                          {displayAiSubTime()}
                </Center>
              </VStack>
                </HStack >
                </Center>
              <VStack minW="45%" style={{marginTop: 10}}>
                <Center style={{borderLeftWidth: 1, borderLeftColor: "#fff", borderRightWidth: 1, borderRightColor: "#fff"}}>
                  <Text style={{fontSize: 20, color: '#fff', fontWeight: '600'}}>
                    <Text style={{fontSize: 20, color: '#eee', fontWeight: '800'}}>{games[0].teamNames.homeTeamShortName} </Text>
                    <Text style={{backgroundColor: '#000'}}> {getScore[0].homeTeam} </Text>
                    <Text style={{fontSize: 16, color: '#999'}}>vs</Text> <Text style={{backgroundColor: '#000'}}> {getScore[0].awayTeam} </Text>
                    <Text style={{fontSize: 20, color: '#eee', fontWeight: '800'}}> {games[0].teamNames.awayTeamShortName}</Text>
                  </Text>
                </Center>
              </VStack>
              <VStack minW="20%">
                <Center mb="4">
                  <HStack >
                    <Text style={{fontSize: 18, textAlign: 'center', color: '#fff', fontWeight: '900'}} color="primary.400">{formattedSeconds(secondsElapsed)}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.textSize} fontSize="xs" color="#999">{getHalfTime[0].textOne} {getHalfTime[0].textTwo}</Text>
                  </HStack>
                </Center>
              </VStack>
            </HStack>
          </Center>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textSize: {
    textAlign: 'center',
    color: '#ddd',
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
  paddingForScore: {
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
      android: {
        paddingTop: 50,
      },
      default: {
        paddingTop: 10,
      }
      })

  },
  paddingForScoreZero: {
    ...Platform.select({
      ios: {
        paddingTop: 100,
      },
      android: {
        paddingTop: 50,
      },
      default: {
        paddingTop: 100,
      }
      })

  },
  subTimes: {
    color: '#fff',
    fontSize: 10,
    padding: 0,
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
  }
})

export default Stopwatch;


/*{stopTimer === false && secondsElapsed > 0 &&
  <Button _text={{textAlign: 'right'}} size="sm" p="0" variant="link" onPress={() => pauseTime()}>
  Pause
  </Button>
}
{stopTimer === true && secondsElapsed > 0 &&
  <Button _text={{textAlign: 'right'}} size="sm"  p="0" variant="link" onPress={() => startTimer()}>
  Play
  </Button>
}
*/

/*

add back in if i want to try edit time during a live game:

{secondsElapsed > 0 &&
  <Button pl="2" pt="0" pr="0" variant="unstyled" onPress={() => editTime()}>
    <HStack style={{paddingTop: 10}}>
    <Center pl="0" style={{height: 16}}>
      <Text style={{color: '#fff', fontSize: 14, textDecorationLine: 'underline'}}>
      Edit
      </Text>
      </Center>
    </HStack>
  </Button>
}
*/

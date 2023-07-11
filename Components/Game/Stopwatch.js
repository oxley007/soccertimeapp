import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateStopwatch } from '../../Reducers/stopwatch';

import KickOff from './KickOff.js';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const Stopwatch = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getHalf, setHalf] = useState([]);
  const [getHalfTime, setHalfTime] = useState([{textOne: '', textTwo: ''}]);
  const [getScore, setScore] = useState([{homeTeam: 0, awayTeam: 0}]);

  //let teamNames = useSelector(state => state.teamNames.teamNames);
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

  let halfStr = ''
  let halfTimeFlag = 0
  let halfTimeStr = ''

  useEffect(() => {

      const firstHalf = games[0].firstHalf
      const secondHalf = games[0].secondHalf
      //console.log(games[0].firstHalf + ' hi ya ? games[0].firstHalf');
      //console.log(firstHalf + ' hi ya ? firstHalf');

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

      if (halfTimeFlag === 0) {
        //console.log('now, am i hit hmm?');
        halfTimeStr = 'H1'
        setHalfTime([{textOne: '1st', textTwo: 'Half'}])
      }
      else if (halfTimeFlag === 1) {
        halfTimeStr = 'HT'
        setHalfTime([{textOne: 'Half', textTwo: 'Time'}])
      }
      else {
        halfTimeStr = 'H2'
        setHalfTime([{textOne: '2nd', textTwo: 'Half'}])
      }


  },[sixtySecondsMark])

  useEffect(() => {

    const homeTeamScore = games[0].score.homeTeam
    const awayTeamScore = games[0].score.awayTeam

    setScore([{homeTeam: homeTeamScore, awayTeam: awayTeamScore}]);

  },[games[0].score.homeTeam, games[0].score.awayTeam])


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


        return (
            <HStack>
            <VStack>
            <Box minW="13%">
          <Text></Text>
          </Box>
          </VStack>
              <VStack>
              <Box minW="50%">
              <Center>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '600'}}><Text style={{fontSize: 20, color: '#eee', fontWeight: '500'}}>{games[0].teamNames.homeTeamShortName} </Text> <Text style={{backgroundColor: '#000'}}> {getScore[0].homeTeam} </Text> <Text style={{fontSize: 16, color: '#eee'}}>vs</Text> <Text style={{backgroundColor: '#000'}}> {getScore[0].awayTeam} </Text> <Text style={{fontSize: 20, color: '#eee'}}> {games[0].teamNames.awayTeamShortName}</Text></Text>
            </Center>
            </Box>
            </VStack>
              <VStack>
              <Box minW="15%" ml="4" mr="2">
                <Text style={{fontSize: 18, textAlign: 'right', color: '#fff'}} color="primary.400">{formattedSeconds(secondsElapsed)}

                </Text>
                {stopTimer === false && secondsElapsed > 0 &&
                  <Button _text={{textAlign: 'right'}} size="sm" p="0" variant="link" onPress={() => pauseTime()}>
                  Pause
                  </Button>
                }
                {stopTimer === true && secondsElapsed > 0 &&
                  <Button _text={{textAlign: 'right'}} size="sm"  p="0" variant="link" onPress={() => startTimer()}>
                  Play
                  </Button>
                }
                </Box>
                </VStack>
                <VStack>
                <Box minW="17%" ml="0">
                <Text style={{textAlign: 'left', color: '#ddd', lineHeight: 0}} fontSize="xs" color="primary.900"> {getHalfTime[0].textOne}</Text>
                <Text style={{textAlign: 'left', color: '#ddd', lineHeight: 0}} fontSize="xs" color="primary.900"> {getHalfTime[0].textTwo}</Text>
                </Box>
                </VStack>

              </HStack>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default Stopwatch;

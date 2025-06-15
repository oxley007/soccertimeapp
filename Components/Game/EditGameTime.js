import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateStopwatch } from '../../Reducers/stopwatch';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const EditGameTime = (props)=>{

  const [gameTime, setGameTime] = useState(0);

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

  const addGameTimeSelect = (value: string) => {

    let valueInt = Number(value)
    valueInt = valueInt * 60
    setGameTime(valueInt)

  }

  const changeTime = () => {

    const valueInt = 0
    setGameTime(valueInt)
    games[0].gameHalfTime = 600
    dispatch(updateGames(games))

  }

  const continueSetup = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }
 //console.log(JSON.stringify(_games) + ' chcking _games here ok.');

    let valueInt = gameTime
    valueInt = valueInt + 1
    //valueInt = valueInt * 60
    const valueIntMinusOne = valueInt - 1
    //setGameTime(valueInt)
    //games[0].gameHalfTime = valueInt

 //console.log(_games[0].gameHalfTime + ' games[0].gameHalfTime');
 //console.log(valueInt + ' valueInt is?');
 //console.log(_games[0].halfTime + ' games[0].halfTime is?');

    if (valueInt > _games[0].gameHalfTime ) {
   //console.log('himt game cahnge time 1');
      _games[0].firstHalf = false
      _games[0].secondHalf = true
      _games[0].halfTime = 3

    }
    else if (games[0].halfTime === 3 && (valueInt <= _games[0].gameHalfTime)) {
   //console.log('himt game cahnge time 2');
      _games[0].firstHalf = true
      _games[0].secondHalf = false
      _games[0].halfTime = 1
    }
    else if (games[0].halfTime === 4 && (valueInt <= _games[0].gameHalfTime)) {
   //console.log('himt game cahnge time 3');
      _games[0].firstHalf = true
      _games[0].secondHalf = false
      _games[0].halfTime = 1
    }
    else if (games[0].halfTime === 4 && (valueInt > _games[0].gameHalfTime)) {
   //console.log('himt game cahnge time 4');
      _games[0].firstHalf = false
      _games[0].secondHalf = true
      _games[0].halfTime = 3
    }

 //console.log(_games[0].halfTime + ' games[0].halfTime is 2?');

 //console.log(valueInt + ' what is valueInt thanks.');


    dispatch(updateStopwatch(
      valueInt,
      laps,
      lastClearedIncrementer,
      incrementer,
      avgBall,
      valueInt,
      stopTimer,
      pauseTimer
    ))

  //console.log(JSON.stringify(_games[0]) + ' _games[0] check before store.');
  //console.log(JSON.stringify(_games) + ' _games check before store.');

    //const gameStore = _games

    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb
 //console.log(valueInt + ' is valueInt going to be secondsElapsed');
    _games[0].secondsElapsed = valueInt

    dispatch(updateGames(_games))

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: _games[0],
     })

    const teamId = games[0].teamId
    const teamIdCode = games[0].teamIdCode

    navigate('SeasonPositionSortAllHome', {
      teamId: teamId,
      teamIdCode: teamIdCode,
      fromContinue: 1
    });

  }

  const exitSetup = () => {

    const teamId = games[0].teamId
    const teamIdCode = games[0].teamIdCode

    navigate('SeasonPositionSortAllHome', {
      teamId: teamId,
      teamIdCode: teamIdCode,
    });

  }


  //onValueChange={itemValue => setService(itemValue)}

  return (

    <Center>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
      <Container ml="4" mr="4" minW="90%" minH="100%">
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
        <Heading mb="2" mt="2" style={{color: '#fff'}}>Edit Game Time</Heading>
        </LinearGradient>
        <Box shadow="7" minW="100%">
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
        <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
          Edit the current game-time by selecting how far through the game is in minutes.
        </Text>
        {gameTime === 0 &&
          <Center>
          <Box maxW="100%">
            <Select selectedValue={gameTime} minWidth="100%" bg="#fff" accessibilityLabel="Select Game-Time" placeholder="Select Game-Time" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1}  onValueChange={addGameTimeSelect.bind(this)} >
              <Select.Item label="1min" value="1" />
              <Select.Item label="2min" value="2" />
              <Select.Item label="3min" value="3" />
              <Select.Item label="4min" value="4" />
              <Select.Item label="5min" value="5" />
              <Select.Item label="6min" value="6" />
              <Select.Item label="7min" value="7" />
              <Select.Item label="8min" value="8" />
              <Select.Item label="9min" value="9" />
              <Select.Item label="10min" value="10" />
              <Select.Item label="11min" value="11" />
              <Select.Item label="12min" value="12" />
              <Select.Item label="13min" value="13" />
              <Select.Item label="14min" value="14" />
              <Select.Item label="15min" value="15" />
              <Select.Item label="16min" value="16" />
              <Select.Item label="17min" value="17" />
              <Select.Item label="18min" value="18" />
              <Select.Item label="19min" value="19" />
              <Select.Item label="20min" value="20" />
              <Select.Item label="21min" value="21" />
              <Select.Item label="22min" value="22" />
              <Select.Item label="23min" value="23" />
              <Select.Item label="24min" value="24" />
              <Select.Item label="25min" value="25" />
              <Select.Item label="26min" value="26" />
              <Select.Item label="27min" value="27" />
              <Select.Item label="28min" value="28" />
              <Select.Item label="29min" value="29" />
              <Select.Item label="30min" value="30" />
              <Select.Item label="31min" value="31" />
              <Select.Item label="32min" value="32" />
              <Select.Item label="33min" value="33" />
              <Select.Item label="34min" value="34" />
              <Select.Item label="35min" value="35" />
              <Select.Item label="36min" value="36" />
              <Select.Item label="37min" value="37" />
              <Select.Item label="38min" value="38" />
              <Select.Item label="39min" value="39" />
              <Select.Item label="40min" value="40" />
              <Select.Item label="41min" value="41" />
              <Select.Item label="42min" value="42" />
              <Select.Item label="43min" value="43" />
              <Select.Item label="44min" value="44" />
              <Select.Item label="45min" value="45" />
              <Select.Item label="46min" value="46" />
              <Select.Item label="47min" value="47" />
              <Select.Item label="48min" value="48" />
              <Select.Item label="49min" value="49" />
              <Select.Item label="50min" value="50" />
              <Select.Item label="51min" value="51" />
              <Select.Item label="52min" value="52" />
              <Select.Item label="53min" value="53" />
              <Select.Item label="54min" value="54" />
              <Select.Item label="55min" value="55" />
              <Select.Item label="56min" value="56" />
              <Select.Item label="57min" value="57" />
              <Select.Item label="58min" value="58" />
              <Select.Item label="59min" value="59" />
              <Select.Item label="60min" value="60" />
              <Select.Item label="61min" value="61" />
              <Select.Item label="62min" value="62" />
              <Select.Item label="63min" value="63" />
              <Select.Item label="64min" value="64" />
              <Select.Item label="65min" value="65" />
              <Select.Item label="66min" value="66" />
              <Select.Item label="67min" value="67" />
              <Select.Item label="68min" value="68" />
              <Select.Item label="69min" value="69" />
              <Select.Item label="70min" value="70" />
              <Select.Item label="71min" value="71" />
              <Select.Item label="72min" value="72" />
              <Select.Item label="73min" value="73" />
              <Select.Item label="74min" value="74" />
              <Select.Item label="75min" value="75" />
              <Select.Item label="76min" value="76" />
              <Select.Item label="77min" value="77" />
              <Select.Item label="78min" value="78" />
              <Select.Item label="79min" value="79" />
              <Select.Item label="80min" value="80" />
              <Select.Item label="81min" value="81" />
              <Select.Item label="82min" value="82" />
              <Select.Item label="83min" value="83" />
              <Select.Item label="84min" value="84" />
              <Select.Item label="85min" value="85" />
              <Select.Item label="86min" value="86" />
              <Select.Item label="87min" value="87" />
              <Select.Item label="88min" value="88" />
              <Select.Item label="89min" value="89" />
              <Select.Item label="90min" value="90" />
            </Select>
          </Box>
          </Center>
        }
        {gameTime > 0 &&
          <Box>
          <HStack>
          <Text style={{paddingTop: 5, color: '#fff'}}>Time for each half: {formattedSeconds(gameTime)}min</Text>
          <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline"}} variant="link" onPress={() => changeTime()}>Change time</Button>
          </HStack>
          </Box>
        }

        </LinearGradient>
        </Box>

        <Box minW="100%" safeAreaTop alignSelf="center">
          <HStack alignItems="center" safeAreaBottom shadow={6}>
            <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Save Time</Button>
            <Button pt="5" minW="100%" bg="transparent" size="sm" _text={{fontSize: "sm"}} variant="subtle" onPress={() => exitSetup()}>Exit</Button>
          </HStack>



        </Box>
      </Container>
    </LinearGradient>
  </Center>


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
    marginTop: 30
  },
  linearGradientBg: {
    minWidth: '100%',
    width: '100%'
  },
  linearGradientHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 15,
    marginBottom: 15,
    borderColor: '#fff',
    borderWidth: 1,
  },
})

export default EditGameTime;

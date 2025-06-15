import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, useAnimatedValue } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import * as Animatable from 'react-native-animatable';

import { updateGames } from '../../Reducers/games';
import { updatePlayerIndex } from '../../Reducers/playerIndex';

const EventsTimeSubTime = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getTime, setTime] = useState([]);
  const [getPercent, setPercent] = useState([]);
  const [getFwdTime, setFwdTime] = useState([]);
  const [getFwdPercent, setFwdPercent] = useState([]);
  const [getMidTime, setMidTime] = useState([]);
  const [getMidPercent, setMidPercent] = useState([]);
  const [getDefTime, setDefTime] = useState([]);
  const [getDefPercent, setDefPercent] = useState([]);
  const [getGolTime, setGolTime] = useState([]);
  const [getGolPercent, setGolPercent] = useState([]);
  const [getSubTime, setSubTime] = useState([]);
  const [getSubPercent, setSubPercent] = useState([]);
  const [getTotalTimeAll, setTotalTimeAll] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  //let playerIndexStore = useSelector(state => state.playerIndex.playerIndex)
  //let isVisible = useSelector(state => state.playerIndex.playerIndex)
  let reduxValue = useSelector(state => state.playerIndex.playerIndex)
  //let someValue = useSelector(state => state.playerIndex.playerIndex)
  //const someValue = useSelector((state) => state.someValue); // Access Redux value
  let userProfile = useSelector(state => state.userProfile.userProfile);



  //const fadeAnim = new Animated.Value(0.5);
  //const fadeAnim = useRef(new Animated.Value(0)).current;
  //const anim = useRef(new Animated.Value(0));

  //const fadeInValue = new Animated.Value(0); // Initialize opacity to 0


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const playerData = props.playerData

  let fwdTimeArray = []
  let midTimeArray = []
  let defTimeArray = []
  let golTimeArray = []
  let subTimeArray = []

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)

    /*
    useEffect(() => {
    // Simulate a value change after 3 seconds (replace with your logic)
    setTimeout(() => {
      //dispatch(updateValue(5)); // Change value to any number to trigger fade-in
      dispatch(updatePlayerIndex(5))
    }, 3000);
  }, [dispatch]);
  */

  /*
    // Trigger the fade-in animation when the Redux state value changes to true
    useEffect(() => {
      console.log('hit now ok hmm 0');
      //fadeInValue.setValue(0);
      if (isVisible >= 0) {
        console.log('hit now ok hmm.');
        // Animate the opacity from 0 to 1 (fade-in)
        Animated.timing(fadeInValue, {
          toValue: 1,
          duration: 1000, // Duration of the fade-in effect (1 second)
          useNativeDriver: true, // Enable native driver for better performance
        }).start();
      } else {
        console.log('hit now ok hmm 2.');
        // Reset the opacity to 0 (fade-out when value is false)
        fadeInValue.setValue(0);
      }
    }, [props.playerIndex, isVisible]); // Run the effect when isVisible changes
    */

  useEffect(() => {
    console.log('we getting hit in here?');
    console.log(JSON.stringify(props.playerData) + ' props.playerData is new ??');
    //console.log(playerData.postionTimes.sub + ' playerData.postionTimes.sub is');
    try {
    //console.log(JSON.stringify(playerData.postionTimes.fwd) + ' playerData firsy fws check.');
      props.playerData.postionTimes.fwd.map(fwd => {
        const totalTime = getPositionTimes(fwd)
        fwdTimeArray.push({totalTime})
      })
    }
    catch {
    //console.log('this is a hit playerData firsy fws check');
      const totalTime = 0
      fwdTimeArray.push({totalTime})
    }

    try {
    //console.log(JSON.stringify(playerData.postionTimes.mid) + ' firsy mid check new.');
      props.playerData.postionTimes.mid.map(mid => {
      //console.log(mid + ' mid check.');
        const totalTime = getPositionTimes(mid)
        midTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      midTimeArray.push({totalTime})
    }

    try {
    //console.log(JSON.stringify(props.playerData.postionTimes.def) + ' firsy def check new.');
      props.playerData.postionTimes.def.map(def => {
      //console.log(def + ' mid check.');
        const totalTime = getPositionTimes(def)
        defTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      defTimeArray.push({totalTime})
    }

    try {
    //console.log(JSON.stringify(props.playerData.postionTimes.gol) + ' firsy gol check new.');
      props.playerData.postionTimes.gol.map(gol => {
      //console.log(gol + ' gol check.');
        const totalTime = getPositionTimes(gol)
        golTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      golTimeArray.push({totalTime})
    }

    try {
    //console.log(JSON.stringify(props.playerData.postionTimes.sub) + ' firsy sub check new.');
      props.playerData.postionTimes.sub.map(sub => {
      //console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        console.log(totalTime + ' sub totalTime');
        subTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push({totalTime})
    }

    const totalTime = getTotalTime(fwdTimeArray, midTimeArray, defTimeArray, golTimeArray)
    //const totalTimeAll = getTotalTime(fwdTimeArray, midTimeArray, defTimeArray, golTimeArray, subTimeArray)
    const totalPercent = getTotalPercent(totalTime)

    setTime(totalTime)
    setPercent(totalPercent)
    setTotalTimeAll(sixtySecondsMark)

    const fwdTotalTime = getTotalTime(fwdTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const fwdTotalPercent = getTotalPercent(fwdTotalTime)
    setFwdTime(fwdTotalTime)
    setFwdPercent(fwdTotalPercent)

    const midTotalTime = getTotalTime(midTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const midTotalPercent = getTotalPercent(midTotalTime)
    setMidTime(midTotalTime)
    setMidPercent(midTotalPercent)

    const defTotalTime = getTotalTime(defTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const defTotalPercent = getTotalPercent(defTotalTime)
    setDefTime(defTotalTime)
    setDefPercent(defTotalPercent)

    const golTotalTime = getTotalTime(golTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const golTotalPercent = getTotalPercent(golTotalTime)
    setGolTime(golTotalTime)
    setGolPercent(golTotalPercent)

    const subTotalTime = getTotalTime(subTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    console.log(subTotalTime + ' subTotalTime is whay now huh?');
    const subTotalPercent = getTotalPercent(subTotalTime)
    console.log(JSON.stringify(props.gameData) + ' what is props.gameData here?');
    console.log(props.gameData.game.secondsElapsed + ' what is props.gameData.game.secondsElapsed here?');
    console.log(props.gameData.game.sixtySecondsMark + ' what is props.gameData.game.sixtySecondsMark here?');
    console.log(subTotalPercent + ' subTotalPercent is?');
    setSubTime(subTotalTime)
    setSubPercent(subTotalPercent)

  },[props.gameData.game.secondsElapsed, props.gameData.game.gameEvents.length, props.gameData.game.sixtySecondsMark, sixtySecondsMark])

  const showTimeStats = (subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString) => {

    console.log(getSubPercent + ' getSubPercent here hcek.');
    console.log(props.gameData.game.sixtySecondsMark + ' props.gameData.game.sixtySecondsMark here hcek.');

    if ((getSubPercent <= 100 && props.gameData.game.sixtySecondsMark > 1 && userProfile !== 2) || (getSubPercent <= 100 && sixtySecondsMark > 1 && userProfile === 2)) {
    return (
      <Box>

      <HStack minW="100%" style={{borderRadius: 5, overflow: 'hidden'}}>
        <View style={styles.percent(subTotalPercentString)}>
          {getSubPercent >= 5 && getSubPercent < 20 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>{subTotalPercentString}</Text>
          }
          {getSubPercent >= 20 && getSubPercent < 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Sub {subTotalPercentString}</Text>
          }
          {getSubPercent >= 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Sub {subTotalPercentString}</Text>
          }
        </View>
        <View style={styles.percentFwd(fwdTotalPercentString)}>
          {getFwdPercent >= 5 && getFwdPercent < 20 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>{fwdTotalPercentString}</Text>
          }
          {getFwdPercent >= 20 && getFwdPercent < 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Fwd {fwdTotalPercentString}</Text>
          }
          {getFwdPercent >= 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Fwd {fwdTotalPercentString}</Text>
          }
        </View>
        <View style={styles.percentMid(midTotalPercentString)}>
          {getMidPercent >= 5 && getMidPercent < 20 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500', fontWeight: '500'}}>{midTotalPercentString}</Text>
          }
          {getMidPercent >= 20 && getMidPercent < 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500', fontWeight: '500'}}>Mid {midTotalPercentString}</Text>
          }
          {getMidPercent >= 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500', fontWeight: '500'}}>Mid {midTotalPercentString}</Text>
          }
        </View>

        <View style={styles.percentDef(defTotalPercentString)}>
          {getDefPercent >= 5 && getDefPercent < 20 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>{defTotalPercentString}</Text>
          }
          {getDefPercent >= 20 && getDefPercent < 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Def {defTotalPercentString}</Text>
          }
          {getDefPercent >= 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Def {defTotalPercentString}</Text>
          }
        </View>

        <View style={styles.percentGoalie(golTotalPercentString)}>
          {getGolPercent >= 5 && getGolPercent < 20 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>{golTotalPercentString}</Text>
          }
          {getGolPercent >= 20 && getGolPercent < 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Gol {golTotalPercentString}</Text>
          }
          {getGolPercent >= 35 &&
            <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Gol {golTotalPercentString}</Text>
          }
        </View>

        </HStack>
      <Text style={{fontSize: 12, color: '#ccc'}}>(Updated every minute)</Text>
      </Box>
    )
  }
  else if (props.gameData.game.secondsElapsed === 0 || props.gameData.game.sixtySecondsMark === 0 && userProfile !== 2) {
    return (
        <Box>
          <HStack style={{borderRadius: 5, overflow: 'hidden'}}>
              <View style={styles.percent('100%')}>
                  <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Game-Time 0% (0min)</Text>
              </View>
          </HStack>
        </Box>
        )
  }
  else if (secondsElapsed === 0 || sixtySecondsMark === 0 && userProfile === 2) {
    return (
        <Box>
          <HStack style={{borderRadius: 5, overflow: 'hidden'}}>
              <View style={styles.percent('100%')}>
                  <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Game-Time 0% (0min)</Text>
              </View>
          </HStack>
        </Box>
        )
  }
  else {
    return (
      <Text style={{fontSize: 12, color: '#fff', lineHeight: 12}}>Game complete. Please view player sub time from 'View Player Stats & Game-TIme Played' on the homepage.</Text>
    )
  }

  }

  const sortAnimatedView = (subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString) => {
    return (
      <Box>

          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}

    </Box>
    )
  }

  const getTotalTime = (timeArrayOne, timeArrayTwo, timeArrayThree, timeArrayFour) => {
    //let allArrays = []
    const allArrays = [
      timeArrayOne,
      timeArrayTwo,
      timeArrayThree,
      timeArrayFour
    ]
    const allTimes = allArrays.flat(1);
  //console.log(JSON.stringify(allTimes)  + ' JSON.stringify(allTimes) check.');
    const posTotalTime = allTimes.reduce((a,v) =>  a = a + v.totalTime , 0 )
    return posTotalTime
  }

  const getPositionTimes = (pos) => {

  //console.log(pos.st + ' checking fwd.st');
  //console.log(pos.fin + ' checking fwd.fin');
  try {
    startTime = pos.st
    endTime = pos.fin
  }
  catch {
    startTime = 0
    endTime = 0
  }


  if (endTime === 99999999) {
  //console.log(sixtySecondsMark + ' check sixtySecondsMark');
    //endTime = sixtySecondsMark
    if (props.whereFrom === 'supportersLive') {
      endTime = sixtySecondsMark
    }
    else {
      endTime = props.gameData.game.sixtySecondsMark
    }

  }


  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalPercent = (posTotalTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)

      if (props.whereFrom === 'supportersLive') {
        posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      }
      else {
        posPercent = ((posTotalTime / props.gameData.game.sixtySecondsMark) * 100).toFixed(0)
      }


    }
    catch {
      posPercent = 0
    }


    if (isNaN(posPercent)) {
      posPercent = 0
    }

    return posPercent

  }

  let subTotalPercentString = '0%'

  let totalPercentString = '0%'

  let fwdTotalPercentString = '0%'

  let midTotalPercentString = '0%'

  let defTotalPercentString = '0%'

  let golTotalPercentString = '0%'


  subTotalPercentString = getSubPercent.toString();
  subTotalPercentString = subTotalPercentString + '%'
   totalPercentString = getPercent.toString();
  totalPercentString = totalPercentString + '%'
   fwdTotalPercentString = getFwdPercent.toString();
  fwdTotalPercentString = fwdTotalPercentString + '%'
   midTotalPercentString = getMidPercent.toString();
  midTotalPercentString = midTotalPercentString + '%'
   defTotalPercentString = getDefPercent.toString();
  defTotalPercentString = defTotalPercentString + '%'
  //console.log(getGolPercent + ' getGolPercent before sending.');
  golTotalPercentString = getGolPercent.toString();
  golTotalPercentString = golTotalPercentString + '%'

  console.log(subTotalPercentString + ' subTotalPercentString this one now checking ok hu before event')
  console.log(totalPercentString + ' totalPercentString this one now checking ok hu before event')
  console.log(fwdTotalPercentString + ' fwdTotalPercentString this one now checking ok hu before event')
  console.log(midTotalPercentString + ' midTotalPercentString this one now checking ok hu before event')
  console.log(defTotalPercentString + ' defTotalPercentString this one now checking ok hu before event')
  console.log(golTotalPercentString + ' golTotalPercentString this one now checking ok hu before event')

  if (subTotalPercentString === '%') {
    subTotalPercentString = '0%'
  }

  if (totalPercentString === '%') {
    totalPercentString = '0%'
  }

  if (fwdTotalPercentString === '%') {
    fwdTotalPercentString = '0%'
  }

  if (midTotalPercentString === '%') {
    midTotalPercentString = '0%'
  }

  if (defTotalPercentString === '%') {
    defTotalPercentString = '0%'
  }

  if (golTotalPercentString === '%') {
    golTotalPercentString = '0%'
  }

  console.log(subTotalPercentString + ' subTotalPercentString this one now checking ok hu event')
  console.log(totalPercentString + ' totalPercentString this one now checking ok hu event')
  console.log(fwdTotalPercentString + ' fwdTotalPercentString this one now checking ok hu event')
  console.log(midTotalPercentString + ' midTotalPercentString this one now checking ok hu event')
  console.log(defTotalPercentString + ' defTotalPercentString this one now checking ok hu event')
  console.log(golTotalPercentString + ' golTotalPercentString this one now checking ok hu event')

    console.log(getSubTime + ' getSubTime here ok thanks.');

    return (

      <Box pt="1" maxW="100%">
        <Text style={{color: '#fff', fontSize: 24, lineHeight: 24}}>{props.playerData.playerName}</Text>
        {sortAnimatedView(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}

        </Box>

    )

    }



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  percent: percentTotal => ({
    minWidth: percentTotal,
    maxWidth: percentTotal,
    backgroundColor: '#34d399',
    //height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'left',
    justifyContent: 'center',
  }),
  percentFwd: percentTotal => ({
    minWidth: percentTotal,
    maxWidth: percentTotal,
    backgroundColor: '#cffafe',
    //height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'left',
    justifyContent: 'center',
  }),
  percentMid: percentTotal => ({
    minWidth: percentTotal,
    maxWidth: percentTotal,
    backgroundColor: '#fef9c3',
    //height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'left',
    justifyContent: 'center',
  }),
  percentDef: percentTotal => ({
    minWidth: percentTotal,
    maxWidth: percentTotal,
    backgroundColor: '#fed7aa',
    //height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'left',
    justifyContent: 'center',
  }),
  percentGoalie: percentTotal => ({
    minWidth: percentTotal,
    maxWidth: percentTotal,
    backgroundColor: '#f5d0fe',
    //height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'left',
    justifyContent: 'center',
  }),
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
    opacity: 0,
  },
})

export default EventsTimeSubTime;

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

const GameTimeSubTime = (props)=>{

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
  const eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);
  const userProfile = useSelector(state => state.userProfile.userProfile);
  let fromContinueGame = useSelector(state => state.fromContinueGame.fromContinueGame);



  //const fadeAnim = new Animated.Value(0.5);
  //const fadeAnim = useRef(new Animated.Value(0)).current;
  //const anim = useRef(new Animated.Value(0));

  //const fadeInValue = new Animated.Value(0); // Initialize opacity to 0


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData

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
    try {
    //console.log(JSON.stringify(playerData.postionTimes.fwd) + ' playerData firsy fws check.');
      playerData.postionTimes.fwd.map(fwd => {
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
      playerData.postionTimes.mid.map(mid => {
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
    //console.log(JSON.stringify(playerData.postionTimes.def) + ' firsy def check new.');
      playerData.postionTimes.def.map(def => {
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
    //console.log(JSON.stringify(playerData.postionTimes.gol) + ' firsy gol check new.');
      playerData.postionTimes.gol.map(gol => {
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
    //console.log(JSON.stringify(playerData.postionTimes.sub) + ' firsy sub check new.');
      playerData.postionTimes.sub.map(sub => {
      //console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        subTimeArray.push({totalTime})
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push({totalTime})
    }

    //console.log('totalTime hit');
    const totalTime = getTotalTime(fwdTimeArray, midTimeArray, defTimeArray, golTimeArray)
    //console.log(totalTime + ' what is total time from the top.');
    //const totalTimeAll = getTotalTime(fwdTimeArray, midTimeArray, defTimeArray, golTimeArray, subTimeArray)
    const totalPercent = getTotalPercent(totalTime)

    setTime(totalTime)
    setPercent(totalPercent)
    let tempSixtySecondsMark = sixtySecondsMark
    if (games[0].gameSetupProfile !== currentUser.uid) {
      //console.log('hitting, ja.');
        tempSixtySecondsMark = props.gameSecondsElapsed
    }
    else {
      tempSixtySecondsMark = sixtySecondsMark
    }
    setTotalTimeAll(tempSixtySecondsMark)

    //console.log('fwdTotalTime hit');
    const fwdTotalTime = getTotalTime(fwdTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const fwdTotalPercent = getTotalPercent(fwdTotalTime)
    setFwdTime(fwdTotalTime)
    setFwdPercent(fwdTotalPercent)

    //console.log('midTotalTime hit');
    const midTotalTime = getTotalTime(midTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const midTotalPercent = getTotalPercent(midTotalTime)
    setMidTime(midTotalTime)
    setMidPercent(midTotalPercent)

    //console.log('defTotalTime hit');
    const defTotalTime = getTotalTime(defTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const defTotalPercent = getTotalPercent(defTotalTime)
    setDefTime(defTotalTime)
    setDefPercent(defTotalPercent)

    //console.log('golTotalTime hit');
    //console.log('golTimeArray checky doo ' + JSON.stringify(golTimeArray));
    const golTotalTime = getTotalTime(golTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    //console.log(golTotalTime + ' golTotalTime ya,');
    const golTotalPercent = getTotalPercent(golTotalTime)
    //console.log(golTotalPercent + ' golTotalPercent ya,,');
    setGolTime(golTotalTime)
    setGolPercent(golTotalPercent)

    //console.log('subTotalTime hit');
    const subTotalTime = getTotalTime(subTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const subTotalPercent = getTotalPercent(subTotalTime)
    setSubTime(subTotalTime)
    setSubPercent(subTotalPercent)

  },[sixtySecondsMark, props.playerData.id, eventsVersion])

  const showTimeStats = (subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString) => {


    if (games[0].gameSetupProfile === currentUser.uid) {

      return (
        <Box>
        {sixtySecondsMark > 1 &&
        <HStack minW="100%" style={{borderRadius: 5, overflow: 'hidden'}}>
          <View style={styles.percent(subTotalPercentString)}>
            {getSubPercent >= 5 && getSubPercent < 20 &&
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>{subTotalPercentString}</Text>
            }
            {getSubPercent >= 20 && getSubPercent < 35 &&
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Sub {subTotalPercentString}</Text>
            }
            {getSubPercent >= 35 &&
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Sub {subTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getSubTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Fwd {fwdTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getFwdTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500', fontWeight: '500'}}>Mid {midTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getMidTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Def {defTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getDefTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Gol {golTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getGolTime)}min)</Text></Text>
            }
          </View>

          </HStack>
          }
          {sixtySecondsMark === 0 &&
                <HStack style={{borderRadius: 5, overflow: 'hidden'}}>

                    <View style={styles.percent('100%')}>
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Game-Time 0% (0min)</Text>
                    </View>


                </HStack>
        }
        {fromContinueGame === 1 &&
          <Text style={{fontSize: 12, color: '#ccc'}}>(Updated every minute)</Text>
        }
        </Box>
      )
    }
    else {

      const tempSixtySecondsMark = props.gameSecondsElapsed
      //console.log(subTotalPercentString + ' subTotalPercentString test');
      //console.log(golTotalPercentString + ' golTotalPercentString test');
      //console.log(getGolPercent + ' getGolPercent test');
      //console.log(tempSixtySecondsMark + ' tempSixtySecondsMark test.');




      return (
        <Box>
        {tempSixtySecondsMark > 1 &&
        <HStack minW="100%" style={{borderRadius: 5, overflow: 'hidden'}}>
          <View style={styles.percent(subTotalPercentString)}>
            {getSubPercent >= 5 && getSubPercent < 20 &&
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>{subTotalPercentString}</Text>
            }
            {getSubPercent >= 20 && getSubPercent < 35 &&
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Sub {subTotalPercentString}</Text>
            }
            {getSubPercent >= 35 &&
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Sub {subTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getSubTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Fwd {fwdTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getFwdTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500', fontWeight: '500'}}>Mid {midTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getMidTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Def {defTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getDefTime)}min)</Text></Text>
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
              <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Gol {golTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(getGolTime)}min)</Text></Text>
            }
          </View>

          </HStack>
          }
          {tempSixtySecondsMark === 0 &&
                <HStack style={{borderRadius: 5, overflow: 'hidden'}}>

                    <View style={styles.percent('100%')}>
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 12, fontWeight: '500'}}>Game-Time 0% (0min)</Text>
                    </View>


                </HStack>
        }
        {fromContinueGame === 1 &&
          <Text style={{fontSize: 12, color: '#ccc'}}>(Updated every minute)</Text>
        }
        </Box>
      )
    }

  }

  const sortAnimatedView = (subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString) => {
    return (
      <Box>

      <Animatable.View
        animation={reduxValue === 0 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 0 ? 1 : 0 }} // Ensure it's visible after animation
      >
        {reduxValue === 0 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 1 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 1 ? 1 : 0 }} // Ensure it's visible after animation
      >
        {reduxValue === 1 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

          <Animatable.View
            animation={reduxValue === 2 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
            duration={500} // Animation duration (1 second)
            easing="ease-out"
            iterationCount="2"
            style={{ opacity: reduxValue === 2 ? 1 : 0 }} // Ensure it's visible after animation
          >
            {reduxValue === 2 && (
              <Box>
              {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
              </Box>
            )}
          </Animatable.View>

          <Animatable.View
        animation={reduxValue === 3 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 3 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 3 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
    </Animatable.View>

    <Animatable.View
        animation={reduxValue === 4 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 4 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 4 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 5 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 5 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 5 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
    </Animatable.View>

    <Animatable.View
      animation={reduxValue === 6 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
      duration={500} // Animation duration (1 second)
      easing="ease-out"
      iterationCount="2"
      style={{ opacity: reduxValue === 6 ? 1 : 0 }} // Ensure it's visible after animation
      >
      {reduxValue === 6 && (
        <Box>
        {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
        </Box>
      )}
    </Animatable.View>

    <Animatable.View
      animation={reduxValue === 7 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
      duration={500} // Animation duration (1 second)
      easing="ease-out"
      iterationCount="2"
      style={{ opacity: reduxValue === 7 ? 1 : 0 }} // Ensure it's visible after animation
      >
      {reduxValue === 7 && (
        <Box>
        {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
        </Box>
      )}
    </Animatable.View>


    <Animatable.View
      animation={reduxValue === 8 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
      duration={500} // Animation duration (1 second)
      easing="ease-out"
      iterationCount="2"
      style={{ opacity: reduxValue === 8 ? 1 : 0 }} // Ensure it's visible after animation
      >
      {reduxValue === 8 && (
        <Box>
        {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
        </Box>
      )}
    </Animatable.View>

    <Animatable.View
      animation={reduxValue === 9 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
      duration={500} // Animation duration (1 second)
      easing="ease-out"
      iterationCount="2"
      style={{ opacity: reduxValue === 9 ? 1 : 0 }} // Ensure it's visible after animation
      >
      {reduxValue === 9 && (
        <Box>
        {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
        </Box>
      )}
    </Animatable.View>

    <Animatable.View
      animation={reduxValue === 10 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
      duration={500} // Animation duration (1 second)
      easing="ease-out"
      iterationCount="2"
      style={{ opacity: reduxValue === 10 ? 1 : 0 }} // Ensure it's visible after animation
      >
      {reduxValue === 10 && (
        <Box>
        {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
        </Box>
      )}
    </Animatable.View>

    <Animatable.View
      animation={reduxValue === 11 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
      duration={500} // Animation duration (1 second)
      easing="ease-out"
      iterationCount="2"
      style={{ opacity: reduxValue === 11 ? 1 : 0 }} // Ensure it's visible after animation
      >
      {reduxValue === 11 && (
        <Box>
        {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
        </Box>
      )}
    </Animatable.View>

      <Animatable.View
        animation={reduxValue === 12 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 12 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 12 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 13 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 13 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 13 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 14 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 14 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 14 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 15 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 15 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 15 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 16 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 16 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 16 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 17 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 17 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 17 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 18 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 18 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 18 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 19 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 19 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 19 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 20 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 20 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 20 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 21 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 21 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 21 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 22 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 22 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 22 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 23 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 23 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 23 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 24 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 24 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 24 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 25 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 25 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 25 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

      <Animatable.View
        animation={reduxValue === 26 ? 'pulse' : undefined} // Apply fadeIn animation if value is 2
        duration={500} // Animation duration (1 second)
        easing="ease-out"
        iterationCount="2"
        style={{ opacity: reduxValue === 26 ? 1 : 0 }} // Ensure it's visible after animation
        >
        {reduxValue === 26 && (
          <Box>
          {showTimeStats(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
          </Box>
        )}
      </Animatable.View>

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
  try {
      //console.log(props.gameSecondsElapsed + ' check props.gameSecondsElapsed');
  }
  catch {
    //console.log(' issue with check props.gameSecondsElapsed');
  }

    //endTime = sixtySecondsMark
    if (games[0].gameSetupProfile !== currentUser.uid) {
      //console.log('hitting, ja.');
        endTime = props.gameSecondsElapsed
    }
    else {
      endTime = secondsElapsed
    }

  }

  //console.log(endTime + ' endTime checky dooo');
  //console.log(startTime + ' startTime checky dooo');


  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalPercent = (posTotalTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      if (games[0].gameSetupProfile !== currentUser.uid) {
        //console.log('hitting, ja.');
          posPercent = ((posTotalTime / props.gameSecondsElapsed) * 100).toFixed(0)
      }
      else {
        posPercent = ((posTotalTime / secondsElapsed) * 100).toFixed(0)
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

  if (props.newDisplay === true) {

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

    //console.log(getSubTime + ' getSubTime here ok thanks.');

    console.log(subTotalPercentString + ' subTotalPercentString this one now checking ok hu before')
    console.log(totalPercentString + ' totalPercentString this one now checking ok hu before')
    console.log(fwdTotalPercentString + ' fwdTotalPercentString this one now checking ok hu before')
    console.log(midTotalPercentString + ' midTotalPercentString this one now checking ok hu before')
    console.log(defTotalPercentString + ' defTotalPercentString this one now checking ok hu before')
    console.log(golTotalPercentString + ' golTotalPercentString this one now checking ok hu before')

    if (subTotalPercentString === '%') {
      console.log('we are a hitting in a here ah.');
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

    console.log(subTotalPercentString + ' subTotalPercentString this one now checking ok hu')
    console.log(totalPercentString + ' totalPercentString this one now checking ok hu')
    console.log(fwdTotalPercentString + ' fwdTotalPercentString this one now checking ok hu')
    console.log(midTotalPercentString + ' midTotalPercentString this one now checking ok hu')
    console.log(defTotalPercentString + ' defTotalPercentString this one now checking ok hu')
    console.log(golTotalPercentString + ' golTotalPercentString this one now checking ok hu')

    return (

      <Box pt="1">
        {sortAnimatedView(subTotalPercentString, totalPercentString, fwdTotalPercentString, midTotalPercentString, defTotalPercentString, golTotalPercentString)}
        </Box>

    )
  }
  else {

        return (
          <Text style={{color: '#fff', fontSize: 12, fontWeight: '500'}}>
              GameTime: {formattedSeconds(getTime)}min ({getPercent}%), SUB: {formattedSeconds(getSubTime)}min ({getSubPercent}%)
            </Text>
        )
      }
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

export default GameTimeSubTime;

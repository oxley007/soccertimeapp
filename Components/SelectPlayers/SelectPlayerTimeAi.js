import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, FlatList, VStack, HStack, Spacer } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import PositionTimes from '../../Util/PositionTimes.js';

import { updateGames } from '../../Reducers/games';

const SelectPlayerTimeAi = (props)=>{

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


  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
	let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  const eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);
  const parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  let userRef = firestore().collection(currentUser.uid);
  try {
    if (userProfile === 4) {
      //console.log('profile 4 is hit!');
      //console.log(parentCoachView + ' parentCoachView ID is?');
      userRef = firestore().collection(parentCoachView);
    }
    else {
      userRef = firestore().collection(currentUser.uid);
    }
  }
  catch {
    //do nothing.
  }

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60)

  //const whereFrom = props.whereFrom

  //const { navigate } = props.navigation;

  try {
  	useEffect(() => {

      console.log('check props.playerData data ' + JSON.stringify(props.playerData));

      const playerData = props.playerData

  		games[0].teamPlayers.map(player => {

        if (player.playerName === playerData.playerName) {

          let fwdTimeArray = []
          let midTimeArray = []
          let defTimeArray = []
          let golTimeArray = []
          let subTimeArray = []

    			const secondsElapsedTemp = games[0].secondsElapsed
    			//let naCount = 0

    			const positionTimesGet = PositionTimes.getPositionTime(player, secondsElapsedTemp, games[0].gameHalfTime, games[0].halfTime);
    			const positionTimesGetSecond = positionTimesGet[0];
    			//naCount = positionTimesGet[1];
    			//console.log(positionTimesGetSecond + ' positionTimesGetSecond what is?')

    			console.log('positionTimesGetSecond need to lookie ' + JSON.stringify(positionTimesGetSecond));

    			try {
    	    console.log(JSON.stringify(positionTimesGetSecond.postionTimes.fwd) + ' positionTimesGetSecond firsy fws check.');
    	      positionTimesGetSecond.postionTimes.fwd.map(fwd => {
    	        const totalTime = getPositionTimes(fwd)
    	        fwdTimeArray.push({totalTime})
    	      })
    	    }
    	    catch {
    	    console.log('this is a hit positionTimesGetSecond firsy fws check');
    	      const totalTime = 0
    	      fwdTimeArray.push({totalTime})
    	    }

    	    try {
    	    console.log(JSON.stringify(positionTimesGetSecond.postionTimes.mid) + ' firsy mid check new.');
    	      positionTimesGetSecond.postionTimes.mid.map(mid => {
    	      console.log(mid + ' mid check.');
    	        const totalTime = getPositionTimes(mid)
    	        midTimeArray.push({totalTime})
    	      })
    	    }
    	    catch {
    	      const totalTime = 0
    	      midTimeArray.push({totalTime})
    	    }

    	    try {
    	    console.log(JSON.stringify(positionTimesGetSecond.postionTimes.def) + ' firsy def check new.');
    	      positionTimesGetSecond.postionTimes.def.map(def => {
    	      console.log(def + ' mid check.');
    	        const totalTime = getPositionTimes(def)
    	        defTimeArray.push({totalTime})
    	      })
    	    }
    	    catch {
    	      const totalTime = 0
    	      defTimeArray.push({totalTime})
    	    }

          /*
    	    try {
    	    console.log(JSON.stringify(positionTimesGetSecond.postionTimes.gol) + ' firsy gol check new.');
    	      positionTimesGetSecond.postionTimes.gol.map(gol => {
    	      console.log(gol + ' gol check.');
    	        const totalTime = getPositionTimes(gol)
    	        golTimeArray.push({totalTime})
    	      })
    	    }
    	    catch {
    	      const totalTime = 0
    	      golTimeArray.push({totalTime})
    	    }
          */

    	    try {
    	    console.log(JSON.stringify(positionTimesGetSecond.postionTimes.sub) + ' firsy sub check new.');
    	      positionTimesGetSecond.postionTimes.sub.map(sub => {
    	      console.log(sub + ' sub check.');
    	        const totalTime = getPositionTimes(sub)
    	        subTimeArray.push({totalTime})
    	      })
    	    }
    	    catch {
    	      const totalTime = 0
    	      subTimeArray.push({totalTime})
    	    }

    	    console.log('totalTime hit');
    	    const totalTime = getTotalTime(fwdTimeArray, midTimeArray, defTimeArray)
    	    console.log(totalTime + ' what is total time from the top.');
    	    //const totalTimeAll = getTotalTime(fwdTimeArray, midTimeArray, defTimeArray, golTimeArray, subTimeArray)
    	    const totalPercent = getTotalPercent(totalTime)

    	    setTime(totalTime)
          console.log(totalTime + ' this is the total time for weach person.');
    	    setPercent(totalPercent)
    	    let tempSixtySecondsMark = sixtySecondsMark
    	    if (games[0].gameSetupProfile !== currentUser.uid) {
    	      console.log('hitting, ja.');
    	        tempSixtySecondsMark = secondsElapsedTemp
    	    }
    	    else {
    	      tempSixtySecondsMark = sixtySecondsMark
    	    }
    	    setTotalTimeAll(tempSixtySecondsMark)

    	    console.log('fwdTotalTime hit');
    	    const fwdTotalTime = getTotalTime(fwdTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    	    const fwdTotalPercent = getTotalPercent(fwdTotalTime)
    	    setFwdTime(fwdTotalTime)
    	    setFwdPercent(fwdTotalPercent)

    	    console.log('midTotalTime hit');
    	    const midTotalTime = getTotalTime(midTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    	    const midTotalPercent = getTotalPercent(midTotalTime)
    	    setMidTime(midTotalTime)
    	    setMidPercent(midTotalPercent)

    	    console.log('defTotalTime hit');
    	    const defTotalTime = getTotalTime(defTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    	    const defTotalPercent = getTotalPercent(defTotalTime)
    	    setDefTime(defTotalTime)
    	    setDefPercent(defTotalPercent)

    	    console.log('golTotalTime hit');
    	    console.log('golTimeArray checky doo ' + JSON.stringify(golTimeArray));
    	    const golTotalTime = getTotalTime(golTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    	    console.log(golTotalTime + ' golTotalTime ya,');
    	    const golTotalPercent = getTotalPercent(golTotalTime)
    	    console.log(golTotalPercent + ' golTotalPercent ya,,');
    	    setGolTime(golTotalTime)
    	    setGolPercent(golTotalPercent)

    	    console.log('subTotalTime hit');
    	    const subTotalTime = getTotalTime(subTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    	    const subTotalPercent = getTotalPercent(subTotalTime)
    	    setSubTime(subTotalTime)
    	    setSubPercent(subTotalPercent)


    			//games[0].teamPlayers[playerIndexRaw] = positionTimesGetSecond
        }

  		})


  	},[])
  }
  catch {
  	//do nothing.
  }

  const getTotalTime = (timeArrayOne, timeArrayTwo, timeArrayThree) => {
    //let allArrays = []
    const allArrays = [
      timeArrayOne,
      timeArrayTwo,
      timeArrayThree
    ]
    const allTimes = allArrays.flat(1);
  console.log(JSON.stringify(allTimes)  + ' JSON.stringify(allTimes) check.');
    const posTotalTime = allTimes.reduce((a,v) =>  a = a + v.totalTime , 0 )
    return posTotalTime
  }

  const getPositionTimes = (pos) => {

  console.log(pos.st + ' checking fwd.st');
  console.log(pos.fin + ' checking fwd.fin');
  try {
    startTime = pos.st
    endTime = pos.fin
  }
  catch {
    startTime = 0
    endTime = 0
  }


  if (endTime === 99999999) {
  console.log(sixtySecondsMark + ' check sixtySecondsMark');
  try {
      console.log(props.gameSecondsElapsed + ' check props.gameSecondsElapsed');
  }
  catch {
    console.log(' issue with check props.gameSecondsElapsed');
  }

    //endTime = sixtySecondsMark
    if (games[0].gameSetupProfile !== currentUser.uid) {
      console.log('hitting, ja.');
        endTime = props.gameSecondsElapsed
    }
    else {
      endTime = secondsElapsed
    }

  }

  console.log(endTime + ' endTime checky dooo');
  console.log(startTime + ' startTime checky dooo');


  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalPercent = (posTotalTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      if (games[0].gameSetupProfile !== currentUser.uid) {
        console.log('hitting, ja SelectPlayerTime.');
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

    return (
      <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#777', fontSize: 11}}>{formattedSeconds(getTime)}<Text style={{color: '#666', fontSize: 8}}>min</Text></Text>
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
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  linearGradientPush: {
    flex: 1,
    //paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    ...Platform.select({
      ios: {
        paddingLeft: 15,
      },
      android: {
        paddingLeft: 15,
      },
      default: {
        paddingLeft: 15,
      }
      })
  },
})

export default SelectPlayerTimeAi;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

const GameTimeSubTime = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getTime, setTime] = useState([]);
  const [getPercent, setPercent] = useState([]);
  const [getSubTime, setSubTime] = useState([]);
  const [getSubPercent, setSubPercent] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)

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

    const totalTime = getTotalTime(fwdTimeArray, midTimeArray, defTimeArray, golTimeArray)
    const totalPercent = getTotalPercent(totalTime)

    setTime(totalTime)
    setPercent(totalPercent)


    const subTotalTime = getTotalTime(subTimeArray, [{totalTime:0}], [{totalTime:0}], [{totalTime:0}])
    const subTotalPercent = getTotalPercent(subTotalTime)

    setSubTime(subTotalTime)
    setSubPercent(subTotalPercent)

  },[sixtySecondsMark])

  const getTotalTime = (timeArrayOne, timeArrayTwo, timeArrayThree, timeArrayFour) => {
    allArrays = [
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
    endTime = secondsElapsed
  }


  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalPercent = (posTotalTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      posPercent = ((posTotalTime / secondsElapsed) * 100).toFixed(0)
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
          <Text style={{color: '#fff', fontSize: 10}}>
              GT: {formattedSeconds(getTime)}min ({getPercent}%), SUB: {formattedSeconds(getSubTime)}min ({getSubPercent}%)
            </Text>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default GameTimeSubTime;

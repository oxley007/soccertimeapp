import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, VStack, Stack, HStack, Spacer } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

const AddPositions = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const { navigate } = props.navigation;
  const whereFrom = props.whereFrom;

  useEffect(() => {
    try {
    currentPosition = props.currentPosition
  }
  catch {
    currentPosition = 'NA'
  }
  }, [])

  const testOne = false

  let playerId = props.playerId
  ////console.log(playerId + ' checking here playerId');
  const playerRef = games[0].teamPlayers.findIndex(x => x.id === playerId);
  ////console.log(playerRef + ' checking here playerRef');
  let currentPosition = 'NA'
  try {
    currentPosition = games[0].teamPlayers[playerRef].currentPosition
  }
  catch {
    currentPosition = 'NA'
  }


  const addPosition = (newPosition) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    ////console.log(playerId + ' what is playerId?');

    ////console.log(playerRef + ' playerRef is??');

    //_games[0].teamPlayers.find(x => x.id === playerId).foo;


    ////console.log(JSON.stringify(_games[0]) + ' _games[0]');
    ////console.log(JSON.stringify(_games[0].teamPlayers) + ' _games[0].teamPlayers');
    ////console.log(_games[0].teamPlayers[playerRef] + ' _games[0].teamPlayers[playerRef]');
    ////console.log(_games[0].teamPlayers[playerRef].currentPosition + ' _games[0].teamPlayers[playerRef]');


    _games[0].teamPlayers[playerRef].currentPosition = newPosition
    const playerName = _games[0].teamPlayers[playerRef].playerName
    let subText = ''
    if (newPosition === 'fwd') {
        subText = playerName + " is now playing as a Forward"
    }
    else if (newPosition === 'mid') {
      subText = playerName + " is now playing Midfeild"
    }
    else if (newPosition === 'def') {
      subText = playerName + " is now playing as a Defender"
    }
    else if (newPosition === 'gol') {
      subText = playerName + " is now playing as Golie"
    }
    else if (newPosition === 'sub') {
      subText = playerName + " has been substituted off"
    }

    if (whereFrom === 1) {
      //try {
        if (newPosition === 'sub') {
          _games[0].gameEvents.push({eventType: 'sub', eventText: subText, eventTime: secondsElapsed})
        }
        else {
          _games[0].gameEvents.push({eventType: 'pos', eventText: subText, eventTime: secondsElapsed})
        }
        /*
      }
      catch {
        _games[0].gameEvents = []
        if (newPosition === 'sub') {
          _games[0].gameEvents.push({eventType: 'sub', eventText: subText, eventTime: secondsElapsed})
        }
        else {
          _games[0].gameEvents.push({eventType: 'pos', eventText: subText, eventTime: secondsElapsed})
        }
      }
      */
    }

    if (whereFrom !== 1) {
      _games[0].teamPlayers[playerRef].gameStats = [{gol: 0, asst: 0, defTac: 0, golSave: 0}]
    }

    dispatch(updateGames(_games))
    //currentPosition = newPosition

  }

  const removePosition = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    _games[0].teamPlayers[playerRef].currentPosition = 'NA'

    dispatch(updateGames(_games))
    //currentPosition = 'NA'

  }

        return (
          <Box>
        <Text style={{color: '#fff', textAlign: 'left'}}>Select Position:</Text>
        <HStack mb="2.5" mt="1.5" mx={{
        base: "auto",
        md: "0"
      }} minW="100%">
        {currentPosition !== 'fwd' &&
          <Button minW="16%" style={{borderRadius: 0}} size="xs" variant="outline" bg="#eee" onPress={() => addPosition('fwd')}>FWD</Button>
        }
        {currentPosition === 'fwd' &&
          <Button minW="16%" style={{borderRadius: 0, borderWidth: 2, borderColor: "#34d399"}} _text={{color: '#0891b2'}} size="xs" bg="primary.100" onPress={() => removePosition()}>FWD</Button>
        }
        {currentPosition !== 'mid' &&
          <Button minW="16%" style={{borderRadius: 0}} size="xs" variant="outline" bg="#eee" onPress={() => addPosition('mid')}>MID</Button>
        }
        {currentPosition === 'mid' &&
          <Button minW="16%" style={{borderRadius: 0, borderWidth: 2, borderColor: "#facc15"}} _text={{color: '#0891b2'}} size="xs" bg="yellow.100" onPress={() => removePosition()}>MID</Button>
        }
        {currentPosition !== 'def' &&
          <Button minW="16%" style={{borderRadius: 0}} size="xs" variant="outline" bg="#eee" onPress={() => addPosition('def')}>DEF</Button>
        }
        {currentPosition === 'def' &&
          <Button minW="16%" style={{borderRadius: 0, borderWidth: 2, borderColor: "#fb923c"}} _text={{color: '#0891b2'}} size="xs" bg="warning.200" onPress={() => removePosition()}>DEF</Button>
        }
        {currentPosition !== 'gol' &&
          <Button minW="16%" style={{borderRadius: 0}} size="xs" variant="outline" bg="#eee" onPress={() => addPosition('gol')}>GOL</Button>
        }
        {currentPosition === 'gol' &&
          <Button minW="16%" style={{borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#fdf4ff"}} _text={{color: '#0891b2'}} size="xs" bg="fuchsia.200" onPress={() => removePosition()}>GOL</Button>
        }
        {currentPosition !== 'sub' &&
          <Button minW="16%" style={{borderRadius: 0}} size="xs" variant="outline" bg="#eee" onPress={() => addPosition('sub')}>SUB</Button>
        }
        {currentPosition === 'sub' &&
          <Button minW="16%" style={{borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#34d399", borderRightWidth: 1}} _text={{color: '#0891b2'}} size="xs" bg="emerald.200" onPress={() => removePosition()}>SUB</Button>
        }
        {currentPosition !== 'abs' &&
          <Button maxW="15%" style={{marginLeft: 10, width: 40, borderRadius: 50, paddingLeft: 1, paddingRight: 1}} size="xs" variant="outline" bg="#eee" onPress={() => addPosition('abs')}>ABS</Button>
        }
        {currentPosition === 'abs' &&
          <Button maxW="15%" style={{marginLeft: 10, width: 40, borderRadius: 50, paddingLeft: 1, paddingRight: 1}} _text={{color: '#fff', borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e11d48"}} size="xs" bg="rose.400" onPress={() => removePosition()}>ABS</Button>
        }
        </HStack>
        </Box>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default AddPositions;

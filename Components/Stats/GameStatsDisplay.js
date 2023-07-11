import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';

import { updateGames } from '../../Reducers/games';

import GameStatsLive from '../Stats/GameStatsLive'
import StatsBoard from '../Stats/StatsBoard'



const GameStats = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getGolStat, setGolStat] = useState(0);
  const [getAsstStat, setAsstStat] = useState(0);
  const [getDefTacStat, setDefTacStat] = useState(0);
  const [getGolSaveStat, setGolSaveStat] = useState(0);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getStatsPlayerId, setStatsPlayerId] = useState(99999999);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const playerData = props.playerData
  //const statsPlayerId = props.statsPlayerId
  //statsPlayerId
  //const { navigate } = props.navigation;

  useEffect(() => {

    //console.log(statsBoard + ' hit and check statsBoard');
    setStatsBoardDisplay(statsBoard)
    setStatsPlayerId(statsBoardPlayerId)
    //setGameOptionBoardDisplay(gameOptionBoard)

  },[statsBoard, statsBoardPlayerId])


  useEffect(() => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    //console.log(statsBoardPlayerId + ' what is statsPlayerId, please?');
    if (statsBoardPlayerId === 99999999 || statsBoardPlayerId === undefined) {
      setGolStat(95)
    }
    else {
      //console.log(JSON.stringify(_games[0].teamPlayers) + ' stats boar dchek games.teamPlayers');
      const playerIndex = _games[0].teamPlayers.findIndex(x => x.id === statsBoardPlayerId);
      //console.log(playerIndex + ' and what is player index? ');
      //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex]) + ' _games[0].teamPlayers[playerIndex] stats boar dchek games.teamPlayers');
      //console.log(_games[0].teamPlayers[playerIndex].gameStats[0].gol + ' just checking oout _games[0].teamPlayers[playerIndex].gameStats[0].gol.');
      const golStat = _games[0].teamPlayers[playerIndex].gameStats[0].gol
      setGolStat(golStat)
      const asstStat = _games[0].teamPlayers[playerIndex].gameStats[0].asst
      setAsstStat(asstStat)
      const defTacStat = _games[0].teamPlayers[playerIndex].gameStats[0].defTac
      setDefTacStat(defTacStat)
      const golSaveStat = _games[0].teamPlayers[playerIndex].gameStats[0].golSave
      setGolSaveStat(golSaveStat)

    }

  },[statsBoard, statsBoardPlayerId])

        return (
          <View>
            <HStack>

            <Box minW="23%" alignSelf="center" ml="3" mt="3">
              <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{getGolStat}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goals</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>
            </Box>
            <Box minW="23%"alignSelf="center" mt="3">
              <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{getAsstStat}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Assists</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>
            </Box>
            <Box minW="23%"alignSelf="center" mt="3">
              <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{getDefTacStat}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Def. </Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Tackle</Text></Button>
            </Box>
            <Box minW="23%" alignSelf="center" mt="3">
              <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{getGolSaveStat}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goal</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Save</Text></Button>
            </Box>
            </HStack>
            </View>

        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default GameStats;

/*
<HStack>
<Box alignSelf="center" mt="3" ml="3">
  <Button bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Goals: {playerData.gameStats[0].gol}</Text></Button>
</Box>
<Box alignSelf="center" mt="3" ml="3">
  <Button bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Assists: {playerData.gameStats[0].asst}</Text></Button>
</Box>
</HStack>

<HStack>
  <Box alignSelf="center" mt="3" ml="3">
    <Button  bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Def. Tackle/Save: {playerData.gameStats[0].asst}</Text></Button>
  </Box>
  <Box mt="3" ml="3" >
    <Button bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Goalie Save: {playerData.gameStats[0].gol}</Text></Button>
  </Box>
</HStack>
*/

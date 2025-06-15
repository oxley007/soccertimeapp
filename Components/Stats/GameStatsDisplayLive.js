import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';

import { updateGames } from '../../Reducers/games';

import GameStatsLive from '../Stats/GameStatsLive'
import StatsBoard from '../Stats/StatsBoard'



const GameStatsDisplayLive = (props)=>{

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
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const playerData = props.playerData
  //const statsPlayerId = props.statsPlayerId
  //statsPlayerId
  //const { navigate } = props.navigation;

  const displayGoals = () => {
    try {
      return (
        <Text style={styles.textTwelve}>
          {props.gameStats[0].gol} Goal(s)
        </Text>
      )
    }
    catch {
      <Text style={styles.textTwelve}>
        0 Goal(s)
      </Text>
    }
  }

  const displaySaves = () => {
    try {
      return (
        <Text style={styles.textTwelve}>
          {props.gameStats[0].golSave} Save(s)
        </Text>
      )
    }
    catch {
      <Text style={styles.textTwelve}>
        0 Save(s)
      </Text>
    }
  }

  const displayDefTacs = () => {
    try {
      return (
        <Text style={styles.textTwelve}>
          {props.gameStats[0].defTac} Tackle(s)
        </Text>
      )
    }
    catch {
      <Text style={styles.textTwelve}>
        0 Tackle(s)
      </Text>
    }
  }

  const displayAssists = () => {
    try {
      return (
        <Text style={styles.textTwelve}>
          {props.gameStats[0].asst} Assist(s)
        </Text>
      )
    }
    catch {
      <Text style={styles.textTwelve}>
        0 Assist(s)
      </Text>
    }
  }



        return (
          <View style={{borderRadius: 5, overflow: 'hidden', maxWidth: '100%'}}>
            <HStack style={{borderRadius: 5, overflow: 'hidden'}}>

            <Box minW="25%" maxW="25%" alignSelf="center" mt="3" style={{borderTopLeftRadius: 5, borderBottomLeftRadius: 5, overflow: 'hidden'}}>
              <Button bg="#333" _pressed={{ backgroundColor: '#333', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightColor: '#666', borderRightWidth: 1}}>
                {displayGoals()}
              </Button>
            </Box>
            <Box minW="25%" maxW="25%" alignSelf="center" mt="3">
              <Button bg="#333" _pressed={{ backgroundColor: '#333', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#666', borderRightWidth: 1}}>
                {displaySaves()}
              </Button>
            </Box>
            <Box minW="25%" maxW="25%" alignSelf="center" mt="3">
              <Button bg="#333" _pressed={{ backgroundColor: '#333', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#666', borderRightWidth: 1}}>
                {displayDefTacs()}
              </Button>
            </Box>
            <Box minW="25%" maxW="25%" alignSelf="center" mt="3" style={{borderTopRightRadius: 5, borderBottomRightRadius: 5, overflow: 'hidden'}}>
              <Button bg="#333" _pressed={{ backgroundColor: '#333', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopRightRadius: 5, borderBottomRightRadius: 5}}>
                {displayAssists()}
              </Button>
            </Box>
            </HStack>
            </View>

        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textTwelve: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
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

export default GameStatsDisplayLive;

/*
<HStack>
<Box alignSelf="center" mt="3" ml="3">
  <Button bg="#333" size="md"><Text style={{color: '#fff', fontSize: 16}}>Goals: {playerData.gameStats[0].gol}</Text></Button>
</Box>
<Box alignSelf="center" mt="3" ml="3">
  <Button bg="#333" size="md"><Text style={{color: '#fff', fontSize: 16}}>Assists: {playerData.gameStats[0].asst}</Text></Button>
</Box>
</HStack>

<HStack>
  <Box alignSelf="center" mt="3" ml="3">
    <Button  bg="#333" size="md"><Text style={{color: '#fff', fontSize: 16}}>Def. Tackle/Save: {playerData.gameStats[0].asst}</Text></Button>
  </Box>
  <Box mt="3" ml="3" >
    <Button bg="#333" size="md"><Text style={{color: '#fff', fontSize: 16}}>Goalie Save: {playerData.gameStats[0].gol}</Text></Button>
  </Box>
</HStack>
*/

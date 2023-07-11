import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';

import KickOff from './KickOff.js';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const GameEventsHtFt = (props)=>{

  const [getGoalHomeTeam, setGoalHomeTeam] = useState([]);
  const [getGoalAwayTeam, setGoalAwayTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  //const { navigate } = props.navigation;

  useEffect(() => {

    let goalEvents = []
    games[0].gameEvents.map(gameEvent => {

        if (gameEvent.eventType === 'goal') {
          goalEvents.push(gameEvent)
        }
        else if (gameEvent.eventType === 'scoreUndo') {
          goalEvents.shift()
        }
  })

  let homeTeamGoalEvents = []
  let oppTeamGoalEvents = []
  goalEvents.map(goalEvent => {
    if (goalEvent.eventText !== 'Opposition Goal') {
      homeTeamGoalEvents.push(goalEvent)
    }
    else {
      oppTeamGoalEvents.push(goalEvent)
    }
  })

  setGoalHomeTeam(goalEvents)
  setGoalAwayTeam(oppTeamGoalEvents)


  },[])

  const gameEvents = () => {



  const homeTeamGoals = getGoalHomeTeam.map(goalEvent => {
    if (goalEvent.eventText === 'Opposition Goal') {
    return (
      <Box>
      <HStack mt="2">
        <Center>
          <VStack minW="20%">
            <Box bg="#ddd" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
            <Center>
              <Text>{formattedSeconds(goalEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
              </Center>
            </Box>
          </VStack>
        </Center>
        <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
          <VStack minW="80%" maxW="80%">
            <Text style={{color: '#fff', fontSize: 16}}>{goalEvent.eventText}</Text>
          </VStack>
        </Center>
      </HStack>
      <Box style={{borderBottomColor: '#fff', borderBottomWidth: 1, paddingTop: 7}}>
      </Box>
      </Box>
    )
  }
  else {
    return (
      <Box>
      <HStack mt="2">
        <Center>
          <VStack minW="20%">
            <Box bg="#34d399" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
            <Center>
              <Text style={{color: '#fff'}}>{formattedSeconds(goalEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
              </Center>
            </Box>
          </VStack>
        </Center>
        <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
          <VStack minW="80%" maxW="80%">
            <Text style={{color: '#fff', fontSize: 16}}>{goalEvent.eventText}</Text>
          </VStack>
        </Center>

      </HStack>
      <Box style={{borderBottomColor: '#fff', borderBottomWidth: 1, paddingTop: 7}}>
      </Box>
      </Box>
    )
  }
  })

  return homeTeamGoals

}


        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
            {gameEvents()}
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
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
})

export default GameEventsHtFt;

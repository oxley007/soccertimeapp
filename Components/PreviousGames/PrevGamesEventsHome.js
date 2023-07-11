import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';

import EventsDisplay from '../Events/EventsDisplay.js'
import SelectPlayerList from '../AddPlayers/SelectPlayerList.js'

const PrevGamesEventsHome = (props)=>{

  const [getGame, setGame] = useState([]);
  const [gethomeTeamShortName, sethomeTeamShortName] = useState('');
  const [getscoreHomeTeam, setscoreHomeTeam] = useState(0);
  const [getscoreAwayTeam, setscoreAwayTeam] = useState([]);
  const [getawayTeamShortName, setawayTeamShortName] = useState('');
  const [getGameId, setGameId] = useState(0);
  const [getteamIdCode, setteamIdCode] = useState(0);
  const [getGameDate, setGameDate] = useState('');


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode
  const whereFrom = props.route.params.whereFrom

  const { navigate } = props.navigation;


  useEffect(() => {

    let gameDataRaw = []
    let homeTeamShortName = ''
    let awayTeamShortName = ''
    let scoreHomeTeam = 0
    let scoreAwayTeam = 0
    let gameId = 0
    let teamIdCode = 0
    let gameDate = ''
    if (whereFrom === 77) {
        gameDataRaw = props.route.params.gameData
        homeTeamShortName = gameDataRaw.teamNames.homeTeamShortName
        awayTeamShortName = gameDataRaw.teamNames.awayTeamShortName
        scoreHomeTeam = gameDataRaw.score.homeTeam
        scoreAwayTeam = gameDataRaw.score.awayTeam
        gameId = gameDataRaw.id
        teamIdCode = gameDataRaw.teamIdCode
        gameDate = '12/03/23'
    }
    else {
      //to do
    }

      sethomeTeamShortName(homeTeamShortName)
      setscoreHomeTeam(scoreHomeTeam)
      setscoreAwayTeam(scoreAwayTeam)
      setawayTeamShortName(awayTeamShortName)
      setGameId(gameId)
      setteamIdCode(teamIdCode)
      setGameDate(gameDate)
      setGame(gameDataRaw)


  },[])





  const continueSetup = () => {

      navigate('PreviousGamesHome');

  }

  //const teamType = props.route.params.teamType

  console.log(getGame + ' what is getGame');

        return (

          <Container ml="4" mr="4" minW="90%" maxH="100%">
          <Box minW="100%" bg="#fff" style={{borderRadius: 5}} pt="3" pb="1" pl="5" pr="5" mt="2">
          <Center>
          <Text style={{fontSize: 20, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 30}}>
            {gethomeTeamShortName}
            <Center>
            <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
               {getscoreHomeTeam}
              </Text>
            </Box>
            </Center>
             vs
             <Center>
             <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
               <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
                {getscoreAwayTeam}
               </Text>
             </Box>
             </Center> {getawayTeamShortName}
          </Text>
          <Box mt="0" pt="0" pb="1" minW="100%">
            <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
          </Box>
          <Text style={{fontSize: 12, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
            {getGameDate} | Game ID: {getGameId} | Team ID: {getteamIdCode}
          </Text>
          </Center>
          </Box>
            <ScrollView style={{borderTopColor: '#333', borderTopWidth: 2}}>
            <Box mt="0" pt="2" pb="2" minW="100%">
              <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 2}} />
            </Box>
            <Heading mt="2" mb="2">
              Game Events
            </Heading>
            <Box mt="0" pt="2" pb="2" minW="100%">
              <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 2}} />
            </Box>


                <EventsDisplay navigation={props.navigation} gameData={props.route.params.gameData} whereFrom={77} />
                <Box mt="0" pt="2" pb="2" minW="100%">
                  <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 2}} />
                </Box>
                <Heading mt="2" mb="2">
                  Game-Times & Positions
                </Heading>
                <Box mt="0" pt="2" pb="2" minW="100%">
                  <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 2}} />
                </Box>
                <SelectPlayerList whereFrom={'prevGame'} navigation={props.navigation} gameData={props.route.params.gameData} dataFrom={77}/>

              </ScrollView>

            <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

            <HStack alignItems="center" safeAreaBottom p="0" mt="3" shadow={6} >
        <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
              </HStack>
      </Box>

          </Container>
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
    marginTop: 10
  },
})

export default PrevGamesEventsHome;

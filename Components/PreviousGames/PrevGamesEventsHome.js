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
    if (whereFrom === 77 || whereFrom === 181 || whereFrom === 55) {
     //console.log('above the check one.');
     //console.log(JSON.stringify(props.route.params.gameData) + ' check props.route.params.gameData thnx.');
        gameDataRaw = props.route.params.gameData
        homeTeamShortName = gameDataRaw.teamNames.homeTeamShortName
        awayTeamShortName = gameDataRaw.teamNames.awayTeamShortName
        //homeTeamShortName = gameDataRaw.teamNames.homeTeamName
        //awayTeamShortName = gameDataRaw.teamNames.awayTeamName
        scoreHomeTeam = gameDataRaw.score.homeTeam
        scoreAwayTeam = gameDataRaw.score.awayTeam
        gameId = gameDataRaw.id
        teamIdCode = gameDataRaw.teamIdCode
        try {
          gameDate = gameDataRaw.gameDate
        }
        catch {
          gameDate = ''
        }
    }
    else if (whereFrom === 182) {
      gameDataRaw = props.route.params.gameData
   //console.log(JSON.stringify(gameDataRaw) + ' gameDataRaw for 182');

      homeTeamShortName = gameDataRaw.gameIds[0].gameData.homeTeamShort
      awayTeamShortName = gameDataRaw.gameIds[0].gameData.awayTeamShort
      //homeTeamShortName = gameDataRaw.teamNames.homeTeamName
      //awayTeamShortName = gameDataRaw.teamNames.awayTeamName
      scoreHomeTeam = gameDataRaw.gameIds[0].gameData.homeTeamScore
      scoreAwayTeam = gameDataRaw.gameIds[0].gameData.awayTeamScore
      gameId = gameDataRaw.id
      teamIdCode = gameDataRaw.teamIdCode
      try {
        gameDate = gameDataRaw.gameDate
      }
      catch {
        gameDate = ''
      }

    }
    else if (whereFrom === 183) {
      gameDataRaw = props.route.params.gameData
   //console.log(JSON.stringify(gameDataRaw) + ' gameDataRaw for 183');

      homeTeamShortName = gameDataRaw.game.teamNames.homeTeamShortName
      awayTeamShortName = gameDataRaw.game.teamNames.awayTeamShortName
      //homeTeamShortName = gameDataRaw.teamNames.homeTeamName
      //awayTeamShortName = gameDataRaw.teamNames.awayTeamName
      scoreHomeTeam = gameDataRaw.game.score.homeTeam
      scoreAwayTeam = gameDataRaw.game.score.awayTeam
      gameId = gameDataRaw.id
      teamIdCode = gameDataRaw.game.teamIdCode
      try {
        gameDate = gameDataRaw.game.gameDate
      }
      catch {
        gameDate = ''
      }

    }
    else {
      //to do
    }

 //console.log(homeTeamShortName + ' check the data here 1')
 //console.log(scoreHomeTeam + ' check the data here 2')
 //console.log(scoreAwayTeam + ' check the data here 3')
 //console.log(awayTeamShortName + ' check the data here 4')
 //console.log(gameId + ' check the data here 5')
 //console.log(teamIdCode + ' check the data here 6')
 //console.log(gameDate + ' check the data here 7')
 //console.log(gameDataRaw + ' check the data here 8')

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

 //console.log(' test need to check itme here last.');
 //console.log(JSON.stringify(props.item) + ' need to check itme here last.');

    if (whereFrom === 181 ) {
      navigate('HomePlayerPreviousGamesHome', {
        whereFrom: 181,
        teamGameData: props.route.params.gameData,
        //awayTeams: awayTeamList[0],
      });
    }
    else if (whereFrom === 182) {
      navigate('HomePlayerPreviousGamesHome', {
        whereFrom: 182,
        teamGameData: props.route.params.gameData,
        //awayTeams: awayTeamList[0],
      });
    }
    else if (whereFrom === 183) {
      navigate('HomePlayerPreviousGamesHome', {
        whereFrom: 183,
        teamGameData: props.route.params.gameData,
        //teamId: item.teamN
        //awayTeams: awayTeamList[0],
      });
    }
    else {

      navigate('PreviousGamesHome');
    }

  }

  //const teamType = props.route.params.teamType

 //console.log(getGame + ' what is getGame');

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <Container ml="4" mr="4" minW="90%" maxH="100%">
          <Text style={{color: '#fff'}}>hiii {whereFrom}</Text>
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

          <Text style={{fontSize: 12, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
            {getGameDate} | Game ID: {getGameId} | Team ID: {getteamIdCode}
          </Text>
          </Center>
          </Box>
            <ScrollView style={{borderTopColor: '#333', borderTopWidth: 2}}>
            {whereFrom === 181 &&
              <Box>
              <Box bg="#111" pt="2" pb="2" pl="2" mt="1" mb="1">
            <Heading mt="2" mb="2" style={{color: '#fff'}}>
              Game-Times & Positions:
            </Heading>
            </Box>

            <SelectPlayerList whereFrom={'prevGame'} navigation={props.navigation} gameData={props.route.params.gameData} dataFrom={whereFrom} teamIdCode={getteamIdCode} />
            </Box>
          }
          {whereFrom === 182 &&
            <Box bg="#111" pt="2" pb="2" pl="2" mt="1" mb="1" >
          <Heading style={{color: '#fff'}}>
            Game-Times & Positions:
          </Heading>

          <SelectPlayerList whereFrom={'prevGame'} navigation={props.navigation} gameData={props.route.params.gameData} dataFrom={whereFrom} teamIdCode={geteamIdCode}/>
          </Box>
        }
        {whereFrom === 183 &&
          <Box bg="#111" pt="2" pb="2" pl="2" mt="1" mb="1">
        <Heading style={{color: '#fff'}}>
          Game-Times & Positions:
        </Heading>

        <SelectPlayerList whereFrom={'prevGame'} navigation={props.navigation} gameData={props.route.params.gameData} dataFrom={whereFrom}  item={props.route.params.gameData} teamIdCode={getteamIdCode}/>
        </Box>
      }
            <Box bg="#111" pt="2" pb="2" pl="2" mt="1" mb="1">
              <Heading mt="2" mb="2" style={{color: '#fff'}}>
                Game Events:
              </Heading>
            </Box>

                <EventsDisplay navigation={props.navigation} gameData={props.route.params.gameData} whereFrom={whereFrom} />

                {whereFrom === 77 &&
                  <Box>
                  <Box bg="#111" pt="2" pb="2" pl="2" mt="1" mb="1">
                <Heading mt="2" mb="2" style={{color: '#fff'}}>
                  Game-Times & Positions
                </Heading>
                </Box>

                <SelectPlayerList whereFrom={'prevGame'} navigation={props.navigation} gameData={props.route.params.gameData} dataFrom={whereFrom} teamIdCode={getteamIdCode} />
                </Box>
              }
              {whereFrom === 55 &&
                <Box>
                <Box bg="#111" pt="2" pb="2" pl="2" mt="1" mb="1">
                  <Heading mt="2" mb="2" style={{color: '#fff'}}>
                    Game-Times & Positions
                  </Heading>
              </Box>

              <SelectPlayerList whereFrom={55} navigation={props.navigation} gameData={props.route.params.gameData} dataFrom={whereFrom} teamIdCode={getteamIdCode} />
              </Box>
            }
              </ScrollView>

            <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

            <HStack alignItems="center" safeAreaBottom p="0" mt="3" shadow={6} >
        <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
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
    marginTop: 10
  },
  linearGradientBg: {
    minWidth: '100%',
  },
})

export default PrevGamesEventsHome;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOc from 'react-native-vector-icons/Octicons';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import IconIo from 'react-native-vector-icons/Ionicons';
const whistleIcon = <Icon name="whistle-outline" size={30} color="#d1fae5" />;
const soccerBallIcon = <IconFA name="soccer-ball-o" size={20} color="#34d399" />;
const closeIcon = <IconFA name="close" size={20} color="#ff0000" />;
const scoreboardlIcon = <Icon name="scoreboard-outline" size={20} color="#aaa" />;
const subOffIcon = <Icon name="account-sync-outline" size={20} color="#aaa" />;
const assistIcon = <Icon name="star" size={20} color="#E879F9" />;
const defTacIcon = <IconOc name="stop" size={20} color="rgb(255,150,79)" />;
const golSavIcon = <IconMa name="sports-handball" size={20} color="#7cc2ff" />;
const golRemoveIcon = <IconMa name="error-outline" size={20} color="#fce7f3" />;
const personAddIcon = <IconIo name="person-add" size={20} color="#00ab66" />;
const personRemoveIcon = <IconIo name="person-remove" size={20} color="#ff0000" />;


import { updateGames } from '../../Reducers/games';

//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const EventsDisplay = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getEventLength, setEventLength] = useState(0);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  let getGameData = 0
  try {
      getGameData = props.route.params.getGameData
  }
  catch {
    getGameData = 0
  }


  const { navigate } = props.navigation;

  try {
    useEffect(() => {
   //console.log('do we get anything man?');
   //console.log(props.whereFrom + ' man props.whereFrom ?');
      if (props.whereFrom === 183 || props.whereFrom === 191) {

     //console.log(props.gameData.game.gameEvents.length + ' gameData.game.gameEvents.length 1');
     //console.log(JSON.stringify(props.gameData.game.gameEvents) + ' games[0].gameEvents 1');
        const eventlength = props.gameData.game.gameEvents.length
        setEventLength(eventlength)
      }
      else {
        const eventlength = games[0].gameEvents.length
     //console.log(games[0].gameEvents.length + ' games[0].gameEvents.length');
     //console.log(JSON.stringify(games[0].gameEvents) + ' games[0].gameEvents');
        setEventLength(eventlength)
      }



    },[games[0].gameEvents.length, sixtySecondsMark])
  }
  catch {
    useEffect(() => {

   //console.log(props.whereFrom + ' props.whereFrom where?');
      if (props.whereFrom === 183 || props.whereFrom === 191) {

     //console.log(props.gameData.game.gameEvents.length + ' gameData.game.gameEvents.length 1');
     //console.log(JSON.stringify(props.gameData.game.gameEvents) + ' games[0].gameEvents 1');
        const eventlength = props.gameData.game.gameEvents.length
        setEventLength(eventlength)
      }
      else {
        const eventlength = games[0].gameEvents.length
     //console.log(games[0].gameEvents.length + ' games[0].gameEvents.length');
     //console.log(JSON.stringify(games[0].gameEvents) + ' games[0].gameEvents');
        setEventLength(eventlength)
      }



    },[])
  }

  const displayNotPlayerName = (eventTextNotPlayerName) => {

    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
      //do nothing.
    }
    else {
      if (userProfile === 2 || userProfile === 3) {
        return (
          <Text style={{fontStyle: 'italic', color: '#ddd', fontSize: 16}}>{eventTextNotPlayerName}</Text>
        )
      }
    }

  }


  const getGameEvents = () => {

 //console.log(props.whereFrom  + ' props.whereFrom ');
 //console.log(JSON.stringify(props.gameData)  + ' props.gameData test ');
  //console.log(JSON.stringify(props.gameData.game)  + ' props.gameData.game test ');
  //console.log(JSON.stringify([...props.gameData])  + ' [...props.gameData] test ');

    let _games = []
    let gameData = []
    if (props.whereFrom === 77 || props.whereFrom === 181 || props.whereFrom === 55) {
      try {
        _games = [...props.gameData]
        gameData = _games[0]
      }
      catch {
        _games = [{...props.gameData}]
        gameData = _games[0]
      }
    }
    else if (props.whereFrom === 183 || props.whereFrom === 191) {
      //try {
        _games = props.gameData.game
     //console.log(JSON.stringify(_games) + ' just cehck gamse foe now');
        gameData = _games
      /*}
      catch {
        _games = [{...props.gameData}]
        gameData = _games.game
      }*/
    }
    else {
   //console.log('hit me here 1 games');
      try {
     //console.log('hit me here 2 games');
        _games = [...games]
        gameData = _games[0]
      }
      catch {
     //console.log('hit me here 3 games');
        _games = [{...games}]
        gameData = _games[0]
      }
    }

 //console.log(JSON.stringify(gameData) + ' new gameData - does it work? ');

    let gameEventsDisplay = ''

    try {
    gameEventsDisplay = gameData.gameEvents.slice(0).reverse().map(gameEvent => {

      console.log(gameEvent.eventType + ' gameEvent.eventType check')
      console.log(gameEvent.eventText + ' gameEvent.eventText check')
      let eventText = gameEvent.eventText;
      const eventTextNotPlayerName = "(buy 'Pro' for player name)"

      if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
        //do nothing.
      }
      else {
     //console.log(userProfile + ' what is userProfile?');
      if (userProfile === 2 || userProfile === 3) {
       //console.log(gameEvent.eventType + ' gameEvent.eventType check');
          if (gameEvent.eventType === 'golSave' || gameEvent.eventType === 'defTac' || gameEvent.eventType === 'asst' || (gameEvent.eventType === 'goal' && gameEvent.eventText !== "Opposition Goal")) {
            //console.log('surely this is not getin ghit');
         //console.log(gameEvent.eventText + ' gameEvent.eventText here check');
            //let eventText = gameEvent.eventText;
            const eventTextArray = eventText.split("by");
         //console.log(JSON.stringify(eventTextArray) + ' eventTextArray yes?');
         //console.log(eventTextArray[0] + ' eventTextArray[0]');
         //console.log(eventTextArray[1] + ' eventTextArray[1]');
            //const eventTextArrayTwo = eventTextArray.split(eventTextArray[1]);
          //console.log(eventTextArrayTwo[0] + ' eventTextArrayTwo does this say everything before the player name?');
            eventText = eventTextArray[0] + 'by...'
          }
          else if (gameEvent.eventType === 'pos') {
            //is now playing as
         //console.log(gameEvent.eventText + ' gameEvent.eventText here check 2');
            //let eventText = gameEvent.eventText;
            const eventTextArray = eventText.split("is");
         //console.log(eventTextArray[0] + ' eventTextArray[0]');
         //console.log(eventTextArray[1] + ' eventTextArray[1]');
            //const eventTextArrayTwo = eventTextArray.split(eventTextArray[0]);
          //console.log(eventTextArrayTwo[1] + ' eventTextArrayTwo does this say everything before the player name? 2');
            eventText = '...' + eventTextArray[1]
          }
          else if (gameEvent.eventType === 'sub') {
            //has been substituted off
         //console.log(gameEvent.eventText + ' gameEvent.eventText here check 3');
            //let eventText = gameEvent.eventText;
            const eventTextArray = eventText.split("has");
         //console.log(eventTextArray[0] + ' eventTextArray[0]');
         //console.log(eventTextArray[1] + ' eventTextArray[1]');
            //const eventTextArrayTwo = eventTextArray.split(eventTextArray[0]);
          //console.log(eventTextArrayTwo[1] + ' eventTextArrayTwo does this say everything before the player name? 2');
            eventText = '...has ' + eventTextArray[1]
          }
        }
      }

    if (gameEvent.eventType === 'ko') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(209,250,229,0.3)', 'rgba(209,250,229,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(209,250,229,0.4)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack>
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack>
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{whistleIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'ht') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(209,250,229,0.3)', 'rgba(209,250,229,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(209,250,229,0.4" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{whistleIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'ko2') {
      return (
        <Box>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(209,250,229,0.3)', 'rgba(209,250,229,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(209,250,229,0.4)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack>
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack>
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{whistleIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
        <Box style={{borderTopColor: '#E879F9', borderTopWidth: 2, marginTop: 5, marginBottom: 5}}>
        </Box>
        </Box>
      )
    }
    else if (gameEvent.eventType === 'ft') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(209,250,229,0.3)', 'rgba(209,250,229,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack  minW="20%">
                  <Box bg="rgba(209,250,229,0.4)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack>
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack>
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{whistleIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'goal') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(52,211,153,0.3)', 'rgba(52,211,153,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(52,211,153,0.4)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" maxW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack>
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText} {displayNotPlayerName(eventTextNotPlayerName)}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack>
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{soccerBallIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'score') {
      //gameEvent.eventText
      const homeTeamText = "data-123".replace('data-','');
      const vsIndex = gameEvent.eventText.indexOf("vs");
      const homeTeamIndex = vsIndex - 2
      const awayTeamIndex = vsIndex + 4
      const awayTeamScoreIndex = vsIndex + 2
      const homeTeamName = gameEvent.eventText.substring(0, homeTeamIndex);
      const awayTeamName = gameEvent.eventText.substring(awayTeamIndex);
      const homeTeamScore = gameEvent.eventText.substring(homeTeamIndex, vsIndex);
      const awayTeamScore = gameEvent.eventText.substring(awayTeamScoreIndex, awayTeamIndex);

      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#333', '#333']} style={styles.linearGradient}>
          <Box>
            <HStack>

              <VStack minW="100%">
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
              <HStack>
              <Center maxW="37.5%" minW="37.5%">
                <VStack >
                  <Text style={{color: '#fff', fontSize: 16, textAlign: 'center', paddingRight: 10, fontWeight: '600'}}>{homeTeamName}</Text>
                </VStack>
                </Center>
                <Center maxW="10%" minW="10%">
                  <VStack mr="1">
                  <Box bg="#E879F9" pl="2" pr="2" pt="2" pb="2" style={{borderRadius: 5}}>
                    <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>{homeTeamScore}</Text>
                    </Box>
                  </VStack>
                  </Center>
                  <Center maxW="5%" minW="5%">
                  <VStack>

                    <Text style={{color: '#999', fontSize: 10, textAlign: 'center'}}>vs</Text>

                  </VStack>
                  </Center>
                  <Center maxW="10%" minW="10%">
                  <VStack>
                  <Box bg="#E879F9" pl="1" pr="2" pt="2" pb="2" style={{borderRadius: 5}}>
                    <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>{awayTeamScore}</Text>
                    </Box>
                  </VStack>
                  </Center>
                  <Center maxW="37.5%" minW="37.5%">
                  <VStack>
                    <Text style={{color: '#fff', fontSize: 16, textAlign: 'center', paddingLeft: 10, fontWeight: '600'}}>{awayTeamName}</Text>
                  </VStack>
                  </Center>
                  </HStack>
              </Center>
              </VStack>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'sub') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#333', '#333']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#666" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" maxW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack >
                  <Text style={{color: '#fff', fontSize: 16}}>{displayNotPlayerName(eventTextNotPlayerName)} {eventText} </Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack >
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{personRemoveIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'pos') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#333', '#333']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#666" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" maxW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack >
                  <Text style={{color: '#fff', fontSize: 16}}>{displayNotPlayerName(eventTextNotPlayerName)} {eventText}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack >
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{personAddIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'asst') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(232,121,249,0.2)', 'rgba(232,121,249,0.2)rgba']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(232,121,249,0.3)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" maxW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack >
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText} {displayNotPlayerName(eventTextNotPlayerName)}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack >
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{assistIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'defTac') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(255,150,79,0.3)', 'rgba(255,150,79,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(255,150,79,0.4)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" maxW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack>
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText} {displayNotPlayerName(eventTextNotPlayerName)}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack>
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{defTacIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'golSave') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(124,194,255,0.3)', 'rgba(124,194,255,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(124,194,255,0.4)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" maxW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack>
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText} {displayNotPlayerName(eventTextNotPlayerName)}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack>
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{golSavIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
    else if (gameEvent.eventType === 'scoreUndo') {
      console.log('is this even hit man?');

      return (
        <Text style={{color: '#fff'}}>Goal Removed</Text>

      )

    }
    else if (gameEvent.eventType === 'eventUndo') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(255,0,0,0.3)', 'rgba(255,0,0,0.3)']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="rgba(255,0,0,0.4)" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text style={{color: '#fff'}}>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center minW="60%" maxW="60%" style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack>
                  <Text style={{color: '#fff', fontSize: 16}}>{eventText}</Text>
                </VStack>
              </Center>
              <Center minW="20%">
                <VStack>
                  <Box bg="transparent" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{closeIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
      )
    }
  })
  return gameEventsDisplay
}
catch {
  //do nothing.
}

}


const buyPro = () => {
  navigate('Iap');
}

const showBuyButton = () => {

  if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
    //show nothing.
  }
  else if (userProfile === 2 || userProfile === 3){
    return (
      <Box style={{borderTopColor: '#fff', borderTopWidth: 1, borderBottomColor: '#fff', borderBottomColorWidth: 1 }}>
        <Button bg="#E879F9" size="md"  pt="5" pb="5" mb="2" _text={{fontSize: 24, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>Buy Pro Subscriptions!</Button>
      </Box>
    )
  }

}


        return (

            <View>

                {showBuyButton()}

                {getEventLength > 0 &&
                  <View>
                    {getGameEvents()}
                  </View>
                }
                {getEventLength === undefined &&
                  <View>
                    <Text style={{color: '#fff'}}>Game events will display here once the game has kicked-off.</Text>
                  </View>
                }


            </View>

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
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  linearGradientText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
})

export default EventsDisplay;

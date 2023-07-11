import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;

import { updateGames } from '../../Reducers/games';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';


import KickOff from './KickOff.js';
import Stopwatch from './Stopwatch.js';
import GamePlayers from './GamePlayers.js';
import StatsBoard from '../Stats/StatsBoard.js';
import GameStatsLive from '../Stats/GameStatsLive.js';
import FormationBoard from '../FormationBoard/FormationBoard.js'
import GameOptions from './GameOptions.js';
import GameOptionsUndo from './GameOptionsUndo.js';


import PositionTimes from '../../Util/PositionTimes.js';

const GameHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getHalf, setHalf] = useState([]);
  const [getHalfTime, setHalfTime] = useState(99999999);
  const [getFullTIme, setFullTime] = useState(99999999);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getStatsPlayerId, setStatsPlayerId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isGameOptionOpen, setGameOptionIsOpen] = useState(false);
  const [getGameOptionBoardDisplay, setGameOptionBoardDisplay] = useState(false);
  const [getConfirmEvent, setConfirmEvent] = useState(false);


  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsPlayerId = useSelector(state => state.statsBoard.playerId)
  let gameOptionBoard = useSelector(state => state.gameOptionBoard.gameOptionBoard)
  let gameOptionBoardPlayerId = useSelector(state => state.gameOptionBoard.playerId)
  let eventDisplayBoard = useSelector(state => state.eventDisplayBoard.eventDisplayBoard)
  let eventDisplayBoardPlayerId = useSelector(state => state.eventDisplayBoard.PlayerId)
  let eventDisplayBoardText = useSelector(state => state.eventDisplayBoard.eventText)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode
  //const fromContinue = props.route.params.fromContinue

  const { navigate } = props.navigation;

  useEffect(() => {

    const gameHalfTime = games[0].gameHalfTime
    const gameHalfTimePlusOne = gameHalfTime + 1
    const gameFullTime = gameHalfTime * 2
    const gameFullTimePlusOne = gameFullTime + 1

    setHalfTime(gameHalfTime)
    setFullTime(gameFullTime)


  })


  useEffect(() => {

    //console.log(statsBoard + ' hit and check statsBoard');
    /*if (statsBoard === false) {
    setTimeout(function(){
      setStatsBoardDisplay(statsBoard)
      setStatsPlayerId(statsPlayerId)
    }, 1000);
  }
  else {
  */
    setStatsBoardDisplay(statsBoard)
    setStatsPlayerId(statsPlayerId)
  //}

    //setGameOptionBoardDisplay(gameOptionBoard)

  },[statsBoard, statsPlayerId])

  useEffect(() => {

  setTimeout(function(){
    dispatch(updateEventDisplayBoard(false, 0, ''))
  }, 5000);

    //setGameOptionBoardDisplay(gameOptionBoard)

  },[eventDisplayBoard, eventDisplayBoardPlayerId])

  useEffect(() => {

    //console.log(gameOptionBoard + ' hit and check gameOptionBoard');
    setGameOptionBoardDisplay(gameOptionBoard, gameOptionBoardPlayerId)


  },[gameOptionBoard, gameOptionBoardPlayerId])



  const substitutePlayers = () => {

    navigate('SubstitutionHome',
  {
    whereFrom: 9
  });

  }

  const halftimeButton = () => {

    games[0].halfTime = 1
    games[0].gameEvents.push({eventType: 'ht', eventText: 'Half-Time', eventTime: secondsElapsed})

    dispatch(updateGames(games))

    navigate('SubstitutionHome', {
      whereFrom: 'HT'
    });

  }

  const fulltimeButton = () => {

    games[0].halfTime = 4
    games[0].gameEvents.push({eventType: 'ft', eventText: 'fulltime', eventTime: secondsElapsed})

    games[0].teamPlayers.map(player => {

      //console.log(JSON.stringify(player) + ' check player before functions Home.');
      const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed);
      const positionTimesSaveFirst = positionTimesSave[0];

      //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst Home');
      player = positionTimesSaveFirst
      //console.log(JSON.stringify(player) + ' now check player after update. Home');

    })

    dispatch(updateGames(games))

    navigate('GameEnds');

  }

  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
    dispatch(updateGameOptionBoard(false, 0))
    dispatch(updateStatsBoard(false, 99999999))
  }

  const setGameOptionsOpenStatus = (isGameOptionOpen) => {

    //console.log('are we hitting? setGameOptionBoardDisplay(gameOptionBoard)');
    setGameOptionIsOpen(isGameOptionOpen)
    setGameOptionBoardDisplay(isGameOptionOpen)
    dispatch(updateGameOptionBoard(isGameOptionOpen, 0))
    dispatch(updateStatsBoard(false, 99999999))
  }

  const goToEvents = () => {

    navigate('EventsHome');

  }

  //const teamType = props.route.params.teamType

        return (
          <Center>
            <Container h="100%" w="100%" maxWidth="100%">
              <KickOff navigation={props.navigation} fromContinue={props.route.params.fromContinue} />
              <Box minW='100%' bg="tertiary.100" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1}}>
              <HStack>

              {isOpen === false &&
                <Button variant="unstyled" onPress={() => setOpenStatus(true)}>
                  <HStack>
                    {isOpen ? minusIcon : plusIcon}
                    <Center pl="2">
                      <Text style={{color: '#0891b2', fontSize: 20}}>SHOW FORMATION</Text>
                    </Center>
                  </HStack>
                </Button>
              }
              {isOpen === true &&
                <Button variant="unstyled" onPress={() => setOpenStatus(false)}>
                <HStack>
                  {isOpen ? minusIcon : plusIcon}
                  <Center pl="2">
                    <Text style={{color: '#0891b2', fontSize: 20}}>HIDE FORMATION</Text>
                  </Center>
                </HStack>
                </Button>

              }
              </HStack>
              </Box>
              <PresenceTransition visible={isOpen} initial={{
                opacity: 0
                }} animate={{
                opacity: 1,
                transition: {
                  duration: 250
                }
                }}
                style={{zIndex: 3, elevation: 3 }}
              >
                <Center style={{position:'absolute', left: 0, top: 0, right: 0, height: 'auto', zIndex: 3, elevation: 3 }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="300" shadow="9" _text={{
                color: "white"
              }}>
                  <FormationBoard/>
                </Center>
              </PresenceTransition>
              <Box minW='100%' bg="tertiary.100" shadow="5">
              <HStack>

              {getGameOptionBoardDisplay === false &&
                <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(true)}>
                  <HStack>
                    {getGameOptionBoardDisplay ? minusIcon : plusIcon}
                    <Center pl="2">
                      <Text style={{color: '#0891b2', fontSize: 20}}>OPPOSITION GOAL/EXIT GAME</Text>
                    </Center>
                  </HStack>
                </Button>
              }
              {getGameOptionBoardDisplay === true &&
                <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(false)}>
                <HStack>
                  {getGameOptionBoardDisplay ? minusIcon : plusIcon}
                  <Center pl="2">
                    <Text style={{color: '#0891b2', fontSize: 20}}>OPPOSITION GOAL/EXIT GAME</Text>
                  </Center>
                </HStack>
                </Button>

              }
              </HStack>
              </Box>
              <PresenceTransition visible={getGameOptionBoardDisplay} initial={{
                opacity: 0
                }} animate={{
                opacity: 1,
                transition: {
                  duration: 250
                }
                }}
                style={{zIndex: 3, elevation: 3 }}
              >
                <Center style={{position:'absolute', left: 0, top: 0, right: 0, height: 'auto', zIndex: 3, elevation: 3 }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="300" shadow="9" _text={{
                color: "white"
              }}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#d1fae5', '#34d399']} style={styles.linearGradientSquare}>
                  <GameOptions navigation={props.navigation} />
                  <HStack mt={2}>
                    <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                    </Box>
                    <Box minW="20%" ml="3">
                      <Text style={{color: '#fff', fontWeight: '500', fontSize: 14}}>Undo</Text>
                    </Box>
                    <Box mr="3" minW="65%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                    </Box>
                  </HStack>
                  <GameOptionsUndo />
              </LinearGradient>
                </Center>
              </PresenceTransition>
              {secondsElapsed >= getHalfTime && games[0].halfTime <1 &&
                <Box bg="fuchsia.400" style={{borderTopWidth: 1, borderTopColor: '#999', borderBottomWidth: 1, borderBottomColor: '#999', height: '15%', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                  <Button minW="100%" bg="tertiary.100" size="md" _text={{fontSize: "xl", color: '#0891b2'}} variant="subtle" onPress={() => halftimeButton()}>Half Time (tap for HT review)</Button>
                </Box>
              }
              {secondsElapsed >= getFullTIme &&
                <Box bg="fuchsia.400" style={{borderTopWidth: 1, borderTopColor: '#999', borderBottomWidth: 1, borderBottomColor: '#999', height: '15%', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                  <Button minW="100%" bg="tertiary.100" size="md" _text={{fontSize: "xl", color: '#0891b2'}} variant="subtle" onPress={() => fulltimeButton()}>Full-Time (tap to save game)</Button>
                </Box>
              }
            <Box bg="#a855f7" style={{position:'absolute', top: 225, right: 0, height: 'auto',  width: 30, zIndex: 2, elevation: 2, borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
              <Button pt="2" pb="2" p="0" m="0" variant="unstyled" onPress={() => goToEvents()}>
                <Center>
                  <HStack>
                      <Text style={{color: '#fff', fontSize: 16}}>E</Text>
                  </HStack>
                  <HStack>
                      <Text style={{color: '#fff', fontSize: 16}}>V</Text>
                  </HStack>
                  <HStack>
                      <Text style={{color: '#fff', fontSize: 16}}>E</Text>
                  </HStack>
                  <HStack>
                      <Text style={{color: '#fff', fontSize: 16}}>N</Text>
                  </HStack>
                  <HStack>
                      <Text style={{color: '#fff', fontSize: 16}}>T</Text>
                  </HStack>
                  <HStack>
                      <Text style={{color: '#fff', fontSize: 16}}>S</Text>
                  </HStack>
                </Center>
              </Button>
            </Box>

                <GamePlayers navigation={navigate} />

          <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, borderTopColor: '#aaa', borderTopWidth: 3, marginTop: 3}}>
        <HStack alignItems="center" safeAreaBottom shadow={6}  style={{paddingRight: '5%', paddingLeft: '5%', paddingTop: 20, paddingBottom: 10}}>

          {getStatsBoardDisplay === false &&
            <Button minW="90%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => substitutePlayers()}>Make Substitution</Button>
          }

        </HStack>
        <HStack>
          <Text style={{paddingLeft: 25, fontSize: 12, paddingBottom: 15}}>Team ID: {games[0].teamIdCode}</Text>
        </HStack>
      </Box>
    {getStatsBoardDisplay === true &&
      <PresenceTransition visible={getStatsBoardDisplay} initial={{
      opacity: 0
      }} animate={{
      opacity: 1,
      transition: {
        duration: 250
      }
      }}>

        <Center style={{position:'absolute', left: 0, bottom: 0, right: 0, height: 'auto'}} bg="tertiary.400" pl="0" mt="7" rounded="lg" minW="100%" _text={{
        color: "white"
        }} shadow="9" shadowOffset="-20">
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#22d3ee', '#a855f7']} style={styles.linearGradient}>
            <GameStatsLive statsPlayerId={getStatsPlayerId} navigation={navigate} />
          </LinearGradient>
        </Center>
      </PresenceTransition>
      }
      {eventDisplayBoard === true &&
        <PresenceTransition visible={eventDisplayBoard} initial={{
        opacity: 0
        }} animate={{
        opacity: 1,
        transition: {
          duration: 250
        }
        }}
        >

          <Center style={{position:'absolute', bottom: 100, height: 'auto'}} pl="0" mt="7" rounded="lg" minW="100%" _text={{
          color: "white"
          }} shadow="9" shadowOffset="-20">
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#d1fae5', '#34d399']} style={styles.linearGradientEventBoard}>
              <Text >{eventDisplayBoardText}</Text>
            </LinearGradient>
            </Center>
          </Center>
        </PresenceTransition>
        }
    </Container>
  </Center>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  insideContainer: {
    flex: 1,
    //width: '100%',
    height: '100%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: '100%',
  },
  linearGradientSquare: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },
  linearGradientEventBoard: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    //marginLeft: 25,
    //marginRight: 25',
    width: '100%',
  },
})

export default GameHome;

/*
{games[0].firstHalf === false && games[0].secondHalf === false && games[0].halfTime === 0 &&
<Box style={{position:'absolute', left: 0, top: 0, right: 0, height: '100%', zIndex: 3, elevation: 3, backgroundColor: 'rgba(20,20,20,0.7)', justifyContent: 'center' }} bg="#333" p="0" mt="0" pl="8" pr="8" minW="100%" h="300" shadow="9" _text={{color: "white"
}}>
  <Text style={{color: "#fff", fontSize: 22, marginBottom: 10}}>When you're ready -</Text>
  <Text style={{color: "#fff", fontSize: 22, marginBottom: 20}}>tap "Kick Off" to start the timer!</Text>
  <KickOff />

</Box>
}
*/

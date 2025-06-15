import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, PresenceTransition } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';

import PositionTimes from '../../Util/PositionTimes.js';

import SelectPlayerList from '../AddPlayers/SelectPlayerList.js'
import FormationBoard from '../FormationBoard/FormationBoard.js'
import GameEventsHtFt from '../Game/GameEventsHtFt.js'

const SubstitutionHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getTeamPositions, setTeamPositions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  const whereFrom = props.route.params.whereFrom

  const { navigate } = props.navigation;

  let teamPositionsArray = []

  /*
  useEffect(() => {
        // Call only when screen open or when back on screen

          games[0].teamPlayers.map(player => {
              teamPositionsArray.push({playerId: player.id, currentPosition: player.currentPosition })
              setTeamPositions(teamPositionsArray)
          })

  }, [])
  */

  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
  }

  const setGoalOpenStatus = (isGoalOpen) => {
    setIsGoalOpen(isGoalOpen)
  }

  const goToEvents = () => {

    navigate('EventsHome');

  }

  const continueSetup = () => {

  //console.log(JSON.stringify(getTeamPositions) + ' JSON.stringify(getTeamPositions)');
  //console.log(getTeamPositions[0].currentPosition + ' getTeamPositions[0].currentPosition');

    let naCount = 0

    games[0].teamPlayers.map(player => {

    //console.log(JSON.stringify(player) + ' check player before functions.');
      //console.log('checking savePositionTime ok 5');
      //Alert.alert("checking savePositionTime ok 5" )
      const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed);
      const positionTimesSaveFirst = positionTimesSave[0];

    //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst');
      player = positionTimesSaveFirst
    //console.log(JSON.stringify(player) + ' now check player after update.');

      /*
      try {
        const positionFwdTimeIndex = player.postionTimes.fwd.findIndex(x => x.fin === 99999999);

        if (positionFwdTimeIndex !== -1 ) {
          player.postionTimes.fwd[positionFwdTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }

        try {
          const positionMidTimeIndex = player.postionTimes.mid.findIndex(x => x.fin === 99999999);
          if (positionMidTimeIndex !== -1 ) {
            player.postionTimes.mid[positionMidTimeIndex].fin = secondsElapsed
          }
        }
        catch {
          //do nothing.
        }

        try {
        const positionDefTimeIndex = player.postionTimes.def.findIndex(x => x.fin === 99999999);
        if (positionDefTimeIndex !== -1 ) {
          player.postionTimes.def[positionDefTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }

      try {
        const positionGolTimeIndex = player.postionTimes.gol.findIndex(x => x.fin === 99999999);
        if (positionGolTimeIndex !== -1 ) {
          player.postionTimes.gol[positionGolTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }

      try {
        const positionSubTimeIndex = player.postionTimes.sub.findIndex(x => x.fin === 99999999);
        if (positionSubTimeIndex !== -1 ) {
          player.postionTimes.sub[positionSubTimeIndex].fin = secondsElapsed
        }
      }
      catch {
        //do nothing.
      }
      */


    //console.log(JSON.stringify(teamPositionsIndex) + ' what is teamPositionsIndex');

      //if (teamPositionsIndex !== -1 ) {
      //console.log(getTeamPositions[teamPositionsIndex] + ' what is getTeamPositions[teamPositionsIndex]');
      //console.log(getTeamPositions[teamPositionsIndex].currentPosition + ' what is getTeamPositions[teamPositionsIndex].currentPosition');
      //if (player.currentPosition !== getTeamPositions[teamPositionsIndex].currentPosition) {

      const positionTimesGet = PositionTimes.getPositionTime(player, secondsElapsed, games[0].gameHalfTime, games[0].halfTime);
      const positionTimesGetSecond = positionTimesGet[0];
      naCount = positionTimesGet[1];

      player = positionTimesGetSecond

      /*
          if (player.currentPosition === 'NA') {
            naCount = naCount + 1
          }
          else if (player.currentPosition === 'fwd') {
          //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
          //console.log(JSON.stringify(player.postionTimes.fwd) + ' what is player.postionTimes[0].fwd');
            try {
              try {
                const positionFwdTimeIndex = player.postionTimes.fwd.findIndex(x => x.fin === 99999999);

                if (positionFwdTimeIndex !== -1 ) {
                  player.postionTimes.fwd[positionFwdTimeIndex].fin = secondsElapsed
                }
              }
              catch {
                //do nothing.
              }
              player.postionTimes.fwd.push({st: secondsElapsed, fin: 99999999})
            }
            catch {
              player.postionTimes.fwd = [{st: secondsElapsed, fin: 99999999}]
            }
          }
          else if (player.currentPosition === 'mid') {
          //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
          //console.log(JSON.stringify(player.postionTimes.mid) + ' what is player.postionTimes[0].mid');
            try {
              try {
                const positionMidTimeIndex = player.postionTimes.mid.findIndex(x => x.fin === 99999999);
                if (positionMidTimeIndex !== -1 ) {
                  player.postionTimes.mid[positionMidTimeIndex].fin = secondsElapsed
                }
              }
              catch {
                //do nothing.
              }
              player.postionTimes.mid.push({st: secondsElapsed, fin: 99999999})
            }
            catch {
              player.postionTimes.mid = [{st: secondsElapsed, fin: 99999999}]
            }
          }
          else if (player.currentPosition === 'def') {
          //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
          //console.log(JSON.stringify(player.postionTimes.def) + ' what is player.postionTimes[0].def');
            try {
              try {
              const positionDefTimeIndex = player.postionTimes.def.findIndex(x => x.fin === 99999999);
              if (positionDefTimeIndex !== -1 ) {
                player.postionTimes.def[positionDefTimeIndex].fin = secondsElapsed
              }
            }
            catch {
              //do nothing.
            }
              player.postionTimes.def.push({st: secondsElapsed, fin: 99999999})
            }
            catch {
              player.postionTimes.def = [{st: secondsElapsed, fin: 99999999}]
            }
          }
          else if (player.currentPosition === 'gol') {
          //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
          //console.log(JSON.stringify(player.postionTimes.gol) + ' what is player.postionTimes[0].gol');
            try {
              try {
                const positionGolTimeIndex = player.postionTimes.gol.findIndex(x => x.fin === 99999999);
                if (positionGolTimeIndex !== -1 ) {
                  player.postionTimes.gol[positionGolTimeIndex].fin = secondsElapsed
                }
              }
              catch {
                //do nothing.
              }
              player.postionTimes.gol.push({st: secondsElapsed, fin: 99999999})
            }
            catch {

              player.postionTimes.gol = [{st: secondsElapsed, fin: 99999999}]
            }
          }
          else if (player.currentPosition === 'sub') {
          //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
          //console.log(JSON.stringify(player.postionTimes.sub) + ' what is player.postionTimes[0].sub');
            try {
              try {
                const positionSubTimeIndex = player.postionTimes.sub.findIndex(x => x.fin === 99999999);
                if (positionSubTimeIndex !== -1 ) {
                  player.postionTimes.sub[positionSubTimeIndex].fin = secondsElapsed
                }
              }
              catch {
                //do nothing.
              }
              player.postionTimes.sub.push({st: secondsElapsed, fin: 99999999})
            }
            catch {
              player.postionTimes.sub = [{st: secondsElapsed, fin: 99999999}]
            }
          }

          */


      //}
    //}
    })




    if (naCount === 0) {


      if (games[0].halfTime === 1) {
        games[0].halfTime = 2
      }

    //console.log(JSON.stringify(games) + ' just need to check evenrything here before i save.');
    //console.log(JSON.stringify(games[0].teamPlayers) + ' games[0].teamPlayers just need to check evenrything here before i save.');
      dispatch(updateGames(games))

      const teamIdCodeGames = games[0].teamIdCode
      const gameIdDb = games[0].gameIdDb

      firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
         game: games[0],
       })

      navigate('GameHome', {
        teamId: games[0].teamId,
        teamIdCode: games[0].teamIdCode
      });
    }
    else {
      Alert.alert("Please add a position for each player, or select 'ABS' if player is absent." )
    }

  }

  const teamType = props.route.params.teamType

        return (
          <Center>
            <Container h="100%" w="100%" maxWidth="100%">
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
            <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
            {whereFrom === 'HT' &&
              <Box mt="1">
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  <Heading mb="2" mt="2" style={{color: '#fff'}}>Half-Time Overview</Heading>
                  </LinearGradient>
                  <HStack>
                    {isGoalOpen === false &&
                      <Button pl="0" pr="0" pt="0" pb="1" variant="unstyled" onPress={() => setGoalOpenStatus(true)}>
                        <HStack>
                          {isGoalOpen ? minusIcon : plusIcon}
                          <Center pl="2">
                            <Text style={{color: '#0891b2', fontSize: 20}}>SHOW GOALS</Text>
                          </Center>
                        </HStack>
                      </Button>
                    }
                    {isGoalOpen === true &&
                      <Box style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                      <Button pl="0" pr="0" pt="0" pb="1" variant="unstyled" onPress={() => setGoalOpenStatus(false)}>
                      <HStack>
                        {isGoalOpen ? minusIcon : plusIcon}
                        <Center pl="2">
                          <Text style={{color: '#0891b2', fontSize: 20}}>HIDE GOALS</Text>
                        </Center>
                      </HStack>
                      </Button>
                      <HStack style={{borderTopWidth: 2, borderTopColor: '#333', borderBottomWidth: 2, borderBottomColor: '#333'}}>
                      <ScrollView style={{maxHeight: 130}}>
                        <GameEventsHtFt />
                      </ScrollView>
                      </HStack>
                      </Box>
                    }
                  </HStack>
              </Box>
            }

              <View style={{borderBottomColor: '#000', borderBottomWidth: 2, shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5}} />
              <Heading mb="0" mt="2" style={styles.textHeading}>
                Current Players
              </Heading>
              <Text style={styles.textTwelve}>Ordered by current position (FWD, MID, DEF, GOL, SUB)</Text>

              <Box style={{borderBottomColor: '#aaa', borderBottomWidth: 3, marginBottom: 3}}>
              </Box>
              <SelectPlayerList teamId={games[0].teamId} whereFrom={1} navigation={props.navigation} teamIdCode={games[0].teamIdCode} />


          <Box minW="100%" minH="23%" safeAreaTop alignSelf="center" style={{paddingTop: 0, borderTopColor: '#aaa', borderTopWidth: 3, marginTop: 3}}>
            <HStack alignItems="center" mt="3" pb="0" shadow={6} >
              <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} style={{marginBottom: 0}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>
            </HStack>
            <HStack>
              <Text style={{paddingLeft: 25, fontSize: 12, paddingBottom: 15, color: '#333', marginTop: 15}}>Team ID: {games[0].teamIdCode}</Text>
            </HStack>
          </Box>

        </View>
            </Container>

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
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  textHeading: {
    lineHeight: 0,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 20,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textTwelve: {
    fontSize: 12,
    marginBottom: 5,
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
  },
})

export default SubstitutionHome;

/*
<Heading mb="2" mt="2" >
  Current Substitutes:
</Heading>
<View style={{borderBottomColor: '#000', borderBottomWidth: 2, shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 5}} />
  <SelectPlayerList teamId={games[0].teamId} whereFrom={11} navigation={props.navigation}/>

  */

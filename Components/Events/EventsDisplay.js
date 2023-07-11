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
const whistleIcon = <Icon name="whistle-outline" size={30} color="#aaa" />;
const soccerBallIcon = <IconFA name="soccer-ball-o" size={20} color="#fff" />;
const scoreboardlIcon = <Icon name="scoreboard-outline" size={20} color="#aaa" />;
const subOffIcon = <Icon name="account-sync-outline" size={20} color="#aaa" />;
const assistIcon = <Icon name="progress-star" size={20} color="#aaa" />;
const defTacIcon = <IconOc name="stop" size={20} color="#aaa" />;
const golSavIcon = <IconMa name="sports-handball" size={20} color="#fff" />;
const golRemoveIcon = <IconMa name="error-outline" size={20} color="#aaa" />;



import { updateGames } from '../../Reducers/games';

//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const EventsDisplay = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId

  const { navigate } = props.navigation;


  const getGameEvents = () => {

    let _games = []
    if (props.whereFrom === 77) {
      try {
        _games = [...props.gameData]
      }
      catch {
        _games = [{...props.gameData}]
      }
    }
    else {
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }
    }



    const gameEventsDisplay = _games[0].gameEvents.slice(0).reverse().map(gameEvent => {
    if (gameEvent.eventType === 'ko') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#d1fae5" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#d1fae5" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#d1fae5" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{whistleIcon}</Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </Box>
        </LinearGradient>
        <Box style={{borderTopColor: '#ccc', borderTopWidth: 2, marginTop: 5, marginBottom: 5}}>
        </Box>
        </Box>
      )
    }
    else if (gameEvent.eventType === 'ft') {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#d1fae5" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#34d399', '#059669']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#34d399" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
          <Box>
            <HStack>

              <VStack minW="100%">
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
              <HStack>
              <Center maxW="40%" minW="40%">
                <VStack >
                  <Text style={{color: '#fff', fontSize: 16, textAlign: 'center', paddingRight: 10}}>{homeTeamName}</Text>
                </VStack>
                </Center>
                <Center maxW="10%" minW="10%">
                  <VStack mr="1">
                  <Box bg="#000" pl="2" pr="2" pt="2" pb="2">
                    <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>{homeTeamScore}</Text>
                    </Box>
                  </VStack>
                  </Center>
                  <Center maxW="10%" minW="10%">
                  <VStack>
                  <Box bg="#000" pl="2" pr="2" pt="2" pb="2">
                    <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>{awayTeamScore}</Text>
                    </Box>
                  </VStack>
                  </Center>
                  <Center maxW="40%" minW="40%">
                  <VStack>
                    <Text style={{color: '#fff', fontSize: 16, textAlign: 'center', paddingLeft: 10}}>{awayTeamName}</Text>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%" maxW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fecaca" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{subOffIcon}</Text>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%" maxW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#ecfdf5" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{subOffIcon}</Text>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fde047', '#eab308']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%" maxW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fef9c3" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a8a29e', '#78716c']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%" maxW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#e7e5e4" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4aa9ff', '#0077e6']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%" maxW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#7cc2ff" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
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
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#f472b6', '#db2777']} style={styles.linearGradient}>
          <Box>
            <HStack>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fff" p="2" pt="1" pb="1" mr="4" minW="16" style={{borderRadius: 5}}>
                  <Center>
                    <Text>{formattedSeconds(gameEvent.eventTime)}<Text style={{fontSize: 10}}>min</Text></Text>
                    </Center>
                  </Box>
                </VStack>
              </Center>
              <Center style={{textAlign: 'left', alignItems: 'flex-start'}}>
                <VStack minW="60%" maxW="60%">
                  <Text style={{color: '#fff', fontSize: 16}}>{gameEvent.eventText}</Text>
                </VStack>
              </Center>
              <Center>
                <VStack minW="20%">
                  <Box bg="#fce7f3" p="2" pt="1" pb="1" mr="4" minW="10" style={{borderRadius: 5, justifyContent: 'flex-end'}}>
                  <Center>
                    <Text>{golRemoveIcon}</Text>
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


        return (

            <View>

                  {getGameEvents()}

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

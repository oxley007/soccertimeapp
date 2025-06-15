import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, FlatList, VStack, HStack, Spacer } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const pencilIcon = <Icon name="pencil" size={14} color="#E879F9" />;

import { updateGames } from '../../Reducers/games';

//import AddPositions from '../AddPositions/AddPositions'
import SubstitutionTimes from '../Substitution/SubstitutionTimes'
import GameTimeSubTime from '../Game/GameTimeSubTime'
import SeasonStats from '../SeasonStats/SeasonStats'
import SeasonPositionStats from '../SeasonStats/SeasonPositionStats'
import SelectSeason from '../Setup/SelectSeason.js'

const SelectPlayerList = (props)=>{

  const [getTeamId, setGetTeamId] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenPlayer, setIsOpenPlayer] = React.useState(false);
  const [prevGameTime, setPrevGameTime] = React.useState(false);

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const whereFrom = props.whereFrom

  const { navigate } = props.navigation;

  const editPlayer = (item) => {
    navigate('EditPlayerName', {
      playerData: item,
      whereFrom: whereFrom,
    });
  }

  const setOpenStatus = (isOpen, id) => {

    setIsOpen(isOpen)

  }

  const setOpenStatusPlayerDelete = (isOpenPlayer, id) => {

    setIsOpenPlayer(isOpenPlayer)

  }

  const checkData = () => {

 //console.log('marker here ot find.');
 //console.log(JSON.stringify(props.gameData) + ' checking JSON data here.')


  }

  const otherDisplay = (item) => {

 //console.log(JSON.stringify(item.postionTimes) + ' item.postionTimes is???');

    const gamesLength = games.length

 //console.log(gamesLength + ' what number?');

      return (
        <View>
        {item.delete !== true && item.currentPosition !== 'abs' &&
          <Box shadow="7" style={{marginBottom: 10}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
          {item.id === getTeamId &&
            <Box borderBottomWidth="1" _dark={{
              borderColor: "muted.50"
            }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
              <HStack space={[2, 3]} justifyContent="space-between">
                <VStack>
                  <Text _dark={{
                    color: "warmGray.50"
                  }} color="#fff" bold>
                      {item.playerName}
                    </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" alignSelf="flex-start">
                  {item.playerId}
                </Text>
              </HStack>
              {whereFrom === 1 &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item} />
            </HStack>
          }

            </Box>
          }
          {item.id !== getTeamId &&
            <Box mb="2" py="2">
              <HStack space={[2, 3]} justifyContent="space-between">
              {whereFrom !== 'prevGame' &&
                <Button size="xs" pl="2" pr="2" variant="subtle" bg="#666" onPress={() => editPlayer(item)}>{pencilIcon}</Button>
              }
                <VStack>
                  <Heading size="md" _dark={{
                    color: "warmGray.50"
                  }} color="#fff" >
                    {item.playerName}
                  </Heading>
                </VStack>
                <Spacer />
                <Text fontSize="xs" _dark={{
                  color: "warmGray.50"
                }} color="#fff" alignSelf="flex-start">
                  Player ID: {item.playerId}
                </Text>
              </HStack>
              {whereFrom === 1 &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
              }
              {whereFrom === 11 &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
              }
              {whereFrom === 'prevGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
              }
              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
              }

              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
              </HStack>
            }
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
          {whereFrom === 11 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
          </HStack>
        }
          {whereFrom === 'prevGame' &&
          <HStack space={[2, 3]} justifyContent="space-between">
          <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
          </Box>
          <Box minW="32%" ml="2">
            <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Game Stats</Text>
          </Box>
          <Box mr="3" minW="48%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
          </Box>
          </HStack>
        }
          {whereFrom === 'prevGame' &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} prevGameTime={props.gameData.gameHalfTime} prevGameTimePlayer={props.gameData.game.gameHalfTime} dataFrom={props.dataFrom}/>
          </HStack>
        }
        {whereFrom === 55 &&
        <HStack space={[2, 3]} justifyContent="space-between">
        <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
        </Box>
        <Box minW="32%" ml="2">
          <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Game Stats</Text>
        </Box>
        <Box mr="3" minW="48%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
        </Box>
        </HStack>
      }
        {whereFrom === 55 &&
        <HStack space={[2, 3]} justifyContent="space-between">
          <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} prevGameTime={props.gameData.gameHalfTime}/>
        </HStack>
      }
            <HStack mt="3">
            {whereFrom === 1 &&
              <HStack>
              {gamesLength > 1 &&
                <HStack>
              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>
              }
                </HStack>
            }
            {whereFrom === 11 &&
              <HStack>
              {gamesLength > 1 &&
                <HStack>
              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>
              }
                </HStack>
            }
            {whereFrom === 'prevGame' &&
              <HStack>
              {gamesLength > 1 &&
                <HStack>
              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>
              }
                </HStack>
            }
            {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' && whereFrom !== 55 &&
              <HStack>
              {gamesLength > 1 &&
                <HStack>
                <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                <Box minW="38%" ml="2">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3" minW="47%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>
              }
              </HStack>
            }
            </HStack>
            {isOpen === true &&
              <Box>
                {whereFrom === 1 &&
                  <Box>
                    {gamesLength > 1 &&
                      <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                    }
                  </Box>
                }
                {whereFrom === 11 &&
                  <Box>
                    {gamesLength > 1 &&
                  <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                }
                </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>
                  {gamesLength > 1 &&
                  <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                }
                </Box>
                }
                </Box>
            }
            {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' &&  whereFrom !== 55 &&
            <Box>
              {gamesLength > 1 &&
            <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
          }
          </Box>
            }
            {isOpen === true &&
              <Box>
                {whereFrom === 1 &&
                  <Box>
                    {gamesLength > 1 &&
                  <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                }
                </Box>
                }
                {whereFrom === 11 &&
                  <Box>
                    {gamesLength > 1 &&
                  <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                }
                </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>
                  {gamesLength > 1 &&
                  <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                }
                </Box>
                }
              </Box>
            }
            {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' && whereFrom !== 55 &&
            <Box>
              {gamesLength > 1 &&
            <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
        }
          </Box>
            }
            </Box>
          }
          </LinearGradient>
          </Box>
        }
        </View>
      )
  }

  const playerHomeDisplay = (item) => {

 //console.log(whereFrom + ' playerList playerHomeDisplay');

 //console.log(JSON.stringify(item.postionTimes) + ' item.postionTimes is??? 2');

    const gamesLength = games.length

 //console.log(gamesLength + ' what number?');

    return (
        <View>
        {item.delete !== true &&
          <Box shadow="7" style={{marginBottom: 10}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
          {item.id === getTeamId &&
            <Box borderBottomWidth="1" _dark={{
              borderColor: "muted.50"
            }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
              <HStack space={[2, 3]} justifyContent="space-between">
                <VStack>
                  <Text _dark={{
                    color: "warmGray.50"
                  }} color="#fff" bold>
                      {item.playerName}
                    </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" alignSelf="flex-start">
                  {item.playerId}
                </Text>
              </HStack>
              {whereFrom === 1 &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item} />
            </HStack>
          }

            </Box>
          }
          {item.id !== getTeamId &&
            <Box mb="2" py="2">
              <HStack space={[2, 3]} justifyContent="space-between">
                <Button size="xs" pl="2" pr="2" variant="subtle" bg="white" onPress={() => editPlayer(item)}>{pencilIcon}</Button>
                <VStack>
                  <Heading size="md" _dark={{
                    color: "warmGray.50"
                  }} color="#fff" >
                    {item.playerName}
                  </Heading>
                </VStack>
                <Spacer />
                <Text fontSize="xs" _dark={{
                  color: "warmGray.50"
                }} color="#fff" alignSelf="flex-start">
                  Player ID: {item.playerId}
                </Text>
              </HStack>
              {whereFrom === 1 &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
              }
              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} />
              </HStack>
              }

              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
              </HStack>
            }
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
            <HStack mt="3">
            {whereFrom === 1 &&
              <HStack>
              {gamesLength > 1 &&
                <HStack>
              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>
              }
                </HStack>

            }
            {whereFrom === 'prevGame' &&
              <HStack>
              {gamesLength > 1 &&
                <HStack>
              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>
              }
                </HStack>
            }
            {whereFrom !== 1 && whereFrom !== 'prevGame' &&
              <HStack>
              {gamesLength > 1 &&
                <HStack>
                <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                <Box minW="38%" ml="2">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3" minW="47%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>
              }
              </HStack>
            }
            </HStack>
            {isOpen === true &&
              <Box>
                {whereFrom === 1 &&
                  <Box>
                  {gamesLength > 1 &&
                    <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                  }
                  </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>
                  {gamesLength > 1 &&
                    <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                  }
                </Box>
                }
                </Box>
            }
            {whereFrom !== 1 && whereFrom !== 'prevGame' &&
            <Box>
              {gamesLength > 1 &&
            <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
          }
          </Box>
            }
            {isOpen === true &&
              <Box>
                {whereFrom === 1 &&
                    <Box>
                  {gamesLength > 1 &&
                    <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                  }
                </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>
                  {gamesLength > 1 &&
                    <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                  }
                </Box>
                }
              </Box>
            }
            {whereFrom !== 1 && whereFrom !== 'prevGame' &&
              <Box>
              {gamesLength > 1 &&
                <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
              }
            </Box>
            }
            </Box>
          }
          </LinearGradient>
          </Box>
        }
        </View>
    )

  }

  const playerHomeDisplayDeleted = (item) => {

    const gamesLength = games.length

 //console.log(gamesLength + ' what number?');

    return (
      <View>
      {item.delete === true &&
        <View style={{marginTop: 10}}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

          <Box mb="2" py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Button size="xs" pl="2" pr="2" variant="subtle" bg="white" onPress={() => editPlayer(item)}>{pencilIcon}</Button>
              <VStack>
                <Heading size="md" _dark={{
                  color: "warmGray.50"
                }} color="#fff" >
                  {item.playerName}
                </Heading>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
                color: "warmGray.50"
              }} color="#fff" alignSelf="flex-start">
                Player ID: {item.playerId}
              </Text>
            </HStack>
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item} />
            </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item} />
            </HStack>
            }

            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
          {whereFrom === 1 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
          </HStack>
        }
          <HStack mt="3">
          {whereFrom === 1 &&
            <HStack>
            {gamesLength > 1 &&
              <HStack>
            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              </HStack>
            }
              </HStack>
          }
          {whereFrom === 'prevGame' &&
            <HStack>
            {gamesLength > 1 &&
              <HStack>
            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              </HStack>
            }
              </HStack>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
            <HStack>
            {gamesLength > 1 &&
              <HStack>
              <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              <Box minW="38%" ml="2">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3" minW="47%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              </HStack>
            }
            </HStack>
          }
          </HStack>
          {isOpen === true &&
            <Box>
              {whereFrom === 1 &&
                <Box>
                {gamesLength > 1 &&
                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>
              {gamesLength > 1 &&
                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
                </Box>
              }
              </Box>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
          <Box>
          {gamesLength > 1 &&
          <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
        }
        </Box>
          }
          {isOpen === true &&
            <Box>
              {whereFrom === 1 &&
                <Box>
                {gamesLength > 1 &&
                <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>
              {gamesLength > 1 &&
                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
              </Box>
              }
            </Box>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
          <Box>
          {gamesLength > 1 &&
          <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
        }
        </Box>
          }
          </Box>

        </LinearGradient>
        </View>

      }
      </View>
    )

  }

  const otherDisplayDeleted = (item) => {

    const gamesLength = games.length

 //console.log(gamesLength + ' what number?');

    return (
      <View>
      {item.delete === true || item.currentPosition === 'abs' &&
        <View style={{marginTop: 10}}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

          <Box mb="2" py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Button size="xs" pl="2" pr="2" variant="subtle" bg="white" onPress={() => editPlayer(item)}>{pencilIcon}</Button>
              <VStack>
                <Heading size="md" _dark={{
                  color: "warmGray.50"
                }} color="#fff" >
                  {item.playerName}
                </Heading>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
                color: "warmGray.50"
              }} color="#fff" alignSelf="flex-start">
                Player ID: {item.playerId}
              </Text>
            </HStack>
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item} />
            </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item} />
            </HStack>
            }

            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
          {whereFrom === 1 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
          </HStack>
        }
          <HStack mt="3">
          {whereFrom === 1 &&
            <HStack>
            {gamesLength > 1 &&
              <HStack>
            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              </HStack>
            }
              </HStack>
          }
          {whereFrom === 'prevGame' &&
            <HStack>
            {gamesLength > 1 &&
              <HStack>
            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              </HStack>
            }
              </HStack>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
            <HStack>
            {gamesLength > 1 &&
              <HStack>
              <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              <Box minW="38%" ml="2">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3" minW="47%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              </HStack>
            }
            </HStack>
          }
          </HStack>
          {isOpen === true &&
            <Box>
              {whereFrom === 1 &&
                <Box>
                {gamesLength > 1 &&
                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>
              {gamesLength > 1 &&
                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
              </Box>
              }
              </Box>
          }
          {whereFrom !== 1 &&
            <Box>
            {gamesLength > 1 &&
          <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
        }
        </Box>
          }
          {isOpen === true && whereFrom !== 'prevGame' &&
            <Box>
              {whereFrom === 1 &&
                <Box>
                {gamesLength > 1 &&
                <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>
              {gamesLength > 1 &&
                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
              }
              </Box>
              }
            </Box>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
          <Box>
          {gamesLength > 1 &&
          <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
        }
        </Box>
          }
          </Box>

        </LinearGradient>
        </View>

      }
      </View>
    )

  }

  const getPlayers = () => {

    let _teamPlayers = []
    try {
      _teamPlayers = [...teamPlayers]
    }
    catch {
      _teamPlayers = [{...teamPlayers}]
    }

    /*
    if (props.dataFrom === 181) {
   //console.log(JSON.stringify(playerUserDataPlayers) + ' What are my options?');

      try {
        _teamPlayers = [...teamPlayers]
      }
      catch {
        _teamPlayers = [{...teamPlayers}]
      }
    }
    */

    let _games = []
    if (props.dataFrom === 77 || props.dataFrom === 181 || props.dataFrom === 55) {
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

  //console.log(JSON.stringify(_games) + ' check ing games on select palyer list');
  //console.log(JSON.stringify(_games[0].teamPlayers) + ' check ing games.teamplayers on select palyer list');

    //const playerNamesAlphaOrder = _games[0].teamPlayers.sort((a, b) => a.playerName.localeCompare(b.playerName))

    //const playerNamesAlphaOrder = _games[0].teamPlayers.sort((a, b) => a.split(" ").pop()[0] > b.split(" ").pop()[0])
    //const playerNamesAlphaOrder = a.split(" ").pop()[0] > b.split(" ").pop()[0]
    //const gamesOutput = JSON.stringify(_games)


    //const playerNamesAlphaOrder = _games[0].teamPlayers.sort((a, b) => {
      //const namesSplit = a.playerName.split(' ');
      //const namesSplitB = b.playerName.split(' ')
    //console.log(namesSplit + ' namesSplit is?');
      /*
      let lastNameArray = []
      _games[0].teamPlayers.map(a => {
        let [,first, last] = a.playerName.split(/<[/\w\s-]+>|\s/g);
        if (last === undefined) {
          last = 'z'
        }

        lastNameArray.push({lastName: last, playerId: a.id})

      })
      */

      //const playerNamesAlphaOrder = _games[0].teamPlayers.sort((a, b) => a.playerName.localeCompare(b.playerName))

      //const playerNamesAlphaOrder = _games[0].teamPlayers.sort((a, b) => lastNameArraySort.indexOf(a.id) - lastNameArraySort.indexOf(b.id));

      //const lastNameArraySort = lastNameArray.sort((a, b) => a.playerName.localeCompare(b.playerName))


    //let aNames = []
    //let aSurname = []
    //let bNames = []
    //let bSurname = []

    //const byPosition = _games[0].teamPlayers.sort(function(a,b) {return (a.currentPosition > b.currentPosition) ? 1 : ((b.currentPosition > a.currentPosition) ? -1 : 0);} );

    const priority = [ "fwd", "mid", "def", "gol", "sub", "abs"];
    let byPosition = []
    try {
      byPosition = _games[0].teamPlayers.sort( ( a, b ) => priority.indexOf( a.currentPosition ) - priority.indexOf( b.currentPosition ) );
    }
    catch {
      byPosition = []
    }

    let playerNamesAlphaOrder = []



    try {
      playerNamesAlphaOrder = _games[0].teamPlayers.slice().sort((a, b) =>
      {

     //console.log('in the slice - anything?');
     //console.log(a.playerName + ' a.playerName');
     //console.log(b.playerName + ' b.playerName');



          const aPlayerNameRaw = a.playerName
          let bPlayerNameRaw = b.playerName

          //check for hyphon name (i.e. oxley-hogan) and remove the hyphpon and the rest of the name (i.e. it would just be 'oxley').

           let aPlayerName = aPlayerNameRaw.replace(/-/g, "");
        //console.log(aPlayerName + ' aPlayerName');
           let bPlayerName = bPlayerNameRaw.replace(/-/g, "");
        //console.log(bPlayerName + ' bPlayerName');


          let [aNames, aSurname] = aPlayerName.match((/(.*)\s(\w+)$/)).slice(1);
          let [bNames, bSurname] = bPlayerName.match((/(.*)\s(\w+)$/)).slice(1);

          if (aSurname.localeCompare(bSurname))
              return aSurname.localeCompare(bSurname);
          else
              return aNames.localeCompare(bNames);
      });
    }
    catch {
      playerNamesAlphaOrder = []
    }

    if (props.dataFrom === 181 || props.dataFrom === 183) {
   //console.log(JSON.stringify(props.gameData) + ' check props.gameData first');
   //console.log(JSON.stringify(props.gameData.game) + ' check props.gameData.game');
   //console.log(JSON.stringify(props.gameData.game.teamPlayers) + ' check props.gameData.game.teamPlayers');
      //try {
        playerNamesAlphaOrder = props.gameData.game.teamPlayers.slice().sort((a, b) =>
        {
          try {
       //console.log('in the slice - anything?');
       //console.log(a.playerName + ' a.playerName');
       //console.log(b.playerName + ' b.playerName');



            const aPlayerNameRaw = a.playerName
            let bPlayerNameRaw = b.playerName

            //check for hyphon name (i.e. oxley-hogan) and remove the hyphpon and the rest of the name (i.e. it would just be 'oxley').
         //console.log(aPlayerNameRaw + ' aPlayerNameRaw')
         //console.log(bPlayerNameRaw + ' bPlayerNameRaw');
             let aPlayerName = aPlayerNameRaw.replace(/-/g, "");
          //console.log(aPlayerName + ' aPlayerName next');
             let bPlayerName = bPlayerNameRaw.replace(/-/g, "");
          //console.log(bPlayerName + ' bPlayerName next');


            let [aNames, aSurname] = aPlayerName.match((/(.*)\s(\w+)$/)).slice(1);
            let [bNames, bSurname] = bPlayerName.match((/(.*)\s(\w+)$/)).slice(1);


            if (aSurname.localeCompare(bSurname))
                return aSurname.localeCompare(bSurname);
            else
                return aNames.localeCompare(bNames);
              }
              catch {
                //nothing.
             //console.log('hit error on player names.');
              }
        });

      /*}
      catch {
        playerNamesAlphaOrder = []
      }*/

   //console.log(JSON.stringify(playerNamesAlphaOrder) + ' playerNamesAlphaOrder check 183 181');
    }

    /*
    if (props.dataFrom === 181 || props.dataFrom === 183) {

      let savedPlayers = []
      let savedPlayersCount = 0

   //console.log(JSON.stringify(props.gameData) + ' a bit of a check for props.gameData');
   //console.log(JSON.stringify(props.teamId) + ' a bit of a check for props.teamId');
   //console.log(JSON.stringify(props.item) + ' a bit of a check for props.item');
   //console.log(JSON.stringify(props.item.game.teamIdCode) + ' a bit of a check for props.item.game.teamId');

      const teamIdQuoteStr = props.item.game.teamIdCode;
      const teamIdStr = teamIdQuoteStr.replace(/['"]+/g, '');

      playerNamesAlphaOrder.map(player => {
     //console.log(savedPlayersCount + ' savedPlayersCount.');
        try {
      playerUserDataPlayers.reduce(function(acc, cur) {
     //console.log(JSON.stringify(cur) + ' cur is?');
     //console.log(playerUserDataPlayers[savedPlayersCount].playerId + ' what playerUserDataPlayers[savedPlayersCount].playerId?');

          if ((cur.playerId === playerUserDataPlayers[savedPlayersCount].playerId) && (cur.teamId === teamIdStr) && (props.dataFrom === 183)) {
            //return player
            savedPlayers.push(player);
          }
          else if (cur.playerId === playerUserDataPlayers[savedPlayersCount].playerId) {
            savedPlayers.push(player);
          }
          return acc;
        }, []);
      }
      catch {
        //do nothing.
      }
        savedPlayersCount++
      })

   //console.log(JSON.stringify(savedPlayers) + ' what is savedPlayers?');


      playerNamesAlphaOrder = savedPlayers

    }
    */


    /* TO DO!
    const playerNamesAlphaOrderSeason = playerNamesAlphaOrder.map(input => {

    })
    */

    if (whereFrom === 11) {

      let subPlayers = []
      playerNamesAlphaOrder.map(player => {

        if (player.currentPosition === 'sub') {
            subPlayers.push(player)
          }
        })

     //console.log(whereFrom + ' playerList 1');

      return (
      <FlatList data={subPlayers} renderItem={({
        item
        }) =>
        <View>
        {whereFrom === 7 &&
          playerHomeDisplay(item)
        }
        {whereFrom !== 7 &&
          otherDisplay(item)
        }

        </View>
    }
      keyExtractor={item => item.id} />
    )
    }
    else if (whereFrom === 1) {



     //console.log(whereFrom + ' playerList 2 & 3');

        return (
          <Box minW="100%">

            <FlatList data={byPosition} renderItem={({
              item
              }) =>
              <View>
              {whereFrom === 7 &&
                playerHomeDisplay(item)
              }
              {whereFrom !== 7 &&
                otherDisplay(item)
              }

              </View>
          }
            keyExtractor={item => item.id} />


            {isOpenPlayer === false &&
              <HStack mb="4">
                    <Button p="0" variant="unstyled" _text={{color: '#333', textDecorationLine: "underline"}} onPress={() => setOpenStatusPlayerDelete(true)}>
                      {isOpenPlayer ? '-Hide Absent/Deleted Players' : '+Show Absent/Deleted Players'}
                    </Button>
                    </HStack>
                  }
                  {isOpenPlayer === true &&
                    <Box>
                    <HStack>
                          <Button p="0" variant="unstyled" _text={{color: '#333', textDecorationLine: "underline"}} onPress={() => setOpenStatusPlayerDelete(false)}>
                            {isOpenPlayer ? '-Hide Absent/Deleted Players' : '+Show Absent/Deleted Players'}
                          </Button>
                          </HStack>
                          <HStack>
            <FlatList data={playerNamesAlphaOrder} renderItem={({
              item
              }) =>
              <View>
              {whereFrom === 7 &&
                playerHomeDisplayDeleted(item)
              }
              {whereFrom !== 7 &&
                otherDisplayDeleted(item)
              }
              </View>
          }
            keyExtractor={item => item.id} />
            </HStack>
            </Box>
          }



      </Box>
        )

    }
    else {

   //console.log(whereFrom + ' playerList 4 & 5 & 6');

   //console.log(JSON.stringify(playerNamesAlphaOrder) + ' playerNamesAlphaOrder check from prevGames..');

      return (
        <Box minW="100%">
        {whereFrom !== 1 && whereFrom !== 'endGame' && whereFrom !== 'prevGame' &&
          <VStack>

          <Heading fontSize="xl" p="3" pl="0" pb="1">

          </Heading>
          {whereFrom !== 55 &&
          <Text style={styles.textTen}>FWD = Forward/Striker; MID = Midfeild; DEF = Defender; GOL = Golie; SUB = Substitute; ABS = Absent</Text>
          }
          {
            whereFrom === 7 &&
            <SelectSeason navigation={props.navigation} whereFrom={props.whereFrom} />
          }
          {whereFrom !== 55 &&
          <Text style={styles.textFourteenBoldMargin}>Note! Tap 'SHOW FORMATION' at top of page for an overview of your player positions</Text>
        }
          </VStack>
        }

          <FlatList data={playerNamesAlphaOrder} renderItem={({
            item
            }) =>
            <View>
            {whereFrom === 7 &&
              playerHomeDisplay(item)
            }
            {whereFrom !== 7 &&
              otherDisplay(item)
            }

            </View>
        }
          keyExtractor={item => item.id} />


          {isOpenPlayer === false &&
            <HStack mb="4">
                  <Button p="0" variant="unstyled" _text={{color: '#333', textDecorationLine: "underline"}} onPress={() => setOpenStatusPlayerDelete(true)}>
                    {isOpenPlayer ? '-Hide Absent/Deleted Players' : '+Show Absent/Deleted Players'}
                  </Button>
                  </HStack>
                }
                {isOpenPlayer === true &&
                  <Box>
                  <HStack>
                        <Button p="0" variant="unstyled" _text={{color: '#333', textDecorationLine: "underline"}} onPress={() => setOpenStatusPlayerDelete(false)}>
                          {isOpenPlayer ? '-Hide Absent/Deleted Players' : '+Show Absent/Deleted Players'}
                        </Button>
                        </HStack>
                        <HStack>
          <FlatList data={playerNamesAlphaOrder} renderItem={({
            item
            }) =>
            <View>
            {whereFrom === 7 &&
              playerHomeDisplayDeleted(item)
            }
            {whereFrom !== 7 &&
              otherDisplayDeleted(item)
            }
            </View>
        }
          keyExtractor={item => item.id} />
          </HStack>
          </Box>
        }



    </Box>
      )
    }
    }

  const teamType = props.teamType

        return (

          <ScrollView>
              {getPlayers()}
          </ScrollView>

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
    borderRadius: 5
  },
  textTen: {
    fontSize: 10,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 10,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textFourteenBoldMargin: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 14,
      },
      default: {
        lineHeight: 0,
      }
      })
  },

})

export default SelectPlayerList;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, FlatList, VStack, HStack, Spacer } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const pencilIcon = <Icon name="pencil" size={14} color="#0891b2" />;

import { updateGames } from '../../Reducers/games';

//import AddPositions from '../AddPositions/AddPositions'
import SubstitutionTimes from '../Substitution/SubstitutionTimes'
import GameTimeSubTime from '../Game/GameTimeSubTime'
import SeasonStats from '../SeasonStats/SeasonStats'
import SeasonPositionStats from '../SeasonStats/SeasonPositionStats'
import SelectSeason from '../Setup/SelectSeason.js'
import StatsBoard from '../Stats/StatsBoard.js'
import GameStatsDisplay from '../Stats/GameStatsDisplay.js'
import GameStatsDisplayLive from '../Stats/GameStatsDisplayLive.js'
import GameStatsLive from '../Stats/GameStatsLive.js'
import PositionSortNew from './PositionSortNew.js'

const SelectPlayerStats = (props)=>{

  const [getTeamId, setGetTeamId] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenPlayer, setIsOpenPlayer] = React.useState(false);
  const [prevGameTime, setPrevGameTime] = React.useState(false);

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let fromContinueGame = useSelector(state => state.fromContinueGame.fromContinueGame);

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

  const otherDisplay = (item) => {

  //console.log(JSON.stringify(item.postionTimes) + ' item.postionTimes is???');

    let deleteStatus = false
      try {
      if (item.delete === undefined) {
        deleteStatus = false
      }
      else if (item.delete === true) {
        deleteStatus = true
      }
    }
    catch {
      deleteStatus = false
    }

      return (
        <View>
        {deleteStatus !== true && item.currentPosition !== 'abs' &&
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
                <GameTimeSubTime playerData={item} playerIndex={props.playerIndex}/>
                <Text>5</Text>
              </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item} playerIndex={props.playerIndex} />
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
              {whereFrom === 1 && props.selectPlayer !== true &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} playerIndex={props.playerIndex} />
              </HStack>
              }
              {whereFrom === 11 &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} playerIndex={props.playerIndex} />
              </HStack>
              }
              {whereFrom === 'prevGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} playerIndex={props.playerIndex} />
              </HStack>
              }
              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item} playerIndex={props.playerIndex} />
              </HStack>
              }
              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
              </HStack>
            }
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
            </HStack>
          }
          {whereFrom === 11 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
          </HStack>
        }
          {whereFrom === 'prevGame' &&
          <HStack space={[2, 3]} justifyContent="space-between">
          <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
          </Box>
          <Box minW="32%" ml="2">
            <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Game Stats</Text>
          </Box>
          <Box mr="3" minW="48%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
          </Box>
          </HStack>
        }
          {whereFrom === 'prevGame' &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} prevGameTime={props.gameData.gameHalfTime}/>
          </HStack>
        }
            <HStack mt="2">
            {whereFrom === 1 && props.selectPlayer !== true &&

                <HStack>
              <Box ml="1" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="45%" ml="3" mr="1">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Time/Stats</Text>
                </Box>
                <Box mr="3" minW="37%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

                </HStack>






            }



            {whereFrom === 11 &&

                <HStack>
              <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
                <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>

            }
            {whereFrom === 'prevGame' &&
              <HStack>

              <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
                <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

                </HStack>
            }
            {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' &&
              <HStack>

                <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                <Box minW="38%" ml="2">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3" minW="47%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

              </HStack>
            }
            </HStack>

                {whereFrom === 1 &&
                  <Box>

                      <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                  </Box>
                }
                {isOpen === true &&
                  <Box>
                {whereFrom === 11 &&
                  <Box>

                  <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>

                  <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                </Box>
                }
                </Box>
            }
            {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' &&
            <Box>

            <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />

          </Box>
            }

                {whereFrom === 1 &&
                  <Box>

                  <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 12}}>*Season Stats updated every minute</Text>
                </Box>
                }
                {isOpen === true &&
                  <Box>
                {whereFrom === 11 &&
                  <Box>

                  <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>


                </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>

                  <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                </Box>
                }
              </Box>
            }
            {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' &&
            <Box>

            <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />

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

  const playerHomeDisplayNew = (item) => {
    try {
    let deleteStatus = false
      try {
      if (item.delete === undefined) {
        deleteStatus = false
      }
      else if (item.delete === true) {
        deleteStatus = true
      }
    }
    catch {
      deleteStatus = false
    }

    //console.log(deleteStatus + ' ah?');
    //console.log('hit me! ok');
    //console.log(item.id + ' what is item.id');
    //console.log(getTeamId + ' what is getTeamId');
    //console.log('need to check Item here for this ' + JSON.stringify(item));

    const gameHalfTime = games[0].gameHalfTime

    console.log('check item here mmkay. '+ JSON.stringify(item));
    console.log(props.playerIndexPos + ' props.playerIndexPos is.');

    return (
        <View>
        {deleteStatus !== true &&
          <Box shadow="7">
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientPush}>

            <Box borderBottomWidth="1" _dark={{
              borderColor: "muted.50"
            }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
              <Box style={{backgroundColor: '#444', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10, borderRadius: 5}}>
                <VStack pt="1" pb="2" pl="1" style={{borderRadius: 5}}>
                  {gameHalfTime > secondsElapsed &&
                    <HStack>
                    {fromContinueGame === 1 &&
                      <Text _dark={{
                        color: "warmGray.50"
                      }} bold color="#ccc" style={{fontSize: 12}}>
                          Tap on a player's initials to change player and add stats
                      </Text>
                    }
                    </HStack>
                  }
                  <HStack>
                    <Text _dark={{
                        color: "warmGray.50"
                      }} color="#fff" bold mt="2"  style={{fontSize: 18, paddingBottom: 0, marginBottom: 0}}>
                          {item.playerName}:
                      </Text>
                    </HStack>
                  </VStack>
                <HStack>
                  <GameTimeSubTime playerData={item} newDisplay={props.newDisplay} playerIndex={props.playerIndex} gameSecondsElapsed={props.gameSecondsElapsed} />
                </HStack>
                {fromContinueGame === 1 &&
                  <HStack>
                    <GameStatsDisplayLive gameStats={item.gameStats} />
                  </HStack>
                }
                {whereFrom === 1 &&
                <Box>
                {fromContinueGame === 1 &&
                  <HStack mt="2" space={[2, 3]} justifyContent="space-between">

                    <StatsBoard statsPlayerId={item.playerId} newDisplay={props.newDisplay} />
                  </HStack>
                }
                </Box>
                }
                {fromContinueGame === 1 &&
                  <HStack>
                    <PositionSortNew playerData={undefined} navigation={props.navigation} playerIndex={props.playerIndexPos} fromLiveGame={props.fromLiveGame} />
                  </HStack>
                }
                </Box>

            </Box>
            </LinearGradient>
              </Box>
            }
            </View>
          )
        }
        catch {
          //nothing.
        }
  }

  const playerHomeDisplay = (item) => {

  //console.log(whereFrom + ' playerList playerHomeDisplay');
  //console.log(JSON.stringify(item) + ' JSON.stringify(item) no id?');
  //console.log(item.id + ' item.id - must have an id!?');

  //console.log(JSON.stringify(item.postionTimes) + ' item.postionTimes is??? 2');

    //const gamesLength = games.length

  //console.log(gamesLength + ' what number?');
    let deleteStatus = false
      try {
      if (item.delete === undefined) {
        deleteStatus = false
      }
      else if (item.delete === true) {
        deleteStatus = true
      }
    }
    catch {
      deleteStatus = false
    }


    return (
        <View>
        {deleteStatus !== true &&
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
                <GameTimeSubTime playerData={item}  playerIndex={props.playerIndex}/>
              </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item}  playerIndex={props.playerIndex}/>
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
                <GameTimeSubTime playerData={item}  playerIndex={props.playerIndex}/>
              </HStack>
              }
              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <GameTimeSubTime playerData={item}  playerIndex={props.playerIndex}/>
              </HStack>
              }

              {whereFrom === 'endGame' &&
              <HStack space={[2, 3]} justifyContent="space-between">
                <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
              </HStack>
            }
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
            </HStack>
          }
            <HStack mt="1">
            {whereFrom === 1 &&
              <HStack>

              <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
                <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>


            }
            {whereFrom === 'prevGame' &&
              <HStack>

              <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
                <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

                </HStack>
            }
            {whereFrom !== 1 && whereFrom !== 'prevGame' &&
              <HStack>

                <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                <Box minW="38%" ml="2">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3" minW="47%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

              </HStack>
            }
            </HStack>
            {isOpen === true &&
              <Box>
                {whereFrom === 1 &&
                  <Box>

                    <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                  </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>

                    <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                </Box>
                }
                </Box>
            }
            {whereFrom !== 1 && whereFrom !== 'prevGame' &&
              <Box>
                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />
              </Box>
            }
            {isOpen === true &&
              <Box>
                {whereFrom === 1 &&
                    <Box>

                    <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                </Box>
                }
                {whereFrom === 'prevGame' &&
                <Box>

                    <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                </Box>
                }
              </Box>
            }
            {whereFrom !== 1 && whereFrom !== 'prevGame' &&
              <Box>

                <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />

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


    let deleteStatus = false
      try {
      if (item.delete === undefined) {
        deleteStatus = false
      }
      else if (item.delete === true) {
        deleteStatus = true
      }
    }
    catch {
      deleteStatus = false
    }

    return (
      <View>
      {deleteStatus === true &&
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
              <GameTimeSubTime playerData={item} playerIndex={props.playerIndex} />
              <Text>1</Text>
            </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item}  playerIndex={props.playerIndex}/>
              <Text>2</Text>
            </HStack>
            }

            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
          {whereFrom === 1 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
          </HStack>
        }
          <HStack mt="1">
          {whereFrom === 1 &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
              <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom === 'prevGame' &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
              <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
            <HStack>

              <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              <Box minW="38%" ml="2">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3" minW="47%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

            </HStack>
          }
          </HStack>
          {isOpen === true &&
            <Box>
              {whereFrom === 1 &&
                <Box>

                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>

                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

                </Box>
              }
              </Box>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
          <Box>

          <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />

        </Box>
          }
          {isOpen === true &&
            <Box>
              {whereFrom === 1 &&
                <Box>

                <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>

                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

              </Box>
              }
            </Box>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
          <Box>

          <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />

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

    let deleteStatus = false
      try {
      if (item.delete === undefined) {
        deleteStatus = false
      }
      else if (item.delete === true) {
        deleteStatus = true
      }
    }
    catch {
      deleteStatus = false
    }

    return (
      <View>
      {deleteStatus === true || item.currentPosition === 'abs' &&
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
              <GameTimeSubTime playerData={item}  playerIndex={props.playerIndex}/>
              <Text>3</Text>
            </HStack>
            }
            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <GameTimeSubTime playerData={item}  playerIndex={props.playerIndex}/>
              <Text>4</Text>
            </HStack>
            }

            {whereFrom === 'endGame' &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
          {whereFrom === 1 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={item.postionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
          </HStack>
        }
          <HStack mt="1">
          {whereFrom === 1 &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
              <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom === 'prevGame' &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
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
              <Box mr="3" minW="40.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
            <HStack>

              <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
              <Box minW="38%" ml="2">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3" minW="47%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

            </HStack>
          }
          </HStack>
          {isOpen === true &&
            <Box>
              {whereFrom === 1 &&
                <Box>

                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>

                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

              </Box>
              }
              </Box>
          }
          {whereFrom !== 1 &&
            <Box>

          <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />

        </Box>
          }
          {isOpen === true && whereFrom !== 'prevGame' &&
            <Box>
              {whereFrom === 1 &&
                <Box>

                <SeasonStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

              </Box>
              }
              {whereFrom === 'prevGame' &&
              <Box>

                <SeasonPositionStats navigation={props.navigation} playerData={item} whereFrom={1} whatData={1}/>

              </Box>
              }
            </Box>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
          <Box>

          <SeasonStats navigation={props.navigation} playerData={item} whereFrom={whereFrom} />

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

    let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

    //console.log(JSON.stringify(_games) + ' _games check new');
    //console.log(JSON.stringify(_games[0]) + ' _games[0] check new');
    //console.log('_games[0].teamPlayers[0] check new ' + JSON.stringify(_games[0].teamPlayers));
    //console.log('games[0].teamPlayers[0] check new ' + JSON.stringify(games[0].teamPlayers));
      //_games[0].teamPlayers[0].positionDetails = [{ row: 4, column: 2, indexId: 0, initials: '' }]
    //console.log(_games[0].teamPlayers[0] + ' _games[0].teamPlayers[0].positionDetails' );


      let playerDisplayIndex = props.playerIndex

      if (props.setupSubs === true) {
        playerDisplayIndex = props.playerIndex - 1
      }
      else {
        playerDisplayIndex = props.playerIndex
      }

      let gamePlayerData = []
      try {
          gamePlayerData = props.gamePlayerData
      }
      catch {
        //nothing.
      }

      console.log('props.gamePlayerData here casue weird bug.. ' + JSON.stringify(props.gamePlayerData));
      console.log(props.playerIndex + ' props.playerIndex her is now.');
      console.log('gamePlayerData[playerDisplayIndex] here casue weird bug. ' + JSON.stringify(gamePlayerData[playerDisplayIndex]));

      //console.log(props.newDisplay + ' what is newDisplay?');

      return (
        <Box maxW="100%" minW="100%">
            <View>
            {props.newDisplay === true &&
              playerHomeDisplayNew(gamePlayerData[playerDisplayIndex])
            }
            {whereFrom === 7 && props.newDisplay !== true &&
              playerHomeDisplay(_games[0].teamPlayers[playerDisplayIndex])
            }
            {whereFrom !== 7 && props.newDisplay !== true &&
              otherDisplay(_games[0].teamPlayers[playerDisplayIndex])
            }

            </View>
          </Box>
      )
    }

  const teamType = props.teamType

        return (
          <Box>
          {props.newDisplay === true &&
            <Box>
            {getPlayers()}
            </Box>
          }
          {props.newDisplay !== true &&
          <ScrollView>
              {getPlayers()}
          </ScrollView>
          }
          </Box>

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
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  linearGradientPush: {
    flex: 1,
    //paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    ...Platform.select({
      ios: {
        paddingLeft: 15,
      },
      android: {
        paddingLeft: 15,
      },
      default: {
        paddingLeft: 15,
      }
      })
  },
})

export default SelectPlayerStats;

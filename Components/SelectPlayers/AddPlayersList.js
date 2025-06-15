import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, FlatList, VStack, HStack, Spacer } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const pencilIcon = <Icon name="pencil" size={14} color="#E879F9" />;

import { updateGames } from '../../Reducers/games';

//import AddPositions from '../AddPositions/AddPositions'
import SubstitutionTimes from '../Substitution/SubstitutionTimes'
import GameTimeSubTime from '../Game/GameTimeSubTime'
import SeasonStats from '../SeasonStats/SeasonStats'
import SeasonPositionStats from '../SeasonStats/SeasonPositionStats'
import SelectSeason from '../Setup/SelectSeason.js'

const AddPlayersList = (props)=>{

  const [getTeamId, setGetTeamId] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenPlayer, setIsOpenPlayer] = React.useState(false);
  const [prevGameTime, setPrevGameTime] = React.useState(false);

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);

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


  const otherDisplay = (item, inviteCount, playerCount) => {

  //console.log(JSON.stringify(item.postionTimes) + ' item.postionTimes is???');

    let itemPostionTimes = []
    if (item.postionTimes == undefined) {
      itemPostionTimes = []
    }
    else {
      itemPostionTimes = item.postionTimes
    }

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

    try {
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
              <Button size="xs" pl="2" pr="2" variant="subtle" bg="#333" onPress={() => editPlayer(item)}>{pencilIcon}</Button>
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
                <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
              </HStack>
            }
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
            </HStack>
          }
          {whereFrom === 11 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
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
            <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} prevGameTime={props.gameData.gameHalfTime}/>
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
              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>

            }
            {whereFrom === 'prevGame' &&
              <HStack>

              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

                </HStack>
            }
            {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' &&
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
        {whereFrom !== 1 && whereFrom !== 11 && whereFrom !== 'prevGame' &&
          <Box>
            {playerCount === 3 &&
              checkAddVid(inviteCount)
            }
          </Box>
        }

        </View>
      )
    }
    catch {
    //console.log('hit her enow maybe error.');
      //do nothing.
    }
  }

  const checkAddVid = (inviteCount) => {

    if (inviteCount < 6) {
      return (
        <View style={styles.containerYouTube}>
          <YoutubePlayer
            height={210}
            videoId={'zlXg7P9Kz4Y'}
          />
        </View>
      )
    }

  }

  const playerHomeDisplay = (item) => {

  //console.log(whereFrom + ' playerList playerHomeDisplay');
  //console.log(JSON.stringify(item) + ' JSON.stringify(item) no id?');
  //console.log(item.id + ' item.id - must have an id!?');

  //console.log(JSON.stringify(item.postionTimes) + ' item.postionTimes is??? 2');

    let itemPostionTimes = []
    if (item.postionTimes == undefined) {
      itemPostionTimes = []
    }
    else {
      itemPostionTimes = item.postionTimes
    }

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
                <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
              </HStack>
            }
            {whereFrom === 1 &&
            <HStack space={[2, 3]} justifyContent="space-between">
              <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
            </HStack>
          }
            <HStack mt="1">
            {whereFrom === 1 &&
              <HStack>

              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                </HStack>


            }
            {whereFrom === 'prevGame' &&
              <HStack>

              <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>
                <Box minW="32%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
                </Box>
                <Box mr="3">
                {isOpen === false &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                {isOpen === true &&
                <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                  {isOpen ? 'Hide' : 'Show'}
                </Button>
                }
                </Box>
                <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

                </HStack>
            }
            {whereFrom !== 1 && whereFrom !== 'prevGame' &&
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
              <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
          {whereFrom === 1 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
          </HStack>
        }
          <HStack mt="1">
          {whereFrom === 1 &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom === 'prevGame' &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
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
              <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom}/>
            </HStack>
          }
          {whereFrom === 1 &&
          <HStack space={[2, 3]} justifyContent="space-between">
            <SubstitutionTimes postionTimes={itemPostionTimes} currentPosition={item.currentPosition} playerId={item.id} playerData={item} whereFrom={whereFrom} selectPlayer={props.selectPlayer}/>
          </HStack>
        }
          <HStack mt="1">
          {whereFrom === 1 &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom === 'prevGame' &&
            <HStack>

            <Box ml="3" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
            </Box>
              <Box minW="32%" ml="3">
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
              </Box>
              <Box mr="3">
              {isOpen === false &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              {isOpen === true &&
              <Button p="0" variant="unstyled" _text={{color: '#E879F9', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                {isOpen ? 'Hide' : 'Show'}
              </Button>
              }
              </Box>
              <Box mr="3" minW="40.5%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
              </Box>

              </HStack>
          }
          {whereFrom !== 1 && whereFrom !== 'prevGame' &&
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

	const displaySelectSeason = () => {

		//console.log(whereFrom + ' whats whereFrom numner?')

    try {

  		if (whereFrom === 7) {
  			return (
  				<View>
  				{props.isOpen === 1 &&
  				<View style={{paddingLeft: '5%', paddingRight: '5%'}}>
  					<SelectSeason navigation={props.navigation} whereFrom={props.whereFrom} isOpen={props.isOpen} teamIdCode={games[0].teamIdCode} addTeamOnly={props.addTeamOnly}/>
  				</View>
  			}
  			{props.isOpen === 0 &&
  			<View style={{paddingLeft: '5%', paddingRight: '5%'}}>
  				<SelectSeason navigation={props.navigation} whereFrom={props.whereFrom} isOpen={props.isOpen} teamIdCode={games[0].teamIdCode} addTeamOnly={props.addTeamOnly}/>
  			</View>
  		}
  			</View>
  			)
  		}
    }
    catch {
      //return nothing.
    }

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
    //console.log(JSON.stringify(_games[0].teamPlayers[0]) + ' _games[0].teamPlayers[0] check new');
      //_games[0].teamPlayers[0].positionDetails = [{ row: 4, column: 2, indexId: 0, initials: '' }]
    //console.log(_games[0].teamPlayers[0] + ' _games[0].teamPlayers[0].positionDetails' );

			//console.log(' this.');
			//console.log(props.teamId + ' props.teamId is?');
			//console.log(props.teamIdCode + ' props.teamIdCode is?');
			//console.log(JSON.stringify(teamPlayers) + ' teamPlayers chcky.');

      const playerDisplayIndex = props.playerIndex


			//otherDisplay(_games[0].teamPlayers[playerDisplayIndex])

			//loop through teamPlayers and if teamID ==  props.teamId then post the player details. use OtheDisplay above.
      let inviteCount = 0
      teamPlayers.map(player => {
        if (player.inviteStatus === 1) {
          inviteCount++
        }
      })

      let playerCount = 0
			const displayreturn = teamPlayers.map(player => {
				//console.log(JSON.stringify(player) + ' cehck indv player.');
				//console.log(player.teamIdCode + ' teamIdCode is huh?');

        try {
				if (player.teamIdCode === props.teamId) {
          playerCount++
		      return (
		        <Box minW="100%">
		            <View>
									{otherDisplay(player, inviteCount, playerCount)}
		            </View>
		        </Box>
		      )
				}


      }
      catch {
      //console.log('this is where the error hits.');
        //do nothing.
      }



			})

			return displayreturn

    }

  const teamType = props.teamType

	/*
	return (
    <Center>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientBg}>
      <Container h="100%" w="100%" maxWidth="100%">
      <ScrollView>
      <Text>Hello.</Text>
      </ScrollView>
          </Container>
          </LinearGradient>
          </Center>
  )
	*/


        return (

          <ScrollView>
						{displaySelectSeason()}
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
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  containerYouTube: {
    //flex: 1,
    //backgroundColor: 'darkblue',
    paddingTop: 0,
    paddingBottom: 10
  },
})

export default AddPlayersList;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, FlatList, Spacer, PresenceTransition } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;

import { updateGames } from '../../Reducers/games';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';


import KickOff from './KickOff.js';
import Stopwatch from './Stopwatch.js';
import GameStats from './GameStats.js';
import GamePosDisplay from './GamePosDisplay.js';
import GameTimeSubTime from './GameTimeSubTime.js';


import PositionTimes from '../../Util/PositionTimes.js';

const GamePlayers = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getPlayerId, setPlayerId] = React.useState(99999999);
  let [playerIndex, setPlayerIndex] = useState(0);


  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsPlayerId = useSelector(state => state.statsBoard.playerId)
  let gameOptionBoard = useSelector(state => state.gameOptionBoard.gameOptionBoard)
  let gameOptionBoardPlayerId = useSelector(state => state.gameOptionBoard.playerId)
  let gamePlayerBoard = useSelector(state => state.gamePlayerBoard.gamePlayerBoard)
  let gamePlayerBoardPlayerId = useSelector(state => state.gamePlayerBoard.playerId)

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamId = props.teamId

  const { navigate } = props.navigation;

  useEffect(() => {

    //nothing yet

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    const priority = [ "fwd", "mid", "def", "gol", "sub", "abs"];
    let byPosition = []

    try {
      byPosition = _games[0].teamPlayers.sort( ( a, b ) => priority.indexOf( a.currentPosition ) - priority.indexOf( b.currentPosition ) );
    }
    catch {
      byPosition = []
    }
    /*
    let playerNamesAlphaOrder = []

    try {
      playerNamesAlphaOrder = _games[0].teamPlayers.slice().sort((a, b) =>
      {

          let [aNames, aSurname] = a.playerName.match((/(.*)\s(\w+)$/)).slice(1);
          let [bNames, bSurname] = b.playerName.match((/(.*)\s(\w+)$/)).slice(1);

          if (aSurname.localeCompare(bSurname))
              return aSurname.localeCompare(bSurname);
          else
              return aNames.localeCompare(bNames);
      });
    }
    catch {
      playerNamesAlphaOrder = []
    }
    */

  //console.log(JSON.stringify(playerNamesAlphaOrder) + ' playerNamesAlphaOrder chefck here.');

    //const teamPlayers = games[0].teamPlayers
    setGetTeam(byPosition)

  },[games[0].teamPlayers])

  useEffect(() => {

  //console.log(gamePlayerBoard + ' hit and check gamePlayerBoard');
    //setStatsBoardDisplay(statsBoard)
    //setStatsPlayerId(statsBoardPlayerId)
    setIsOpen(gamePlayerBoard)

  },[gamePlayerBoard, gamePlayerBoardPlayerId])

  const [offset,setOffset] = useState(0);
   const scrollRef = useRef(null);
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
   //const scroll =

  const setOpenStatus = (isOpen, id, playerIndex) => {


  //console.log(playerIndex + ' what is playerIndex 2');

    let playerIndexCount = 0
    getTeam.map(item => {
      if (item.currentPosition !== 'abs' && item.delete !== true) {
        playerIndexCount++
      }
      else {
        //do nothing
      }
    })

    let playerIndexCountThreshold = 999
    let playerIndexCountThresholdSix = 999
    if (playerIndexCount > 5) {
        playerIndexCountThreshold = playerIndexCount - 3
        playerIndexCountThresholdSix = playerIndexCount - 6
    }

    const playerIndexInt = Number(playerIndex)

  //console.log(playerIndexCountThreshold + ' playerIndexCountThreshold');
  //console.log(playerIndex + ' playerIndex');
  //console.log(playerIndexInt + ' playerIndexInt');
  //console.log(isOpen + ' isOpen');
    if (isOpen === true && playerIndexCountThreshold <= playerIndexInt) {
    //console.log('are we hit innit?');
      const offset = contentVerticalOffset + 100
      scrollRef.current?.scrollTo({x: 0, y: offset, animated: true});
    }
    else if (isOpen === true && playerIndexCountThresholdSix <= playerIndexInt) {
      const offset = contentVerticalOffset + 60
      scrollRef.current?.scrollTo({x: 0, y: offset, animated: true});
    }

    setIsOpen(isOpen)
    setPlayerId(id)
    dispatch(updateStatsBoard(isOpen, id))
    dispatch(updateGameOptionBoard(false, 0))
  }

  const _onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
  //console.log("Visible items are", viewableItems);
  //console.log("Changed in this iteration, ", changed);
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 60
  }



        return (
          <ScrollView ref={scrollRef} onScroll={event => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        >
            <View style={styles.insideContainer}>
          <FlatList style={{paddingBottom: 200}} extraData={getTeam} data={getTeam} mt="3" renderItem={({
            item, index
            }) =>
            <View>
            {item.currentPosition !== 'abs' && item.delete !== true &&
            <Box mb="3" shadow="7">
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

                <Box pl={["0", "4"]} pr={["0", "5"]} py="2" bg="transparent">
                  <HStack space={[2, 3]} justifyContent="space-between">
                  <Center>
                    <GamePosDisplay playerPos={item.currentPosition} />
                  </Center>
                  <Center>
                    <VStack minW="68%">
                      <Text style={{color: '#fff', fontSize: 18}} bold>
                          {item.playerName}
                        </Text>
                        <GameTimeSubTime playerData={item}/>
                    </VStack>
                    </Center>
                    {isOpen === false && getPlayerId === item.id &&
                      <Button variant="unstyled" onPress={() => setOpenStatus(true, item.id, index)}>
                        {isOpen ? minusIcon : plusIcon}
                      </Button>
                    }
                    {isOpen === true && getPlayerId === item.id &&
                      <Button variant="unstyled" onPress={() => setOpenStatus(false, item.id, index)}>
                        {isOpen ? minusIcon : plusIcon}
                      </Button>
                    }
                    {isOpen === true && getPlayerId !== item.id &&
                      <Button variant="unstyled" onPress={() => setOpenStatus(true, item.id, index)}>
                        {isOpen ? plusIcon : plusIcon}
                      </Button>
                    }
                    {isOpen === false && getPlayerId !== item.id &&
                      <Button variant="unstyled" onPress={() => setOpenStatus(true, item.id, index)}>
                        {isOpen ? plusIcon : plusIcon}
                      </Button>
                    }
                  </HStack>
                  {isOpen === true && getPlayerId === item.id &&
                  <PresenceTransition visible={isOpen} initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1,
                  transition: {
                    duration: 250
                  }
                }}>
                    <Box minW="100%" mt="0" rounded="md" _text={{
                    color: "white"
                  }}>
                    <GameStats playerData={item} navigation={navigate}/>
                    </Box>
                  </PresenceTransition>
                }
                </Box>

                </LinearGradient>

            </Box>
          }
            </View>
          }

          keyExtractor={item => item.id} />

          </View>
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
  insideContainer: {
    flex: 1,
    //width: '100%',
    height: '100%',
    marginRight: '5%',
    marginLeft: '5%',
  },
})

export default GamePlayers;

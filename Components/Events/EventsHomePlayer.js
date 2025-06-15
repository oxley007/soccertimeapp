import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={16} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={1} color="#0891b2" />;

import EventsDisplay from './EventsDisplay.js';
import DisplayScoreHomePlayer from './DisplayScoreHomePlayer.js';
import EventsTimeSubTime from './EventsTimeSubTime.js';


import { updateGames } from '../../Reducers/games';
import { updateCheckSortPlayer } from '../../Reducers/checkSortPlayer';
import { updateEventsVersion } from '../../Reducers/eventsVersion';
import { updateStopwatch } from '../../Reducers/stopwatch';


//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const EventsHomePlayer = (props)=>{

  const [getGame, setGame] = useState([]);
  const [getHalfTime, setHalfTime] = useState([{textOne: '', textTwo: ''}]);
  const [pro_forever_indivState, setPro_forever_indivState] = useState(false);
  const [pro_yearly_indivState, setPro_yearly_indivState] = useState(false);
  const [pro_yearly_teamState, setPro_yearly_teamState] = useState(false);
  const [pro_forever_teamState, setPro_forever_teamState] = useState(false);
  const [pro_yearly_playerState, setPro_yearly_playerState] = useState(false);
  const [pro_forever_playerState, setPro_forever_playerState] = useState(false);
  const [getGameData, setGetGameData] = useState(0);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let checkSortPlayer = useSelector(state => state.checkSortPlayer.checkSortPlayer);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  const teamId = props.route.params.teamId
  const gameIdDb = props.route.params.gameIdDb


  let newRefresh = false

  try {
    newRefresh = props.route.params.newRefresh
  }
  catch {
    newRefresh = false
  }



  const { navigate } = props.navigation;

  useEffect(() => {

   //console.log(pro_forever_indiv[0].purchased + ' hit?');
      setPro_forever_indivState(pro_forever_indiv[0].purchased)
      setPro_yearly_indivState(pro_yearly_indiv[0].purchased)
      setPro_yearly_teamState(pro_yearly_team[0].purchased)
      setPro_forever_teamState(pro_forever_team[0].purchased)
      setPro_yearly_playerState(pro_yearly_player[0].purchased)
      setPro_forever_playerState(pro_forever_player[0].purchased)

  },[pro_forever_indiv[0].purchased, pro_yearly_indiv[0].purchased, pro_yearly_team[0].purchased, pro_forever_team[0].purchased, pro_yearly_player[0].purchased, pro_forever_player[0].purchased])

  useEffect( () => {

 //console.log('we hit at kleast');

    refreshData()


  }, []);

  useEffect( () => {

 //console.log('we hit at kleast');
 //console.log('newRefresh');
 //console.log(checkSortPlayer + ' just need to check checkSortPlayer here.');

    try {
      refreshData()
    }
    catch {
      //do nothing.
    }


  }, [checkSortPlayer]);


  useEffect( () => {
 //console.log('do we always hit htis?');
    setGame(getGame)
 //console.log(JSON.stringify(getGame) + ' getGame huh what is? 2');
  },[getGame]);

  const refreshData = () => {

 //console.log('hi' + teamId + ' teamId hey hey check');
 //console.log(gameIdDb + ' teamId hey hey check');

  firestore()
    .collection(teamId)
    .doc(gameIdDb)
    .onSnapshot(documentSnapshot => {
   //console.log('User data events home: ', documentSnapshot.data());
   //console.log('.game User data events home: ', documentSnapshot.data().game);
      setGame(documentSnapshot.data())
    })
    const getGameDataNew = getGameData + 1
    setGetGameData(getGameDataNew)

 //console.log(JSON.stringify(getGame) + ' getGame huh what is?');

    //const gameDoc = await firestore().collection(teamId).doc(gameIdDb).get();

  //console.log(gameDoc + ' gameDoc');
  //console.log(JSON.stringify(gameDoc.data()) + ' gameDoc');


      //setTeamLiveGames(liveGamesData)
  }

  const backToMenu = () => {

    dispatch(updateCheckSortPlayer(0))
    setGame(getGame)
    dispatch(updateEventsVersion(0))
    dispatch(updateStopwatch(
            0,
            [],
            null,
            null,
            [],
            0,
            false,
            false,
          ))
    navigate('HomePlayerLiveScores');

  }

  const goToStats = () => {

    navigate('StatsHomePlayer', {
      getGame: getGame,
      whereFrom: 191,
      teamId: teamId,
      gameIdDb: gameIdDb,
      //gameData: props.route.params.gameData
    });

  }



  const checkGameDataDisplay = () => {

 //console.log(JSON.stringify(getGame) + ' getGame check here before display.');
    if (getGame === [] || getGame === null || getGame === undefined || getGame.length == 0) {
   //console.log('no data herer');
      //nothing.
      <Button variant="unstyled" onPress={() => refreshData()}>
        <HStack>
          <Center pl="2">
            {minusIcon}
            <Text style={styles.textFourteenUnderline}>No Events? Refesh! {getGameData}a</Text>
          </Center>
        </HStack>
      </Button>
    }
    else {
   //console.log('yes data herer');
   //console.log(JSON.stringify(getGame) + ' getGame huh what is? 3');
      return (
        <View>
        <Button variant="unstyled" onPress={() => refreshData()}>
          <HStack>
            <Center pl="2">
              {minusIcon}
              <Text style={styles.textFourteenUnderline}>Showing incorrect data? Refesh!</Text>
            </Center>
          </HStack>
        </Button>
        {checkSortPlayer > 0 &&
          <EventsDisplay navigation={props.navigation} gameData={getGame} whereFrom={props.route.params.whereFrom} getGameData={getGameData} />
        }
        </View>
      )

    }

  }

  const displayScore = () => {

    try {
    return (
      <DisplayScoreHomePlayer navigation={props.navigation} homeTeamScore={getGame.game.score.homeTeam} awayTeamScore={getGame.game.score.awayTeam} homeTeamShortName={getGame.game.teamNames.homeTeamShortName} awayTeamShortName={getGame.game.teamNames.awayTeamShortName} secondsElapsed={getGame.game.secondsElapsed} halfTimeFlag={getGame.game.halfTime} gameHalfTime={getGame.game.gameHalfTime} teamId={props.route.params.teamId} gameIdDb={props.route.params.gameIdDb} firstHalf={getGame.game.firstHalf} secondHalf={getGame.game.secondHalf} sixtySecondsMark={getGame.game.sixtySecondsMark} startTimeLive={getGame.game.startTimeLive} />
    )
    }
    catch {
      //do nthing.
    }
  }

  const checkLoghere = () => {
    try {
      console.log(JSON.stringify(getGame) + ' game dat ahceking here..');
      console.log(JSON.stringify(getGame.game.teamPlayers[0].postionTimes.gol) + ' game.teamPlayers dat ahceking here....');
      <EventsTimeSubTime playerData={getGame.game.teamPlayers} />
    }
    catch {
      //do nothing.
    }

  }

  const displayEventsTime = () => {


    //if () {
    try {

      console.log(JSON.stringify(playerUserDataPlayers) + ' playerUserDataPlayers here new ok now.');
      console.log(JSON.stringify(playerUserDataPlayers[0].playerId) + ' playerUserDataPlayers[0].playerId here new ok now.');
      console.log(JSON.stringify(playerUserDataPlayers[0].teamId) + ' playerUserDataPlayers[0].teamId here new ok now.');
      console.log(playerUserDataPlayers.playerId + ' playerUserDataPlayers.playerId is? huh');
      console.log(getGame.game.teamIdCode + ' getGame.game.teamIdCode his?');
      let playerIndex = 0
      if (playerUserDataPlayers.length) {
        playerUserDataPlayers.map(player => {
          if (getGame.game.teamIdCode === player.teamId) {
              playerIndex = getGame.game.teamPlayers.findIndex(x => x.playerId === player.playerId);
          }
        })

        return (
          <Box>
            <EventsTimeSubTime playerData={getGame.game.teamPlayers[playerIndex]} gameData={getGame} whereFrom={'supportersLive'} />
          </Box>
        )

      }


        console.log(playerIndex + ' whar is playerIndex? nhre new');


    }
    catch {

      //nothoing.
    }
    //}
  }


        return (
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Container ml="4" mr="4" minW="90%" maxH="56%" minH="56%">
                <Box>
                  {displayScore()}
                </Box>
                {displayEventsTime()}
                <ScrollView >

                  {checkGameDataDisplay()}
                </ScrollView>
            </Container>
            <HStack minH="10%">
              <VStack minW="100%" maxW="100%">
                <Box bg="#000" style={{zIndex: 3, elevation: 3, minHeight: '100%'}}>
                  <Button variant="unstyled" onPress={() => backToMenu()}>
                    <HStack>
                      <Center pl="2" pt="2">
                        <Text style={styles.textFourteen}>{minusIcon} Back to Menu</Text>
                      </Center>
                    </HStack>
                  </Button>
                </Box>
              </VStack>
            </HStack>
      </LinearGradient>
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
  linearGradientBg: {
    minWidth: '100%',
    minHeight: '100%',
  },
  textFourteenUnderline: {
    color: '#E879F9',
    fontSize: 14,
    textAlign: 'center',
    //textDecorationLine: "underline",
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
  textFourteen: {
    color: '#E879F9',
    fontSize: 20,
    textAlign: 'center',
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

export default EventsHomePlayer;

/*
<VStack minW="75%" maxW="75%" minH="100%">
  <Box bg="#000" style={{zIndex: 3, elevation: 3, borderLeftColor: '#fff', borderLeftColorWidth: 1, borderTopColor: '#fff', borderTopWidth: 1, minHeight: '100%'}}>

    <Button variant="unstyled" onPress={() => goToStats()}>

      <HStack>
      <Center pt="6">
        <Text style={{color: '#0891b2', fontSize: 22, textAlign: 'center'}}>{plusIcon} View Player Stats</Text>
        </Center>
      </HStack>

    </Button>

  </Box>
</VStack>
*/

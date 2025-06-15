import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import RNRestart from 'react-native-restart';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import { updateDragDropDisplayCount } from '../../Reducers/dragDropDisplayCount';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';
import { updateExitGameFlag } from '../../Reducers/exitGameFlag';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateGamePlayerBoard } from '../../Reducers/gamePlayerBoard';
import { updateGames } from '../../Reducers/games';
import { updateGameSetup } from '../../Reducers/gameSetup';
import { updateGameStatus } from '../../Reducers/gameStatus';
import { updateIap } from '../../Reducers/iap';
import { updatePlayerIndex } from '../../Reducers/playerIndex';
import { updatePlayerUserData } from '../../Reducers/playerUserData';
import { updatePrevGames } from '../../Reducers/prevGames';
import { updateSeasons } from '../../Reducers/seasons';
import { updateSortIndex } from '../../Reducers/sortIndex';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateStatsSort } from '../../Reducers/statsSort';
import { updateStoptimer } from '../../Reducers/stoptimer';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateUserProfile } from '../../Reducers/userProfile';



const SignOut = (props)=>{

  //const [getTeam, setGetTeam] = useState(null);

  //let uid = useSelector(state => state.uid);
  //const [uidState, setu] = useState(true);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);

  const { navigate } = props.navigation;


  const signOutReduxClear = () => {

    const dragDropDisplayCount = 0
    dispatch(updateDragDropDisplayCount(dragDropDisplayCount))

    const eventDisplayBoard = false
    const playerId = 99999999
    const eventText = 99999999
    dispatch(updateEventDisplayBoard(eventDisplayBoard, playerId, eventText))

    const exitGameFlag = false
    dispatch(updateExitGameFlag(exitGameFlag))

    const gameOptionBoard = false
    const gameOptionBoardplayerId = 99999999
    dispatch(updateGameOptionBoard(gameOptionBoard, gameOptionBoardplayerId))

    const gamePlayerBoard = false
    const gamePlayerBoardplayerId = 99999999
    dispatch(updateGamePlayerBoard(gamePlayerBoard, gamePlayerBoardplayerId))

    const games = []
    dispatch(updateGames(games))

    const gameSetup = []
    dispatch(updateGameSetup(gameSetup))

    const gameStatus = 0
    dispatch(updateGameStatus(gameStatus))

    const pro_forever_indiv = [{purchased: false, expiryDate: null}]
    const pro_yearly_indiv = [{purchased: false, expiryDate: null}]
    const pro_yearly_team = [{purchased: false, expiryDate: null}]
    const pro_forever_team = [{purchased: false, expiryDate: null}]
    const pro_yearly_player = [{purchased: false, expiryDate: null}]
    const pro_forever_player = [{purchased: false, expiryDate: null}]
    dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

    const playerIndex = 0
    dispatch(updatePlayerIndex(playerIndex))

    const teamsPlayerUserData = []
    const playersPlayerUserData = []
    const seasonsPlayerUserData = []
    const seasonsDisplayPlayerUserData = ''
    const seasonsDisplayIdPlayerUserData = 99999998
    dispatch(updatePlayerUserData(teamsPlayerUserData, playersPlayerUserData, seasonsPlayerUserData, seasonsDisplayPlayerUserData, seasonsDisplayIdPlayerUserData))

    const teamPrevGames = []
    const seasonPrevGames = []
    dispatch(updatePrevGames(teamPrevGames, seasonPrevGames))

    const seasons = []
    const seasonsDisplay = ''
    const seasonsDisplayId = 99999998
    dispatch(updateSeasons(seasons, seasonsDisplay, seasonsDisplayId))

    const sortIndex = 0
    const sortIndexType = 0
    dispatch(updateSortIndex(sortIndex, sortIndexType))

    const statsBoard = false
    const playerIdstatsBoard = 99999999
    dispatch(updateStatsBoard(statsBoard, playerIdstatsBoard))

    const statsSort = []
    dispatch(updateStatsSort(statsSort))

    const stoptimer = false
    dispatch(updateStoptimer(stoptimer))

    const secondsElapsed = 0
    const laps = []
    const lastClearedIncrementer = null
    const incrementer = null
    const avgBall = []
    const sixtySecondsMark = 0
    const stopTimer = false
    const pauseTimer = false
    dispatch(updateStopwatch(secondsElapsed, laps, lastClearedIncrementer, incrementer, avgBall, sixtySecondsMark, stopTimer, pauseTimer))

    const teamNames = []
    dispatch(updateTeamNames(teamNames))

    const teamPlayers = []
    dispatch(updateTeamPlayers(teamPlayers))

    const userProfile = 0
    dispatch(updateUserProfile(userProfile))

  }


  const signOutButton = async () => {


    if (Platform.OS !== 'ios') {

      try {
        await GoogleSignin.signOut();
        auth()
        .signOut()
        .then(function() {
          //RNRestart.restart();
       //console.log('User signed out!');
          //navigate('SignUp');
          // Sign-out successful.
          signOutReduxClear()
          navigate('Loading', {
            signedOut: true
          });
        })
          .catch(function(error) {
         //console.log(error);
          // An error happened.
        });
        //navigate('SignUp');
        //this.setState({ uid: null }); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
        auth()
        .signOut()
        .then(function() {
          //RNRestart.restart();
       //console.log('User signed out!');
          //navigate('SignUp');
          // Sign-out successful.
          signOutReduxClear()
          navigate('Loading', {
            signedOut: true
          });
        })
          .catch(function(error) {
         //console.log(error);
          // An error happened.
        });
      }
    }
    else {
      try {
        auth().signOut().then(function() {
            try
            {
              signOutReduxClear()
              navigate('Loading', {
                signedOut: true
              });
            }
            catch {
              navigate('Loading', {
                signedOut: true
              });
            }
        })
        //navigate('SignUp');
      } catch (error) {
     //console.log(error);
       navigate('Loading', {
         signedOut: true
       });
      }

    }

    /*
    const dragDropDisplayCount = 0
    dispatch(updateDragDropDisplayCount(dragDropDisplayCount))

    const eventDisplayBoard = false
    const playerId = 99999999
    const eventText = 99999999
    dispatch(updateEventDisplayBoard(eventDisplayBoard, playerId, eventText))

    const exitGameFlag = false
    dispatch(updateExitGameFlag(exitGameFlag))

    const gameOptionBoard = false
    const gameOptionBoardplayerId = 99999999
    dispatch(updateGameOptionBoard(gameOptionBoard, gameOptionBoardplayerId))

    const gamePlayerBoard = false
    const gamePlayerBoardplayerId = 99999999
    dispatch(updateGamePlayerBoard(gamePlayerBoard, gamePlayerBoardplayerId))

    const games = []
    dispatch(updateGames(games))

    const gameSetup = []
    dispatch(updateGameSetup(gameSetup))

    const gameStatus = 0
    dispatch(updateGameStatus(gameStatus))

    const pro_forever_indiv = [{purchased: false, expiryDate: null}]
    const pro_yearly_indiv = [{purchased: false, expiryDate: null}]
    const pro_yearly_team = [{purchased: false, expiryDate: null}]
    const pro_forever_team = [{purchased: false, expiryDate: null}]
    const pro_yearly_player = [{purchased: false, expiryDate: null}]
    const pro_forever_player = [{purchased: false, expiryDate: null}]
    dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

    const playerIndex = 0
    dispatch(updatePlayerIndex(playerIndex))

    const teamsPlayerUserData = []
    const playersPlayerUserData = []
    const seasonsPlayerUserData = []
    const seasonsDisplayPlayerUserData = ''
    const seasonsDisplayIdPlayerUserData = 99999998
    dispatch(updatePlayerUserData(teamsPlayerUserData, playersPlayerUserData, seasonsPlayerUserData, seasonsDisplayPlayerUserData, seasonsDisplayIdPlayerUserData))

    const teamPrevGames = []
    const seasonPrevGames = []
    dispatch(updatePrevGames(teamPrevGames, seasonPrevGames))

    const seasons = []
    const seasonsDisplay = ''
    const seasonsDisplayId = 99999998
    dispatch(updateSeasons(seasons, seasonsDisplay, seasonsDisplayId))

    const sortIndex = 0
    const sortIndexType = 0
    dispatch(updateSortIndex(sortIndex, sortIndexType))

    const statsBoard = false
    const playerIdstatsBoard = 99999999
    dispatch(updateStatsBoard(statsBoard, playerIdstatsBoard))

    const statsSort = []
    dispatch(updateStatsSort(statsSort))

    const stoptimer = false
    dispatch(updateStoptimer(stoptimer))

    const secondsElapsed = 0
    const laps = []
    const lastClearedIncrementer = null
    const incrementer = null
    const avgBall = []
    const sixtySecondsMark = 0
    const stopTimer = false
    const pauseTimer = false
    dispatch(updateStopwatch(secondsElapsed, laps, lastClearedIncrementer, incrementer, avgBall, sixtySecondsMark, stopTimer, pauseTimer))

    const teamNames = []
    dispatch(updateTeamNames(teamNames))

    const teamPlayers = []
    dispatch(updateTeamPlayers(teamPlayers))

    const userProfile = 0
    dispatch(updateUserProfile(userProfile))
    */


};

        return (
          <Container maxW="100%">
          <Center style={{height:'100%',width:'100%',alignItems: 'center'}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <ScrollView style={{height:'100%',width:'100%'}}>
                <Box style={{paddingTop: 20}}>
                  <Center>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/SoccerTimeLive-logoMain400pxTrans.png')}
                      />
                  </Center>
                </Box>
                <Center>
                <Box style={{paddingTop: 40}}>
                <Center>
                <Button style={styles.textButton}
                  onPress={() => signOutButton()}
                  >
                  <Text style={styles.whiteText}>Sign Out</Text>
                </Button>
                </Center>
                </Box>
                </Center>
                <Box style={{paddingTop: 40}}>
                <Center>
                <Button transparent light style={styles.textButton}
                  onPress={() => navigate('HomeSelectProfile')}
                  >
                  <Text style={styles.whiteText}>Back to Home.</Text>
                </Button>
                </Center>
                </Box>
                </ScrollView>
            </LinearGradient>
          </Center>
          </Container>

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
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  tinyLogo: {
    //width: 400,
    resizeMode: 'contain',
    marginBottom: 50
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradientBg: {
    minWidth: '100%',
    width: '100%'
  },
  textButton: {
    minWidth: '80%',
    backgroundColor: '#E879F9'
  },
  whiteText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    minWidth: '80%'
  }
})

export default SignOut;

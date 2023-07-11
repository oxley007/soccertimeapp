import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="pluscircleo" size={50} color="#fff" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;

import * as Animatable from 'react-native-animatable';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';

const Home = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 50000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 30000,
      useNativeDriver: true,
    }).start();
  };


    const teams = useRef();
    useEffect(() => {
       //const teams = teams.current;
      ////console.log("I have been mounted")

      // Some equal check function

      const teams = teamRef.onSnapshot(onCollectionUpdate)
      //teams.current = team;

      //console.log(getTeam + ' check getTeam here.');
    }, [])

    useEffect(() => {

      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      const halftimeFlag = _games[0].halfTime
      setHalfTimeFlag(halftimeFlag)

    },[games[0].halfTime])

    useEffect(() => {

      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      const halftimeFlag = _games[0].halfTime
      setHalfTimeFlag(halftimeFlag)

    },[])

    const onCollectionUpdate = (querySnapshot) => {


      let teams = [];

      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        const { playerId } = doc.data();

        teams.push({
          key: doc.id,
          //doc, // DocumentSnapshot
          playerId
        });
      })

      //console.log(teams + ' Live Games Test new.');
      ////console.log(teams[0].playerId + ' Live Games Test.');

      //return teams

      if (teams !== getTeam) {
        setGetTeam(teams, JSON.stringify(getTeam));
        //console.log(JSON.stringify(getTeam) + ' Live getTeam Test new.');
        ////console.log(getTeam[0].playerId + ' Live getTeam Test new.playerId.');
      }
      //setGetTeam(teams);




    }

  const startNewGame = () => {
    //to do

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    if (getHalfTimeFlag <= 3 && _games[0].gameSetup === false) {

      navigate('GameHome', {
        fromContinue: 1
      });

    }
    else if (getHalfTimeFlag === 4 && _games[0].gameSetup === false) {
      navigate('GameEnds');
    }
    else {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }
    //console.log(JSON.stringify(_games) + ' chcking _games here ok.');

    let gamesLength  = 0
    try {
    gamesLength = games.length
    }
    catch {
      gamesLength = 0
    }

    _games.unshift({gameSetup: true, season: {season: '', id: 99999999}, id: gamesLength, halfTime: 0, firstHalf: false, secondHalf: false, gameHalfTime: 0, score: {homeTeam: 0, awayTeam: 0}, teamNames: {homeTeamName: '', awayTeamName: '', homeTeamShortName: '', awayTeamShortName: '', homeTeamId: 99999998, awayTeamId: 99999998}, gameEvents:{}, grade: '', secondsElapsed: 0})

    dispatch(updateGames(_games))

    userRef.doc("games").update({
        games: _games,
      })
      .catch(error => this.setState({ errorMessage: error.message }))

      navigate('AddTeamHome', {
        teamType: 0
      });
    }

  }

  const getPlayerID = () => {

    let palyerId = 0

    try {
      palyerId = getTeam[0].playerId
    }
    catch {
      palyerId = 0
    }

    return (<Text fontSize="md" mt="3" fontWeight="medium">{palyerId} Team</Text>)
  }

  const testAdd = () => {

    //console.log('hitting test add?');
    const teamName = 'teamTest3'
    const teamId = 'AO123'
    firestore().collection(teamName).doc(teamId).set({
       teamId: teamId,
     })
   }


   const testPlayerFirebase = () => {

     console.log(JSON.stringify(teamPlayers) + ' this is teamPlayers on home for testing.');

   userRef.doc("players").update({
       players: teamPlayers,
     })
     .catch(error => this.setState({ errorMessage: error.message }))

   }

   const gameStatus = () => {

     let _games = []
     try {
       _games = [...games]
     }
     catch {
       _games = [{...games}]
     }

     let gameStatusText = ''
     if (getHalfTimeFlag === 5) {
      gameStatusText = 'New Game'
     }
     else if (getHalfTimeFlag <= 4 && _games[0].gameSetup === false) {
       gameStatusText = 'Continue Game'
     }
     else {
       gameStatusText = 'New Game'
     }

     return (
       <Text style={{color: "#ffffff",
       fontSize: 25,
       fontWeight: '500',
       lineHeight: 40}}>
         {gameStatusText}
       </Text>
     )

   }

   const previousGames = () => {

     navigate('PreviousGamesHome');

   }

        return (
          <Center bg="#E879F9">
            <Container>
            <ScrollView>
              {getPlayerID()}
              <Box alignItems="center" mt="3">
                <Button size="md" variant="subtle" onPress={() => testAdd()}>Test Add</Button>
              </Box>
              <Box alignItems="center" mt="3">
                <Button size="md" variant="subtle" onPress={() => testPlayerFirebase()}>Test Player Firebase</Button>
              </Box>

              <Box alignItems="center" mt="3" shadow="6">
              <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500'
                  }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => previousGames()}>

                    <HStack>
                      <VStack>
                        {arrowrightcircle}
                      </VStack>
                      <Center>
                      <VStack pl="5">
                          <Text style={{fontSize: 24, color: '#fff', lineHeight: 28}}>Previous Games</Text>
                      </VStack>
                      </Center>
                    </HStack>

                  </Button>
                </LinearGradient>
                </ImageBackground>
              </Box>
              <Box alignItems="center" mt="3" shadow="6">
              <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500'
                  }} bg="transparent" pt="5" pb="5" onPress={() => startNewGame()}>
                    <Center>
                      <HStack>
                        {plusCircle}
                      </HStack>
                      <HStack>
                        {gameStatus()}
                      </HStack>
                    </Center>
                  </Button>
                </LinearGradient>
                </ImageBackground>
              </Box>
              <Text stlye={{color: '#fff'}}>{getHalfTimeFlag}</Text>
            </ScrollView>
              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>
              <Center>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/SoccerTimeLive-logoMain400pxTrans.png')}
                  />
              </Center>
            </Box>
          </Container>
        </Center>
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
})

export default Home;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack, Stack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="pluscircleo" size={40} color="#fff" />;
const plusCircleBlack = <IconAnt name="pluscircleo" size={40} color="#000" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;

import * as Animatable from 'react-native-animatable';

import HomePlayerListPlayers from './HomePlayerListPlayers.js'

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updatePlayerUserData } from '../../Reducers/playerUserData';


const HomePlayerAddPlayer = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [collectionNameStore, setCollectionNameStore] = useState('');
  const [errorMessage, setErrorMessage] = useState(0);
  const [playersCheck, setPlayersCheck] = useState(0);


  //let games = useSelector(state => state.games.games);
  //let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')
  //const teamRef = firestore().collection('GBHFX6572JL')
  let collectionName = ''

  const { navigate } = props.navigation;

  const teams = useRef();

  useEffect(() => {

    const playerData = {playerName: ''}
    setGetTeam(playerData)
    setErrorMessage(0)

    let playerAvailable = 0
    try {
    if (playerUserDataPlayers !== undefined || playerUserDataPlayers.length > 0 || playerUserDataPlayers !== []) {
      playerAvailable = 1
    }
  }
  catch {
    //do nothing.
  }
    setPlayersCheck(playerAvailable)

  }, [])

  useEffect(() => {

 //console.log('what about htis one on player add?');
    //update

  }, [playerUserDataPlayers])

  const onLiveCollectionUpdate = (documentSnapshot) => {

 //console.log('hit snapshot.');
 //console.log(documentSnapshot + ' documentSnapshot check.');
    let teamData = []
    let errorMessage = 0
    try {
    const playerName = documentSnapshot.data().playerName;
    const playerId = documentSnapshot.data().playerId;
    //const id = documentSnapshot.data().id;

 //console.log(playerName + ' name');
 //console.log(playerId + ' playerId');
  //console.log(id + ' id');

    teamData = {playerName: playerName, playerId: playerId, teamId: props.teamData.teamId, teamName: props.teamData.teamName}
    errorMessage = 1

 //console.log(playerUserDataPlayers + ' what is playerUserData.teams here?');
 //console.log(JSON.stringify(playerUserDataPlayers) + ' what is JSON playerUserData.teams here?');

    if (playerUserDataPlayers === undefined) {
      playerUserDataPlayers = []
      playerUserDataPlayers.unshift(teamData)

      dispatch(updatePlayerUserData(playerUserDataTeams, playerUserDataPlayers, playerUserDataSeasons, playerUserDataSeasonsDisplay, playerUserDataSeasonsDisplayId))

      userRef.doc('playerUserData').update({
        teams: playerUserDataTeams,
        players: playerUserDataPlayers,
        seasons: playerUserDataSeasons,
        seasonsDisplay: playerUserDataSeasonsDisplay,
        seasonsDisplayId: playerUserDataSeasonsDisplayId
        })
        .catch(error => this.setState({ errorMessage: error.message }))


    }
    else {

    let teamExists = false
      try {
      playerUserDataPlayers.map(team => {
        if (team.playerId === playerId) {
          teamExists = true
          if (errorMessage !== 2) {
            errorMessage = 3
          }
        }
        else {
          //do nothing
        }
      })
    }
    catch {
      teamExists = false
    }

 //console.log(JSON.stringify(playerUserDataPlayers) + ' playerUserDataPlayers next.' );

    if (teamExists === false) {
   //console.log(JSON.stringify(playerUserDataPlayers) + ' playerUserDataPlayers');
   //console.log(JSON.stringify(playerUserDataPlayers) + ' playerUserData.teams');

      playerUserDataPlayers.unshift(teamData)

      dispatch(updatePlayerUserData(playerUserDataTeams, playerUserDataPlayers, playerUserDataSeasons, playerUserDataSeasonsDisplay, playerUserDataSeasonsDisplayId))

      userRef.doc('playerUserData').update({
        teams: playerUserDataTeams,
        players: playerUserDataPlayers,
        seasons: playerUserDataSeasons,
        seasonsDisplay: playerUserDataSeasonsDisplay,
        seasonsDisplayId: playerUserDataSeasonsDisplayId
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    }
  }
    catch {
      teamData = {playerName: ''}
      errorMessage = 2
    }


    setGetTeam(teamData)
    setErrorMessage(errorMessage)

  }


   const previousGames = () => {

     navigate('PreviousGamesHome');

   }

   const inputHandler = (text, key)=>{
     const _inputs = [...inputs];
     //const _inputsNew = [...inputsNew];

     const upperCaseText = text.toUpperCase();

     _inputs[key].value = upperCaseText;
     _inputs[key].key = key;
     //_inputsNew[key].value = text;
     //_inputsNew[key].key = key;
     setInputs(_inputs);
     //setInputsNew(_inputsNew);
   }

   const getInputs = () => {
     return (
       <VStack width="100%" alignItems="center" mt="2">
         {inputs.map((input, key)=>(
           <Stack minW="100%" mx="auto" bg="#333" pt="3" pb="3" pl="3">
             <TextInput placeholder={"Player ID"} style={styles.textInputName} placeholderTextColor="#999" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
           </Stack>
         ))}
       </VStack>
     )
   }

   const checkAndAddPlayer = () => {

  //console.log('hitting me kno or not? 1');
     const _inputs = [...inputs];
  //console.log(JSON.stringify(_inputs) + ' what do we see with _inputs?');
  //console.log(_inputs.value + ' what do we see with _inputs.value?');
  //console.log(_inputs[0].value + ' what do we see with _inputs[0].value?');
     //const inputValue = _inputs[0].value;
     const inputValue = _inputs[0].value.trim(); // Trim whitespace here
  //console.log(inputValue + ' check inputValue thanks.');

     const teamId = props.teamData.teamId

     //const refTeam = firestore().collection('GBHFX6572JL').doc('GBHFX6572JL');
     try {
       const refTeam = firestore().collection(teamId).doc(inputValue);
       const teams = refTeam.onSnapshot(onLiveCollectionUpdate)
    }
    catch {
      setErrorMessage(2)
    }

    if (errorMessage === 1) {
      const messageDisplay = 'Player has been added!'
      props.navigation('HomePlayerPlayersList', {
        messageDisplay: messageDisplay
      });
    }
    else if (errorMessage === 3) {
   //console.log('i need to knoow if this is hit.');
      const messageDisplay = 'Player has already been added to your teams profile! See below for a list of players who are added to your profile'
   //console.log('i need to knoow if this is hit 2.');
      props.navigation('HomePlayerPlayersList', {
        messageDisplay: messageDisplay
      });
   //console.log('i need to knoow if this is hit 3.');
    }

   }

   const viewAddedPlayer = () => {
     props.navigation('HomePlayerPlayersList');
   }




        return (

            <View style={{paddingBottom: 1500}}>
              <Box alignItems="center" mt="3" shadow="6">
              <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                    Enter Player ID
                  </Text>
                  {getInputs()}
                </LinearGradient>
                </ImageBackground>

          <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

          <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="0" shadow={6} >
      <Button minW="100%" bg="#E879F9" size="md" style={{paddingBottom: 5}} pb="2" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => checkAndAddPlayer()}>Submit Player ID</Button>
            </HStack>
    </Box>
                {errorMessage === 1 &&
                  <View>
                  <View style={{minWidth: '100%'}}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                    <Text style={{color: '#d1fae5', fontSize: 16, }}>{getTeam.playerName} Added!</Text>
                  </LinearGradient>
                  </View>
                  {playersCheck > 0 &&
                    <Button minW="100%" bg="#E879F9" size="md" pt="5" pb="5" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => viewAddedPlayer()}>View Players</Button>
                  }
                  </View>
                }
                {errorMessage === 2 &&
                  <View>
                  <View>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  <Text style={{color: '#d1fae5', fontSize: 16, }}>No player with that player ID exisits for this team. Please go back and make sure you have selected the correct team. Or if you have the correct team please try to copy & paste the ID from the email to reduce errors.</Text>
                  </LinearGradient>
                  </View>

                  {playersCheck > 0 &&
                    <Button minW="100%" bg="#E879F9" size="md" pt="5" pb="5" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => viewAddedPlayer()}>View Players</Button>
                  }
                  </View>
                }
                {errorMessage === 3 &&
                  <View>
                  <View>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                    <Text style={{color: '#d1fae5', fontSize: 16, }}>{getTeam.playerName} has already been added to your teams profile! Make sure you have selected the correct team, or go back to the home screen and click 'player stats' button to view stats!</Text>
                  </LinearGradient>
                  </View>
                  {playersCheck > 0 &&
                    <Button minW="100%" bg="#E879F9" size="md" pt="5" pb="5" mb="20" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => viewAddedPlayer()}>View Players</Button>
                  }
                  </View>
                }
                {errorMessage === 0 &&
                  <View>
                  {playersCheck > 0 &&
                    <Button minW="100%" bg="#E879F9" size="md" pt="5" pb="5" mb="20" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => viewAddedPlayer()}>View Players</Button>
                  }
                  </View>
                }
              </Box>
            </View>

        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    //flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 25,
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
    marginBottom: 10
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      borderRadius: 5,
      overflow: 'hidden'
  },
  textInputName: {
    color: '#fff',
    ...Platform.select({
      ios: {
        flex: 1,
        maxHeight: 16,
        lineHeight: 16,
        minHeight: 16,
      },
      android: {
        padding: 0,
      },
      default: {
        flex: 1,
        maxHeight: 14,
        lineHeight: 14,
        minHeight: 14,
      }
      })
  }
})

export default HomePlayerAddPlayer;

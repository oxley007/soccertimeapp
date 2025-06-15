import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, ActivityIndicator, Platform} from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack, Stack, FlatList } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="pluscircleo" size={40} color="#E879F9" />;
const plusCircleBlack = <IconAnt name="pluscircleo" size={40} color="#000" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;

import * as Animatable from 'react-native-animatable';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updatePlayerUserData } from '../../Reducers/playerUserData';


const HomePlayerListPlayers = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [collectionNameStore, setCollectionNameStore] = useState('');
  const [errorMessage, setErrorMessage] = useState(0);
  const [animateLoading, setAnimateLoading] = useState(false);


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

  }, [])

  useEffect(() => {

 //console.log('is this even hit on change?');
    //update
    //getPlayers()

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

    teamData = {playerName: playerName, playerId: playerId}
    errorMessage = 1

 //console.log(playerUserDataPlayers + ' what is playerUserData.teams here?');
 //console.log(JSON.stringify(playerUserDataPlayers) + ' what is JSON playerUserData.teams here?');

    if (playerUserDataPlayers === undefined) {
      playerUserDataPlayers = []
      playerUserDataPlayers.push(teamData)

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
        if (team.playerName === playerName) {
          teamExists = true
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

      playerUserDataPlayers.push(teamData)

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
           <Stack minW="100%" mx="auto" bg="#fff" pt="3" pb="3" pl="3">
             <TextInput placeholder={"Player ID"} style={styles.textInputName} placeholderTextColor="#666" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
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
     const inputValue = _inputs[0].value;
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



   }

   const gotoTeam = async (player) => {

     setAnimateLoading(true)

  //console.log(JSON.stringify(player) + ' what am i sending team?');
     const teamId = player.teamId
  //console.log(teamId + ' teamId is?');
     const playerId = player.playerId
  //console.log(playerId + ' playerId is?');
     //const teamDoc = firestore().collection(teamId).doc(teamId);
     //const teamDoc = firestore().collection(teamId).doc(teamId).get()
     const playerDoc = await firestore().collection(teamId).doc(playerId).get();

     const teamDocSeasons = await firestore().collection(teamId).doc('seasons').get();

     const teamDoc = await firestore().collection(teamId).doc(teamId).get();

  //console.log(playerDoc + ' playerDoc');
  //console.log(JSON.stringify(playerDoc.data()) + ' playerDoc');

     const playerDocData = playerDoc.data()
     const teamDocSeasonsData = teamDocSeasons.data()
     const teamDocData = teamDoc.data()


      dispatch(updatePlayerUserData(playerUserDataTeams, playerUserDataPlayers, teamDocSeasonsData, playerUserDataSeasonsDisplay, playerUserDataSeasonsDisplayId))

      userRef.doc('playerUserData').update({
        teams: playerUserDataTeams,
        players: playerUserDataPlayers,
        seasons: playerUserDataSeasons,
        seasonsDisplay: playerUserDataSeasonsDisplay,
        seasonsDisplayId: playerUserDataSeasonsDisplayId
        })
        .catch(error => this.setState({ errorMessage: error.message }))

   //console.log(JSON.stringify(teamDocData) + ' teamDocData need to cvehk here.');

       //const teamPosData = teamDocData.playerIds.reduce(function(acc, cur) {
        //const teamPosData = await teamDocData.playerIds.reduce(async (acc, cur) => {

        //const teamPosData = await teamDocData.playerIds.map(async (player) => {

          let teamPosData = []
          await Promise.all(teamDocData.playerIds.map(async (player) => {
         //if (cur.delete !== true) {
           //return player
        //console.log(JSON.stringify(player) + ' here look at palyer okj');
        //console.log(JSON.stringify(player.playerId) + ' here look at palyer.playerId okj');
        //console.log(JSON.stringify(teamId) + ' here look at teamId okj');
           const playerIdDb = player.playerId.replace(/['"]+/g, '')
        //console.log(playerIdDb + ' what does playerIdDb say?')
           const playerIndivDoc = await firestore().collection(teamId).doc(playerIdDb).get();
        //console.log(JSON.stringify(playerIndivDoc.data()) + ' playerIndivDoc');
           const playerIndivDocData = playerIndivDoc.data()
        //console.log(JSON.stringify(playerIndivDocData) + ' playerIndivDocData');

           //const teamPosDataDb = playerIndivDoc.data()
           teamPosData.push({postionTimeStats: playerIndivDocData.postionTimeStats, playerName: playerIndivDocData.playerName, playerId: playerIndivDocData.playerId});

          //return teamPosDataDb;
       }))

 //console.log(JSON.stringify(teamPosData) + ' teamPosData');


    //const teamCol = await firestore().collection(teamId).get();

    //const teamColData = teamCol.data()

  //console.log(JSON.stringify(teamColData) + ' teamColData');
  //console.log(JSON.stringify(teamCol.data()) + ' teamCol.data()');

    let completedGamesData = []

    /*
    await completedGames.map(async (game) => {

      const gameIdDb = game.gameIdDb

      const gameData = await firestore().collection(teamId).doc(gameIdDb).get();

    //console.log(JSON.stringify(gameData.data()) + ' gameData chekcy');

      //const gameDataFb = JSON.stringify(gameData.data())

    //console.log('do i get here 1');

      completedGamesData.push(gameData.data())

    })
    */

    /*
    await Promise.all(completedGames.map(async (game) => {
      const gameIdDb = game.gameIdDb

      const gameData = await firestore().collection(teamId).doc(gameIdDb).get();

    //console.log(JSON.stringify(gameData.data()) + ' gameData chekcy');

      //const gameDataFb = JSON.stringify(gameData.data())

      const gameDataRaw = gameData.data()

    //console.log(JSON.stringify(gameDataRaw.game) + ' gameDataRaw like?');
    //console.log(JSON.stringify(gameData.game.data()) + ' gameData.game.data() like?');

      completedGamesData.push(gameDataRaw.game)
      }));

   //console.log(JSON.stringify(completedGamesData) + ' completedGamesData');
      */

      //let awayTeamList = []
      /*
      const awayTeamList = completedGamesData.map(game => {
      //console.log(JSON.stringify(game) + ' just looka t game firsst.');
      //console.log(JSON.stringify(game) + ' just looka t game firsst.');
        const awayTeamName = game.teamNames.awayTeamName
     //console.log(awayTeamName + ' awayTeamName here!');
        const awayTeamShortName = game.teamNames.awayTeamShortName
     //console.log(awayTeamShortName + ' awayTeamShortName here!');
        const awayTeamId = game.teamNames.awayTeamId
     //console.log(awayTeamId + ' awayTeamId here!');
        const tempTeamArray = []
        tempTeamArray.push({teamName: awayTeamName, teamNameShort: awayTeamShortName ,id: awayTeamId})
        return tempTeamArray
      })

   //console.log(JSON.stringify(awayTeamList) + ' give me awayTeamList');
   //console.log(JSON.stringify(awayTeamList[0]) + ' give me awayTeamList[0]');
      */


    /*
    .then((value) => {
     //console.log(value);
        // Expected output: "Success!"
     //console.log(JSON.stringify(completedGamesData) + ' completedGamesData');
    })
    */

 //console.log('am i getting hit her now?');

 //console.log('whereFrom: 181'),
 //console.log('playerData: ' + JSON.stringify(playerDocData))
 //console.log('team: ' + player.teamName)
 //console.log('teamId: ' + player.teamId)
 //console.log('teamPosData: ' + JSON.stringify(teamPosData))
 //console.log('teamDocData: ' + JSON.stringify(teamDocData))

    //navigate('HomePlayerStatsHome');

    setTimeout(() => {
     //console.log('during timeout');
         setAnimateLoading(false)
       }, 5000);

     navigate('HomePlayerStatsHome', {
       whereFrom: 181,
       playerData: playerDocData,
       team: player.teamName,
       teamId: player.teamId,
       teamPosData: teamPosData,
       teamDocData: teamDocData,
     });

   }

   const getPlayers = () => {

     let _playerUserDataPlayers = []
     try {
       _playerUserDataPlayers = [...playerUserDataPlayers]
     }
     catch {
       _playerUserDataPlayers = [{...playerUserDataPlayers}]
     }

  //console.log(JSON.stringify(_playerUserDataPlayers) + ' _playerUserDataPlayers hereu');

     let playerUserDataDisplay = []
     if (props.whereFrom === "addPlayer") {

       _playerUserDataPlayers.map(player => {
      //console.log(JSON.stringify(props.teamDataFull) + ' props.teamDataFull here');
      //console.log(JSON.stringify(props.teamData) + ' props.teamData here');
      //console.log(JSON.stringify(player) + ' what is team data?');
      //console.log(JSON.stringify(player.teamId) + ' what is player.teamId data?');
       //console.log(JSON.stringify(player[0].teamId) + ' what is player.teamId data?');
         //teamData

         try {
         if (player.teamId === props.teamDataFull.teamId) {
           playerUserDataDisplay.push(player)
         }
        }
        catch {
          if (player.teamId === props.teamData.teamId) {
            playerUserDataDisplay.push(player)
          }
        }

       })

     }
     else {
       playerUserDataDisplay = _playerUserDataPlayers
     }

     return (
       <View>
         <FlatList data={playerUserDataDisplay} renderItem={({
           item
           }) =>
            <Box alignItems="left" mt="3" shadow="6" minW="100%">
            <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
                <Button minW="100%" size="md" variant="subtle" _text={{
                  color: "#ffffff",
                  fontSize: 25,
                  fontWeight: '500'
                }}
                style={{alignItems: 'left', justifyContent: "flex-start" }}
                 bg="transparent" pt="5" pb="5" onPress={() => gotoTeam(item)}>

                    <HStack >
                    <Box>
                    <HStack>
                     <VStack style={{paddingTop: 10}}>
                        {plusCircle}
                      </VStack>
                      <VStack>
                      <Text style={styles.textEighteen}>
                        {item.playerName}{"\u00A0"}
                      </Text>
                      <Text style={styles.textNine}>
                        Player ID: {item.playerId}
                      </Text>
                      <Text style={styles.textTwelve}>
                        {item.teamName}
                      </Text>
                      <Text style={styles.textTen}>
                        Team ID: {item.teamId}
                      </Text>
                      </VStack>
                      </HStack>
                    </Box>
                    </HStack>

                </Button>
              </LinearGradient>
              </ImageBackground>
            </Box>

       }
         keyExtractor={item => item.id} />
       </View>
    )

   }


        return (

            <View>
              {getPlayers()}
              <View style={[styles.activityIndicatorTest, animateLoading ? styles.activityIndicatorLarge : styles.activityIndicatorNone]}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientLoading}>
                  <ActivityIndicator size="large" color="#fff" animating={animateLoading} />
                  <Heading style={[styles.activityIndicatorTextTest, animateLoading ? styles.activityIndicatorTextLarge : styles.activityIndicatorTextNone]}>LOADING...</Heading>
                </LinearGradient>
              </View>
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
    borderRadius: 5,
    overflow: 'hidden',
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
      overflow: 'hidden',
      borderRadius: 5,
  },
  activityIndicatorTest: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
  activityIndicator: {
    backgroundColor: '#e879f9',
  },
  activityIndicatorLarge: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  activityIndicatorTextLarge: {
    fontSize: 20,
    color: '#fff'
  },
  activityIndicatorNone: {
    height: '0%',
  },
  activityIndicatorTextNone: {
    fontSize: 0,
    color: 'transparent'
  },
  linearGradientLoading: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTen: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: '300',
    paddingLeft: 10,
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
  textTwelve: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 10,
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
  textNine: {
    color: "#ccc",
    fontSize: 9,
    fontWeight: '500',
    marginLeft: 10,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 9,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textEighteen: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 18,
        paddingTop: 8
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textInputName: {
    color: '#333',
    ...Platform.select({
      ios: {
        flex: 1,
        maxHeight: 14,
        lineHeight: 14,
        minHeight: 14,
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

export default HomePlayerListPlayers;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, ActivityIndicator, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
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

const HomePlayerTeamsList = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
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

  const { navigate } = props.navigation;



   const gotoTeam = async (team) => {

     setAnimateLoading(true)

  //console.log(JSON.stringify(team) + ' what am i sending team?');
     const teamId = team.teamId
  //console.log(teamId + ' teamId is?');
     //const teamDoc = firestore().collection(teamId).doc(teamId);
     //const teamDoc = firestore().collection(teamId).doc(teamId).get()
     const teamDoc = await firestore().collection(teamId).doc(teamId).get();

     const teamDocSeasons = await firestore().collection(teamId).doc('seasons').get();

  //console.log(teamDoc + ' teamDoc');
  //console.log(JSON.stringify(teamDoc.data()) + ' teamDoc');

     const teamDocData = teamDoc.data()
     const teamDocSeasonsData = teamDocSeasons.data()

      dispatch(updatePlayerUserData(playerUserDataTeams, playerUserDataPlayers, teamDocSeasonsData, playerUserDataSeasonsDisplay, playerUserDataSeasonsDisplayId))

      userRef.doc('playerUserData').update({
        teams: playerUserDataTeams,
        players: playerUserDataPlayers,
        seasons: playerUserDataSeasons,
        seasonsDisplay: playerUserDataSeasonsDisplay,
        seasonsDisplayId: playerUserDataSeasonsDisplayId
        })
        .catch(error => this.setState({ errorMessage: error.message }))

       const completedGames = teamDocData.gameIds.reduce(function(acc, cur) {
         if (cur.status > 4) {
           //return player
           acc.push(cur);
         }
         return acc;
       }, []);

 //console.log(JSON.stringify(completedGames) + ' completedGames');

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

    await Promise.all(completedGames.map(async (game) => {
   //console.log('are we in here first chck?');
   //console.log(JSON.stringify(game) + ' seconf check game data');
   //console.log(game.gameIdDb + ' third check gameIDDb data');
      const gameIdDb = game.gameIdDb

      const gameData = await firestore().collection(teamId).doc(gameIdDb).get();

      let gameDataRaw = []
      try {
   //console.log(JSON.stringify(gameData.data()) + ' dourth check gameData');

      //const gameDataFb = JSON.stringify(gameData.data())

      gameDataRaw = gameData.data()

   //console.log(JSON.stringify(gameDataRaw) + ' fith check gameDataRaw');

      if (gameDataRaw !== undefined) {
        completedGamesData.push(gameDataRaw)
      }

      }
      catch {
        //do nothing.
      }

    //console.log(JSON.stringify(gameDataRaw.game) + ' gameDataRaw like?');
    //console.log(JSON.stringify(gameData.game.data()) + ' gameData.game.data() like?');


      }));

   //console.log(JSON.stringify(completedGamesData) + ' completedGamesData');

      //let awayTeamList = []
      const awayTeamList = completedGamesData.map(game => {
     //console.log(JSON.stringify(game) + ' just looka t game firsst.');
      //console.log(JSON.stringify(game.gameIds) + ' just looka t game.gameIds firsst.');
      //console.log(JSON.stringify(game.gameIds[0].status) + ' just looka t game.status firsst.');
      //console.log(game.game.halfTime + ' just looka t halfTime firsst.');
      //console.log(JSON.stringify(game.gameIds[0].gameData) + ' just looka t game.gameIds.gameData firsst.');
      //console.log(JSON.stringify(game.gameIds[0].gameData.awayTeamName) + ' just looka t game.gameIds.gameData.awayTeamName firsst.');
      //console.log(game.game.teamNames.awayTeamName + ' just looka t game.teamNames.awayTeamName firsst.');
      //console.log(game.game.teamNames.awayTeamId + ' just looka t game.teamNames.awayTeamId firsst.');
      //console.log(JSON.stringify(game) + ' just looka t game firsst.');
        let tempTeamArray = []
        try {
          const awayTeamName = game.game.teamNames.awayTeamName
       //console.log(awayTeamName + ' awayTeamName here!');
          const awayTeamShortName = game.game.teamNames.awayTeamShortName
       //console.log(awayTeamShortName + ' awayTeamShortName here!');
          const awayTeamId = game.game.teamNames.awayTeamId
       //console.log(awayTeamId + ' awayTeamId here!');

          tempTeamArray.push({teamName: awayTeamName, teamNameShort: awayTeamShortName ,id: awayTeamId})

        }
        catch {
          //do nohtibng.
        }
        return tempTeamArray
      })

   //console.log(JSON.stringify(awayTeamList) + ' give me awayTeamList');
   //console.log(JSON.stringify(awayTeamList[0]) + ' give me awayTeamList[0]');


    /*
    .then((value) => {
     //console.log(value);
        // Expected output: "Success!"
     //console.log(JSON.stringify(completedGamesData) + ' completedGamesData');
    })
    */

    setTimeout(() => {
     //console.log('during timeout team list');
         setAnimateLoading(false)
       }, 5000);

     navigate('HomePlayerPreviousGamesHome', {
       whereFrom: 183, //change back to 182 i think. nope.
       teamGameData: completedGamesData,
       awayTeams: awayTeamList[0],
       teamId: teamId,
     });


   }

   const continueSetup = () => {

       navigate('HomePlayer',{
         playerUserDataLength: playerUserDataTeams.length
       });

   }

   const getTeamsDisplay = () => {

  //console.log(JSON.stringify(playerUserDataTeams) + ' playerUserDataTeams');

     let teamListDiplay = ''

     teamListDiplay = playerUserDataTeams.map(team => {
    //console.log('aer we in hmm in?');
       return (
         <Box alignItems="left" mt="3" shadow="6" minW="100%">
         <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
           <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
             <Button minW="100%" size="md" variant="subtle" _text={{
               color: "#ffffff",
               fontSize: 25,
               fontWeight: '500'
             }}
             style={{alignItems: 'left', justifyContent: "flex-start" }}
              bg="transparent" pt="5" pb="5" onPress={() => gotoTeam(team)}>

                 <HStack >
                 <Box>
                 <HStack>
                  <VStack>
                     {plusCircle}
                   </VStack>
                   <VStack>
                   <Text style={styles.textEighteen}>
                     {team.teamName}
                   </Text>
                   <Text style={styles.textTwelve}>
                     Team ID: {team.teamId}
                   </Text>
                   </VStack>
                   </HStack>
                 </Box>
                 </HStack>

             </Button>
           </LinearGradient>
           </ImageBackground>
         </Box>
     )

   })

   return teamListDiplay

   }

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Center>
            <Container maxW="100%" pl="3" pr="3">
            <ScrollView>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
              <Heading mb="2" mt="2" style={{color: '#fff'}}>Select Your Team</Heading>
              </LinearGradient>
              {getTeamsDisplay()}

            </ScrollView>
              <Box minW="100%" maxW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, borderTopColor: '#bbb', borderTopWidth: 1}}>
              <Center pt="2">
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/SoccerTimeLive-logoMain400pxTrans.png')}
                  />
              </Center>
              <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} ml="5" mr="5">
                <Button minW="100%" maxW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
              </HStack>
            </Box>
          </Container>
          </Center>
          </LinearGradient>
          <View style={[styles.activityIndicatorTest, animateLoading ? styles.activityIndicatorLarge : styles.activityIndicatorNone]}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientLoading}>
              <ActivityIndicator size="large" color="#fff" animating={animateLoading} />
              <Heading style={[styles.activityIndicatorTextTest, animateLoading ? styles.activityIndicatorTextLarge : styles.activityIndicatorTextNone]}>LOADING...</Heading>
            </LinearGradient>
          </View>
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
  linearGradientBg: {
    minWidth: '100%',
  },
  linearGradientHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 15,
    marginBottom: 15,
    borderColor: '#fff',
    borderWidth: 1,
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
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textTwelve: {
    color: "#ccc",
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
})

export default HomePlayerTeamsList;

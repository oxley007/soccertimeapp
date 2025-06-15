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
const plusCircle = <IconAnt name="pluscircleo" size={40} color="#fff" />;
const plusCircleBlack = <IconAnt name="pluscircleo" size={40} color="#000" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;

import * as Animatable from 'react-native-animatable';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updatePlayerUserData } from '../../Reducers/playerUserData';
import { updateCheckSortPlayer } from '../../Reducers/checkSortPlayer';
import { updateCheckSort } from '../../Reducers/checkSort';

const HomePlayerLiveScores = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [teamLiveGames, setTeamLiveGames] = useState(0);
  const [liveGames, setLiveGames] = useState([]);
  const [teamIdState, setTeamIdState] = useState('');
  const [gameIdState, setGameIdState] = useState('');
  const [idGames, setIdGames] = useState('');
  const [gameDataTemp, setGameDataTemp] = useState([]);
  const [displayNoGames, setDisplayNoGames] = useState(true);


  //let games = useSelector(state => state.games.games);
  //let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);
  let checkSortPlayer = useSelector(state => state.checkSortPlayer.checkSortPlayer);

  let liveGameDataGlobal = []


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;


  /*
  useEffect(() => {
    const unsubscribeFunctions = [];

    const getGameDataFunc = async () => {
      let liveGamesData = [];

      await Promise.all(
        playerUserDataTeams.map(async (team) => {
          const teamId = team.teamId;

          const unsubscribe = firestore()
            .collection(teamId)
            .doc(teamId)
            .onSnapshot((documentSnapshot) => {
              const gameIds = documentSnapshot.data()?.gameIds || [];

              const index = liveGamesData.findIndex((obj) => obj.teamId === teamId);
              if (index >= 0) {
                liveGamesData[index].gameData = gameIds;
              } else {
                liveGamesData.push({ teamId, gameData: gameIds });
              }

              setTeamLiveGames([...liveGamesData]);

              gameIds.forEach((gameData) => {
                setTeamIdState(teamId);
                setGameIdState(gameData.gameIdDb);
              });

              setGetTeam(teamId);
            });

          unsubscribeFunctions.push(unsubscribe);
        })
      );
    };

    getGameDataFunc();

    // Clean up Firestore listeners
    return () => {
      unsubscribeFunctions.forEach((unsub) => {
        if (typeof unsub === 'function') {
          unsub();
        }
      });
    };
  }, []);
  */


  useEffect(() => {

    getGameDataFunc()

  }, []);


  const getGameDataFunc = async () => {
    let liveGamesDataTrue = false
    let liveGamesData = []
    await Promise.all(playerUserDataTeams.map(async (team) => {

      const teamId = team.teamId
      let documentSnapshotGameIds = []
    const subscriber = firestore()
      .collection(teamId)
      .doc(teamId)
      .onSnapshot(documentSnapshot => {
     //console.log('User data: ', documentSnapshot.data());
        //liveGamesData = []
        //setTeamLiveGames(liveGamesData)
        //try {
          //const teamLiveGames = liveGamesData
          //liveGamesData = checkData(liveGamesData)
       //console.log('this top 11');



 //console.log('this bottom 11');
      let arr2 = []
      let result = []

        const index = liveGamesData.findIndex((obj) => obj.teamId === teamId);
        if (index >= 0) {
          liveGamesData[index].gameData = documentSnapshot.data().gameIds
        }
        else {
            liveGamesData.push({teamId: teamId, gameData: documentSnapshot.data().gameIds})
        }

        //liveGamesData.push(documentSnapshot.data().gameIds)

     //console.log(JSON.stringify(liveGamesData) + ' liveGamesData checky new data');
     //console.log(JSON.stringify(arr2) + ' arr2 checky new data');

        setTeamLiveGames(liveGamesData)

        const gameIds = documentSnapshot.data().gameIds

        gameIds.map((gameData) => {
          setTeamIdState(teamId)
          setGameIdState(gameData.gameIdDb)
          //setGameDataTemp(gameData)
        })
        //documentSnapshotGameIds = documentSnapshot.data().gameIds
      });

    // Stop listening for updates when no longer required
    setGetTeam(teamId)



  }))
  }




   const viewPrevGame = (gameIdDb, teamId) => {


     getGameDataFunc()
     dispatch(updateCheckSort(0))
     dispatch(updateCheckSortPlayer(1))

     navigate('EventsHomePlayer', {
       whereFrom: 191,
       gameIdDb: gameIdDb,
       teamId: teamId,
       newRefresh: true,
     });


   }


   const gameStage = (status) => {

     if (status === 1) {
       return (
         <Text>Game Getting Ready for Kick-Off</Text>
       )

     }
     else if (status === 2) {
       return (
         <Text>Live Now - First Half</Text>
       )
     }
     else if (status === 3) {
       return (
         <Text>Live Now - Half-time</Text>
       )
     }
     else if (status === 4) {
       return (
         <Text>Live Now - Second Half</Text>
       )
     }

   }

   const notYetKO = () => {
     Alert.alert("Please try again soon. Game not yet kicked off." )
   }

   const liveGamesDataDisplay = () => {

     let teamLiveGamesDisplay = ''
     try {

     teamLiveGamesDisplay = teamLiveGames.map((gamesData) => {
    //console.log(JSON.stringify(gamesData) + ' check gamesData');
    //console.log(JSON.stringify(gamesData[0]) + ' check gamesData[0]');

       let teamLiveGamesDisplayGame = ''
       setDisplayNoGames
    //console.log(gamesData.gameData.length + ' check gamesData.gameData.length');
       const gamesDataLength = gamesData.gameData.length
       let gameDataCount = 0
       teamLiveGamesDisplayGame = gamesData.gameData.map((gameData) => {
      //console.log(JSON.stringify(gameData) + ' check gameData');
       if (gameData.status === 1) {
         //return (<Text>{gameData.status}</Text>)
         return (
           <Box shadow="7" style={{borderBottomColor: '#333', borderBottomWidth: 1}}>
           <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
             <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']} style={styles.linearGradientFixture}>

           <Center>
           <Box mt="0" pt="1" pb="3" minW="100%">
             <View  style={{borderBottomColor: "#E879F9", borderBottomWidth: 1}} />
           </Box>
           <HStack pt="2">
           <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
             {gameData.gameData.homeTeamName}
           </Text>
           </HStack>
           <HStack>
           <Text style={{fontSize: 20, color: '#ccc', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
             vs
           </Text>
           </HStack>
           <HStack mb="2">
           <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
             {gameData.gameData.awayTeamName}
           </Text>
           </HStack>

           </Center>
           <Box mt="0" pt="1" pb="3" minW="100%">
             <View  style={{borderBottomColor: "#E879F9", borderBottomWidth: 1}} />
           </Box>
           <Center>
           <Text style={{fontSize: 16, color: '#ccc', fontWeight: '400', textAlign: 'left', paddingBottom: 3, marginBottom: 5}}>
             {gameStage(gameData.status)}
           </Text>
           <Text style={{fontSize: 16, color: '#ccc', fontWeight: '400', textAlign: 'left', paddingBottom: 3, marginBottom: 5}}>
             {gameData.gameData.gameDate}
           </Text>

           <Box mt="0" pt="1" pb="3" minW="100%">
             <View  style={{borderBottomColor: "#E879F9", borderBottomWidth: 1}} />
           </Box>
           <Box bg="#fff" style={{borderRadius: 5}} pt="3" pb="3" pl="5" pr="5" mt="2">
           <Text style={{fontSize: 20, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 30}}>
             {gameData.gameData.homeTeamShort}
             <Center>
             <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
               <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
                {gameData.gameData.homeTeamScore}
               </Text>
             </Box>
             </Center>
              vs
              <Center>
              <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
                <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
                 {gameData.gameData.awayTeamScore}
                </Text>
              </Box>
              </Center>
            {gameData.gameData.awayTeamShort}
           </Text>
           </Box>
           </Center>
           <Button minW="100%" bg="tertiary.400" mt="5"  size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => notYetKO()}>You can access the game by tapping here once it starts.</Button>
           </LinearGradient>
           </ImageBackground>
           </Box>
         )
       }
       else if (gameData.status === 2) {
         //return (<Text>{gameData.status}</Text>)
         return (
           <Box shadow="7" style={{borderBottomColor: '#333', borderBottomWidth: 1}}>
           <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
             <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']} style={styles.linearGradientFixture}>

           <Center>
           <Box mt="0" pt="1" pb="3" minW="100%">
             <View  style={{borderBottomColor: "#E879F9", borderBottomWidth: 1}} />
           </Box>
           <HStack pt="2">
           <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
             {gameData.gameData.homeTeamName}
           </Text>
           </HStack>
           <HStack>
           <Text style={{fontSize: 20, color: '#ccc', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
             vs
           </Text>
           </HStack>
           <HStack mb="2">
           <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
             {gameData.gameData.awayTeamName}
           </Text>
           </HStack>

           </Center>
           <Box mt="0" pt="1" pb="3" minW="100%">
             <View  style={{borderBottomColor: "#E879F9", borderBottomWidth: 1}} />
           </Box>
           <Center>
           <Text style={{fontSize: 16, color: '#ccc', fontWeight: '400', textAlign: 'left', paddingBottom: 3, marginBottom: 5}}>
             {gameStage(gameData.status)}
           </Text>
           <Text style={{fontSize: 16, color: '#ccc', fontWeight: '400', textAlign: 'left', paddingBottom: 3, marginBottom: 5}}>
             {gameData.gameData.gameDate}
           </Text>

           <Box mt="0" pt="1" pb="3" minW="100%">
             <View  style={{borderBottomColor: "#E879F9", borderBottomWidth: 1}} />
           </Box>
           <Box bg="#fff" style={{borderRadius: 5}} pt="3" pb="3" pl="5" pr="5" mt="2">
           <Text style={{fontSize: 20, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 30}}>
             {gameData.gameData.homeTeamShort}
             <Center>
             <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
               <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
                {gameData.gameData.homeTeamScore}
               </Text>
             </Box>
             </Center>
              vs
              <Center>
              <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
                <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
                 {gameData.gameData.awayTeamScore}
                </Text>
              </Box>
              </Center>
            {gameData.gameData.awayTeamShort}
           </Text>
           </Box>
           <Button minW="100%" bg="#E879F9" mt="5"  size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => viewPrevGame(gameData.gameIdDb, gameData.teamId)}>View Live Scores & Events</Button>
           </Center>

           </LinearGradient>
           </ImageBackground>
           </Box>
         )
       }
       else {
         /*
         gameDataCount = gameDataCount + 1
         if (gamesDataLength === gameDataCount) {
           setDisplayNoGames(true)
         }
         */
       }
     })
  //console.log(teamLiveGamesDisplayGame + ' teamLiveGamesDisplayGame');
     return teamLiveGamesDisplayGame
   })
   }
   catch {
  //console.log('hitting error 44');

     //do nothing.
   }

   return teamLiveGamesDisplay

   }

   const continueSetup = () => {

     navigate('HomePlayer',{
       playerUserDataLength: playerUserDataTeams.length
     });

   }

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Center>
            <Container maxW="100%" pl="3" pr="3">
            <ScrollView>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
              <Heading mb="2" mt="2" style={{color: '#fff'}}>Live Scores</Heading>
              </LinearGradient>
              <Box>
              {liveGamesDataDisplay()}
              </Box>

                <Text style={{color: '#fff'}}>No live games. Games will display once your coach/manager starts the game.</Text>

            </ScrollView>
              <Box minW="100%" maxW="100%" safeAreaTop alignSelf="center" >
              <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} ml="5" mr="5">
                <Button minW="100%" maxW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
              </HStack>
            </Box>
          </Container>
          </Center>
          </LinearGradient>
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
  linearGradientFixture: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    minWidth: '100%',
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
    //borderColor: '#fff',
    //borderWidth: 1,
  },
})

export default HomePlayerLiveScores;

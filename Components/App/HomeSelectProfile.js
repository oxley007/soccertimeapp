import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="plus" size={30} color="#fff" />;
const plusCircleBlack = <IconAnt name="pluscircleo" size={40} color="#000" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;

import * as Animatable from 'react-native-animatable';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updateUserProfile } from '../../Reducers/userProfile';
import { updateSeasons } from '../../Reducers/seasons';

const HomeSelectProfile = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [playerProfile, setPlayerProfile] = useState([]);
  const [isCoachAllowed, setIsCoachAllowed] = useState(true);
  const [getHasArm64, setHasArm64] = useState(false);
  const [getRamData, setRamData] = useState(null);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  let seasons = useSelector(state => state.seasons.seasons);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  let userRef = null
  try {
  userRef = firestore().collection(currentUser.uid);
  }
  catch {
    //do nothing.
  }
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;

  useEffect(() => {
    analytics().logEvent('home_screen_viewed', {
      screen_class: 'HomeScreen',
    });
  }, []);

  try {
    useEffect(() => {

      setPlayerProfile(playerUserDataTeams)

    }, [props.route.params.playerUserDataLength])
  }
  catch {
    useEffect(() => {

      setPlayerProfile(playerUserDataTeams)

    })
  }

  useEffect(() => {

    async function checkRAM() {
      if (Platform.OS === 'android') {
        const totalMemBytes = await DeviceInfo.getTotalMemory();
        // 12GB = 12 * 1024 * 1024 * 1024 = 12884901888 bytes
        //if (totalMemBytes >= 12884901888) {
        //if (totalMemBytes >= 7589934592) {
        setRamData(totalMemBytes)
        if (totalMemBytes >= 5442450944) {
          setIsCoachAllowed(true);
        } else {
          setIsCoachAllowed(false);
        }
      } else {
        // iOS or other platforms, default to true or false based on your choice
        setIsCoachAllowed(true);
      }
    }
    checkRAM();

      /*
      //async function checkRAM() {
      const isHighEndDevice = async () => {
        if (Platform.OS === 'android') {
          //const totalMemBytes = await DeviceInfo.getTotalMemory();
          // 12GB = 12 * 1024 * 1024 * 1024 = 12884901888 bytes
          //if (totalMemBytes >= 12884901888) {

          const abis = await DeviceInfo.getSupportedAbis(); // e.g. ["arm64-v8a", "armeabi-v7a"]
          const totalMemory = await DeviceInfo.getTotalMemory(); // in bytes
          const model = DeviceInfo.getModel(); // e.g. "Redmi Note 8"

          // Simple logic:
          const hasArm64 = abis.includes('arm64-v8a');
          console.log(hasArm64 + ' hasArm64 is?');
          setHasArm64(hasArm64)
          const hasEnoughRam = totalMemory >= 6 * 1024 * 1024 * 1024; // 6 GB

          // Optionally, check against known low-end models
          const knownLowEndModels = ['Redmi 9A', 'Galaxy A01', 'Moto E6'];
          const isKnownLowEndModel = knownLowEndModels.includes(model);

          return hasArm64 && hasEnoughRam && !isKnownLowEndModel;
        }
        else {
          setIsCoachAllowed(true);
        }
      }

        // Usage

        isHighEndDevice().then((result) => {
          if (result) {
            console.log('High-end device: Enable heavy features');
            setIsCoachAllowed(true);
          } else {
            console.log('Low-end device: Keep things light');
            setIsCoachAllowed(false);
          }
        });




      //checkRAM();

      */
    }, []);

   const gameStatus = (numberFrom) => {


     let titleText = ''
     let descText = ''
     if (numberFrom === 1) {
      titleText = 'Coach or Manager'
      descText = "Tap here if you're using the app to manage subs and game-time."
     }
     else if (numberFrom === 2) {
       titleText = 'Player or Parent'
       descText = "Tap here if you've received a Team ID & Player ID from a Coach or Manager"
     }
     else if (numberFrom === 3) {
       titleText = 'Fan or Supporter'
       descText = "Tap here if you're a fan or supporter using the app to view live scores only."
     }

     return (
       <Box style={{textAlign: 'left', alignItems: 'flex-start',
       justifyContent: 'flex-start',}}>
       <HStack>
        <VStack bg="#333" style={{borderRadius: 50, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
           {plusCircle}
         </VStack>
         <VStack>
         <Text style={{color: "#ffffff",
         fontSize: 22,
         fontWeight: '500',
         lineHeight: 40, paddingLeft: 10, paddingTop: 5}}>
           {titleText}
         </Text>
         </VStack>
         </HStack>
         <Center>
         <Text style={{color: "#ffffff",
         fontSize: 16,
         fontWeight: '400', marginTop: 10, marginTop: 30}}>
           {descText}
         </Text>
         </Center>
       </Box>
     )

   }


   const previousGames = (userPro) => {

     if (userPro === 4) {
       dispatch(updateUserProfile(4))

       userRef.doc('userData').update({
           userProfile: 4,
         })
         .catch(error => this.setState({ errorMessage: error.message }))
     }
     else  {
       dispatch(updateUserProfile(1))

       userRef.doc('userData').update({
           userProfile: 1,
         })
         .catch(error => this.setState({ errorMessage: error.message }))
     }

    dispatch(updateSeasons(seasons, '', 99999998))

    let newSignIn = false

    try {
      newSignIn = props.route.params.newSignIn
    }
    catch {
      //do nothing.
    }

 //console.log(newSignIn + ' whats is newSignIn here?');

  if (isCoachAllowed === false) {
    userRef.doc('userData').update({
        ramData: getRamData,
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    Alert.alert("Sorry, your phone isn’t powerful enough to run the coaching AI tools. These features require a device with at least 6GB of RAM." )
  }
  else {

    userRef.doc('userData').update({
        ramData: getRamData,
      })
      .catch(error => this.setState({ errorMessage: error.message }))

      if (userPro === 4) {
        navigate('HomeParentAddTeam')
      }
      else {
         navigate('Home', {
           newSignIn: newSignIn,
         });
     }
  }

   }

   const previousGamesOld = () => {

     dispatch(updateUserProfile(1))

     userRef.doc('userData').update({
         userProfile: 1,
       })
       .catch(error => this.setState({ errorMessage: error.message }))

    dispatch(updateSeasons(seasons, '', 99999998))

    let newSignIn = false

    try {
      newSignIn = props.route.params.newSignIn
    }
    catch {
      //do nothing.
    }

 //console.log(newSignIn + ' whats is newSignIn here?');

     navigate('Home', {
       newSignIn: newSignIn,
     });

   }

   const playerHome = (userPro) => {

     dispatch(updateSeasons(seasons, '', 99999998))

     if (userPro === 2) {
        dispatch(updateUserProfile(2))
        userRef.doc('userData').update({
            userProfile: 2,
          })
          .catch(error => this.setState({ errorMessage: error.message }))
     }
     else {
       dispatch(updateUserProfile(3))
       userRef.doc('userData').update({
           userProfile: 3,
         })
         .catch(error => this.setState({ errorMessage: error.message }))
     }

     if (playerProfile.length > 0) {
        navigate('HomePlayer');
     }
     else {
        navigate('HomePlayerAddTeam',{
          backToSelectProfile: true
        });
     }

   }

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <Center>
            <Container>
            <ScrollView>
              <Box alignItems="left" mt="3" shadow="6" minW="100%" style={{borderRadius: 5, overflow: 'hidden', alignItems: 'flex-start',
              justifyContent: 'flex-start'}}>
              <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" minW="100%" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500',
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                  }} bg="transparent" pt="5" pb="5" onPress={() => previousGames()}>

                      <HStack minW="100%">
                        {gameStatus(1)}
                      </HStack>

                  </Button>
                </LinearGradient>
                </ImageBackground>
              </Box>
              <Box alignItems="center" mt="3" shadow="6" style={{borderRadius: 5, overflow: 'hidden', alignItems: 'flex-start',
              justifyContent: 'flex-start'}}>
              <ImageBackground source={require(`../../assets/soccer_field_1.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500',
                  }} bg="transparent" pt="5" pb="5" onPress={() => playerHome(2)}>
                    <Center>
                      <HStack>
                        {gameStatus(2)}
                      </HStack>
                    </Center>
                  </Button>
                </LinearGradient>
                </ImageBackground>
              </Box>
              {userProfile === 100 &&
              <Box minw="100%" mt="3" shadow="6" style={{borderRadius: 5, overflow: 'hidden', alignItems: 'flex-start',
              justifyContent: 'flex-start'}}>
              <ImageBackground source={require(`../../assets/soccer_field_3.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500',
                  }} bg="transparent" pt="5" pb="5" onPress={() => previousGames(4)}>

                      <HStack minw="100%">
                        <Box minw="100%">
                        <HStack minw="100%">
                         <VStack bg="#333" style={{borderRadius: 50, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, maxHeight: '90%'}}>
                            {plusCircle}
                          </VStack>
                          <VStack>
                            <HStack>
                              <Text style={{color: "#fff",
                              fontSize: 22,
                              fontWeight: '500',
                              lineHeight: 22, paddingLeft: 10, paddingTop: 5}}>
                                Manage Substitutions for
                              </Text>
                            </HStack>
                            <HStack>
                            <Text style={{color: "#fff",
                            fontSize: 22,
                            fontWeight: '500',
                            lineHeight: 22, paddingLeft: 10, paddingTop: 5}}>
                              Coach
                            </Text>
                            </HStack>
                          </VStack>
                          </HStack>
                          <Center>
                          <Text style={{color: "#fff",
                          fontSize: 16,
                          fontWeight: '400', marginTop: 30, maxWidth: '100%', overflow: 'hidden'}}>
                            Tap here if you are an Assistant or Parent managing player substitutions during the game on behalf of the coach.
                          </Text>
                          </Center>
                        </Box>
                      </HStack>

                  </Button>
                </LinearGradient>
                </ImageBackground>
              </Box>
              }
              <Text style={{color: 'transparent', fontSize: 0, lineHeight: 0}}>{getHalfTimeFlag}...</Text>
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
          </LinearGradient>
        </Center>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    //flex: 1,
    //paddingLeft: 5,
    //paddingRight: 5,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
      //flex: 1,
      //resizeMode: 'cover', // or 'stretch'
      borderRadius: 5,
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
  },
  linearGradientBg: {
    minWidth: '100%',
    width: '100%',
    paddingTop: 80,
  }
})

export default HomeSelectProfile;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;
import LinearGradient from 'react-native-linear-gradient';

//import { requestPurchase, requestSubscription, initConnection, useIAP} from 'react-native-iap';
import Purchases from 'react-native-purchases';

import { updateGames } from '../../Reducers/games';
import { updateCheckSortIap } from '../../Reducers/checkSortIap';


const IapConfrim = (props)=>{

  //const [getTeam, setGetTeam] = useState([]);
  //const [isOpen, setIsOpen] = useState(true);
  const [getProductList, setProductList] = useState([]);


  /*
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);
  */

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let checkSortIap = useSelector(state => state.checkSortIap.checkSortIap);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  let addTeamOnly = 1
  try {
    addTeamOnly = props.route.params.addTeamOnly
  }
  catch {
    addTeamOnly = 1
  }

  let teamType = 0
  try {
    teamType = props.route.params.teamType
  }
  catch {
    teamType = 0
  }

  let gameIdDb = 0
  try {
    gameIdDb = props.route.params.gameIdDb
  }
  catch {
    gameIdDb = 0
  }

  const { navigate } = props.navigation;

  useEffect(() => {




      //setProductList(prodsInOrder)


  },[])

  const continueSubsSetup = () => {
    const gameIdDb = games[0].gameIdDb
    dispatch(updateCheckSortIap(1))

    navigate('AddTeamHome', {
      teamType: teamType,
      addTeamOnly: addTeamOnly,
      gameIdDb: gameIdDb
    });

    /*
    navigate('AddTeamHome', {
      teamType: 0,
      addTeamOnly: 0,
      gameIdDb: gameIdDb
    });
    */

  }


  const continueSetup = () => {

    if (userProfile === 1) {
      navigate('Home')
    }
    else if (userProfile === 2) {
      navigate('HomePlayer',{
        playerUserDataLength: playerUserDataTeams.length
      });
    }
    else if (userProfile === 3) {
      navigate('HomePlayer',{
        playerUserDataLength: playerUserDataTeams.length
      });
    }
    else {
      navigate('Home');
    }

  }

  const continueBackToGame = (navigateBackName, gameIdDb) => {


    try {
      navigate(navigateBackName, {
        fromContinue: false,
        gameIdDb: gameIdDb,
      })
    }
    catch {
      navigate('Home')
    }

  }

  const getButtonDisplay = () => {

    let navigateBackCheck = false
    let navigateBackName = ''
    let gameIdDb = ''
    try {
      navigateBackCheck = props.route.params.navigateBack
      navigateBackName = props.route.params.navigateBackName
      gameIdDb = props.route.params.gameIdDb
    }
    catch {
      navigateBackCheck = false
      navigateBackName = ''
      gameIdDb = ''
    }

    console.log(checkSortIap + ' is?');
    if (checkSortIap === 0) {
      return (
        <Button style={{marginTop: 20}} minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSubsSetup()}>
          Continue Subs Management Setup
        </Button>
      )
    }
    else if (teamPlayers.length < 1 || userProfile > 1) {
      return (
        <Button style={{marginTop: 20}} minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Home</Button>
      )
    }
    if (navigateBackCheck === true && navigateBackName !== '') {
      return (
        <Button style={{marginTop: 20}} minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueBackToGame(navigateBackName, gameIdDb)}>Back to Game</Button>
      )
    }
    else if (teamPlayers.length < 1 || userProfile > 1) {
      return (
        <Button style={{marginTop: 20}} minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Home</Button>
      )
    }
    else if (checkSortIap === 1) {
      return (
        <Button style={{marginTop: 20}} minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Home</Button>
      )
    }
    else {

    return (
      <Box style={{paddingTop: 20}}>
      <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(165,243,252,0.8)', 'rgba(207,251,226,0.8)']} style={styles.linearGradientBtn}>
          <Button minW="100%" size="md" variant="subtle" _text={{
            color: "#ffffff",
            fontSize: 25,
            fontWeight: '500'
          }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="1" pb="1" onPress={() => sendPlayerInviteHome()}>

            <HStack>
              <VStack>
                {arrowrightcircleSmall}
              </VStack>
              <Center>
              <VStack pl="3">
                  <Text style={{fontSize: 16, color: '#E879F9', lineHeight: 18}}>Share Live Scores/Stats With Your Team</Text>
              </VStack>
              </Center>
            </HStack>

          </Button>
        </LinearGradient>
        </ImageBackground>
      </Box>
    )
  }

  }

  const getMessageForCoachDisplay = () => {

    if (userProfile === 1) {
      return (
        <Text style={{fontWeight: '300', color: '#fff', paddingTop: 10}}>Let your team know that they can view <Text style={{fontWeight: '600'}}>live scores & stats</Text>! Click the <Text style={{fontWeight: '600'}}>'Share Live Scores/Stats With Your Team'</Text> button below to email your team.</Text>
      )
    }
  }

  const getExpiryDateDisplay = () => {

    if (props.route.params.expiryDate === null) {
      return (
        <View>
          <Text style={{fontWeight: '400', color: '#fff'}}>You're Expiry Date: </Text>
          <Text style={{fontWeight: '600', color: '#fff'}}>NEVER!</Text>
        </View>
      )
    }
    else {
      const expiryDate = new Date(props.route.params.expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;
      return (
        <View style={{paddingTop: 5}}>
          <Text style={{fontWeight: '400', color: '#fff'}}>You're Expiry Date: </Text>
          <Text style={{fontWeight: '600', color: '#fff'}}>{time}</Text>
        </View>
      )
    }


  }


  const sendPlayerInviteHome = () => {

    navigate('SendPlayerInviteHome');

  }

    const getProdDesc = (productDescIdentifier, price) => {

   //console.log(productDescIdentifier + ' productDescIdentifier is?');

      const teamPrice = price + 2
      const teamPriceString = teamPrice.toString()


      if (productDescIdentifier === 'pro_forever_indiv') {
        return (
          <Text style={styles.textFourteen}>
            Get <Text style={{fontWeight: 600}}>Pro One</Text> & <Text style={{fontWeight: 600}}>Pro Two</Text> from the above description, forever! No subscription, you can view player and team stats for the rest of your soccer career!
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_indiv') {
        return (
          <Text style={styles.textFourteen}>
            Get <Text style={{fontWeight: 600}}>Pro One</Text> & <Text style={{fontWeight: 600}}>Pro Two</Text> from the above description, for a 1 year subscription! No subscription, You can view palyer and team stats for the whole year!
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_team') {
        return (
          <Text style={styles.textFourteen}>
            Get <Text style={{fontWeight: 600}}>Pro One</Text>, <Text style={{fontWeight: 600}}>Pro Two</Text> & <Text style={{fontWeight: 600}}>Pro Three</Text> from the above descriptions, for a 1 year subscription! You and your team can view your stats & live scores for the whole year! Alternatively it'll cost ${teamPriceString} per/player if players/parent buy yearly subscription themsleves.
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_forever_team') {
        return (
          <Text style={styles.textFourteen}>
            Get <Text style={{fontWeight: 600}}>Pro One</Text>, <Text style={{fontWeight: 600}}>Pro Two</Text> & <Text style={{fontWeight: 600}}>Pro Three</Text> from the above descriptions, forever! No subscription, you and your team can view your stats & live scores for the rest of your soccer career!
          </Text>
        )
      }
    }

        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="16" >
                  <ScrollView>
                    <Box minW='100%' style={{zIndex: 3, elevation: 3}}>
                      <HStack>
                        <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
                          <Box shadow="7" mt="10" mb="2">
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                              <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 10, paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
                                You've upgraded to Pro!
                              </Heading>
                            </LinearGradient>
                          </Box>
                          <Box alignItems="center" mt="3" shadow="6">
                            <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
                              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
                                <Center>
                                  <Box mt="0" pt="1" pb="3" minW="100%">
                                      <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Thank You & Enjoy!</Heading>
                                    <HStack>
                                      <VStack>
                                        <Text style={{fontWeight: '400', color: '#fff'}}>You've sucssfully upgraded to:</Text>
                                        <Text style={{fontWeight: '600', color: '#fff'}}>{props.route.params.productNameTitle}.</Text>
                                        {getExpiryDateDisplay()}
                                        {getMessageForCoachDisplay()}
                                      </VStack>
                                    </HStack>
                                  </Box>
                                </Center>
                              </LinearGradient>
                            </ImageBackground>
                            </Box>
                            {getButtonDisplay()}
                        </View>
                      </HStack>
                    </Box>

                  </ScrollView>
                </Container>
                <Box minW="100%" safeAreaTop alignSelf="center" mt="5" mb="10" style={{paddingTop: 0, paddingBottom: 50, paddingLeft: 20, paddingRight: 20}}>
                  <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} >

                  </HStack>
                </Box>
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 10
  },
  linearGradientBtn: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 5
  },
  linearGradientProduct: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
  },
  linearGradientHide: {
    minWidth: '100%',
  },
  linearGradientHideDisplay: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    minWidth: '100%',
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  textHeader: {
    color: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
  textHeaderTitle: {
    color: '#333',
    fontSize: 22,
    paddingLeft: 20
  },
  buttonTextBackWhite: {
    fontSize: 20,
    color: '#333',
    fontWeight: '400',
    paddingLeft: 20
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  textFourteen: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 5,
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

export default IapConfrim;

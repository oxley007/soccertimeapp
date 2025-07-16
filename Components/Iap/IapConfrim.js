import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
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
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);

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
    analytics().logEvent('IapConfirm_screen_viewed', {
      screen_name: 'IapConfirm',
    });
  }, []);

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
      navigateBackCheck = props.route.params.navigateBackCheck
      navigateBackName = props.route.params.navigateBackName
      gameIdDb = props.route.params.gameIdDb
    }
    catch {
      navigateBackCheck = false
      navigateBackName = ''
      gameIdDb = ''
    }

    console.log(checkSortIap + ' is?');
    console.log(navigateBackName + ' navigateBackName check');
    console.log(navigateBackCheck + ' navigateBackCheck check');
    if (checkSortIap === 0) {
      return (
        <Button style={{marginTop: 20}} minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSubsSetup()}>
          Continue Subs Management Setup
        </Button>
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

    const getProductConfirmation = () => {

      const proFeatures = [
        { key: 'pro_forever_team', label: 'Pro Lifetime Team', data: pro_forever_team },
        { key: 'pro_forever_indiv', label: 'Pro Lifetime Individual', data: pro_forever_indiv },
        { key: 'pro_forever_player', label: 'Pro Lifetime Player', data: pro_forever_player },
        { key: 'pro_yearly_team', label: 'Pro Yearly Team', data: pro_yearly_team },
        { key: 'pro_yearly_indiv', label: 'Pro Yearly Individual', data: pro_yearly_indiv },
        { key: 'pro_yearly_player', label: 'Pro Yearly Player', data: pro_yearly_player }
      ];

      // Find all purchased products
      const purchased = proFeatures.filter(f => f.data?.[0]?.purchased === true);

      // Find highest priority purchased product
      const highestPurchased = purchased.length > 0 ? purchased[0] : null;

      let productIdentification = ''
      let expirationDate = 0
      let purchasedProd = false
      if (highestPurchased) {
        const { label, key, data } = highestPurchased;
        productIdentification = data[0].identifier;
        expirationDate = data[0].expiryDate;
        purchasedProd = data[0].purchased;
        console.log(`Highest Ranked Purchased Feature: ${label}`);
        console.log(`Identifier: ${productIdentification}`);
        console.log(`Expiration Date: ${expirationDate}`);
        console.log(`purchasedProd is: ${purchasedProd}`);
      } else {
        console.log('❌ No active pro feature found');
      }

      const today = new Date();
      const nextYear = new Date(today);
      const nextMonth = new Date(today);
      const sixMonthsLater = new Date(today);

      // Add 1 year:
      nextYear.setFullYear(today.getFullYear() + 1);

      console.log(nextYear.toLocaleDateString());  // formatted date

      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      console.log(nextYear.toLocaleDateString('en-GB', options));
      const oneYearBackUp = nextYear.toLocaleDateString('en-GB', options)

      // Add 1 month:
      nextMonth.setMonth(today.getMonth() + 1);

      //const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedNextMonth = nextMonth.toLocaleDateString('en-GB', options);

      console.log(formattedNextMonth);

      // Add 6 months:
      sixMonthsLater.setMonth(today.getMonth() + 6);

      //const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedSixMonths = sixMonthsLater.toLocaleDateString('en-GB', options);

      console.log(formattedSixMonths);

      let displayName = ''
      let expirationDateBackUp = ''

      console.log(productIdentification + ' productIdentification check 1');
      console.log(expirationDate + ' expirationDate check 0.5');
      switch (productIdentification) {
        case 'pro_yearly_indiv':
          displayName = 'Pro Season Stats - 1 Year Subscription';
          expirationDateBackUp = oneYearBackUp
          break;
        case 'pro_monthly_indv':
          displayName = 'Pro Season Stats - Monthly Subscription';
          expirationDateBackUp = formattedNextMonth
          break;
        case 'pro_season_indv':
          displayName = 'Pro Season Stats - 6 Month Subscription';
          expirationDateBackUp = formattedSixMonths
          break;
        case 'pro_yearly_team':
          displayName = 'Pro Live Scores - 1 Year Subscription';
          expirationDateBackUp = oneYearBackUp
          break;
        case 'pro_monthly_team':
          displayName = 'Pro Live Scores - Monthly Subscription';
          expirationDateBackUp = formattedNextMonth
          break;
        case 'pro_season_team':
          displayName = 'Pro Live Scores - 6 Month Subscription';
          expirationDateBackUp = formattedSixMonths
          break;
        case 'pro_yearly_player':
          displayName = 'Pro Live Scores & Stats - 1 Year Subscription';
          expirationDateBackUp = oneYearBackUp
          break;
        case 'pro_monthly_player':
          displayName = 'Pro Live Scores & Stats - Monthly Subscription';
          expirationDateBackUp = formattedNextMonth
          break;
        case 'pro_season_player':
          displayName = 'Pro Live Scores & Stats - 6 Month Subscription';
          expirationDateBackUp = formattedSixMonths
          break;
        case 'pro_forever_indiv':
          displayName = 'Pro Manager/Coach - Forever Bundle';
          break;
        case 'pro_forever_team':
          displayName = 'Pro Live Scores - Forever Bundle';
          break;
        case 'pro_forever_player':
          displayName = 'Pro - Forever Bundle';
          break;
        case 'pro_yearly_indiv_android:yearly-sub-799':
          displayName = 'Pro Season Stats - 1 Year Subscription';
          expirationDateBackUp = oneYearBackUp
          break;
        case 'pro_monthly_indiv_android:month-sub-499':
          displayName = 'Pro Season Stats - Monthly Subscription';
          expirationDateBackUp = formattedNextMonth
          break;
        case 'pro_season_indiv_android:season-sub-2499':
          displayName = 'Pro Season Stats - 6 Month Subscription';
          expirationDateBackUp = formattedSixMonths
          break;
        case 'pro_yearly_team_android:yearly-sub-69':
          displayName = 'Pro Live Scores - 1 Year Subscription';
          expirationDateBackUp = oneYearBackUp
          break;
        case 'pro_monthly_team_android:monthly-sub-team-2999':
          displayName = 'Pro Live Scores - Monthly Subscription';
          expirationDateBackUp = formattedNextMonth
          break;
        case 'pro_season_team_android:season-sub-team-13999':
          displayName = 'Pro Live Scores - 6 Month Subscription';
          expirationDateBackUp = formattedSixMonths
          break;
        case 'pro_yearly_player:yearly-sub-7-99':
          displayName = 'Pro Live Scores & Stats - 1 Year Subscription';
          expirationDateBackUp = oneYearBackUp
          break;
        case 'pro_monthly_player_android:month-sub-player-499':
          displayName = 'Pro Live Scores & Stats - Monthly Subscription';
          expirationDateBackUp = formattedNextMonth
          break;
        case 'pro_season_player_android:season-sub-player-2499':
          displayName = 'Pro Live Scores & Stats - 6 Month Subscription';
          expirationDateBackUp = formattedSixMonths
          break;
        case 'pro_forever_indiv_android':
          displayName = 'Pro Manager/Coach - Forever Bundle';
          break;
        case 'pro_forever_team_android':
          displayName = 'Pro Live Scores - Forever Bundle';
          break;
        case 'pro_forever_player_android':
          displayName = 'Pro - Forever Bundle';
          break;
        default:
          displayName = 'Upgraded to pro';
          expirationDate = null;
          console.warn(`⚠️ Unknown productIdentification: ${productIdentification}`);
          break;
      }

      let finalExpirationDateString = '';

      const subscriptionKeys = [
        // Yearly
        'pro_yearly_team',
        'pro_yearly_indiv',
        'pro_yearly_player',
        'pro_yearly_indiv_android:yearly-sub-799',
        'pro_yearly_team_android:yearly-sub-69',
        'pro_yearly_player:yearly-sub-7-99',

        // Monthly
        'pro_monthly_team',
        'pro_monthly_indv',
        'pro_monthly_player',
        'pro_monthly_indiv_android:month-sub-499',
        'pro_monthly_team_android:monthly-sub-team-2999',
        'pro_monthly_player_android:month-sub-player-499',

        // Season
        'pro_season_team',
        'pro_season_indv',
        'pro_season_player',
        'pro_season_indiv_android:season-sub-2499',
        'pro_season_team_android:season-sub-team-13999',
        'pro_season_player_android:season-sub-player-2499',
      ];

      // expirationDate is a timestamp in ms
      console.log('expirationDate check 1 ' + expirationDate);
      if (expirationDate === null || expirationDate === undefined) {
        console.log('expirationDate check 2 ' + expirationDate);
        if (subscriptionKeys.includes(productIdentification)) {
          finalExpirationDateString = expirationDateBackUp;
        } else {
          finalExpirationDateString = 'No Expiry';
        }
      } else {
        // Keep expirationDateObj for calculations, format only for display
        console.log('expirationDate check 3 ' + expirationDate);
        const expirationDateObj = new Date(expirationDate);
        finalExpirationDateString = expirationDateObj.toLocaleDateString('en-GB', options);
      }
      console.log('finalExpirationDateString check 1 ' + finalExpirationDateString);
      console.log('expirationDate check 4 ' + expirationDate);

      // Log display info
      console.log(`Display Name: ${displayName}`);
      console.log(`Expiration Date: ${finalExpirationDateString}`);

      // Use expirationDateObj directly for calculations, don't parse string again
      let trialStatus = '';
      let adjustedExpiryStr = '';

      if (expirationDate && purchasedProd) {
        const now = new Date();
        const rawExpiry = new Date(expirationDate);
        const timeDiffDays = Math.ceil((rawExpiry - now) / (1000 * 60 * 60 * 24));

        const adjustedExpiry = new Date(rawExpiry);
        let thresholdDays = 0;

        if (productIdentification?.includes('yearly')) {
          thresholdDays = 14;
          adjustedExpiry.setFullYear(adjustedExpiry.getFullYear() + 1);
        } else if (productIdentification?.includes('season')) {
          thresholdDays = 7;
          adjustedExpiry.setMonth(adjustedExpiry.getMonth() + 6);
        }

        if (thresholdDays > 0 && timeDiffDays < thresholdDays) {
          // Expiry is soon → show both trial expiry and full expiry
          trialStatus = `Trial expires on ${rawExpiry.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}`;

          adjustedExpiryStr = `Your full expiry is ${adjustedExpiry.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}`;
        }
      }



      const expirationDateObj = new Date(1759999932000);
      console.log('Raw expirationDateObj:', expirationDateObj.toString());
      console.log('Formatted date:', expirationDateObj.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      }));

      return (
        <VStack>
          <Text style={{ fontWeight: '400', color: '#fff' }}>
            You've successfully upgraded to:
          </Text>
          <Text style={{ fontWeight: '600', color: '#fff' }}>{displayName}.</Text>

          <View style={{ paddingTop: 5 }}>
            <Text style={{ fontWeight: '400', color: '#fff' }}>Your Expiry Date:</Text>

            {/* If trialStatus exists, show both trial and adjusted expiry */}
            {trialStatus ? (
              <>
                <Text style={{ fontWeight: '600', color: '#fff' }}>{trialStatus}</Text>
                <Text style={{ fontWeight: '600', color: '#fff', marginTop: 4 }}>
                  {adjustedExpiryStr}
                </Text>
              </>
            ) : (
              // Otherwise, show only the regular expiry date
              <Text style={{ fontWeight: '600', color: '#fff' }}>{finalExpirationDateString}</Text>
            )}
          </View>
        </VStack>
      );


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
                                      {getProductConfirmation()}
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

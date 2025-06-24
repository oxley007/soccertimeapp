import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, ActivityIndicator } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SoccerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const barChart = <Icon name="bar-chart" size={26} color="#E879F9" />;
const history = <Icon name="history" size={26} color="#E879F9" />;
const plusCircle = <IconAnt name="pluscircleo" size={50} color="#fff" />;
const plus = <IconAnt name="plus" size={30} color="#E879F9" />;
const users = <Icon name="users" size={20} color="#E879F9" />;
const chevronRight = <Icon name="chevron-right" size={20} color="#999" />;
const chevronRightWhite = <Icon name="chevron-right" size={20} color="#fff" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;
const arrowdowncircle = <FeatherIcon name="arrow-down-circle" size={26} color="#fff" />;
const feildIcon = <SoccerIcon name="soccer" size={40} color="#E879F9" />;
const runningIcon = <Fa5Icon name="running" size={40} color="#E879F9" />;
const clipboardClockIcon = <SoccerIcon name="clipboard-clock" size={30} color="#E879F9" />;
const unlockAlt = <Icon name="unlock-alt" size={30} color="#E879F9" />;
const exitToAppIcon = <SoccerIcon name="exit-to-app" size={30} color="#E879F9" />;
const saveTick = <SoccerIcon name="clipboard-check" style={{borderRadius: 50}} size={26} color="#34d399" />;

import { getGamesData } from '../../Util/getGamesData.js';

import * as Animatable from 'react-native-animatable';

import Purchases from 'react-native-purchases';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateSeasons } from '../../Reducers/seasons';
import { updateIap } from '../../Reducers/iap';
import { updateUserProfile } from '../../Reducers/userProfile';
import { updateCheckSort } from '../../Reducers/checkSort';
import { updateCheckSortIap } from '../../Reducers/checkSortIap';
import { updateFromContinueGame } from '../../Reducers/fromContinueGame';

const Home = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [posts, setPosts] = useState();
  const [animateLoading, setAnimateLoading] = useState(false);
  const [getHideCircle, setHideCircle] = useState(true);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let seasons = useSelector(state => state.seasons.seasons);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  const eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);
  let userRef = firestore().collection(currentUser.uid);
  try {
    if (userProfile === 4) {
      //console.log('profile 4 is hit!');
      //console.log(parentCoachView + ' parentCoachView ID is?');
      userRef = firestore().collection(parentCoachView);
    }
    else {
      userRef = firestore().collection(currentUser.uid);
    }
  }
  catch {
    //do nothing.
  }
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;

  let updateHome = ''

  try {
    updateHome = props.route.params.updateHome
  }
  catch {
    //nothing.
  }


  let newSignIn = false

  try {
    newSignIn = props.route.params.newSignIn
  }
  catch {
    //nothing.
  }

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

      let userRefId = null
        try {
          if (userProfile === 4) {
            //console.log('profile 4 is hit!');
            //console.log(parentCoachView + ' parentCoachView ID is?');
            userRefId = parentCoachView
          }
          else {
            userRefId = currentUser.uid
          }
        }
        catch {
          //do nothing.
        }

        console.log('just her ewould be nice.');

    const unsubscribeGameData = getGamesData(dispatch, userProfile, parentCoachView, userRefId, eventsVersion, currentUser.uid);

    // 🧹 Cleanup function on unmount
    return () => {
      unsubscribeGameData();
    };
  }, [dispatch]);

  try {
  useEffect(() => {

      setHideCircle(false)

    },[posts.length])
  }
  catch {
    useEffect(() => {

      setTimeout(() => {
        setHideCircle(false)
      }, 4000)

      },[])
  }


    useEffect(async () => {
     //console.log(JSON.stringify(posts) + ' posts! Yea test!!');

        let _teamNamess = []
        try {
          _teamNames = [...teamNames]
        }
        catch {
          _teamNames = [{...teamNames}]
        }

        if (_teamNames === [] || _teamNames.length < 1 || _teamNames === null) {

            const teamNamesDoc = await firestore().collection(currentUser.uid).doc('teamNames').get();
            const teamNamesDocData = teamNamesDoc.data()
         //console.log(JSON.stringify(teamNamesDocData) + ' need to check teamNamesDocData');
         //console.log(JSON.stringify(teamNamesDocData.teamNames) + ' need to check teamNamesDocData.teamNames');
            dispatch(updateTeamNames(teamNamesDocData.teamNames))

        }

        let _seasons = []
        try {
          _seasons = [...seasons]
        }
        catch {
          _seasons = [{...seasons}]
        }

        if (_seasons === [] || _seasons.length < 1 || _seasons === null) {

            const seasonsDoc = await firestore().collection(currentUser.uid).doc('seasons').get();
            const seasonsDocData = seasonsDoc.data()
         //console.log(JSON.stringify(seasonsDocData) + ' need to check seasonsDocData');
         //console.log(JSON.stringify(seasonsDocData.seasons) + ' need to check seasonsDocData.seasons');
            dispatch(updateSeasons(seasonsDocData.seasons, '', 99999998))

        }

        let _pro_forever_indiv = []
        try {
          _pro_forever_indiv = [...pro_forever_indiv]
        }
        catch {
          _pro_forever_indiv = [{...pro_forever_indiv}]
        }

     //console.log(JSON.stringify(_pro_forever_indiv) + ' check _pro_forever_indiv');
     //console.log(JSON.stringify(pro_forever_indiv) + ' pro_forever_indiv before outside');
     //console.log(JSON.stringify(pro_forever_indiv[0].purchased) + ' pro_forever_indiv[0].purchased before outside');
     //pro_forever_indiv[0].purchased = false
     //dispatch(updateIap(pro_forever_indiv, iapDocData.pro_yearly_indiv, iapDocData.pro_yearly_team, iapDocData.pro_forever_team, iapDocData.pro_yearly_player, iapDocData.pro_forever_player))
        if (_pro_forever_indiv === [] || _pro_forever_indiv.length < 1 || _pro_forever_indiv === null || pro_forever_indiv[0].purchased === false) {

            const iapDoc = await firestore().collection(currentUser.uid).doc('iap').get();
            const iapDocData = iapDoc.data()
         //console.log(JSON.stringify(iapDocData) + ' need to check iapDocData');
         //console.log(JSON.stringify(iapDocData.pro_yearly_indiv) + ' need to check iapDocData.pro_yearly_indiv');
         //console.log(JSON.stringify(pro_forever_indiv) + ' pro_forever_indiv before');
            dispatch(updateIap(iapDocData.pro_forever_indiv, iapDocData.pro_yearly_indiv, iapDocData.pro_yearly_team, iapDocData.pro_forever_team, iapDocData.pro_yearly_player, iapDocData.pro_forever_player))
         //console.log(JSON.stringify(pro_forever_indiv) + ' pro_forever_indiv after');
        }

        let _userProfile = []
        try {
          _userProfile = [...userProfile]
        }
        catch {
          _userProfile = [{...userProfile}]
        }

        if (_userProfile === [] || _userProfile.length < 1 || _userProfile === null) {

            const userProfileDoc = await firestore().collection(currentUser.uid).doc('userProfile').get();
            const userProfileDocData = userProfileDoc.data()
         //console.log(JSON.stringify(userProfileDocData) + ' need to check userProfileDocData');
         //console.log(JSON.stringify(userProfileDocData.userProfile) + ' need to check userProfileDocData.userProfile');
            dispatch(updateUserProfile(userProfileDocData.userProfile))
        }

      }, []);

    useEffect(() => {

      const initPurchases = async () => {
        Purchases.setDebugLogsEnabled(true)
        //Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        if (Platform.OS === 'ios') {
          await Purchases.configure({
            apiKey: "appl_AiWRjxtNooUlINbXhTHZhTrLkWv"
          })
        } else if (Platform.OS === 'android') {
          await Purchases.configure({
            apiKey: "goog_pfrcDUZxKWnrnDzWlAkAGXYDZpG"
          })
       }
     }

      initPurchases()

  }, [])

    useEffect(() => {



      const checkSubscription = async (productIdentification) => {
        try {
          const customerInfoPurchase = await Purchases.getCustomerInfo();
       console.log('customerInfoPurchase new ' + JSON.stringify(customerInfoPurchase));

          /*
          TODO:

          get a list of Active Subscriptions from the ActiveSubscriptions array in the customerInfo JSON.

          if any subscription are active - add a year from today using:

          let epochDate = new Date(); //NOTE this would be the date from the subscriptin.
          epochDate.setFullYear(epochDate.getFullYear());
        //console.log(epochDate + ' epochDate cehcek. here. two');
          epochDate = Math.floor(new Date(epochDate).getTime() / 1000)

          then call the function below (getExpiryDateForProds()) to add the details to the store.



          IMPORTANT: add this same code to HomePlayer.js once completed.

          */

       //console.log(JSON.stringify(customerInfoPurchase.activeSubscriptions) + ' check activeSubscriptions');

          if (customerInfoPurchase.activeSubscriptions !== null) {
         //console.log('just testing.');
          }

          let expirationDate = null
          if (productIdentification === 'pro_yearly_indiv') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv
          }
          else if (productIdentification === 'pro_monthly_indv') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_indv
          }
          else if (productIdentification === 'pro_season_indv') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_indv
          }
          else if (productIdentification === 'pro_yearly_team') {
           //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
              expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team
          }
          else if (productIdentification === 'pro_monthly_team') {
           //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
              expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_team
          }
          else if (productIdentification === 'pro_season_team') {
           //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
              expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_team
          }
          else if (productIdentification === 'pro_yearly_player') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player
          }
          else if (productIdentification === 'pro_monthly_player') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_player
          }
          else if (productIdentification === 'pro_season_player') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_player
          }
          else if (productIdentification === 'pro_forever_indiv') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv + ' check specific expiry date pro_forever_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv
          }
          else if (productIdentification === 'pro_forever_team') {
           //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_team + ' check specific expiry date pro_forever_team iap page');
              expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_team
          }
          else if (productIdentification === 'pro_forever_player') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_player + ' check specific expiry date pro_forever_player iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_player
          }
          else if (productIdentification === 'pro_yearly_indiv_android:yearly-sub-799') {
         //console.log('next hit is what i want to check.');
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
          //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_android:yearly-sub-799']
          }
          else if (productIdentification === 'pro_monthly_indiv_android:month-sub-499') {
         //console.log('next hit is what i want to check.');
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
          //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_indiv_android:month-sub-499']
          }
          else if (productIdentification === 'pro_season_indiv_android:season-sub-2499') {
         //console.log('next hit is what i want to check.');
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
          //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_indiv_android:season-sub-2499']
          }
          else if (productIdentification === 'pro_yearly_team_android:yearly-sub-69') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_android:yearly-sub-69']
          }
          else if (productIdentification === 'pro_monthly_team_android:monthly-sub-team-2999') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_team_android:monthly-sub-team-2999']
          }
          else if (productIdentification === 'pro_season_team_android:season-sub-team-13999') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_team_android:season-sub-team-13999']
          }
          else if (productIdentification === 'pro_yearly_player:yearly-sub-7-99') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99']
          }
          else if (productIdentification === 'pro_monthly_player_android:month-sub-player-499') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_player_android:month-sub-player-499']
          }
          else if (productIdentification === 'pro_season_player_android:season-sub-player-2499') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_player_android:season-sub-player-2499']
          }
          else if (productIdentification === 'pro_forever_indiv_android') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv_android + ' check specific expiry date pro_forever_indiv_android iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv_android
          }
          else if (productIdentification === 'pro_forever_team_android') {
           //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_team_android + ' check specific expiry date pro_forever_team_android iap page');
              expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_team_android
          }
          else if (productIdentification === 'pro_forever_player_android') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_player_android + ' check specific expiry date pro_forever_player_android iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_player_android
          }


          if (Array.isArray(customerInfoPurchase.activeSubscriptions) && customerInfoPurchase.activeSubscriptions.length) {
         //console.log('hit if subscriptrion avail.');
            getExpiryDateForProds(productIdentification, expirationDate)
          }
          else {
            if (productIdentification === 'pro_yearly_indiv' || productIdentification === 'pro_yearly_indiv_android:yearly-sub-799' || productIdentification === 'pro_monthly_indv' || productIdentification === 'pro_monthly_indiv_android:month-sub-499' || productIdentification === 'pro_season_indv' || productIdentification === 'pro_season_indiv_android:season-sub-2499') {
           //console.log('am i hitting into here, ya?');
              pro_yearly_indiv[0].purchased = false
              pro_yearly_indiv[0].expiryDate = null
              pro_yearly_indiv[0].identifier = productIdentification
            }
            else if (productIdentification === 'pro_yearly_team' || productIdentification === 'pro_yearly_team_android:yearly-sub-69' || productIdentification === 'pro_monthly_team' || productIdentification === 'pro_monthly_team_android:monthly-sub-team-2999' || productIdentification === 'pro_season_team' || productIdentification === 'pro_season_team_android:season-sub-team-13999') {
                pro_yearly_team[0].purchased = false
                pro_yearly_team[0].expiryDate = null
                pro_yearly_team[0].identifier = productIdentification
            }
            else if (productIdentification === 'pro_yearly_player' || productIdentification === 'pro_yearly_player:yearly-sub-7-99' || productIdentification === 'pro_monthly_player' || productIdentification === 'pro_monthly_player_android:month-sub-player-499' || productIdentification === 'pro_season_player' || productIdentification === 'pro_season_player_android:season-sub-player-2499') {
              pro_yearly_player[0].purchased = false
              pro_yearly_player[0].expiryDate = null
              pro_yearly_player[0].identifier = productIdentification
            }

            dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
         //console.log(JSON.stringify(pro_yearly_indiv) + ' now check here for pro_yearly_indiv ok.');
            userRef.doc('iap').update({
                pro_forever_indiv: pro_forever_indiv,
                pro_yearly_indiv: pro_yearly_indiv,
                pro_yearly_team: pro_yearly_team,
                pro_forever_team: pro_forever_team,
                pro_yearly_player: pro_yearly_player,
                pro_forever_player: pro_forever_player
              })
              .catch(error => this.setState({ errorMessage: error.message }))

            //Map through teamName array to add subscription to each team in account:
            try {
            teamNames.map(team => {
              if (team.teamType === 0) {
              const teamIdCodeGames = team.teamId
            firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
               pro_forever_indiv: pro_forever_indiv,
               pro_yearly_indiv: pro_yearly_indiv,
               pro_yearly_team: pro_yearly_team,
               pro_forever_team: pro_forever_team,
               pro_yearly_player: pro_yearly_player,
               pro_forever_player: pro_forever_player,
             })
           }
           })
          }
          catch {
         //console.log('hit my catch teamanems pro_forever_player');
            // do nothing.
          }

          }

          // access latest customerInfo
        } catch (e) {
       //console.log(e + ' error on sub check.');
         // Error fetch
       }



      }

      let epochDate = new Date();
      epochDate.setFullYear(epochDate.getFullYear());
   //console.log(epochDate + ' epochDate cehcek. here. two');
      epochDate = Math.floor(new Date(epochDate).getTime() / 1000)


   //console.log(pro_yearly_indiv[0].expiryDate + ' pro_yearly_indiv[0].expiryDate on home is?');
   //console.log(pro_yearly_indiv[0].purchased + ' pro_yearly_indiv[0].purchased on home is?');
   //console.log(pro_yearly_team[0].expiryDate + ' pro_yearly_team[0].expiryDate on home is?');
   //console.log(pro_yearly_team[0].purchased + ' pro_yearly_team[0].purchased on home is?');

      let convertedDate = null

      if (pro_yearly_indiv[0].expiryDate !== null) {
        const convertedDateTemp = new Date(pro_yearly_indiv[0].expiryDate);
        convertedDate = Math.floor(new Date(convertedDateTemp).getTime() / 1000)
      }
      else if (pro_yearly_team[0].expiryDate !== null) {
        const convertedDateTemp = new Date(pro_yearly_team[0].expiryDate);
        convertedDate = Math.floor(new Date(convertedDateTemp).getTime() / 1000)
      }
      else if (pro_yearly_player[0].expiryDate !== null) {
        const convertedDateTemp = new Date(pro_yearly_player[0].expiryDate);
        convertedDate = Math.floor(new Date(convertedDateTemp).getTime() / 1000)
      }


   console.log(convertedDate + ' convertedDate on home is???');
   console.log(epochDate + ' epochDate on home is?');


    if ((convertedDate < epochDate && pro_yearly_indiv[0].expiryDate !== null) || (isNaN(convertedDate) && pro_yearly_indiv[0].expiryDate !== null)) {
     //console.log('pro_yearly_indiv[0].expiryDate hit');
     if (Platform.OS !== 'ios') {
       try {
         checkSubscription(pro_yearly_indiv[0].identifier)
       }
       catch {
          //handle old subscriptions
          checkSubscription('pro_yearly_indiv_android:yearly-sub-799')
       }
     }
     else {
       try {
         checkSubscription(pro_yearly_indiv[0].identifier)
       }
       catch {
          //handle old subscriptions
          checkSubscription('pro_yearly_indiv')
       }
     }
        //pro_yearly_indiv[0].purchased = false
        //pro_yearly_indiv[0].expiryDate = null
      }
      else if ((convertedDate < epochDate && pro_yearly_team[0].expiryDate !== null) || (isNaN(convertedDate) && pro_yearly_team[0].expiryDate !== null)) {
        if (Platform.OS !== 'ios') {
          try {
            checkSubscription(pro_yearly_team[0].identifier)
          }
          catch {
             //handle old subscriptions
             checkSubscription('pro_yearly_team_android:yearly-sub-69')
          }
        }
        else {
          try {
            checkSubscription(pro_yearly_team[0].identifier)
          }
          catch {
             //handle old subscriptions
             checkSubscription('pro_yearly_team')
          }
        }
     //console.log('pro_yearly_team[0].expiryDate hit');
        //pro_yearly_team[0].purchased = false
        //pro_yearly_team[0].expiryDate = null
      }
      else if ((convertedDate < epochDate && pro_yearly_player[0].expiryDate !== null) || (isNaN(convertedDate) && pro_yearly_player[0].expiryDate !== null)) {
        if (Platform.OS !== 'ios') {
          try {
            checkSubscription(pro_yearly_player[0].identifier)
          }
          catch {
             //handle old subscriptions
             checkSubscription('pro_yearly_player:yearly-sub-7-99')
          }
        }
        else {
          try {
            checkSubscription(pro_yearly_player[0].identifier)
          }
          catch {
             //handle old subscriptions
             checkSubscription('pro_yearly_player')
          }
        }
     //console.log('pro_yearly_player[0].expiryDate hit');
        //pro_yearly_player[0].purchased = false
        //pro_yearly_player[0].expiryDate = null
      }

    }, [])


    useEffect(() => {
       //const teams = teams.current;
    //console.log("I have been mounted")

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

      let gameData = []
      let gameDataReverse = []

      if (_games === [] || _games.length < 1 || _games === null) {
        const db = firestore();
        db.collection(currentUser.uid).onSnapshot((snapshot) => {
          const postData = [];
          try {
          snapshot.forEach((doc) => postData.push({ ...doc.data() }));
          }
          catch {
            // do nothing.
          }
       //console.log(JSON.stringify(postData) + ' postData 2');  // <------
          setPosts(postData);
       //console.log('getting here aye?');


     //console.log('getting here foirt>?');
      //console.log(JSON.stringify(posts) + ' posts getting here?');


        postData.map(game => {

       //console.log(JSON.stringify(game) + ' what do we have in here?');

          try {
       //console.log(game.game.isGame + ' guess this doesnt work');
          }
          catch {
            //do nothing.
          }
        //console.log(game[0].game.isGame + ' [0] guess this doesnt work');

          try {
            if (game.game.isGame === true) {

           //console.log(game.game.id + ' game id t4esting only');
              gameData.push(game.game)

            }
          }
          catch {
            //do nothing.
          }

        })

        /*
        try {
          if (games[0].length > 0 ) {
            //do nothing.
          }
          else {
         //console.log(JSON.stringify(gameData) + ' gameData! Yea!');
            var gameDataReverse = gameData.reverse();
         //console.log(JSON.stringify(gameDataReverse) + ' gameDataReverse! Yea!');
            dispatch(updateGames(gameDataReverse))
          }
        }
        catch {
       //console.log('caught!');
       //console.log(JSON.stringify(gameData) + ' gameData! Yea! caught!');
          var gameDataReverse = gameData.reverse();
       //console.log(JSON.stringify(gameDataReverse) + ' gameDataReverse! Yea! caught!');
          dispatch(updateGames(gameDataReverse))
        }
        */


        });

     //console.log(JSON.stringify(gameData) + ' gameData! Yea!');
     const gameDataIdOrder = gameData.sort((a, b) => a.id - b.id);
       gameDataReverse = gameDataIdOrder.reverse();
        //var gameDataReverse = gameData.reverse();
     //console.log(JSON.stringify(gameDataReverse) + ' gameDataReverse! Yea!');
        try {

            setHalfTimeFlag(gameDataReverse[0].halfTime)
        }
        catch {
          try {
              setHalfTimeFlag(_games[0].halfTime)
          }
          catch {
            //do nothing.
          }
          //do nothing.
        }

        if (newSignIn === true) {
          setHalfTimeFlag(5)
        }

        dispatch(updateGames(gameDataReverse))
    }

  }, []);

  useEffect(() => {

    let _teamPlayers = []
    try {
      _teamPlayers = [...teamPlayers]
    }
    catch {
      _teamPlayers = [{...teamPlayers}]
    }

    if (_teamPlayers === [] || _teamPlayers.length < 1 || _teamPlayers === null) {
      const db = firestore();
      db.collection(currentUser.uid).onSnapshot((snapshot) => {
        const postData = [];
        try {
        snapshot.forEach((doc) => postData.push({ ...doc.data() }));
        }
        catch {
          //do nthing.
        }
     //console.log(JSON.stringify(postData) + ' postData 2');  // <------
        setPosts(postData);
     //console.log('getting here aye?');


   //console.log('getting here foirt>?');
    //console.log(JSON.stringify(posts) + ' posts getting here?');

      let playerData = []
      postData.map(player => {

     //console.log(JSON.stringify(player) + ' what do we have in here?');

        try {
     //console.log(player.isPlayer + ' guess isPlayer this doesnt work');
        }
        catch {
          //do nothing.
        }
      //console.log(game[0].game.isGame + ' [0] guess this doesnt work');

        try {
          if (player.isPlayer === true) {

         //console.log(player.id + ' game id t4esting only');
            playerData.push(player)

          }
        }
        catch {
          //do nothing.
        }

      })

   //console.log(JSON.stringify(playerData) + ' playerData! Yea!');
      dispatch(updateTeamPlayers(playerData))


      });
  }

}, []);



  /*
    useEffect(async () => {
      //const gotoTeam = async (player) => {

      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

       if (_games === [] || _games.length < 1 || _games === null) {
         //const userRefData = userRef.data()
       //console.log(JSON.stringify(userRefData) + ' userRefData what do i get?');

         //const teamDocSeasons = await userRef.doc('seasons').get();
         //const playerDocData = playerDoc.data()

         //const snapshot = await firestore().collection(currentUser.uid).get()
         const dataColl = getData()
      //console.log(JSON.stringify(dataColl) + ' dataColl what do i get?');
      //console.log(dataColl.userData + ' dataColl what do i get?');

       }
    }, [])

    /*
    const getData = async () => {
      const snapshot = await firebase.firestore().collection(currentUser.uid).get()
      return snapshot.docs.map(doc => doc.data());
    }


    const getData = async () => {
   //console.log('getData hit?/');
   //console.log(currentUser.uid + ' what is currentUser.uid?');
  const events = await firebase.firestore().collection(currentUser.uid)
  events.get().then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
   //console.log(tempDoc + ' tempDoc here')
   })
 }
 */


    useEffect(() => {

      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      let halftimeFlag = 0
    //console.log(_games[0].halfTime + ' halftimeFlag = _games[0].halfTime is?');
      try {
      halftimeFlag = _games[0].halfTime
      }
      catch {
        halftimeFlag = 0
      }
      setHalfTimeFlag(halftimeFlag)

    },[updateHome])

    useEffect(() => {

      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      let halftimeFlag = 0
      try {
      halftimeFlag = _games[0].halfTime
      }
      catch {
        halftimeFlag = 0
      }
      setHalfTimeFlag(halftimeFlag)

    },[])

    const getExpiryDateForProds = (storeProductId, latestExpirationDateMillis) => {

   //console.log(JSON.stringify(storeProductId) + ' output prod.');
      let epochDate = null
      let productNameTitle = ''
      //if (storeProductId === 'pro_yearly_indiv' || storeProductId === 'pro_yearly_indiv_android:yearly-sub-799') {
      if (storeProductId === 'pro_yearly_indiv' || storeProductId === 'pro_yearly_indiv_android:yearly-sub-799' || storeProductId === 'pro_monthly_indv' || storeProductId === 'pro_monthly_indiv_android:month-sub-499' || storeProductId === 'pro_season_indv' || storeProductId === 'pro_season_indiv_android:season-sub-2499') {
        console.log('do i get here 3');
        pro_yearly_indiv[0].purchased = true
        /*
      //console.log(epochDate + ' epochDate cehcek. here. one');
        epochDate.setFullYear(epochDate.getFullYear() + 1);
      //console.log(epochDate + ' epochDate cehcek. here. two');
        epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
      //console.log(epochDate + ' epochDate cehcek. here. three');
        epochDate = epochDate * 1000
        */

        epochDate = latestExpirationDateMillis


        pro_yearly_indiv[0].expiryDate = latestExpirationDateMillis
        pro_yearly_indiv[0].identifier = storeProductId
        dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
        userRef.doc('iap').update({
            pro_forever_indiv: pro_forever_indiv,
            pro_yearly_indiv: pro_yearly_indiv,
            pro_yearly_team: pro_yearly_team,
            pro_forever_team: pro_forever_team,
            pro_yearly_player: pro_yearly_player,
            pro_forever_player: pro_forever_player
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //Map through teamName array to add subscription to each team in account:
        try {
        teamNames.map(team => {
          if (team.teamType === 0) {
          const teamIdCodeGames = team.teamId
        firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
           pro_forever_indiv: pro_forever_indiv,
           pro_yearly_indiv: pro_yearly_indiv,
           pro_yearly_team: pro_yearly_team,
           pro_forever_team: pro_forever_team,
           pro_yearly_player: pro_yearly_player,
           pro_forever_player: pro_forever_player,
         })
       }
       })
      }
      catch {
     //console.log('hit my catch teamanems pro_forever_player');
        // do nothing.
      }
        productNameTitle = 'Pro Manager/Coach - Year Subscription'
      }
      //else if (storeProductId === 'pro_yearly_team' || storeProductId === 'pro_yearly_team_android:yearly-sub-69') {
      else if (storeProductId === 'pro_yearly_team' || storeProductId === 'pro_yearly_team_android:yearly-sub-69' || storeProductId === 'pro_monthly_team' || storeProductId === 'pro_monthly_team_android:monthly-sub-team-2999' || storeProductId === 'pro_season_team' || storeProductId === 'pro_season_team_android:season-sub-team-13999') {
        console.log('do i get here 4');
        pro_yearly_team[0].purchased = true

        /*
      //console.log(epochDate + ' epochDate cehcek. here. one');
        epochDate.setFullYear(epochDate.getFullYear() + 1);
      //console.log(epochDate + ' epochDate cehcek. here. two');
        epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
      //console.log(epochDate + ' epochDate cehcek. here. three');
        epochDate = epochDate * 1000
        */

        epochDate = latestExpirationDateMillis
        pro_yearly_team[0].expiryDate = latestExpirationDateMillis
        pro_yearly_team[0].identifier = storeProductId
        dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
        userRef.doc('iap').update({
            pro_forever_indiv: pro_forever_indiv,
            pro_yearly_indiv: pro_yearly_indiv,
            pro_yearly_team: pro_yearly_team,
            pro_forever_team: pro_forever_team,
            pro_yearly_player: pro_yearly_player,
            pro_forever_player: pro_forever_player
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //Map through teamName array to add subscription to each team in account:
        try {
        teamNames.map(team => {
          if (team.teamType === 0) {
          const teamIdCodeGames = team.teamId
        firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
           pro_forever_indiv: pro_forever_indiv,
           pro_yearly_indiv: pro_yearly_indiv,
           pro_yearly_team: pro_yearly_team,
           pro_forever_team: pro_forever_team,
           pro_yearly_player: pro_yearly_player,
           pro_forever_player: pro_forever_player,
         })
       }
       })
      }
      catch {
     //console.log('hit my catch teamanems pro_forever_player');
        // do nothing.
      }
        productNameTitle = 'Pro Live Scores - Year Subscription'
      }
      //else if (storeProductId === 'pro_yearly_player' || storeProductId === 'pro_yearly_player:yearly-sub-7-99') {
      else if (storeProductId === 'pro_yearly_player' || storeProductId === 'pro_yearly_player:yearly-sub-7-99' || storeProductId === 'pro_monthly_player' || storeProductId === 'pro_monthly_player_android:month-sub-player-499' || storeProductId === 'pro_season_player' || storeProductId === 'pro_season_player_android:season-sub-player-2499') {
        console.log('do i get here 5');
        pro_yearly_player[0].purchased = true
        /*
      //console.log(epochDate + ' epochDate cehcek. here. one');
        epochDate.setFullYear(epochDate.getFullYear() + 1);
      //console.log(epochDate + ' epochDate cehcek. here. two');
        epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
      //console.log(epochDate + ' epochDate cehcek. here. three');
        epochDate = epochDate * 1000
        */
        epochDate = latestExpirationDateMillis

        pro_yearly_player[0].expiryDate = latestExpirationDateMillis
        pro_yearly_player[0].identifier = storeProductId
        dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
        userRef.doc('iap').update({
            pro_forever_indiv: pro_forever_indiv,
            pro_yearly_indiv: pro_yearly_indiv,
            pro_yearly_team: pro_yearly_team,
            pro_forever_team: pro_forever_team,
            pro_yearly_player: pro_yearly_player,
            pro_forever_player: pro_forever_player
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //Map through teamName array to add subscription to each team in account:
        try {
        teamNames.map(team => {
          if (team.teamType === 0) {
          const teamIdCodeGames = team.teamId
        firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
           pro_forever_indiv: pro_forever_indiv,
           pro_yearly_indiv: pro_yearly_indiv,
           pro_yearly_team: pro_yearly_team,
           pro_forever_team: pro_forever_team,
           pro_yearly_player: pro_yearly_player,
           pro_forever_player: pro_forever_player,
         })
       }
       })
      }
      catch {
     //console.log('hit my catch teamanems pro_forever_player');
        // do nothing.
      }
        productNameTitle = 'Pro - Year Subscription'
      }
      else if (storeProductId === 'pro_forever_indiv' || storeProductId === 'pro_forever_indiv_android') {
        console.log('do i get here 6');
        pro_forever_indiv[0].purchased = true
        epochDate = null
        pro_forever_indiv[0].identifier = storeProductId
        dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
        userRef.doc('iap').update({
            pro_forever_indiv: pro_forever_indiv,
            pro_yearly_indiv: pro_yearly_indiv,
            pro_yearly_team: pro_yearly_team,
            pro_forever_team: pro_forever_team,
            pro_yearly_player: pro_yearly_player,
            pro_forever_player: pro_forever_player
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //Map through teamName array to add subscription to each team in account:
        try {
        teamNames.map(team => {
          if (team.teamType === 0) {
          const teamIdCodeGames = team.teamId
        firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
           pro_forever_indiv: pro_forever_indiv,
           pro_yearly_indiv: pro_yearly_indiv,
           pro_yearly_team: pro_yearly_team,
           pro_forever_team: pro_forever_team,
           pro_yearly_player: pro_yearly_player,
           pro_forever_player: pro_forever_player,
         })
       }
       })
      }
      catch {
     //console.log('hit my catch teamanems pro_forever_player');
        // do nothing.
      }
        productNameTitle = 'Pro Manager/Coach - Forever Bundle'
      }
      else if (storeProductId === 'pro_forever_team' || storeProductId === 'pro_forever_team_android') {
        pro_forever_team[0].purchased = true
        epochDate = null
        pro_forever_team[0].identifier = storeProductId
        dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
        userRef.doc('iap').update({
            pro_forever_indiv: pro_forever_indiv,
            pro_yearly_indiv: pro_yearly_indiv,
            pro_yearly_team: pro_yearly_team,
            pro_forever_team: pro_forever_team,
            pro_yearly_player: pro_yearly_player,
            pro_forever_player: pro_forever_player
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //Map through teamName array to add subscription to each team in account:
        try {
        teamNames.map(team => {
          if (team.teamType === 0) {
          const teamIdCodeGames = team.teamId
        firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
           pro_forever_indiv: pro_forever_indiv,
           pro_yearly_indiv: pro_yearly_indiv,
           pro_yearly_team: pro_yearly_team,
           pro_forever_team: pro_forever_team,
           pro_yearly_player: pro_yearly_player,
           pro_forever_player: pro_forever_player,
         })
       }
       })
      }
      catch {
     //console.log('hit my catch teamanems pro_forever_player');
        // do nothing.
      }
        productNameTitle = 'Pro Live Scores - Forever Bundle'
      }
      else if (storeProductId === 'pro_forever_player' || storeProductId === 'pro_forever_player_android') {
        pro_forever_player[0].purchased = true
        epochDate = null
        pro_forever_player[0].identifier = storeProductId
        dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
        userRef.doc('iap').update({
            pro_forever_indiv: pro_forever_indiv,
            pro_yearly_indiv: pro_yearly_indiv,
            pro_yearly_team: pro_yearly_team,
            pro_forever_team: pro_forever_team,
            pro_yearly_player: pro_yearly_player,
            pro_forever_player: pro_forever_player
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //Map through teamName array to add subscription to each team in account:
        try {
        teamNames.map(team => {
          if (team.teamType === 0) {
          const teamIdCodeGames = team.teamId
        firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
           pro_forever_indiv: pro_forever_indiv,
           pro_yearly_indiv: pro_yearly_indiv,
           pro_yearly_team: pro_yearly_team,
           pro_forever_team: pro_forever_team,
           pro_yearly_player: pro_yearly_player,
           pro_forever_player: pro_forever_player,
         })
       }
       })
      }
      catch {
     //console.log('hit my catch teamanems pro_forever_player');
        // do nothing.
      }
        productNameTitle = 'Pro - Forever Bundle'
      }

      return [epochDate, productNameTitle]

    }

    const onCollectionUpdate = (querySnapshot) => {


      let teams = [];

      try {
      querySnapshot.forEach((doc) => {
      //console.log(doc.data());
        const { playerId } = doc.data();

        teams.push({
          key: doc.id,
          //doc, // DocumentSnapshot
          playerId
        });
      })
      }
      catch {
        //do nothing.
      }

    //console.log(teams + ' Live Games Test new.');
    //console.log(teams[0].playerId + ' Live Games Test.');

      //return teams

      if (teams !== getTeam) {
        setGetTeam(teams, JSON.stringify(getTeam));
      //console.log(JSON.stringify(getTeam) + ' Live getTeam Test new.');
      }
      //setGetTeam(teams);




    }

    const startNewGameNew = async (fromWhere, buttonOption) => {

      console.log('hit 1 new setup');

      //const gameSetupTimePlusFithteen = games[0].gameDateStamp + 1000
      let gameSetupTimePlusFithteen = Math.floor(Date.now() / 1000)
      try {
        gameSetupTimePlusFithteen = games[0].gameDateStamp + 1000
      }
      catch {
        gameSetupTimePlusFithteen + gameSetupTimePlusFithteen + 1000
      }
    const dateStampNow = Math.floor(Date.now() / 1000)

    let gameSetupLessThanFithteenMin = false
    //console.log(gameSetupTimePlusFithteen + ' gameSetupTimePlusFithteen is?');
    if (gameSetupTimePlusFithteen < dateStampNow ) {
      gameSetupLessThanFithteenMin = false
    }
    else {
      gameSetupLessThanFithteenMin = true
    }

    console.log(gameSetupLessThanFithteenMin + ' gameSetupLessThanFithteenMin');

    //console.log('testing games[0] here '  + JSON.stringify(games[0]));

    //console.log(games[0].gameComplete + ' games[0].gameComplete is check.');

    let tempGameComplete = true
    try {
        tempGameComplete = games[0].gameComplete
    }
    catch {
      tempGameComplete = true
    }

    let playerOnField = 0
    try {
      games[0].teamPlayers.map(player => {

        if (player.positionDetails.column > 1 && player.positionDetails.row < 4) {
          playerOnField = playerOnField + 1
        }
        else {
          playerOnField = playerOnField
        }

      })
    }
    catch {
      playerOnField = 0
    }

    if ((fromWhere === 0 && tempGameComplete === false && games[0].gameSetup === false) || (fromWhere === 0 && tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === true)) {
      if (games[0].gameSetupProfile === currentUser.uid) {
        Alert.alert("You must complete/cancel the current game to add new team/players. To cancel a game, close this box then click 'Continue Game' > 'Game Options' > 'Finish Game'" )
      }
      else if (profile === 1) {
        Alert.alert("The assistant/parent must complete/cancel the current game to allow you add new team/players. For your assistant/parent to cancel/exit a game they go to 'Continue Game' > 'Game Options' > 'Finish Game'" )
      }
      else if (profile === 4) {
        Alert.alert("The coach must complete/cancel the current game to allow you add new team/players. For your coach to cancel/exit a game they go to 'Continue Game' > 'Game Options' > 'Finish Game'" )
      }
    }
    else {
        if (getHideCircle === true) {
          //go nowhere.
        }
        else if ((tempGameComplete === true) || (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === false) ||  (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === true && games[0].gameSetupProfile === currentUser.uid)) {
          console.log('hittin in here check now om');
          if (userProfile === 4) {
            Alert.alert("Only the coach can set up a new game for sub management. If you're waiting to assist with subs, please kindly remind the coach to start the sub setup." )
          }
          else {
            if (fromWhere === 3) {
              dispatch(updateFromContinueGame(0))
              startNewGameGo(fromWhere)
            }
            else {
              Alert.alert("Hold on! You need to set up your team lineup and subs in step 1 before you can start managing them during the live game. Please complete your setup to unlock live subs management." )
            }
          }
        }
        else if (tempGameComplete === false && games[0].gameSetup === false && playerOnField > 0  && games[0].halfTime === 0) {
          //console.log('getallGames check long! ' + JSON.stringify(getAllGames));
          //dispatch(updateGames(getAllGames))
          if (userProfile === 4) {
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
            }

            if (fromWhere === 3) {
              dispatch(updateFromContinueGame(0))
              navigate('SeasonPositionSortAllHome', {
                fromContinue: 0,
                gameIdDb: games[0].gameIdDb,

              });
            }
            else {
              dispatch(updateFromContinueGame(1))
              dispatch(updateStopwatch(
                games[0].sixtySecondsMark,
                [],
                null,
                null,
                [],
                games[0].sixtySecondsMark,
                false,
                false,
              ))
              navigate('SeasonPositionSortAllHome', {
                fromContinue: 1,
                gameIdDb: games[0].gameIdDb,

              });
            }
        }
        else if (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === true && games[0].gameSetupProfile !== currentUser.uid) {
          if (userProfile === 1) {
            Alert.alert("Please wait while your assistant/parent is setting up subs management. If no activity in 15min, the setup will be deleted and you can then start the process of setting up subs management yourself." )
        }
        else {
          Alert.alert("Please wait while your coach is setting up subs management. If no activity in 15min, the setup will be deleted and you can then start the process of setting up subs management yourself. " )
          }
        }
        else if (tempGameComplete === false && games[0].gameSetup === false && games[0].gameSetupProfile !== currentUser.uid) {
          dispatch(updateFromContinueGame(1))
          dispatch(updateStopwatch(
            games[0].sixtySecondsMark,
            [],
            null,
            null,
            [],
            games[0].sixtySecondsMark,
            false,
            false,
          ))
          navigate('SeasonPositionSortAllHome', {
            fromContinue: 1,
            gameIdDb: games[0].gameIdDb,
          });
        }
        else if (tempGameComplete === false && games[0].gameSetup === false && games[0].gameSetupProfile === currentUser.uid) {
          console.log('am i hit here i think?');
          if (buttonOption === 3) {
            Alert.alert("Looks like there's a live game still in progress, so you can't set up your lineup and subs just yet. Tap 'Continue Subs Management' to keep going with the current game or finish it so you can start fresh with a new setup." )
          }
          else {
            dispatch(updateFromContinueGame(1))
            dispatch(updateStopwatch(
              games[0].sixtySecondsMark,
              [],
              null,
              null,
              [],
              games[0].sixtySecondsMark,
              false,
              false,
            ))
            navigate('SeasonPositionSortAllHome', {
              fromContinue: 1,
              gameIdDb: games[0].gameIdDb,
            });
          }
        }
        else {
          if (userProfile === 4) {
            Alert.alert("Only the coach can set up a new game for sub management. If you're waiting to assist with subs, please kindly remind the coach to start the sub setup." )
          }
          else {
            if (fromWhere === 3) {
              dispatch(updateFromContinueGame(0))
              startNewGameGo(fromWhere)
            }
            else {
              Alert.alert("Hold on! You need to set up your team lineup and subs in step 1 before you can start managing them during the live game. Please complete your setup to unlock live subs management." )
            }
          }
        }

    }

    }

  const startNewGameGo = (fromWhere) => {

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
    gamesLength = _games.length
    }
    catch {
      gamesLength = 0
    }

    let newDate = new Date()
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();


      let monthName = ''

    switch(month) {
      case 1:
        monthName = 'Jan'
        break;
      case 2:
        monthName = 'Feb'
        break;
      case 3:
        monthName = 'Mar'
        break;
      case 4:
        monthName = 'Apr'
        break;
      case 5:
        monthName = 'May'
        break;
      case 6:
        monthName = 'Jun'
        break;
      case 7:
        monthName = 'Jul'
        break;
      case 8:
        monthName = 'Aug'
        break;
      case 9:
        monthName = 'Sep'
        break;
      case 10:
        monthName = 'Oct'
        break;
      case 11:
        monthName = 'Nov'
        break;
      case 12:
        monthName = 'Dec'
        break;
      default:
        monthName = ''
  }

    const gameDate = date + ' ' + monthName + ' ' + year

 //console.log(gameDate + ' gameDate check');

    let userId = currentUser.uid
    userId = userId.substring(0, 5);
    const gamesLengthStr = gamesLength.toString();

    const gameIdDb = 'GM' + userId + gamesLengthStr

    const gameDateStamp = Math.floor(Date.now() / 1000)

    _games.unshift({isGame: true, gameDateStamp: gameDateStamp, gameSetup: true, season: {season: '', id: 99999999}, id: gamesLength, gameIdDb: gameIdDb, halfTime: 0, firstHalf: false, secondHalf: false, gameHalfTime: 0, score: {homeTeam: 0, awayTeam: 0}, teamNames: {homeTeamName: '', awayTeamName: '', homeTeamShortName: '', awayTeamShortName: '', homeTeamId: 99999998, awayTeamId: 99999998}, gameEvents:{}, grade: '', secondsElapsed: 0, gameDate: gameDate, gameSetupProfile: currentUser.uid, gameComplete: false, latestUpdateUid: currentUser.uid, matchFormat: 0, avgTimePerPlayer: 0, dedicatedGoalie: 0, enableAi: 0, aiSubTime: 0, playersRemainder: 0, startTimeLive: null, addGameTimeSelect: ''})

    //const testabc = []

    dispatch(updateGames(_games))

    //dispatch(updateTeamPlayers(testabc))

    //dispatch(updateTeamNames(testabc))


    userRef.doc(gameIdDb).set({
        game: _games[0],
      })
      .catch(error => this.setState({ errorMessage: error.message }))

      /*************
      READ ME
      the rason i don't add games to the team DB is that no teamm has yet been selected so
      not possible to call the team DB
      **************/

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

      dispatch(updateCheckSort(0))

      //setAnimateLoading(false)

      /*
      if (seasonsDisplayId === 99999998) {
        navigate('SelectSeasonHome', {
          teamType: 0,
          whereFrom: 'addTeamSetup',
        });
      }
      else {
      */
    //console.log(fromWhere + ' check fromWhere');
      if (fromWhere === 0) {
      //console.log(fromWhere + ' check fromWhere is 0');
        dispatch(updateFromContinueGame(0))
        navigate('AddTeamHome', {
          teamType: 0,
          addTeamOnly: 1,
        });
      }
      else {
        console.log(pro_yearly_team[0].purchased + ' pro_yearly_team[0].purchased ??');
        if ((pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true) || (userProfile === 4)) {
          dispatch(updateFromContinueGame(0))
          navigate('AddTeamHome', {
            teamType: 0,
            addTeamOnly: 0,
            gameIdDb: gameIdDb
          });
        }
        else {
          dispatch(updateFromContinueGame(0))
          dispatch(updateCheckSortIap(0))
          navigate('Iap', {
            teamType: 0,
            addTeamOnly: 0,
            gameIdDb: gameIdDb
          });
        }
      }
     //}




    }

    const addTeamPlayersText = () => {


      let gameSetupTimePlusFithteen = Math.floor(Date.now() / 1000)
      try {
        gameSetupTimePlusFithteen = games[0].gameDateStamp + 1000
      }
      catch {
        gameSetupTimePlusFithteen + gameSetupTimePlusFithteen + 1000
      }

      const dateStampNow = Math.floor(Date.now() / 1000)

      let gameSetupLessThanFithteenMin = false
      //console.log(gameSetupTimePlusFithteen + ' gameSetupTimePlusFithteen is?');
      if (gameSetupTimePlusFithteen < dateStampNow ) {
        gameSetupLessThanFithteenMin = false
      }
      else {
        gameSetupLessThanFithteenMin = true
      }

      //console.log(gameSetupLessThanFithteenMin + ' gameSetupLessThanFithteenMin');

      console.log('testing games[0] here '  + JSON.stringify(games[0]));

      let tempGameComplete = true
      try {
          tempGameComplete = games[0].gameComplete
      }
      catch {
        tempGameComplete = true
      }

      //console.log(games[0].gameComplete + ' games[0].gameComplete is check.');
      console.log('games[0] is check on text. ' + JSON.stringify(games[0]));

      let gameStatusText = ''
      let gameStatusDesc = ''

          if (getHideCircle === true) {
            gameStatusText = 'Loading Teams/Players'
            gameStatusDesc = 'Please wait while we load teams & player data...'
          }
          else if ((tempGameComplete === true) || (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === false) ||  (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === true && games[0].gameSetupProfile === currentUser.uid)) {
            if (userProfile === 4) {
              gameStatusText = 'Add Team/Players'
              gameStatusDesc = 'Create and manage your teams'
            }
            else {
              gameStatusText = 'Add Team/Players'
              gameStatusDesc = 'Create and manage your teams'
            }
          }
          else if (tempGameComplete === false && games[0].gameSetup === false) {
            if (games[0].gameSetupProfile === currentUser.uid) {
              gameStatusText = 'Game in progress!'
              gameStatusDesc = 'You are unable to edit a team while game is in progress.'
            }
            else {
              gameStatusText = 'Game in progress!'
              gameStatusDesc = 'You are unable to edit a team while game is in progress.'
            }
          }
          else if (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === true && games[0].gameSetupProfile !== currentUser.uid) {
            if (userProfile === 4) {
              gameStatusText = 'Sub Management setup in progress'
              gameStatusDesc = 'You are unable to edit a team while your caoch is setting up subs management'
            }
            else {
              gameStatusText = 'Sub Management setup in progress'
              gameStatusDesc = 'You are unable to edit a team while your assistant/parent helper is setting up subs management'
            }
          }
          else {
            if (userProfile === 4) {
              gameStatusText = 'Add Team/Players'
              gameStatusDesc = 'Create and manage your teams'
            }
            else {
              gameStatusText = 'Add Team/Players'
              gameStatusDesc = 'Create and manage your teams'
            }
          }

      return (
        <VStack pl="5">
          <HStack p="1" pl='0'>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>{gameStatusText}</Text>
          </HStack>
          <HStack p="0.5" pl='0'>
            <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>{gameStatusDesc}</Text>
          </HStack>
        </VStack>

      )
    }


    const gameStatusNew = (buttonOption) => {


      let gameSetupTimePlusFithteen = Math.floor(Date.now() / 1000)
      try {
        gameSetupTimePlusFithteen = games[0].gameDateStamp + 1000
      }
      catch {
        gameSetupTimePlusFithteen + gameSetupTimePlusFithteen + 1000
      }
      const dateStampNow = Math.floor(Date.now() / 1000)

      let gameSetupLessThanFithteenMin = false
      //console.log(gameSetupTimePlusFithteen + ' gameSetupTimePlusFithteen is?');
      if (gameSetupTimePlusFithteen < dateStampNow ) {
        gameSetupLessThanFithteenMin = false
      }
      else {
        gameSetupLessThanFithteenMin = true
      }

      //console.log(gameSetupLessThanFithteenMin + ' gameSetupLessThanFithteenMin');

      console.log('testing games[0] here '  + JSON.stringify(games[0]));

      let tempGameComplete = true
      try {
          tempGameComplete = games[0].gameComplete
      }
      catch {
        tempGameComplete = true
      }

      //console.log(games[0].gameComplete + ' games[0].gameComplete is check.');

      let gameStatusText = ''
      let gameStatusDesc = ''

      let playerOnField = 0
      try {
        games[0].teamPlayers.map(player => {

          if (player.positionDetails.column > 1 && player.positionDetails.row < 4) {
            playerOnField = playerOnField + 1
          }
          else {
            playerOnField = playerOnField
          }

        })
      }
      catch {
        playerOnField = 0
      }

          if (getHideCircle === true) {
            if (buttonOption === 3) {
              gameStatusText = 'Loading Subs Management'
              gameStatusDesc = 'Please wait while we load subs management data...'
            }
            else {
              gameStatusText = 'Loading Games'
              gameStatusDesc = 'Please wait while we load game data...'
            }

          }
          else if ((tempGameComplete === true) || (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === false) ||  (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === true && games[0].gameSetupProfile === currentUser.uid)) {
            if (userProfile === 4) {
              gameStatusText = 'Awaiting Subs Setup by Coach...'
              gameStatusDesc = 'Only the coach can set up sub management. Once setup, you’ll be able to assist with subs.'
            }
            else {
              if (buttonOption === 3) {

                gameStatusText = 'Setup Subs Management'
                gameStatusDesc = 'You can now start setting up your team lineup and subs for game day!'
              }
              else {
                gameStatusText = 'Awaiting Subs Setup...'
                gameStatusDesc = 'Set up your team lineup and subs in step 1 before you can start managing them in your live game!'
              }

            }
          }
          else if (tempGameComplete === false && games[0].gameSetup === false && playerOnField > 0 && games[0].halfTime === 0) {
            if (games[0].gameSetupProfile === currentUser.uid) {
              if (buttonOption === 3) {

                gameStatusText = 'Edit Subs Management'
                gameStatusDesc = 'You can edit your team lineup and subs for game day at anytime!'
              }
              else {
                gameStatusText = 'Start Subs Management'
                gameStatusDesc = 'Ready for kickoff? Start managing your live subs now!'
              }
            }
            else {
              gameStatusText = 'Join Subs Management'
              gameStatusDesc = 'Subs Management has been setup. Join to view and manage substitutions.'
            }
          }
          else if (tempGameComplete === false && games[0].gameSetup === true && gameSetupLessThanFithteenMin === true && games[0].gameSetupProfile !== currentUser.uid) {
            if (userProfile === 4) {
              gameStatusText = 'Setup in progress...'
              gameStatusDesc = 'Your coach is currently setting up subs management'
            }
            else {
              gameStatusText = 'Setup in progress...'
              gameStatusDesc = 'Your assistant/parent helper is currently setting up subs management'
            }
          }
          else if (tempGameComplete === false && games[0].gameSetup === false && games[0].gameSetupProfile !== currentUser.uid) {
            gameStatusText = 'Join Subs Management'
            gameStatusDesc = 'Subs Management has been setup. Join to view and manage substitutions.'
          }
          else if (tempGameComplete === false && games[0].gameSetup === false && games[0].gameSetupProfile === currentUser.uid) {
            if (buttonOption === 3) {
              gameStatusText = 'Game in Progress...'
              gameStatusDesc = 'You are unable to set up your team lineup and subs while a live game is in progress! Go to Step 3 to continue.'
            }
            else {
              gameStatusText = 'Continue Subs Management'
              gameStatusDesc = 'Continue your live game subs management!'
            }
          }
          else {
            if (userProfile === 4) {
              gameStatusText = 'Awaiting Subs Setup by Coach...'
              gameStatusDesc = 'Only the coach can set up sub management. Once setup, you’ll be able to assist with subs.'
            }
            else {
              if (buttonOption === 3) {

                gameStatusText = 'Setup Subs Management'
                gameStatusDesc = 'You can now start setting up your team lineup and subs for game day!'
              }
              else {
                gameStatusText = 'Awaiting Subs Setup...'
                gameStatusDesc = 'Set up your team lineup and subs in step 1 before you can start managing them in your live game!'
              }

            }
          }


      return (
        <VStack pl="5" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left'}}>
          <HStack p="1" pl='0'>
              <Text style={{textAlign: 'left', fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>{gameStatusText}</Text>
          </HStack>
          <HStack p="0.5" pl='0'>
              <Text style={{fontSize: 14, color: '#eee', lineHeight: 14}}>{gameStatusDesc}</Text>
          </HStack>
        </VStack>
      )

    }


   const gameStatus = () => {

     let _games = []
     try {
       _games = [...games]
     }
     catch {
       _games = [{...games}]
     }

   //console.log(JSON.stringify(_games[0].teamPlayers) + ' 0 teamplayers');
   //console.log(JSON.stringify(_games[1].teamPlayers) + ' 1 teamplayers');


     let gameSetupFlag = true
     try {
     gameSetupFlag = _games[0].gameSetup
    }
     catch {
       gameSetupFlag = true
     }


  //console.log(newSignIn + ' what si newSignIn 2');


  if (getHalfTimeFlag > 4 || tempGameComplete === true) {
    if (userProfile === 4) {
      gameStatusText = 'Subs Management'
      gameStatusDesc = 'Kick-off a new game to manage subs'
    }
    else {
      gameStatusText = 'Subs Management'
      gameStatusDesc = 'Manage Subs Yourself'
    }

  }
  else if (getHalfTimeFlag <= 4 && gameSetupFlag === false && newSignIn !== true) {
    gameStatusText = 'Continue Game'
    gameStatusDesc = 'Continue your current match'
  }
  else {
    if (userProfile === 4) {
      gameStatusText = 'Subs Management'
      gameStatusDesc = 'Kick-off a new game to manage subs'
    }
    else {
      gameStatusText = 'Subs Management'
      gameStatusDesc = 'Manage Subs Yourself'
    }
  }

     return (
       <VStack pl="5" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left'}}>
         <HStack p="1" pl='0'>
             <Text style={{textAlign: 'left', fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>{gameStatusText}</Text>
         </HStack>
         <HStack p="0.5" pl='0'>
             <Text style={{fontSize: 14, color: '#eee', lineHeight: 14}}>{gameStatusDesc}</Text>
         </HStack>
       </VStack>
     )

   }

   const playerStatsHome = () => {

     navigate('PlayerStatsHome');

   }

   const sendPlayerInviteHome = () => {

     navigate('SendPlayerInviteHome');

   }


   const previousGames = () => {

     navigate('PreviousGamesHome');

   }

   const gameChangeToComplete = () => {

     games[0].halfTime = 5
     dispatch(updateGames(games))

   }

   const youTubeVid = () => {

     let inviteCount = 0
     teamPlayers.map(player => {

       if (player.inviteStatus === 1) {
         inviteCount++
       }

     })

     if (inviteCount < 6) {
       return (
         <View style={styles.containerYouTube}>
           <YoutubePlayer
             height={210}
             videoId={'zlXg7P9Kz4Y'}
           />
         </View>
       )
     }
   }

   const viewDrills = () => {

     navigate('DrillsHome');

   }

   const proPage = () => {

     //nothing.

   }

   const proBanner = (numberOption) => {


     let playerOnField = 0
     try {
       games[0].teamPlayers.map(player => {

         if (player.positionDetails.column > 1 && player.positionDetails.row < 4) {
           playerOnField = playerOnField + 1
         }
         else {
           playerOnField = playerOnField
         }

       })
     }
     catch {
       playerOnField = 0
     }

     try {
       if (games[0].halfTime > 4) {
        playerOnField = 0
       }
      }
      catch {
        playerOnField = 0
      }

     if (userProfile === 1) {
       /*if (numberOption === 2)
       {
         return (
           <Button bg="transparent" p="0" onPress={() => proPage()}>
            <Box bg="#222" mb="0">
              <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', minWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}>
                 <Text style={{fontSize: 16, fontWeight: '600'}}>Step {numberOption}</Text>
                     <Text style={{fontSize: 12}}>(Or, to manage subs yourself, proceed to step 4)</Text>
               </Box>
            </Box>
          </Button>
         )
      }
      else*/ if (numberOption === 2)
      {

        let inviteCount = 0
        teamPlayers.map(player => {

          if (player.inviteStatus === 1) {
            inviteCount++
          }

        })

        return (
          <Button bg="transparent" p="0" onPress={() => proPage()}>
            <Box bg="#222" mb="0">
              <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', minWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}><Text style={{fontSize: 16, fontWeight: '600'}}>{inviteCount > 5 &&<Text>{saveTick}</Text>}Step {numberOption} (Optional)</Text></Box>
            </Box>
          </Button>
        )
     }
     else if (numberOption === 1)
     {
       return (
         <Button bg="transparent" p="0" onPress={() => proPage()}>
           <Box bg="#222" mb="0">
             <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', minWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}><Text style={{fontSize: 16, fontWeight: '600'}}>{playerOnField > 0 &&<Text>{saveTick}</Text>} Step {numberOption}</Text></Box>
           </Box>
         </Button>
       )
    }
      else {
        return (
          <Button bg="transparent" p="0" onPress={() => proPage()}>
            <Box bg="#222" mb="0">
              <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', minWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}><Text style={{fontSize: 16, fontWeight: '600'}}>Step {numberOption}</Text></Box>
            </Box>
          </Button>
        )
      }
   }
 }

 const optionsBanner = (numberOption) => {

     return (
       <Button bg="transparent" p="0" mt="5" onPress={() => proPage()}>
         <Box bg="#222" mb="0">
           <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', minWidth: '100%', borderRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}><Text style={{fontSize: 16, fontWeight: '600'}}>Other Options</Text></Box>
         </Box>
       </Button>
     )

   }

/*
   const displayLoader = () => {

     if (animateLoading === false) {
        setAnimateLoading(true)
     }
     else {
       setAnimateLoading(false)
     }

     setTimeout(() => {
       setAnimateLoading(false)
     }, 3000)

   }
   */

   const checkForceClose = () => {

     let gamesComplete = 5
     try {
       gamesComplete = games[0].halfTime
     }
     catch {
       //nothing
     }

     if (gamesComplete < 5) {
       return (
         <HStack>
           <Box minW="100%" alignSelf="center" p="0" m="0" bg="#000">
             <Button minW="100%" bg="transparent" p="0" m="0" size="md" onPress={() => forceClose()}><HStack><Text style={{fontSize: 14, color: '#aaa', textDecorationLine: "underline"}}>Having issues with current game? Tap here to "Force Close" and delete current game</Text></HStack></Button>
           </Box>
         </HStack>
       )
     }

  }

   const forceClose = () => {

     Alert.alert(
       'Are you sure you want to delete current game?',
       'If you delete the current game all data will be lost.',
       [
         {text: 'Delete Game', onPress: () => {

           let _games = []
           try {
             _games = [...games]
           }
           catch {
             _games = [{...games}]
           }

           if (games[0].halfTime < 5) {

             _games.shift();

             dispatch(updateGames(_games))
             //dispatch(updateCheckSort(0))


             //const gameRemove = games.shift();
             //dispatch(updateGames(gameRemove))
             //const gameIdDbTemp = props.route.params.gameIdDb
             //let gameIdDbTemp = 0
             //if (!props.route.params.gameIdDb) {
               //console.log('undefinded');
               //console.log(JSON.stringify(games[0]));
               const gameIdDbTemp = games[0].gameIdDb
             //}
             //else {
               //console.log('not undefinded');
               //gameIdDbTemp = props.route.params.gameIdDb
             //}
             try {

                 firestore()
                   .collection(currentUser.uid)
                   .doc(gameIdDbTemp)
                   .delete()
                   .then(() => {
                     console.log('game has been deleted!');
                   });
             }
             catch {
               //do nothing.
             }

           }

       }},
       {
         text: 'Cancel',
         onPress: () => console.log('Cancel Pressed'),
         style: 'cancel',
       },
     ],
     {cancelable: false},
   );

   }

   const sendCoachId = () => {

     navigate('SendCoachIdHome');

   }


   const deleteTestUsers = () => {
     /*
    //const testUserIds = [12, 14, 15, 16, 17, 18]; // Use just IDs, no objects
    const testUserIds = [13, 19]; // Use just IDs, no objects

    const updatedTeamPlayers = teamPlayers.filter(p => !testUserIds.includes(p.id));

    dispatch(updateTeamPlayers(updatedTeamPlayers));

    console.log('Updated teamPlayers (after deletion):', JSON.stringify(updatedTeamPlayers));
    */

    console.log('Updated teamPlayers (after deletion):', JSON.stringify(teamPlayers));

    const players = [...teamPlayers]; // your original data

    const updatedPlayers = players.map((player, index) => {
      return {
        ...player,
        playerId: `PLR${Date.now()}${index}` // Custom unique ID
      };
    });

    dispatch(updateTeamPlayers(updatedPlayers));

  };

  const handleUpdateId = async () => {

    let _teamPlayers = []
    try {
      _teamPlayers = [...teamPlayers]
    }
    catch {
      _teamPlayers = [{...teamPlayers}]
    }

    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

    // Update local _teamPlayers array
    let playerId = 0;

    const updatedPlayers = _teamPlayers.map(player => {
      if (player.playerId === 'JR5885') {
        playerId = player.playerId;
        return { ...player, id: uniqueId };
      }
      return player;
    });

    // Dispatch updated teamPlayers to Redux
    dispatch(updateTeamPlayers(updatedPlayers));

    // Update Firestore: Only update the `id` field
    const teamIdCodeGames = games[0].teamIdCode
    try {
      await userRef.doc(playerId).update({ id: uniqueId });
      await firestore().collection(teamIdCodeGames).doc(playerId).update({ id: uniqueId });
      console.log(`Player ID updated to ${uniqueId}`);
    } catch (error) {
      console.error('Error updating player ID in Firestore:', error);
    }



  };



        return (
          <Center>
          <LinearGradient colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Container maxW="100%" pl="5" mr="5">
            <ScrollView>
              <Box style={{paddingLeft: 10, paddingRight: 15, borderRadius: 5, backgroundColor: '#222'}} alignItems="center" mt="3" pb="1" shadow="6">
                <Text style={{color: '#ccc', marginTop: 5}}>User ID: {currentUser.uid}</Text>
              </Box>
              {youTubeVid()}

              {userProfile === 100 &&
        <Box alignItems="center" mt="3" shadow="6">
        <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
        {proBanner(1)}
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
            <Button minW="100%" size="md" variant="subtle" _text={{
              color: "#ffffff",
              fontSize: 25,
              fontWeight: '500'
            }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => startNewGameNew(0)}>
            <HStack maxW="100%" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left', width: '100%'}}>
              <HStack minW="10%">
                <VStack  pt="2">
                {getHideCircle === true &&
                    <ActivityIndicator style={{paddingight: 5}} size="large" color="#fff" animating={getHideCircle} />
                  }
                  {getHideCircle === false &&
                    <Center>
                      {users}
                    </Center>
                  }
                </VStack>
                </HStack>
                <HStack minW="71%" maxW="71%">
                  {addTeamPlayersText()}
                </HStack>
                  <HStack minW="11%">
                <VStack minW="20%" pt="2">
                <Center>
                  {chevronRight}
                  </Center>
                </VStack>
                </HStack>
              </HStack>
          </Button>
        </LinearGradient>
      </ImageBackground>
    </Box>
    }

    {userProfile === 1 &&
    <Box alignItems="center" mt="3" shadow="6">
      <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
      {proBanner(1)}
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.3)']} style={styles.linearGradient}>
          <Button minW="100%" size="md" variant="subtle" _text={{
                  color: "#ffffff",
                  fontSize: 25,
                  fontWeight: '500'
                }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => startNewGameNew(3, 3)}>
              <HStack maxW="100%" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left', width: '100%'}}>
                <HStack minW="10%">
                  <VStack  pt="2">
                  {getHideCircle === true &&
                      <ActivityIndicator style={{paddingight: 5}} size="large" color="#fff" animating={getHideCircle} />
                    }
                    {getHideCircle === false &&
                      <Center>
                        {users}
                      </Center>
                    }
                  </VStack>
                  </HStack>
                  <HStack minW="71%" maxW="71%">
                    {gameStatusNew(3)}
                  </HStack>
                    <HStack minW="11%">
                  <VStack minW="20%" pt="2">
                  <Center>
                    {chevronRight}
                    </Center>
                  </VStack>
                  </HStack>
                </HStack>

            </Button>
          </LinearGradient>
          </ImageBackground>
        </Box>
        }

        {userProfile === 1 &&
        <Box alignItems="center" mt="3" shadow="6">
      <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
      {proBanner(2)}
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
          <Button minW="100%" size="md" variant="subtle" _text={{
            color: "#ffffff",
            fontSize: 25,
            fontWeight: '500'
          }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => sendPlayerInviteHome()}>

          <HStack minW="100%" maxW="100%">
            <HStack minW="10%">
              <VStack pt="2">
                <Center>
                  {feildIcon}
                </Center>
              </VStack>
            </HStack>
            <HStack minW="78%" maxW="78%">
              <VStack pl="5">
                <HStack p="1" pl='0'>
                  <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Send Invites to Supporters</Text>
                </HStack>
                <HStack p="0.5" pl='0'>
                  <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Send invites to parents & supporters so they can view live scores!</Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack minW="10%">
              <VStack pt="2">
                <Center>
                  {chevronRight}
                </Center>
              </VStack>
            </HStack>
          </HStack>
        </Button>
      </LinearGradient>
    </ImageBackground>
    </Box>
  }

    {userProfile === 1 &&
      <Box>
        <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)}
            style={[
              styles.backgroundImageCoach,
              games[0]?.halfTime <= 4 &&
                games[0]?.teamPlayers?.some(
                  p => p.positionDetails?.column > 1 && p.positionDetails?.row < 4
                ) && styles.highlightBorder
            ]}>
          {proBanner(3)}
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.3)']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                      color: "#ffffff",
                      fontSize: 25,
                      fontWeight: '500'
                    }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => startNewGameNew(1,1)}>
                  <HStack maxW="100%" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left', width: '100%'}}>
                    <HStack minW="10%">
                      <VStack  pt="2">
                      {getHideCircle === true &&
                          <ActivityIndicator style={{paddingight: 5}} size="large" color="#fff" animating={getHideCircle} />
                        }
                        {getHideCircle === false &&
                          <Center>
                            {plus}
                          </Center>
                        }
                      </VStack>
                      </HStack>
                      <HStack minW="71%" maxW="71%">
                        {gameStatusNew(1)}
                      </HStack>
                        <HStack minW="11%">
                      <VStack minW="20%" pt="2">
                      <Center>
                        {chevronRight}
                        </Center>
                      </VStack>
                      </HStack>
                    </HStack>

                </Button>
              </LinearGradient>
              </ImageBackground>
            </Box>
            {checkForceClose()}
          </Box>

        }



        {userProfile !== 1 &&
        <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImageNotCoach}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.3)']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                      color: "#ffffff",
                      fontSize: 25,
                      fontWeight: '500'
                    }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => startNewGameNew(1,1)}>
                  <HStack maxW="100%" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left', width: '100%'}}>
                    <HStack minW="10%">
                      <VStack  pt="2">
                      {getHideCircle === true &&
                          <ActivityIndicator style={{paddingight: 5}} size="large" color="#fff" animating={getHideCircle} />
                        }
                        {getHideCircle === false &&
                          <Center>
                            {plus}
                          </Center>
                        }
                      </VStack>
                      </HStack>
                      <HStack minW="71%" maxW="71%">
                        {gameStatusNew(1)}
                      </HStack>
                        <HStack minW="11%">
                      <VStack minW="20%" pt="2">
                      <Center>
                        {chevronRight}
                        </Center>
                      </VStack>
                      </HStack>
                    </HStack>

                </Button>
              </LinearGradient>
              </ImageBackground>
            </Box>
            }



        {userProfile === 100 &&
          <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
          {proBanner(4)}
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => sendCoachId()}>
            <HStack minW="100%" maxW="100%" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left', width: '100%'}}>
              <HStack minW="10%">
                <VStack pt="2">
                  <Center>
                    {unlockAlt}
                  </Center>
                </VStack>
              </HStack>
              <HStack minW="78%" maxW="78%">
                <VStack pl="5">
                  <HStack p="1" pl='0'>
                    <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Send Coach ID</Text>
                  </HStack>
                  <HStack p="0.5" pl='0'>
                    <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Share the "Coach Profile ID" with an assistant or parent helper so you can manage subs together</Text>
                  </HStack>
                </VStack>
              </HStack>
              <HStack minW="10%">
                <VStack pt="2">
                  <Center>
                    {chevronRight}
                  </Center>
                </VStack>
              </HStack>
            </HStack>
          </Button>
          </LinearGradient>
          </ImageBackground>
          </Box>
          }

          {userProfile === 1 &&
            <Box>
        {optionsBanner()}

              <Box alignItems="center" mt="3" shadow="6">
              <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500'
                  }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => playerStatsHome()}>
                <HStack minW="100%" maxW="100%" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left', width: '100%'}}>
                  <HStack minW="10%">
                    <VStack pt="2">
                      <Center>
                        {barChart}
                      </Center>
                    </VStack>
                  </HStack>
                  <HStack minW="78%">
                    <VStack pl="5">
                      <HStack p="1" pl='0'>
                        <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Player Stats</Text>
                      </HStack>
                      <HStack p="0.5" pl='0'>
                        <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>View Detailed Statistics</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <HStack minW="10%">
                    <VStack pt="2">
                      <Center>
                        {chevronRight}
                      </Center>
                    </VStack>
                  </HStack>
                </HStack>
              </Button>
            </LinearGradient>
            </ImageBackground>
          </Box>
          <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => previousGames()}>
            <HStack minW="100%" maxW="100%" style={{textAlign: 'left', alignItems: 'left', justifyContent: 'left', width: '100%'}}>
              <HStack minW="10%">
                <VStack pt="2">
                  <Center>
                    {history}
                  </Center>
                </VStack>
              </HStack>
              <HStack minW="78%">
                <VStack pl="5">
                  <HStack p="1" pl='0'>
                    <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Previous Games</Text>
                  </HStack>
                  <HStack p="0.5" pl='0'>
                    <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Access Match History</Text>
                  </HStack>
                </VStack>
              </HStack>
              <HStack minW="10%">
                <VStack pt="2">
                  <Center>
                    {chevronRight}
                  </Center>
                </VStack>
              </HStack>
            </HStack>
          </Button>
        </LinearGradient>
      </ImageBackground>
    </Box>

    <Box alignItems="center" mt="3" shadow="6">
    <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
        <Button minW="100%" size="md" variant="subtle" _text={{
          color: "#ffffff",
          fontSize: 25,
          fontWeight: '500'
        }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => viewDrills()}>

        <HStack minW="100%" maxW="100%">
          <HStack minW="10%">
            <VStack pt="2">
              <Center>
                {clipboardClockIcon}
              </Center>
            </VStack>
          </HStack>
          <HStack minW="78%">
            <VStack pl="5">
              <HStack p="1" pl='0'>
                <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Soccer Drills & Exercises</Text>
              </HStack>
              <HStack p="0.5" pl='0'>
                <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Soccer drills for ages 5 - 14</Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack minW="10%">
            <VStack pt="2">
              <Center>
                {chevronRight}
              </Center>
            </VStack>
          </HStack>
        </HStack>
      </Button>
    </LinearGradient>
    </ImageBackground>
  </Box>
  </Box>
  }
              <Text style={{color: 'transparent', fontSize: 0, lineHeight: 0}} >{getHalfTimeFlag}</Text>
              <Button minW="100%" bg="#E879F9" size="md" pt="5" pb="5" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => handleUpdateId()}>Fix ID 12 Only</Button>

            </ScrollView>
          </Container>
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
  linearGradientLoading: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  statsLogo: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
    //marginBottom: 50
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderRadius: 5,
      borderColor: '#aaa',
      borderWidth: 0.5,
  },
  backgroundImageNotCoach: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderRadius: 5,
      borderColor: '#e879f9',
      borderWidth: 1,
  },
  backgroundImageCoach: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderRadius: 5,
      borderColor: '#aaa',
      borderWidth: 0.5,
  },
  highlightBorder: {
    borderColor: '#E879F9',
    borderWidth: 3,
  },
  linearGradientBg: {
    minWidth: '100%',
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
  activityIndicatorNone: {
    height: '0%',
  },
  backgroundImageLive: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    height: 150,
    borderRadius: 5,
    borderColor: '#aaa',
    borderWidth: 0.5,
    overflow: 'hidden'
  },
  containerYouTube: {
    //flex: 1,
    //backgroundColor: 'darkblue',
    paddingTop: 15
  },
})

export default Home;

/*
<Text style={{color: '#fff', fontSize: 12, lineHeight: 12}} >pro_forever_indiv: {JSON.stringify(pro_forever_indiv)}</Text>
<Text style={{color: '#fff', fontSize: 12, lineHeight: 12}} >pro_yearly_indiv: {JSON.stringify(pro_yearly_indiv)}</Text>
<Text style={{color: '#fff', fontSize: 12, lineHeight: 12}} >pro_yearly_team: {JSON.stringify(pro_yearly_team)}</Text>
<Text style={{color: '#fff', fontSize: 12, lineHeight: 12}} >pro_forever_team: {JSON.stringify(pro_forever_team)}</Text>
<Text style={{color: '#fff', fontSize: 12, lineHeight: 12}} >pro_yearly_player: {JSON.stringify(pro_yearly_player)}</Text>
<Text style={{color: '#fff', fontSize: 12, lineHeight: 12}} >pro_forever_player: {JSON.stringify(pro_forever_player)}</Text>
*/

/*
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
      {gameChangeToComplete()}
    </HStack>
  </Center>
</Button>

*/


/*
loading symbol

//add this just before teh last closing tag:

<View style={[styles.activityIndicatorTest, animateLoading ? styles.activityIndicatorLarge : styles.activityIndicatorNone]}>
  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientLoading}>
    <ActivityIndicator size="large" color="#fff" animating={animateLoading} />
    <Heading style={{color: '#fff'}}>LOADING...</Heading>
  </LinearGradient>
</View>

//Add this to the main area:

<Button minW="100%" size="md" variant="subtle" _text={{
  color: "#ffffff",
  fontSize: 25,
  fontWeight: '500'
}} pt="5" pb="5" onPress={() => displayLoader()}>
  <Center>
    <Text>
      Test animation.
    </Text>
  </Center>
</Button>

*/


/*
delete test Users
<Button minW="100%" size="md" variant="subtle" _text={{
  color: "#ffffff",
  fontSize: 25,
  fontWeight: '500'
}} pt="5" pb="5" onPress={() => deleteTestUsers()}>
  <Center>
    <Text>
      Delete test users
    </Text>
  </Center>
</Button>
*/

/*
import * as Sentry from '@sentry/react-native';
<Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
*/

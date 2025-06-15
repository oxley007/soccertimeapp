import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SoccerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="plus" size={30} color="#fff" />;
const plusCircleBlack = <IconAnt name="pluscircleo" size={40} color="#000" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;
const soccerBallIcon = <SoccerIcon name="soccer" size={30} color="#fff" />;

import * as Animatable from 'react-native-animatable';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updateIap } from '../../Reducers/iap';
import { updateSeasons } from '../../Reducers/seasons';
import { updatePlayerUserData } from '../../Reducers/playerUserData';

const HomePlayer = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [playerProfile, setPlayerProfile] = useState([]);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let userProfile = useSelector(state => state.userProfile.userProfile);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;


  useEffect(() => {

    const initPurchases = async () => {
      Purchases.setDebugLogsEnabled(true)
      //Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
      /*
      if (Platform.OS === 'ios') {
        await Purchases.configure({
          apiKey: "appl_AiWRjxtNooUlINbXhTHZhTrLkWv"
        })
      } else if (Platform.OS === 'android') {
        await Purchases.configure({
          apiKey: "goog_pfrcDUZxKWnrnDzWlAkAGXYDZpG"
        })
     }
     */
   }

    initPurchases()

  }, [])

  useEffect(() => {

 //console.log(JSON.stringify(playerUserDataTeams) + ' playerUserDataTeams check Player Home.');

    //map teams looking for update to pro from coach/manager.
 //console.log(pro_yearly_team[0].purchased + ' wht is pro_forever_indiv[0].purchased? 1');
 //console.log(pro_forever_team[0].purchased + ' wht is pro_yearly_indiv[0].purchased? 1');
    //if (pro_yearly_team[0].purchased === false && pro_forever_team[0].purchased === false && pro_yearly_player[0].purchased === false && pro_forever_player[0].purchased === false) {
      playerUserDataTeams.map(team => {
     //console.log(team.teamId + ' team.teamId');
        const teamIdTemp = team.teamId
        try {
          const refTeam = firestore().collection(teamIdTemp).doc(teamIdTemp);
          const teams = refTeam.onSnapshot(onLiveCollectionUpdate)
         }
         catch {
        //console.log('no teams');
         }
      })
    //}


  }, [])

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


  const onLiveCollectionUpdate = (documentSnapshot) => {

 //console.log('hit snapshot.');
 //console.log(documentSnapshot + ' documentSnapshot check.');
 //console.log(JSON.stringify(documentSnapshot.data()) + ' documentSnapshot.data() check.');
 //console.log(JSON.stringify(documentSnapshot.data().pro_yearly_team) + ' documentSnapshot.data().pro_yearly_team; check.');

    //let teamData = []
    //let errorMessage = 0
    try {
    //const teamName = documentSnapshot.data().teamName;
    //const teamId = documentSnapshot.data().teamId;
    //const pro_forever_indiv_snapshot = documentSnapshot.data().pro_forever_indiv;
    //const pro_yearly_indiv_snapshot = documentSnapshot.data().pro_yearly_indiv;
    const pro_yearly_team_snapshot = documentSnapshot.data().pro_yearly_team;
    const pro_forever_team_snapshot = documentSnapshot.data().pro_forever_team;
    //const pro_yearly_player_snapshot = documentSnapshot.data().pro_yearly_player;
    //const pro_forever_player_snapshot = documentSnapshot.data().pro_forever_player;
    //const id = documentSnapshot.data().id;
  //console.log(id + ' id');

    //teamData = {teamName: teamName, teamId: teamId}
    //errorMessage = 1

 //console.log(playerUserDataTeams + ' what is playerUserData.teams here?');
 //console.log(JSON.stringify(playerUserDataTeams) + ' what is JSON playerUserData.teams here?');


 //console.log(JSON.stringify(pro_yearly_team) + ' check pro_yearly_team');
 //console.log(pro_yearly_team[0].purchased + ' wht is pro_yearly_team[0].purchased? 2');
 //console.log(pro_forever_team[0].purchased + ' wht is pro_forever_team[0].purchased? 2');
 //console.log(pro_yearly_team_snapshot[0].purchased + ' this work? pro_yearly_team_snapshot[0].purchased');


    if (pro_yearly_team_snapshot[0].purchased === true || pro_forever_team_snapshot[0].purchased === true) {
      let temp_pro_yearly_team = []
      let temp_pro_forever_team = []
      if (pro_yearly_team_snapshot[0].purchased === true) {
        temp_pro_yearly_team = pro_yearly_team_snapshot
      }
      else {
        temp_pro_yearly_team = pro_yearly_team
      }

      if (pro_forever_team_snapshot[0].purchased === true) {
        temp_pro_forever_team = pro_forever_team_snapshot
      }
      else {
        temp_pro_forever_team = pro_forever_team
      }

      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, temp_pro_yearly_team, temp_pro_forever_team, pro_yearly_player, pro_forever_player))

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: temp_pro_yearly_team,
          pro_forever_team: temp_pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))

    }
    else if (pro_yearly_team_snapshot[0].purchased === false || pro_forever_team_snapshot[0].purchased === false) {
   //console.log('hit pro true.');
   //console.log(pro_yearly_team_snapshot[0].purchased + ' this work? pro_yearly_team_snapshot[0].purchased 2');
   //console.log(pro_forever_team_snapshot[0].purchased + ' this work? pro_forever_team_snapshot[0].purchased 2');
      let temp_pro_yearly_team = []
      let temp_pro_forever_team = []
      if (pro_yearly_team_snapshot[0].purchased === false) {
     //console.log('hit pro yearly true.');
        temp_pro_yearly_team = pro_yearly_team_snapshot
      }
      else {
        temp_pro_yearly_team = pro_yearly_team
      }

      if (pro_forever_team_snapshot[0].purchased === false) {
        temp_pro_forever_team = pro_forever_team_snapshot
      }
      else {
        temp_pro_forever_team = pro_forever_team
      }

      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, temp_pro_yearly_team, temp_pro_forever_team, pro_yearly_player, pro_forever_player))

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: temp_pro_yearly_team,
          pro_forever_team: temp_pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  catch {
    //do nothing.
  }

  }

  useEffect(() => {



    const checkSubscription = async (productIdentification) => {
      try {
        const customerInfoPurchase = await Purchases.getCustomerInfo();
     //console.log(JSON.stringify(customerInfo) + ' customerInfo');

     //console.log(JSON.stringify(customerInfoPurchase.activeSubscriptions) + ' check activeSubscriptions');

        if (customerInfoPurchase.activeSubscriptions !== null) {
       //console.log('just testing.');
        }

        let expirationDate = null
        /*
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

        else if (productIdentification === 'pro_forever_indiv') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv + ' check specific expiry date pro_forever_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv
        }
        else if (productIdentification === 'pro_forever_team') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_team + ' check specific expiry date pro_forever_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_team
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

        else if (productIdentification === 'pro_forever_indiv_android') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv_android + ' check specific expiry date pro_forever_indiv_android iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv_android
        }
        else if (productIdentification === 'pro_forever_team_android') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_team_android + ' check specific expiry date pro_forever_team_android iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_team_android
        }
        */

        if (productIdentification === 'pro_yearly_player') {
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
        else if (productIdentification === 'pro_forever_player') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_player + ' check specific expiry date pro_forever_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_player
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
        else if (productIdentification === 'pro_forever_player_android') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_player_android + ' check specific expiry date pro_forever_player_android iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_player_android
        }


        if (Array.isArray(customerInfoPurchase.activeSubscriptions) && customerInfoPurchase.activeSubscriptions.length) {
       //console.log('hit if subscriptrion avail.');
          getExpiryDateForProds(productIdentification, expirationDate)
        }
        else {
          /*if (productIdentification === 'pro_yearly_indiv' || productIdentification === 'pro_yearly_indiv_android:yearly-sub-799' || productIdentification === 'pro_monthly_indv' || productIdentification === 'pro_monthly_indiv_android:month-sub-499' || productIdentification === 'pro_season_indv' || productIdentification === 'pro_season_indiv_android:season-sub-2499') {
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
          else*/ if (productIdentification === 'pro_yearly_player' || productIdentification === 'pro_yearly_player:yearly-sub-7-99' || productIdentification === 'pro_monthly_player' || productIdentification === 'pro_monthly_player_android:month-sub-player-499' || productIdentification === 'pro_season_player' || productIdentification === 'pro_season_player_android:season-sub-player-2499') {
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

    /*if (pro_yearly_indiv[0].expiryDate !== null) {
      const convertedDateTemp = new Date(pro_yearly_indiv[0].expiryDate);
      convertedDate = Math.floor(new Date(convertedDateTemp).getTime() / 1000)
    }
    else if (pro_yearly_team[0].expiryDate !== null) {
      const convertedDateTemp = new Date(pro_yearly_team[0].expiryDate);
      convertedDate = Math.floor(new Date(convertedDateTemp).getTime() / 1000)
    }
    else*/ if (pro_yearly_player[0].expiryDate !== null) {
      const convertedDateTemp = new Date(pro_yearly_player[0].expiryDate);
      convertedDate = Math.floor(new Date(convertedDateTemp).getTime() / 1000)
    }


 //console.log(convertedDate + ' convertedDate on home is?');
 //console.log(epochDate + ' epochDate on home is?');


  /*if ((convertedDate < epochDate && pro_yearly_indiv[0].expiryDate !== null) || (isNaN(convertedDate) && pro_yearly_indiv[0].expiryDate !== null)) {
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
    else*/ if ((convertedDate < epochDate && pro_yearly_player[0].expiryDate !== null) || (isNaN(convertedDate) && pro_yearly_player[0].expiryDate !== null)) {
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


  /*
  useEffect(() => {


    const checkSubscription = async (productIdentification) => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
     //console.log(JSON.stringify(customerInfo) + ' customerInfo');

     //console.log(JSON.stringify(customerInfo.activeSubscriptions) + ' check activeSubscriptions');

        if (customerInfo.activeSubscriptions !== null) {
       //console.log('just testing.');
        }

        let expirationDate = null
        if (productIdentification === 'pro_yearly_indiv') {
       //console.log(customerInfo.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfo.allExpirationDatesMillis.pro_yearly_indiv
        }
        else if (productIdentification === 'pro_yearly_team') {
         //console.log(customerInfo.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfo.allExpirationDatesMillis.pro_yearly_team
        }
        else if (productIdentification === 'pro_yearly_player') {
       //console.log(customerInfo.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfo.allExpirationDatesMillis.pro_yearly_player
        }
        else if (productIdentification === 'pro_yearly_indiv_android:yearly-sub-799') {
       //console.log(customerInfo.allExpirationDatesMillis['pro_yearly_indiv_android:yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfo.allExpirationDatesMillis['pro_yearly_indiv_android:yearly-sub-799']
        }
        else if (productIdentification === 'pro_yearly_team_android:yearly-sub-69') {
       //console.log(customerInfo.allExpirationDatesMillis['pro_yearly_team_android:yearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfo.allExpirationDatesMillis['pro_yearly_team_android:yearly-sub-69']
        }
        else if (productIdentification === 'pro_yearly_player:yearly-sub-7-99') {
       //console.log(customerInfo.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfo.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99']
        }

        if (Array.isArray(customerInfo.activeSubscriptions) && customerInfo.activeSubscriptions.length) {
       //console.log('hit if subscriptrion avail.');
          getExpiryDateForProds(productIdentification, expirationDate)
        }
        else {
          if (productIdentification === 'pro_yearly_player' || productIdentification === 'pro_yearly_player:yearly-sub-7-99') {
            pro_yearly_player[0].purchased = false
            pro_yearly_player[0].expiryDate = null
          }
        }
        // access latest customerInfo
      } catch (e) {
       // Error fetch
     }



    }

    let epochDate = new Date();
    epochDate.setFullYear(epochDate.getFullYear());
 //console.log(epochDate + ' epochDate cehcek. here. two');
    epochDate = Math.floor(new Date(epochDate).getTime() / 1000)


 //console.log(pro_yearly_player[0].expiryDate + ' pro_yearly_player[0].expiryDate on home is?');
    let convertedDate = null

    if (pro_yearly_indiv[0].expiryDate !== null) {
      const convertedDateTemp = new Date(pro_yearly_player[0].expiryDate);
      convertedDate = Math.floor(new Date(convertedDateTemp).getTime() / 1000)
    }


 //console.log(convertedDate + ' convertedDate on home is?');
 //console.log(epochDate + ' epochDate on home is?');


    if (convertedDate < epochDate && pro_yearly_player[0].expiryDate !== null) {

      if (Platform.OS !== 'ios') {
        checkSubscription('pro_yearly_player:yearly-sub-7-99')
      }
      else {
        checkSubscription('pro_yearly_player')
      }
   //console.log('pro_yearly_indiv[0].expiryDate hit');
      //pro_yearly_indiv[0].purchased = false
      //pro_yearly_indiv[0].expiryDate = null
    }

    dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

  }, [])
  */

  const getExpiryDateForProds = (storeProductId, latestExpirationDateMillis) => {

 //console.log(JSON.stringify(storeProductId) + ' output prod.');
    let epochDate = null
    let productNameTitle = ''
    //if (storeProductId === 'pro_yearly_player' || storeProductId === 'pro_yearly_player:yearly-sub-7-99') {
    if (storeProductId === 'pro_yearly_player' || storeProductId === 'pro_yearly_player:yearly-sub-7-99' || storeProductId === 'pro_monthly_player' || storeProductId === 'pro_monthly_player_android:month-sub-player-499' || storeProductId === 'pro_season_player' || storeProductId === 'pro_season_player_android:season-sub-player-2499') {
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
      productNameTitle = 'Pro Year Subscription'
    }
    else if (storeProductId === 'pro_forever_player' || storeProductId === 'pro_forever_player_android') {
      pro_forever_player[0].purchased = true
      epochDate = null
      pro_forever_player[0].identifier = storeProductId
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))
      productNameTitle = 'Pro - Forever Bundle'
    }

    return [epochDate, productNameTitle]

  }

  useEffect(async () => {
    //console.log(JSON.stringify(posts) + ' posts! Yea test!!');

      /*
      let _iap = []
      try {
        _iap = [...iap]
      }
      catch {
        _iap = [{...iap}]
      }

      if (_iap === [] || _iap.length < 1 || _iap === null) {

          const iapDoc = await firestore().collection(currentUser.uid).doc('iap').get();
          const iapDocData = iapDoc.data()
       //console.log(JSON.stringify(iapDocData) + ' need to check iapDocData');
       //console.log(JSON.stringify(iapDocData.pro_yearly_indiv) + ' need to check iapDocData.pro_yearly_indiv');

          dispatch(updateIap(iapDocData.pro_forever_indiv, iapDocData.pro_yearly_indiv, iapDocData.pro_yearly_team, iapDocData.pro_forever_team, iapDocData.pro_yearly_player, iapDocData.pro_forever_player))

      }
      */

      let _userProfile = []
      try {
        _userProfile = [...userProfile]
      }
      catch {
        _userProfile = [{...userProfile}]
      }

      if (_userProfile === [] || _userProfile.length < 1 || _userProfile === null) {

          const userProfileDoc = await firestore().collection(currentUser.uid).doc('userData').get();
          const userProfileDocData = userProfileDoc.data()
       //console.log(JSON.stringify(userProfileDocData) + ' need to check userProfileDocData');
       //console.log(JSON.stringify(userProfileDocData.userProfile) + ' need to check userProfileDocData.userProfile');
          dispatch(updateUserProfile(userProfileDocData.userProfile))
      }

      //TODO add get playerUserData form DB and store.

      let _playerUserDataTeams = []
      try {
        _playerUserDataTeams = [...playerUserDataTeams]
      }
      catch {
        _playerUserDataTeams = [{...playerUserDataTeams}]
      }

   //console.log(JSON.stringify(_playerUserDataTeams) + ' what is _playerUserDataTeams?');

      if (_playerUserDataTeams === [] || _playerUserDataTeams.length < 1 || _playerUserDataTeams === null) {

          const playerUserDataDoc = await firestore().collection(currentUser.uid).doc('playerUserData').get();
          const playerUserDataDocData = playerUserDataDoc.data()
       //console.log(JSON.stringify(playerUserDataDocData) + ' need to check playerUserDataDocData');
       //console.log(JSON.stringify(playerUserDataDocData.teams) + ' need to check playerUserDataDocData.teams');
       //console.log(JSON.stringify(playerUserDataDocData.players) + ' need to check playerUserDataDocData.players');
       //console.log(JSON.stringify(playerUserDataDocData.seasons) + ' need to check playerUserDataDocData.seasons');
       //console.log(JSON.stringify(playerUserDataDocData.seasonsDisplay) + ' need to check playerUserDataDocData.seasonsDisplay');
       //console.log(JSON.stringify(playerUserDataDocData.seasonsDisplayId) + ' need to check playerUserDataDocData.seasonsDisplayId');
          dispatch(updatePlayerUserData(playerUserDataDocData.teams, playerUserDataDocData.players, playerUserDataDocData.seasons, playerUserDataDocData.seasonsDisplay, playerUserDataDocData.seasonsDisplayId))
      }

    }, []);

    useEffect(() => {

    //console.log(JSON.stringify(playerUserDataTeams) + ' playerUserDataTeams check Player Home.');

      //map teams looking for update to pro from coach/manager.
    //console.log(pro_yearly_team[0].purchased + ' wht is pro_forever_indiv[0].purchased? 1');
    //console.log(pro_forever_team[0].purchased + ' wht is pro_yearly_indiv[0].purchased? 1');
      if (pro_yearly_team[0].purchased === false && pro_forever_team[0].purchased === false && pro_yearly_player[0].purchased === false && pro_forever_player[0].purchased === false) {
        playerUserDataTeams.map(team => {
       //console.log(team.teamId + ' team.teamId');
          const teamIdTemp = team.teamId
          try {
            const refSeasons = firestore().collection(teamIdTemp).doc('seasons');
            const seasons = refSeasons.onSnapshot(onSeasonsCollectionUpdate)
           }
           catch {
          //console.log('no teams');
           }
        })
      }


    }, [])

    const onSeasonsCollectionUpdate = (documentSnapshot) => {

   //console.log('hit snapshot.');
   //console.log(documentSnapshot + ' documentSnapshot check.');
   //console.log(JSON.stringify(documentSnapshot.data()) + ' documentSnapshot.data() check.');
    //console.log(JSON.stringify(documentSnapshot.data().pro_yearly_team) + ' documentSnapshot.data().pro_yearly_team; check.');

      //let teamData = []
      //let errorMessage = 0
      try {
      //const teamName = documentSnapshot.data().teamName;
      //const teamId = documentSnapshot.data().teamId;
      //const pro_forever_indiv_snapshot = documentSnapshot.data().pro_forever_indiv;
      //const pro_yearly_indiv_snapshot = documentSnapshot.data().pro_yearly_indiv;
      const seasons_snapshot = documentSnapshot.data()
      const season_id_snapshot = documentSnapshot.data().id;
      const season_snapshot = documentSnapshot.data().season;
      //const pro_yearly_player_snapshot = documentSnapshot.data().pro_yearly_player;
      //const pro_forever_player_snapshot = documentSnapshot.data().pro_forever_player;
      //const id = documentSnapshot.data().id;
    //console.log(id + ' id');

      //teamData = {teamName: teamName, teamId: teamId}
      //errorMessage = 1

   //console.log(playerUserDataTeams + ' what is playerUserData.teams here?');
   //console.log(JSON.stringify(playerUserDataTeams) + ' what is JSON playerUserData.teams here?');

        dispatch(updateSeasons(seasons_snapshot.seasons, '', 99999998))

      }
    catch {
      //do nothing.
    }

    }

  const liveScores = () => {

    navigate('HomePlayerLiveScores');

  }


   const addTeam = () => {

     navigate('HomePlayerAddTeam');

   }

   const viewTeam = () => {

     navigate('HomePlayerTeamsList');

   }

   const addPlayer = () => {

     navigate('AddPlayerHome');

   }

   const viewPlayer = () => {

     navigate('HomePlayerPlayersList');

   }

   const manageSubs = () => {


       dispatch(updateUserProfile(4))

       userRef.doc('userData').update({
           userProfile: 4,
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

      navigate('HomeParentAddTeam')


   }



        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Center>
            <Container maxW="100%" pl="3" pr="3">
            <ScrollView>
            {playerProfile.length > 0 &&
            <Box mt="3" shadow="6" minW="100%">
            <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
                <Button minW="100%" size="md" variant="subtle" _text={{
                  color: "#ffffff",
                  fontSize: 25,
                  fontWeight: '500'
                }} bg="transparent" pt="5" pb="5" onPress={() => liveScores()}>

                    <HStack minW="100%">
                    <Box minW="100%">
                    <HStack minW="100%">
                     <VStack bg="#E879F9" style={{borderRadius: 50, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                        {soccerBallIcon}
                      </VStack>
                      <VStack>
                      <Text style={{color: "#fff",
                      fontSize: 22,
                      fontWeight: '500',
                      lineHeight: 40, paddingLeft: 10, paddingTop: 5}}>
                        Live Scores
                      </Text>
                      </VStack>
                      </HStack>
                      <Center>
                      <Text style={{color: "#ccc",
                      fontSize: 16,
                      fontWeight: '400', marginTop: 20}}>
                        View live scores and game events here.
                      </Text>
                      </Center>
                    </Box>
                    </HStack>

                </Button>
              </LinearGradient>
              </ImageBackground>
            </Box>
          }
          {playerProfile.length > 0 &&
          <Box minW="100%" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccer_palyers_1.jpeg`)} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{maxWidth: '100%'}} bg="transparent" pt="5" pb="5" onPress={() => viewTeam()}>

                  <HStack minW="100%">
                  <Box>
                  <HStack>
                   <VStack bg="#333" style={{borderRadius: 50, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                      {plusCircle}
                    </VStack>
                    <VStack>
                    <Text style={styles.textTwentyTwo}>
                      View Your Teams Results & Stats
                    </Text>
                    </VStack>
                    </HStack>
                    <Center>
                    <Text style={{color: "#ccc",
                    fontSize: 16,
                    fontWeight: '400', marginTop: 20}}>
                      Tap to see a list of your teams so you can view game results & stats.
                    </Text>
                    </Center>
                  </Box>
                  </HStack>

              </Button>
            </LinearGradient>
            </ImageBackground>
          </Box>
        }
        {playerProfile.length > 0 &&
        <Box minW="100%" mt="3" shadow="6">
        <ImageBackground source={require(`../../assets/LIVE_GAME_BUTTON_LEFT_2.png`)} style={styles.backgroundImage}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
            <Button minW="100%" size="md" variant="subtle" _text={{
              color: "#ffffff",
              fontSize: 25,
              fontWeight: '500'
            }} style={{maxWidth: '100%'}} bg="transparent" pt="5" pb="5" onPress={() => viewPlayer()}>

                <HStack minW="100%">
                <Box>
                <HStack>
                 <VStack bg="#333" style={{borderRadius: 50, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                    {plusCircle}
                  </VStack>
                  <VStack>
                  <Text style={styles.textTwentyTwo}>
                    View Player Stats & Game-Time Played
                  </Text>
                  </VStack>
                  </HStack>
                  <Center>
                  <Text style={{color: "#ccc",
                  fontSize: 16,
                  fontWeight: '400', marginTop: 10}}>
                    Tap to see your linked players so you can view player stats & time played in each position.
                  </Text>
                  </Center>
                </Box>
                </HStack>

            </Button>
          </LinearGradient>
          </ImageBackground>
        </Box>
      }
              <Box minW="100%" mt="3" shadow="6">
              <ImageBackground source={require(`../../assets/soccer_field_1.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500'
                  }} style={{maxWidth: '100%'}} bg="transparent" pt="5" pb="5" onPress={() => addTeam()}>

                      <HStack minW="100%">
                      <Box>
                      <HStack>
                       <VStack bg="#333" style={{borderRadius: 50, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                          {plusCircle}
                        </VStack>
                        <VStack>
                        <Text style={{color: "#ffffff",
                        fontSize: 22,
                        fontWeight: '500',
                        lineHeight: 40, paddingLeft: 10}}>
                          Add Team
                        </Text>
                        </VStack>
                        </HStack>
                        <Center>
                        <Text style={{color: "#ccc",
                        fontSize: 16,
                        fontWeight: '400', marginTop: 10}}>
                          Do you have a Team ID? Add your team here.
                        </Text>
                        </Center>
                      </Box>
                      </HStack>

                  </Button>
                </LinearGradient>
                </ImageBackground>
              </Box>
              <Box minW="100%" mt="3" shadow="6" mb="20">
              <ImageBackground source={require(`../../assets/soccer_field_2.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500'
                  }} style={{maxWidth: '100%'}} bg="transparent" pt="5" pb="5" onPress={() => addPlayer()}>

                      <HStack minW="100%">
                      <Box>
                      <HStack>
                       <VStack bg="#333" style={{borderRadius: 50, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                          {plusCircle}
                        </VStack>
                        <VStack>
                        <Text style={{color: "#ffffff",
                        fontSize: 22,
                        fontWeight: '500',
                        lineHeight: 40, paddingLeft: 10}}>
                          Add Player
                        </Text>
                        </VStack>
                        </HStack>
                        <Center>
                        <Text style={{color: "#ccc",
                        fontSize: 16,
                        fontWeight: '400', marginTop: 10}}>
                          Do you have a Player ID? Add your player here.
                        </Text>
                        </Center>
                      </Box>
                      </HStack>
                  </Button>
                </LinearGradient>
                </ImageBackground>
              </Box>
              {userProfile === 100 &&
              <Box minw="100%" mt="3" mb="20" shadow="6" style={{borderRadius: 5, overflow: 'hidden', alignItems: 'flex-start',
              justifyContent: 'flex-start'}}>
              <ImageBackground source={require(`../../assets/soccer_field_3.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500',
                  }} bg="transparent" pt="5" pb="5" onPress={() => manageSubs()}>

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
                          fontWeight: '400', marginTop: 10, maxWidth: '100%', overflow: 'hidden'}}>
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

            </ScrollView>

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
    overflow: 'hidden'
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
      borderRadius: 5,
      overflow: 'hidden'
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  textTwentyTwo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: '500',
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 22,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
})

export default HomePlayer;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, ActivityIndicator } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';

import EventsDisplay from '../Events/EventsDisplay.js'
import SelectPlayerList from '../AddPlayers/SelectPlayerList.js'
import SeasonStats from '../SeasonStats/SeasonStats'
import SeasonPositionStats from '../SeasonStats/SeasonPositionStats'
import GameStatsDisplay from '../Stats/GameStatsDisplay'
import IndividualPlayerEachGameStats from './IndividualPlayerEachGameStats'
import SeasonPositionSort from './SeasonPositionSort'
import SeasonPositionSortAll from './SeasonPositionSortAll'
import IndividualPlayerLiveGameStats from './IndividualPlayerLiveGameStats'
import IndividualPlayerHomeGameStats from './IndividualPlayerHomeGameStats'


const IndividualPlayerStatsHome = (props)=>{

  const [getGame, setGame] = useState([]);
  const [gethomeTeamShortName, sethomeTeamShortName] = useState('');
  const [getscoreHomeTeam, setscoreHomeTeam] = useState(0);
  const [getscoreAwayTeam, setscoreAwayTeam] = useState([]);
  const [getawayTeamShortName, setawayTeamShortName] = useState('');
  const [getGameId, setGameId] = useState(0);
  const [getteamIdCode, setteamIdCode] = useState(0);
  const [getGameDate, setGameDate] = useState('');
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
  const [animateLoading, setAnimateLoading] = useState(false);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode
  const whereFrom = props.whereFrom

  const { navigate } = props.navigation;

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)


    useEffect(() => {

      //setAnimateLoading(true)

   //console.log(JSON.stringify(props.playerData) + ' props.playerData check');
   //console.log(JSON.stringify(props.whereFrom) + ' props.whereFrom check invdiv.');
      let playerDataStats = []

      if (props.whereFrom === 191) {
        playerDataStats = props.playerData.gameStats
      }
      else {
        playerDataStats = props.playerData.stats
      }


   //console.log(JSON.stringify(playerDataStats) + ' check playerDataStats now');


   const seasonIds = []
   let totalGamesPlayedRaw = 0
   let totalGamesPlayedCount = 0
   let ids = []

   try {

      ids = [...new Set(playerDataStats.map(i=>i.gameId))];

   //console.log(props.seasonId + ' what do they show for props.season?');
   //console.log(ids + ' what do they show for ids?');



      if (props.whereFrom === 181) {
        totalGamesPlayedRaw = playerDataStats.length
      }
      else {

      ids.map(id => {

          games.map(game => {
          if (id === game.id && game.season.id === props.seasonId) {
            seasonIds.push({seasonId: id})
          }
        })
      })

   //console.log(JSON.stringify(seasonIds) + ' also need to check seasonIds.');
   //console.log(totalGamesPlayedCount + ' totalGamesPlayedCount is what?');
      totalGamesPlayedRaw = seasonIds.length

    }
  }
  catch {
    console.log('catched her now on this one.');
  }



   //console.log(totalGamesPlayedRaw + ' totalGamesPlayedRaw here.');

        setTotalGamesPlayed(totalGamesPlayedRaw)

        /*
        setTimeout(() => {
         //console.log('during timeout team list');
             setAnimateLoading(false)
           }, 5000);
           */


    },[])


  const continueSetup = () => {


    if (props.whereFrom === 181) {
      navigate('HomePlayerPlayersList');
    }
    else {
      navigate('PreviousGamesHome');
    }

  }

  const playerStatsCompareAll = () => {

  //console.log(' is playerStatsCompareAll hit?');

  //console.log(props.whereFrom + ' is props.whereFrom hit?');

 //console.log(props.whereFrom + ' uum wher form?');

    if (props.whereFrom === 181) {
    //console.log('ami hit 181 or 191?');
      return (
      <SeasonPositionSortAll playerData={props.playerData} teamId={props.teamId} seasonId={props.seasonId} whereFrom={79} whereFromPlayer={props.whereFrom} teamPosData={props.teamPosData} navigation={props.navigation} displayTypeSort={false} teamDocData={props.teamDocData} />
      )
    }
    else if (props.whereFrom === 191) {
   //console.log('this hit nowe.');
      return (
      <Text></Text>
      )
      //to do later.
      /*
      return (
      <SeasonPositionSortAll playerData={props.playerData} teamId={props.teamId} seasonId={props.seasonId} whereFrom={79} whereFromPlayer={props.whereFrom} teamPosData={props.teamPosData} navigation={props.navigation} displayTypeSort={false} displayGameOnly={true} />
      )
      */
    }
    else {
      return (
      <SeasonPositionSortAll playerData={props.playerData} teamId={props.teamId} seasonId={props.seasonId} whereFrom={79} whereFromPlayer={props.whereFrom} navigation={props.navigation} displayTypeSort={false} />
      )
    }


    return playerSortDisplay


  }

  const playerStatsCompare = () => {

  //console.log(playerStatsCompare + ' is playerStatsCompare hit?');

  //console.log(props.whereFrom + ' is props.whereFrom hit?');


    if (props.whereFrom === 181 || props.whereFrom === 191) {
    //console.log('ami hit 181 or 191?');
      return (
      <SeasonPositionSort playerData={props.playerData} teamId={props.teamId} seasonId={props.seasonId} whereFrom={79} whereFromPlayer={props.whereFrom} teamPosData={props.teamPosData} navigation={props.navigation} />
      )
    }
    else {
      return (
      <SeasonPositionSort playerData={props.playerData} teamId={props.teamId} seasonId={props.seasonId} whereFrom={79} navigation={props.navigation} />
      )
    }


    return playerSortDisplay


  }

  const playerInfo = () => {

    if (props.whereFrom === 191) {
      //do nothing now...
    }
    else {
      return (
        <Box mt="0" pt="1" pb="3" minW="100%">
          <Heading pt="2" pb="2" style={{color: '#fff'}}>
            Stats: <Heading style={{color: '#fff', fontWeight: '400'}}>{props.playerData.playerName}</Heading>
          </Heading>
          <Text style={{fontWeight: '600', color: '#fff'}}>Team: <Text style={{fontWeight: '300'}}>{props.team} </Text></Text>
          <Text style={{fontWeight: '600', color: '#fff'}}>Season: <Text style={{fontWeight: '300'}}>{props.season}</Text></Text>
        </Box>
      )
    }

  }


  const seasonPositionData = () => {

    if (props.whereFrom === 191) {
      //do nothing now...
    }
    else {
      return (
        <SeasonPositionStats playerData={props.playerData} whereFrom={78} whereFromOriginal={props.whereFrom} navigation={props.navigation} />
      )
    }

  }

  const seasonStatsData = () => {

 //console.log(totalGamesPlayed + ' checking totalGamesPlayed here you know?');

    if (props.whereFrom === 191) {
      //do nothing now...
    }
    else {
      return (
        <SeasonStats playerData={props.playerData} totalGamesPlayed={totalGamesPlayed} whereFrom={78} whereFromOriginal={props.whereFrom} navigation={props.navigation} />
      )
    }

  }

  const individualPlayerEachGameStatsData = () => {

 //console.log(props.gameFullTime + ' props.gameFullTime is on statsHome.');
 //console.log(props.whereFrom + ' and check where From too');
 //console.log(props.whereFrom + ' uum wher form? 2');

    if (props.whereFrom === 191) {
    //console.log(JSON.stringify(props.playerData) + ' props.playerData is?');
      return (
      <IndividualPlayerLiveGameStats playerData={props.playerData} seasonId={props.seasonId} gameFullTime={props.gameFullTime} whereFrom={props.whereFrom}/>
      )
    }
    else if (props.whereFrom === 181) {
      return (
        <IndividualPlayerHomeGameStats playerData={props.playerData} seasonId={props.seasonId} teamDocData={props.teamDocData} whereData={props.whereData} navigation={props.navigation} whereFrom={props.whereFrom} />
      )
    }
    else {
    //console.log(JSON.stringify(props.playerData) + ' props.playerData is 2?');
      return (
        <IndividualPlayerEachGameStats playerData={props.playerData} seasonId={props.seasonId} navigation={props.navigation} />
      )
    }

  }




  //const teamType = props.route.params.teamType

//console.log(getGame + ' what is getGame');

        return (

          <Box ml="5" mr="5" mt="5">
            <ScrollView>
            {props.whereFrom === 191 &&
              <Box>
              {individualPlayerEachGameStatsData()}
              </Box>
            }
            {props.whereFrom !== 191 &&
            <Box>
              <Box alignItems="center" mt="3" shadow="6">
                <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                    <Center>
                      {playerInfo()}
                    </Center>
                  </LinearGradient>
                </ImageBackground>
                </Box>
                <Box alignItems="center" mt="5" shadow="6">
                <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                    <Center>
                      <Box mt="0" pt="1" pb="3" minW="100%">
                      {seasonPositionData()}
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
        </Box>
        }
      <Box alignItems="center" mt="5" shadow="6">
      <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
          <Center>
        {playerStatsCompareAll()}
        </Center>
      </LinearGradient>
    </ImageBackground>
    </Box>
      {props.whereFrom !== 191 &&
        <Box alignItems="center" mt="5" shadow="6">
        <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
            <Center>
              <Box mt="0" pt="1" pb="3" minW="100%">
              {seasonStatsData()}
              </Box>
            </Center>
          </LinearGradient>
        </ImageBackground>
        </Box>
      }
      {props.whereFrom !== 191 &&
        <Box>
        {individualPlayerEachGameStatsData()}
        </Box>
      }
            </ScrollView>
            <View style={[styles.activityIndicatorTest, animateLoading ? styles.activityIndicatorLarge : styles.activityIndicatorNone]}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientLoading}>
                <ActivityIndicator size="large" color="#fff" animating={animateLoading} />
                <Heading style={[styles.activityIndicatorTextTest, animateLoading ? styles.activityIndicatorTextLarge : styles.activityIndicatorTextNone]}>LOADING...</Heading>
              </LinearGradient>
            </View>
      </Box>


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
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradientGameStats: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: '100%',
    marginBottom: 10
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
  },
})

export default IndividualPlayerStatsHome;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={16} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={16} color="#0891b2" />;

//import EventsDisplay from './EventsDisplay.js';
import DisplayScoreHomePlayer from './DisplayScoreHomePlayer.js';
import IndividualPlayerStatsHome from '../PlayerStats/IndividualPlayerStatsHome.js'

import { updateGames } from '../../Reducers/games';

//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const StatsHomePlayer = (props)=>{

  //const [getGame, setGame] = useState([]);
  const [getHalfTime, setHalfTime] = useState([{textOne: '', textTwo: ''}]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamId = props.route.params.teamId
  const getGame = props.route.params.getGame
  const teamId = props.route.params.teamId
  const gameIdDb = props.route.params.gameIdDb

  const { navigate } = props.navigation;


  const backToMenu = () => {

    navigate('HomePlayerLiveScores');

  }

  const goToEvents = () => {

    navigate('EventsHomePlayer', {
      whereFrom: 191,
      //gameIdDb: props.gameIdDb,
      //teamId: props.teamId,
      teamId: teamId,
      gameIdDb: gameIdDb,
    });

  }




  const displayScore = () => {

    try {
    return (
      <DisplayScoreHomePlayer navigation={props.navigation} homeTeamScore={getGame.game.score.homeTeam} awayTeamScore={getGame.game.score.awayTeam} homeTeamShortName={getGame.game.teamNames.homeTeamShortName} awayTeamShortName={getGame.game.teamNames.awayTeamShortName} secondsElapsed={getGame.game.secondsElapsed} halfTimeFlag={getGame.game.halfTime} gameHalfTime={getGame.game.gameHalfTime} />
    )
    }
    catch {
      //do nthing.
    }
  }

  const getIndividualStats = () => {

    try {

      const gameSeason = getGame.game.season.season
      const gameSeasonId = getGame.game.season.id
      const gameFullTimeRaw = getGame.game.gameHalfTime
      const gameFullTime = gameFullTimeRaw * 2
   //console.log(gameSeason + ' gameSeason');
   //console.log(gameSeasonId + ' gameSeasonId');
   //console.log(JSON.stringify(playerUserDataSeasons) + ' playerUserDataSeasons check.');
      let seasonId = gameSeasonId
      /*
      playerUserDataSeasons.seasons.map(season => {
     //console.log(season + ' inseide season');
        if (gameSeason === season.season) {
          seasonId = season.id
        }

      })
      */


   //console.log('jusy land here.');
    let teamPlayerDataArray = []
    let teamPosData = []
 //console.log('jusy land here 1.');
 //console.log(JSON.stringify(playerUserDataPlayers) + ' playerUserDataPlayers here?');
    playerUserDataPlayers.map(player => {
   //console.log('jusy land here 2.');
     //console.log(JSON.stringify(getGame) + ' getGame erte here');
        const teamPlayersLive = getGame.game.teamPlayers
     //console.log(JSON.stringify(teamPlayersLive) + ' teamPlayersLive here aye');
        teamPlayersLive.map(teamPlayer => {
       //console.log(JSON.stringify(teamPlayer) + ' teamPlayer here aye');
       //console.log(JSON.stringify(teamPlayer.playerId) + ' teamPlayer.playerId here aye.');
       //console.log(JSON.stringify(player.playerId) + ' player.playerId here aye..');
          if (teamPlayer.playerId === player.playerId) {
            teamPlayerDataArray.push(teamPlayer)
         //console.log(teamPlayer.postionTimes + ' postionTimes check');
         //console.log(teamPlayer.playerName + ' playerName check');
         //console.log(teamPlayer.playerId + ' playerId check');
            teamPosData.push({postionTimeStats: teamPlayer.postionTimes, playerName: teamPlayer.playerName, playerId: teamPlayer.playerId});
          }
          else {
         //console.log(teamPlayer.playerName + ' hit.');
            teamPosData.push({postionTimeStats: teamPlayer.postionTimes, playerName: teamPlayer.playerName, playerId: teamPlayer.playerId});
          }
        })
    })

 //console.log(JSON.stringify(teamPlayerDataArray) + ' teamPlayerDataArray here aye');
 //console.log(JSON.stringify(teamPosData) + ' teamPosData here aye');
    let playerLiveStatsDisplay = teamPlayerDataArray.map(playerData => {

      return (
        <IndividualPlayerStatsHome navigation={props.navigation} playerData={playerData} team={getGame.game.teamNames.homeTeamName} teamId={getGame.game.teamId} season={getGame.game.season} seasonId={seasonId} whereFrom={props.route.params.whereFrom} teamPosData={teamPosData} gameFullTime={gameFullTime} />
      )

    })

    return playerLiveStatsDisplay
  }
  catch {
    //do nothing..
  }

  }


        return (
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientBg}>
            <Container ml="4" mr="4" minW="90%" maxH="56%" minH="56%">
                <Box mt="5">
                  {displayScore()}
                </Box>

                <ScrollView style={{borderTopColor: '#333', borderTopWidth: 2}} >
                  {getIndividualStats()}

                </ScrollView>






            </Container>



        <HStack>
          <VStack minW="25%" maxW="25%">
            <Box bg="#baf8d8" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: '100%'}}>
              <Button variant="unstyled" onPress={() => backToMenu()}>
                <HStack>
                  <Center pl="2" pt="2">
                    {minusIcon}
                    <Text style={styles.textFourteen}>Back to</Text>
                    <Text style={styles.textFourteen}>Menu</Text>
                  </Center>
                </HStack>
              </Button>
            </Box>
          </VStack>

          <VStack minW="75%" maxW="75%" minH="100%">
            <Box bg="tertiary.100" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: '100%'}}>

              <Button variant="unstyled" onPress={() => goToEvents()}>

                <HStack>
                <Center pt="6">
                  <Text style={{color: '#0891b2', fontSize: 22, textAlign: 'center'}}>{plusIcon} View Live Events</Text>
                  </Center>
                </HStack>

              </Button>

            </Box>
          </VStack>

        </HStack>
      </LinearGradient>

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
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  linearGradientText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  linearGradientBg: {
    minWidth: '100%',
    minHeight: '100%',
  },
  textFourteen: {
    color: '#0891b2',
    fontSize: 14,
    textAlign: 'center',
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

export default StatsHomePlayer;

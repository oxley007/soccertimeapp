import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#E879F9" />;
const minusIcon = <Icon name="minus" size={30} color="#E879F9" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';

import KickOff from './KickOff.js';
import Stopwatch from './Stopwatch.js';
import SelectPlayerList from '../AddPlayers/SelectPlayerList.js'
import GameEventsHtFt from './GameEventsHtFt.js'
import SeasonPositionSortAll from '../PlayerStats/SeasonPositionSortAll.js'

const GameEnds = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getHalf, setHalf] = useState([]);
  const [getHalfTime, setHalfTime] = useState([]);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;

  const saveGame = () => {

    /*
    const teamIdCode = games[0].teamIdCode

    teamPlayers.map(player => {

      if (player.teamId === games[0].teamId) {
        const playerIndex = games[0].teamPlayers.findIndex(x => x.id === player.id);
      //console.log(JSON.stringify(player.stats) + ' check player sats here.');
      //console.log(JSON.stringify(player) + ' check player here.');

      //console.log(JSON.stringify(games[0].teamPlayers) + ' wtf 2 game stats for player here.');
      //console.log(JSON.stringify(games[0].teamPlayers[playerIndex]) + ' wtf game stats for player here.');
      //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].gameStats) + ' game stats for player here.');
      //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].gameStats[0]) + ' game stats[0] for player here.');

        let currentSeason = ''
        if (games[0].season.id === undefined || games[0].season.id === 99999998 || games[0].season.id < 1) {
          currentSeason = seasonsDisplayId
          games[0].season.id = seasonsDisplayId
          games[0].season.season = seasonsDisplay
        }
        else {
          currentSeason = games[0].season.id
        }

        const playerStats = games[0].teamPlayers[playerIndex].gameStats
        //player.stats = [player.stats]
        if (playerStats.length > 0 ) {
        try {
          player.stats.push({gameId: games[0].id, season: currentSeason, stats: playerStats})
        }
        catch {
          player.stats = []
          player.stats.push({gameId: games[0].id, season: currentSeason, stats: playerStats})
        }
        }

        const postionTimes = games[0].teamPlayers[playerIndex].postionTimes
        //player.postionTimeStats = [player.postionTimeStats]
        if (postionTimes.def.length > 0 || postionTimes.fwd.length > 0 || postionTimes.gol.length > 0 || postionTimes.mid.length > 0 || postionTimes.sub.length > 0) {
        if (player.postionTimeStats.length > 0 || player.postionTimeStats !== undefined || player.postionTimeStats !== '') {
          try {
          player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
          }
          catch {
            player.postionTimeStats = []
            player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
          }
        }
        else {
          player.postionTimeStats = []
          player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
        }
        }

        const postionTimeStatsRaw = player.postionTimeStats
        const statsRaw = player.stats
        const playerId = player.playerId

        //need to get teamId and player Id.

     //console.log(teamIdCode + ' waht is teamIdCode?');
     //console.log(playerId + ' waht is playerId?');
     //console.log(JSON.stringify(postionTimeStatsRaw) + ' postionTimeStatsRaw plz');
     //console.log(JSON.stringify(statsRaw) + ' statsRaw plz');

        firestore().collection(teamIdCode).doc(playerId).update({
           postionTimeStats: postionTimeStatsRaw,
           stats: statsRaw
         })

         userRef.doc(playerId).update({
           postionTimeStats: postionTimeStatsRaw,
           stats: statsRaw
           })
           .catch(error => this.setState({ errorMessage: error.message }))

      }

    })

    dispatch(updateTeamPlayers(teamPlayers))

    games[0].halfTime = 5
    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: games[0],
     })

     userRef.doc(gameIdDb).update({
         game: games[0],
       })
       .catch(error => this.setState({ errorMessage: error.message }))
       */



      const gameId = games[0].gameId

      /*const saveOption = props.route.params.saveOption

      if (saveOption === 1) {*/
        navigate('Home',{
          updateHome: gameId
        });
      /*}
      else {

        //const teamIdCodeGames = games[0].teamIdCode
        const gameIdDb = games[0].gameIdDb

        games.shift();

        dispatch(updateGames(games))



        userRef.doc(gameIdDb).update({
            game: games[0],
          })
          .catch(error => console.log(error.message))

        navigate('Home',{
          updateHome: gameId
        });
      }*/

  }

  const goToEvents = () => {

    navigate('EventsHome');

  }

  const setGoalOpenStatus = (isGoalOpen) => {
    setIsGoalOpen(isGoalOpen)
  }

  const displaySeasonPositionSortAll = () => {

      try {
      return (
        <Box ml="5" mr="5" maxW="100%">
          <SeasonPositionSortAll playerData={undefined} teamId={games[0].teamId} seasonId={seasonsDisplayId} whereFrom={79} navigation={props.navigation} displayTypeSort={true} liveGame={true} endGame={true} />
        </Box>
      )
      }
      catch {
        //nothing.
      }
  }



  //const teamType = props.route.params.teamTypesaveOption

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <Box bg="#E879F9" style={{position:'absolute', top: 225, right: 0, height: 'auto',  width: 30, zIndex: 2, elevation: 2, borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
            <Button pt="2" pb="2" p="0" m="0" variant="unstyled" onPress={() => goToEvents()}>
              <Center>
                <HStack>
                    <Text style={{color: '#fff', fontSize: 16}}>E</Text>
                </HStack>
                <HStack>
                    <Text style={{color: '#fff', fontSize: 16}}>V</Text>
                </HStack>
                <HStack>
                    <Text style={{color: '#fff', fontSize: 16}}>E</Text>
                </HStack>
                <HStack>
                    <Text style={{color: '#fff', fontSize: 16}}>N</Text>
                </HStack>
                <HStack>
                    <Text style={{color: '#fff', fontSize: 16}}>T</Text>
                </HStack>
                <HStack>
                    <Text style={{color: '#fff', fontSize: 16}}>S</Text>
                </HStack>
              </Center>
            </Button>
          </Box>
            <Container h="100%" w="100%" maxWidth="100%">
              <Box mt="1">
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  <Heading mb="2" mt="2" style={{color: '#fff'}}>Fulltime Overview & Stats</Heading>
                  </LinearGradient>
                  <HStack>
                    {isGoalOpen === false &&
                      <Button pl="0" pr="0" pt="0" pb="1" variant="unstyled" onPress={() => setGoalOpenStatus(true)}>
                        <HStack>
                          {isGoalOpen ? minusIcon : plusIcon}
                          <Center pl="2">
                            <Text style={{color: '#fff', fontSize: 20}}>SHOW GOALS SCORED</Text>
                          </Center>
                        </HStack>
                      </Button>
                    }
                    {isGoalOpen === true &&
                      <Box style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15}}>
                      <Button pl="0" pr="0" pt="0" pb="1" variant="unstyled" onPress={() => setGoalOpenStatus(false)}>
                      <HStack>
                        {isGoalOpen ? minusIcon : plusIcon}
                        <Center pl="2">
                          <Text style={{color: '#fff', fontSize: 20}}>HIDE GOALS SCORED</Text>
                        </Center>
                      </HStack>
                      </Button>
                      <HStack style={{borderTopWidth: 2, borderTopColor: '#333', borderBottomWidth: 2, borderBottomColor: '#333'}}>
                      <ScrollView style={{maxHeight: 130}}>
                        <GameEventsHtFt />
                      </ScrollView>
                      </HStack>
                      </Box>
                    }
                  </HStack>
              </Box>
              <ScrollView>
              {displaySeasonPositionSortAll()}
              </ScrollView>
              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>
              <HStack alignItems="center" safeAreaBottom p="0" pt="2"  pb="1" shadow={6} >
          <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => saveGame()}>
          <Center>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>Return to Home</Text>
          <Text style={{color: '#333', fontSize: 10}}>(You can revisit all stats from the stats pages)</Text>
          </Center>
          </Button>
                </HStack>
        </Box>
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#fff',
    borderWidth: 1,
  },
  linearGradientBg: {
    minWidth: '100%',
  }
})

export default GameEnds;

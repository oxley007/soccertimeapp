import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={16} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={16} color="#0891b2" />;


import { updateGames } from '../../Reducers/games';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateExitGameFlag } from '../../Reducers/exitGameFlag';
import { updateCheckSort } from '../../Reducers/checkSort';
import { updatePosArray } from '../../Reducers/posArray';

import KickOff from './KickOff.js';
import Stopwatch from './Stopwatch.js';
import GamePlayers from './GamePlayers.js';
import StatsBoard from '../Stats/StatsBoard.js';
import GameStatsLive from '../Stats/GameStatsLive.js';
import FormationBoard from '../FormationBoard/FormationBoard.js'
import GameOptions from './GameOptions.js';
import GameOptionsUndo from './GameOptionsUndo.js';
import SelectPlayersDragDrop from '../SelectPlayers/SelectPlayersDragDrop.tsx'
import SeasonPositionSortAll from '../PlayerStats/SeasonPositionSortAll.js'


import PositionTimes from '../../Util/PositionTimes.js';

const GameHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getHalf, setHalf] = useState([]);
  const [getHalfTime, setHalfTime] = useState(99999999);
  const [getFullTIme, setFullTime] = useState(99999999);
  const [getSecondsElapsed, setSecondsElapsed] = useState(99999999);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getStatsPlayerId, setStatsPlayerId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isGameOptionOpen, setGameOptionIsOpen] = useState(false);
  const [getGameOptionBoardDisplay, setGameOptionBoardDisplay] = useState(false);
  const [getGameExitBoardDisplay, setGameExitBoardDisplay] = useState(false);
  const [getConfirmEvent, setConfirmEvent] = useState(false);
  const [getTeamLength, setTeamLength] = useState(0);


  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let laps = useSelector(state => state.stopwatch.laps)
  let lastClearedIncrementer = useSelector(state => state.stopwatch.lastClearedIncrementer)
  let incrementer = useSelector(state => state.stopwatch.incrementer)
  let avgBall = useSelector(state => state.stopwatch.avgBall)
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let stopTimer = useSelector(state => state.stopwatch.stopTimer)
  let pauseTimer = useSelector(state => state.stopwatch.pauseTimer)
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsPlayerId = useSelector(state => state.statsBoard.playerId)
  let gameOptionBoard = useSelector(state => state.gameOptionBoard.gameOptionBoard)
  let gameOptionBoardPlayerId = useSelector(state => state.gameOptionBoard.playerId)
  let eventDisplayBoard = useSelector(state => state.eventDisplayBoard.eventDisplayBoard)
  let eventDisplayBoardPlayerId = useSelector(state => state.eventDisplayBoard.PlayerId)
  let eventDisplayBoardText = useSelector(state => state.eventDisplayBoard.eventText)
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let exitGameFlag = useSelector(state => state.exitGameFlag.exitGameFlag)
  let posArrayReset = useSelector(state => state.posArray.posArrayReset);
  let checkSort = useSelector(state => state.checkSort.checkSort);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode
  //const fromContinue = props.route.params.fromContinue

  const { navigate } = props.navigation;

  useEffect(() => {

 //console.log('check sort has changed');

    if (checkSort === 0) {
   //console.log('check sort has changed and is 0');
      setHalfTime(99999999)
      setFullTime(99999999)
      setSecondsElapsed(99999998)
    }

  },[checkSort])


  useEffect(() => {

    const gameHalfTime = games[0].gameHalfTime
    const gameHalfTimePlusOne = gameHalfTime + 1
    const gameFullTime = gameHalfTime * 2
    const gameFullTimePlusOne = gameFullTime + 1

    setHalfTime(gameHalfTime)
    setFullTime(gameFullTime)
    setSecondsElapsed(secondsElapsed)
 //console.log(getSecondsElapsed + ' what is getSecondsElapsed');
 //console.log(getFullTIme + ' what is getFullTIme');


  },[sixtySecondsMark])


  useEffect(() => {

  //console.log(statsBoard + ' hit and check statsBoard');
    /*if (statsBoard === false) {
    setTimeout(function(){
      setStatsBoardDisplay(statsBoard)
      setStatsPlayerId(statsPlayerId)
    }, 1000);
  }
  else {
  */
    setStatsBoardDisplay(statsBoard)
    setStatsPlayerId(statsPlayerId)
  //}

    //setGameOptionBoardDisplay(gameOptionBoard)

  },[statsBoard, statsPlayerId])

  useEffect(() => {

  setTimeout(function(){
    dispatch(updateEventDisplayBoard(false, 0, ''))
  }, 5000);

    //setGameOptionBoardDisplay(gameOptionBoard)

  },[eventDisplayBoard, eventDisplayBoardPlayerId])

  useEffect(() => {

  //console.log(gameOptionBoard + ' hit and check gameOptionBoard');
    setGameOptionBoardDisplay(gameOptionBoard, gameOptionBoardPlayerId)


  },[gameOptionBoard, gameOptionBoardPlayerId])

  useEffect(() => {

    let gameLengthTemp = 0
    try {
      if (games[0].halfTime < 5) {
        gameLengthTemp = games[0].teamPlayers.length

      }
      else {
        gameLengthTemp = 0
      }
    }
    catch {
      gameLengthTemp = 0
    }

    setTeamLength(gameLengthTemp)

  },[])





  const substitutePlayers = () => {

    navigate('SubstitutionHome',
  {
    whereFrom: 9
  });

  }

  const halftimeButton = () => {

    games[0].halfTime = 2
    games[0].gameEvents.push({eventType: 'ht', eventText: 'Half-Time', eventTime: secondsElapsed})

    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: games[0],
     })

    navigate('SubstitutionHome', {
      whereFrom: 'HT'
    });

  }

  const fulltimeButton = () => {

    /*
    games[0].halfTime = 4
    games[0].gameEvents.push({eventType: 'ft', eventText: 'fulltime', eventTime: secondsElapsed})

    games[0].teamPlayers.map(player => {

    //console.log(JSON.stringify(player) + ' check player before functions Home.');
      const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed);
      const positionTimesSaveFirst = positionTimesSave[0];

    //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst Home');
      player = positionTimesSaveFirst
    //console.log(JSON.stringify(player) + ' now check player after update. Home');

    })

    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: games[0],
     })

     */

     const teamIdCode = games[0].teamIdCode

     teamPlayers.map(player => {

       if (player.teamId === games[0].teamId) {
         const playerIndex = games[0].teamPlayers.findIndex(x => x.id === player.id);
         const currentPos = games[0].teamPlayers[playerIndex].currentPosition

         if (currentPos !== 'abs') {
         //console.log(JSON.stringify(player.stats) + ' check player sats here.');
         //console.log(JSON.stringify(player) + ' check player here.');

         //console.log(JSON.stringify(games[0].teamPlayers) + ' wtf 2 game stats for player here.');
         //console.log(JSON.stringify(games[0].teamPlayers[playerIndex]) + ' wtf game stats for player here.');
         //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].gameStats) + ' game stats for player here.');
         //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].gameStats[0]) + ' game stats[0] for player here.');

           let currentSeason = ''
           let currentSeasonName = ''
           if (games[0].season.id === undefined || games[0].season.id === 99999998 || games[0].season.id < 1) {
             currentSeason = seasonsDisplayId
             games[0].season.id = seasonsDisplayId
             games[0].season.season = seasonsDisplay
           }
           else {
             currentSeason = games[0].season.id
             currentSeasonName = games[0].season.season
           }

           const playerStats = games[0].teamPlayers[playerIndex].gameStats
           //player.stats = [player.stats]
           if (playerStats.length > 0 ) {
           try {
             player.stats.push({gameId: games[0].id, season: currentSeason, seasonName: currentSeasonName, stats: playerStats})
           }
           catch {
             player.stats = []
             player.stats.push({gameId: games[0].id, season: currentSeason, seasonName: currentSeasonName, stats: playerStats})
           }
           }

           const postionTimes = games[0].teamPlayers[playerIndex].postionTimes
           //player.postionTimeStats = [player.postionTimeStats]
           if (postionTimes.def.length > 0 || postionTimes.fwd.length > 0 || postionTimes.gol.length > 0 || postionTimes.mid.length > 0 || postionTimes.sub.length > 0) {
           if (player.postionTimeStats.length > 0 || player.postionTimeStats !== undefined || player.postionTimeStats !== '') {
             try {
             player.postionTimeStats.push({gameId: games[0].id, season: currentSeason,  seasonName: currentSeasonName, posTimes: postionTimes})
             }
             catch {
               player.postionTimeStats = []
               player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, seasonName: currentSeasonName, posTimes: postionTimes})
             }
           }
           else {
             player.postionTimeStats = []
             player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, seasonName: currentSeasonName, posTimes: postionTimes})
           }
           }

           const postionTimeStatsRaw = player.postionTimeStats
           const statsRaw = player.stats
           const playerId = player.playerId

           let timeIndex = 0
           let timeCount = 0
           postionTimeStatsRaw.map(time => {
             if (time.gameId === games[0].id) {
               if (timeCount > 0) {
                  postionTimeStatsRaw.splice(timeIndex, 1); // 2nd parameter means remove one item only
               }
               timeCount++
             }
             else {
               timeCount = 0
             }
             timeIndex++
           })

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
       }



     })

     dispatch(updateTeamPlayers(teamPlayers))

     games[0].halfTime = 5
     const gameHalfTimeTime = games[0].gameHalfTime
     //const fullTimeSeconds = gameHalfTimeTime * 2
     const fullTimeSeconds = gameHalfTimeTime / 60
     games[0].sixtySecondsMark = fullTimeSeconds
     dispatch(updateGames(games))

     const teammIndex = teamNames.findIndex(x => x.teamId === games[0].teamIdCode);

     let gameIds = teamNames[teammIndex].gameIds
     const teamId = games[0].teamIdCode
     const gameIdDbNew = games[0].gameIdDb
     //const teamId = games[0].teamId
     const seasonIdNew = games[0].season.id
     const seasonNameNew = games[0].season.season
     const homeTeamName = games[0].teamNames.homeTeamName
     const awayTeamName = games[0].teamNames.awayTeamName
     const homeTeamShortName = games[0].teamNames.homeTeamShortName
     const awayTeamShortName = games[0].teamNames.awayTeamShortName
     const homeTeamScore = games[0].score.homeTeam
     const awayTeamScore = games[0].score.awayTeam
     const gameDate = games[0].gameDate

     const awayTeamId = games[0].teamNames.awayTeamId
     const gameId = games[0].id


     //const gameIdData = {gameIdDb: gameIdDbNew, status: 5}
     const gameIdData = {gameIdDb: gameIdDbNew, status: 5, teamId: teamId, gameId: gameId, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: homeTeamScore, awayTeamScore: awayTeamScore, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew}}

     //gameIds.push(gameIdData)
     gameIds[gameIds.length-1] = gameIdData;

  //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');

     teamNames[teammIndex].gameIds = gameIds

     //const gameIdsFb = [gameIds]

  //console.log(JSON.stringify(teamNames[teammIndex].gameIds) + ' etf teamNames.gameIds hah?');

     dispatch(updateTeamNames(teamNames))

  //console.log(teamId + ' teamId check here thnks.');
  //console.log(teamId + ' teamId check here thnks.');
  //console.log(JSON.stringify(gameIds[0]) + ' gameIds[0] check here thnks.');
  //console.log(JSON.stringify(gameIds) + ' gameIds check here thnks.');

     /*
     let gamesIdStore = []
     games.map(game => {

       if (teamNames[teammIndex].teamId === teamId) {
        const gameIdStore = {gameIdDb: game.gameIdDb, status: game.halfTime, teamId: game.teamNames.homeTeamId, gameId: game.id, seasonId: game.season.id, gameData: {homeTeamName: game.teamNames.homeTeamName, awayTeamName: game.teamNames.awayTeamName, homeTeamShort: game.teamNames.homeTeamShortName, awayTeamShort: game.teamNames.awayTeamShortName, homeTeamScore: game.score.homeTeam, awayTeamScore: game.score.awayTeam, gameDate: game.gameDate, gameHalfTime: game.gameHalfTime, awayTeamId: game.teamNames.awayTeamId}, season: {season: game.season.season, id: game.season.id}}
      }

         gamesIdStore.push(gamesIdStore)
         //gameIds[gameIds.length-1] = gameIdData;

     })

  //console.log(JSON.stringify(gameIds) + ' checl gameIds');
  //console.log(JSON.stringify(gamesIdStore) + ' checl gamesIdStore');
     */

     firestore().collection(teamId).doc(teamId).update({
       gameIds: gameIds
     })
     .catch(error => console.log(error.message))

      /*
      firestore()
        .collection(teamId)
        .doc(teamId)
        .update({
          gameIds: gameIds,
        })
        .then(() => {
       //console.log('Team updated!');
        });
        */

     const teamIdCodeGames = games[0].teamIdCode
     const gameIdDb = games[0].gameIdDb

  //console.log(JSON.stringify(games[0]) + ' games[0] check here thnks.');
  //console.log(teamIdCodeGames + ' teamIdCodeGames check here thnks.');
  //console.log(gameIdDb + ' gameIdDb check here thnks.');

     firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
        game: games[0],
      })
      .catch(error => console.log(error.message))

   //console.log(gameIdDb + ' gameIdDb?');

      userRef.doc(gameIdDb).update({
          game: games[0],
        })
        .catch(error => console.log(error.message))

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
        //dispatch(updatePosArray([], []))
        setHalfTime(99999999)
        setFullTime(99999999)
        setSecondsElapsed(99999999)

    navigate('GameEnds');

  }

  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
    dispatch(updateGameOptionBoard(false, 0))
    dispatch(updateStatsBoard(false, 99999999))
  }

  const setGameOptionsOpenStatus = (isGameOptionOpen) => {

  //console.log('are we hitting? setGameOptionBoardDisplay(gameOptionBoard)');
    setGameOptionIsOpen(isGameOptionOpen)
    setGameOptionBoardDisplay(isGameOptionOpen)
    dispatch(updateGameOptionBoard(isGameOptionOpen, 0))
    dispatch(updateStatsBoard(false, 99999999))
  }

  const goToEvents = () => {

    navigate('EventsHome');

  }

  const editTime = () => {

    navigate('EditGameTime');

  }

  const exitWihtoutSaving = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

 //console.log(games[0].halfTime + ' games[0].halfTime chekcy plessz');
    if (games[0].halfTime < 5) {
      _games.shift();

      dispatch(updateGames(_games))
      dispatch(updateExitGameFlag(false))

      const teammIndex = teamNames.findIndex(x => x.teamId === games[0].teamIdCode);
      let gameIds = teamNames[teammIndex].gameIds

      //let gameIds = []
   //console.log(gameIds + ' gameIds what?');
      const teamId = games[0].teamIdCode
      const gameIdDbNew = games[0].gameIdDb
      const homeTeamName = games[0].teamNames.homeTeamName
      const awayTeamName = games[0].teamNames.awayTeamName
      const homeTeamShortName = games[0].teamNames.homeTeamShortName
      const awayTeamShortName = games[0].teamNames.awayTeamShortName
      const awayTeamId = games[0].teamNames.awayTeamId
      const gameDate = games[0].gameDate
      const gameHalfTimeTime = games[0].gameHalfTime
      const gameIdNew = games[0].id
      const seasonIdNew = games[0].season.id
      const seasonNameNew = games[0].season.season

      const gameIdData = {gameIdDb: gameIdDbNew, status: 0, teamId: teamId, gameId: gameIdNew, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: 0, awayTeamScore: 0, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew}}


      //gameIds.push(gameIdData)
      gameIds[gameIds.length-1] = gameIdData;

   //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');

      teamNames[teammIndex].gameIds = gameIds

        /*
   //console.log(JSON.stringify(gameIdData) + ' etf gameIds hah?');


      games.map(game => {
     //console.log(game.gameIdDb + ' game.gameIdDb');
     //console.log(gameIdDbNew + ' gameIdDbNew');
        if (game.gameIdDb === gameIdDbNew) {
          gameIds.push(gameIdData)
        }
        else {
       //console.log(game.teamIdCode + ' game.teamIdCode');
       //console.log(game.halfTime + ' game.halfTime');
       //console.log(JSON.stringify(game) + ' need to find statsu game.');
          if (game.teamIdCode === undefined || game.teamIdCode === null || game.teamIdCode === '' || game.halfTime === undefined || game.halfTime === null || game.halfTime === '' && game.halfTime > 0) {
            // do nothing.
           }
           else if (teamNames[teammIndex].teamId === teamId) {
             const gameTeamIdCode = game.teamIdCode
             const gameHalfTime = game.halfTime
          //console.log(gameTeamIdCode + ' gameTeamIdCode');
          //console.log(gameHalfTime + ' gameHalfTime hey hey');

          //console.log(game.gameIdDb + ' game.gameIdDb');
          //console.log(game.status + ' game.status');
          //console.log(game.teamId + 'game.teamId');
          //console.log(game.id + ' game.id');
          //console.log(game.season.id + ' game.season.id');
          //console.log(game.teamNames.homeTeamName + ' game.teamNames.homeTeamName');
          //console.log(game.teamNames.awayTeamName + ' game.teamNames.awayTeamName');
          //console.log(game.teamNames.homeTeamShortName + ' game.teamNames.homeTeamShortName');
          //console.log(game.teamNames.awayTeamShortName + ' game.teamNames.awayTeamShortName');
          //console.log(game.teamNames.awayTeamShortName + ' game.teamNames.awayTeamShortName');
          //console.log(game.score.homeTeam + ' game.score.homeTeam');
          //console.log(game.score.awayTeam + ' game.score.awayTeam');
          //console.log(game.gameDate + ' game.gameDate');
          //console.log(game.gameHalfTime + ' game.gameHalfTime');
          //console.log(game.teamNames.awayTeamId + ' game.teamNames.awayTeamId');
          //console.log();
          //console.log();
          //console.log();


            gameIds.push({gameIdDb: game.gameIdDb, status: game.halfTime, teamId: game.teamId, gameId: game.id, seasonId: game.season.id, gameData: {homeTeamName: game.teamNames.homeTeamName, awayTeamName: game.teamNames.awayTeamName, homeTeamShort: game.teamNames.homeTeamShortName, awayTeamShort: game.teamNames.awayTeamShortName, homeTeamScore: game.score.homeTeam, awayTeamScore: game.score.awayTeam, gameDate: game.gameDate, gameHalfTime: game.gameHalfTime, awayTeamId: game.teamNames.awayTeamId}, season: {season: game.season.season, id: game.season.id}})
           }
          }
      })
      */

      //teamNames[teammIndex] = gameIdData

      //const gameIdsFb = [gameIds]

   //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');
      //

      firestore().collection(teamId).doc(teamId).update({
        gameIds: gameIds
      })
      .catch(error => console.log(error.message))

       /*
       firestore()
         .collection(teamId)
         .doc(teamId)
         .update({
           gameIds: gameIds,
         })
         .then(() => {
        //console.log('Team updated!');
         });
         */

      const teamIdCodeGames = games[0].teamIdCode
      const gameIdDb = games[0].gameIdDb

   //console.log(JSON.stringify(games[0]) + ' games[0] check here thnks.');
   //console.log(teamIdCodeGames + ' teamIdCodeGames check here thnks.');
   //console.log(gameIdDb + ' gameIdDb check here thnks.');

      firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
         game: games[0],
       })
       .catch(error => console.log(error.message))

    }


    const gameId = games[0].gameId

    dispatch(updateCheckSort(0))
    setHalfTime(99999999)
    setFullTime(99999999)
    setSecondsElapsed(99999999)

    navigate('Home',{
      updateHome: gameId
    });

  }

  //const teamType = props.route.params.teamType

  const checkTesting = () => {
 //console.log(getTeamLength + ' need to check getTeamLength');
 //console.log(games[0].gameSetup + ' need to check games[0].gameSetup');
 console.log(getFullTIme + ' getFullTIme check.');
  }

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientBg}>
            <Container h="100%" w="100%" maxWidth="100%">
              <KickOff navigation={props.navigation} fromContinue={props.route.params.fromContinue} optionFrom={getGameExitBoardDisplay} />
              {checkTesting()}
              {getSecondsElapsed >= getFullTIme &&
                <Box pl="3" pr="3" pt="4" pb="4" bg="#333">
                <Center>
              <Text style={{color: "#fff", fontSize: 22, marginBottom: 20}}>Tap "Full-Time" to save game data and review game stats!</Text>
              <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => fulltimeButton()}>Full-Time! (Save Game Data)</Button>
              </Center>
              <Button minW="100%" bg="transparent" size="sm" _text={{fontSize: "sm", color: '#ccc', textDecorationLine: "underline"}} variant="subtle" onPress={() => exitWihtoutSaving()}>Exit game without saving</Button>
                </Box>
              }
              <ScrollView>
              {getTeamLength > 0 && games[0].gameSetup === false &&
                  <SelectPlayersDragDrop navigation={props.navigation} whereFrom={1} />
              }
                <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, borderTopColor: '#aaa', borderTopWidth: 3, marginTop: 3}}>
                  <HStack>
                    <Text style={{paddingLeft: 25, fontSize: 12, paddingBottom: 15, color: '#ddd'}}>Team ID: {games[0].teamIdCode}</Text>
                  </HStack>
                </Box>
                {getStatsBoardDisplay === true &&
                  <PresenceTransition visible={getStatsBoardDisplay} initial={{
                  opacity: 0
                  }} animate={{
                  opacity: 1,
                  transition: {
                    duration: 250
                  }
                  }}>
                  <Center style={{position:'absolute', left: 0, bottom: 0, right: 0, height: 'auto'}} bg="tertiary.400" pl="0" mt="7" rounded="lg" minW="100%" _text={{
                    color: "white"
                  }} shadow="9" shadowOffset="-20">
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#22d3ee', '#a855f7']} style={styles.linearGradient}>

                  </LinearGradient>
                </Center>
              </PresenceTransition>
            }
        </ScrollView>
        {eventDisplayBoard === true &&
          <PresenceTransition visible={eventDisplayBoard} initial={{
          opacity: 0
          }} animate={{
          opacity: 1,
          transition: {
            duration: 250
          }
          }}
          >
            <Center style={{position:'absolute', bottom: 20, height: 'auto', width: '50%', left: '25%'}} pl="0" mt="7" rounded="lg" minW="100%" _text={{
            color: "white"
            }} shadow="9" shadowOffset="-20">
            <Center>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#d1fae5', '#34d399']} style={styles.linearGradientEventBoard}>
                <Text >{eventDisplayBoardText}</Text>
              </LinearGradient>
              </Center>
            </Center>
          </PresenceTransition>
          }
          <PresenceTransition visible={getGameOptionBoardDisplay} initial={{
            opacity: 0
            }} animate={{
            opacity: 1,
            transition: {
              duration: 250
            }
            }}
            style={{zIndex: 3, elevation: 3 }}
          >
            <Center style={{position:'absolute', left: 0, top: -220, right: 0, bottom: 0, height: 220, zIndex: 3, elevation: 3 }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="300" _text={{
            color: "white"
          }}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#baf8d8', '#34d399']} style={styles.linearGradientSquare}>
            <Text style={{color: '#777', fontWeight: '500', fontSize: 14, paddingTop: 3}}>(this will add a goal to the opposition's score)</Text>
              <GameOptions navigation={props.navigation} optionFrom={'goalGame'} />

              <HStack mt={4}>
                <Box ml="0" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>
                <Box minW="22%" ml="3">
                  <Text style={{color: '#fff', fontWeight: '500', fontSize: 14}}>Own Goal</Text>
                </Box>
                <Box mr="3" minW="63%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                </Box>

              </HStack>
              <Text style={{color: '#777', fontWeight: '500', fontSize: 14, paddingTop: 3}}>(this will add a goal to your team's score)</Text>
              <GameOptionsUndo />

              <HStack>
                <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(false)}>
                  <Text style={{textAlign: 'right', color: '#666', textDecorationLine: "underline"}}>Hide</Text>
                </Button>
              </HStack>
          </LinearGradient>
            </Center>
          </PresenceTransition>

          <PresenceTransition visible={getGameExitBoardDisplay} initial={{
            opacity: 0
            }} animate={{
            opacity: 1,
            transition: {
              duration: 250
            }
            }}
            style={{zIndex: 3, elevation: 3 }}
          >
            <Center style={{position:'absolute', left: 0, top: -200, right: 0, bottom: 0, height: 200, zIndex: 3, elevation: 3 }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="200" _text={{
            color: "white"
          }}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#baf8d8', '#34d399']} style={styles.linearGradientSquare}>
              <GameOptions navigation={props.navigation} optionFrom={'exitGame'}/>
              <HStack>
                <Button variant="unstyled" onPress={() => dispatch(updateExitGameFlag(false))}>
                  <Text style={{textAlign: 'right', color: '#666', textDecorationLine: "underline"}}>Hide</Text>
                </Button>
              </HStack>
          </LinearGradient>
            </Center>
          </PresenceTransition>

          <HStack>
            <VStack minW="33%" maxW="33%">

        <Box bg="#baf8d8" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 100}}>



        {getGameOptionBoardDisplay === false &&
          <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(true)}>
            <HStack >
            <Center pl="2">
              {getGameOptionBoardDisplay ? minusIcon : plusIcon}
              <Text style={styles.textFourteen}>Opposition</Text>
              <Text style={styles.textFourteen}>Goal/Own Goal</Text>
              </Center>
            </HStack>
          </Button>
        }
        {getGameOptionBoardDisplay === true &&
          <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(false)}>
          <HStack>
            <Center pl="2">
            {getGameOptionBoardDisplay ? minusIcon : plusIcon}
            <Text style={styles.textFourteen}>Opposition</Text>
            <Text style={styles.textFourteen}>Goal/Own Goal</Text>
            </Center>
          </HStack>
          </Button>

        }


        </Box>
        </VStack>
        <VStack minW="33%" maxW="33%">
        <Box bg="tertiary.100" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 100}}>




          <Button variant="unstyled" onPress={() => goToEvents()}>
            <HStack >
            <Center pl="2">
              {plusIcon}
              <Text style={styles.textFourteen}>View Game</Text>
              <Text style={styles.textFourteen}>Events</Text>
              </Center>
            </HStack>
          </Button>


        </Box>
        </VStack>

        <VStack minW="33%" maxW="33%">
        <Box bg="#e8fdf2" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 100}}>



        {exitGameFlag === false &&
          <Button variant="unstyled" onPress={() => dispatch(updateExitGameFlag(true))}>
            <HStack >
            <Center pl="2">
              {exitGameFlag ? minusIcon : plusIcon}
              <Text style={styles.textFourteen}>Game</Text>
              <Text style={styles.textFourteen}>Options</Text>
              </Center>
            </HStack>
          </Button>
        }
        {exitGameFlag === true &&
          <Button variant="unstyled" onPress={() => dispatch(updateExitGameFlag(false))}>
          <HStack>
            <Center pl="2">
            {exitGameFlag ? minusIcon : plusIcon}
            <Text style={styles.textFourteen}>Game</Text>
            <Text style={styles.textFourteen}>Options</Text>
            </Center>
          </HStack>
          </Button>

        }


        </Box>
        </VStack>
        </HStack>


    </Container>
    </LinearGradient>
  </Center>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  insideContainer: {
    flex: 1,
    //width: '100%',
    height: '100%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: '100%',
  },
  linearGradientSquare: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  linearGradientEventBoard: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    //marginLeft: 25,
    //marginRight: 25',
    width: '100%',
  },
  linearGradientBg: {
    minWidth: '100%',
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

export default GameHome;

/*
{games[0].firstHalf === false && games[0].secondHalf === false && games[0].halfTime === 0 &&
<Box style={{position:'absolute', left: 0, top: 0, right: 0, height: '100%', zIndex: 3, elevation: 3, backgroundColor: 'rgba(20,20,20,0.7)', justifyContent: 'center' }} bg="#333" p="0" mt="0" pl="8" pr="8" minW="100%" h="300" shadow="9" _text={{color: "white"
}}>
  <Text style={{color: "#fff", fontSize: 22, marginBottom: 10}}>When you're ready -</Text>
  <Text style={{color: "#fff", fontSize: 22, marginBottom: 20}}>tap "Kick Off" to start the timer!</Text>
  <KickOff />

</Box>
}
*/


//<KickOff navigation={props.navigation} fromContinue={props.route.params.fromContinue} />


/* Events option on left of screen:

<Box bg="#a855f7" style={{position:'absolute', top: 225, right: 0, height: 'auto',  width: 30, zIndex: 2, elevation: 2, borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
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

*/


/* button to start second half (been replaced for button on KickOff.js)

{secondsElapsed >= getHalfTime && games[0].halfTime <1 &&
  <Box bg="fuchsia.400" style={{borderTopWidth: 1, borderTopColor: '#999', borderBottomWidth: 1, borderBottomColor: '#999', justifyContent: 'center' }}>
    <Button minW="100%" bg="tertiary.100" size="md" _text={{fontSize: "xl", color: '#0891b2'}} variant="subtle" onPress={() => halftimeButton()}>Half Time (tap to start 2nd half)</Button>
  </Box>
}


*/

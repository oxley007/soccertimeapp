import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, Clipboard, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const doubleright = <Icon name="doubleright" size={20} color="#333" />;
const doubleleft = <Icon name="doubleleft" size={20} color="#333" />;
import LinearGradient from 'react-native-linear-gradient';
const plusIcon = <Icon name="plus" size={16} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={16} color="#0891b2" />;
const plusIconWhite = <Icon name="plus" size={16} color="#fff" />;
const minusIconWhite = <Icon name="minus" size={16} color="#fff" />;
const trayArrowUp = <IconMaterialCommunityIcons name="tray-arrow-up" size={26} color="#000" />;
const trayArrowDown = <IconMaterialCommunityIcons name="tray-arrow-down" size={26} color="#000" />;
import SoccerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const feildIcon = <SoccerIcon name="soccer" size={20} color="#ccc" />;
const handPointingDownIcon = <SoccerIcon name="hand-pointing-down" size={20} color="#fff" />;
const trophyIcon = <FaIcon name="trophy" size={16} color="#E879F9" />;
const cogIcon = <FaIcon name="cog" size={16} color="#ccc" />;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const handPointer = <FontAwesome name="hand-o-down" size={14} color="#fff" />;
const arrowsAltIcon = <FontAwesome name="arrows-alt" size={14} color="#fff" />;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const handPointDown = <FontAwesome5 name="hand-point-down" size={14} color="#fff" />;



import SeasonPositionSortAll from './SeasonPositionSortAll.js'
import SelectPlayersDragDrop from '../SelectPlayers/SelectPlayersDragDrop.tsx'
import KickOff from '../Game/KickOff.js';
import GameOptions from '../Game/GameOptions.js';
import GameOptionsUndo from '../Game/GameOptionsUndo.js';

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
import { updateGameBoardHideBtn } from '../../Reducers/gameBoardHideBtn';


const SeasonPositionSortAllHome = (props)=>{

  //const [getTeam, setGetTeam] = useState([]);
  const [getTeamLength, setTeamLength] = useState(0);
  const [getHideBtn, setHideBtn] = useState(0);
  const [getGameExitBoardDisplay, setGameExitBoardDisplay] = useState(false);
  const [getSecondsElapsed, setSecondsElapsed] = useState(99999999);
  const [getFullTIme, setFullTime] = useState(99999999);
  const [getHalf, setHalf] = useState([]);
  const [getHalfTime, setHalfTime] = useState(99999999);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getStatsPlayerId, setStatsPlayerId] = useState(0);
  const [getGameOptionBoardDisplay, setGameOptionBoardDisplay] = useState(false);
  const [isGameOptionOpen, setGameOptionIsOpen] = useState(false);
  const [getCopyDisplay, setCopyDisplay] = useState(false);
  const [getCopyAlert, setCopyAlert] = useState(false);

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
  let gameBoardHideBtn = useSelector(state => state.gameBoardHideBtn.gameBoardHideBtn);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;

  let posArray = []

  try {
      posArray = props.route.params.posArray
  }
  catch {
    //do nthing.
  }

  const anim = useRef(new Animated.Value(1));


  /*
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
  */

  useEffect(() => {

    showReminderAlert()

  },[])


  useEffect(() => {

    let gameLengthTemp = 0
    try {
      if (games[0].halfTime < 5) {
        gameLengthTemp = games[0].teamPlayers.length

      }
      else {
        gameLengthTemp = 1
      }
    }
    catch {
      gameLengthTemp = 1
    }

    setTeamLength(gameLengthTemp)

  },[checkSort])

  /* GameHome useEffects:*/

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

    dispatch(updateGameBoardHideBtn(0))

  },[])

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.1,
          duration: 1000,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1000,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.074,
          duration: 1000,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1000,
        }),
      ])
    ).start();
  }, [gameBoardHideBtn]);



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
        //dispatch(updatePosArray([], []))updateGameBoardHideBtn
        setHalfTime(99999999)
        setFullTime(99999999)
        setSecondsElapsed(99999999)

    navigate('GameEnds');

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



      firestore().collection(teamId).doc(teamId).update({
        gameIds: gameIds
      })
      .catch(error => console.log(error.message))




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

  const setGameOptionsOpenStatus = (isGameOptionOpen) => {

  //console.log('are we hitting? setGameOptionBoardDisplay(gameOptionBoard)');
    setGameOptionIsOpen(isGameOptionOpen)
    setGameOptionBoardDisplay(isGameOptionOpen)
    dispatch(updateGameOptionBoard(isGameOptionOpen, 0))
    dispatch(updateStatsBoard(false, 99999999))
  }

  const backButton = () => {

    const checkSortNew = checkSort + 3
    dispatch(updateCheckSort(checkSortNew))

    if (props.route.params.whereFrom === 7) {
      navigate('AddPlayersHome', {
        teamId: games[0].teamId,
        teamIdCode: games[0].teamIdCode,
        whereFrom: 7,
      });
    }
    else {

      navigate('GameHome', {
        fromContinue: 0,
      });
    }

  }

  const hideBtn = () => {

    //console.log('hit gameBoardHideBtn ' + gameBoardHideBtn);

    if (gameBoardHideBtn === 0) {
        //setHideBtn(1)
        dispatch(updateGameBoardHideBtn(1))
        //setGameOptionBoardDisplay(true, gameOptionBoardPlayerId)
    }
    else {
      //setHideBtn(0)
      dispatch(updateGameBoardHideBtn(0))
      //setGameOptionBoardDisplay(false, gameOptionBoardPlayerId)
    }

  }

  const dragDropView = () => {

    if (checkSort > 1) {
   //console.log(getTeamLength + ' check getTeamLength');
   //console.log(props.route.params.whereFrom + ' check props.route.params.whereFrom for dragdrop');

      if (props.route.params.whereFrom === 7 && getTeamLength > 0) {
     //console.log('hitting here 1 ok');
        return (

            <View style={{position:'absolute', bottom: 0}}>
              <Box>
              <Button minW="100%" bg="tertiary.400" variant="unstyled" onPress={() => hideBtn()}>
                <HStack >
                  {gameBoardHideBtn === 0 &&
                    <Text style={{color: '#333', fontSize: 14, lineHeight: 0, textAlign: 'flex-start'}}>{trayArrowDown} Close Field Box</Text>
                  }
                  {gameBoardHideBtn === 1 &&
                    <Text style={{color: '#333', fontSize: 14, lineHeight: 0, textAlign: 'flex-start'}}>{trayArrowUp} Open Field Box</Text>
                  }
                </HStack>
              </Button>
              </Box>

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
                    <Text >Hi Test plz!</Text>
                  </LinearGradient>
                  </Center>
                </Center>
              </PresenceTransition>
                <SelectPlayersDragDrop navigation={props.navigation} whereFrom={7} isOpen={1} teamId={games[0].teamId} sortPage={true} posArray={posArray} checkSortLive={props.route.params.checkSortLive} showNewScreen={props.route.params.showNewScreen} hideBtn={getHideBtn} gameOptionBoardDisplay={getGameOptionBoardDisplay}/>



            </View>

        )
      }
      else if (getTeamLength > 0 && checkSort > 0) {
     //console.log('hitting here 2 ok');
        return (
            <View style={{position:'absolute', bottom: 70, backgroundColor: '#000', borderTopLeftRadius: 15, borderTopRightRadius: 15,
              shadowColor: '#fff',
              shadowOffset: {
                width: 3,
                height: 2,
              },
              shadowOpacity: 0.7,
              shadowRadius: 30,
            }}>
            <Box>
            {gameBoardHideBtn === 0 &&
              <Box>
            <Button minW="100%" bg="rba" variant="unstyled" style={{alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 1, paddingBottom: 1}} onPress={() => hideBtn()}>

                  <Box>
                  <HStack style={{backgroundColor: '#000', minWidth: '100%'}}>
                  <Text style={{color: '#fff', fontSize: 16}}>X <Text style={{textDecorationLine: "underline", color: '#E879F9'}}>Hide</Text> to view a full list of game stats</Text>
                  </HStack>
                  </Box>
                  </Button>
                  <Center>
                  <Box bg="#333" maxW="95%" minW="95%" style={{paddingTop: 2, paddingBottom: 2, borderRadius: 5, marginTop: 5, marginBottom: 5}}>
      						      <HStack >

      						<Text style={{color: '#fff', fontSize: 18, textAlign: 'left', marginLeft: 15, marginRight: 15}}>{arrowsAltIcon} Drag Player/Substitues Into Position</Text>

      						</HStack>
      						</Box>
                  </Center>
                  </Box>
                }
                {gameBoardHideBtn === 1 &&

                  <Button minW="100%" bg="#000" variant="unstyled" style={{alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 1, paddingBottom: 1}} onPress={() => hideBtn()}>
                  <HStack>
                    <Animated.View style={{ transform: [{ scale: anim.current }] }}>
                      <Text style={styles.openText}>{plusIconWhite} <Text style={{textDecorationLine: "underline", color: '#E879F9'}}>Open</Text> to Substitute Players</Text>
                    </Animated.View>
                  </HStack>
                  </Button>

                }
            </Box>
              <SelectPlayersDragDrop navigation={props.navigation} whereFrom={1} sortPage={true} posArray={posArray} hideBtn={getHideBtn}/>
              {eventDisplayBoard === true &&
                <PresenceTransition visible={eventDisplayBoard} initial={{
                opacity: 0
                }} animate={{
                opacity: 1,
                transition: {
                  duration: 250
                }
                }}
                style={{zIndex: 300, elevation: 300}}
                >
                  <Center style={{position:'absolute', bottom: 200, height: 'auto', width: '50%', left: '25%', zIndex: 300, elevation: 300}} pl="0" mt="7" rounded="lg" minW="100%" _text={{
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
            </View>
        )
      }
    }



  }

  const gameOptionsFunc = () => {

    dispatch(updateExitGameFlag(true))
    dispatch(updateGameBoardHideBtn(1))

  }

  const gameOptionsFuncOpen = () => {

    dispatch(updateExitGameFlag(false))
    dispatch(updateGameBoardHideBtn(0))

  }

  const goToEvents = () => {

    navigate('EventsHome');

  }

  const showReminderAlert = () => {

    let inviteCount = 0
    teamPlayers.map(player => {
      if (player.inviteStatus === 1) {
        inviteCount++
      }
    })

    if (secondsElapsed === 0) {
      Alert.alert(
      'RECOMMENDED!',
      "We recommend sending a reminder to parents and supporters, letting them know that live scores and events are now available for viewing. Tap 'Copy Invite' to copy the app download instructions to your clipboard and paste into your team group chat.",
      [
        {text: 'Copy Invite', onPress: () => {

          getTeamInvite();

        }},
        {
          text: 'Cancel',
          onPress: () => {

         //console.log('cancel.');

          }
        },
      ],
      {cancelable: true},
      );

      //setCopyAlert(true)
    }

  }


  const getTeamInvite = () => {

    const teamPlayerData = props.playerData
    games[0].teamId

    let teamNamesAndCodeArray = []
    let teamIdCodeGames = 0
    teamPlayers.map(player => {
      if (player.teamId === games[0].teamId) {
        //const playerIndex = teamPlayers.findIndex(x => x.id === player.id);
        //need to create varigable for:
        teamIdCodeGames = player.teamIdCode
        const playerId = player.playerId
        const playerName = player.playerName
        const fullNameSplit = playerName.split(' ')
        const firstName = fullNameSplit[0]

        /*
        if (player.inviteStatus < 1) {
            player.inviteStatus = 1
            userRef.doc(playerId).update({
                inviteStatus: 1,
              })
              .catch(error => this.setState({ errorMessage: error.message }))


              firestore().collection(teamIdCodeGames).doc(playerId).update({
                 inviteStatus: 1
               })
        }
        */

        teamNamesAndCodeArray.push({teamIdCodeGames: teamIdCodeGames, playerId: playerId, playerName: playerName, fullNameSplit: fullNameSplit, firstName: firstName})
      }
    })

    //console.log(JSON.stringify(teamNamesAndCodeArray) + ' teamNamesAndCodeArray check. here.');

    //const teamName = //(nice to have. If to tricky, don't worry.)
    const teamIndex = teamNames.findIndex(x => x.teamId === teamIdCodeGames);

    const teamNameDisplayRaw = teamNames[teamIndex].teamName


    const teamNameDisplaySplitted = teamNameDisplayRaw.split(" ");
 //console.log(teamNameDisplaySplitted + ' teamNameDisplaySplitted');
    const teamNameDisplay = teamNameDisplayRaw
    /*
    if (Platform.OS === 'ios') {
      teamNameDisplay = teamNameDisplayRaw
    }
    else {
      teamNameDisplaySplitted.map(word => {
        teamNameDisplay = teamNameDisplay + word + "%20"
      })
    }
    */
    //const teamNameDisplay = teamNameDisplaySplitted[0] + "%20" +

 //console.log(teamNameDisplay + ' what is teamNameDisplay?');



 //console.log(JSON.stringify(teamPlayers[playerIndex]) + ' check teamPlayers[playerIndex] here to see what i need.');


    //dispatch(updateTeamPlayers(teamPlayers))

    /*
    let inviteSentNew = inviteSent

    inviteSentNew = inviteSentNew + 1
    setSetInviteSent(inviteSentNew)
    */

    /*
    const testName = "Andrew Oxley"
    const bodyVariable = `mailto:?subject=Quote&body=I%20would%20like%20to%20accept%20this%20quote&body=Hi%20%7B${testName}%7D%2C%0A%0AThis%20season`

    Linking.openURL(bodyVariable)
    */

    //const testName = "Andrew"

    let playerNameCodeString = ''
    teamNamesAndCodeArray.map(playerNameCode => {
      playerNameCodeString = playerNameCodeString + "'\n'" +
      playerNameCode.playerName + ": " + playerNameCode.playerId
    })

    //const playerNameCodeStringFinal = playerNameCodeString.replace(/['']/g, "");
    const playerNameCodeStringFinal = playerNameCodeString.replace(/'/g, '');

    //console.log(playerNameCodeStringFinal + ' playerNameCodeStringFinal is what?');

      Clipboard.setString(
        `Hi Team,
        \nThis season our team will be using the SoccerTime Live App that allows you to view live scores & events during the game!
        \nYou can now open the app and view today's game LIVE!
        \nIf you haven't yet downloaded the app, please follow the steps below:
        \nDownload the app from your app store:
        \n•	iPhone/iPad: https://apps.apple.com/app/id6450653830
        \n•	Android: https://play.google.com/store/apps/details?id=com.soccertimeapp
        \n1.	Open the app on your device\n2.	On the first screen, tap "Player or Parent"\n3.	Enter our Team ID: ${teamIdCodeGames}\n4.	Enter your Player ID (the five-digit number below):
        ${playerNameCodeStringFinal}
        \nYou’ll now be able to view player stats, total game-time played, and live scores during the game!
        \nFeel free to share this message with any friends or family who’d like to follow our live scores. Just have them enter the Team ID (${teamIdCodeGames}) in the SoccerTime app to see the scores.
        \nIf you have any questions, let me know.
        \nEnjoy!
`);



    //test adding a variable to email url link:
    /*
    const testName = "Andrew Oxley"
    Linking.openURL(`mailto:?subject=Quote&body=I%20would%20like%20to%20accept%20this%20quote&body=Hi%20%7B${testName}%7D%2C%0A%0AThis%20season`)
    */
    setCopyDisplay(true)

    setTimeout(function(){
      //console.log(copyDisplayBoard + ' copyDisplayBoard on click invite 1!')
      setCopyDisplay(false)
    }, 3000);

  }

  const getReminderInvite = () => {

    Clipboard.setString(
      `Hi Team,
      \nThis season our team will be using the SoccerTime Live App that allows you to view live scores & events during the game!
      \nYou can now open the app and view todays game LIVE!
      \nPlease follow the below instructions:
      \n1. Open the "SoccerTimeLive" app on your device\n2. On the first screen tap "Live Scores"\n3. Once the game kicks off, tap 'View live events'
      \nIf you havn't received the player invite to view live scores, please DM me and I'll send the invite directly to you.
      \nEnjoy the game!`);

      setCopyDisplay(true)

      setTimeout(function(){
        //console.log(copyDisplayBoard + ' copyDisplayBoard on click invite 1!')
        setCopyDisplay(false)
      }, 3000);

  }

  const getDisplayCopied = () => {
    return (
      <Box style={{zIndex: 300, elevation: 300, minWidth: '100%'}}>
      {getCopyDisplay === true &&
        <PresenceTransition visible={getCopyDisplay} initial={{
        opacity: 0
        }} animate={{
        opacity: 1,
        transition: {
          duration: 250
        }
        }}
        >
        <Box>
          <Center style={{position:'absolute', top: 100, height: 'auto'}} mt="2" rounded="lg" minW="100%" _text={{
          color: "white"
          }} shadow="9" shadowOffset="-20">
            <Center>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#d1fae5', '#34d399']} style={styles.linearGradientEventBoardCopy}>
                <Text style={{color: '#000'}}>Team Reminder Copied to Clipboard</Text>
              </LinearGradient>
            </Center>
          </Center>
          </Box>
        </PresenceTransition>
        }
        </Box>
    )
  }

  const getLeftMenuOptionDisplay = () => {


        return (
        <Box bg="#000" style={{zIndex: 3, elevation: 3, minHeight: 150}}>
        {getGameOptionBoardDisplay === false &&
          <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(true)}>
            <HStack >
            <Center pl="2">
              {getGameOptionBoardDisplay ? minusIcon : feildIcon}
              <Text style={styles.textBottomMenu}>Goal Options</Text>
              </Center>
            </HStack>
          </Button>
        }
        {getGameOptionBoardDisplay === true &&
          <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(false)}>
          <HStack>
            <Center pl="2">
            {getGameOptionBoardDisplay ? minusIcon : feildIcon}
            <Text style={styles.textBottomMenu}>Goal Options</Text>
            </Center>
          </HStack>
          </Button>
        }
        </Box>
      )

  }

        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="0" style={{top: 15}} >
                  {getDisplayCopied()}
                  {getSecondsElapsed >= getFullTIme &&
                    <Box pl="3" pr="3" pt="20" pb="4" bg="#000">
                    <Animated.View style={{ transform: [{ scale: anim.current }] }}>
                    <Center>
                  <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => fulltimeButton()}>Full-Time! (And Save Game Data)</Button>
                  </Center>
                  </Animated.View>
                  <Button minW="100%" bg="transparent" size="sm" _text={{fontSize: "md", color: '#E879F9', textDecorationLine: "underline"}} variant="subtle" onPress={() => exitWihtoutSaving()}>Exit game without saving</Button>
                    </Box>
                  }
                  <KickOff navigation={props.navigation} fromContinue={props.route.params.fromContinue} optionFrom={getGameExitBoardDisplay} />



                  <ScrollView style={{paddingLeft: 5, paddingRight: 5, marginTop: 35}}>

                    <SeasonPositionSortAll playerData={undefined} teamId={games[0].teamId} seasonId={seasonsDisplayId} whereFrom={79} navigation={props.navigation} displayTypeSort={true} liveGame={true} whereFrom={props.route.params.whereFrom} />


                  </ScrollView>



                </Container>
                  {dragDropView()}
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
                    <Center style={{position: 'absolute',  bottom: 0, left: '-50%', bottom: 0, height: 280, zIndex: 3, elevation: 3 }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="300" _text={{
                    color: "white"
                  }}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#333', '#333']} style={styles.linearGradientSquare}>
                  <HStack mt={4}>
                    <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                    </Box>
                    <Box minW="22%" ml="3">
                      <Text style={{color: '#fff', fontWeight: '500', fontSize: 14}}>Add Opposition Goal</Text>
                    </Box>
                    <Box mr="8" ml="5" minW="40%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                    </Box>

                  </HStack>
                    <Text style={{color: '#fff', fontWeight: '500', fontSize: 14, paddingTop: 3}}>(this will add a goal to the opposition's score)</Text>
                      <GameOptions navigation={props.navigation} optionFrom={'goalGame'} />

                      <HStack mt={4}>
                        <Box ml="0" minW="10%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                        </Box>
                        <Box minW="22%" ml="3" mr="3">
                          <Text style={{color: '#fff', fontWeight: '500', fontSize: 14}}>Add Own Goal (by opposition player)</Text>
                        </Box>
                        <Box mr="3" minW="13%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                        </Box>

                      </HStack>
                      <Text style={{color: '#fff', fontWeight: '500', fontSize: 14, paddingTop: 3}}>(this will add a goal to your team's score)</Text>
                      <GameOptionsUndo />

                      <HStack>
                        <Button variant="unstyled" onPress={() => setGameOptionsOpenStatus(false)}>
                          <Text style={{textAlign: 'right', color: '#E879F9', textDecorationLine: "underline"}}>Hide</Text>
                        </Button>
                      </HStack>
                  </LinearGradient>
                    </Center>
                  </PresenceTransition>

                  <PresenceTransition visible={getGameExitBoardDisplay} initial={{
                    opacity: 0
                    }} animate={{
                    opacity: 0,
                    transition: {
                      duration: 250
                    }
                    }}
                    style={{zIndex: 3, elevation: 3, backgroundColor: '#000' }}
                  >
                    <Center style={{position:'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, elevation: 3, backgroundColor: '#000' }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="200" _text={{
                    color: "white"
                  }}>

                      <GameOptions navigation={props.navigation} optionFrom={'exitGame'}/>
                      <HStack>
                        <Button variant="unstyled" onPress={() => dispatch(updateExitGameFlag(false))}>
                          <Text style={{textAlign: 'right', color: '#666', textDecorationLine: "underline"}}>Hide</Text>
                        </Button>
                      </HStack>

                    </Center>
                  </PresenceTransition>
                  <HStack style={{backgroundColor: '#000'}}>
                    <VStack minW="33.3%" maxW="33.3%" >
                      {getLeftMenuOptionDisplay()}

                </VStack>
                <VStack minW="33.3%" maxW="33.3%">
                <Box bg="tertiary.100" style={{zIndex: 3, elevation: 3, minHeight: 150,}}>





                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradientLive}>
                  <Button variant="unstyled" onPress={() => goToEvents()}>
                    <HStack >
                    <Center>
                      {trophyIcon}
                      <Text style={styles.textLiveScore}>Live Scores</Text>
                      </Center>
                    </HStack>
                  </Button>
                  </LinearGradient>





                </Box>
                </VStack>

                <VStack minW="33.3%" maxW="33.3%">
                <Box bg="#000" style={{zIndex: 3, elevation: 3, minHeight: 150}}>



                {exitGameFlag === false &&
                  <Button variant="unstyled" onPress={() => gameOptionsFunc()}>
                    <HStack >
                    <Center pl="2">
                      {exitGameFlag ? cogIcon : cogIcon}
                      <Text style={styles.textBottomMenu}>Options</Text>
                      </Center>
                    </HStack>
                  </Button>
                }
                {exitGameFlag === true &&
                  <Button variant="unstyled" onPress={() => gameOptionsFuncOpen()}>
                  <HStack>
                    <Center pl="2">
                    {exitGameFlag ? cogIcon : cogIcon}
                    <Text style={styles.textBottomMenu}>Options</Text>
                    </Center>
                  </HStack>
                  </Button>

                }


                </Box>
                </VStack>
                </HStack>
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
  linearGradientBg: {
    minWidth: '100%',
    paddingTop: '7.5%',
    //marginLeft: 50
  },
  screenshotImage: {
    maxWidth: '100%',
    resizeMode: 'contain',
    flex: 1
    //marginBottom: 50
  },
  instructionBoxTop: {
    position: 'absolute', top: '25%', zIndex: 1, backgroundColor: '#fff', padding: 25, minWidth: '100%'
  },
  instructionBoxBottom: {
    position: 'absolute', bottom: 0, zIndex: 1, backgroundColor: '#fff', padding: 15, minWidth: '100%'
  },
  linearGradientAdd: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
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
  backgroundImageLive: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    //height: 150,
    borderColor: '#aaa',
    overflow: 'hidden'
  },
  textLiveScore: {
    color: '#E879F9',
    fontSize: 14
  },
  linearGradientLive: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textBottomMenu: {
    color: '#ccc',
    fontSize: 14,
  },
  linearGradientEventBoardCopy: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    //marginLeft: 25,
    //marginRight: 25',
    width: '100%',
  },
  openText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 18,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
})

export default SeasonPositionSortAllHome;

/*
<Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, paddingBottom: 50}}>
<HStack>
<VStack>
  <Box bg="tertiary.400" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 100}}>
    <Button minW="100%" bg="tertiary.400" variant="unstyled" onPress={() => backButton()}>
      <HStack>
        <Center>
          <Text style={{color: '#333', fontSize: 30, lineHeight: 0, textAlign: 'center'}}>{doubleleft} Back</Text>
        </Center>
      </HStack>
    </Button>
  </Box>
</VStack>
</HStack>
</Box>
*/

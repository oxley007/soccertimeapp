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
const arrowsAltIcon = <FontAwesome name="arrows-alt" size={14} color="#E879F9" />;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const handPointDown = <FontAwesome5 name="hand-point-down" size={14} color="#fff" />;
const saveTick = <IconMaterialCommunityIcons name="clipboard-check" size={26} color="#E879F9" />;
const editClipboard = <IconMaterialCommunityIcons name="clipboard-edit" size={26} color="#fff" />;
const deleteClipboard = <IconMaterialCommunityIcons name="clipboard-remove" size={26} color="#fff" />;



import { getGamesDataOnce } from '../../Util/getGamesDataOnce.js';


import SeasonPositionSortAll from './SeasonPositionSortAll.js'
import SelectPlayersDragDrop from '../SelectPlayers/SelectPlayersDragDrop.tsx'
import KickOff from '../Game/KickOff.js';
import GameOptions from '../Game/GameOptions.js';
import GameOptionsUndo from '../Game/GameOptionsUndo.js';
import DisplayScoreHomePlayer from '../Events/DisplayScoreHomePlayer.js';
import AssignPlayerPositions from '../AddAiPositions/AssignPlayerPositions.js'

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
import { updateExitGameFlagOptions } from '../../Reducers/exitGameFlagOptions';
import { updatePlayerIndex } from '../../Reducers/playerIndex';
import { updateEventsVersion } from '../../Reducers/eventsVersion';

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
  const [getGameDataForKo, setGameDataForKo] = useState([]);
  const [hasDifferentId, setHasDifferentId] = useState(false);
	const [idArray, setIdArray] = useState([]);
  const [getGameSetupProfile, setGameSetupProfile] = useState(true);




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
  let exitGameFlagOptions = useSelector(state => state.exitGameFlagOptions.exitGameFlagOptions);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  const parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);
  let eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);
  let fromContinueGame = useSelector(state => state.fromContinueGame.fromContinueGame);

  const dispatch = useDispatch()

  const { currentUser } = auth()
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

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60)


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

    setGameSetupProfile(true)

  },[])

  try {
    useEffect(() => {

      console.log('HITTIN GEEXER?');
      getLatetGameDb()

    },[eventsVersion, games[0].score.homeTeam, games[0].score.awayTeam])
  }
   catch {
     useEffect(() => {

       getLatetGameDb()

     },[eventsVersion])
   }


try {
     useEffect(() => {

       getAvgTimePerPlayer()

     },[sixtySecondsMark, games[0].halfTime, props.fromContinue])
   }
    catch {
      useEffect(() => {

        getAvgTimePerPlayer()

      },[sixtySecondsMark])
    }


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
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
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
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
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

    Alert.alert(
    'Save Game Data?',
    "Do you want to save player stats and game data?",
    [
      {text: 'Yes', onPress: () => {

        setGameSetupProfile(false)
        fulltimeButtonSave(1)

      }},
      {
        text: 'No',
        onPress: () => {
          setGameSetupProfile(false)
          fulltimeButtonSave(0)

        }
      },
    ],
    {cancelable: true},
    );

  }

  const fulltimeButtonSave = (saveOption) => {

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

     dispatch(updateExitGameFlag(false))
     dispatch(updateGameBoardHideBtn(0))
     dispatch(updateExitGameFlagOptions(false))
     dispatch(updatePlayerIndex(true))

     const teamIdCode = games[0].teamIdCode
     const gameId = games[0].id

     if (saveOption === 1) {

       teamPlayers.map(player => {

         if (player.teamId === games[0].teamId) {
           const playerIndex = games[0].teamPlayers.findIndex(x => x.id === player.id);
           //console.log('check player ' + JSON.stringify(games[0].teamPlayers[playerIndex]));
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
     //games[1].gameComplete = true
     games[0].gameComplete = true
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
     //const gameId = games[0].id


     //const gameIdData = {gameIdDb: gameIdDbNew, status: 5}
     const gameIdData = {gameIdDb: gameIdDbNew, status: 5, teamId: teamId, gameId: gameId, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: homeTeamScore, awayTeamScore: awayTeamScore, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew, gameComplete: true}}

     //gameIds.push(gameIdData)
     gameIds[gameIds.length-1] = gameIdData;

  //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');

     teamNames[teammIndex].gameIds = gameIds

     //const gameIdsFb = [gameIds]

  //console.log(JSON.stringify(teamNames[teammIndex].gameIds) + ' etf teamNames.gameIds hah?');

    if (saveOption === 1) {
     dispatch(updateTeamNames(teamNames))
    }

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

     if (saveOption === 1) {
       firestore().collection(teamId).doc(teamId).update({
         gameIds: gameIds
       })
       .catch(error => console.log(error.message))
    }

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

  if (saveOption === 1) {
     firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
        game: games[0],
      })
      .catch(error => console.log(error.message))

      userRef.doc(gameIdDb).update({
          game: games[0],
        })
        .catch(error => this.setState({ errorMessage: error.message }))

    }
  }
  else {


    const gameIdDbTemp = games[0].gameIdDb

    /*
    const gameRemove = games.filter((item) => item.gameIdDb !== gameIdDbTemp);
    dispatch(updateGames(gameRemove))
    */

    //games.shift();
    //dispatch(updateGames(games))

    games[0].halfTime = 6
    const gameHalfTimeTime = games[0].gameHalfTime
    //const fullTimeSeconds = gameHalfTimeTime * 2
    const fullTimeSeconds = gameHalfTimeTime / 60
    games[0].sixtySecondsMark = fullTimeSeconds
    //games[1].gameComplete = true
    games[0].gameComplete = true
    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

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
    //const gameId = games[0].id

    const gameIdData = {gameIdDb: gameIdDbNew, status: 6, teamId: teamId, gameId: gameId, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: homeTeamScore, awayTeamScore: awayTeamScore, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew, gameComplete: true}}

    //gameIds.push(gameIdData)
    gameIds[gameIds.length-1] = gameIdData;


      firestore().collection(teamId).doc(teamId).update({
        gameIds: gameIds
      })
      .catch(error => console.log(error.message))


    try {
      firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
         game: games[0],
       })
       .catch(error => console.log(error.message))

       userRef.doc(gameIdDb).update({
           game: games[0],
         })
         .catch(error => this.setState({ errorMessage: error.message }))

    }
    catch {
      //do nothing.
    }
  }

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
        dispatch(updatePosArray([], []))
        dispatch(updateEventsVersion(0));
        //dispatch(updatePosArray([], []))updateGameBoardHideBtn
        setHalfTime(99999999)
        setFullTime(99999999)
        setSecondsElapsed(99999999)


        if (saveOption === 1) {
    navigate('GameEnds', {
      saveOption: saveOption
    });
  }
  else {
    navigate('Home',{
      updateHome: gameId
    });
  }

  }

  const exitWihtoutSaving = () => {

    /*
    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }
    */

 //console.log(games[0].halfTime + ' games[0].halfTime chekcy plessz');
    if (games[0].halfTime < 5) {
      games.shift();

      dispatch(updateGames(games))
      dispatch(updateExitGameFlag(false))

      const teammIndex = teamNames.findIndex(x => x.teamId === games[0].teamIdCode);

      let gameIds = []
      try {
        gameIds = teamNames[teammIndex].gameIds
      }
      catch {
        gameIds = []
      }

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

      try {
      teamNames[teammIndex].gameIds = gameIds



        firestore().collection(teamId).doc(teamId).update({
          gameIds: gameIds
        })
        .catch(error => console.log(error.message))
      }
      catch {
        //do nothing.
      }




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
    setSecondsElapsed(0)


    navigate('Home',{
      updateHome: gameId
    });



    //navigate('GameEnds');


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

  const displayMsgEndOfGameNotSaved = () => {

		try {

			if (userProfile === 4 && games[0].halfTime === 4) {
				return (
          <Box style={styles.userProfileFourMessages}>
					   <Text style={{fontSize: 18, color: '#fff', marginLeft: 15}}>Game complete! Please ensure the coach saves the data on their phone so player stats are recorded.</Text>
          </Box>
				)
			}
			else if (userProfile === 4 && games[0].halfTime === 5) {
        return (
  				<Box style={styles.userProfileFourMessages}>
  					<Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>Game complete! Coach has saved data and player stats have been recorded.</Text>
  					<Button minW="100%" bg="#E879F9" size="md" mt="2.5" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => exitToHome()}>
  						<Center>
  							<Text style={{color: '#fff', fontSize: 20}}>Go back to home screen</Text>
  						</Center>
  					</Button>
  				</Box>
        )
			}
			else if (userProfile === 4 && games[0].halfTime === 0) {
        return (
          <Box style={styles.userProfileFourMessages}>
					     <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>Sub management is ready! Feel free to positoin your team. When it's time to kick off, please make sure the coach taps ‘Kick-off’ on their phone to start the timer.</Text>
          </Box>
        )

			}
			else if (userProfile === 4 && games[0].halfTime === 2) {
        return (
          <Box style={styles.userProfileFourMessages}>
					    <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>Half-time! When the second half is ready to begin, please have the coach tap ‘Kick-off Second Half’ on their phone to restart the timer.</Text>
          </Box>
        )

			}
		}
		catch {
			//nothing.
		}
	}

  const dragDropView = () => {

    /*
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
     */


     let gameHalfTimeCheck = 0
     if (!games[0]) {
       gameHalfTimeCheck = 5
     }
     else {
       gameHalfTimeCheck = games[0].halfTime
     }


        return (
            <View style={{backgroundColor: '#000'}}>
            <Box style={{paddingBottom: 5}}>
      				<Text style={{color: '#fff', fontSize: 16, textAlign: 'left', marginLeft: 15, marginRight: 15}}>{arrowsAltIcon}  Drag Player/Substitues Into Position</Text>
              {displayMsgEndOfGameNotSaved()}
            </Box>
              {gameHalfTimeCheck < 5 &&
              <SelectPlayersDragDrop navigation={props.navigation} whereFrom={1} sortPage={true} posArray={posArray} hideBtn={getHideBtn} fromContinue={props.route.params.fromContinue} />
              }
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
      //}
    //}



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

    if (secondsElapsed === 0 && fromContinueGame !== 0) {
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
    //const teamIndex = teamNames.findIndex(x => x.teamId === teamIdCodeGames);

    //const teamNameDisplayRaw = teamNames[teamIndex].teamName


    //const teamNameDisplaySplitted = teamNameDisplayRaw.split(" ");
 //console.log(teamNameDisplaySplitted + ' teamNameDisplaySplitted');
    //const teamNameDisplay = teamNameDisplayRaw
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
                <Text style={{color: '#000'}}>Team Invite Copied to Clipboard</Text>
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

  const finishButtonHide = () => {

      dispatch(updateExitGameFlagOptions(false))

  }

  const getLatetGameDb = async () => {

    const gameIdDbNew = games[0].gameIdDb

    let gameData = []
    let gameDataReverse = []
    try {

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

      //console.log(' doe s this show 2 top');
      //console.log(userRefId + ' now it hsould display.!');

      const data = await getGamesDataOnce(userRefId); // <-- replace collection name
      //console.log(' doe s this show 3 top');

      //setPosts(data);
   //console.log('getting here aye?');
   //console.log(' doe s this show 4 top');

      data.map(game => {
        //console.log(' doe s this show 5 top');
     //console.log(JSON.stringify(game) + ' what do we have in here?');

        try {
          //console.log(' doe s this show 5.5 top');
          if (game.game.isGame === true) {
            //console.log(game.game.id + ' game id t4esting only');
            //console.log(' doe s this show 6 top');
            gameData.push(game.game)
           }
         }
         catch {
           //console.log(' doe s this show 7 top');
         }


       })
       //console.log(' doe s this show 8 top');

     const gameDataIdOrder = gameData.sort((a, b) => a.id - b.id);
     gameDataReverse = gameDataIdOrder.reverse();
    }
    catch {
      //console.log('issue with the above top useEffect');
    }

    //console.log('gameDataReverse nedd another cheky doo 1 ' + JSON.stringify(gameDataReverse));

    //return gameDataReverse
    setGameDataForKo(gameDataReverse)

  }

  const checkAndStoreId = (newId) => {
    setIdArray(prevArray => {
      if (prevArray.length === 0) {
        return [newId];
      }

      if (!prevArray.includes(newId)) {
        setHasDifferentId(true);
      }

      return [...prevArray, newId];
    });
  };

  const calculateSubTiming = (x: number, z: number, y: number) => {

    /*
    x = gameTimeFull
    z = matchFormat
    y = teamPlayersLength
    */

    if (y <= z) {
      return {
        x,
        playerPlayTime: x,
        playBlocks: 1,
        x,
      };
    }
    else {

      console.log(x + ' inside x');
      const totalPlayTime = x * z; // total player-minutes
      console.log(totalPlayTime + ' totalPlayTime inside');
      const tenPercentRoundedUp = Math.ceil(y * 0.1);
      const yPlusTenPercent = y + tenPercentRoundedUp
      const playerPlayTime = totalPlayTime / yPlusTenPercent;
      console.log(playerPlayTime + ' inside playerPlayTime')
      console.log(z + ' inside z');
      console.log(y + ' inside y');
      //const playBlocks = Math.floor(playerPlayTime / z); // round down playBlocks



      const playersRemainder = y % z;

      console.log(playersRemainder + ' what is playersRemainder??');
      let playBlocks = 0
      if (playersRemainder === 1) {
        playBlocks = z
        playBlocks = playBlocks + 1
      }
      else if (playersRemainder === 2) {
        playBlocks = z / 2
        playBlocks = Math.ceil(playBlocks)
        playBlocks = playBlocks + 1
      }
      else if (z % 2 === 0) {
        playBlocks = 5
        playBlocks = playBlocks + 1
      }
      else {
        playBlocks = 6
        playBlocks = playBlocks + 1
      }

      //let playBlocks = Math.ceil(playerPlayTime / z); // round up playBlocks
      console.log(playBlocks + ' playBlocks z');
      console.log(playerPlayTime + ' inside playerPlayTime 2')

      let minutesPerBlock = Math.ceil(x / playBlocks); // Round up

      /*
      const halfTimeCheck = x / 2
      console.log(halfTimeCheck + ' halfTimeCheck');
      console.log(minutesPerBlock + ' minutesPerBlock');
      if (halfTimeCheck <= playerPlayTime) {
        minutesPerBlock = minutesPerBlock / y
      }
      */

      const playerPlayTimeRound = Number(playerPlayTime.toFixed(2))
      const playerPlayTimeDisplay = Math.floor(playerPlayTimeRound)

      return {
        totalPlayTime,
        playerPlayTime: playerPlayTimeDisplay,
        playBlocks: Number(playBlocks.toFixed(2)),
        minutesPerBlock,
        playersRemainder,
      };
    }
  };

  const getAvgTimePerPlayer = () => {

    let _games = []
    try {
      _games = [...games]
    } catch {
      _games = [{ ...games }]
    }

    const gameHalfTimeTemp = _games[0].gameHalfTime
    const matchFormat = _games[0].matchFormat

    if (gameHalfTimeTemp !== 0 && matchFormat !== 0) {
      const gameTimeFullRaw = gameHalfTimeTemp * 2
      const gameTimeFull = formattedSeconds(gameTimeFullRaw)
      //const gameTimeFullRaw = gameHalfTimeTemp * 2
      // Keep gameTimeFullRaw as a number — not formatted!
      let teamPlayersLength = _games[0].teamPlayers.length
      let playerAbsCount = 0

      try {
        _games[0].teamPlayers.forEach(player => {
          if (player.currentPosition === 'abs') {
            playerAbsCount += 1
          }
        })
      } catch {
        // Do nothing if teamPlayers is malformed
      }


      // Subtract 1 if there's a dedicated goalie
      if (_games[0].dedicatedGoalie === 1 && teamPlayersLength > matchFormat) {
        teamPlayersLength -= 1
      }


      // Now remove absent players
      teamPlayersLength -= playerAbsCount


      let result;

      if (teamPlayersLength <= matchFormat) {
        result = {
          totalPlayTime: gameTimeFullRaw,
          playerPlayTime: gameHalfTimeTemp * 2,
          playBlocks: 1,
          minutesPerBlock: gameHalfTimeTemp * 2,
          playersRemainder: 0,
        }
      } else {

        result = calculateSubTiming(gameTimeFullRaw, matchFormat, teamPlayersLength)
      }


      // ✅ Safe Redux updates (only if values have changed)
      let shouldUpdate = false

      if (_games[0].avgTimePerPlayer !== result.playerPlayTime) {
        _games[0].avgTimePerPlayer = result.playerPlayTime
        shouldUpdate = true
      }

      if (_games[0].aiSubTime !== result.minutesPerBlock) {
        _games[0].aiSubTime = result.minutesPerBlock
        shouldUpdate = true
      }

      if (_games[0].playersRemainder !== result.playersRemainder) {
        _games[0].playersRemainder = result.playersRemainder
        shouldUpdate = true
      }

      if (shouldUpdate) {
        eventsVersion = eventsVersion + 1

        // Use updated _games copy everywhere
        dispatch(updateGames(_games))
        dispatch(updateEventsVersion(eventsVersion))

        if (_games[0].teamPlayers && _games[0].teamPlayers.length > 0) {
          const teamIdCodeGames = _games[0].teamIdCode
          const gameIdDb = _games[0].gameIdDb

          // Update Firestore doc with entire updated game object, merging fields
          firestore()
            .collection(teamIdCodeGames)
            .doc(gameIdDb)
            .set({ game: _games[0] }, { merge: true })
            //.set(_games[0], { merge: true })

          // Update userRef if path is correct (check this!)
          userRef
            .doc(gameIdDb)
            .set({ game: _games[0] }, { merge: true })
            //.set(_games[0], { merge: true })
        }
      }

    }


      /*
    console.log('getAvgTimePerPlayer is hit yo!');
      const gameHalfTimeTemp = games[0].gameHalfTime
      const matchFormat = games[0].matchFormat

      const gameTimeFullRaw = gameHalfTimeTemp * 2
			console.log(gameTimeFullRaw + ' this is going to be large?');
			const gameTimeFull = formattedSeconds(gameTimeFullRaw)
			console.log(gameTimeFull + ' this is going to be large 2?');
      const matchFormatMinusGoalie = matchFormat

      let playerAbsCount = 0
			let playerGoalieCount = 0
      try {
        games[0].teamPlayers.map(player => {
          if (player.currentPosition === 'abs') {
            playerAbsCount = playerAbsCount + 1
          }
        })
      }
      catch {
        //nothing.
      }
			console.log(playerAbsCount + ' playerAbsCount');
			console.log(playerAbsCount + ' playerGoalieCount');


      if (games[0].dedicatedGoalie === 1) {
          playerGoalieCount = 1
          //teamPlayersLengthMinusGoalie = teamPlayersLength - 1
      }

      let teamPlayersLength = 0
      try {
        teamPlayersLength = games[0].teamPlayers.length
      }
      catch {
        teamPlayersLength = 0
      }

      let teamPlayersLengthMinusGoalie = teamPlayersLength - playerGoalieCount
			teamPlayersLengthMinusGoalie = teamPlayersLengthMinusGoalie - playerAbsCount
			console.log(teamPlayersLengthMinusGoalie + ' teamPlayersLengthMinusGoalie');
      const playerMinutes = gameTimeFull * matchFormatMinusGoalie
      let avgTimePerPlayerRaw = playerMinutes / teamPlayersLengthMinusGoalie

			console.log(avgTimePerPlayerRaw + ' avgTimePerPlayerRaw here now');

			//avgTimePerPlayerRaw = Math.round(avgTimePerPlayerRaw * 100) / 100;

			//const avgTimePerPlayer = formattedSeconds(avgTimePerPlayerRaw)
			const avgTimePerPlayer = Math.round(avgTimePerPlayerRaw);

			console.log(avgTimePerPlayer + ' avgTimePerPlayer?? whats going on?');


      const result = calculateSubTiming(gameTimeFull, matchFormat, teamPlayersLengthMinusGoalie );

      console.log("Total Play Time:", result.totalPlayTime);
      console.log("Player Play Time:", result.playerPlayTime);
      console.log("Play Blocks:", result.playBlocks);
      console.log("Minutes Per Block (rounded):", result.minutesPerBlock);
      console.log("Players Remainder:", result.playersRemainder);


      try {
        games[0].avgTimePerPlayer = result.playerPlayTime
        games[0].aiSubTime = result.minutesPerBlock
        games[0].playersRemainder = result.playersRemainder
      }
      catch {
        console.log('game[0] doenst have that info');
      }


			eventsVersion = eventsVersion + 1
      dispatch(updateGames(games))
			dispatch(updateEventsVersion(eventsVersion))


      if (!games[0].teamPlayers) {
        //do nothing.
      }
      else {
        const teamIdCodeGames = games[0].teamIdCode
        const gameIdDb = games[0].gameIdDb
        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: games[0],
         })

        userRef.doc(gameIdDb).update({ game: games[0] });
      }
      */




  }


  const checkOptionsAssistant = () => {


    try {
      if (!games[0]) {
        //do nothoing
      }
      else {

      if (games[0].gameSetupProfile !== currentUser.uid && exitGameFlag === true) {
        return (
          <Box>
            <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => exitToHome()}>
              <Center>
                <Text style={{color: '#fff', fontSize: 20}}>Go back to home screen?</Text>
              </Center>
            </Button>
            <Button variant="unstyled" onPress={() => gameOptionsFuncOpen()}>

              <Center pt="5">
              <Text style={{color: '#fff', fontSize: 18, textDecorationLine: "underline"}}>Or, Close & go back to game</Text>
              </Center>

            </Button>
          </Box>
        )
      }
    }
  }
  catch {
    //nothing.
  }

  }

  const exitToHome = () => {

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
    dispatch(updateEventsVersion(0))

    const gameId = games[0].gameId
    dispatch(updateExitGameFlag(false))
    dispatch(updateGameBoardHideBtn(0))

    navigate('Home',{
      updateHome: gameId
    });

  }

  const checkKickOff = () => {

    //console.log(games[0].avgTimePerPlayer + ' what? is games[0].avgTimePerPlayer');
    //console.log(games[0].halfTime + ' check games[0].halfTime here and see what is might be.');

    if (!games[0]) {
      //do nothoing
    }
    else {

    if (games[0].gameSetupProfile === currentUser.uid) {
      return (
          <KickOff navigation={props.navigation} fromContinue={props.route.params.fromContinue} optionFrom={getGameExitBoardDisplay} avgTimePerPlayer={games[0].avgTimePerPlayer} />
      )
    }
    else {

      //const gameDataReverse = getLatetGameDb()
      console.log('getGameDataForKo nedd another cheky doo ' + JSON.stringify(getGameDataForKo));
      try {
        return (
            <Box pt="10">
              <DisplayScoreHomePlayer navigation={props.navigation} homeTeamScore={getGameDataForKo[0].score.homeTeam} awayTeamScore={getGameDataForKo[0].score.awayTeam} homeTeamShortName={getGameDataForKo[0].teamNames.homeTeamShortName} awayTeamShortName={getGameDataForKo[0].teamNames.awayTeamShortName} secondsElapsed={getGameDataForKo[0].secondsElapsed} halfTimeFlag={getGameDataForKo[0].halfTime} gameHalfTime={getGameDataForKo[0].gameHalfTime} teamId={getGameDataForKo[0].teamId} gameIdDb={getGameDataForKo[0].gameIdDb} firstHalf={getGameDataForKo[0].firstHalf} secondHalf={getGameDataForKo[0].secondHalf} sixtySecondsMark={getGameDataForKo[0].sixtySecondsMark} startTimeLive={games[0].startTimeLive}/>
            </Box>
          )
        }
        catch {
          //maybe it need to wait?
        }
    }

  }

  }

  const backHomeNow = () => {

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

    if (playerOnField === 0) {
      Alert.alert('Please add at least one player to the field before saving.');
    }
    else {
      const gameId = games[0].gameId
  		navigate('Home',{
        updateHome: gameId
      });
    }



	}

  const goToAddPlayers = () => {

		//const gameId = games[0].gameId
    navigate('AddPlayersHome', {
      teamId: games[0].teamId,
      teamIdCode: games[0].teamIdCode,
      whereFrom: 7,
      checkSortLive: 0,
      showNewScreen: true,
      addTeamOnly: 0,
    });

	}

  const deletetTeamLineupSetup = () => {
      Alert.alert(
      'Are you sure you want to exit setup?',
      'If you exit setup all data will be lost.',
      [
        {text: 'Exit Setup', onPress: () => {


        let _games = []
        try {
          _games = [...games]
        }
        catch {
          _games = [{...games}]
        }

        if (games[0].halfTime < 4) {

          _games.shift();

          dispatch(updateGames(_games))
          //dispatch(updateCheckSort(0))


          //const gameRemove = games.shift();
          //dispatch(updateGames(gameRemove))
          //const gameIdDbTemp = props.route.params.gameIdDb
          let gameIdDbTemp = 0
          if (!props.route.params.gameIdDb) {
            console.log('undefinded');
            //console.log(JSON.stringify(games[0]));
            gameIdDbTemp = games[0].gameIdDb
          }
          else {
            console.log('not undefinded');
            gameIdDbTemp = props.route.params.gameIdDb
          }
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

          dispatch(updateCheckSort(0))

        }

        const gameId = games[0].gameId

        navigate('Home',{
          updateHome: gameId
        });

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




        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="0" style={{top: 15}} >
                  {fromContinueGame === 1 &&
                    <Box>
                  {getDisplayCopied()}
                  {getSecondsElapsed >= getFullTIme && secondsElapsed > 59 &&
                    <Box pl="3" pr="3" pt="20" bg="#000">
                    <Animated.View style={{ transform: [{ scale: anim.current }] }}>
                    <Center>
                  <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => fulltimeButton()}>Full-Time! (Click for save options)</Button>
                  </Center>
                  </Animated.View>
                    </Box>
                  }

                  {checkKickOff()}
                  {checkOptionsAssistant()}
                  </Box>
                  }
                  {fromContinueGame === 0 &&
                    <Box style={{paddingTop: 100}}>
                    </Box>
                  }
                  <ScrollView style={{paddingLeft: 5, paddingRight: 5}}>

                    {dragDropView()}

                    <Text style={{fontSize: 16, color: '#fff'}}><Text style={{fontSize: 22, color: '#fff'}}>*</Text>Total time as goalie only</Text>
                    <Text style={{fontSize: 16, color: '#fff', paddingBottom: 20}}><Text style={{fontSize: 22, color: '#fff'}}>†</Text>Does not include time played as goalie</Text>
                  </ScrollView>



                </Container>


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
                    <Center style={{position: 'absolute',  bottom: 0, left: '-50%', bottom: 0, height: 420, zIndex: 3, elevation: 3 }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="300" _text={{
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
                        <Box minW="18%" ml="3" mr="3">
                          <Text style={{color: '#fff', fontWeight: '500', fontSize: 14}}>Add Goal</Text>
                        </Box>
                        <Box mr="3" minW="58%" style={{borderColor: '#E879F9', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
                        </Box>

                      </HStack>
                      <Text style={{color: '#fff', fontWeight: '500', fontSize: 14, paddingTop: 3}}>(this will add a goal to your team's score)</Text>
                      <Box style={{padding: 5, backgroundColor: '#666', paddingTop: 2}}>
                        <Text style={{color: '#fff', fontWeight: '500', fontSize: 14, paddingTop: 3}}><Text style={{fontWeight: 800}}>IMPORTANT:</Text> To add a goal to a player, hide this box, tap the player's initials, then tap 'Goal' below their name at the bottom of the screen. This updates their stats and the team score. Use this only for opposition own goals.</Text>
                      </Box>
                      <GameOptionsUndo />

                      <HStack>
                        <Button variant="unstyled" p="0" py="5" onPress={() => setGameOptionsOpenStatus(false)}>
                          <Text style={{ color: '#E879F9', textDecorationLine: "underline", fontSize: 20}}>Hide</Text>
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

                  {fromContinueGame === 0 &&
                      <View>
                        <HStack style={{backgroundColor: '#000'}}>
                          <VStack minW="33.3%" maxW="33.3%" >
                            <Button variant="unstyled" onPress={() => backHomeNow()}>
                              <HStack >
                                <Center>
                                  {saveTick}
                                  <Text style={styles.textLiveScore}>Save</Text>
                                </Center>
                              </HStack>
                            </Button>
                          </VStack>
                          <VStack minW="33.3%" maxW="33.3%">
                            <Box bg="tertiary.100" style={{zIndex: 3, elevation: 3, minHeight: 150,}}>
                              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradientLive}>
                                <Button variant="unstyled" onPress={() => goToAddPlayers()}>
                                  <HStack >
                                    <Center>
                                      {editClipboard}
                                      <Text style={styles.textBottomMenu}>Edit/Add</Text>
                                    </Center>
                                  </HStack>
                                </Button>
                              </LinearGradient>
                            </Box>
                          </VStack>
                          <VStack minW="33.3%" maxW="33.3%">
                            <Box bg="#000" style={{zIndex: 3, elevation: 3, minHeight: 150}}>
                              <Button variant="unstyled" onPress={() => deletetTeamLineupSetup()}>
                                <HStack >
                                  <Center pl="2">
                                    {deleteClipboard}
                                    <Text style={styles.textBottomMenu}>Delete</Text>
                                  </Center>
                                </HStack>
                              </Button>
                            </Box>
                          </VStack>
                        </HStack>
                      </View>
        					}
                  {fromContinueGame === 1 &&
                    <View>
                  {games[0].gameSetupProfile === currentUser.uid &&
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
              }


              {games[0].gameSetupProfile !== currentUser.uid &&
              <HStack style={{backgroundColor: '#000'}}>
                <VStack minW="50%" maxW="50%" >
                  {getLeftMenuOptionDisplay()}

            </VStack>

            <VStack minW="50%" maxW="50%">
            <Box bg="#000" style={{zIndex: 3, elevation: 3, minHeight: 150}}>



            {exitGameFlag === false &&
              <Button variant="unstyled" onPress={() => gameOptionsFunc()}>
                <HStack >
                <Center pl="2">
                  {exitGameFlag ? cogIcon : cogIcon}
                  <Text style={styles.textBottomMenu}>Game Options</Text>
                  </Center>
                </HStack>
              </Button>
            }
            {exitGameFlag === true &&
              <Button variant="unstyled" onPress={() => gameOptionsFuncOpen()}>
              <HStack>
                <Center pl="2">
                {exitGameFlag ? cogIcon : cogIcon}
                <Text style={styles.textBottomMenu}>Game Options</Text>
                </Center>
              </HStack>
              </Button>

            }


            </Box>
            </VStack>
            </HStack>
          }
            </View>
          }

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
  linearGradientLiveSubs: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#e879f9',
    borderWidth: 2
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
  userProfileFourMessages: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
  }
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

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="pluscircleo" size={50} color="#fff" />;

import { updateGames } from '../../Reducers/games';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateExitGameFlag } from '../../Reducers/exitGameFlag';
import { updateCheckSort } from '../../Reducers/checkSort';
import { updateGameBoardHideBtn } from '../../Reducers/gameBoardHideBtn';
import { updateExitGameFlagOptions } from '../../Reducers/exitGameFlagOptions';
import { updateEventsVersion } from '../../Reducers/eventsVersion';
//import { updateStatsBoard } from '../../Reducers/statsBoard';

import Stopwatch from './Stopwatch'

import PositionTimes from '../../Util/PositionTimes.js';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const KickOff = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getSecondsElapsed, setSecondsElapsed] = useState(0);
  const [getSixtySecondsFlag, setSixtySecondsFlag] = useState(0);
  const [getLaps, setLaps] = useState([]);
  const [getLastClearedIncrementer, setLastClearedIncrementer] = useState(null);
  const [getIncrementer, setIncrementer] = useState(null);
  const [getStopTimer, setStopTimer] = useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [getContinueFlag, setContinueFlagFlag] = useState(false);
  const [getCheck, setStopCheck] = useState(false);
  const [getFlagCount, setFlagCount] = useState(0);
  const [makeFullTime, setMakeFullTime] = useState(false);
  const [makeSecondHalf, setMakeSecondHalf] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [halfTimeStatusLive, setHalfTimeStatusLive] = useState(0);
  const [getHalfTimeCheck, setHalfTimeCheck] = useState(false);



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
  let exitGameFlag = useSelector(state => state.exitGameFlag.exitGameFlag)
  let checkSort = useSelector(state => state.checkSort.checkSort);
  let awayTeamNameStore = useSelector(state => state.awayTeamDetails.awayTeamName);
  let awayTeamNameShortStore = useSelector(state => state.awayTeamDetails.awayTeamNameShort);
  let awayTeamNameIdStore = useSelector(state => state.awayTeamDetails.awayTeamNameId);
  let gameBoardHideBtn = useSelector(state => state.gameBoardHideBtn.gameBoardHideBtn);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  const parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);
  let eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);

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
  //let parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);


  /*
  try {
    if (userProfile === 4) {
      console.log('profile 4 is hit!');
      console.log(parentCoachView + ' parentCoachView ID is?');
      userRef = firestore().collection(parentCoachView);
    }
    else {
      userRef = firestore().collection(currentUser.uid);
    }
  }
  catch {
    //do nothing.
  }
  */
  //const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;

  const anim = useRef(new Animated.Value(1));

  useEffect(() => {

    if (getContinueFlag === false && props.fromContinue === 1) {
    //console.log('check am i getting in here? still? 1 = true');
      setContinueFlagFlag(true)
    }

    //console.log('WHEN IS THIS GETTGIN HIT?');
    console.log(sixtySecondsMark + ' sixtySecondsMark here now what?');

     if (typeof sixtySecondsMark === 'undefined') {
    setSecondsElapsed(0);
    } else {
    setSecondsElapsed(sixtySecondsMark);
    }
    //console.log(getSecondsElapsed + ' Should be set to sixtySecondsMark: ' + sixtySecondsMark);

  },[])

  useEffect(() => {

      const halfTimeStatus = games[0].halfTime
      setHalfTimeStatusLive(halfTimeStatus)

  },[checkSort, games[0].halfTime])

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


  const startTimer = () => {


    console.log(JSON.stringify(games[0].teamPlayers) + ' games[0]. checking');
    setHalfTimeCheck(false)

    let playerOnField = 0
    games[0].teamPlayers.map(player => {

      if (player.positionDetails.column > 1 && player.positionDetails.row < 4) {
        playerOnField = playerOnField + 1
      }
      else {
        playerOnField = playerOnField
      }

    })

    if (playerOnField > 0) {


    console.log('im hit to start timer');
    dispatch(updateGameBoardHideBtn(0))
    eventsVersion = eventsVersion + 1
    dispatch(updateEventsVersion(eventsVersion))

    if ( games[0].teamNames.awayTeamName === '' || games[0].teamNames.awayTeamShortName === '') {
      games[0].teamNames.awayTeamName = awayTeamNameStore
      games[0].teamNames.awayTeamShortName = awayTeamNameShortStore
      games[0].teamNames.awayTeamId = awayTeamNameIdStore
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
    }

    const halfTimeStatus = halfTimeStatusLive
  console.log(halfTimeStatus + ' what is halfTimeStatus');
    if (halfTimeStatus === 2) {
      games[0].firstHalf = false
      games[0].secondHalf = true
      games[0].halfTime = 3
      console.log(halfTimeStatus + ' what is halfTimeStatus');
      setStartTime(0)
      console.log(startTime + ' StartTime now 1');
      games[0].gameEvents.push({eventType: 'ko2', eventText: 'Kick-Off Second Half', eventTime: secondsElapsed})
    }
    else {
        setContinueFlagFlag(false)
        games[0].firstHalf = true
        games[0].secondHalf = false
        games[0].halfTime = 1
        games[0].gameEvents = []

        const epochDate = new Date();
        const startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)
        games[0].startTimeLive = startTimeEpochDate

        const teammIndex = teamNames.findIndex(x => x.teamId === games[0].teamIdCode);
        let gameIds = teamNames[teammIndex].gameIds
        //let gameIds = []
     //console.log(gameIds + ' gameIds what?here.');
     //console.log(JSON.stringify(games[0]) + ' games[0] check here for way team what?');
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

        const gameIdData = {gameIdDb: gameIdDbNew, status: 2, teamId: teamId, gameId: gameIdNew, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: 0, awayTeamScore: 0, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew}}


        //gameIds.push(gameIdData)
        gameIds[gameIds.length-1] = gameIdData;

     //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');

        teamNames[teammIndex].gameIds = gameIds

     //console.log(JSON.stringify(gameIdData) + ' etf gameIds hah?');

        /*
        games.map(game => {
       //console.log(game.gameIdDb + ' game.gameIdDb');
       //console.log(gameIdDbNew + ' gameIdDbNew');
          if (game.gameIdDb === gameIdDbNew) {
            gameIds.push(gameIdData)
          }
          else {
         //console.log(game.teamIdCode + ' game.teamIdCode');
         //console.log(game.halfTime + ' game.halfTime');
            if (game.teamIdCode === undefined || game.teamIdCode === null || game.teamIdCode === '' || game.halfTime === undefined || game.halfTime === null || game.halfTime === '' && game.halfTime > 0) {
              // do nothing.
             }
             else {
               const gameTeamIdCode = game.teamIdCode
               const gameHalfTime = game.halfTime
            //console.log(gameTeamIdCode + ' gameTeamIdCode');
            //console.log(gameHalfTime + ' gameHalfTime');
               gameIds.push({gameIdDb: game.gameIdDb, status: game.halfTime, teamId: game.teamId, gameId: game.id, seasonId: game.season.id, gameData: {homeTeamName: game.teamNames.homeTeamName, awayTeamName: game.teamNames.awayTeamName, homeTeamShort: game.teamNames.homeTeamShortName, awayTeamShort: game.teamNames.awayTeamShortName, homeTeamScore: game.score.homeTeam, awayTeamScore: game.score.awayTeam, gameDate: game.gameDate, gameHalfTime: game.gameHalfTime, awayTeamId: game.teamNames.awayTeamId}, season: {season: game.season.season, id: game.season.id}})
              //gameIds.push({gameIdDb: gameTeamIdCode, status: gameHalfTime})
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

        try {
          ////console.log('oppGoal add event hit here 1');
          games[0].gameEvents.push({eventType: 'ko', eventText: 'Kick-Off', eventTime: secondsElapsed})
        }
        catch {
          ////console.log('oppGoal add event hit here 2');
          games[0].gameEvents = []
          games[0].gameEvents.push({eventType: 'ko', eventText: 'Kick-Off', eventTime: secondsElapsed})
        }
    }

  //console.log(games + ' games after kick off here.');
    const halftimeFlag = games[0].halfTime
    setHalfTimeFlag(halftimeFlag)
    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

    games[0].sixtySecondsMark = sixtySecondsMark

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: games[0],
     })

     userRef.doc(gameIdDb).update({
         game: games[0],
       })
       .catch(error => this.setState({ errorMessage: error.message }))

    setStopCheck(false)

  //console.log('entering start timer');
    //todo.
    stopWatch()

    }
    else {
      Alert.alert("Beofre you can kick-off, please drag at least one player onto the playing field." )
    }

  }

  const restartTimer = () => {
    setHalfTimeCheck(false)
    const halfTimeStatus = games[0].halfTime
  //console.log(halfTimeStatus + ' what is halfTimeStatus');
    if (halfTimeStatus <= 2) {
      games[0].firstHalf = false
      games[0].secondHalf = true
      games[0].halfTime = 3

      const epochDate = new Date();
      const startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)
      games[0].startTimeLive = startTimeEpochDate

      let gameHalfTimeNew = games[0].gameHalfTime
      //gameHalfTimeNew = gameHalfTimeNew + 1
      setStartTime(0)
      //setSecondsElapsed(gameHalfTimeNew)
      console.log(startTime + ' StartTime now 2');
      games[0].gameEvents.push({eventType: 'ko2', eventText: 'Kick-Off Second Half', eventTime: secondsElapsed})
    }
    else {
        games[0].firstHalf = true
        games[0].secondHalf = false
    }

  //console.log(games + ' games after kick off here.');

    const halftimeFlag = games[0].halfTime
    setHalfTimeFlag(halftimeFlag)
    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

    games[0].sixtySecondsMark = sixtySecondsMark

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: games[0],
     })

     userRef.doc(gameIdDb).update({
         game: games[0],
       })
       .catch(error => this.setState({ errorMessage: error.message }))

    setStopCheck(false)

  }

  useEffect(() => {

    const halftimeFlag = games[0].halfTime
    setHalfTimeFlag(halftimeFlag)

  },[games[0].halfTime])

  useEffect(() => {

    /*
    let flagCount = 0

    if (getContinueFlag === false && props.fromContinue === 1 && getFlagCount < 1) {
   //console.log('check am i getting in here? still? 1a = true');
      const flagChange = true
      setContinueFlagFlag(flagChange)
      getFlagCount < 1
      flagCount = getFlagCount + 1
      setFlagCount(flagCount)
    }
    */

 //console.log(getContinueFlag + 'what abot now? whay?');

  //console.log(games[0].firstHalf + ' what is first half flag?');
 //console.log(secondsElapsed + ' now what is it?');
 //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it?');
 //console.log(incrementer + ' what is incrementer ID? 2');
 //console.log(getIncrementer + ' what is getIncrementer ID? 2');
    const gameHalfTime = games[0].gameHalfTime
    const gameHalfTimePlusOne = gameHalfTime + 1
    const gameHalfTimePlusTwo = gameHalfTime + 2
    const gameFullTime = gameHalfTime * 2
    const gameFullTimePlusOne = gameFullTime + 1
    if (games[0].halfTime === 4 || games[0].halfTime === 5) {
   //console.log('game stopped or 10min over game time hit now!');
      handleStopClick();
    }
    //else if (stopTimer === true || (getSecondsElapsed >= gameHalfTimePlusOne && games[0].firstHalf === true) || (getSecondsElapsed >= gameFullTimePlusOne && games[0].secondHalf === true) ) {
    else if (stopTimer === true || (getSecondsElapsed >= gameHalfTimePlusOne && games[0].firstHalf === true) || (getSecondsElapsed >= gameFullTimePlusOne && games[0].secondHalf === true) || (makeFullTime === true) || (makeSecondHalf === true)) {
   //console.log('stopTimer hit now!');
   //console.log(secondsElapsed + ' now what is it 2?');
   //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it 2?');
      setSecondsElapsed(secondsElapsed)
      //if (getCheck === false) {
     //console.log(' working out savning time 1');
          /*
          dispatch(updateStopwatch(
            getSecondsElapsed,
            laps,
            lastClearedIncrementer,
            incrementer,
            avgBall,
            sixtySecondsMark,
            stopTimer,
            pauseTimer
          ))
          */

          let naCount = 0

          if (games[0].halfTime === 1 || makeSecondHalf === true) {
         //console.log(' working out savning time 2');
         //console.log('auto start half-time.');
            games[0].halfTime = 2
            games[0].gameEvents.push({eventType: 'ht', eventText: 'Half-Time', eventTime: secondsElapsed})

            games[0].teamPlayers.map(player => {

              //if (makeSecondHalf === true) {
                let gameHalfTimeTempHalf = games[0].gameHalfTime

             //console.log(gameHalfTimeTempHalf + ' gameHalfTimeTempHalf');

             //console.log(JSON.stringify(player) + ' check player before functions.');
              //console.log('checking savePositionTime ok 1');
              //Alert.alert("checking savePositionTime ok 1" )
                const positionTimesSave = PositionTimes.savePositionTime(player, gameHalfTimeTempHalf);
                const positionTimesSaveFirst = positionTimesSave[0];

             //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst');
                player = positionTimesSaveFirst

                const positionTimesGet = PositionTimes.getPositionTime(player, gameHalfTimeTempHalf, games[0].gameHalfTime, games[0].halfTime);
                const positionTimesGetSecond = positionTimesGet[0];
                naCount = positionTimesGet[1];

                player = positionTimesGetSecond

              /*
              }
              else {
             //console.log(JSON.stringify(player) + ' check player before functions.');
                const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed);
                const positionTimesSaveFirst = positionTimesSave[0];

             //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst');
                player = positionTimesSaveFirst

                const positionTimesGet = PositionTimes.getPositionTime(player, secondsElapsed, naCount);
                const positionTimesGetSecond = positionTimesGet[0];
                naCount = positionTimesGet[1];

                player = positionTimesGetSecond
              }
              */
            })

            if (makeSecondHalf === true) {

           //console.log('hitting makeSecondHalf?');

              let gameHalfTimeTempHalf = games[0].gameHalfTime

           //console.log(gameHalfTimeTempHalf + ' gameHalfTimeTempHalf');

              setSecondsElapsed(gameHalfTimeTempHalf)

              dispatch(updateStopwatch(
                gameHalfTimeTempHalf,
                laps,
                lastClearedIncrementer,
                incrementer,
                avgBall,
                gameHalfTimeTempHalf,
                stopTimer,
                pauseTimer
              ))
            }


            setMakeSecondHalf(false)


            dispatch(updateGames(games))

            const teamIdCodeGames = games[0].teamIdCode
            const gameIdDb = games[0].gameIdDb

            games[0].sixtySecondsMark = sixtySecondsMark

            firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
               game: games[0],
             })

         		userRef.doc(gameIdDb).update({ game: games[0] });

         }
         //else if (games[0].halfTime === 3 || makeFullTime === true) {
         else if (games[0].halfTime === 3) {
        //console.log(' working out savning time 3');
        //console.log('game is over.');
           games[0].halfTime = 4
           games[0].gameEvents.push({eventType: 'ft', eventText: 'fulltime', eventTime: secondsElapsed})

           games[0].teamPlayers.map(player => {

             if (makeFullTime === true) {

               let gameHalfTimeTemp = games[0].gameHalfTime
               let gameFullTimeTemp = gameHalfTimeTemp * 2

            //console.log(JSON.stringify(player) + ' check player before functions Home.');
            //console.log(gameFullTimeTemp + ' check gameFullTimeTemp plz.');
            //console.log('checking savePositionTime ok 2');
            //Alert.alert("checking savePositionTime ok 2" )
               const positionTimesSave = PositionTimes.savePositionTime(player, gameFullTimeTemp, null, true);
               const positionTimesSaveFirst = positionTimesSave[0];

            //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst Home');
               player = positionTimesSaveFirst
            //console.log(JSON.stringify(player) + ' now check player after update. Home');

             }
             else {

            //console.log(JSON.stringify(player) + ' check player before functions Home.');
            //console.log(secondsElapsed + ' check secondsElapsed plz.');


              //console.log('checking savePositionTime ok 3');
              //Alert.alert("checking savePositionTime ok 3" )
               const positionTimesSave = PositionTimes.savePositionTime(player, secondsElapsed, null, true);
               const positionTimesSaveFirst = positionTimesSave[0];

            //console.log(JSON.stringify(positionTimesSaveFirst) + ' positionTimesSaveFirst Home');
               player = positionTimesSaveFirst
            //console.log(JSON.stringify(player) + ' now check player after update. Home');
            }

           })

           if (makeFullTime === true) {

          //console.log('hitting makeFulltine?');

             let gameHalfTimeTemp = games[0].gameHalfTime
             let gameFullTimeTemp = gameHalfTimeTemp * 2
             //gameFullTimeTemp = gameFullTimeTemp - 2

          //console.log(gameFullTimeTemp + ' gameFullTimeTemp');

             setSecondsElapsed(gameFullTimeTemp)

             dispatch(updateStopwatch(
               gameFullTimeTemp,
               laps,
               lastClearedIncrementer,
               incrementer,
               avgBall,
               gameFullTimeTemp,
               stopTimer,
               pauseTimer
             ))
           }

           setMakeFullTime(false)

           dispatch(updateGames(games))

           const teamIdCodeGames = games[0].teamIdCode
           const gameIdDb = games[0].gameIdDb

           games[0].sixtySecondsMark = sixtySecondsMark

           firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
              game: games[0],
            })

            userRef.doc(gameIdDb).update({ game: games[0] });
         }
         /*
      }

      if (getSecondsElapsed >= gameFullTimePlusOne || getSecondsElapsed >= gameHalfTimePlusOne && games[0].firstHalf === true) {
       //console.log('were into thiw one ok.');
          setStopCheck(true)
      }
      */

    }
    else if (getSecondsElapsed === 0 || getSecondsElapsed === 60 || getSecondsElapsed === 120 || getSecondsElapsed === 180 || getSecondsElapsed === 240 || getSecondsElapsed === 300 || getSecondsElapsed === 360 || getSecondsElapsed === 420 || getSecondsElapsed === 480 || getSecondsElapsed === 540 || getSecondsElapsed === 600 || getSecondsElapsed === 660 || getSecondsElapsed === 720 || getSecondsElapsed === 780 || getSecondsElapsed === 840 || getSecondsElapsed === 900 || getSecondsElapsed === 960 || getSecondsElapsed === 1020 || getSecondsElapsed === 1080 || getSecondsElapsed === 1140 || getSecondsElapsed === 1200 || getSecondsElapsed === 1260 || getSecondsElapsed === 1320 || getSecondsElapsed === 1380 || getSecondsElapsed === 1440 || getSecondsElapsed === 1500 || getSecondsElapsed === 1560 || getSecondsElapsed === 1620 || getSecondsElapsed === 1680 || getSecondsElapsed === 1740 || getSecondsElapsed === 1800 || getSecondsElapsed === 1860 || getSecondsElapsed === 1920 || getSecondsElapsed === 1980 || getSecondsElapsed === 2040 || getSecondsElapsed === 2100 || getSecondsElapsed === 2160 || getSecondsElapsed === 2220 || getSecondsElapsed === 2280 || getSecondsElapsed === 2340 || getSecondsElapsed === 2400 || getSecondsElapsed === 2460 || getSecondsElapsed === 2520 || getSecondsElapsed === 2580 || getSecondsElapsed === 2640 || getSecondsElapsed === 2700 || getSecondsElapsed === gameHalfTimePlusTwo) {
   //console.log('secondsElapsed === 60 prob hitting this each time 2?');
   //console.log(secondsElapsed + ' now what is it 3?');
   //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it 3?');
   //console.log(getSecondsElapsed + ' once 1 min is up what is getSecondsElapsed?');
   //console.log(getContinueFlag + ' i dont really get this getContinueFlag?');




      if (getContinueFlag !== true && getHalfTimeCheck === false) {
        games[0].secondsElapsed = getSecondsElapsed
        dispatch(updateGames(games))
        eventsVersion = eventsVersion + 1
        dispatch(updateEventsVersion(eventsVersion))

        const teamIdCodeGames = games[0].teamIdCode
        const gameIdDb = games[0].gameIdDb

        games[0].sixtySecondsMark = getSecondsElapsed

        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: games[0],
         })

         userRef.doc(gameIdDb).update({
             game: games[0],
           })
           .catch(error => this.setState({ errorMessage: error.message }))

           setHalfTimeCheck(true)

      }

   //console.log(getCheck + ' what is getCheck?');
   //console.log(getContinueFlag + ' what is getContinueFlag?');

      let flagCount = 0
      //if (getCheck === false) {
     //console.log('am i getting in here? still??');

        /*
        if (makeSecondHalf === true) {

       //console.log('hitting makeSecondHalf?');

          let gameHalfTimeTempHalfTwo = games[0].gameHalfTime

       //console.log(gameHalfTimeTempHalfTwo + ' gameHalfTimeTempHalfTwo');

          dispatch(updateStopwatch(
            gameHalfTimeTempHalfTwo,
            laps,
            lastClearedIncrementer,
            incrementer,
            avgBall,
            gameHalfTimeTempHalfTwo,
            stopTimer,
            pauseTimer
          ))

        setMakeSecondHalfTwo(false)
      }
      else if (makeFullTimeTwo === true) {
        if (makeFullTime === true) {

       //console.log('hitting makeFulltine?');

          let gameHalfTimeTempTwo = games[0].gameHalfTime
          const gameFullTimeTempTwo = gameHalfTimeTempTwo * 2

       //console.log(gameFullTimeTemp + ' gameFullTimeTemp');

          dispatch(updateStopwatch(
            gameFullTimeTempTwo,
            laps,
            lastClearedIncrementer,
            incrementer,
            avgBall,
            gameFullTimeTempTwo,
            stopTimer,
            pauseTimer
          ))
        }
        setMakeFullTimeTwo(fasle)

      }
      else {
        */
        dispatch(updateStopwatch(
          getSecondsElapsed,
          laps,
          lastClearedIncrementer,
          incrementer,
          avgBall,
          getSecondsElapsed,
          stopTimer,
          pauseTimer
        ))
      //}
      //}

      if (getSecondsElapsed === gameHalfTimePlusTwo) {
     //console.log('hitting no?');
          setStopCheck(true)
      }

    }
    else {

   //console.log(new Date() + ' Date.');
      const epochDate = new Date();
   //console.log(Math.floor(new Date(epochDate).getTime() / 1000))
      const startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)
      //store the original epochDate time (startTime).
   //console.log(startTime + ' check startTime');
      let startTimeCheck = startTime
      /*if (startTime === 0 && games[0].halfTime < 2) {
          startTimeCheck = startTimeEpochDate
       console.log('set start time hit firstHalf!');
          setStartTime(startTimeEpochDate)
          console.log(startTime + ' StartTime now 3');
      }
      else if (startTime === 0 && games[0].halfTime === 2) {
        const gameHalfTimeTempStart = games[0].gameHalfTime
        startTimeCheck = startTimeEpochDate - gameHalfTimeTempStart
        const startTimeCheckSet = startTimeEpochDate - gameHalfTimeTempStart
     console.log('set start time hit secondHalf!');
        setSecondsElapsed(gameHalfTimeTempStart)
        setStartTime(startTimeCheckSet)
        console.log(startTime + ' StartTime now 4');
      }
      else*/ if (startTime === 0 && games[0].halfTime < 4) {
        console.log(games[0].sixtySecondsMark + ' games[0].sixtySecondsMark check new see what it is');
        console.log(sixtySecondsMark + ' sixtySecondsMark check new see what it is');
        console.log(games[0].secondsElapsed + ' games[0].secondsElapsed check new see what it is');
        console.log(secondsElapsed + ' secondsElapsed check new see what it is');
        console.log(getSecondsElapsed + ' getSecondsElapsed check new see what it is');
        const gameHalfTimeTempStart = getSecondsElapsed
        startTimeCheck = startTimeEpochDate - gameHalfTimeTempStart
        const startTimeCheckSet = startTimeEpochDate - gameHalfTimeTempStart
        console.log('set start time hit new secondHalf!');
        setSecondsElapsed(gameHalfTimeTempStart)
        setStartTime(startTimeCheckSet)
        console.log(startTime + ' StartTime now 4');
      }

   //console.log(getSecondsElapsed + ' getSecondsElapsed  what is it here?');
      const startTimeEpochDatePlusSecondsElapsedPlusFive = getSecondsElapsed + startTimeCheck + 5

   //console.log(startTimeEpochDatePlusSecondsElapsedPlusFive + ' startTimeEpochDatePlusSecondsElapsedPlusFive');
   //console.log(startTimeEpochDate + ' startTimeEpochDate');
      if (startTimeEpochDatePlusSecondsElapsedPlusFive < startTimeEpochDate) {

     //console.log('hit into setting time.');
     console.log(startTimeEpochDate + ' startTimeEpochDate timeCheckHere');
     console.log(startTime + ' startTime timeCheckHere');
     let newStartTime = 0
     const timeCheckHere = startTimeEpochDate - startTime
     console.log(timeCheckHere + ' timeCheckHere');
     console.log(games[0].halfTime + ' games[0].halfTime timeCheckHere');
     console.log(games[0].gameHalfTime + ' games[0].gameHalfTime timeCheckHere');
     const gameFullTimeTamp = games[0].gameHalfTime * 2
      if (games[0].halfTime === 1 && timeCheckHere > games[0].gameHalfTime) {
        console.log('hit into first half re-time');
        newStartTime = games[0].gameHalfTime
        const gameIdDb = games[0].gameIdDb
        const teamIdCodeGames = games[0].teamIdCode
        games[0].halfTime = 2
        games[0].sixtySecondsMark = newStartTime
        games[0].secondsElapsed = newStartTime
        dispatch(updateGames(games))
        dispatch(updateEventsVersion(eventsVersion))
        userRef.doc(gameIdDb).update({ game: games[0] });
        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: games[0],
         })
      }
      else if (games[0].halfTime === 3 && timeCheckHere > gameFullTimeTamp) {
        console.log('hit into second half re-time');
        console.log(timeCheckHere + ' timeCheckHere inside');
        console.log(games[0].gameHalfTime + ' games[0].gameHalfTime inside');
        //const gameFullTimeTamp = games[0].gameHalfTime * 2
        newStartTime = gameFullTimeTamp
        //handleStopClick();
        const gameIdDb = games[0].gameIdDb
        const teamIdCodeGames = games[0].teamIdCode
        games[0].halfTime = 3
        games[0].sixtySecondsMark = newStartTime
        games[0].secondsElapsed = newStartTime
        dispatch(updateGames(games))
        dispatch(updateEventsVersion(eventsVersion))
        userRef.doc(gameIdDb).update({ game: games[0] });
        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: games[0],
         })
      }
      else {
        console.log('hit into here check.');
        newStartTime = startTimeEpochDate - startTime
        const gameIdDb = games[0].gameIdDb
        const teamIdCodeGames = games[0].teamIdCode
        games[0].sixtySecondsMark = newStartTime
        games[0].secondsElapsed = newStartTime
        if (games[0].gameHalfTime > newStartTime) {
          games[0].halfTime = 1
        }
        else {
          games[0].halfTime = 3
        }
        dispatch(updateGames(games))
        dispatch(updateEventsVersion(eventsVersion))
        userRef.doc(gameIdDb).update({ game: games[0] });
        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: games[0],
         })
      }
      console.log(newStartTime + ' newStartTime here timeCheckHere.');


     //console.log(newStartTime + ' newStartTime');
        setSecondsElapsed(newStartTime)
        //dispatch(updateEventsVersion(eventsVersion))

        dispatch(updateStopwatch(
          newStartTime,
          laps,
          lastClearedIncrementer,
          incrementer,
          avgBall,
          newStartTime,
          stopTimer,
          pauseTimer
        ))
      }


      setHalfTimeCheck(false)

   //console.log('hitting normal.');
   //console.log(secondsElapsed + ' now what is it 4?');
   //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it 4?');
      /*
      dispatch(updateStopwatch(
        getSecondsElapsed,
      ))
      */
    }

  },[getSecondsElapsed])


  const handleStopClick = () => {
 //console.log('does this get hit to clearInterval?');
 //console.log(incrementer + ' what is incrementer ID?');
 //console.log(getIncrementer + ' what is getIncrementer ID?');
    setSecondsElapsed(0)
    setSixtySecondsFlag(0)
    setStartTime(0)
    console.log(startTime + ' StartTime now 5');
    clearInterval(incrementer);
    clearInterval(getIncrementer);
    /*
    if (getCheck === false) {
      dispatch(updateStopwatch(
        getSecondsElapsed,
        laps,
        incrementer,
        incrementer,
        avgBall,
        sixtySecondsMark,
        stopTimer,
        pauseTimer,
      ))
    }
    */

    setStopCheck(true)

  }



  const stopWatch = () => {


 //console.log(secondsElapsed + ' now what is it? set');
 //console.log(getSecondsElapsed + ' getSecondsElapsed now what is it?  set');
 //console.log(getSixtySecondsFlag + ' getSixtySecondsFlag now what is it?  set');
 //console.log(games[0].firstHalf + ' games[0].firstHalf now what is it?  set');
 //console.log(games[0].secondsElapsed + ' games[0].secondsElapsed now what is it?  set');
 //console.log(games[0].secondHalf + ' games[0].secondHalf now what is it?  set');
 //console.log(games[0].gameHalfTime + ' games[0].gameHalfTime now what is it?  set');

    /*
 //console.log(getSecondsElapsed + ' getSecondsElapsed what is true?');
 //console.log(getContinueFlag + ' getContinueFlag what is this now?');
 //console.log(sixtySecondsMark + ' sixtySecondsMark what is this now?');
    if (getContinueFlag === true) {
      setSecondsElapsed(sixtySecondsMark)
    }
    */

    if (Platform.OS === 'ios') {

    incrementer = setInterval( () =>
        setSecondsElapsed(getSecondsElapsed => getSecondsElapsed + 1), 1000);

        dispatch(updateStopwatch(
          secondsElapsed,
          laps,
          lastClearedIncrementer,
          incrementer,
          avgBall,
          secondsElapsed,
          stopTimer,
          pauseTimer
        ))


        const incrementerSixty = setInterval( () =>
        setSixtySecondsFlag(getSixtySecondsFlag => getSecondsElapsed), 6000);

        setIncrementer(incrementerSixty)
      }
      else {

        //console.log('android here');
          incrementer = setInterval( () =>
              setSecondsElapsed(getSecondsElapsed => getSecondsElapsed + 1), 1050);

              dispatch(updateStopwatch(
                secondsElapsed,
                laps,
                lastClearedIncrementer,
                incrementer,
                avgBall,
                secondsElapsed,
                stopTimer,
                pauseTimer
              ))


              const incrementerSixty = setInterval( () =>
              setSixtySecondsFlag(getSixtySecondsFlag => getSecondsElapsed), 6600);

              setIncrementer(incrementerSixty)


      }


    /*
  //console.log('entering stio wathc new.');
  //console.log(stopTimer + ' what is stoptimer??')
    let _stopTimer = stopTimer
  incrementer = setInterval( () => {
    //console.log( 'stop timer true hit?');

      secondsElapsed = secondsElapsed + 1

      lastClearedIncrementer = null
      incrementer = null
      //const __stopTimer = _stopTimer
      dispatch(updateStopwatch(
        secondsElapsed,
        laps,
        lastClearedIncrementer,
        incrementer,
        avgBall,
        sixtySecondsMark,
        __stopTimer,
        pauseTimer,
      ))
    }, 1000)
    */
    }

    const gameStatus = () => {

      let gameStatusText = ''
      if (getHalfTimeFlag === 5) {
       gameStatusText = 'New Game'
      }
      else if (getHalfTimeFlag <= 4 && games[0].gameSetup === false) {
        gameStatusText = 'Continue Game'
      }
      else {
        gameStatusText = 'New Game'
      }

      return (
        <Text style={{color: "#ffffff",
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 40}}>
          {gameStatusText}
        </Text>
      )

    }

    const restartTimerFromContinueGame = () => {
      //to do

      if (getHalfTimeFlag <= 4 && games[0].gameSetup === false) {
        console.log('im hitting into hre no restart time cheeck 1');

          //do other stuff.
       //console.log(getSecondsElapsed + ' what is it at this stage?');
       //console.log(secondsElapsed + ' secondsElapsed what is it at this stage?');
          const gameSecondsElapsed = games[0].secondsElapsed
       //console.log(gameSecondsElapsed + ' gameSecondsElapsed what is it at this stage?');



          if (secondsElapsed === 0 && gameSecondsElapsed === 0) {
            console.log('im hitting into hre no restart time cheeck 2');

            let zeroSecondsElapsed = 0
            if (games[0].firstHalf === true) {
              zeroSecondsElapsed = 1
            }
            else if (games[0].secondHalf === true) {
              let gameHalfTime = games[0].gameHalfTime
              gameHalfTime = gameHalfTime + 1
              zeroSecondsElapsed = gameHalfTime
            }

            if (getContinueFlag === true) {
              setSecondsElapsed(getSecondsElapsed)
            }
            else {
                setSecondsElapsed(getSecondsElapsed)
            }

         //console.log(zeroSecondsElapsed + ' zeroSecondsElapsed');

            setStartTime(0)
            console.log(startTime + ' StartTime now 6');

            dispatch(updateStopwatch(
              getSecondsElapsed,
              laps,
              incrementer,
              incrementer,
              avgBall,
              getSecondsElapsed,
              stopTimer,
              pauseTimer,
            ))
            stopWatch()
         //console.log('check am i getting in here? still? 2 = false');
            setContinueFlagFlag(false)
            setStopCheck(false)

            games[0].sixtySecondsMark = getSecondsElapsed
            games[0].secondsElapsed = getSecondsElapsed

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

          }
            else if (getSecondsElapsed > 0 && secondsElapsed > 0 && sixtySecondsMark > 0) {
              console.log('im hitting into hre no restart time cheeck 3');
           //console.log(gameSecondsElapsed + ' gameSecondsElapsed what is it at this stage 2?');
           //console.log(new Date() + ' Date.');
              const epochDate = new Date();
           //console.log(Math.floor(new Date(epochDate).getTime() / 1000))
              const startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)
              if (getContinueFlag === true) {
                setSecondsElapsed(sixtySecondsMark)
                const startTimeCheck = startTimeEpochDate - sixtySecondsMark
             console.log('set start time hit resettime! 1');
                setStartTime(startTimeCheck)
                console.log(startTime + ' StartTime now 7');
              }
              else {
                  setSecondsElapsed(gameSecondsElapsed)
                  const startTimeCheck = startTimeEpochDate - gameSecondsElapsed
               console.log('set start time hit resettime! 2');
                  setStartTime(startTimeCheck)
                  console.log(startTime + ' StartTime now 8');
              }


          dispatch(updateStopwatch(
            gameSecondsElapsed,
            laps,
            incrementer,
            incrementer,
            avgBall,
            gameSecondsElapsed,
            stopTimer,
            pauseTimer,
          ))
          stopWatch()
       //console.log('check am i getting in here? still? 3 = false');
          setContinueFlagFlag(false)
          setStopCheck(false)
          }
          else {
            console.log('im hitting into hre no restart time cheeck 4');
         //console.log('check am i getting in here? still? 4 = false');
            setContinueFlagFlag(false)
            setStopCheck(false)
          }

      }
      else {
        console.log('im hitting into hre no restart time cheeck 15');
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
        gamesLength = games.length
        }
        catch {
          gamesLength = 0
        }

        //_games.unshift({gameSetup: true, season: {season: '', id: 99999999}, id: gamesLength, halfTime: 0, firstHalf: false, secondHalf: false, gameHalfTime: 0, score: {homeTeam: 0, awayTeam: 0}, teamNames: {homeTeamName: '', awayTeamName: '', homeTeamShortName: '', awayTeamShortName: '', homeTeamId: 99999998, awayTeamId: 99999998}, gameEvents:{}, grade: '', secondsElapsed: 0})

        dispatch(updateGames(_games))

        const teamIdCodeGames = _games[0].teamIdCode
        const gameIdDb = _games[0].gameIdDb

        _games[0].sixtySecondsMark = sixtySecondsMark

        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: _games[0],
         })

         userRef.doc(gameIdDb).update({
             game: games[0],
           })
           .catch(error => this.setState({ errorMessage: error.message }))

         /*
        userRef.doc("games").update({
            games: _games,
          })
          .catch(error => this.setState({ errorMessage: error.message }))
          */
       //console.log('check am i getting in here? still? 5 = false');
          setContinueFlagFlag(false)
          setStopCheck(false)
          navigate('AddTeamHome', {
            teamType: 0
          });

      }

    }

    const editTime = () => {

      navigate('EditGameTime');

    }

    const closeToKo = () => {

      dispatch(updateGameBoardHideBtn(1))

    }

    const buttonDisplays = () => {
      console.log('are we getting button displays?');
      const gameHalfTimetemp = games[0].gameHalfTime
      const gameFullTimetemp = gameHalfTimetemp * 2

      console.log('games[0].halfTime ' + games[0].halfTime)
      console.log('games[0].firstHalf ' + games[0].firstHalf);
      console.log('props.fromContinue ' + props.fromContinue);
      console.log('getSecondsElapsed ' + getSecondsElapsed);

      if (getContinueFlag === true && ((games[0].firstHalf === true && games[0].secondHalf === false) || (games[0].firstHalf === false && games[0].secondHalf === true && getHalfTimeFlag < 4 && sixtySecondsMark < gameFullTimetemp)  )) {
        return (
          <Box pl="3" pr="3" pt="4" pb="4" mt="10">
          <Center>
            <Text style={{color: "#fff", fontSize: 22, marginBottom: 10, textAlign: 'center'}}>Tap "Restart Timer" to start from where you left off!</Text>
          <Button minW="100%" pt="5" pb="5" bg="#E879F9" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => restartTimerFromContinueGame()}><Text style={{fontSize: 20, color: '#fff'}}>Restart Timer at: {formattedSeconds(getSecondsElapsed)}min</Text></Button>



          </Center>
          </Box>
        )
      }
      else if (games[0].halfTime === 2 && props.fromContinue !== "fromEvents") {
        return (
          <Box pl="3" pr="3" pt="20" pb="4">
          <Animated.View style={{ transform: [{ scale: anim.current }] }}>
          <Center>
      <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => restartTimer()}>Kick Off Second Half!</Button>
      </Center>
      </Animated.View>
      </Box>
    )

    }
    else if (games[0].halfTime === 0 && games[0].firstHalf === false && props.fromContinue !== "fromEvents" && getSecondsElapsed < 1) {
      console.log('do we at least get here?');
      if (Platform.OS !== 'ios') {
        return (


          <Box pl="3" pr="3" pt="10" pb="4">

      <Animated.View style={{ transform: [{ scale: anim.current }] }}>
          <Center>

        <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => startTimer()}>Kick Off to start timer!</Button>

        </Center>
        </Animated.View>
        <Center>
        <Text style={{color: '#fff'}}>Tap 'Kick-off' after you have dragged players into position</Text>
        </Center>
        </Box>

        )
      }
      else {
        return (


          <Box pl="3" pr="3" pt="20" pb="4">

      <Animated.View style={{ transform: [{ scale: anim.current }] }}>
          <Center>

        <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => startTimer()}>Kick Off to start timer!</Button>

        </Center>
        </Animated.View>
        <Center>
        <Text style={{color: '#fff'}}>Tap 'Kick-off' after you have dragged players into position</Text>
        </Center>
        </Box>

        )
      }
      }
  }

  const halftimeButton = () => {

    Alert.alert(
    'Are you sure you want to push the game to half-time?',
    'You cannot undo this change, so please continue with care.',
    [
      {text: 'Finish First-Half', onPress: () => {


          setMakeSecondHalf(true)
          dispatch(updateExitGameFlag(false))

          //dispatch(updateExitGameFlag(false))
          dispatch(updateGameBoardHideBtn(0))



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


  const wariningButton = () => {

    //handleStopClick();
    setMakeFullTime(true)
    dispatch(updateGameBoardHideBtn(0))
    dispatch(updateExitGameFlagOptions(true))
    dispatch(updateExitGameFlag(false))
    dispatch(updateGameBoardHideBtn(0))
    //dispatch(updateStatsBoard(false))

    /*
    Alert.alert(
    'Are you sure you want to exit the game?',
    'Please note game data will not be saved if you exit the game',
    [
      {text: "Exit Game", onPress: () => {

        games[0].halfTime = 5
        const gameIdOld = games[0].gameId
        handleStopClick();

        let _games = []
        try {
          _games = [...games]
        }
        catch {
          _games = [{...games}]
        }

     //console.log(games[0].halfTime + ' games[0].halfTime chekcy plessz');

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
               else {
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

          /*
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

             /*
          const teamIdCodeGames = games[0].teamIdCode
          const gameIdDb = games[0].gameIdDb

       //console.log(JSON.stringify(games[0]) + ' games[0] check here thnks.');
       //console.log(teamIdCodeGames + ' teamIdCodeGames check here thnks.');
       //console.log(gameIdDb + ' gameIdDb check here thnks.');

          firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
             game: games[0],
           })
           .catch(error => console.log(error.message))






        dispatch(updateCheckSort(0))

        */
        /*
        need to set a global that then updates removes th below on PrevGamesEventsHome
        */
        //setHalfTime(99999999)
        //setFullTime(99999999)
        //setSecondsElapsed(99999999)

        /*
        dispatch(updateExitGameFlag(false))
        dispatch(updateGameBoardHideBtn(0))

      navigate('Home',{
        updateHome: gameIdOld
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

  */

  }

  const checkSecondsElapsedToStopwatch = () => {

 //console.log(getSecondsElapsed + ' getSecondsElapsed when is this hit? and what does it say?');
 //console.log(secondsElapsed + ' secondsElapsed when is this hit? and what does it say?');
    return (
      <Box style={{height: 0}}>
      <Text style={{fontSize: 0, lineHeight: 0}}>{getSecondsElapsed}</Text>
      </Box>
    )
  }

  const hideOption = () => {

    dispatch(updateExitGameFlag(false))
    dispatch(updateGameBoardHideBtn(0))


  }


  const forceHome = () => {

    const gameId = games[0].gameId

    dispatch(updateExitGameFlag(false))
    dispatch(updateGameBoardHideBtn(0))

    navigate('Home',{
      updateHome: gameId
    });

  }

  const forceClose = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    dispatch(updateExitGameFlag(false))
    dispatch(updateGameBoardHideBtn(0))

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

      dispatch(updateCheckSort(0))
      dispatch(updateGameBoardHideBtn(0))

    }

    const gameId = games[0].gameId

    navigate('Home',{
      updateHome: gameId
    });

  }

  const checkingTimes = () => {

    const epochDate = new Date();
    const startTimeEpochDate = Math.floor(new Date(epochDate).getTime() / 1000)
    const timeCheckHere = startTimeEpochDate - startTime
    const gameHalfTimeCheck = games[0].gameHalfTime
    const gameFullTimeTamp = games[0].gameHalfTime * 2

    if (games[0].halfTime < 3) {
      return (
        <Text style={{color: '#fff', fontSize: 12}}>timeCheckHere: {timeCheckHere} & gameHalfTime: {gameHalfTimeCheck}</Text>
      )
    }
    else {
      return (
        <Text style={{color: '#fff', fontSize: 12}}>timeCheckHere: {timeCheckHere} & gameHalfTime: {gameFullTimeTamp}</Text>
      )
    }


  }

        return (

          <View>


          <Center style={getContinueFlag === true ? styles.showOneHuundered : getHalfTimeFlag === 0 && games[0].firstHalf === false || getHalfTimeFlag === 2 ? styles.showOneHuundered : styles.showZero}>
            <Box bg="#000" p="0" minW="100%" _text={{color: "white"}}>
                {buttonDisplays()}
            </Box>
            <Box bg="#000" style={styles.addPaddingStopWatch}>
                {checkSecondsElapsedToStopwatch()}
                <Stopwatch secondsElapsed={getSecondsElapsed} navigation={props.navigation} fromContinue={props.fromContinue} fromFooter={props.fromFooter} avgTimePerPlayer={props.avgTimePerPlayer} />
            </Box>
          </Center>


          {exitGameFlag === true && props.fromFooter !== true &&
          <Center bg="#000" p="0" mt="0" rounded="lg" minW="100%" _text={{
          color: "white"
        }} style={{borderTopColor: '#fff', borderTopWidth: 1}}>
          <HStack>
            <Text style={{fontSize: 26, color: '#fff', textAlign: 'left', paddingTop: 20, fontWeight: 600}}>OPTIONS MENU</Text>
          </HStack>
          <HStack>

            <Box minW="28%" alignSelf="center" mt="3" ml="3" mr="3" shadow="5">
            {games[0].halfTime === 1 &&
              <Button minW="100%" bg="#a855f7" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => halftimeButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={styles.warningBtn}>Finish First Half</Text></VStack></HStack></Button>
            }
            </Box>
          </HStack>
          <Box mb="90%">
          <HStack>
            {exitGameFlag === true &&
              <Box minW="28%" ml="3" mr="3"  alignSelf="center" mt="3" shadow="5" bg="#000">
                <Button minW="100%" bg="#E879F9" p="1" size="md" _text={{fontSize: "xs"}} onPress={() => wariningButton()}><HStack><Text style={{fontSize: 22, color: '#fff', marginTop: 5}}></Text><VStack><Text style={styles.warningBtn}>Finish Game</Text></VStack></HStack></Button>
              </Box>
            }
          </HStack>

          <Center>
            <HStack>
              <Text style={{fontSize: 16, color: '#fff', marginTop: 15}}>Or</Text>
            </HStack>
          </Center>


            <HStack>
              {games[0].halfTime === 0 &&
                <Box minW="28%" ml="3" mr="3"  alignSelf="center" mt="3" shadow="5" bg="#000">
                  <Button minW="100%" bg="transparent" p="1" size="md" onPress={() => forceHome()}><HStack><Text style={{fontSize: 18, color: '#fff', marginTop: 5, textDecorationLine: "underline"}}>Back to Home (& continue game later)</Text></HStack></Button>
                </Box>
              }
            </HStack>

          <HStack>
            {exitGameFlag === true &&
              <Box minW="28%" ml="3" mr="3"  alignSelf="center" mt="3" shadow="5" bg="#000">
                <Button minW="100%" bg="transparent" p="1" size="md" onPress={() => forceClose()}><HStack><Text style={{fontSize: 18, color: '#fff', marginTop: 5, textDecorationLine: "underline"}}>Force Close (delete game & no save)</Text></HStack></Button>
              </Box>
            }
          </HStack>
            <Button variant="unstyled" pt="10" onPress={() => hideOption()}>
              <Text style={styles.textFourteen}>Close, and go back to game</Text>
            </Button>
          </Box>
          </Center>
        }
          </View>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  showOneHuundered: {
    //position:'absolute',
    //left: 0,
    //top: 0,
    //right: 0,
    //height: '86.5%',
    //zIndex: 3,
    //elevation: 3,
    backgroundColor: 'rgba(20,20,20,0.7)',
    justifyContent: 'center',
    //marginBottom: 20
    //minHeight: '100%'
  },
  showZero: {
    //position:'relative',
    //left: 0,
    //top: 0,
    //right: 0,
    //height: '20%',
    //zIndex: 3,
    //elevation: 3,
    //backgroundColor: 'rgba(20,20,20,0.7)',
    justifyContent: 'center',
    //marginBottom: 10
  },
  showButton: {
    //position:'relative',
  },
  textFourteen: {
    color: '#E879F9',
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 20,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  addPaddingStopWatch: {
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        paddingTop: 0,
      },
      default: {
        paddingTop: 0,
      }
      })
  },
  warningBtn: {
    fontSize: 22,
    color: '#fff',
    ...Platform.select({
      ios: {
        lineHeight: -5,
      },
      android: {
        lineHeight: 22,
        paddingTop: 5
      },
      default: {
        lineHeight: -5,
      }
      })
  },
  textBottomMenu: {
    color: '#fff',
    fontSize: 18,
  },
})

export default KickOff;

/*EDIT TIME CODE (NEEDS DEVELOPED PROBELRY!)

<Button pl="2" pt="0" pr="0" variant="unstyled" onPress={() => editTime()}>
  <HStack style={{paddingTop: 10}}>
  <Center pl="0" style={{height: 16}}>
    <Text style={{color: '#fff', fontSize: 14, textDecorationLine: 'underline'}}>
    Edit time
    </Text>
    </Center>
  </HStack>
</Button>
*/

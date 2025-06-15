import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateCheckSort } from '../../Reducers/checkSort';

import SelectGameTime from './SelectGameTime.js'
import SelectOppTeam from './SelectOppTeam.js'
import SelectSeason from './SelectSeason.js'
import SelectMatchFormats from './SelectMatchFormats.js'
import SelectDedicatedGoalie from './SelectDedicatedGoalie.js'
import SelectEnableAi from './SelectEnableAi.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const SetupHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [gameDisplay, setGameDisplay] = useState(null);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let checkSort = useSelector(state => state.checkSort.checkSort);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;

  useEffect(() => {
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
      console.log(matchFormat + ' matchFormat is now here?');
      console.log(teamPlayersLength + ' teamPlayersLength is right now?');
      // Subtract 1 if there's a dedicated goalie
      if (_games[0].dedicatedGoalie === 1 && teamPlayersLength > matchFormat) {
        teamPlayersLength -= 1
      }
      console.log(teamPlayersLength + ' teamPlayersLength is right now? 2');

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

      console.log(result.playersRemainder + ' result.playersRemainder is aye?');
      if (_games[0].playersRemainder !== result.playersRemainder) {
        _games[0].playersRemainder = result.playersRemainder
        shouldUpdate = true
      }

      if (shouldUpdate) {
        dispatch(updateGames(_games))
      }

      // Update UI block
      const jsxBlock = (
        <Box style={{ backgroundColor: '#333' }}>
          {teamPlayersLength > matchFormat ? (
            <Text style={{ color: '#fff', fontSize: 18, padding: 15 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>Heads up:</Text> Our AI will track playing time and will suggest subs every{' '}
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{formattedSeconds(result.minutesPerBlock)} minutes</Text>, so each outfield player (except the goalie) should get about{' '}
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{formattedSeconds(result.playerPlayTime)} minutes</Text> by the end of the game. It’s a helpful target—not an exact rule—since every match comes with unpredictable twists (like injuries, early or late subs… or even the occasional tantrum!). You can find this number at the top left of the main playing screen to help guide fair playing time for everyone. The most important rule is that everyone has fun!
            </Text>
          ) : (
            <Text style={{ color: '#fff', fontSize: 18, padding: 15 }}>
              <Text style={{ fontWeight: '800' }}>Heads up:</Text> Since the number of players matches the positions needed on the field, everyone will play the full game of{' '}
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{formattedSeconds(result.playerPlayTime)}</Text> minutes.
            </Text>
          )}
        </Box>
      )

      /*
      <Box style={{ backgroundColor: '#333' }}>
        <Text style={{ color: '#fff', fontSize: 18, padding: 15 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>
            Heads up:
          </Text>{' '}
          {teamPlayersLength <= matchFormat
            ? `Since the number of players is less than or equal to the match format, everyone plays the full ${result.playerPlayTime} minutes.`
            : `Our AI will suggest subs every ${result.minutesPerBlock}min, so each player should get about ${result.playerPlayTime} minutes by the end.`}
        </Text>
      </Box>
      */

      setGameDisplay(jsxBlock)
    }
  }, [games, dispatch])

  const continueSetup = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

 //console.log(_games[0].gameHalfTime + ' _games[0].gameHalfTime');
 //console.log(_games[0].teamNames.awayTeamName + ' _games[0].teamNames.awayTeamName');
    const awayTeamNameTemp = _games[0].teamNames.awayTeamName
    const awayTeamShortNameTemp = _games[0].teamNames.awayTeamShortName

    if (_games[0].gameHalfTime !== 0 && _games[0].teamNames.awayTeamName !== '' && _games[0].matchFormat !== 0) {
      _games[0].gameSetup = false
      //dispatch(updateGames(_games))
      _games[0].teamNames.awayTeamName = awayTeamNameTemp
      _games[0].teamNames.awayTeamShortName = awayTeamShortNameTemp
   //console.log(JSON.stringify(_games[0].teamPlayers) + ' check _games[0].teamPlayers here for pos.');
   //console.log(_games[0].teamNames.awayTeamName + ' _games[0].teamNames.awayTeamName 2');
   //console.log(_games[0].teamNames.awayTeamShortName + ' _games[0].teamNames.awayTeamShortName 2');
   //console.log(awayTeamNameTemp + ' _games[0].teamNames.awayTeamName 3');
   //console.log(awayTeamShortNameTemp + ' _games[0].teamNames.awayTeamShortName 3');
   //console.log(JSON.stringify(_games[0]) + ' check _games[0] here for away team.');
      //const gamesTemp = _games

      /*
      const gameHalfTimeTemp = _games[0].gameHalfTime
      const matchFormat = _games[0].matchFormat


      const gameTimeFull = gameHalfTimeTemp * 2
      const matchFormatMinusGoalie = matchFormat - 1
      const teamPlayersLength = _games[0].teamPlayers.length
      const teamPlayersLengthMinusGoalie = teamPlayersLength - 1

      const playerMinutes = gameTimeFull * matchFormatMinusGoalie
      const avgTimePerPlayer = playerMinutes / teamPlayersLengthMinusGoalie
      _games[0].avgTimePerPlayer = avgTimePerPlayer
      */

      dispatch(updateGames(_games))

      const teamIdCodeGames = _games[0].teamIdCode
      const gameIdDb = _games[0].gameIdDb


      firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
         game: _games[0],
       }).catch(error => console.log(' firestore error ' + error.message))

       userRef.doc(gameIdDb).update({ game: games[0] });


       const teammIndex = teamNames.findIndex(x => x.teamId === games[0].teamIdCode);
       let gameIds = teamNames[teammIndex].gameIds
       //let gameIds = []
    //console.log(gameIds + ' gameIds what?');
       const teamId = _games[0].teamIdCode
       const gameIdDbNew = _games[0].gameIdDb
       const homeTeamName = _games[0].teamNames.homeTeamName
       const awayTeamName = _games[0].teamNames.awayTeamName
       const homeTeamShortName = _games[0].teamNames.homeTeamShortName
       const awayTeamShortName = _games[0].teamNames.awayTeamShortName
       const awayTeamId = _games[0].teamNames.awayTeamId
       const gameDate = _games[0].gameDate
       const gameHalfTimeTime = _games[0].gameHalfTime
       const gameIdNew = _games[0].id
       const seasonIdNew = _games[0].season.id
       const seasonNameNew = games[0].season.season

       const gameIdData = {gameIdDb: gameIdDbNew, status: 1, teamId: teamId, gameId: gameIdNew, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: 0, awayTeamScore: 0, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew}}
       //const gameIdData = {gameIdDb: gameIdDbNew, status: 1, teamId: teamId, gameId: gameIdNew, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: 0, awayTeamScore: 0, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}}

       gameIds.push(gameIdData)


    //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');

       teamNames[teammIndex].gameIds = gameIds

       /*
    //console.log(JSON.stringify(gameIdData) + ' etf gameIds hah?');

       _games.map(game => {
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
            }
           }
       })
       */

       //teamNames[teammIndex] = gameIdData

       //const gameIdsFb = [gameIds]

    //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');
     //console.log(JSON.stringify(teamNames) + ' etf teamNames hah?');

       //dispatch(updateTeamNames(teamNames))

    //console.log(teamId + ' teamId check here thnks.');
    //console.log(teamId + ' teamId check here thnks.');
    //console.log(JSON.stringify(gameIds[0]) + ' gameIds[0] check here thnks.');
    //console.log(JSON.stringify(gameIds) + ' gameIds check here thnks.');



       firestore().collection(teamId).doc(teamId).update({
         gameIds: gameIds
       })
       .catch(error => console.log(error.message))

       /*
       if (_games.length <= 1) {
         navigate('StepFirst', {
           fromSetup: true
         });
       }
       else {
         navigate('GameHome', {
           fromContinue: 0
         });
       }
       */

       const checkSortNew = checkSort + 1
       dispatch(updateCheckSort(checkSortNew))

       navigate('SeasonPositionSortAllHome', {
         fromContinue: 0
       });


  }
  else {
    Alert.alert("Please select Game-Time, Opposition Team and a Game Format to continue." )
  }

  }

  const backSetup = () => {

    const checkSortNew = checkSort - 1
    dispatch(updateCheckSort(checkSortNew))

    navigate('AddPlayersHome', {
      teamId: games[0].teamId,
      teamIdCode: games[0].teamIdCode,
      whereFrom: 7,
      checkSortLive: 0,
      showNewScreen: false
    });

  }

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
      }
      else if (playersRemainder === 2) {
        playBlocks = z / 2
        playBlocks = Math.ceil(playBlocks)
      }
      else if (z % 2 === 0) {
        playBlocks = 5
      }
      else {
        playBlocks = 6
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

      return {
        totalPlayTime,
        playerPlayTime: Number(playerPlayTime.toFixed(0)),
        playBlocks: Number(playBlocks.toFixed(2)),
        minutesPerBlock,
        playersRemainder: playersRemainder,
      };
    }
  };

  /*const showGameTimeEachPlayer = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    const gameHalfTimeTemp = _games[0].gameHalfTime
    const matchFormat = _games[0].matchFormat

    if (gameHalfTimeTemp !== 0 && matchFormat !== 0) {
      const gameTimeFullRaw = gameHalfTimeTemp * 2
			console.log(gameTimeFullRaw + ' this is going to be large?');
			const gameTimeFull = formattedSeconds(gameTimeFullRaw)
			console.log(gameTimeFull + ' this is going to be large 2?');
      //const matchFormatMinusGoalie = matchFormat - 1
      let teamPlayersLength = _games[0].teamPlayers.length
      if (_games[0].dedicatedGoalie === 1) {
          teamPlayersLength = teamPlayersLength - 1
          //teamPlayersLengthMinusGoalie = teamPlayersLength - 1
      }

      console.log(teamPlayersLength + ' teamPlayersLength is ?here now.');
      const playerMinutes = gameTimeFull * teamPlayersLength
      const avgTimePerPlayerRaw = playerMinutes / teamPlayersLength

			console.log(avgTimePerPlayerRaw + ' avgTimePerPlayerRaw here now.');

			//const avgTimePerPlayer = formattedSeconds(avgTimePerPlayerRaw)
      const avgTimePerPlayer = Math.round(avgTimePerPlayerRaw);

      //_games[0].avgTimePerPlayer = avgTimePerPlayer
      //dispatch(updateGames(_games))

      const result = calculateSubTiming(gameTimeFull, matchFormat, teamPlayersLength );

      console.log("Total Play Time:", result.totalPlayTime);
      console.log("Player Play Time:", result.playerPlayTime);
      console.log("Play Blocks:", result.playBlocks);
      console.log("Minutes Per Block (rounded):", result.minutesPerBlock);

      //_games[0].avgTimePerPlayer = result.playerPlayTime
      //dispatch(updateGames(_games))

        return (
          <Box style={{backgroundColor: '#333'}}>
            <Text style={{color: '#fff', fontSize: 18, padding: 15}}><Text style={{color: '#fff', fontSize: 18, fontWeight: 800}}>Heads up:</Text> Our AI will track playing time and will suggest subs every <Text style={{color: '#fff', fontSize: 18, fontWeight: 800}}>{result.minutesPerBlock}min</Text>, so each outfield player (except the goalie) should get about <Text style={{color: '#fff', fontSize: 18, fontWeight: 800}}>{result.playerPlayTime} minutes</Text> by the end of the game. It’s a helpful target—not an exact rule—since every match comes with unpredictable twists (like injuries, early or late subs… or even the occasional tantrum!). You can find this number at the top left of the main playing screen to help guide fair playing time for everyone. The most important rule is that everyone has fun!</Text>
          </Box>
        )

      //}

    }

  }*/

  const showGameTimeEachPlayer = () => {
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
      console.log(gameTimeFullRaw + ' this is going to be large?')
      const gameTimeFull = formattedSeconds(gameTimeFullRaw)
      console.log(gameTimeFull + ' this is going to be large 2?')

      let teamPlayersLength = _games[0].teamPlayers.length

      if (_games[0].dedicatedGoalie === 1) {
        teamPlayersLength = teamPlayersLength - 1
      }

      console.log(teamPlayersLength + ' teamPlayersLength is ?here now.')

      // If players fit on field with no subs, everyone plays full game
      if (teamPlayersLength <= matchFormat) {
        const playerPlayTime = gameHalfTimeTemp * 2
        const playBlocks = 1
        const minutesPerBlock = playerPlayTime

        console.log("Total Play Time:", playerPlayTime)
        console.log("Player Play Time:", playerPlayTime)
        console.log("Play Blocks:", playBlocks)
        console.log("Minutes Per Block (rounded):", minutesPerBlock)

        return (
          <Box style={{ backgroundColor: '#333' }}>
            <Text style={{ color: '#fff', fontSize: 18, padding: 15 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>Heads up:</Text> Since the number of players equals or is less than the match format, everyone will play the full game—about <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{playerPlayTime} minutes</Text>. Make sure to keep the energy up and enjoy the game!
            </Text>
          </Box>
        )
      }

      const playerMinutes = gameTimeFull * teamPlayersLength
      const avgTimePerPlayerRaw = playerMinutes / teamPlayersLength
      console.log(avgTimePerPlayerRaw + ' avgTimePerPlayerRaw here now.')
      const avgTimePerPlayer = Math.round(avgTimePerPlayerRaw)

      const result = calculateSubTiming(gameTimeFull, matchFormat, teamPlayersLength)

      console.log("Total Play Time:", result.totalPlayTime)
      console.log("Player Play Time:", result.playerPlayTime)
      console.log("Play Blocks:", result.playBlocks)
      console.log("Minutes Per Block (rounded):", result.minutesPerBlock)

      return (
        <Box style={{ backgroundColor: '#333' }}>
          <Text style={{ color: '#fff', fontSize: 18, padding: 15 }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>Heads up:</Text> Our AI will track playing time and will suggest subs every <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{result.minutesPerBlock}min</Text>, so each outfield player (except the goalie) should get about <Text style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{result.playerPlayTime} minutes</Text> by the end of the game. It’s a helpful target—not an exact rule—since every match comes with unpredictable twists (like injuries, early or late subs… or even the occasional tantrum!). You can find this number at the top left of the main playing screen to help guide fair playing time for everyone. The most important rule is that everyone has fun!
          </Text>
        </Box>
      )
    }
  }


      /*
        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Container ml="4" mr="4" minW="90%" style={styles.Container}>
              <ScrollView>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
                  <Heading mb="2" mt="2" style={{color: '#fff'}}>Game Options</Heading>
                  </LinearGradient>

                  <SelectOppTeam navigation={props.navigation} whereFrom={props.route.params.whereFrom}/>
                  <SelectGameTime />
                  <SelectMatchFormats />
                  {showGameTimeEachPlayer()}
                </ScrollView>
              <Box minW="100%" safeAreaTop alignSelf="center">
          <HStack alignItems="center" safeAreaBottom shadow={6}>

          <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>

                </HStack>
                <Button bg="transparent" size="sm" _text={{fontSize: "sm", color: '#fff'}} p="0" m="0" variant="subtle" onPress={() => backSetup()}>Back</Button>

        </Box>
            </Container>
          </LinearGradient>
          </Center>


        )
        */



        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <Container h="100%" w="100%" maxWidth="100%" style={styles.container}>
          <ScrollView>
          <Center>

              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
                  <Heading mb="2" mt="2" style={{color: '#fff'}}>Game Options</Heading>
              </LinearGradient>
              <View>
              <SelectOppTeam navigation={props.navigation} whereFrom={props.route.params.whereFrom}/>
              <SelectGameTime />
              <SelectMatchFormats />
              <SelectDedicatedGoalie />
              {gameDisplay}
              </View>
          </Center>
          </ScrollView>
          <Box maxW="100%" minW="90%" mb="5" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>
            <HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6} >

              <Button maxW="100%" minW="90%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>
            </HStack>
            <Button bg="transparent" size="sm" _text={{fontSize: "sm", color: '#fff'}} p="0" m="0" variant="subtle" onPress={() => backSetup()}>Back</Button>
          </Box>
          </Container>

        </LinearGradient>
      </Center>
        )


    }


const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  ViewPadding: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  linearGradientBg: {
    minWidth: '100%',
    width: '100%',
  },
  linearGradientHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 15,
    //marginBottom: 15,
    //borderColor: '#fff',
    //borderWidth: 1,
  },
})

export default SetupHome;

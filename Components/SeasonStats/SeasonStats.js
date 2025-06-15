import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platfrom } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

import SeasonPositionStats from './SeasonPositionStats'

const SeasonStats = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getGolStat, setGolStat] = useState(0);
  const [getAsstStat, setAsstStat] = useState(0);
  const [getDefTacStat, setDefTacStat] = useState(0);
  const [getGolSaveStat, setGolSaveStat] = useState(0);
  const [getStatsBoardDisplay, setStatsBoardDisplay] = useState(false);
  const [getStatsPlayerId, setStatsPlayerId] = useState(99999999);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let statsBoard = useSelector(state => state.statsBoard.statsBoard)
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData
  const statsPlayerId = props.statsPlayerId
  const whereFrom = props.whereFrom
  const whatData = props.whatData

  const { navigate } = props.navigation;

  useEffect(() => {

 //console.log(props.whereFromOriginal + ' what is props.whereFromOriginal?');
    if (props.whereFromOriginal === 191) {
      seasonsDisplay = props.gameData.seasonId
    }

  },[])


  useEffect(() => {

 //console.log(statsBoard + ' hit and check statsBoard');
    setStatsBoardDisplay(statsBoard)
    setStatsPlayerId(statsBoardPlayerId)
    //setGameOptionBoardDisplay(gameOptionBoard)

  },[statsBoard, statsBoardPlayerId])

  useEffect(() => {

 //console.log(whereFrom + ' where is wherFrom from?');
 //console.log(whereFrom + ' whereFrom seasonStats');
    if (whereFrom === 1 || whereFrom === 'endGame') {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

 //console.log(statsBoardPlayerId + ' what is statsPlayerId, please??');
 //console.log(JSON.stringify(playerData) + ' playerData what is it here and info.');
 //console.log(whatData + ' what is whatData???? 1..');
 //console.log(whereFrom + ' what is whereFrom????');
    if (((statsBoardPlayerId === 99999999 || statsBoardPlayerId === undefined) && whatData !== 1) && whereFrom !== 'endGame') {
   //console.log('maybe somethig baoutthis?');
      setGolStat(0)
    }
    else {
   //console.log(whatData + ' what is whatData????');
      let playerIndex = 0
      if (whatData === 1 || whereFrom === 'endGame') {
     //console.log(JSON.stringify(_games[0].teamPlayers) + ' stats boar dchek games.teamPlayers 1');
          playerIndex = _games[0].teamPlayers.findIndex(x => x.id === playerData.id);
      }
      else {
     //console.log(JSON.stringify(_games[0].teamPlayers) + ' stats boar dchek games.teamPlayers 2');
        playerIndex = _games[0].teamPlayers.findIndex(x => x.id === statsBoardPlayerId);
      }

   //console.log(playerIndex + ' and what is player index? ');
   //console.log(JSON.stringify(_games[0].teamPlayers[playerIndex]) + ' _games[0].teamPlayers[playerIndex] stats boar dchek games.teamPlayers');
   //console.log(_games[0].teamPlayers[playerIndex].gameStats[0].gol + ' just checking oout _games[0].teamPlayers[playerIndex].gameStats[0].gol.');
      const golStat = _games[0].teamPlayers[playerIndex].gameStats[0].gol
      setGolStat(golStat)
      const asstStat = _games[0].teamPlayers[playerIndex].gameStats[0].asst
      setAsstStat(asstStat)
      const defTacStat = _games[0].teamPlayers[playerIndex].gameStats[0].defTac
      setDefTacStat(defTacStat)
      const golSaveStat = _games[0].teamPlayers[playerIndex].gameStats[0].golSave
      setGolSaveStat(golSaveStat)


    }

  }

},[statsBoard, statsBoardPlayerId, sixtySecondsMark])

  const getSeasonStats = () => {

  //console.log(seasonsDisplay + ' what is seasonsDisplay!?');

    //const teamId = games[0].teamId
 //console.log(JSON.stringify(teamPlayers) + ' playerData not wlring on season stats?');

    //let teamSeasonArray = []
    let statDisplay = ''

    /*
    if ((whereFrom === 1 && whatData !== 1) || whereFrom === 'endGame') {
      let playerIndexTemp = 0
   //console.log(JSON.stringify(props.playerData) + ' need to check props.playerData.');
   //console.log(JSON.stringify(props.playerData.id) + ' need to check props.playerData.id');
      if (whereFrom === 1) {
     //console.log('shant be hitting.');
        playerIndexTemp = statsBoardPlayerId;
      }
      else {
        playerIndexTemp = props.playerData.id;
      }
   //console.log(playerIndexTemp + ' i assume this will be undefined aye.');
      const playerIndex = teamPlayers.findIndex(x => x.id === playerIndexTemp);

      const playerData = teamPlayers[playerIndex]
   //console.log(JSON.stringify(playerData) + ' i need to chck playerData here ok.');
      statDisplay = runPlayerStats(playerData)
      //return statDisplay
    }
    */


 //console.log(props.whereFromOriginal + ' what is props.whereFromOriginal');
 //console.log(whereFrom + ' whereFrom for seasonStats');
 //console.log(whatData + ' whatData for seasonStats');
 //console.log(props.posSort + ' props.posSort for seasonStats');
    if (whereFrom === 1 && whatData !== 1) {
   //console.log(statsBoardPlayerId + ' i assume this will be undefined aye.');
      const playerIndex = teamPlayers.findIndex(x => x.id === statsBoardPlayerId);

      const playerData = teamPlayers[playerIndex]
   //console.log(JSON.stringify(playerData) + ' i need to chck playerData here ok.');
      statDisplay = runPlayerStats(playerData)
      //return statDisplay
    }
    else if (props.whereFromOriginal === 181) {
   //console.log('hit props.whereFromOriginal');
      statDisplay = runPlayerStats(props.playerData)
    }
    else if (props.posSort === true) {
      //console.log('hit props.posSort');
      const playerIndex = teamPlayers.findIndex(x => x.id === props.playerDataId);

      const playerIdData = teamPlayers[playerIndex]
   //console.log(JSON.stringify(playerIdData) + ' i need to chck playerIdData here ok.');
      statDisplay = runPlayerStats(playerIdData)
    }
    else {

   //console.log('are we hitting here aye?');
      teamPlayers.map(player => {

          if (playerData.id === player.id) {
            statDisplay = runPlayerStats(player)

          }
      })
    }

    return statDisplay

  }

  const buyPro = () => {
    navigate('Iap');
  }

  const displayPosGamesText = (posType, posSum, posPerGame) => {
    //console.log(props.whereFrom + ' hey need to check as not sure. 1');
    //console.log(props.typeToDisplay + ' what does this say? 1' );
    if ((pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) || (props.typeToDisplay === 1 || props.typeToDisplay === 0 || props.typeToDisplay === '1' || props.typeToDisplay === '0')) {

      if (posType === 'total') {
        return (
          <Text style={styles.textTwentlyEight}>{posSum}</Text>
        )
      }
      else {
        return (
          <View>
            <Text style={styles.textTwentlyEight}>{posSum}</Text>
            <Text style={styles.textTwelve}>({posType} per/game: {posPerGame})</Text>
          </View>
        )
      }
    }
    else {
      //console.log('hit here??');
      return (
        <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>Buy Pro!</Button>
      )
    }

  }

    const runPlayerStats = (player) => {

   //console.log('Just show me???');
   //console.log(JSON.stringify(player) + ' what info do we have on player?');

      //let playerStatsCompare = player
   //console.log('just hit somethihg here!');
      let playerStatsCompare = Object.assign({}, player);

      //console.log(props.typeToDisplay + ' props.typeToDisplay runPlayerStats');
      //console.log(props.typeToDisplay + ' props.typeToDisplay runPlayerStats');
      //console.log(props.typeToDisplay + ' props.typeToDisplay runPlayerStats');
      if (props.typeToDisplay === '1' || props.typeToDisplay === '2') {
     //console.log('im hitting 1 here');
        let currentSeason = ''
        if (games[0].season.id === undefined || games[0].season.id === 99999998 || games[0].season.id < 1) {
          currentSeason = seasonsDisplayId
        }
        else {
          currentSeason = games[0].season.id
        }
        //console.log(currentSeason + ' currentSeason runPlayerStats');
          let playerIndex = 0
          let postionTimesPlayer = []
          let playerPostionStats = []
          try {
            //console.log('im hitting 1 here inside try 1');
            playerIndex = games[0].teamPlayers.findIndex(x => x.id === props.playerDataId);
            //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].gameStats) + ' check games[0].teamPlayers[playerIndex].gameStats here cross now.');
            postionTimesPlayer = games[0].teamPlayers[playerIndex].gameStats
            //player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
            //let playerPostionTimeStats = []
            playerPostionStats = [{gameId: games[0].id, season: currentSeason, stats: postionTimesPlayer}]
            //console.log('im hitting 1 here inside try 2');
          }
          catch {
            //console.log('hit catch in runPlayerStats.');
            let playerIndex = 0
            let postionTimesPlayer = []
            let playerPostionStats = []
          }

          playerStatsCompare.stats = playerPostionStats
      }
      else {
     //console.log('im NOT hitting 1 here');
     //console.log(JSON.stringify(player) + ' does player have update game stats?');
        playerStatsCompare = player
      }
      //console.log('or i hit here.');
      let golSum = 0
      let asstSum = 0
      let defTacSum = 0
      let golSaveSum = 0

        let gameGol = 0
        let gameAsst = 0
        let gameDefTac = 0
        let gameGolSave = 0
        //let seasonArray = []
        let golArray = []
        let asstArray = []
        let defTacArray = []
        let golSaveArray = []

     //console.log(JSON.stringify(playerStatsCompare) + ' need to check playerStatsCompare here.');
      //console.log(JSON.stringify(playerStatsCompare.stats) + ' need to check playerStatsCompare.stats here.');
      //console.log(JSON.stringify(playerStatsCompare.stats) + ' need to check playerStatsCompare.stats[0].gol here.');

        try {
          playerStatsCompare.stats.map(stat => {
         //console.log(JSON.stringify(stat) + ' stat here');
         //console.log(JSON.stringify(stat.stats) + ' stat.stats here');
         //console.log(JSON.stringify(stat.stats.gol) + ' stat.stats.gol here');
         //console.log(stat.stats.gol + ' stat.stats.gol work?');
          //console.log(stat.stats.gol[0] + ' stat.stats.gol[0] work??');
         //console.log(stat.season + ' stat.season.');
         //console.log(seasonsDisplayId + ' seasonsDisplayId');
         //console.log(JSON.stringify(stat.stats[0].gol) + ' stat.stats.gol here');
         //console.log(JSON.stringify(stat.stats[0].asst) + ' stat.stats.asst here');
         //console.log(JSON.stringify(stat.stats) + ' stat.stats here.');
         //console.log(JSON.stringify(stat) + ' stat here.');
         //console.log(props.whereFromOriginal + ' waht is props.whereFromOriginal two');
            if (stat.season === seasonsDisplayId) {
            try {
              //if (props.whereFromOriginal === 181) {
                //gameGol = stat.stats.gol
              //}
              //else {
                  gameGol = stat.stats[0].gol
              //}

              //console.log(gameGol + ' checking my gameGol new here');
              golArray.push(gameGol)
            }
            catch {
              gameGol = 0
              //console.log(gameGol + ' checking my gameGol here 0.');
              golArray.push(gameGol)
            }
            try {
              //if (props.whereFromOriginal === 181) {
                //gameAsst = stat.stats.asst
              //}
              //else {
                gameAsst = stat.stats[0].asst
              //}
              //console.log(gameAsst + ' checking my gameAsst new here');
              asstArray.push(gameAsst)
            }
            catch {
              gameAsst = 0
              //console.log(gameAsst + ' checking my gameAsst here 0');
              asstArray.push(gameAsst)
            }
            try {
              /*if (props.whereFromOriginal === 181) {
                gameDefTac = stat.stats.defTac
              }
              else {*/
                gameDefTac = stat.stats[0].defTac
              //}
              defTacArray.push(gameDefTac)
            }
            catch {
              gameDefTac = 0
              defTacArray.push(gameDefTac)
            }
            try {
              /*
              if (props.whereFromOriginal === 181) {
                gameGolSave = stat.stats.golSave
              }
              else {*/
                  gameGolSave = stat.stats[0].golSave
              //}
              golSaveArray.push(gameGolSave)
            }
            catch {
              gameGolSave = 0
              golSaveArray.push(gameGolSave)
            }
          }
          else {

            //golArray.push(0)
            //asstArray.push(0)
            //defTacArray.push(0)
            //golSaveArray.push(0)

          }

            //seasonArray.push({gol: gameGol, asst: gameAsst, defTac: gameDefTac, golSave: gameGolSave})
          })
        }
        catch {
       //console.log('weve hit an issue.');
        }

     //console.log(JSON.stringify(golArray)  + ' golArray here..');
       //console.log(JSON.stringify(golArray) + ' what is golArray like?');
          try {
          golSum = golArray.reduce(function(a, b){
         //console.log(a + ' what is a huh?');

            return a + b;

          });
        }
        catch {
          golSum = 0
        }

     //console.log(getGolStat + ' getGolStat');
     //console.log(golSum + ' golSum.');

       //console.log(whereFrom + ' where form showing?');
          if (whereFrom === 'endGame') {
            // do nothing
          }
          else {
            golSum = golSum + getGolStat
          }

          try {
          asstSum = asstArray.reduce(function(a, b){
         //console.log(a + ' what is a.gameGol? huh?');

            return a + b;

          });
        }
        catch {
          asstSum = 0
        }

        if (whereFrom === 'endGame') {
          // do nothing
        }
        else {
          asstSum = asstSum + getAsstStat
        }

          try {
          defTacSum = defTacArray.reduce(function(a, b){
         //console.log(a + ' what is a.gameGol? huh?');

            return a + b;

          });
        }
        catch {
          defTacSum = 0
        }

        if (whereFrom === 'endGame') {
          // do nothing
        }
        else {
          defTacSum = defTacSum + getDefTacStat
        }

          try {
          golSaveSum = golSaveArray.reduce(function(a, b){
         //console.log(a + ' what is a.gameGol? huh?');

            return a + b;

          });
        }
        catch {
          golSaveSum = 0
        }

        if (whereFrom === 'endGame') {
          // do nothing
        }
        else {
          golSaveSum = golSaveSum + getGolSaveStat
        }

          if (props.whereFrom === 78) {
         //console.log(props.totalGamesPlayed + ' props.totalGamesPlayed is?');
            const totalGamesPlayed = props.totalGamesPlayed
            let goalsPerGame = golSum / totalGamesPlayed
            goalsPerGame = goalsPerGame.toFixed(1)

            if (isNaN(goalsPerGame) || goalsPerGame === '0.0') {
              goalsPerGame = 0
            }

            let assistsPerGame = asstSum / totalGamesPlayed
            assistsPerGame = assistsPerGame.toFixed(1)

            if (isNaN(assistsPerGame) || assistsPerGame === '0.0') {
              assistsPerGame = 0
            }

            let defPerGame = defTacSum / totalGamesPlayed
            defPerGame = defPerGame.toFixed(1)

            if (isNaN(defPerGame) || defPerGame === '0.0') {
              defPerGame = 0
            }

            let golSavePerGame = golSaveSum / totalGamesPlayed
            golSavePerGame = golSavePerGame.toFixed(1)

            if (isNaN(golSavePerGame) || golSavePerGame === '0.0') {
              golSavePerGame = 0
            }



            return (
              <VStack ml="3" mr="3">
              <HStack>
              <Heading pt="2" pb="2" style={{color: '#fff'}}>
                Player Stats:
              </Heading>
              </HStack>
              <HStack mt="2" ml="0">
              <Box minW="100%" alignSelf="center" mr="2" mb="2">
                <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
                  <Text style={styles.textTwentyBold}>Total Games Played</Text>
                  <Box mt="1" mb="1">
                    <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
                  </Box>
                  {displayPosGamesText('total', totalGamesPlayed, null)}
                </Button>
              </Box>
              </HStack>
              <HStack mt="2" ml="0">
              <Box minW="25%" alignSelf="center" mr="2">
                <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
                  <Text style={styles.textTwentyBold}>Goals</Text>
                  <Box mt="1" mb="1">
                    <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
                  </Box>
                  {displayPosGamesText('goals', golSum, goalsPerGame)}
                </Button>
              </Box>
              <Box minW="25%"alignSelf="center" ml="2">
                <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
                  <Text style={styles.textTwentyBold}>Assists</Text>
                  <Box mt="1" mb="1">
                    <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
                  </Box>
                  {displayPosGamesText('assists', asstSum, assistsPerGame)}
                </Button>
              </Box>
              </HStack>
              <HStack mt="4">
              <Box minW="25%"alignSelf="center" mr="2" >
                <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
                  <Text style={styles.textTwentyBold}>Def. Tackle</Text>
                  <Box mt="1" mb="1">
                    <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
                  </Box>
                  {displayPosGamesText('Def. tackle', defTacSum, defPerGame)}
                </Button>
              </Box>
              <Box minW="25%" alignSelf="center" ml="2">
                <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="49%" size="xs">
                  <Text style={styles.textTwentyBold}>Goal Save</Text>
                  <Box mt="1" mb="1">
                    <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
                  </Box>
                  {displayPosGamesText('Saves', golSaveSum, golSavePerGame)}
                </Button>
              </Box>
              </HStack>
              </VStack>
            )

          }

          if (props.posSort === true) {
          //console.log(props.posSort + ' props.posSort is?');
            return (
              <HStack mt="2" ml="0">
              <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
                {displayPosGamesTextTwoPosSort('gol', golSum)}
              </Box>
              <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
                {displayPosGamesTextTwoPosSort('assist', asstSum)}
              </Box>
              <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
                {displayPosGamesTextTwoPosSort('defTac', defTacSum)}
              </Box>
              <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
                {displayPosGamesTextTwoPosSort('golSave', golSaveSum)}
              </Box>
              </HStack>
            )
          }
          else {
          //console.log(' else is here?');
          //console.log(golSum + ' just checking golSum here if still same.');

    return (
      <HStack mt="2" ml="0">
      <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
        {displayPosGamesTextTwo('gol', golSum)}
      </Box>
      <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
        {displayPosGamesTextTwo('assist', asstSum)}
      </Box>
      <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
        {displayPosGamesTextTwo('defTac', defTacSum)}
      </Box>
      <Box style={{minWidth: '25%', maxWidth: '25%'}} alignSelf="center">
        {displayPosGamesTextTwo('golSave', golSaveSum)}
      </Box>
      </HStack>
    )
  }


  }

  const displayPosGamesTextTwo = (posType, posSum) => {

  //console.log('tweet here tweety 1');
  //console.log(props.whereFrom + ' need to check as not sure. 2');
  //console.log(props.typeToDisplay + ' typeToDisplay to check as not sure. 2');

    if ((pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) || (props.typeToDisplay === 1)) {
    //console.log('tweet here tweety 2');
      if (posType === 'gol') {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
            <Text style={styles.textPos}>{posSum}</Text>
            <Text style={styles.textPosStat}>Goals</Text>
            <Text style={styles.textPosStat}></Text>
          </Button>
          )
        }
        else if (posType === 'assist') {
        //console.log('tweet here tweety 3');
          return (
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
              <Text style={styles.textPos}>{posSum}</Text>
              <Text style={styles.textPosStat}>Assists</Text>
              <Text style={styles.textPosStat}></Text>
            </Button>
        )
      }
      else if (posType === 'defTac') {
      //console.log('tweet here tweety 4');
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}>
            <Text style={styles.textPos}>{posSum}</Text>
            <Text style={styles.textPosStat}>Def. </Text>
            <Text style={styles.textPosStat}>Tackle</Text>
          </Button>
        )
      }
      else if (posType === 'golSave') {
      //console.log('tweet here tweety 5');
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textPos}>{posSum}</Text>
            <Text style={styles.textPosStat}>Goal</Text>
            <Text style={styles.textPosStat}>Save</Text>
          </Button>
        )
      }
    }
    else {
      if (posType === 'gol' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
      //console.log('tweet here tweety 6');
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textPosStat}>Goals</Text>
            <Text style={styles.textPosStat}></Text>
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={styles.textPosPro}>Buy</Text>
            <Text style={styles.textPosPro}>Pro</Text>
            </Button>
          </Button>
          )
        }
        else if (posType === 'assist' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
        //console.log('tweet here tweety 7');
          return (
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}>
              <Text style={styles.textPosStat}>Assists</Text>
              <Text style={styles.textPosStat}></Text>
              <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
              <Text style={styles.textPosPro}>Buy</Text>
              <Text style={styles.textPosPro}>Pro</Text>
              </Button>
            </Button>
        )
      }
      else if (posType === 'defTac' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
      //console.log('tweet here tweety 8');
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textPosStat}>Def. </Text>
            <Text style={styles.textPosStat}>Tackle</Text>
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={styles.textPosPro}>Buy</Text>
            <Text style={styles.textPosPro}>Pro</Text>
            </Button>
          </Button>
        )
      }
      else if (posType === 'golSave' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
      //console.log('tweet here tweety 9');
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}>
            <Text style={styles.textPosStat}>Goal</Text>
            <Text style={styles.textPosStat}>Save</Text>
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={styles.textPosPro}>Buy</Text>
            <Text style={styles.textPosPro}>Pro</Text>
            </Button>
          </Button>
        )
      }
      else {
      //console.log('tweet here tweety 10');
        return (
          <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>Buy Pro!</Button>
        )
      }
    }

  }

  const displayPosGamesTextTwoPosSort = (posType, posSum) => {

    //console.log(props.whereFrom + '  whereFrom need to check as not sure. 3');
    //console.log(props.typeToDisplay + ' typeToDisplay what does this say? 3' );
    //console.log(props.typeToDisplay + ' props.typeToDisplay is whaaaat?? man');
    //console.log(props.typeToDisplay + ' props.typeToDisplay is whaaaat?? man');
    //console.log(posType + ' posType is?');
    //console.log(posSum + ' posSum is???');

    if ((pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) || (props.typeToDisplay === '1' || props.typeToDisplay === '0')) {

      if (posType === 'gol') {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1, paddingTop: 1, paddingBottom: 1, minHeight: 70}}>
            <Text style={styles.textTwelveDisplay}>{posSum}</Text>
            <Text style={styles.textPosPaidProDisplay}>Goals</Text>
          </Button>
          )
        }
        else if (posType === 'assist') {
          return (
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1, paddingTop: 1, paddingBottom: 1, minHeight: 70}}>
              <Text style={styles.textTwelveDisplay}>{posSum}</Text>
              <Text style={styles.textPosPaidProDisplay}>Assists</Text>
            </Button>
        )
      }
      else if (posType === 'defTac') {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1, paddingTop: 1, paddingBottom: 1, minHeight: 70}}>
            <Text style={styles.textTwelveDisplay}>{posSum}</Text>
            <Text style={styles.textPosPaidProDisplay}>Def. </Text>
            <Text style={styles.textPosPaidProDisplay}>Tackle</Text>
          </Button>
        )
      }
      else if (posType === 'golSave') {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, paddingTop: 1, paddingBottom: 1, minHeight: 70}}>
            <Text style={styles.textTwelveDisplay}>{posSum}</Text>
            <Text style={styles.textPosPaidProDisplay}>Goal</Text>
            <Text style={styles.textPosPaidProDisplay}>Save</Text>
          </Button>
        )
      }
    }
    else {
      if (posType === 'gol' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, minHeight: 80}}>
            <Text style={styles.textPosPaidPro}>Goals.....</Text>
            <Text style={styles.textPosPaidPro}></Text>
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={styles.textPosTen}>Buy</Text>
            <Text style={styles.textPosTen}>Pro</Text>
            </Button>
          </Button>
          )
        }
        else if (posType === 'assist' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
          return (
            <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, minHeight: 80}}>
              <Text style={styles.textPosPaidPro}>Assists</Text>
              <Text style={styles.textPosPaidPro}></Text>
              <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
              <Text style={styles.textPosTen}>Buy</Text>
              <Text style={styles.textPosTen}>Pro</Text>
              </Button>
            </Button>
        )
      }
      else if (posType === 'defTac' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, minHeight: 80}}>
            <Text style={styles.textPosPaidPro}>Def. </Text>
            <Text style={styles.textPosPaidPro}>Tackle</Text>
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={styles.textPosTen}>Buy</Text>
            <Text style={styles.textPosTen}>Pro</Text>
            </Button>
          </Button>
        )
      }
      else if (posType === 'golSave' && (props.whereFrom === 7 || props.whereFrom === 1 || props.whereFrom === 'endGame')) {
        return (
          <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, minHeight: 80}}>
            <Text style={styles.textPosPaidPro}>Goal</Text>
            <Text style={styles.textPosPaidPro}>Save</Text>
            <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={styles.textPosTen}>Buy</Text>
            <Text style={styles.textPosTen}>Pro</Text>
            </Button>
          </Button>
        )
      }
      else if (props.whereFrom === 79) {
        //show nothing.
      }
      else {
        return (
          <Button bg="#E879F9" size="md"  pt="2" pb="2" _text={{fontSize: 14, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>Buy Pro!</Button>
        )
      }
    }

  }

        return (
          <View>
            {games.length <= 1 &&
              <Center>
                </Center>
            }
            {seasonsDisplay !== '' &&
            <Center>
                {getSeasonStats()}
              </Center>
            }
            {seasonsDisplay === '' &&
            <Box>
              <Box bg="cyan.400" minW="100%" mt="2" pt="2" pb="2" pl="2" pr="2" style={{borderRadius: 5, borderColor: '#fff', borderWidth: 2}}><Text style={styles.textEighteenNoCneter}>Re-select Season from dropdown menu below to show current season stats</Text></Box>
              </Box>
            }

            </View>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textPos: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
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
  textPosStat: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 16.3,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
  textPosPro: {
    color: '#fff',
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
  textPosPaidPro: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 8,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
  textPosPaidProDisplay: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 12,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
  textPosTen: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 10,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
  textTwentyBold: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
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
  textTwelve: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 12,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
  textTwelveDisplay: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 16,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
  textTwentlyEight: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 28,
      },
      default: {
        lineHeight: 0,
      }
    })
  },
  textEighteenNoCneter: {
    color: '#fff',
    fontSize: 18,
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

export default SeasonStats;

/*
<HStack>
<Box minW="23%" alignSelf="center" ml="3" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].gol}</Text><Text style={styles.textTwelve}>Goals</Text><Text style={styles.textTwelve}></Text></Button>
</Box>
<Box minW="23%"alignSelf="center" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].asst}</Text><Text style={styles.textTwelve}>Assists</Text><Text style={styles.textTwelve}></Text></Button>
</Box>
<Box minW="23%"alignSelf="center" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].defTac}</Text><Text style={styles.textTwelve}>Def. </Text><Text style={styles.textTwelve}>Tackle</Text></Button>
</Box>
<Box minW="23%" alignSelf="center" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].golSave}</Text><Text style={styles.textTwelve}>Goal</Text><Text style={styles.textTwelve}>Save</Text></Button>
</Box>
</HStack>
<Center>
  <HStack mt="3">
    <Box ml="3" minW="10%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
    </Box>
    <Box minW="35%" ml="3">
      <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>Season Stats</Text>
    </Box>
    <Box mr="3" minW="45.5%" style={{borderColor: '#fff', borderWidth: 2, lineHeight: 0, height: 2, marginTop: 10}}>
    </Box>
  </HStack>
</Center>
*/

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
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

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData
  const statsPlayerId = props.statsPlayerId
  const whereFrom = props.whereFrom
  const whatData = props.whatData

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
    //console.log(whatData + ' what is whatData???? 1..');
    if (((statsBoardPlayerId === 99999999 || statsBoardPlayerId === undefined) && whatData !== 1) && whereFrom !== 'endGame') {
      //console.log('maybe somethig baoutthis?');
      setGolStat(0)
    }
    else {
      //console.log(JSON.stringify(_games[0].teamPlayers) + ' stats boar dchek games.teamPlayers');
      let playerIndex = 0
      //console.log(whatData + ' what is whatData????');
      if (whatData === 1 || whereFrom === 'endGame') {
          playerIndex = _games[0].teamPlayers.findIndex(x => x.id === playerData.id);
      }
      else {
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

  },[statsBoard, statsBoardPlayerId])

  const getSeasonStats = () => {

    //const teamId = games[0].teamId
    //console.log(JSON.stringify(teamPlayers) + ' playerData not wlring on season stats?');

    //let teamSeasonArray = []
    let statDisplay = ''

    /*
    if ((whereFrom === 1 && whatData !== 1) || whereFrom === 'endGame') {
      let playerIndexTemp = 0
      console.log(JSON.stringify(props.playerData) + ' need to check props.playerData.');
      console.log(JSON.stringify(props.playerData.id) + ' need to check props.playerData.id');
      if (whereFrom === 1) {
        console.log('shant be hitting.');
        playerIndexTemp = statsBoardPlayerId;
      }
      else {
        playerIndexTemp = props.playerData.id;
      }
      console.log(playerIndexTemp + ' i assume this will be undefined aye.');
      const playerIndex = teamPlayers.findIndex(x => x.id === playerIndexTemp);

      const playerData = teamPlayers[playerIndex]
      //console.log(JSON.stringify(playerData) + ' i need to chck playerData here ok.');
      statDisplay = runPlayerStats(playerData)
      //return statDisplay
    }
    */

    if (whereFrom === 1 && whatData !== 1) {
      console.log(statsBoardPlayerId + ' i assume this will be undefined aye.');
      const playerIndex = teamPlayers.findIndex(x => x.id === statsBoardPlayerId);

      const playerData = teamPlayers[playerIndex]
      //console.log(JSON.stringify(playerData) + ' i need to chck playerData here ok.');
      statDisplay = runPlayerStats(playerData)
      //return statDisplay
    }
    else {


      teamPlayers.map(player => {

        if (playerData.id === player.id) {
          statDisplay = runPlayerStats(player)

        }
      })
    }

    return statDisplay

  }

    const runPlayerStats = (player) => {

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

        try {
          player.stats.map(stat => {
            //console.log(stat.stats.gol + ' stat.stats.gol work?');
            //console.log(stat.stats.gol[0] + ' stat.stats.gol[0] work?');
            //console.log(stat.season + ' stat.season');
            //console.log(seasonsDisplay + ' seasonsDisplay');
            //console.log(JSON.stringify(stat.stats[0].gol) + ' stat.stats.gol here');
            //console.log(JSON.stringify(stat.stats[0].asst) + ' stat.stats.asst here');
            //console.log(JSON.stringify(stat.stats) + ' stat.stats here.');
            //console.log(JSON.stringify(stat) + ' stat here.');
            if (stat.season === seasonsDisplay) {
            try {
              gameGol = stat.stats[0].gol
              golArray.push(gameGol)
            }
            catch {
              gameGol = 0
              golArray.push(gameGol)
            }
            try {
              gameAsst = stat.stats[0].asst
              asstArray.push(gameAsst)
            }
            catch {
              gameAsst = 0
              asstArray.push(gameAsst)
            }
            try {
              gameDefTac = stat.stats[0].defTac
              defTacArray.push(gameDefTac)
            }
            catch {
              gameDefTac = 0
              defTacArray.push(gameDefTac)
            }
            try {
              gameGolSave = stat.stats[0].golSave
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
            //console.log(a.gameGol + ' what is a.gameGol? huh?');

            return a + b;

          });
        }
        catch {
          golSum = 0
        }

        //console.log(getGolStat + ' getGolStat');

          golSum = golSum + getGolStat

          try {
          asstSum = asstArray.reduce(function(a, b){
            //console.log(a.gameGol + ' what is a.gameGol? huh?');

            return a + b;

          });
        }
        catch {
          asstSum = 0
        }

          asstSum = asstSum + getAsstStat

          try {
          defTacSum = defTacArray.reduce(function(a, b){
            //console.log(a.gameGol + ' what is a.gameGol? huh?');

            return a + b;

          });
        }
        catch {
          defTacSum = 0
        }

          defTacSum = defTacSum + getDefTacStat

          try {
          golSaveSum = golSaveArray.reduce(function(a, b){
            //console.log(a.gameGol + ' what is a.gameGol? huh?');

            return a + b;

          });
        }
        catch {
          golSaveSum = 0
        }

          golSaveSum = golSaveSum + getGolSaveStat


    return (
      <HStack mt="2" ml="0">
      <Box minW="25%" alignSelf="center">
        <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{golSum}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goals</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>
      </Box>
      <Box minW="25%"alignSelf="center">
        <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{asstSum}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Assists</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>
      </Box>
      <Box minW="25%"alignSelf="center">
        <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{defTacSum}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Def. </Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Tackle</Text></Button>
      </Box>
      <Box minW="25%" alignSelf="center">
        <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="25%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{golSaveSum}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goal</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Save</Text></Button>
      </Box>
      </HStack>
    )


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
              <Box bg="cyan.400" minW="100%" mt="2" pt="2" pb="2" pl="2" pr="2" style={{borderRadius: 5, borderColor: '#fff', borderWidth: 2}}><Text style={{color: '#fff', fontSize: 18, lineHeight: 0}}>Select Season from dropdown menu above to show current season stats</Text></Box>
              </Box>
            }

            </View>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default SeasonStats;

/*
<HStack>
<Box minW="23%" alignSelf="center" ml="3" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].gol}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goals</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>
</Box>
<Box minW="23%"alignSelf="center" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].asst}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Assists</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}></Text></Button>
</Box>
<Box minW="23%"alignSelf="center" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightColor: '#fff', borderRightWidth: 1}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].defTac}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Def. </Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Tackle</Text></Button>
</Box>
<Box minW="23%" alignSelf="center" mt="3">
  <Button bg="cyan.400" _pressed={{ backgroundColor: 'cyan.400', opacity: 1 }} pl="1" pr="1" minW="23%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 0}}>{playerData.gameStats[0].golSave}</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Goal</Text><Text style={{color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 0}}>Save</Text></Button>
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

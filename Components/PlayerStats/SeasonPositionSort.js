import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateStatsSort } from '../../Reducers/statsSort';

const SeasonPositionSort = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getFwdTime, setFwdTime] = useState(0);
  const [getFwdPercent, setFwdPercent] = useState(0);
  const [getMidTime, setMidTime] = useState(0);
  const [getMidPercent, setMidPercent] = useState(0);
  const [getDefTime, setDefTime] = useState(0);
  const [getDefPercent, setDefPercent] = useState(0);
  const [getGolTime, setGolTime] = useState(0);
  const [getGolPercent, setGolPercent] = useState(0);
  const [getSubTime, setSubTime] = useState(0);
  const [getSubPercent, setSubPercent] = useState(0);
  const [statsSort, setStatsSort] = useState([]);

  //let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
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
  const whereFrom = props.whereFrom
  const whatData = props.whatData

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
      ':' +
    ('0' + sec % 60).slice(-2)

    const { navigate } = props.navigation;

    useEffect(() => {

    //console.log('hitting? 1');
      const sortObj = []
      //setStatsSort(enptyObj)
    //console.log('hitting? 2');
    //console.log(JSON.stringify(sortObj) + ' what is?');

      if (props.whereFromPlayer === 181 || props.whereFromPlayer === 191) {
      //console.log('tra hit tra?');
        props.teamPosData.map(player => {

          //if (player.teamId === props.teamId) {

        //console.log(JSON.stringify(player) + ' need to chek diff player 1');

            runPlayerPosStats(player, sortObj)

        //}

      })
      }
      else {
        teamPlayers.map(player => {

          if (player.teamId === props.teamId) {

          //console.log(JSON.stringify(player) + ' need to chek diff player 2');

            runPlayerPosStats(player, sortObj)

        }

      })
  }

  },[props.playerData])

  const buyPro = () => {
    navigate('Iap');
  }

  const getPlayerNameDisplay = (playerNameDisplay, playerNameDisplayNumberName) => {

    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
      return (
        <Text>
          {playerNameDisplay}
        </Text>
      )
    }
    else {

      return (

          <Text style={{fontWeight: 600, fontSize: 10}}>
            <Text style={{fontWeight: 600, fontSize: 14}}>{playerNameDisplayNumberName}:</Text> (Buy 'Pro' to display real player names & stats)
          </Text>

      )
    }

  }

  const getPositionTimesDisplay = () => {

      let indexSortPlayers = 0
      let playerNameNumber = 0
      let playerNameDisplayNumber = 0
      let playerNameDisplayNumberName = ''
        const statDisplay = statsSort.map(player => {

        //console.log(JSON.stringify(player) + ' what exactly is player?');

          indexSortPlayers++

          const percentTotal = player.percentTotal
          const percentTotalPlayed = 100 - percentTotal
          let percentTotalString = percentTotal.toString();
          percentTotalString = percentTotalString + '%'
          let percentTotalPlayedString = percentTotalPlayed.toString();
          percentTotalPlayedString = percentTotalPlayedString + '%'

        //console.log(JSON.stringify(props.playerData) + ' props.playerData');
          let playerSelectedId = props.playerData.id

          let playerNameDisplay = player.playerName


          if ((props.whereFromPlayer === 181 || props.whereFromPlayer === 191) && (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true)) {

            playerSelectedId = props.playerData.playerId

          //console.log(JSON.stringify(playerUserDataPlayers) + ' playerUserDataPlayers now need to look.');

            if (props.playerData.playerId === player.playerId) {
              playerNameDisplay = player.playerName
              playerNameNumber++
            }
            else  {
              playerNameNumber++
              playerNameDisplay = 'Player ' + playerNameNumber
            }

            /*
            let loopedPlayer = false
            playerUserDataPlayers.map(playerUserData => {
            //console.log(JSON.stringify(playerUserData.playerId) + ' playerUserData hmm');
            //console.log(JSON.stringify(player.playerId) + ' playerUserData hmm');
            //console.log(JSON.stringify(player) + ' player hmm');
              if (playerUserData.playerId === player.playerId) {
                playerNameDisplay = player.playerName
                playerNameNumber++
                loopedPlayer = true
              }
              else if (loopedPlayer === false) {
                playerNameNumber++
                playerNameDisplay = 'Player ' + playerNameNumber
              }

            })
            */

          }
          playerNameDisplayNumber++
          playerNameDisplayNumberName = 'Player ' + playerNameDisplayNumber
        //console.log(playerNameDisplayNumberName + ' playerNameDisplayNumberName');

              return (
                <VStack minW="100%">
                {playerSelectedId === player.playerId &&
                  <View style={{borderTopColor: 'yellow', borderTopWidth: 3, marginTop: 10}} />
                }
                  <HStack>
                    {getPlayerNameDisplay(playerNameDisplay, playerNameDisplayNumberName)}
                  </HStack>
                  <HStack minW="100%">
                  <View style={styles.percentPlayed(percentTotalPlayedString)}>
                    {percentTotalPlayed >= 5 &&
                      <Text style={{color: '#fff', marginLeft: 5}}>{percentTotalPlayedString}</Text>
                    }
                  </View>
                    <View style={styles.percent(percentTotalString)}>
                      {percentTotal >= 5 &&
                        <Text style={{color: '#333', marginLeft: 5}}>{percentTotalString}</Text>
                      }
                    </View>

                  </HStack>
                  {playerSelectedId === player.playerId &&
                    <View style={{borderBottomColor: 'yellow', borderBottomWidth: 3, marginTop: 10, marginBottom: 5}} />
                  }
                </VStack>
              )
            })


    return statDisplay

  }


    const runPlayerPosStats = (player, sortObj) => {

    //console.log(JSON.stringify(player) + ' now check inital play data');
    //console.log(JSON.stringify(player.postionTimeStats) + ' player.postionTimeStats now check inital play data');
    //console.log(JSON.stringify(player[0].postionTimeStats) + ' now check inital play data');

      const postionTimeStats = [player.postionTimeStats]

      let fwdTotalTime = 0
      let fwdTotalPercent = 0
      let midTotalTime = 0
      let midTotalPercent = 0
      let defTotalTime = 0
      let defTotalPercent = 0
      let golTotalTime = 0
      let golTotalPercent = 0
      let subTotalTime = 0
      let subTotalPercent = 0
      let totalPlayedPercent = 0

      let conuntLoop = 0

      let fwdTimeArray = []
      let midTimeArray = []
      let defTimeArray = []
      let golTimeArray = []
      let subTimeArray = []

    //console.log(JSON.stringify(player.postionTimeStats[0]) + ' player.postionTimeStats[0]');
    //console.log(JSON.stringify(player.postionTimeStats[1]) + ' player.postionTimeStats[1]');

      postionTimeStats.map(stats => {
      //console.log(JSON.stringify(stats) + ' just check stat');
      //console.log(JSON.stringify(stats[0]) + ' just check stat [0]');
      //console.log(JSON.stringify(stats[1]) + ' just check stat [1]');
        stats.map(stat => {

        //conuntLoop++
      //console.log(conuntLoop + ' check conuntLoop 0');
        })
      })

      try {
    postionTimeStats.map(stats => {
    //console.log(JSON.stringify(stats) + ' real just check stat');
    //console.log(JSON.stringify(stats[0]) + ' real just check stat [0]');
    //console.log(JSON.stringify(stats[1]) + ' real just check stat [1]');
      stats.map(stat => {
      conuntLoop++
    //console.log(conuntLoop + ' check conuntLoop 1');
    //console.log(JSON.stringify(stat) + ' i think stat needs checked..');

      /*
      fwdTotalTime = 0
      fwdTotalPercent = 0
      midTotalTime = 0
      midTotalPercent = 0
      defTotalTime = 0
      defTotalPercent = 0
      golTotalTime = 0
      golTotalPercent = 0
      subTotalTime = 0
      subTotalPercent = 0
      totalPlayedPercent = 0

      fwdTimeArray = []
      midTimeArray = []
      defTimeArray = []
      golTimeArray = []
      subTimeArray = []
      */
    //console.log(props.whereFromPlayer + ' props.whereFromPlayer??');
    //console.log(stat.season + ' stat[0].season is? (works from coash player stats)');
    //console.log(stat.season + ' stat.season is?');
    //console.log(props.seasonId + ' props.seasonId is?');


      if (stat.season === props.seasonId || props.whereFromPlayer === 191) {
      //console.log(' should be getting here? ');
        let fwdData = []
        let midData = []
        let defData = []
        let golData = []
        let subData = []
    try {
    //console.log(JSON.stringify(stat.posTimes.fwd) + ' [0] playerData firsy fws check.. (works from coash player stats)');

      if (props.whereFromPlayer === 191) {
        fwdData = stat.fwd
        midData = stat.mid
        defData = stat.def
        golData = stat.gol
        subData = stat.sub
      }
      else {
          fwdData = stat.posTimes.fwd
          midData = stat.posTimes.mid
          defData = stat.posTimes.def
          golData = stat.posTimes.gol
          subData = stat.posTimes.sub
      }

      fwdData.map(fwd => {
      //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check.. 1');
        const totalTime = getPositionTimes(fwd)
      //console.log(JSON.stringify(stat.posTimes.fwd) + ' playerData firsy fws check.. 2');
      //console.log(totalTime + ' need to look at totalTime here..');
        const totalTimeNum = Number(totalTime)
        fwdTimeArray.push(totalTimeNum)
      })
    }
    catch {
    //console.log('this is a hit playerData firsy fws check');
      const totalTime = 0
      fwdTimeArray.push(totalTime)
    }

  //console.log('do i even get to here?');

    try {

    //console.log('do i even get to here? 2');

      if (props.whereFromPlayer === 191) {
      //console.log('do i even get to here? 3');
        fwdData = stat.fwd
        midData = stat.mid
        defData = stat.def
        golData = stat.gol
        subData = stat.sub
      }
      else {
      //console.log('do i even get to here? 4.');
      //console.log(JSON.stringify(stat) + ' firsy mid stat[0]');
      //console.log(JSON.stringify(stat.posTimes.mid) + ' firsy mid check new new.');
          fwdData = stat.posTimes.fwd
          midData = stat.posTimes.mid
          defData = stat.posTimes.def
          golData = stat.posTimes.gol
          subData = stat.posTimes.sub
      }
    //console.log(JSON.stringify(stat.posTimes.mid) + ' firsy mid check new.');
      midData.map(mid => {
      //console.log(mid + ' mid check.');
        const totalTime = getPositionTimes(mid)
        const totalTimeNum = Number(totalTime)
        midTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      midTimeArray.push(totalTime)
    }

    try {
      if (props.whereFromPlayer === 191) {
        fwdData = stat.fwd
        midData = stat.mid
        defData = stat.def
        golData = stat.gol
        subData = stat.sub
      }
      else {
          fwdData = stat.posTimes.fwd
          midData = stat.posTimes.mid
          defData = stat.posTimes.def
          golData = stat.posTimes.gol
          subData = stat.posTimes.sub
      }
    //console.log(JSON.stringify(stat.posTimes.def) + ' firsy def check new.');
      defData.map(def => {
      //console.log(JSON.stringify(def) + ' def check sort.');
        const totalTime = getPositionTimes(def)
        const totalTimeNum = Number(totalTime)
        defTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      defTimeArray.push(totalTime)
    }

    try {
      if (props.whereFromPlayer === 191) {
        fwdData = stat.fwd
        midData = stat.mid
        defData = stat.def
        golData = stat.gol
        subData = stat.sub
      }
      else {
          fwdData = stat.posTimes.fwd
          midData = stat.posTimes.mid
          defData = stat.posTimes.def
          golData = stat.posTimes.gol
          subData = stat.posTimes.sub
      }
    //console.log(JSON.stringify(stat.posTimes.gol) + ' firsy gol check new.');
      golData.map(gol => {
      //console.log(gol + ' gol check.');
        const totalTime = getPositionTimes(gol)
        const totalTimeNum = Number(totalTime)
        golTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      golTimeArray.push(totalTime)
    }

    try {
      if (props.whereFromPlayer === 191) {
        fwdData = stat.fwd
        midData = stat.mid
        defData = stat.def
        golData = stat.gol
        subData = stat.sub
      }
      else {
          fwdData = stat.posTimes.fwd
          midData = stat.posTimes.mid
          defData = stat.posTimes.def
          golData = stat.posTimes.gol
          subData = stat.posTimes.sub
      }
    //console.log(JSON.stringify(stat.posTimes.sub) + ' firsy sub check new.');
      subData.map(sub => {
      //console.log(sub + ' sub check.');
        const totalTime = getPositionTimes(sub)
        const totalTimeNum = Number(totalTime)
        subTimeArray.push(totalTimeNum)
      })
    }
    catch {
      const totalTime = 0
      subTimeArray.push(totalTime)
    }

  //console.log(JSON.stringify(fwdTimeArray) + ' fwdTimeArray just got check now inside.');
  }
  else {

    fwdTimeArray.push(0)
    midTimeArray.push(0)
    defTimeArray.push(0)
    golTimeArray.push(0)
    subTimeArray.push(0)

  }

    })
    })
  }
  catch {

  }


  //console.log('sort check arrays fwd')
  //console.log(JSON.stringify(fwdTimeArray) + '  fwd')
  //console.log(JSON.stringify(midTimeArray) + '  mid')
  //console.log(JSON.stringify(defTimeArray) + '  def')
  //console.log(JSON.stringify(golTimeArray) + '  gol')
  //console.log(JSON.stringify(subTimeArray) + '  sub')

  //console.log(JSON.stringify(fwdTimeArray) + ' fwdTimeArray just got check now.');

    fwdTotalTime = getTotalTime(fwdTimeArray, 1)
    fwdTotalTime = fwdTotalTime + getFwdTime


    //setFwdTime(fwdTotalTime)
    //setFwdPercent(fwdTotalPercent)

  //console.log(fwdTotalTime + ' what is seasson fwdTotalTime');
  //console.log(fwdTotalPercent + ' what is seasson fwdTotalPercent');

    midTotalTime = getTotalTime(midTimeArray, 1)
    midTotalTime = midTotalTime + getMidTime


    //setMidTime(midTotalTime)
    //setMidPercent(midTotalPercent)

    defTotalTime = getTotalTime(defTimeArray, 1)
  //console.log(getDefTime + ' getDefTime what is it..');
    defTotalTime = defTotalTime + getDefTime


    //setDefTime(defTotalTime)
    //setDefPercent(defTotalPercent)

    golTotalTime = getTotalTime(golTimeArray, 1)
    golTotalTime = golTotalTime + getGolTime


    //setGolTime(golTotalTime)
    //setGolPercent(golTotalPercent)

    subTotalTime = getTotalTime(subTimeArray, 1)
    subTotalTime = subTotalTime + getSubTime

  //console.log(whereFrom + ' where is this coming from?');
  //console.log(player.playerName + ' player name');
  //console.log(getFwdTime + " getFwdTime");
  //console.log(getMidTime + " getMidTime");
  //console.log(getDefTime + " getDefTime");
  //console.log(getGolTime + " getGolTime");
  //console.log(getSubTime + " getSubTime.");
  //console.log(fwdTotalTime + " fwdTotalTime");
  //console.log(midTotalTime + " midTotalTime");
  //console.log(defTotalTime + " defTotalTime");
  //console.log(golTotalTime + " golTotalTime");
  //console.log(subTotalTime + " subTotalTime.");

    let totalGameTime = 0
    let totalGameTimePlayed = 0
    if (whereFrom === 'endGame') {
    //console.log('hitting huh?');
      //totalGameTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime + subTotalTime + getFwdTime + getMidTime + getDefTime + getGolTime + getSubTime
      totalGameTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime + subTotalTime
      totalGameTimePlayed = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime
    }
    else {
        totalGameTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime + subTotalTime
        totalGameTimePlayed = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime
    }


  //console.log(totalGameTime + " totalGameTime");
  //console.log(fwdTotalTime + " fwdTotalTime");
  //console.log(midTotalTime + " midTotalTime");
  //console.log(defTotalTime + " defTotalTime");
  //console.log(golTotalTime + " golTotalTime");
  //console.log(subTotalTime + " subTotalTime.");

    fwdTotalPercent = getTotalPercent(fwdTotalTime, totalGameTime)
    midTotalPercent = getTotalPercent(midTotalTime, totalGameTime)
    defTotalPercent = getTotalPercent(defTotalTime, totalGameTime)
    golTotalPercent = getTotalPercent(golTotalTime, totalGameTime)
    subTotalPercent = getTotalPercent(subTotalTime, totalGameTime)
    totalPlayedPercent = getTotalPercent(totalGameTimePlayed, totalGameTime)
    //setSubTime(subTotalTime)
    //setSubPercent(subTotalPercent)

  //console.log(player.playerName + ' player.playerName here');
  //console.log(subTotalPercent + ' subTotalPercent! here');

    sortObj.push({playerName: player.playerName, playerId: player.playerId, percentTotal: subTotalPercent})

  const statsSortNew = sortObj.sort(function(a, b) {
    return  a.percentTotal - b.percentTotal;
  });

  setStatsSort(statsSortNew)


  }

  const viewProUpgradeButton = () => {

    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {

    }
    else {
      return (
      <HStack mt="5" mb="5">
          <Button minW="100%" bg="tertiary.400" size="md" pt="5" pb="5" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
            <Text style={{fontWeight: 600, textDecorationLine: "underline", color: '#fff', fontSize: 22, textAlign: 'center', marginBottom: 5}}>Buy Pro</Text>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>(to display real player names & stats)</Text>
          </Button>
      </HStack>
      )
    }
  }

  const getTotalTime = (posTimeArray, posTimeType) => {
  //console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check...');
    let posTotalTime = 0
    if (posTimeType === 0) {
      posTotalTime = posTimeArray.reduce((a,v) =>  a = a + v.totalTime , 0 )
    }
    else {
        posTotalTime = posTimeArray.reduce((partialSum, a) => partialSum + a, 0);
    }


  //console.log(posTotalTime + ' posTotalTime check 1');
    if (posTotalTime === NaN || isNaN(posTotalTime)) {
      posTotalTime = 0
    }
  //console.log(posTotalTime + ' posTotalTime check 2.');
    return posTotalTime
  }

  const getPositionTimes = (pos) => {

  //console.log(pos.st + ' checking fwd.st');
  //console.log(pos.fin + ' checking fwd.fin');
    let startTime = 0
    let endTime = 0
  try {
    startTime = pos.st
    endTime = pos.fin
  }
  catch {
    startTime = 0
    endTime = 0
  }

//console.log(' am i gtting as far as hwere. 1');


  if (endTime === 99999999) {
  //console.log(sixtySecondsMark + ' check sixtySecondsMark');
    //endTime = sixtySecondsMark
    endTime = secondsElapsed
  }

//console.log(' am i gtting as far as hwere. 2');

  const totalTime = endTime - startTime

  return totalTime

  }

  const getTotalPercent = (posTotalTime, totalGameTime) => {
    let posPercent = 0

    try {
      //posPercent = ((posTotalTime / sixtySecondsMark) * 100).toFixed(0)
      posPercent = ((posTotalTime / totalGameTime) * 100).toFixed(0)
    }
    catch {
      posPercent = 0
    }

    if (isNaN(posPercent)) {
      posPercent = 0
    }

    return posPercent

  }

        return (

          <VStack>
          <Heading pt="2" style={{color: '#fff'}}>
            Player Compare: <Heading style={{color: '#fff', fontWeight: '400'}}>Time Played</Heading>
          </Heading>
          <Text style={{color: '#eee'}}>Key:</Text>
          <HStack pb="1">
              <View style={styles.percentPlayed('50%')}>
              <Text style={{color: '#fff',marginLeft: 5}}>Percent Time-Played</Text>
              </View>
          </HStack>
          <HStack>
              <View style={styles.percent('50%')}>
              <Text style={{color: '#333',marginLeft: 5}}>Percent as Substite</Text>
              </View>
          </HStack>
          {viewProUpgradeButton()}
          {props.whereFromPlayer === 181 &&
            <HStack pt="2" pb="2" mt="2" style={{backgroundColor: 'yellow'}}>
                <View style={styles.notes}>
                <Text style={{color: '#333',marginLeft: 5}}>Note: For privacy reasons teams with players aged Under 18 will only show player names assigned to their account (i.e. only your child name will dispplay).</Text>
                </View>
            </HStack>
          }
          {props.whereFromPlayer === 191 &&
            <HStack pt="2" pb="2" mt="2" style={{backgroundColor: 'yellow'}}>
                <View style={styles.notes}>
                <Text style={{color: '#fff',marginLeft: 5}}>Note: For privacy reasons teams with players aged Under 18 will only show player names assigned to their account (i.e. only your child name will dispplay).</Text>
                </View>
            </HStack>
          }
          <View style={{borderBottomColor: '#fff', borderBottomWidth: 1, marginTop: 10, marginBottom: 5}} />
            {games.length < 1 &&
              <Box>
                </Box>
            }
            {props.whereFromPlayer === 181 &&
              <HStack pl="2" mb="2" style={{backgroundColor: 'yellow', }}>
                <Text style={{fontSize: 10, color: '#333'}}>Player highlihgted between the two yellow lines</Text>
              </HStack>
            }
            {props.whereFromPlayer === 191 &&
              <HStack pl="2" mb="2" style={{backgroundColor: 'yellow', }}>
                <Text style={{fontSize: 10, color: '#333'}}>Player highlihgted between the two yellow lines</Text>
              </HStack>
            }
            {games.length >= 1 &&
            <Box>
                {getPositionTimesDisplay()}
              </Box>
            }
          </VStack>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  percent: percentTotal => ({
    minWidth: percentTotal,
    backgroundColor: '#34d399'
}),
percentPlayed: percentTotal => ({
  minWidth: percentTotal,
  backgroundColor: '#0891b2'
}),
notes: {
  backgroundColor: 'transparent'
}
})

export default SeasonPositionSort;

/*
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="primary.100" _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>FWD</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getFwdTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getFwdPercent}%)</Text></Button>
</Box>
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="yellow.100" _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>MID</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getMidTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getMidPercent}%)</Text></Button>
</Box>
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="warning.200" _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>DEF</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getDefTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getDefPercent}%)</Text></Button>
</Box>
<Box minW="20%" alignSelf="center" mt="3">
  <Button bg="fuchsia.200" _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>GOL</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getGolTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getGolPercent}%)</Text></Button>
</Box>
<Box minW="20%"alignSelf="center" mt="3">
  <Button bg="emerald.200" _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} pl="1" pr="1" minW="20%" size="xs" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>SUB</Text><Text style={{color: '#0891b2', fontSize: 10, textAlign: 'center', lineHeight: 0}}>{formattedSeconds(getSubTime)}min</Text><Text style={{color: '#0891b2', fontSize: 12, textAlign: 'center', lineHeight: 0}}>({getSubPercent}%)</Text></Button>
</Box>
*/

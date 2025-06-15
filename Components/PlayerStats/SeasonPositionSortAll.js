import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import SeasonStats from '../SeasonStats/SeasonStats'

import { updateGames } from '../../Reducers/games';
import { updateStatsSort } from '../../Reducers/statsSort';
import { updateSortIndex } from '../../Reducers/sortIndex';


const SeasonPositionSortAll = (props)=>{

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
  const [statToDisplay, setStatToDisplay] = useState(10);
  const [typeToDisplay, setTypeToDisplay] = useState(2);
  const [gradeDisplay, setGradeDisplay] = useState(0);

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
  //let playerIndexReducer = useSelector(state => state.playerIndex.playerIndex)
  let sortIndex = useSelector(state => state.sortIndex.sortIndex);
  let sortIndexType = useSelector(state => state.sortIndex.sortIndexType);
  let statePlayerIndex = useSelector(state => state.playerIndex.playerIndex);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData
  const whereFrom = props.whereFrom
  const whatData = props.whatData

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60)

    const { navigate } = props.navigation;




    useEffect(() => {


   //console.log(sortIndex + 'what is statToDisplay');
   //console.log(sortIndexType + 'what is sortIndexType');
   //console.log(typeToDisplay + ' typeToDisplay check');
   //console.log(statToDisplay + ' statToDisplay check');
   //console.log(props.liveGame + ' props.liveGame check');
   //console.log(props.whereFrom + ' props.whereFrom is?');

      if (props.liveGame !== true) {
        //console.log('what am i setting 1');
        //console.log('hit check 123');
        setTypeToDisplay("0")
        setStatToDisplay("1")
      }
      else if (props.endGame === true) {
        //console.log('what am i setting 2');
        //console.log('hit check 12');
        setTypeToDisplay("1")
        setStatToDisplay("1")
        //do nothing..s
      }
      else if (props.whereFrom === 7) {
        //console.log('what am i setting 3');
          setTypeToDisplay("0")
          setStatToDisplay("1")
      }
      else {
        //console.log('hit check 1234');
        //console.log('what am i setting 4');
        setTypeToDisplay("1")
        setStatToDisplay("1")
      }

    },[])


    try {
    useEffect(() => {
   //console.log('props.whereFromPlayer end game check');
   //console.log(props.endGame + ' props.whereFromPlayer props.endGame');
      if (props.whereFromPlayer === 191) {
        //console.log('what am i setting 5');
        setTypeToDisplay("1")
        setStatToDisplay("1")
      }

      if (props.whereFromPlayer === 181) {
     //console.log(props.teamDocData.grade + ' is this grade?');
        const gradeCheck = props.teamDocData.grade
        setGradeDisplay(gradeCheck)
      }

    },[])
  }
  catch {
    //do nthing.
  }


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
     //console.log(props.liveGame + ' props.liveGame is?');
     //console.log(typeToDisplay + ' typeToDisplay is??');
        if (props.liveGame === true && typeToDisplay !== '1') {
          //do somthing.
       console.log('liveGame hit!!!!!');
          //games[0].teamPlayers
          let tempTeamPlayers = []
       //console.log(JSON.stringify(teamPlayers) + ' what is the details for this teamPlayers?');

          //const teamPlayersTeamOnly = teamPlayers.filter((item) => item.teamId === props.teamId);
          const teamPlayersTeamOnly = teamPlayers.filter(obj => obj.teamId === props.teamId);

          teamPlayersTeamOnly.map(player => {
            let tempPostionTimeStats = []
            const playerIndex = games[0].teamPlayers.findIndex(x => x.id === player.id);
            if (player.teamId === props.teamId) {

           //console.log(JSON.stringify(games[0]) + ' what is the details for this games[0]??');
           //console.log(JSON.stringify(games[0].teamPlayers[playerIndex]) + ' what is the details for this?');
           //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].postionTimes) + ' what is the details for this postionTimes?');
           //console.log(JSON.stringify(games[0].teamPlayers[playerIndex].playerName) + ' what is the details for this playerName?');
           //console.log(JSON.stringify(player) + ' what is the details for this player?');
           //console.log(JSON.stringify(player.postionTimeStats) + ' what is the details for this player.postionTimeStats?');

              const livePlayerPosStats = {gameId: games[0].id, season: games[0].season.id, posTimes: games[0].teamPlayers[playerIndex].postionTimes}
           //console.log(JSON.stringify(livePlayerPosStats) + ' what is the details for this livePlayerPosStats?');
           //console.log(JSON.stringify(livePlayerPosStats.posTimes) + ' what is the details for this livePlayerPosStats.posTimes? (new to be added)');

           //console.log(JSON.stringify(player.postionTimeStats) + ' what is the details for this player.postionTimeStats new? (current season)');
              tempPostionTimeStats = player.postionTimeStats
              let timeIndex = 0
              try {
              tempPostionTimeStats.map(time => {
                if (time.gameId === games[0].id) {
                  tempPostionTimeStats.splice(timeIndex, 1); // 2nd parameter means remove one item only
                }
                timeIndex++
              })
              tempPostionTimeStats.push(livePlayerPosStats)
              }
              catch {
                //do nothing?
              }



              tempTeamPlayers.push(player)
           //console.log(tempTeamPlayers + ' checking here first.');

              const tempPlayerIndex = tempTeamPlayers.findIndex(x => x.id === player.id);
           //console.log(tempPlayerIndex + ' tempPlayerIndex');
           //console.log(tempTeamPlayers[tempPlayerIndex].postionTimeStats + ' tempTeamPlayers[tempPlayerIndex].postionTimeStats?');
           //console.log(tempPostionTimeStats + ' tempPostionTimeStats');

              tempTeamPlayers[tempPlayerIndex].postionTimeStats = tempPostionTimeStats
           //console.log(tempTeamPlayers + ' checking here second..');
           //console.log(JSON.stringify(tempTeamPlayers[tempPlayerIndex].postionTimeStats) + ' should show both season stats and current game stats.');
           //console.log(tempTeamPlayers[tempPlayerIndex].playerName + ' should show both season stats and current game stats player name.');
            }

          })
       //console.log('above tempTeamPlayers');
       //console.log(JSON.stringify(tempTeamPlayers) + ' what is tempTeamPlayers?');

          tempTeamPlayers.map(player => {

         //console.log(player.teamId + ' what is player.teamId temp?');
         //console.log(props.teamId + ' new what is props.teamId temp?');

            const playerIndexCheckTwo = games[0].teamPlayers.findIndex(x => x.id === player.id);
         //console.log(games[0].teamPlayers[playerIndexCheckTwo].currentPosition + ' checky! cur Pos.');

            const currentPos = games[0].teamPlayers[playerIndexCheckTwo].currentPosition

            if ((player.teamId === props.teamId) && (currentPos !== 'abs')) {

           //console.log(JSON.stringify(player) + ' need to chek diff player 2');

              runPlayerPosStats(player, sortObj)

          }

        })

        }
        else if (props.liveGame === true && typeToDisplay === '1') {

          //console.log('also hitting ya.');
       //console.log(JSON.stringify(games[0].teamPlayers) + ' checking JSON.stringify(games[0].teamPlayers for current game view.')

          const tempTeamPlayers = games[0].teamPlayers

            try {
              tempTeamPlayers.map(player => {

             //console.log(player.teamId + ' what is player.teamId temp current game view?');
             //console.log(props.teamId + ' new what is props.teamId temp current game view?');

                const playerIndexCheckTwo = games[0].teamPlayers.findIndex(x => x.id === player.id);
             //console.log(games[0].teamPlayers[playerIndexCheckTwo].currentPosition + ' checky! cur Pos.');

                const currentPos = games[0].teamPlayers[playerIndexCheckTwo].currentPosition

                //console.log('also hitting ya 2.');
                //console.log(player.teamId);
                //console.log(props.teamId);
                //console.log(currentPos + ' currentPos');
                if ((player.teamId === props.teamId) && (currentPos !== 'abs')) {

               //console.log(JSON.stringify(player) + ' need to chek diff current game view');

                  runPlayerPosStats(player, sortObj)

              }

            })
          }
          catch {
            //do nothing.
          }
        }
        else {
       //console.log(JSON.stringify(teamPlayers) + ' teamPlayers check her last!');
          /* need to filter out teamPlayers here so that it only picks up the current team.

          something like:
          */

          //const teamPlayersTeamOnly = games[0].teamPlayers.findIndex(x => x.teamId === props.teamId);

          const teamPlayersTeamOnly = teamPlayers.filter((item) => item.teamId === props.teamId);
          //const teamPlayersTeamOnly = teamPlayers.filter(obj => obj.teamId === props.teamId);
       //console.log(JSON.stringify(teamPlayersTeamOnly) + ' teamPlayersTeamOnly test gere.');

          try {
          teamPlayersTeamOnly.map(player => {
          //teamPlayers.map(player => {

         //console.log(player.teamId + ' what is player.teamId?');
         //console.log(props.teamId + ' new what is props.teamId?');

            if (player.teamId === props.teamId) {

           //console.log(JSON.stringify(player) + ' need to chek diff player 2');

              runPlayerPosStats(player, sortObj)

          }

        })
        }
        catch {
          // do nothing.
        }
      }
    }


},[statToDisplay, typeToDisplay, sixtySecondsMark])

/*
useEffect(() => {
    //generate week array and set in state ones

    setStatsSort(statsSort)
  }, [statsSort]);
  */

  const buyPro = () => {
    navigate('Iap',{
      navigateBack: true,
      navigateBackName: 'SeasonPositionSortAllHome'
    });
  }

  const getPlayerNameDisplay = (playerNameDisplay, playerNameDisplayNumberName) => {

 //console.log(props.whereFromPlayer + ' props.whereFromPlayer over here htis tiem');
 //console.log(typeToDisplay + ' props.typeToDisplay over here htis tiem.');
 //console.log(pro_forever_indiv[0].purchased + " " + pro_yearly_indiv[0].purchased + " " + pro_yearly_team[0].purchased + " " + pro_forever_team[0].purchased + " " + pro_yearly_player[0].purchased + " " + pro_forever_player[0].purchased + ' what i got for purchased.');


    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
   //console.log('Am i hit in here am i?');
        return (
          <Text style={{color: '#eee', fontSize: 24, lineHeight: 28,paddingTop: 2, paddingBottom: 5}}>
            {playerNameDisplay}
          </Text>
        )
      }
      else if (typeToDisplay === 1 || typeToDisplay === '1') {
     //console.log(typeToDisplay + ' why not hit hits?');
        return (
          <Text style={{color: '#eee', fontSize: 24, lineHeight: 28,paddingTop: 2, paddingBottom: 5}}>
            {playerNameDisplay}
          </Text>
        )
      }
    else {
   //console.log(typeToDisplay + ' why hit hits?');
      return (

          <Text style={{fontWeight: 600, fontSize: 10, color: '#999', paddingBottom: 5}}>
            <Text style={{color: '#eee', fontWeight: 600, fontSize: 24, lineHeight: 24}}>{playerNameDisplayNumberName}:</Text> (Buy 'Pro' to display player names)
          </Text>

      )
    }

  }

  const getPositionTimesDisplayTest = (player, i) => {

 //console.log(i + ' what is i?');
 //console.log(JSON.stringify(props.playerData) + ' props.playerData.');

    return (
      <Text>hi New test!</Text>
    )

  }

  const getPositionTimesDisplay = () => {

      let indexSortPlayers = 0
      let playerNameNumber = 0
      let playerNameDisplayNumber = 0
      let playerNameDisplayNumberName = ''
      //console.log(JSON.stringify(statsSort) + ' check statsSort here.');
        const statDisplay = statsSort.map(player => {

       //console.log(JSON.stringify(player) + ' what exactly is player?');

          indexSortPlayers++

          const percentTotal = player.percentTotal
          const fwdTotalPercentDisplay = player.fwdTotalPercent
          let fwdTotalPercentString = fwdTotalPercentDisplay.toString();
          const fwdTotalTimeDisplay = player.fwdTotalTime
          fwdTotalPercentString = fwdTotalPercentString + '%'
          const midTotalPercentDisplay = player.midTotalPercent
          let midTotalPercentString = midTotalPercentDisplay.toString();
          const midTotalTimeDisplay = player.midTotalTime
          midTotalPercentString = midTotalPercentString + '%'
          const defTotalPercentDisplay = player.defTotalPercent
          let defTotalPercentString = defTotalPercentDisplay.toString();
          const defTotalTimeDisplay = player.defTotalTime
          defTotalPercentString = defTotalPercentString + '%'
          const golieTotalPercentDisplay = player.golTotalPercent
          let golieTotalPercentString = golieTotalPercentDisplay.toString();
          const golTotalTimeDisplay = player.golTotalTime
          golieTotalPercentString = golieTotalPercentString + '%'
          const percentTotalPlayed = 100 - percentTotal
          let percentTotalString = percentTotal.toString();
          percentTotalString = percentTotalString + '%'
          let percentTotalPlayedString = percentTotalPlayed.toString();
          percentTotalPlayedString = percentTotalPlayedString + '%'
          const subTotalTimeDisplay = player.subTotalTime

       //console.log(JSON.stringify(props.playerData) + ' props.playerData.');
          //let playerSelectedId = 0
          //let playerIdCheck = 0



          /*
          if (playerIndexReducer >= 0) {
            playerSelectedId = playerIndexReducer
            playerIdCheck = player.id
          }
          else {
          */
       //console.log(JSON.stringify(props.playerData) + ' props.playerData done.');

          /*
          try {
            playerSelectedId = props.playerData.playerId
            playerIdCheck = player.playerId
          }
          catch {
            //do nothing.
          }
          */

          //}




          let playerNameDisplay = player.playerName
       //console.log(props.whereFromPlayer + ' props.whereFromPlayer is whhhattt?');
          if (typeToDisplay === 1 && props.whereFrom === 7) {
            if (props.playerData.playerId === player.playerId) {
              playerNameDisplay = player.playerName
              playerNameNumber++
            }
            else  {
              playerNameNumber++
              playerNameDisplay = 'Player ' + playerNameNumber
            }
          }
          else if ((props.whereFromPlayer === 181 || props.whereFromPlayer === 191) && (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) && (gradeDisplay !== 'over18')) {

            //playerSelectedId = props.playerData.playerId
            //playerIdCheck = player.playerId

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



       //console.log(player.playerId + ' player.playerId final check');
       //console.log(whereFrom + ' wherFrom is?');
       //console.log(typeToDisplay + ' typeToDisplay is?');
       //console.log(props.whereFromPlayer + ' props.whereFromPlayer is huh??');
       //console.log('new so i shows.');

       //console.log(percentTotal + ' need to check percentTotal');
       //console.log(fwdTotalPercentDisplay + ' need to check fwdTotalPercentDisplay');
       //console.log(percentTotalString + ' need to check percentTotalString');



              return (
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.3)']} style={styles.linearGradientBg}>
                <VStack minW="100%" pt="2" pb="2">
                <Box>

                  <HStack>
                    {getPlayerNameDisplay(playerNameDisplay, playerNameDisplayNumberName)}
                  </HStack>
                  <HStack minW="100%">
                    <View style={styles.percentFwd(fwdTotalPercentString)}>
                      {fwdTotalPercentDisplay >= 5 && fwdTotalPercentDisplay < 12 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 6}}>{fwdTotalPercentString}</Text>
                      }
                      {fwdTotalPercentDisplay >= 12 && fwdTotalPercentDisplay < 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Fwd {fwdTotalPercentString}</Text>
                      }
                      {fwdTotalPercentDisplay >= 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Fwd {fwdTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(fwdTotalTimeDisplay)}min)</Text></Text>
                      }
                    </View>

                    <View style={styles.percentMid(midTotalPercentString)}>
                      {midTotalPercentDisplay >= 5 && midTotalPercentDisplay < 12 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 6}}>{midTotalPercentString}</Text>
                      }
                      {midTotalPercentDisplay >= 12 && midTotalPercentDisplay < 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Mid {midTotalPercentString}</Text>
                      }
                      {midTotalPercentDisplay >= 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Mid {midTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(midTotalTimeDisplay)}min)</Text></Text>
                      }
                    </View>

                    <View style={styles.percentDef(defTotalPercentString)}>
                      {defTotalPercentDisplay >= 5 && defTotalPercentDisplay < 12 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 6}}>{defTotalPercentString}</Text>
                      }
                      {defTotalPercentDisplay >= 12 && defTotalPercentDisplay < 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Def {defTotalPercentString}</Text>
                      }
                      {defTotalPercentDisplay >= 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Def {defTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(defTotalTimeDisplay)}min)</Text></Text>
                      }
                    </View>

                    <View style={styles.percentGoalie(golieTotalPercentString)}>
                      {golieTotalPercentDisplay >= 5 && golieTotalPercentDisplay < 12 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 6}}>{golieTotalPercentString}</Text>
                      }
                      {golieTotalPercentDisplay >= 12 && golieTotalPercentDisplay < 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Gol {golieTotalPercentString}</Text>
                      }
                      {golieTotalPercentDisplay >= 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Gol {golieTotalPercentString} <Text style={{fontSize: 8}}>({formattedSeconds(golTotalTimeDisplay)}min)</Text></Text>
                      }
                    </View>

                    <View style={styles.percent(percentTotalString)}>
                      {percentTotal >= 5 && percentTotal < 12 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 6}}>{percentTotalString}</Text>
                      }
                      {percentTotal >= 12 && percentTotal < 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Sub {percentTotalString}</Text>
                      }
                      {percentTotal >= 25 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 10}}>Sub {percentTotalString} <Text style={{fontSize: 8}}>({formattedSeconds(subTotalTimeDisplay)}min)</Text></Text>
                      }
                    </View>

                    <View style={styles.percent('100%')}>
                      {fwdTotalPercentDisplay === 0 && midTotalPercentDisplay === 0 && defTotalPercentDisplay === 0 && golieTotalPercentDisplay === 0 && percentTotal === 0 &&
                        <Text style={{color: '#333', marginLeft: 5, fontSize: 12}}>Sub 0% (0min)</Text>
                      }

                    </View>

                  </HStack>
                  {typeToDisplay === '1' &&
                    <HStack>
                      <SeasonStats navigation={props.navigation} playerData={undefined} playerDataId={player.id} whereFrom={whereFrom} posSort={true} typeToDisplay={typeToDisplay} />
                    </HStack>
                  }
                  {typeToDisplay !== '1' &&
                    <HStack>
                      {whereFrom !== 79 &&
                        <SeasonStats navigation={props.navigation} playerData={undefined} playerDataId={player.id} whereFrom={whereFrom} posSort={true} typeToDisplay={typeToDisplay} />
                      }
                    </HStack>
                }

                {(pro_forever_indiv[0].purchased === false && pro_yearly_indiv[0].purchased === false && pro_yearly_team[0].purchased === false && pro_forever_team[0].purchased === false && pro_yearly_player[0].purchased === false && pro_forever_player[0].purchased === false) && typeToDisplay !== '1' &&
                  <Button minW="100%" bg="#E879F9" size="md" mt="2" pt="3" pb="3" _text={{fontSize: 18, color: '#fff'}} variant="subtle" onPress={() => buyPro()}>
                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>Buy a Pro Subscription</Text>
                    <Text style={{color: '#fff', fontSize: 10, textAlign: 'center'}}>(To show player names)</Text>
                  </Button>
                }

                </Box>
                </VStack>
                </LinearGradient>
              )
            })


    return statDisplay

  }


    const runPlayerPosStats = (player, sortObj) => {

   //console.log(JSON.stringify(player) + ' now check inital play data');
   //console.log(JSON.stringify(player.postionTimeStats) + ' player.postionTimeStats now check inital play data');
    //console.log(JSON.stringify(player[0].postionTimeStats) + ' now check inital play data');
   //console.log(props.whereFromPlayer + ' really shouldnt be getting through.');
      let postionTimeStats = []
      let currentSeason = ''
        if (typeToDisplay === '1' && (props.whereFromPlayer !== 181 || props.whereFromPlayer !== 191)) {
          try {
       //console.log('throught to here.');

          if (games[0].season.id === undefined || games[0].season.id === 99999998 || games[0].season.id < 1) {
            currentSeason = seasonsDisplayId
          }
          else {
            currentSeason = games[0].season.id
          }
            const postionTimesPlayer = player.postionTimes
            //player.postionTimeStats.push({gameId: games[0].id, season: currentSeason, posTimes: postionTimes})
            //let playerPostionTimeStats = []
            const playerPostionTimeStats = [{gameId: games[0].id, season: currentSeason, posTimes: postionTimesPlayer}]
            postionTimeStats = [playerPostionTimeStats]
          }
          catch {
            //do nothing.
          }
        }
        else if (props.whereFromPlayer === 181) {
          postionTimeStats = player.postionTimeStats

        }
        else if (props.whereFromPlayer === 191) {
          postionTimeStats = player.postionTimeStats
        //console.log(JSON.stringify(props.gameData));
          //currentSeason = props.gameData.seasonId
        }
        else {
            postionTimeStats = [player.postionTimeStats]
        }

     //console.log(JSON.stringify(postionTimeStats) + ' postionTimeStats after.');

      //const postionTimeStats = [player.postionTimeStats]

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

      /*
      postionTimeStats.map(stats => {
     //console.log(JSON.stringify(stats) + ' just check stat');
     //console.log(JSON.stringify(stats[0]) + ' just check stat [0]');
      //console.log(JSON.stringify(stats[1]) + ' just check stat [1]');
        stats.map(stat => {

        //conuntLoop++
     //console.log(conuntLoop + ' check conuntLoop 0');
        })
      })
      */

      try {
    postionTimeStats.map(stats => {
   //console.log(JSON.stringify(stats) + ' real just check stat');

    //console.log(JSON.stringify(stats[1]) + ' real just check stat [1]');

      if (props.whereFromPlayer === 181 || props.whereFromPlayer === 191) {
        stats = [stats]
      }

   //console.log(JSON.stringify(stats[0]) + ' real just check stat [0]');

      stats.map(stat => {
      conuntLoop++
   //console.log(conuntLoop + ' check conuntLoop 1');
   //console.log(JSON.stringify(stat) + ' i think stat needs checked...');

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


      if (stat.season === props.seasonId || (props.whereFromPlayer === 191 || props.whereFromPlayer === 181)) {
     //console.log(' should be getting here? ');
        let fwdData = []
        let midData = []
        let defData = []
        let golData = []
        let subData = []
    try {
   //console.log(JSON.stringify(stat.posTimes.fwd) + ' [0] playerData firsy fws check.. (works from coash player stats)');
   //console.log(props.whereFromPlayer + ' props.whereFromPlayer is???');
   //console.log(JSON.stringify(stat.fwd) + ' stat.fwd check.)');

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
 //console.log(JSON.stringify(subTimeArray) + ' subTimeArray just got check now inside.');
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
 //console.log(getDefTime + ' getDefTime what is it...');
    defTotalTime = defTotalTime + getDefTime

 //console.log(defTotalTime + ' what is seasson fwdTotalTime');
 //console.log(defTotalPercent + ' what is seasson fwdTotalPercent');


    //setDefTime(defTotalTime)
    //setDefPercent(defTotalPercent)

    golTotalTime = getTotalTime(golTimeArray, 1)
    golTotalTime = golTotalTime + getGolTime

 //console.log(golTotalTime + ' what is seasson golTotalTime');
 //console.log(golTotalPercent + ' what is seasson golTotalPercent');


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

    sortObj.push({playerName: player.playerName, playerId: player.playerId, id: player.id, percentTotal: subTotalPercent, fwdTotalPercent: fwdTotalPercent, midTotalPercent: midTotalPercent, defTotalPercent: defTotalPercent, golTotalPercent: golTotalPercent, fwdTotalTime: fwdTotalTime, midTotalTime: midTotalTime, defTotalTime: defTotalTime, golTotalTime: golTotalTime, subTotalTime: subTotalTime})

  let statsSortNew = []
  if (statToDisplay === '2' || statToDisplay === '6') {
    statsSortNew = sortObj.sort(function(a, b) {
      return  a.fwdTotalPercent - b.fwdTotalPercent;
    });
  }
  else if (statToDisplay === '3' || statToDisplay === '7') {
    statsSortNew = sortObj.sort(function(a, b) {
      return  a.midTotalPercent - b.midTotalPercent;
    });
  }
  else if (statToDisplay === '4' || statToDisplay === '8') {
    statsSortNew = sortObj.sort(function(a, b) {
      return  a.defTotalPercent - b.defTotalPercent;
    });
  }
  else if (statToDisplay === '5' || statToDisplay === '9') {
    statsSortNew = sortObj.sort(function(a, b) {
      return  a.golTotalPercent - b.golTotalPercent;
    });
  }
  else {
    statsSortNew = sortObj.sort(function(a, b) {
      return  a.percentTotal - b.percentTotal;
    });
  }

  if (statToDisplay === '1' || statToDisplay === '2' || statToDisplay === '3' || statToDisplay === '4' || statToDisplay === '5') {
      statsSortNew = statsSortNew.reverse()
  }
  else {
    //nothing.
  }

 //console.log(JSON.stringify(statsSortNew) + ' what is happening to statsSortNew?');

  /*
  const statDisplay = statsSortNew.map(player => {
    return (
      <Text style={{color: '#fff', fontSize: 20}}>hi New test! {player.playerName}..</Text>
    )

  })

  setSortDisplay(statDisplay)
  */
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
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>(to display player names)</Text>
          </Button>
      </HStack>
      )
    }
  }

  const getTotalTime = (posTimeArray, posTimeType) => {
 //console.log(JSON.stringify(posTimeArray)  + ' JSON.stringify(posTimeArray) check....');
    let posTotalTime = 0
 //console.log(posTimeType + ' posTimeType is?');
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
    if (secondsElapsed <= 0) {
      endTime = pos.st
    }
    else {
        endTime = secondsElapsed
    }
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

  const selectTypeToSort = (value: string) => {

      setTypeToDisplay(value)
      dispatch(updateSortIndex(value, sortIndexType))

  }

  const selectStatToSort = (value: string) => {



      //let valueInt = Number(value)
      //const seasonIndex = seasons.findIndex(x => x.id === valueInt);
      //const seasonName = seasons[seasonIndex].season
      //const seasonId = seasons[seasonIndex].id
      //prevGamesSeason.season = seasonName
      //prevGamesSeason.id = seasonId
      setStatToDisplay(value)
      dispatch(updateSortIndex(sortIndex, value))
      //setSeason(seasonName)
      //setSeasonId(valueInt)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))

  }

  const typeDropDown = () => {

    if (props.displayTypeSort === true) {
      return (

        <Box shadow="7">
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingTop: 6}}>
              Get Stats For:
            </Text>
            <Center>
              <Box maxW="100%">
                <Select selectedValue={typeToDisplay} style={{color: '#fff'}} minWidth="100%" bg="#333" accessibilityLabel="Select Game-Time" placeholder="Get Stats For" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1}  onValueChange={selectTypeToSort.bind(this)} >
                    <Select.Item label="Select Option" value="2" />
                    <Select.Item label="Current Season" value="0" />
                    <Select.Item label="Current Game" value="1" />
                  </Select>
                </Box>
              </Center>
          </Box>
        )
    }

  }

  const sortPlayerDropDown = () => {

    return (

      <Box shadow="7" mb="2">
          <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingTop: 6}}>
            Sort Players By:
          </Text>
          <Center>
            <Box maxW="100%">
              <Select selectedValue={statToDisplay} minWidth="100%" bg="#333" style={{color: '#fff'}} accessibilityLabel="Select Game-Time" placeholder="Sort Players By" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
                }} mt={1}  onValueChange={selectStatToSort.bind(this)} >
                  <Select.Item label="Select Option" value="10" />
                  <Select.Item label="Highest % as Sub" value="1" />
                  <Select.Item label="Highest % played" value="0" />
                  <Select.Item label="Lowest % played as Forward" value="6" />
                  <Select.Item label="Lowest % played as Midfeild" value="7" />
                  <Select.Item label="Lowest % played as Defender" value="8" />
                  <Select.Item label="Lowest % played as Goalie" value="9" />
                  <Select.Item label="Highest % played as Forward" value="2" />
                  <Select.Item label="Highest % played as Midfeild" value="3" />
                  <Select.Item label="Highest % played as Defender" value="4" />
                  <Select.Item label="Highest % played as Goalie" value="5" />

                </Select>
              </Box>
            </Center>
        </Box>
      )

  }


  const displayNote = () => {


    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
      //do nothing.
    }
    else {
      return (
        <HStack pt="2" pb="2" mb="2" style={{backgroundColor: '#f7a855'}}>
            <View style={styles.notes}>
            <Text style={{color: '#333',marginLeft: 5, fontWeight: 700}}>Important: to display player names please upgrade to Pro.</Text>
            </View>
        </HStack>
      )
    }

  }

        return (

          <Box style={props.whereFromPlayer === undefined ? styles.largePadding : styles.noPadding} >
            <VStack>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientBg}>
                <Box style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 15}}>
                  <Heading pt="2" style={{color: '#fff', fontSize: 20}}>
                    Player Compare: <Heading style={{color: '#ccc', fontWeight: '400', fontSize: 18}}>Time Played</Heading>
                  </Heading>
                  <Text style={{fontSize: 16, color: '#fff', fontWeight: '400', paddingTop: 5}}>Key:</Text>
                  <HStack pb="1">
                    <View style={styles.percentFwd('20%')}>
                      <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Forward</Text>
                    </View>
                    <View style={styles.percentMid('20%')}>
                      <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Midfeild</Text>
                    </View>
                    <View style={styles.percentDef('20%')}>
                      <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Defender</Text>
                    </View>
                    <View style={styles.percentGoalie('20%')}>
                      <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Golie</Text>
                    </View>
                    <View style={styles.percent('20%')}>
                      <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Sub</Text>
                    </View>
                  </HStack>
                  {typeDropDown()}
                  {sortPlayerDropDown()}
          {props.whereFromPlayer === 181 && gradeDisplay !== 'over18' &&
            <HStack pt="2" pb="2" mt="2" style={{backgroundColor: '#f7a855'}}>
                <View style={styles.notes}>
                <Text style={{color: '#333',marginLeft: 5}}>Note: For privacy reasons teams with players aged Under 18 will only show player names assigned to their account (i.e. only your child name will display) if upgraded to pro.</Text>
                </View>
            </HStack>
          }
          {props.whereFromPlayer === 191 &&
            <HStack pt="2" pb="2" mt="2" style={{backgroundColor: '#f7a855'}}>
                <View style={styles.notes}>
                <Text style={{color: '#fff',marginLeft: 5}}>Note: For privacy reasons teams with players aged Under 18 will only show player names assigned to their account (i.e. only your child name will display) if upgraded to pro.</Text>
                </View>
            </HStack>
          }

          </Box>




            {games.length < 1 &&
              <Box>
                </Box>
            }

            {props.whereFromPlayer !== 181 || props.whereFromPlayer !== 181 &&
              <HStack pl="2" mb="2" style={{backgroundColor: '#8cff32', }}>
                <Text style={{fontSize: 10, color: '#333'}}>Selected player is highlihgted in green.</Text>
              </HStack>
            }
            </LinearGradient>

            {typeToDisplay === '1' &&
            <Text style={{fontSize: 10, color: '#fff'}}>Note: Times updated every 1min.</Text>
            }


            {games.length >= 1 && props.whereFromPlayer !== 78 && props.whereFromPlayer !== 181 && statePlayerIndex === true && typeToDisplay !== 2 &&
            <Box maxW="100%">
                {getPositionTimesDisplay()}
              </Box>
            }
            {games.length >= 1 && props.whereFromPlayer === 78 && typeToDisplay !== 2 &&
            <Box maxW="100%">
                {getPositionTimesDisplay()}
              </Box>
            }
            {props.whereFromPlayer === 181 && typeToDisplay !== 2 &&
            <Box maxW="100%">
                {getPositionTimesDisplay()}
              </Box>
            }
            {props.whereFromPlayer === 191 && typeToDisplay !== 2 &&
            <Box maxW="100%">
                {getPositionTimesDisplay()}
              </Box>
            }

          </VStack>
          </Box>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  percent: percentTotal => ({
    minWidth: percentTotal,
    maxWidth: percentTotal,
    backgroundColor: '#34d399',
    height: 50,
    alignItems: 'left',
    justifyContent: 'center',
}),
percentPlayed: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#0891b2',
  height: 50,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentFwd: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#cffafe',
  height: 50,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentMid: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#fef9c3',
  height: 50,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentDef: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#fed7aa',
  height: 50,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentGoalie: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#f5d0fe',
  height: 50,
  alignItems: 'left',
  justifyContent: 'center',
}),
notes: {
  backgroundColor: 'transparent'
},
selectedPlayerBg: {
  backgroundColor: '#8cff32',
  paddingLeft: 4,
  paddingRight: 4,
  borderRadius: 5,
},
playerBg: {
  backgroundColor: 'transparent'
},
linearGradientBg: {
  minWidth: '100%',
  borderRadius: 5,
  //borderTopRightRadius: 5,
  marginBottom: 10,
  paddingLeft: 5,
  paddingRight: 5
},
largePadding: {paddingBottom: '180%'},
noPadding: {paddingBottom: '0%'}
})

export default SeasonPositionSortAll;

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

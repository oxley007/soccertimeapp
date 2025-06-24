import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, KeyboardAvoidingView, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, PresenceTransition } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;
const upIcon = <Icon name="up" size={20} color="#fff" />;
const downIcon = <Icon name="down" size={20} color="#fff" />;
const arrowdowncircle = <FeatherIcon name="arrow-down-circle" size={26} color="#fff" />;
import LinearGradient from 'react-native-linear-gradient';
import SoccerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const feildIcon = <SoccerIcon name="soccer" size={30} color="#fff" />;
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const trayArrowUp = <IconMaterialCommunityIcons name="tray-arrow-up" size={26} color="#000" />;
const trayArrowDown = <IconMaterialCommunityIcons name="tray-arrow-down" size={26} color="#000" />;
//import { useNavigation } from '@react-navigation/native';

import { updateGames } from '../../Reducers/games';
import { updateDragDropDisplayCount } from '../../Reducers/dragDropDisplayCount';
import { updateCheckSort } from '../../Reducers/checkSort';
import { updatePosArray } from '../../Reducers/posArray';

import InputPlayerName from './InputPlayerName.js'
import SelectPlayerList from './SelectPlayerList.js'
import FormationBoard from '../FormationBoard/FormationBoard.js'
import SelectPlayersDragDrop from '../SelectPlayers/SelectPlayersDragDrop.tsx'
import AddPlayersList from '../SelectPlayers/AddPlayersList.js'
import SeasonPositionSortAll from '../PlayerStats/SeasonPositionSortAll'
import SelectSeason from '../Setup/SelectSeason'


const AddPlayersHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [gameSetupStatus, setGameSetupStatus] = useState(true);
  const [addingteam, setAddingteam] = useState(0);
  const [getHideBtn, setHideBtn] = useState(0);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let statePlayerIndex = useSelector(state => state.playerIndex.playerIndex);
  let dragDropDisplayCount = useSelector(state => state.dragDropDisplayCount.dragDropDisplayCount);
  let checkSort = useSelector(state => state.checkSort.checkSort);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamId = props.route.params.teamId
  const teamIdCode = props.route.params.teamIdCode
  const whereFrom = props.route.params.whereFrom

  let addTeamOnly = 0

  try {
    addTeamOnly = props.route.params.addTeamOnly
  }
  catch {
    addTeamOnly = 0
    //nothing.
  }

  const { navigate } = props.navigation;
  //const navigation = useNavigation();

  try {
    useEffect(() => {

      const gameSetup = games[0].gameSetup

      setGameSetupStatus(gameSetup)
      //console.log('heey hey one');

    }, [games[0].gameSetup])
  }
  catch {
    //console.log('heey hey two');
    //do nothing.
    useEffect(() => {

      const gameSetup = games[0].gameSetup

      setGameSetupStatus(gameSetup)
      //console.log('heey hey one');

    }, [])
  }

  useEffect(() => {

 //console.log(dragDropDisplayCount + ' this is dragDropDisplayCount 1');
    setAddingteam(dragDropDisplayCount)
 //console.log(addingteam + ' this is addingteam 1');


  },[])


  useEffect(() => {

 //console.log(games.length + ' what is games.length? 1.');
 //console.log(addingteam + ' this is addingteam 2');
 //console.log(dragDropDisplayCount + ' this is dragDropDisplayCount 2');
    try {
   //console.log(games.length + ' what is games.length? 2');
      if (games.length < 1 || games.length === undefined) {
     //console.log('hit open player?');
        setIsOpen(true)
      }
      else if (addingteam !== dragDropDisplayCount) {
     //console.log('hit adding team');
        setIsOpen(true)
      }
      else {
     //console.log('hit hide player?');
        setIsOpen(false)
      }
    }
    catch {
      setIsOpen(true)
    }

    /*
    if (games[0].teamPlayers.length < 1) {
      updateDisplayDragDropCount(0)
    }
    */


  }, [dragDropDisplayCount])


  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
  }

  const exitSetup = () => {

    if (addTeamOnly === 1) {

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
    }
    else {
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

  }

  const hideBtn = () => {

    //console.log('hit hidebtn ' + getHideBtn);

    if (getHideBtn === 0) {
        setHideBtn(1)
    }
    else {
      setHideBtn(0)
    }

  }

  const continueSetup = (goToWhere) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    /*
    let playerOnFeild = 0
    _games[0].teamPlayers.map(player => {

      if (player.currentPosition !== 'sub') {
       playerOnFeild++
      }

    })
    */

    const playerOnFeild = _games[0].teamPlayers.length


    if (seasonsDisplayId === 99999998) {
      Alert.alert("Please select a Current Season before you continue." )
    }
    else if (playerOnFeild === 0) {
      Alert.alert("Please add at least one player before you can continue.")
    }
    else {

    /*
      Alert.alert(
      'Non-Participating Players',
      'Have you moved any non-participating players (i.e not playing or unavilable) for the current game to the red area?',
      [
        {text: 'Continue, all players are participating ', onPress: () => {
          */

          let naCount = 0
          let playerCount = 0
          let newPlayerPos =[]
          _games[0].teamPlayers.map(player => {
            //console.log(JSON.stringify(player) + ' what option do i have for player.');
            //console.log(player.currentPosition + ' checking player.currentPosition here ok.');

            if (player.delete === true ) {
                // do nothing.
            }
            else if (player.currentPosition === 'NA') {
              naCount = naCount + 1
            }
            else if (player.currentPosition === 'fwd') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.fwd) + ' what is player.postionTimes[0].fwd');
              player.postionTimes.fwd = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'mid') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.mid) + ' what is player.postionTimes[0].mid');
              player.postionTimes.mid = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'def') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.def) + ' what is player.postionTimes[0].def');
              player.postionTimes.def = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'gol') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.gol) + ' what is player.postionTimes[0].gol');
              player.postionTimes.gol = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'sub') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.sub) + ' what is player.postionTimes[0].sub');
              const initials = player.playerName.match(/\b(\w)/g);
              player.positionDetails.initials = initials
              player.positionDetails.playerName = player.playerName
              player.positionDetails.indexId = player.id
              //playerPosDetailsArray[0].initials = initials
              //playerPosDetailsArray[0].playerName = player.playerName
              player.postionTimes.sub = [{st: 0, fin: 99999999}]
              switch(playerCount) {
                case 0:
                  //console.log('hit 0');
                  player.positionDetails.row = 4
                  player.positionDetails.column = 1
                  playerCount++
                  break;
                case 1:
                  //console.log('hit 1');
                  player.positionDetails.row = 4
                  player.positionDetails.column = 2
                  playerCount++
                  break;
                case 2:
                  //console.log('hit 2');
                  player.positionDetails.row = 4
                  player.positionDetails.column = 3
                  playerCount++
                  break;
                case 3:
                  player.positionDetails.row = 4
                  player.positionDetails.column = 4
                  playerCount++
                  break;
                case 4:
                  player.positionDetails.row = 4
                  player.positionDetails.column = 5
                  playerCount++
                  break;
                case 5:
                  player.positionDetails.row = 4
                  player.positionDetails.column = 6
                  playerCount++
                  break;
                case 6:
                  player.positionDetails.row = 4
                  player.positionDetails.column = 7
                  playerCount++
                  break;
                case 7:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 1
                  playerCount++
                  break;
                case 8:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 2
                  playerCount++
                  break;
                case 9:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 3
                  playerCount++
                  break;
                case 10:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 4
                  playerCount++
                  break;
                case 11:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 5
                  playerCount++
                  break;
                case 12:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 6
                  playerCount++
                  break;
                case 13:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 7
                  playerCount++
                  break;
                case 14:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 1
                  playerCount++
                    break;
                case 15:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 2
                  playerCount++
                    break;
                case 16:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 3
                  playerCount++
                    break;
                case 17:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 4
                  playerCount++
                  break;
                case 18:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 5
                  playerCount++
                  break;
                case 19:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 6
                  playerCount++
                  break;
                case 20:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 7
                  playerCount++
                  break;
                case 21:
                  player.positionDetails.row = 4
                  player.positionDetails.column = 0
                  playerCount++
                  break;
                case 22:
                  player.positionDetails.row = 4
                  player.positionDetails.column = 8
                  playerCount++
                  break;
                case 23:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 0
                  playerCount++
                  break;
                case 24:
                  player.positionDetails.row = 5
                  player.positionDetails.column = 8
                  playerCount++
                  break;
                case 25:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 0
                  playerCount++
                  break;
                case 26:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 8
                  playerCount++
                  break;
                default:
                  player.positionDetails.row = 6
                  player.positionDetails.column = 8
                  playerCount++
            }

            }

            player.gameStats = [{gol: 0, asst: 0, defTac: 0, golSave: 0}]

            newPlayerPos.push({ row: player.positionDetails.row, column: player.positionDetails.column, indexId: player.positionDetails.indexId, initials: player.positionDetails.initials, gameTimeStats: '', playerName: player.playerName })


          })



          if (games[0].season.season === '') {
              Alert.alert("Please select a season from the 'Select Current Season' dropdown box" )
          }
          else if (naCount === 0) {
            _games[0].season.season = seasonsDisplay
            _games[0].season.id = seasonsDisplayId
            //console.log('migt be too lonf to view. ok. haa');
            //console.log(JSON.stringify(_games[0]) + ' check here berfore moving');
            //console.log(JSON.stringify(_games) + ' _games check here berfore moving');
            const gamesNew = _games
            dispatch(updateGames(gamesNew))

            const checkSortNew = checkSort + 1
            dispatch(updateCheckSort(checkSortNew))

            dispatch(updatePosArray(newPlayerPos, newPlayerPos))

            if (goToWhere === 0) {
              navigate('SetupHome', {
                teamId: _games[0].teamId,
                teamIdCode: _games[0].teamIdCode
              });
            }
            else {
              console.log('getting to here AddAiPositionsHome.');
              /*
              navigation.getParent()?.navigate('AddAiTeamPlayersPositionHome', {
                teamId: _games[0].teamId,
                teamIdCode: _games[0].teamIdCode,
              });
              */
              navigate('AddAiTeamPlayersPositionHome', {
                teamId: _games[0].teamId,
                teamIdCode: _games[0].teamIdCode
              });
            }


          }
          else {


              Alert.alert("Please add a position for each player, or select 'ABS' if player is absent." )

          }

          /*
        }},
        {text: 'Continue, I have moved non-participating players', onPress: () => {

          let naCount = 0
          games[0].teamPlayers.map(player => {

            if (player.delete === true ) {
                // do nothing.
            }
            else if (player.currentPosition === 'NA') {
              naCount = naCount + 1
            }
            else if (player.currentPosition === 'fwd') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.fwd) + ' what is player.postionTimes[0].fwd');
              player.postionTimes.fwd = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'mid') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.mid) + ' what is player.postionTimes[0].mid');
              player.postionTimes.mid = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'def') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.def) + ' what is player.postionTimes[0].def');
              player.postionTimes.def = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'gol') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.gol) + ' what is player.postionTimes[0].gol');
              player.postionTimes.gol = [{st: 0, fin: 99999999}]
            }
            else if (player.currentPosition === 'sub') {
            //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
            //console.log(JSON.stringify(player.postionTimes.sub) + ' what is player.postionTimes[0].sub');
              player.postionTimes.sub = [{st: 0, fin: 99999999}]
            }

            player.gameStats = [{gol: 0, asst: 0, defTac: 0, golSave: 0}]

          })



          if (games[0].season.season === '') {
              Alert.alert("Please select a season from the 'Select Current Season' dropdown box" )
          }
          else if (naCount === 0) {
            games[0].season.season = seasonsDisplay
            games[0].season.id = seasonsDisplayId
            dispatch(updateGames(games))

            const checkSortNew = checkSort + 1
            dispatch(updateCheckSort(checkSortNew))

            navigate('SetupHome', {
              teamId: games[0].teamId,
              teamIdCode: games[0].teamIdCode
            });
          }
          else {


              Alert.alert("Please add a position for each player, or select 'ABS' if player is absent." )

          }


        }},
        {
          text: 'Go back, I need to move non-participating players',
          onPress: () => //console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

    */

  }

  }

  const checkParams = () => {

 //console.log(props.route.params.checkSortLive + ' check props.route.params.checkSortLive addPlayer');
 //console.log(props.route.params.showNewScreen + ' check props.route.params.showNewScreen addPlayer');

  }

  const checkSetup = () => {
    //const gameSetupStatus = games[0].gameSetup

 //console.log('this always hitting? 123');
 //console.log(props.route.params.teamId + ' what is props.route.params.teamId now?');

    if (gameSetupStatus === true) {
      return (
          <SelectPlayerList teamId={teamId} teamIdCode={teamIdCode} navigation={props.navigation} whereFrom={7}/>
      )
    }
  }

  const teamType = props.route.params.teamType

 //console.log(JSON.stringify(games[0]) + ' games[0].teamPlayers what do i have here.');
 //console.log(games[0].halfTime + ' games[0].halfTime what do i have here.');

    let gameLengthTemp = 0
    try {
      if (games[0].halfTime < 5) {
     //console.log('am i hit?');
        gameLengthTemp = games[0].teamPlayers.length
     //console.log('am i hit 2?');
      }
      else {
        gameLengthTemp = 0
      }
    }
    catch {
      gameLengthTemp = 0
    }

    const checkLog = () => {
    //console.log('need to hit?');
    }

    const sendPlayerInviteHome = () => {

      navigate('SendPlayerInviteHome');

    }

    const displaySelectSeason = () => {

  		//console.log(whereFrom + ' whats whereFrom numner?')

  		if (whereFrom === 7) {
  			return (
  				<View style={{minWidth: '100%'}}>

  				<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientSeason}>
  			<View style={{paddingLeft: '5%', paddingRight: '5%'}}>
  				<SelectSeason navigation={props.navigation} whereFrom={props.whereFrom} isOpen={props.isOpen} teamIdCode={games[0].teamIdCode}/>
  			</View>
  			</LinearGradient>

  			</View>
  			)
  		}

  	}

 //console.log(gameLengthTemp + ' what is gameLengthTemp?');

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={0} // Adjust if you have a header or SafeArea
          >
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <Center>

            <Container h="100%" w="100%" maxWidth="100%">
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
              {props.route.params.addTeamOnly !== 1 &&
                <Box>
                <Heading mt="2" style={{color: '#fff'}}>Add Players</Heading>
                <Text style={{color: '#ccc', marginBottom: 2}}>If needed, add new players and then tap 'Continue'</Text>
                </Box>
              }
              {props.route.params.addTeamOnly === 1 &&
                <Heading mb="2" mt="2" style={{color: '#fff'}}>Add Players</Heading>
              }
              </LinearGradient>
              {isOpen === false &&
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientAddPlayer}>
                <Button style={{justifyContent: 'flex-start'}} variant="unstyled" onPress={() => setOpenStatus(true)}>
                  <HStack minW="100%">

                    <Center>
                      <Text style={{color: '#fff', fontSize: 18, textAlign: 'left'}}>ADD NEW PLAYER</Text>
                      </Center>
                      <Text style={{textAlign: 'right', minWidth: '50%'}}>
                        {isOpen ? upIcon : downIcon}
                      </Text>
                  </HStack>
                </Button>
                </LinearGradient>
              }
              {isOpen === true &&
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHideAddPlayer}>
                <Button style={{justifyContent: 'flex-start'}} variant="unstyled" onPress={() => setOpenStatus(false)}>
                  <HStack minW="100%">
                    <Center>
                      <Text style={{color: '#fff', fontSize: 18, textAlign: 'left'}}>HIDE ADD PLAYER</Text>
                      </Center>
                      <Text style={{textAlign: 'right', minWidth: '50%'}}>
                      {isOpen ? upIcon : downIcon}
                      </Text>
                  </HStack>
                </Button>
                </LinearGradient>
              }
              <View>
              {isOpen === true &&
              <PresenceTransition visible={isOpen} initial={{
                opacity: 0
                }} animate={{
                opacity: 1,
                transition: {
                  duration: 250
                }
                }}
                style={{zIndex: 3, elevation: 3 }}
              >
                <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
                  <InputPlayerName teamId={teamId} teamIdCode={teamIdCode} addTeamOnly={props.route.params.addTeamOnly}/>
                </View>
                </PresenceTransition>
              }
              <View style={{paddingLeft: '5%', paddingRight: '5%'}}>

      				</View>

              {props.route.params.addTeamOnly === 1 &&

                <View>
                  <AddPlayersList navigation={props.navigation} whereFrom={7} isOpen={0} teamId={props.route.params.teamId} teamId={props.route.params.teamIdCode} addPlayerPage={true} checkSortLive={props.route.params.checkSortLive} showNewScreen={props.route.params.showNewScreen} addTeamOnly={props.route.params.addTeamOnly} />
                </View>
              }
              {props.route.params.addTeamOnly !== 1 &&
                <AddPlayersList navigation={props.navigation} whereFrom={7} isOpen={0} teamId={props.route.params.teamId} teamId={props.route.params.teamIdCode} addPlayerPage={true} checkSortLive={props.route.params.checkSortLive} showNewScreen={props.route.params.showNewScreen} addTeamOnly={props.route.params.addTeamOnly} />
              }



              {isOpen === true && gameLengthTemp === 0 &&
                <View>
                  <Text style={{color: '#fff'}}>Tap 'Add New Player' at the top of the screen</Text>
                </View>
              }
              {isOpen === false && gameLengthTemp === 0 &&
                <Box>
                <Text style={{color: '#fff', paddingLeft: 10}}>Tap 'Add New Player' at the top of the screen</Text>
                </Box>
              }
              </View>
            </Container>
          </Center>
          </ScrollView>
          </KeyboardAvoidingView>


          <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>


          {addTeamOnly !== 1 &&
            <HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6} >
              <Button minW="30%" maxW="20%" bg="#ff0000" size="md" mr="5" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => exitSetup()}>Exit</Button>
              <Button minW="59%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => continueSetup(1)}>Continue to Season Positions</Button>
            </HStack>
          }

          {addTeamOnly === 1 &&
            <Box alignItems="center" mt="3" shadow="6">
            <ImageBackground source={require(`../../assets/LIVE_GAME_BUTTON_LEFT_2.png`)} style={styles.backgroundImageLive}>

              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.linearGradientBtn}>
                <Button minW="100%" size="md" variant="subtle" _text={{
                  color: "#ffffff",
                  fontSize: 25,
                  fontWeight: '500'
                }} style={{height: '100%', width: '100%' }} bg="transparent" pt="0" pb="3" onPress={() => sendPlayerInviteHome()}>
                <Center>
                {feildIcon}
                  <HStack>
                    <VStack pl="3">
                        <Text style={{fontSize: 34, color: '#fff', fontWeight: '400', lineHeight: 36}}>Live Scores!</Text>
                    </VStack>
                  </HStack>
                  <HStack >
                    <VStack pl="3">
                        <Text style={{fontSize: 17, color: '#fff', fontWeight: '400', lineHeight: 19}}>Tap here to send player invites!</Text>
                    </VStack>
                  </HStack>
                  </Center>
                </Button>
              </LinearGradient>

              </ImageBackground>
            </Box>
          }
          {addTeamOnly === 1 &&
            <HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6} >
              <Button minW="90%" bg="#E879F9" size="md"  pt="5" pb="5" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => exitSetup()}>Back Home</Button>
            </HStack>
          }
    </Box>
    </LinearGradient>
          </Center>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  linearGradientAdd: {
    //paddingLeft: 15,
    //paddingRight: 15,
    //paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
  },
  linearGradientHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '90%',
    marginTop: 70,
    marginLeft: 15,
    marginRight: 15
  },
  backgroundImageLive: {
    //flex: 1,
    resizeMode: 'cover', // or 'stretch'
    height: 150,
    borderRadius: 5,
    borderColor: '#aaa',
    borderWidth: 1,
    overflow: 'hidden'
  },
  linearGradientBtn: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  linearGradientAddPlayer: {
    //paddingLeft: 15,
    //paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '90%',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  linearGradientHideAddPlayer: {
    //paddingLeft: 15,
    //paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minWidth: '90%',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
})

export default AddPlayersHome;

/*
{addTeamOnly !== 1 &&
  <HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6} >
    <Button minW="30%" maxW="20%" bg="#ff0000" size="md" mr="5" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => exitSetup()}>Exit</Button>
    <Button minW="59%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => continueSetup(1)}>Continue to Player Positions</Button>
  </HStack>
}
*/

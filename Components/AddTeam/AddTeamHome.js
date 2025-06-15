import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateGameSetup } from '../../Reducers/gameSetup';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateCheckSort } from '../../Reducers/checkSort';

import InputTeamName from './InputTeamName'
import SelectTeamList from './SelectTeamList'

const AddTeamHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let gameSetup = useSelector(state => state.gameSetup.gameSetup);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let seasons = useSelector(state => state.seasons.seasons);
  let checkSort = useSelector(state => state.checkSort.checkSort);
  //let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  //let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  /*
  let addTeamOnly = false

  try {
  //console.log(props.route.params.addTeamOnly + ' working props.route.params.addTeamOnly?');
    addTeamOnly = props.route.params.addTeamOnly
  }
  catch {
    //nothing.
  //console.log('hit?');
  }
  */

  const { navigate } = props.navigation;
  //const teamType = props.teamType;

  const getGames = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }


    const gamesOutput = JSON.stringify(_games)

      return (<Text mt="3" fontWeight="medium">
        {gamesOutput}
      </Text>)
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


          ///const gameRemove = games.shift();
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
        'If you exit all setup data will be lost.',
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

  const continueSetup = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    if (teamType === 1) {
      if (_games[0].teamNames.awayTeamName !== '') {

      navigate('SetupHome', {
        teamId: games[0].teamId,
        teamIdCode: games[0].teamIdCode,
        whereFrom: 1,
        awayTeamId: games[0].teamNames.awayTeamId
      });
    }
    else {
      Alert.alert("Please Select an opposition team to continue." )
    }

  }
  else {

      if (_games[0].teamId >= 0 && _games[0].teamId < 99999999 ) {

        let gameIdsTeamNames = teamNames[0].gameIds
        const teamId = teamNames[0].teamId
        const gameIdDb = _games[0].gameIdDb

        const gameIdDataTeamNames = {gameIdDb: gameIdDb, status: 0, teamId: teamId}

        try {
            gameIdsTeamNames.push(gameIdData)
        }
        catch {
          gameIdsTeamNames = []
          gameIds.push(gameIdDataTeamNames)
        }

     //console.log(JSON.stringify(gameIds) + ' etf gameIds hah?');


        teamNames[0].gameIds = gameIdsTeamNames

     //console.log(JSON.stringify(teamNames.gameIds) + ' etf teamNames.gameIds hah?');

        dispatch(updateTeamNames(teamNames))

        const teammIndex = teamNames.findIndex(x => x.teamId === games[0].teamIdCode);
        let gameIds = teamNames[teammIndex].gameIds 

        //let gameIds = []
     //console.log(gameIds + ' gameIds what?');
        //const teamId = _games[0].teamIdCode
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

        const gameIdData = {gameIdDb: gameIdDbNew, status: 0, teamId: teamId, gameId: gameIdNew, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: 0, awayTeamScore: 0, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew}}
        //const gameIdData = {gameIdDb: gameIdDbNew, status: 1, teamId: teamId, gameId: gameIdNew, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: 0, awayTeamScore: 0, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}}

        //gameIds.push(gameIdData)

        //const gameIdData = {gameIdDb: gameIdDbNew, status: 5, teamId: teamId, gameId: gameId, seasonId: seasonIdNew, gameData: {homeTeamName: homeTeamName, awayTeamName: awayTeamName, homeTeamShort: homeTeamShortName, awayTeamShort: awayTeamShortName, homeTeamScore: homeTeamScore, awayTeamScore: awayTeamScore, gameDate: gameDate, gameHalfTime: gameHalfTimeTime, awayTeamId: awayTeamId}, season: {season: seasonNameNew, id: seasonIdNew}}


        //gameIds.push(gameIdData)
        gameIds[gameIds.length-1] = gameIdData;

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
             else if (teamNames[teammIndex].teamId === teamId) {
               const gameTeamIdCode = game.teamIdCode
               const gameHalfTime = game.halfTime
            //console.log(gameTeamIdCode + ' gameTeamIdCode');
            //console.log(gameHalfTime + ' gameHalfTime');
              gameIds.push({gameIdDb: game.gameIdDb, status: game.halfTime, teamId: game.teamId, gameId: game.id, seasonId: game.season.id, gameData: {homeTeamName: game.teamNames.homeTeamName, awayTeamName: game.teamNames.awayTeamName, homeTeamShort: game.teamNames.homeTeamShortName, awayTeamShort: game.teamNames.awayTeamShortName, homeTeamScore: game.score.homeTeam, awayTeamScore: game.score.awayTeam, gameDate: game.gameDate, gameHalfTime: game.gameHalfTime, awayTeamId: game.teamNames.awayTeamId}, season: {season: game.season.season, id: game.season.id}})
             }
            }
        })
        */

        firestore().collection(teamId).doc(teamId).update({
           gameIds: gameIds,
           pro_forever_indiv: pro_forever_indiv,
           pro_yearly_indiv: pro_yearly_indiv,
           pro_yearly_team: pro_yearly_team,
           pro_forever_team: pro_forever_team,
           pro_yearly_player: pro_yearly_player,
           pro_forever_player: pro_forever_player,
         })

         /*
         userRef.doc("seasons").set({
             seasons: _seasons,
           })
           .catch(error => this.setState({ errorMessage: error.message }))

           firestore().collection(teamId).doc('seasons').set({
              seasons: _seasons,
            })
            */


         /*if (seasonsDisplayId === 99999998) {
           navigate('SelectSeasonHome', {
             teamId: _games[0].teamId,
             teamIdCode: _games[0].teamIdCode,
             whereFrom: 'addTeamSetup',
           });

         }
         else {
         */

         const checkSortNew = checkSort + 1
         dispatch(updateCheckSort(checkSortNew))

       //console.log(props.route.params.addTeamOnly + ' again props.route.params.addTeamOnly');
       //console.log(JSON.stringify(_games[0]) + ' _games[0] here.');

          navigate('AddPlayersHome', {
            teamId: _games[0].teamId,
            teamIdCode: _games[0].teamIdCode,
            whereFrom: 7,
            checkSortLive: 0,
            showNewScreen: true,
            addTeamOnly: props.route.params.addTeamOnly,
          });
        //}

      }
      else {
        Alert.alert("Please press the '+' button beside a team to continue." )
      }
    }

  }

  const teamType = props.route.params.teamType
  const addTeamOnly = props.route.params.addTeamOnly

        return (

          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Container h="100%" w="100%" maxWidth="100%">
            <ScrollView>
            <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
              <Heading mb="2" mt="2" style={{color: '#fff'}}>Select Your Team</Heading>
              </LinearGradient>
              <InputTeamName teamType={teamType} />
              <SelectTeamList teamType={teamType} navigation={props.navigation} />


        </View>
        </ScrollView>

        <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

        <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="0" shadow={6} >
        {addTeamOnly !== 1 &&
          <HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6}  minW="85%" maxW="85%">
            <Button minW="45%" maxW="45%" bg="#222" size="md" mr="5" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => exitSetup()}>Exit</Button>
            <Button minW="45%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>
          </HStack>
        }
        {addTeamOnly === 1 &&
          <HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="0" pb="1" shadow={6} minW="85%" maxW="85%">
          <Button minW="45%" maxW="45%" bg="#222" size="md" mr="5" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => exitSetup()}>Back</Button>
          <Button minW="45%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>
          </HStack>
        }
          </HStack>
          </Box>

            </Container>
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
    width: '100%'
  },
  linearGradientHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
})

export default AddTeamHome;

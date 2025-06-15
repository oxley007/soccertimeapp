import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, Stack, Input, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateDragDropDisplayCount } from '../../Reducers/dragDropDisplayCount';

const InputPlayerName = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let dragDropDisplayCount = useSelector(state => state.dragDropDisplayCount.dragDropDisplayCount);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  const inputHandler = (text, key)=>{
    const _inputs = [...inputs];
    //const _inputsNew = [...inputsNew];
    _inputs[key].value = text;
    _inputs[key].key = key;
    //_inputsNew[key].value = text;
    //_inputsNew[key].key = key;
    setInputs(_inputs);
    //setInputsNew(_inputsNew);
  }

  const checkInput = () => {
    /*
    return (
      <Text style={styles.textHeader}>hi now</Text>
    )
    */

      return (
        <Box mt="3">
          <Button size="md" minW="100%" variant="subtle" bg="#E879F9" _text={{color: '#fff', fontSize: 16}} onPress={() => addPlayerButton()}>Add Player</Button>
        </Box>
      )
  }

  const addPlayerButton = () => {

    /*
    let _games = [...games]
    let gamesLength = _games.length
    gamesLength--
    */

    //let _teamPlayers = [...teamPlayers];
    let _teamPlayers = []
    try {
      _teamPlayers = [...teamPlayers];
    }
    catch {
      _teamPlayers = [{...teamPlayers}];
    }
    //console.log(_teamPlayers + ' fromo props 2 teamPlayers');

    //let teamPlayersLength = _teamPlayers.length
    let teamPlayersLength  = 0
    try {
    teamPlayersLength = _teamPlayers.length
    }
    catch {
      teamPlayersLength = 0
    }

    let teamType = 0
    try {
      //console.log(props.teamType + ' props.teamType here');
    teamType = props.teamType
  }
  catch {
    teamType = 0
  }

    //console.log(teamPlayersLength + ' teamPlayersLength');

    let teamPlayersArray = []

    try {
      teamPlayersArray = _teamPlayers
    }
    catch (error) {
      teamPlayersArray = []
    }

    //console.log(JSON.stringify(teamPlayersArray) + ' need to check teamPlayersArray');

    inputs.map(input => {
      //console.log(input.value + ' need to check input.value');
      if (input.value === '') {
        //console.log('value is null.');
      }
      else {
        //console.log(input.value + ' what is here ok input.value');
        let [first, last] = input.value.split(/<[/\w\s-]+>|\s/g);
        //console.log(first + ' what is here ok first');
        //console.log(last + ' what is here ok last');
        if (last === undefined) {
          Alert.alert("Please add a last name to the player name." )
        }
        else {

        //console.log('this is value ' + input.value);
        const myStr = input.value
        const matches = myStr.match(/\b(\w)/g);
        //console.log(matches.join(''));
        const teamInitials = matches.join('')
        //console.log(teamInitials + ' teamInitials here');
        const randonNumber = Math.floor((Math.random() * 1000) % 1000)
        //console.log(randonNumber + ' randonNumber here');
        const randomString = randonNumber.toString()
        //console.log(randomString + ' randomString here');
        const randomLetters = Math.random().toString(36).slice(6, 7);
        //console.log(randomLetters + ' randomLetters here.');
        const playerIdRaw = teamInitials.concat(randomString,randomLetters);
        const playerId = playerIdRaw.toUpperCase();

        const teamId = props.teamId
        const teamIdCode = props.teamIdCode

        let currentSeason = ''
        if (seasonsDisplay === '') {
          currentSeason = ''
        }
        else {
          currentSeason = seasonsDisplay
        }

        teamPlayersLength++
        //teamPlayersArray.push({id: teamPlayersLength, teamId: teamId, teamName: input.value, teamType: teamType, teamSelected: false});
        //was this: teamPlayersArray.push({id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCode, playerName: input.value, stats: {}, postionTimeStats: {}, inviteStatus: 0, isPlayer: true});
        //try {
        //was this: games[0].teamPlayers.push({id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCode, playerName: input.value, currentPosition: 'sub', gameStats: {}, postionTimes: {fwd: {}, mid: {}, def: {}, gol: {}, sub: {}}, season: currentSeason, positionDetails: { row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '' }});
        //}
        //catch {
        //  games[0].teamPlayers = []
        //  games[0].teamPlayers.push({id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCode, playerName: input.value, currentPosition: 'abs', gameStats: {}, postionTimes: {fwd: {}, mid: {}, def: {}, gol: {}, sub: {}}, season: currentSeason, positionDetails: { row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '' }});
        //}

        const playerPositions = {
          fwd: true,
          mid: true,
          def: true,
          gol: true
        }

        const newPlayer = {
          id: teamPlayersLength,
          playerId: playerId,
          teamId: teamId,
          teamIdCode: teamIdCode,
          playerName: input.value,
          playerPositions: playerPositions
        };


        // Add to teamPlayersArray
        teamPlayersArray.push({
          ...newPlayer,
          stats: {},
          postionTimeStats: {},
          inviteStatus: 0,
          isPlayer: true,
        });

        // Add to games[0].teamPlayers
        games[0].teamPlayers.push({
          ...newPlayer,
          currentPosition: 'sub',
          gameStats: {},
          postionTimes: {
            fwd: {},
            mid: {},
            def: {},
            gol: {},
            sub: {},
          },
          season: currentSeason,
          positionDetails: {
            row: 0,
            column: 0,
            indexId: 0,
            initials: '',
            gameTimeStats: '',
          },
        });



        //console.log(teamPlayersArray + ' teamPlayersArray end.');

        _teamPlayers = teamPlayersArray;


        dispatch(updateGames(games))

        const teamIdCodeGames = games[0].teamIdCode
        const gameIdDb = games[0].gameIdDb

       //console.log(teamIdCodeGames + ' teamIdCodeGames');
       //console.log(gameIdDb + ' gameIdDb 2');
       //console.log(JSON.stringify(games[0]) + ' check games[0] here.');

        try {
        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: games[0],
         })
         .catch(error => {
          //console.log('into error');
          //console.log(error.message + ' this is the error');
           this.setState({ errorMessage: error.message })
         })
       }
       catch {
       //console.log('maybe ive finllay found the issue area?');
         //do nothing.
       }


        //console.log(JSON.stringify(userRef) + ' check userRef');

        //_teamPlayers = JSON.stringify(_teamPlayers, getCircularReplacer());


        dispatch(updateTeamPlayers(_teamPlayers))


       //console.log('do we get here? 1');


       //console.log(dragDropDisplayCount + ' hit beofre dragDropDisplayCount');
        dragDropDisplayCount = dragDropDisplayCount + 1
          dispatch(updateDragDropDisplayCount(dragDropDisplayCount))
         //console.log(dragDropDisplayCount + ' hit after dragDropDisplayCount');

         //console.log('do we get here? 2');

       //console.log(playerId + ' playerId here hmmmm?');


         try {
        userRef.doc(playerId).set({
            id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCode, playerName: input.value, stats: {}, postionTimeStats: {}, inviteStatus: 0, isPlayer: true
          })
          .catch(error => this.setState({ errorMessage: error.message }))

         //console.log('do we get here? 3');


          firestore().collection(teamIdCodeGames).doc(playerId).set({
             id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCodeGames, playerName: input.value, stats: {}, postionTimeStats: {}, inviteStatus: 0, isPlayer: true
           })
         }
         catch {
         //console.log('or is this the erro siuue area.');
         }

          //console.log('do we get here? 4');

           let playerCodes = []


           _teamPlayers.map(player => {

             if (player.teamId === teamId && player.delete !== true) {

             const playerId = player.playerId

             const playerCode = {playerId: playerId}

             playerCodes.push(playerCode)
           }

           })


           try {
           firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
              playerIds: playerCodes,
            })
          }
          catch {
          //console.log('or mayne its this ara ok.');
          }





    setInputs([{key: '', value: ''}]);
  }
}

})
}

  const getInputs = () => {
    return (
      <VStack width="100%" alignItems="center" mt="2">
        {inputs.map((input, key)=>(
          <Stack minW="100%" mx="auto" bg="#666" pt="3" pb="3" pl="3">
            <TextInput placeholder={"Player Name"} style={styles.textInputName} placeholderTextColor="#ccc" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
          </Stack>
        ))}
      </VStack>
    )
  }

        return (
          <Box minW="100%" shadow="7">
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#333', '#333']} style={styles.linearGradientAddPlayerHeading}>

              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 2}}>
                Add New Player:
              </Text>

              <Box width="100%">

              {getInputs()}
              <VStack width="100%" space={4} alignItems="center">
              {checkInput()}
              </VStack>
              </Box>
              </LinearGradient>
          </Box>
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  linearGradientAddPlayerHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingTop: 15,
  },
  textInputName: {
    color: '#fff',
    ...Platform.select({
      ios: {
        flex: 1,
        maxHeight: 16,
        lineHeight: 16,
        minHeight: 16,
      },
      android: {
        padding: 0,
      },
      default: {
        flex: 1,
        maxHeight: 16,
        lineHeight: 16,
        minHeight: 16,
      }
      })
  }
})

export default InputPlayerName;

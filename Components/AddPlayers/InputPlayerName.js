import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, Stack, Input, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';

const InputPlayerName = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);

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
          <Button size="md" minW="100%" variant="subtle" bg="tertiary.100" onPress={() => addPlayerButton()}>Add Player</Button>
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
      if (input.value === '') {
        //console.log('value is null');
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
        teamPlayersArray.push({id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCode, playerName: input.value, stats: {}, postionTimeStats: {}});
        games[0].teamPlayers.push({id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCode, playerName: input.value, currentPosition: 'NA', gameStats: {}, postionTimes: {fwd: {}, mid: {}, def: {}, gol: {}, sub: {}}, season: currentSeason});

        //console.log(teamPlayersArray + ' teamPlayersArray end.');

        _teamPlayers = teamPlayersArray;

        dispatch(updateTeamPlayers(_teamPlayers))
        dispatch(updateGames(games))

        ////console.log(JSON.stringify(userRef) + ' check userRef');

        //_teamPlayers = JSON.stringify(_teamPlayers, getCircularReplacer());

        userRef.doc("players").update({
            players: _teamPlayers,
          })
          .catch(error => this.setState({ errorMessage: error.message }))


          firestore().collection(teamIdCode).doc(playerId).set({
             id: teamPlayersLength, playerId: playerId, teamId: teamId, teamIdCode: teamIdCode, playerName: input.value, stats: {}, postionTimeStats: {}
           })


    setInputs([{key: '', value: ''}]);
  }
}

})
}

  const getInputs = () => {
    return (
      <VStack width="100%" alignItems="center" mt="2">
        {inputs.map((input, key)=>(
          <Stack minW="100%" mx="auto" bg="#fff" pt="3" pb="3" pl="3">
            <TextInput placeholder={"Player Name"} style={styles.textInputName} placeholderTextColor="#666" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
          </Stack>
        ))}
      </VStack>
    )
  }

        return (
          <Box minW="100%" shadow="7">
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>

              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                Add New Player
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
    borderRadius: 5
  },
})

export default InputPlayerName;

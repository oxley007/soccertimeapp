import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, Stack, Input, VStack, HStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';

const EditPlayerName = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.route.params.playerData
  const whereFrom = props.route.params.whereFrom

  const { navigate } = props.navigation;

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
          <Button size="md" minW="100%" variant="subtle" bg="tertiary.100" onPress={() => addPlayerButton()}>Update Player</Button>
        </Box>
      )
  }

  const addPlayerButton = () => {

    /*
    let _games = [...games]
    let gamesLength = _games.length
    gamesLength--
    */

    //let teamPlayers = [...teamPlayers];
    /*
    let teamPlayers = []
    try {
      teamPlayers = [...teamPlayers];
    }
    catch {
      teamPlayers = [{...teamPlayers}];
    }
    */
    //console.log(teamPlayers + ' fromo props 2 teamPlayers');

    //let teamPlayersLength = teamPlayers.length
    let teamPlayersLength  = 0
    try {
    teamPlayersLength = teamPlayers.length
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
      teamPlayersArray = teamPlayers
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


        const playerId = playerData.playerId
        const playerIndex = teamPlayers.findIndex(x => x.id === playerData.id);
        const playerIndexGame = games[0].teamPlayers.findIndex(x => x.id === playerData.id);

        teamPlayers[playerIndex].playerName  = input.value
        games[0].teamPlayers[playerIndexGame].playerName = input.value

        dispatch(updateTeamPlayers(teamPlayers))
        dispatch(updateGames(games))

        ////console.log(JSON.stringify(userRef) + ' check userRef');

        //teamPlayers = JSON.stringify(teamPlayers, getCircularReplacer());

        const teamIdCode = playerData.teamIdCode

        console.log('do i get here?');

        console.log(JSON.stringify(teamPlayers) + ' need to cehk teamPlayers here.');
        userRef.doc("players").update({
            players: teamPlayers,
          })
          .catch(error => this.setState({ errorMessage: error.message }))

          userRef.doc("games").update({
              games: games,
            })
            .catch(error => this.setState({ errorMessage: error.message }))

          console.log('do i get here 2?');

          firestore().collection(teamIdCode).doc(playerId).update({
             playerName: input.value
           })


      console.log('do i get here 3?');

    setInputs([{key: '', value: ''}]);
  }
}

})

  continueSetup()

}

  const getInputs = () => {
    return (
      <VStack width="100%" alignItems="center" mt="2">
        {inputs.map((input, key)=>(
          <Stack minW="100%" mx="auto" bg="#fff" pt="3" pb="3" pl="3">
            <TextInput placeholder={"Edit Player Name"} style={styles.textInputName} placeholderTextColor="#666" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
          </Stack>
        ))}
      </VStack>
    )
  }

  const deletePlayer = (deleteValue) => {

    const playerId = playerData.playerId
    const playerIndex = teamPlayers.findIndex(x => x.id === playerData.id);
    const playerIndexGame = games[0].teamPlayers.findIndex(x => x.id === playerData.id);

    teamPlayers[playerIndex].delete  = deleteValue
    games[0].teamPlayers[playerIndexGame].delete = deleteValue

    dispatch(updateTeamPlayers(teamPlayers))
    dispatch(updateGames(games))

    ////console.log(JSON.stringify(userRef) + ' check userRef');

    //teamPlayers = JSON.stringify(teamPlayers, getCircularReplacer());

    const teamIdCode = playerData.teamIdCode

    console.log('do i get here?');

    console.log(JSON.stringify(teamPlayers) + ' need to cehk teamPlayers here.');
    userRef.doc("players").update({
        players: teamPlayers,
      })
      .catch(error => this.setState({ errorMessage: error.message }))

      userRef.doc("games").update({
          games: games,
        })
        .catch(error => this.setState({ errorMessage: error.message }))

      console.log('do i get here 2?');

      firestore().collection(teamIdCode).doc(playerId).update({
         delete: deleteValue
       })

       continueSetup()

  }

  const continueSetup = () => {

    navigate('AddPlayersHome', {
      teamId: games[0].teamId,
      teamIdCode: games[0].teamIdCode,
      whereFrom: whereFrom
    });

  }

        return (
          <Container maxW="88%" ml="5" mr="5">

            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>

              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                Edit {playerData.playerName}
              </Text>

              <Box width="100%">

              {getInputs()}
              <VStack width="100%" space={4} alignItems="center">
              {checkInput()}
              </VStack>
              </Box>
              </LinearGradient>
              {playerData.delete !== true &&
              <Button minW="100%" mt="5" size="md" _text={{fontSize: "xl"}} variant="subtle" colorScheme="secondary" onPress={() => deletePlayer(true)}>Delete Player</Button>
              }
              {playerData.delete === true &&
              <Button minW="100%" mt="5" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => deletePlayer(false)}>Restore Player</Button>
              }

          <Box minW="100%" safeAreaTop alignSelf="center">

      <HStack alignItems="center" safeAreaBottom shadow={6}>
      <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
            </HStack>
    </Box>
    </Container>
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
    borderRadius: 5,
    marginTop: 20
  },
})

export default EditPlayerName;

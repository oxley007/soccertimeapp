import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, Stack, Input, VStack, HStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateSeasons } from '../../Reducers/seasons';

const EditSeason = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const seasonData = props.route.params.seasonData

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

    //let seasons = [...seasons];
    /*
    let seasons = []
    try {
      seasons = [...seasons];
    }
    catch {
      seasons = [{...seasons}];
    }
    */
    //console.log(seasons + ' fromo props 2 seasons');

    //let seasonsLength = seasons.length
    let seasonsLength  = 0
    try {
    seasonsLength = seasons.length
    }
    catch {
      seasonsLength = 0
    }

    let teamType = 0
    try {
      //console.log(props.teamType + ' props.teamType here');
    teamType = props.teamType
  }
  catch {
    teamType = 0
  }

    //console.log(seasonsLength + ' seasonsLength');

    let seasonsArray = []

    try {
      seasonsArray = seasons
    }
    catch (error) {
      seasonsArray = []
    }

    //console.log(JSON.stringify(seasonsArray) + ' need to check seasonsArray');

    inputs.map(input => {
      if (input.value === '') {
        //console.log('value is null');
      }
      else {
        //console.log(input.value + ' what is here ok input.value');


        const seasonIndex = seasons.findIndex(x => x.id === seasonData.id);
        const seasonIndexGame = games[0].season.findIndex(x => x.id === seasonData.id);

        seasons[seasonIndex].season  = input.value
        const seasonDisplay  = input.value
        const seasonsDisplayIdNew = seasonIndex
        games[0].season.season = input.value

        dispatch(updateSeasons(seasons, seasonDisplay, seasonsDisplayIdNew))
        dispatch(updateGames(games))

        ////console.log(JSON.stringify(userRef) + ' check userRef');

        //seasons = JSON.stringify(seasons, getCircularReplacer());



        console.log('do i get here?');

        console.log(JSON.stringify(seasons) + ' need to cehk seasons here.');
        userRef.doc("players").update({
            seasons: seasons,
          })
          .catch(error => this.setState({ errorMessage: error.message }))

          userRef.doc("games").update({
              games: games,
            })
            .catch(error => this.setState({ errorMessage: error.message }))



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

    const playerId = seasonData.playerId
    const playerIndex = seasons.findIndex(x => x.id === seasonData.id);
    const playerIndexGame = games[0].season.findIndex(x => x.id === seasonData.id);

    seasons[playerIndex].delete  = deleteValue
    games[0].season[playerIndexGame].delete = deleteValue

    dispatch(updateSeasons(seasons))
    dispatch(updateGames(games))

    ////console.log(JSON.stringify(userRef) + ' check userRef');

    //seasons = JSON.stringify(seasons, getCircularReplacer());

    const teamIdCode = seasonData.teamIdCode

    console.log('do i get here?');

    console.log(JSON.stringify(seasons) + ' need to cehk seasons here.');
    userRef.doc("players").update({
        players: seasons,
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

    navigate('AddSeasonHome');

  }

        return (
          <Container maxW="88%" ml="5" mr="5">

            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>

              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                Edit {seasonData.playerName}
              </Text>

              <Box width="100%">

              {getInputs()}
              <VStack width="100%" space={4} alignItems="center">
              {checkInput()}
              </VStack>
              </Box>
              </LinearGradient>

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

export default EditSeason;

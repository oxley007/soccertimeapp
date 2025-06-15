import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, Stack, Input, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateSeasons } from '../../Reducers/seasons';

const InputSeason = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  let seasons = useSelector(state => state.seasons.seasons);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

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
          <Button size="md" minW="100%" variant="subtle" bg="tertiary.100" onPress={() => addSeasonButton()}>Add Season</Button>
        </Box>
      )
  }

  const addSeasonButton = () => {

    /*
    let _games = [...games]
    let gamesLength = _games.length
    gamesLength--
    */

    //let _seasons = [...seasons];
    let _seasons = []
    try {
      _seasons = [...seasons];
    }
    catch {
      _seasons = [{...seasons}];
    }
  //console.log(_seasons + ' fromo props 2 seasons');

    //let seasonsLength = _seasons.length
    let seasonsLength  = 0
    try {
    seasonsLength = _seasons.length
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
      seasonsArray = _seasons
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

        const teamIdCodeGames = games[0].teamIdCode
        seasonsLength++
        //seasonsArray.push({id: seasonsLength, teamId: teamId, teamName: input.value, teamType: teamType, teamSelected: false});
        seasonsArray.unshift({id: seasonsLength, season: input.value, teamIdCode: teamIdCodeGames});
        const seasonsDisplay = input.value
        const seasonsDisplayId = seasonsLength
        games[0].season.season = input.value
        games[0].season.id = seasonsLength

      //console.log(seasonsArray + ' seasonsArray end.');

        _seasons = seasonsArray;


        dispatch(updateGames(games))


        const gameIdDb = games[0].gameIdDb


          firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
             game: games[0],
           })


         dispatch(updateSeasons(_seasons, seasonsDisplay, seasonsDisplayId))


          userRef.doc("seasons").set({
              seasons: _seasons,
            })
            .catch(error => this.setState({ errorMessage: error.message }))



            firestore().collection(teamIdCodeGames).doc('seasons').set({
               seasons: _seasons,
             })



    setInputs([{key: '', value: ''}]);
  }
})

 //console.log(props.whereFrom + ' just qck check props.whereFrom');


    navigate('AddPlayersHome',
  {
    whereFrom: 2,
    addTeamOnly: props.addTeamOnly,
    teamIdCode: games[0].teamIdCode,
    teamId: games[0].teamId,
  });




}

  const getInputs = () => {
    return (
      <VStack width="100%" alignItems="center" mt="2">
        {inputs.map((input, key)=>(
          <Stack minW="100%" mx="auto" bg="#fff" pt="3" pb="3" pl="3">
            <TextInput placeholder={"Enter Season"} style={styles.textInputName} placeholderTextColor="#666" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
          </Stack>
        ))}
      </VStack>
    )
  }

        return (
          <Box minW="100%" shadow="7">
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradient}>

              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                Add New Season
              </Text>
              <Text style={{fontSize: 14, color: '#ddd', fontWeight: '400'}}>
                Enter the season year - i.e. 2025 or 2024/25
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
  textInputName: {
    color: '#333',
    ...Platform.select({
      ios: {
        flex: 1,
        maxHeight: 14,
        lineHeight: 14,
        minHeight: 14,
      },
      android: {
        padding: 0,
      },
      default: {
        flex: 1,
        maxHeight: 14,
        lineHeight: 14,
        minHeight: 14,
      }
      })
  }
})

export default InputSeason;

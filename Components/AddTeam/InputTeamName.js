import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, Stack, Input, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamNames } from '../../Reducers/teamNames';

import SelectAgeGrade from './SelectAgeGrade.js'

const InputTeamName = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [inputsShort, setInputsShort] = useState([{key: '', value: ''}]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  const inputHandlerShort = (text, key)=>{
    const _inputsShort = [...inputsShort];
    //const _inputsNew = [...inputsNew];
    _inputsShort[key].value = text;
    _inputsShort[key].key = key;
    //_inputsNew[key].value = text;
    //_inputsNew[key].key = key;
    setInputsShort(_inputsShort);
    //setInputsNew(_inputsNew);
  }

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
          <Button size="md" minW="100%" variant="subtle" bg="#E879F9" _text={{fontSize: 16, color: '#fff'}} onPress={() => addTeamButton()}>Add Team</Button>
        </Box>
      )
  }

  const addTeamButton = () => {

    /*
    let _games = [...games]
    let gamesLength = _games.length
    gamesLength--
    */

    //let _teamNames = [...teamNames];
    let _teamNames = []
    try {
      _teamNames = [...teamNames];
    }
    catch {
      _teamNames = [{...teamNames}];
    }
  //console.log(_teamNames + ' fromo props 2 teamNames');

    //let teamNamesLength = _teamNames.length
    let teamNamesLength  = 0
    try {
    teamNamesLength = _teamNames.length
    }
    catch {
      teamNamesLength = 0
    }

    let teamType = 0
    try {
    //console.log(props.teamType + ' props.teamType here');
    teamType = props.teamType
  }
  catch {
    teamType = 0
  }

  //console.log(teamNamesLength + ' teamNamesLength');

    let teamNamesArray = []

    try {
      teamNamesArray = _teamNames
    }
    catch (error) {
      teamNamesArray = []
    }

    let teamShortName = ''
    let inputShortCheck = true

    try {
    inputsShort.map(input => {
    //console.log(input.value.length + ' what length in ipnpyt short?');
      if (input.value === '') {
      //console.log('value is null');
        inputShortCheck = false
        Alert.alert("Please add a Team Short Name (must be 3 characters long. i.e. MNU, MNC, CHL, etc)" )
      }
      else if (input.value.length < 3 || input.value.length >= 4) {
        inputShortCheck = false
        Alert.alert("Team short name must be 3 characters long. i.e. MNU, MNC, CHL, etc" )
      }
      else {
      //console.log('this is value ' + input.value);
        const myStr = input.value
        teamShortName = myStr.toUpperCase();
      }
    })
    }
    catch {
      // do nothibg.
    }

    if (inputShortCheck === true) {

      let ageGrade = ''
      try {
    inputs.map(input => {
      if (input.value === '') {
      //console.log('value is null');
      }
      else {
      //console.log('this is value ' + input.value);
        const myStr = input.value
        const matches = myStr.match(/\b(\w)/g);
      //console.log(matches.join(''));
        const teamInitials = matches.join('')
      //console.log(teamInitials + ' teamInitials here');
        const randonNumber = Math.floor((Math.random() * 10000) % 10000)
      //console.log(randonNumber + ' randonNumber here');
        const randomString = randonNumber.toString()
      //console.log(randomString + ' randomString here');
        const randomLetters = Math.random().toString(36).slice(5, 7);
      //console.log(randomLetters + ' randomLetters here.');
        const teamIdRaw = teamInitials.concat(randomString,randomLetters);
        const teamId = teamIdRaw.toUpperCase();


        if (games[0].grade === '' || games[0].grade === undefined || games[0].grade === null) {
       //console.log('grade hit 1');
          ageGrade = 'u18'
          games[0].grade = 'u18'
        }
        else {
       //console.log('grade hit 2');
          ageGrade = games[0].grade
        }

        teamNamesLength++
        //teamNamesArray.push({id: teamNamesLength, teamId: teamId, teamName: input.value, teamType: teamType, teamSelected: false});

     //console.log(teamNamesLength + ' teamNamesLength');
     //console.log(teamId + ' teamId');
     //console.log(input.value + ' input.value');
     //console.log(teamShortName + ' teamShortName');
     //console.log(teamType + ' teamType');
     //console.log(ageGrade + ' ageGrade');
        teamNamesArray.unshift({id: teamNamesLength, teamId: teamId, teamName: input.value, teamNameShort: teamShortName, teamType: teamType, teamSelected: false, grade: ageGrade, gameIds: []});

     //console.log(teamNamesArray + ' teamNamesArray end.');

        _teamNames = teamNamesArray;

        dispatch(updateTeamNames(_teamNames))

        userRef.doc("teamNames").update({
            teamNames: _teamNames,
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //console.log('hitting test add?');
          //const teamName = 'teamTest3'
          //const teamId = 'AO123'
          if (teamType === 1)
          {
            //do nothing.
         }
         else {
           firestore().collection(teamId).doc(teamId).set({
              id: teamNamesLength, teamId: teamId, teamName: input.value, teamNameShort: teamShortName, teamType: teamType, teamSelected: false, grade: ageGrade, gameIds: []
            })
         }

      }
    })
  }
  catch {
    // do nthing.
  }



    setInputs([{key: '', value: ''}]);
    setInputsShort([{key: '', value: ''}]);


    Alert.alert("Team added. Please tap the + button beside the new team to select team." )
    }


}

  const getInputsShort = () => {
    return (
    <VStack minW="100%" width="100%" mt="2" mb="2">
      <Text style={styles.textTenAlignLeftMargin}>Team short name must be 3 characters (i.e. MNU, CHL, etc)</Text>
      {inputs.map((input, key)=>(
        <Stack minW="100%" mx="auto" bg="#333" pt="3" pb="3" pl="3" style={{borderRadius: 5}}>
          <TextInput placeholder={"Short Name (3 Character only)"} mode="contained" ark={true} color={'blue'} style={styles.textInputName} placeholderTextColor="#999" textColor="#fff" value={inputsShort.value} onChangeText={(text)=>inputHandlerShort(text,key)}/>
        </Stack>
      ))}
    </VStack>
  )
  }

  const getInputs = () => {

    /*
    return (
      <VStack width="100%" space={4} alignItems="center">
      {inputs.map((input, key)=>(
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <TextInput placeholder={"Team Name"} style={styles.textInputName} placeholderTextColor="#666" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
      </Stack>
      ))}
      </VStack>
    )
    */

    return (
    <VStack minW="100%" width="100%" alignItems="center" mt="2">
      {inputs.map((input, key)=>(
        <Stack minW="100%" mx="auto" bg="#333" pt="3" pb="3" pl="3" style={{borderRadius: 5}}>
          <TextInput placeholder={"Team Name"} style={styles.textInputName} placeholderTextColor="#999" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
        </Stack>
      ))}
    </VStack>
  )
  }

        return (
          <Box shadow="7">
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                Add New Team
              </Text>

              <Box>

              {getInputs()}
              {getInputsShort()}
              {props.teamType !== 1 &&
                <SelectAgeGrade />
              }
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
    borderRadius: 5,
    width: '100%'
  },
  textInputName: {
    //width: '100%',
    color: '#fff',
    //borderRadius: 5,
    //backgroundColor: '#222',
    ...Platform.select({
      ios: {
        flex: 1,
        maxHeight: 16,
        lineHeight: 16,
        minHeight: 16,
      },
      android: {
        padding: 0
      },
      default: {
        flex: 1,
        maxHeight: 16,
        lineHeight: 16,
        minHeight: 16,
      }
      })
  },
  textTenAlignLeftMargin: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 3,
    textAlign: 'left',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 10,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
})

export default InputTeamName;

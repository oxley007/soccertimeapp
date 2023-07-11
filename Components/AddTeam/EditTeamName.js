import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, Stack, Input, VStack, HStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamNames } from '../../Reducers/teamNames';

const EditTeamName = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [inputsShort, setInputsShort] = useState([{key: '', value: ''}]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamData = props.route.params.teamData
  const teamType = props.route.params.teamType

  const { navigate } = props.navigation;

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
          <Button size="md" minW="100%" variant="subtle" bg="tertiary.300" onPress={() => addTeamButton()}>Save Team</Button>
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

    inputsShort.map(input => {
      console.log(input.value.length + ' what length in ipnpyt short?');
      if (input.value === '') {
        //console.log('value is null');
      }
      else if (input.value.length < 3 || input.value.length >= 4) {
        Alert.alert("Team short name must be 3 characters long. i.e. MNU, MNC, CHL, etc" )
        inputShortCheck = false
      }
      else {
        //console.log('this is value ' + input.value);
        const myStr = input.value
        teamShortName = myStr.toUpperCase();
      }
    })

    if (inputShortCheck === true) {

    inputs.map(input => {
      if (input.value === '') {
        //console.log('value is null');
      }
      else {
        //console.log('this is value ' + input.value);

        const teamIndex = _teamNames.findIndex(x => x.id === teamData.id);
        const teamId = teamData.teamId

        //teamNamesLength++
        //teamNamesArray.push({id: teamNamesLength, teamId: teamId, teamName: input.value, teamType: teamType, teamSelected: false});
        _teamNames[teamIndex] = {id: teamData.id, teamId: teamData.teamId, teamName: input.value, teamNameShort: teamShortName, teamType: teamData.teamType, teamSelected: teamData.teamSelected}
        //teamNamesArray.unshift({id: teamNamesLength, teamId: teamId, teamName: input.value, teamNameShort: teamShortName, teamType: teamType, teamSelected: false});

        //console.log(teamNamesArray + ' teamNamesArray end.');

        //_teamNames = teamNamesArray;

        dispatch(updateTeamNames(_teamNames))

        userRef.doc("teamNames").update({
            teamNames: _teamNames,
          })
          .catch(error => this.setState({ errorMessage: error.message }))

          //console.log('hitting test add?');
          //const teamName = 'teamTest3'
          //const teamId = 'AO123'
          firestore().collection(teamId).doc(teamId).update({
             id: teamData.id, teamId: teamData.teamId, teamName: input.value, teamNameShort: teamShortName, teamType: teamData.teamType, teamSelected: teamData.teamSelected
           })

      }
    })



    setInputs([{key: '', value: ''}]);
    setInputsShort([{key: '', value: ''}]);

    continueSetup()
    //Alert.alert("Team added. Please tap the + button beside the new team to select team." )
    }


}

  const getInputsShort = () => {
    return (
    <VStack minW="100%" width="100%" alignItems="center" mt="2">
      {inputs.map((input, key)=>(
        <Stack minW="100%" mx="auto" bg="#fff" pt="3" pb="3" pl="3">
          <TextInput placeholder={"Short Name (3 Character only)"} style={styles.textInputName} placeholderTextColor="#666" textColor="#fff" value={inputsShort.value} onChangeText={(text)=>inputHandlerShort(text,key)}/>
        </Stack>
      ))}
      <Text style={{color: '#fff', fontSize: 10, lineHeight: 0, marginTop: 3, textAlign: 'left'}}>Team short name must be 3 characters (i.e. MNU, CHL, etc)</Text>
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
        <Stack minW="100%" mx="auto" bg="#fff" pt="3" pb="3" pl="3">
          <TextInput placeholder={"New Team Name"} style={styles.textInputName} placeholderTextColor="#666" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
        </Stack>
      ))}
    </VStack>
  )
  }

  const deleteTeam = (deleteValue) => {

    const teamIndex = teamNames.findIndex(x => x.id === teamData.id);
    const teamId = teamData.teamId

    teamNames[teamIndex].deleted = deleteValue

    dispatch(updateTeamNames(teamNames))

    userRef.doc("teamNames").update({
        teamNames: teamNames,
      })
      .catch(error => this.setState({ errorMessage: error.message }))

      //console.log('hitting test add?');
      //const teamName = 'teamTest3'
      //const teamId = 'AO123'
      firestore().collection(teamId).doc(teamId).update({
         deleted: deleteValue
       })

       continueSetup()

  }

  const continueSetup = () => {

    navigate('AddTeamHome', {
      teamType: teamType
    });

  }

        return (
          <Container maxW="88%" ml="5" mr="5">
          <Box shadow="7">
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>

              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                Edit {teamData.teamName}
              </Text>

              <Box>

              {getInputs()}
              {getInputsShort()}
              <VStack width="100%" space={4} alignItems="center">
              {checkInput()}
              </VStack>
              </Box>
            </LinearGradient>
            </Box>
            {teamData.deleted !== true &&
            <Button minW="100%" mt="5" size="md" _text={{fontSize: "xl"}} variant="subtle" colorScheme="secondary" onPress={() => deleteTeam(true)}>Delete Team</Button>
            }
            {teamData.deleted === true &&
            <Button minW="100%" mt="5" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => deleteTeam(false)}>Restore Team</Button>
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
    width: '100%',
    marginTop: 30
  },
  textInputName: {
    width: '100%'
  },
})

export default EditTeamName;

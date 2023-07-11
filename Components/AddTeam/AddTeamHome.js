import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateGameSetup } from '../../Reducers/gameSetup';

import InputTeamName from './InputTeamName'
import SelectTeamList from './SelectTeamList'

const AddTeamHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let gameSetup = useSelector(state => state.gameSetup.gameSetup);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;
  //const teamType = props.teamType;

  const addGameTest = () => {
    //to do
    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }
    //console.log(JSON.stringify(_games) + ' chcking _games here ok.');

    let gamesLength  = 0
    try {
    gamesLength = games.length
    }
    catch {
      gamesLength = 0
    }

    _games.push({gameSetup: true, season: '', id: gamesLength })

    dispatch(updateGames(_games))

    userRef.doc("games").update({
        games: _games,
      })
      .catch(error => this.setState({ errorMessage: error.message }))

  }

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
      navigate('AddPlayersHome', {
        teamId: _games[0].teamId,
        teamIdCode: _games[0].teamIdCode,
        whereFrom: 7,
      });
    }
    else {
      Alert.alert("Please Select a team to continue." )
    }
  }

  }

  const teamType = props.route.params.teamType

        return (

          <Center>
            <Container h="100%" w="100%" maxWidth="100%">
            <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
            <Heading mt="2" mb="2">
              Select Your Team
            </Heading>
              <InputTeamName teamType={teamType} />
              <SelectTeamList teamType={teamType} navigation={props.navigation} />
              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

              <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="0" shadow={6} >
          <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>
                </HStack>
        </Box>
        </View>
            </Container>
            </Center>


        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default AddTeamHome;

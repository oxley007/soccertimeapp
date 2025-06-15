import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

import SelectGameTime from './SelectGameTime.js'
import SelectOppTeam from './SelectOppTeam.js'

const SetupHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamId = props.route.params.teamId
  const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;

  const continueSetup = () => {

 //console.log(games[0].gameHalfTime + ' games[0].gameHalfTime');
 //console.log(games[0].teamNames.awayTeamName + ' games[0].teamNames.awayTeamName');

    if (games[0].gameHalfTime > 0 && games[0].teamNames.awayTeamName !== '') {

    navigate('GameHome', {
      teamId: teamId,
      teamIdCode: teamIdCode
    });
  }
  else {
    Alert.alert("Please select Game-Time and an Opposition Team to continue." )
  }

  }

        return (

            <Container ml="4" mr="4" minW="90%">
            <Heading mt="2" mb="2">
              Game Options
            </Heading>
              <SelectGameTime />
              <SelectOppTeam navigation={props.navigation} whereFrom={props.route.params.whereFrom}/>
              <Box minW="100%" safeAreaTop alignSelf="center">
          <HStack alignItems="center" safeAreaBottom shadow={6}>
          <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>
                </HStack>
        </Box>
            </Container>


        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default SetupHome;

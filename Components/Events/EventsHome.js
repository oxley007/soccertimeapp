import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOc from 'react-native-vector-icons/Octicons';
import IconMa from 'react-native-vector-icons/MaterialIcons';
const whistleIcon = <Icon name="whistle-outline" size={30} color="#aaa" />;
const soccerBallIcon = <IconFA name="soccer-ball-o" size={20} color="#fff" />;
const scoreboardlIcon = <Icon name="scoreboard-outline" size={20} color="#aaa" />;
const subOffIcon = <Icon name="account-sync-outline" size={20} color="#aaa" />;
const assistIcon = <Icon name="progress-star" size={20} color="#aaa" />;
const defTacIcon = <IconOc name="stop" size={20} color="#aaa" />;
const golSavIcon = <IconMa name="sports-handball" size={20} color="#fff" />;
const golRemoveIcon = <IconMa name="error-outline" size={20} color="#aaa" />;

import EventsDisplay from './EventsDisplay.js';

import { updateGames } from '../../Reducers/games';

//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const EventsHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId

  const { navigate } = props.navigation;

  const continueSetup = () => {

    const teamId = games[0].teamId
    const teamIdCode = games[0].teamIdCode

    navigate('GameHome', {
      teamId: teamId,
      teamIdCode: teamIdCode
    });

  }


        return (

            <Container ml="4" mr="4" minW="90%" maxH="100%">
              <Heading mt="2" mb="2">
                Game Events
              </Heading>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradientText}>
              <Text style={{color: '#fff', marginBottom: 5}}>Tap the 'Send Player Invites' to send the special team ID to allow players/parents/fans to watch live game events!</Text>
              <Text style={{color: '#fff', marginBottom: 5}}>The event list are live events that players/parents/fans can watch during the game so they don't miss any of the action!</Text>
              <Text style={{color: '#fff'}}>The events allow your team & supporters to keep updated with the score, positions and game-time.</Text>

              </LinearGradient>


                <ScrollView style={{borderTopColor: '#333', borderTopWidth: 2}}>

                  <EventsDisplay navigation={props.navigation} />

                </ScrollView>

              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

              <HStack alignItems="center" safeAreaBottom p="0" mt="3" shadow={6} >
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
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  linearGradientText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    maxWidth: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
})

export default EventsHome;

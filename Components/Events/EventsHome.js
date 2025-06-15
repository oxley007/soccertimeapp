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
//import {IconRn} from 'react-native-elements';
const whistleIcon = <Icon name="whistle-outline" size={30} color="#aaa" />;
const soccerBallIcon = <IconFA name="soccer-ball-o" size={20} color="#fff" />;
const scoreboardlIcon = <Icon name="scoreboard-outline" size={20} color="#aaa" />;
const subOffIcon = <Icon name="account-sync-outline" size={20} color="#aaa" />;
const assistIcon = <Icon name="progress-star" size={20} color="#aaa" />;
const defTacIcon = <IconOc name="stop" size={20} color="#aaa" />;
const golSavIcon = <IconMa name="sports-handball" size={20} color="#fff" />;
const golRemoveIcon = <IconMa name="error-outline" size={20} color="#aaa" />;
import YoutubePlayer from 'react-native-youtube-iframe';

import EventsDisplay from './EventsDisplay.js';
import KickOff from '../Game/KickOff.js';

import { updateGames } from '../../Reducers/games';

//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const EventsHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [getHideInst, setHideInst] = useState(1);

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
    const halfTime = games[0].halfTime

    if (halfTime === 5) {
      navigate('GameEnds');
    }
    else {
      navigate('SeasonPositionSortAllHome', {
        teamId: teamId,
        teamIdCode: teamIdCode
      });
    }



  }

  const sendInvites = () => {
    navigate('SendPlayerInviteHome', {
      whereFromNav: 'EventsLive',
      navigateBack: true,
      navigateBackName: 'EventsHome'
    });
  }

  const hideInstructions = (displayFlag) => {

    if (displayFlag === 1) {
        setHideInst(0)
    }
    else {
      setHideInst(1)
    }


  }

  const displayHideShowInst = () => {

    if (getHideInst === 0) {
      return (
        <Button minW="100%" bg="transparent" size="md" _text={{fontSize: "md", color: '#fff'}} variant="subtle" onPress={() => hideInstructions(0)}>+ Show Send Invite instructions</Button>
      )
    }
    else {
      return (
        <Button bg="transparent" size="md" _text={{fontSize: "md", color: '#fff'}} variant="subtle" onPress={() => hideInstructions(1)}>- Hide Send Invite instructions</Button>
      )
    }
  }

  const displayInstructions = () => {

    if (getHideInst === 1) {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']} style={styles.linearGradientText}>
          <Heading mt="2" pb="1" style={{color: '#fff'}}>Live Scores & Game Events</Heading>
          <Text style={{color: '#fff', marginBottom: 5}}>Tap 'Send Player Invites' to share the team ID, allowing players, parents, and supporters to watch live scores and game events! Watch the video for more details.</Text>
          <View style={styles.containerYouTube}>
            <YoutubePlayer
              height={210}
              videoId={'zlXg7P9Kz4Y'}
            />
          </View>
          <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => sendInvites()}>Send Player Invites</Button>
        </LinearGradient>
      )
    }
    else {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientText}>
          {displayHideShowInst()}
        </LinearGradient>
      )
    }

  }


        return (

          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Container minW="100%" maxH="100%">
            <KickOff navigation={props.navigation} fromContinue={'fromEvents'} optionFrom={'fromEventsOption'} />
              <ScrollView style={{borderTopColor: '#333', borderTopWidth: 2}}>
                {displayInstructions()}
                  <EventsDisplay navigation={props.navigation} />
                </ScrollView>
              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

              <HStack alignItems="center" safeAreaBottom p="0" mt="3" shadow={6} >
          <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Back to Game View</Button>
                </HStack>
        </Box>

            </Container>
          </LinearGradient>
        </Center>



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
  linearGradientBg: {
    minWidth: '100%',
  },
  containerYouTube: {
    //flex: 1,
    //backgroundColor: 'darkblue',
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  linearGradientHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 5,
  },
})

export default EventsHome;

/*
<Text style={{color: '#fff', marginBottom: 5}}>The event list below are live events that players/parents/fans can watch during the game so they don't miss any of the action!</Text>
<Text style={{color: '#fff'}}>The events allow your team & supporters to keep updated with the score, positions and game-time.</Text>
*/

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={16} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={16} color="#0891b2" />;

import EventsDisplay from './EventsDisplay.js';

import { updateGames } from '../../Reducers/games';

//import SelectGameTime from './SelectGameTime.js'
//import SelectOppTeam from './SelectOppTeam.js'

const formattedSeconds = (sec) =>
  Math.floor(sec / 60)

const DisplayScoreHomePlayer = (props)=>{

  const [getGame, setGame] = useState([]);
  const [getHalfTime, setHalfTime] = useState([{textOne: '', textTwo: ''}]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamId = props.route.params.teamId
  //const gameIdDb = props.route.params.gameIdDb


  const { navigate } = props.navigation;


  const displayScore = () => {

    /*
 //console.log(JSON.stringify(getGame) + ' getGame score display');
 //console.log(JSON.stringify(getGame.game) + ' getGame.game score display');
 //console.log(JSON.stringify(getGame.game.score) + ' getGame.game.score score display');
 //console.log(JSON.stringify(getGame.game.score.homeTeam) + ' getGame.game.score.homeTeam score display.');
    */

    try {
    const homeTeamScore = props.homeTeamScore
    const awayTeamScore = props.awayTeamScore
    const homeTeamShortName = props.homeTeamShortName
    const awayTeamShortName = props.awayTeamShortName
    const secondsElapsed = props.secondsElapsed
    let sixtySecondsMark = props.sixtySecondsMark
    const halfTimeFlag = props.halfTime
    const gameHalfTime = props.gameHalfTime
    const gameFullTimeRaw = gameHalfTime * 2
    const gameFullTime = gameFullTimeRaw / 60
    const firstHalf = props.firstHalf
    const secondHalf = props.secondHalf

    console.log(sixtySecondsMark + " waht is this when we start a game?");


    if (sixtySecondsMark === null || sixtySecondsMark === undefined) {
      sixtySecondsMark = 0
    }


    //halfTimeFlag = games[0].halfTime

 //console.log('do we get her?1');

    let halfTimeStr = []

    if (firstHalf === true) {
    //console.log('now, am i hit hmm?');
      //halfTimeStr = 'H1'
      halfTimeStr.push({textOne: '1st', textTwo: 'Half'})
    }
    /*
    else if (secondsElapsed === gameHalfTime) {
      //halfTimeStr = 'HT'
      halfTimeStr.push({textOne: 'Half', textTwo: 'Time'})
    }

    else if (secondsElapsed > gameHalfTime && secondsElapsed < gameFullTimeRaw) {
      //halfTimeStr = 'HT'
      halfTimeStr.push({textOne: 'Half', textTwo: 'Time'})
    }
    else if (secondsElapsed >== gameFullTimeRaw) {
      //halfTimeStr = 'HT'
      halfTimeStr.push({textOne: 'Full', textTwo: 'Time'})
    }
    */
    else {
      //halfTimeStr = 'H2'
      halfTimeStr.push({textOne: '2nd', textTwo: 'Half'})
    }

 //console.log(JSON.stringify(halfTimeStr) + ' halfTimeStr');

    return (
      <Center bg="#111" pt="5" pl="5" pb="5">
        <HStack>
          <VStack minW="100%" >
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '800'}}><Text style={{fontSize: 20, color: '#eee', fontWeight: '800'}}>{homeTeamShortName} </Text> <Text style={{backgroundColor: '#000'}}> {homeTeamScore} </Text> <Text style={{fontSize: 18, color: '#999'}}>vs</Text> <Text style={{backgroundColor: '#000'}}> {awayTeamScore} </Text> <Text style={{fontSize: 20, color: '#eee'}}> {awayTeamShortName}</Text></Text>
              <HStack minW="100%">
                <Text style={{fontSize: 18, textAlign: 'left', color: '#fff', width: '70%', marginTop: 5}} color="primary.400">
                  {formattedSeconds(sixtySecondsMark)}<Text style={{fontSize: 10, textAlign: 'center', color: '#fff'}} color="primary.400"> min </Text><Text style={{fontSize: 10, textAlign: 'center', color: '#999'}} color="primary.400">(of {gameFullTime}min total)</Text>
                </Text>
                <Text style={styles.textSizeHalf} fontSize="xs" color="primary.900">{halfTimeStr[0].textOne} {halfTimeStr[0].textTwo}</Text>
                    </HStack>
          </VStack>
        </HStack>
        </Center>
    )
  }
  catch {
    //do nothing.
  }
  }


        return (
                <Box mt="5">
                  {displayScore()}
                </Box>

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
    minHeight: '100%',
  },
  textSize: {
    textAlign: 'center',
    color: '#ddd',
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
  textSizeHalf: {
    textAlign: 'center',
    color: '#999',
    position: 'right',
    textAlign: 'right',
    width: '25%',
    paddingTop: 10,
    paddingight: 5,
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

export default DisplayScoreHomePlayer;

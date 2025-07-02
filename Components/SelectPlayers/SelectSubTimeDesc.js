import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;
const refreshSub = <FontAwesome name="refresh" size={22} color="#E879F9" />;
import LinearGradient from 'react-native-linear-gradient';

//import { requestPurchase, requestSubscription, initConnection, useIAP} from 'react-native-iap';
import Purchases from 'react-native-purchases';

import { updateGames } from '../../Reducers/games';

const formattedSecondsShort = (sec) =>
  Math.floor(sec / 60)

const SelectSubTimeDesc = (props)=>{

  //const [getTeam, setGetTeam] = useState([]);
  //const [isOpen, setIsOpen] = useState(true);
  const [getProductList, setProductList] = useState([]);
  const [getRemainderDisplay, setRemainderDisplay] = useState([]);



  let games = useSelector(state => state.games.games);
  /*
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);
  */

  //let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  //let userProfile = useSelector(state => state.userProfile.userProfile);
  //let playerUserDataTeams = useSelector(state => state.playerUserData.teams);

  const { navigate } = props.navigation;

  const dispatch = useDispatch()

  const { currentUser } = auth()
  //const userRef = firestore().collection(currentUser.uid);
  //const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode




  const backToGame = () => {

    const teamId = games[0].teamId
    const teamIdCode = games[0].teamIdCode

      navigate('SeasonPositionSortAllHome', {
        teamId: teamId,
        teamIdCode: teamIdCode
      });


  }

  const getButtonDisplay = () => {

      return (
        <Button style={{marginTop: 20}} minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => backToGame()}>Back to Game</Button>
      )
    }

    const getDataDisplay = () => {

      const sixtySecondsMarkInSeconds = props.route.params.sixtySecondsMarkInSeconds
      const subEveryThisMinutes = props.route.params.subEveryThisMinutes
      const playersRemainderDisplay = props.route.params.playersRemainderDisplay

      const intervalsPassed = Math.floor(sixtySecondsMarkInSeconds / subEveryThisMinutes);
      const nextSubMinutePlusThree = (intervalsPassed + 3) * subEveryThisMinutes;
      const nextSubMinutePlusTwo = (intervalsPassed + 2) * subEveryThisMinutes;
      const nextSubMinute = (intervalsPassed + 1) * subEveryThisMinutes;
      const lastSubMinute = (intervalsPassed) * subEveryThisMinutes;
      const lastLastSubMinute = (intervalsPassed - 1) * subEveryThisMinutes;

      return (
        <Box mb="5">
          <Text style={styles.subTimes}>
            {refreshSub} {formattedSecondsShort(nextSubMinute)}min {playersRemainderDisplay}.
          </Text>
          <Text style={styles.subTimes}>
            {refreshSub} {formattedSecondsShort(nextSubMinutePlusTwo)}min {playersRemainderDisplay}
          </Text>
          <Text style={styles.subTimes}>
            {refreshSub} {formattedSecondsShort(nextSubMinutePlusThree)}min {playersRemainderDisplay}
          </Text>
        </Box>
      )

    }

    const getRecommendedSubData = () => {
      if (!games?.[0]) return { times: [], remainderDisplay: '' };

      const gameSeconds = games[0].sixtySecondsMark;
      const gameFulltime = games[0].gameHalfTime * 2;
      const subInterval = games[0].aiSubTime;

      const times = [];
      const nextIntervalStart = Math.floor(gameSeconds / subInterval) * subInterval;

      for (let i = 0; i < 3; i++) {
        const time = nextIntervalStart + i * subInterval;
        if (time <= gameFulltime) {
          times.push(`${Math.floor(time / 60)}min`);
        }
      }

      const playersRemainder = games[0].playersRemainder;
      let remainderDisplay = '';
      if (playersRemainder > 0) {
        remainderDisplay = 'x' + playersRemainder;
      }

      return { times, remainderDisplay };
    };


        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="16" >
                  <ScrollView>
                    <Box minW='100%' style={{zIndex: 3, elevation: 3}}>
                      <HStack>
                        <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
                          <Box shadow="7" mt="10" mb="2">
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                              <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 10, paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
                                What Are These Minutes For?
                              </Heading>
                            </LinearGradient>
                          </Box>
                          <Box alignItems="center" mt="3" shadow="6">
                          {games?.[0] ? (
                            (() => {
                              const { times, remainderDisplay } = getRecommendedSubData();

                              return (
                                <VStack>
                                  {times.map((time, index) => (
                                    <Center>
                                      <Text style={styles.subTimes} key={index}>{refreshSub} {time} {remainderDisplay}</Text>
                                    </Center>
                                  ))}
                                  <Box style={{backgroundColor: '#333', marginTop: 15}}>

                                    <Text style={{color: '#fff', fontSize: 18, padding: 15}}>
                                    These minutes show the suggested substitution times to help you reach the average playing time for each outfield player.
                                    </Text>

                                    <Text style={{color: '#fff', fontSize: 18, padding: 15}}>
                                    If you see a <Text style={{color: '#fff', fontSize: 18, fontWeight: 800}}>"{remainderDisplay}"</Text> next to a time, it means we recommended {remainderDisplay} substitutions at that time.
                                    </Text>

                                    <Text style={{color: '#fff', fontSize: 18, padding: 15}}>
                                    Think of these times as helpful targets—not strict rules—since every match brings its own surprises (like injuries, absences, early or late subs… or kids who just won’t come off!).
                                    </Text>

                                    <Text style={{color: '#fff', fontSize: 18, padding: 15}}>
                                    You’ll find these suggestions at the top left of the main playing screen to help guide fair playtime for everyone.
                                    </Text>

                                  </Box>
                                </VStack>
                              );
                            })()
                          ) : (
                            <Text>Loading sub times...</Text>
                          )}

                            </Box>
                            {getButtonDisplay()}
                        </View>
                      </HStack>
                    </Box>

                  </ScrollView>
                </Container>
                <Box minW="100%" safeAreaTop alignSelf="center" mt="5" mb="10" style={{paddingTop: 0, paddingBottom: 50, paddingLeft: 20, paddingRight: 20}}>
                  <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} >

                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </Center>
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
    minWidth: '100%',
    marginTop: 10
  },
  linearGradientBtn: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 5
  },
  linearGradientProduct: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
  },
  linearGradientHide: {
    minWidth: '100%',
  },
  linearGradientHideDisplay: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    minWidth: '100%',
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  textHeader: {
    color: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
  textHeaderTitle: {
    color: '#333',
    fontSize: 22,
    paddingLeft: 20
  },
  buttonTextBackWhite: {
    fontSize: 20,
    color: '#333',
    fontWeight: '400',
    paddingLeft: 20
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  textFourteen: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 5,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 14,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  subTimes: {
    color: '#fff',
    fontSize: 20,
    padding: 0,
    ...Platform.select({
      ios: {
        lineHeight: 30,
      },
      android: {
        lineHeight: 30,
      },
      default: {
        lineHeight: 30,
      }
      })
  }
})

export default SelectSubTimeDesc;

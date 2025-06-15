import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateCheckSort } from '../../Reducers/checkSort';

//import DisplayPlayerStats from './DisplayPlayerStats.js'
//import TeamPlayerInvites from './TeamPlayerInvites.js'
import CopyCoachId from './CopyCoachId.js'


const SendCoachIdHome = (props)=>{

  const [isOpen, setIsOpen] = useState(true);
  const [oppTeam, setOppTeam] = useState('');
  const [oppTeamId, setOppTeamId] = useState(0);
  const [season, setSeason] = useState('');
  const [seasonId, setSeasonId] = useState(0);
  const [playerData, setPlayerData] = useState([]);
  const [playerDataLength, setPlayerDataLength] = useState(0);
  const [userProfileState, setUserProfileState] = useState(2);


  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  let copyDisplayBoard = useSelector(state => state.copyDisplayBoard.copyDisplayBoard);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  let parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);
  //let userProfile = useSelector(state => state.userProfile.userProfile);
  let userRef = null
  try {
    if (userProfile === 4) {
      console.log('profile 4 is hit!');
      console.log(parentCoachView + ' parentCoachView ID is?');
      userRef = firestore().collection(parentCoachView);
    }
    else {
      userRef = firestore().collection(currentUser.uid);
    }
  }
  catch {
    //do nothing.
  }
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;

  useEffect(() => {

   //console.log(userProfile + ' hit?');
      setUserProfileState(userProfile)

  },[userProfile])

  useEffect(() => {

 //console.log(JSON.stringify(playerData) + ' wtf playerData');

    const oppTeamIdRaw = oppTeamId

 //console.log(oppTeamIdRaw + ' oppTeamIdRaw here');

    let playersForInvite = []

    teamPlayers.map(player => {
      if (player.teamId === oppTeamIdRaw) {
        playersForInvite.push(player)
      }
    })

    setPlayerData(playersForInvite)

      setOppTeamId(oppTeamIdRaw)


  },[oppTeamId])

  useEffect(() => {


   //console.log(seasonsDisplay + ' what is seasonsDisplay');
      const seasonYear = seasonsDisplay
      prevGamesSeason.season = seasonsDisplay
   //console.log(seasonYear + ' what is seasonYear');

      const seasonIndex = seasons.findIndex(x => x.season === seasonsDisplay);
      let valueInt = 0
      try {
      valueInt = seasons[seasonIndex].id
      prevGamesSeason.id = seasons[seasonIndex].id
      }
      catch {
        valueInt = 0
      }
      setSeason(seasonYear)
      setSeasonId(valueInt)
      dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))


  },[seasonsDisplay])

  const addSeasonSelect = (value: string) => {

    if (value === 'new') {
      navigate('AddSeasonHome');
    }
    else {

      let valueInt = Number(value)
      const seasonIndex = seasons.findIndex(x => x.id === valueInt);
      const seasonName = seasons[seasonIndex].season
      const seasonId = seasons[seasonIndex].id
      //prevGamesSeason.season = seasonName
      //prevGamesSeason.id = seasonId
      setSeason(seasonName)
      setSeasonId(valueInt)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
    }
  }

  const changeSeason = () => {

    const valueInt = ''
    //prevGamesSeason.season = ''
    //prevGamesSeason.id= 99999999
    setSeason(valueInt)
    setSeasonId(0)
    //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
    //dispatch(updateSeasons(seasons, ''))
  }

  const addTeamSelect = (value: string) => {



      let valueInt = Number(value)
      const teamIndex = teamNames.findIndex(x => x.id === valueInt);
      const teamName = teamNames[teamIndex].teamName
      const teamNameShort = teamNames[teamIndex].teamNameShort
      const teamAwayId = teamNames[teamIndex].id
      //prevGamesTeam.teamName = teamName
      //prevGamesTeam.teamNameShort = teamNameShort
      //prevGamesTeam.id = teamAwayId

      let playersForInvite = []

      teamPlayers.map(player => {
        if (player.teamId === valueInt) {
          playersForInvite.push(player)
        }
      })


      setOppTeam(teamName)
      setOppTeamId(valueInt)
      setPlayerData(playersForInvite)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
      //setIsOpen(false)

  }

  const changeTeam = () => {

    const valueInt = ''
    prevGamesTeam.teamName = ''
    prevGamesTeam.teamNameShort = ''
    prevGamesTeam.id = 99999998
    setOppTeam(valueInt)
    setOppTeamId(0)
    //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))

  }


  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
  }

  const continueSetup = () => {

    let whereFromNavLocal = ''
    try {
      whereFromNavLocal = props.route.params.whereFromNav
    }
    catch {
      whereFromNavLocal = ''
    }

    if (whereFromNavLocal === 'EventsLive') {
      navigate('EventsHome');
    }
    else if (userProfile === 1) {
      navigate('Home')
    }
    else if (userProfile === 2) {
      navigate('HomePlayer');
    }
    else if (userProfile === 3) {
      navigate('HomePlayer');
    }
    else {
      navigate('Home');
    }

  }

  const startNewGame = (fromWhere) => {



    //setAnimateLoading(true)
    //to do

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

  //console.log(_games[0].halfTime + ' what is _games[0].halfTime?');
    //setHalfTimeFlag(_games[0].halfTime)

    let gameSetupRaw = true
    try {
      gameSetupRaw = _games[0].gameSetup
    }
    catch {
      gameSetupRaw = true
    }

    //_games[0].halfTime = 5

 //console.log(getHalfTimeFlag + ' check last chacnce getHalfTimeFlag');


 //console.log(newSignIn + ' what is newSignIn 1');

    if (gameSetupRaw === false && newSignIn !== true) {



      navigate('GameHome', {
        fromContinue: 1
      });

    }

    else {

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
    gamesLength = _games.length
    }
    catch {
      gamesLength = 0
    }

    let newDate = new Date()
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();


      let monthName = ''

    switch(month) {
      case 1:
        monthName = 'Jan'
        break;
      case 2:
        monthName = 'Feb'
        break;
      case 3:
        monthName = 'Mar'
        break;
      case 4:
        monthName = 'Apr'
        break;
      case 5:
        monthName = 'May'
        break;
      case 6:
        monthName = 'Jun'
        break;
      case 7:
        monthName = 'Jul'
        break;
      case 8:
        monthName = 'Aug'
        break;
      case 9:
        monthName = 'Sep'
        break;
      case 10:
        monthName = 'Oct'
        break;
      case 11:
        monthName = 'Nov'
        break;
      case 12:
        monthName = 'Dec'
        break;
      default:
        monthName = ''
  }

    const gameDate = date + ' ' + monthName + ' ' + year

 //console.log(gameDate + ' gameDate check');

    //let userId = currentUser.uid

    let userId = null
    try {
      if (userProfile === 4) {
        console.log('profile 4 is hit!');
        console.log(parentCoachView + ' parentCoachView ID is?');
        userId = parentCoachView;
      }
      else {
        userId = currentUser.uid;
      }
    }
    catch {
      //do nothing.
    }
    userId = userId.substring(0, 5);
    const gamesLengthStr = gamesLength.toString();

    const gameIdDb = 'GM' + userId + gamesLengthStr

    const gameDateStamp = Math.floor(Date.now() / 1000)

    _games.unshift({isGame: true, gameDateStamp: gameDateStamp, gameSetup: true, season: {season: '', id: 99999999}, id: gamesLength, gameIdDb: gameIdDb, halfTime: 0, firstHalf: false, secondHalf: false, gameHalfTime: 0, score: {homeTeam: 0, awayTeam: 0}, teamNames: {homeTeamName: '', awayTeamName: '', homeTeamShortName: '', awayTeamShortName: '', homeTeamId: 99999998, awayTeamId: 99999998}, gameEvents:{}, grade: '', secondsElapsed: 0, gameDate: gameDate})

    //const testabc = []

    dispatch(updateGames(_games))

    //dispatch(updateTeamPlayers(testabc))

    //dispatch(updateTeamNames(testabc))


    userRef.doc(gameIdDb).update({
        game: _games[0],
      })
      .catch(error => this.setState({ errorMessage: error.message }))

      /*************
      READ ME
      the rason i don't add games to the team DB is that no teamm has yet been selected so
      not possible to call the team DB
      **************/

      dispatch(updateStopwatch(
        0,
        [],
        null,
        null,
        [],
        0,
        false,
        false,
      ))

      dispatch(updateCheckSort(0))

      //setAnimateLoading(false)

      /*
      if (seasonsDisplayId === 99999998) {
        navigate('SelectSeasonHome', {
          teamType: 0,
          whereFrom: 'addTeamSetup',
        });
      }
      else {
      */
    //console.log(fromWhere + ' check fromWhere');
      if (fromWhere === 0) {
      //console.log(fromWhere + ' check fromWhere is 0');
        navigate('AddTeamHome', {
          teamType: 0,
          addTeamOnly: 1,
        });
      }
      else {
        navigate('AddTeamHome', {
          teamType: 0,
          addTeamOnly: 0,
        });
      }
     //}




    }


  }


  const getDisplayCopied = () => {
    return (
      <Box style={{zIndex: 300, elevation: 300, minWidth: '100%'}}>
      {copyDisplayBoard === true &&
        <PresenceTransition visible={copyDisplayBoard} initial={{
        opacity: 0
        }} animate={{
        opacity: 1,
        transition: {
          duration: 250
        }
        }}
        >
        <Box>
          <Center style={{position:'absolute', bottom: 100, height: 'auto'}} mt="2" rounded="lg" minW="100%" _text={{
          color: "white"
          }} shadow="9" shadowOffset="-20">
            <Center>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#d1fae5', '#34d399']} style={styles.linearGradientEventBoard}>
                <Text style={{color: '#333'}}>Player Invite Copied to Clipboard</Text>
              </LinearGradient>
            </Center>
          </Center>
          </Box>
        </PresenceTransition>
        }
        </Box>
    )
  }


  //const teamType = props.route.params.teamType

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <Center style={{minWidth: "100%", height: '100%'}}>
            <Container h="100%" w="100%" maxWidth="100%" pt="16" >
            <ScrollView>
              <Box minW='100%' style={{zIndex: 3, elevation: 3, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                <HStack>
                  <View style={{paddingTop: '7.5%'}}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientText}>
                      <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 0, paddingLeft: 0, paddingTop: 0, paddingRight: 20}}>
                        Share Coach Profile ID
                      </Heading>
                      <Text style={{color: '#fff'}}>Tap 'Copy Coach Profile ID' to copy the ID to your clipboard. The Coach ID includes a Profile ID allowing parents to manage the substitions & live scores for your team! Once copied, paste the ID into a messenger service or email to send the ID to the parent.</Text>
                    </LinearGradient>
                    { teamNames.length > 0 &&
                      <Box>
                    <Text style={{marginBottom: 0, color: '#fff'}}>Select your Team and Season to display coach profile ID.</Text>
                      <Box style={{zIndex: 3, elevation: 3, marginBottom: 10}}>
                        <Box shadow="7">
                          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                            <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
                              Select Team
                            </Text>
                            {oppTeamId === 0 &&
                              <Center>
                                <Box maxW="100%">
                                  <Select selectedValue={oppTeamId} minWidth="100%" bg="#333" style={{color: '#fff'}} accessibilityLabel="Select Team" placeholder="Select Team" _selectedItem={{
                                  bg: "teal.600",
                                  endIcon: <CheckIcon size="5" />
                                }} mt={1}  onValueChange={addTeamSelect.bind(this)} >
                                  {teamNames !== "" ? (
                                      teamNames.map(item => {
                                        if (item.teamType === 0) {
                                          return <Select.Item label={item.teamName} value={item.id} />;
                                        }
                                      })
                                  ) : (
                                      <Picker.Item label="Loading..." value="0" />
                                  )}
                                  </Select>
                                </Box>
                              </Center>
                            }
                            {oppTeamId > 0 &&
                              <Box>
                                <HStack>
                                  <Text style={{paddingTop: 5, color: '#fff'}}>{oppTeam}</Text>
                                  <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeTeam()}>Change</Button>
                                </HStack>
                              </Box>
                            }
                            </LinearGradient>
                          </Box>
                          <Box shadow="7">
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradient}>
                              {seasonId > 0 &&
                                <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
                                  Season Selected:
                                </Text>
                              }
                              {seasonId === 0 &&
                                <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
                                  Select Season
                                </Text>
                              }
                              {seasonId === 0 &&
                                <Center>
                                  <Box maxW="100%">
                                    <Select selectedValue={seasonId} minWidth="100%" bg="#333" accessibilityLabel="Select Game-Time" placeholder="Select Season" _selectedItem={{
                                      bg: "teal.600",
                                      endIcon: <CheckIcon size="5" />
                                    }} mt={1}  onValueChange={addSeasonSelect.bind(this)} >

                                    {seasons !== "" ? (
                                      seasons.map(item => {
                                        if (item.teamType !== 0) {
                                          return <Select.Item label={item.season} value={item.id} />;
                                        }
                                      })
                                  ) : (
                                      <Picker.Item label="Loading..." value="0" />
                                  )}
                                  </Select>
                                </Box>
                              </Center>
                            }
                            {seasonId > 0 &&
                              <Box>
                                <HStack>
                                  <Text style={{fontSize: 20, paddingTop: 5, color: '#fff', fontWeight: '700'}}>{season}</Text>
                                  <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeSeason()}>Change</Button>
                                </HStack>
                              </Box>
                            }
                            </LinearGradient>
                          </Box>
                        </Box>
                      </Box>
                      }
                      { teamNames.length <= 0 &&
                        <Box>
                        <Text style={{marginBottom: 0, color: '#fff', paddingBottom: 10}}>PLEASE READ: You must add a team before you can send Player Invites. To add a team, press 'Add Team Players' below.</Text>
                        <Box alignItems="center" mt="3" shadow="6">
                        <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
                          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientBtn}>
                            <Button minW="100%" size="md" variant="subtle" _text={{
                              color: "#ffffff",
                              fontSize: 25,
                              fontWeight: '500'
                            }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => startNewGame(0)}>

                              <HStack>
                                <VStack>
                                  {arrowrightcircle}
                                </VStack>
                                <Center>
                                <VStack pl="5">
                                    <Text style={{fontSize: 24, color: '#fff', lineHeight: 28}}>Add Team/Players</Text>
                                </VStack>
                                </Center>
                              </HStack>
                            </Button>
                          </LinearGradient>
                          </ImageBackground>
                        </Box>
                        </Box>
                      }
                      </View>
                    </HStack>
                  </Box>
                    {oppTeamId > 0 &&
                      <CopyCoachId navigation={props.navigation} playerData={playerData} team={oppTeam} teamId={oppTeamId} season={season} seasonId={seasonId} whereFrom={88} />
                    }
                  </ScrollView>
                  {getDisplayCopied()}
                </Container>
                <Box minW="100%" safeAreaTop alignSelf="center" mt="5" mb="10" style={{paddingTop: 0, paddingBottom: 50, paddingLeft: 20, paddingRight: 20}}>
                  <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} >
                    <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Home</Button>
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
  linearGradientBtn: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
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
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
  },
  linearGradientEventBoard: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    //marginLeft: 25,
    //marginRight: 25',
    width: '100%',
  },
})

export default SendCoachIdHome;

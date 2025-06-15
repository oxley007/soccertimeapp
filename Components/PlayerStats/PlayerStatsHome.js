import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, ActivityIndicator } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;
const downIcon = <Icon name="down" size={20} color="#E879F9" />;
const upIcon = <Icon name="up" size={20} color="#E879F9" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';
import { updateSeasons } from '../../Reducers/seasons';

//import DisplayPlayerStats from './DisplayPlayerStats.js'
import IndividualPlayerStatsHome from './IndividualPlayerStatsHome.js'

const PlayerStatsHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [getPrevGames, setPrevGames] = useState([]);
  const [oppTeam, setOppTeam] = useState('');
  const [oppTeamId, setOppTeamId] = useState(0);
  const [season, setSeason] = useState('');
  const [seasonId, setSeasonId] = useState(0);
  const [selctedPlayer, setSelctedPlayer] = useState('');
  const [selctedPlayerId, setSelctedPlayerId] = useState(0);
  const [selctedTeamIdPlayerCode, setSelctedTeamIdPlayerCode] = useState('');
  const [playerData, setPlayerData] = useState([]);
  const [playerDataLength, setPlayerDataLength] = useState(0);
  const [pro_forever_indivState, setPro_forever_indivState] = useState(false);
  const [pro_yearly_indivState, setPro_yearly_indivState] = useState(false);
  const [pro_yearly_teamState, setPro_yearly_teamState] = useState(false);
  const [pro_forever_teamState, setPro_forever_teamState] = useState(false);
  const [pro_yearly_playerState, setPro_yearly_playerState] = useState(false);
  const [pro_forever_playerState, setPro_forever_playerState] = useState(false);


  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;

  useEffect(() => {

    //console.log(pro_forever_indiv[0].purchased + ' hit?');
      setPro_forever_indivState(pro_forever_indiv[0].purchased)
      setPro_yearly_indivState(pro_yearly_indiv[0].purchased)
      setPro_yearly_teamState(pro_yearly_team[0].purchased)
      setPro_forever_teamState(pro_forever_team[0].purchased)
      setPro_yearly_playerState(pro_yearly_player[0].purchased)
      setPro_forever_playerState(pro_forever_player[0].purchased)

  },[pro_forever_indiv[0].purchased, pro_yearly_indiv[0].purchased, pro_yearly_team[0].purchased, pro_forever_team[0].purchased, pro_yearly_player[0].purchased, pro_forever_player[0].purchased])


  useEffect(() => {

  //console.log(JSON.stringify(playerData) + ' wtf playerData');

    const playerDataLengthRaw = playerData.id

  //console.log(playerDataLengthRaw + ' playerDataLengthRaw here');

      setPlayerDataLength(playerDataLengthRaw)


  },[playerData.length])

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
      prevGamesSeason.season = seasonName
      prevGamesSeason.id = seasonId
      setSeason(seasonName)
      setSeasonId(valueInt)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
      if (seasonsDisplay === '') {
        dispatch(updateSeasons(seasons, seasonName, seasonId))
      }
    }
  }

  const changeSeason = () => {

    const valueInt = ''
    prevGamesSeason.season = ''
    prevGamesSeason.id= 99999999
    setSeason(valueInt)
    setSeasonId(0)
    //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
    //dispatch(updateSeasons(seasons, '', 99999998))
  }


  const addGameTimeSelect = (value: string) => {

  //console.log(season + ' quick check season');
  //console.log(playerDataLength + ' quick check playerDataLength');


      let valueInt = Number(value)
      const teamIndex = teamNames.findIndex(x => x.id === valueInt);
      const teamName = teamNames[teamIndex].teamName
      const teamNameShort = teamNames[teamIndex].teamNameShort
      const teamAwayId = teamNames[teamIndex].id
      prevGamesTeam.teamName = teamName
      prevGamesTeam.teamNameShort = teamNameShort
      prevGamesTeam.id = teamAwayId
      setOppTeam(teamName)
      setOppTeamId(valueInt)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
      //setIsOpen(false)

  }

  const changeTime = () => {

    const valueInt = ''
    prevGamesTeam.teamName = ''
    prevGamesTeam.teamNameShort = ''
    prevGamesTeam.id = 99999998
    setOppTeam(valueInt)
    setOppTeamId(0)
    //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))

  }

  const addPlayerSelected = (value: string) => {


      let valueInt = Number(value)
    //console.log(valueInt + ' what is player value?');
      const playerIndex = teamPlayers.findIndex(x => x.id === valueInt);
      const playerName = teamPlayers[playerIndex].playerName
      const playerTeamIdCode = teamPlayers[playerIndex].teamIdCode
      const playerData = teamPlayers[playerIndex]
    //console.log(playerName + ' what is player anem?');

      //prevGamesTeam.teamName = playerName

      setSelctedPlayer(playerName)
      setSelctedPlayerId(valueInt)
      setSelctedTeamIdPlayerCode(playerTeamIdCode)
      setPlayerData(playerData)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
      setIsOpen(false)

  }

  const changePlayer = () => {

    const valueInt = ''

    setSelctedPlayer(valueInt)
    setSelctedPlayerId(0)

    setIsOpen(true)

  }

  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
  }

  const continueSetup = () => {

      navigate('Home');

  }



  //const teamType = props.route.params.teamType

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <Center style={{minWidth: "100%", height: '100%'}}>
            <Container h="100%" w="100%" maxWidth="100%" pt="16" >
              <Box minW='100%' style={{zIndex: 3, elevation: 3, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                <HStack>
                  <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
                  <Box shadow="7" mt="10" mb="2">
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

                  <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 10, paddingLeft: 0, paddingTop: 10, paddingRight: 20}}>
                    View Player Stats
                  </Heading>
                  </LinearGradient>
                  </Box>
                  { teamNames.length > 0 &&
                    <Box>
                  <Text style={{marginBottom: 10, color: '#fff' }}>Select your Team and Season to view game events (goals, saves, assists, etc) and player game-times</Text>
                  <Box  style={{zIndex: 3, elevation: 3, marginBottom: 10}}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  {isOpen === false &&
                    <Button style={{justifyContent: 'flex-start'}} variant="unstyled" onPress={() => setOpenStatus(true)}>
                      <HStack>

                        <Center>
                          <Text style={{color: '#fff', fontSize: 20, textAlign: 'left', paddingLeft: 5}}>SHOW PLAYER FILTER</Text>
                          </Center>
                          <Text style={{textAlign: 'right', minWidth: '35%'}}>
                          {isOpen ? upIcon : downIcon}
                          </Text>
                      </HStack>
                    </Button>
                  }
                  {isOpen === true &&
                    <Button variant="unstyled" onPress={() => setOpenStatus(false)}>
                    <HStack>

                      <Center pl="2">
                        <Text style={{color: '#fff', fontSize: 20, textAlign: 'left'}}>HIDE PLAYER FILTER</Text>
                      </Center>
                      <Text style={{textAlign: 'right', minWidth: '40%'}}>
                        {isOpen ? upIcon : downIcon}
                      </Text>
                    </HStack>

                    </Button>

                  }

                  {isOpen === true &&
                  <PresenceTransition visible={isOpen} initial={{
                    opacity: 0
                    }} animate={{
                    opacity: 1,
                    transition: {
                      duration: 250
                    }
                    }}
                    style={{zIndex: 3, elevation: 3 }}
                  >

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


                  <Box shadow="7">
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

                  <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
                    Select Team
                  </Text>
                  {oppTeamId === 0 &&
                    <Center>
                    <Box maxW="100%">
                      <Select selectedValue={oppTeamId} minWidth="100%" bg="#333" accessibilityLabel="Select Team" placeholder="Select Team" _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                    }} mt={1}  onValueChange={addGameTimeSelect.bind(this)} >
                      <Select.Item label="+Add new team" value="new" />
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
                    <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeTime()}>Change</Button>
                    </HStack>
                    </Box>
                  }

                  </LinearGradient>
                  </Box>

                  <Box shadow="7">
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

                  <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
                    Select Player
                  </Text>
                  {selctedPlayerId === 0 &&
                    <Center>
                    <Box maxW="100%">
                      <Select selectedValue={selctedPlayerId} minWidth="100%" bg="#333" accessibilityLabel="Select Player" placeholder="Select Player" _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                    }} mt={1}  onValueChange={addPlayerSelected.bind(this)} >
                    <Select.Item label="Select Players" value="0" />
                      {teamPlayers !== "" ? (
                          teamPlayers.map(item => {
                            if (item.teamId === oppTeamId) {
                              return <Select.Item label={item.playerName} value={item.id} />;
                            }
                          })
                      ) : (
                          <Picker.Item label="Loading..." value="0" />
                      )}
                      </Select>
                    </Box>
                    </Center>
                  }
                  {selctedPlayerId > 0 &&
                    <Box>
                    <HStack>
                    <Text style={{paddingTop: 5, color: '#fff'}}>{selctedPlayer}</Text>
                    <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline"}} variant="link" onPress={() => changePlayer()}>Change player</Button>
                    </HStack>
                    </Box>
                  }

                  </LinearGradient>
                  </Box>


                  </PresenceTransition>
                }
                </LinearGradient>
                  </Box>
                  </Box>
                }
                { teamNames.length <= 0 &&
                <Text style={{marginBottom: 10, color: '#fff' }}>PLESE READ: You must add players before you can view player stats. Tap 'Home' and then 'New Game' to add a team and then players.</Text>
              }

                  </View>
                </HStack>
              </Box>

              <ScrollView>

              {playerDataLength > 0 &&
                <IndividualPlayerStatsHome navigation={props.navigation} playerData={playerData} team={oppTeam} teamId={oppTeamId} season={season} seasonId={seasonId} whereFrom={78} />
              }
              </ScrollView>
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
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 10
  },
  linearGradientBg: {
    minWidth: '100%',
  },
})

export default PlayerStatsHome;

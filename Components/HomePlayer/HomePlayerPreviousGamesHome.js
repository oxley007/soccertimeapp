import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';
import { updatePlayerUserData } from '../../Reducers/playerUserData';


import DisplayPrevGames from '../PreviousGames/DisplayPrevGames.js'

const HomePlayerPreviousGamesHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [getPrevGames, setPrevGames] = useState([]);
  const [oppTeam, setOppTeam] = useState('');
  const [oppTeamId, setOppTeamId] = useState(0);
  const [season, setSeason] = useState('');
  const [seasonId, setSeasonId] = useState(0);
  const [uniqueSeasons, setUniqueSeasons] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let playerUserPlayers = useSelector(state => state.playerUserData.players);
  let playerUserTeams = useSelector(state => state.playerUserData.teams);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);
  let checkSortPlayer = useSelector(state => state.checkSortPlayer.checkSortPlayer);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;


  useEffect(() => {



   //console.log(seasonsDisplay + ' what is seasonsDisplay');
      let seasonYear = 'All Seasons'
      //prevGamesSeason.season = seasonsDisplay
   //console.log(seasonYear + ' what is seasonYear');

   //console.log(JSON.stringify(playerUserDataSeasons) + ' not sure wehat playerUserDataSeasons will display?');
   //console.log(JSON.stringify(playerUserDataSeasons.seasons) + ' not sure wehat playerUserDataSeasons.seasons will display?');
   //console.log(JSON.stringify(playerUserDataSeasons.seasons.id) + ' not sure wehat playerUserDataSeasons.seasons.id will display?');
   //console.log(playerUserDataSeasonsDisplay + ' not sure wehat playerUserDataSeasonsDisplay will display?');


      const seasonIndex = playerUserDataSeasons.seasons.findIndex(x => x.id === playerUserDataSeasonsDisplayId);
      //seasonIndex--

      let valueInt = 0
      try {
     //console.log(JSON.stringify(playerUserDataSeasons.seasons[seasonIndex].id) + ' not sure wehat playerUserDataSeasons.seasons[seasonIndex].id will display?');
     //console.log(JSON.stringify(playerUserDataSeasons.seasons[seasonIndex].season) + ' not sure wehat playerUserDataSeasons.seasons[seasonIndex].season will display?');
        valueInt = playerUserDataSeasons.seasons[seasonIndex].id
        seasonYear = playerUserDataSeasons.seasons[seasonIndex].season
        //prevGamesSeason.id = playerUserDataSeasons[seasonIndex].id
      }
      catch {
        valueInt = 0
      }
   //console.log(seasonYear + ' last check seasonYear');
   //console.log(valueInt + ' last check valueInt');
      setSeason(seasonYear)
      setSeasonId(valueInt)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))

   //console.log(props.route.params.whereFrom + ' props.route.params.whereFrom');

      if (props.route.params.whereFrom === 183 || props.route.params.whereFrom === 181) {

     //console.log(JSON.stringify(props.route.params.teamGameData) + ' props.route.params.teamGameData');

      const teamSeasons = props.route.params.teamGameData

      let teamDataSeasons = []
      teamSeasons.map(game => {
     //console.log(JSON.stringify(game) +' check game here..');
      //console.log(JSON.stringify(game.game.season) +' check game.season here..');
      //console.log(JSON.stringify(game.game.season.id) +' check game.season.id here..');

        //if (stat.gameId !== 184) {
        try {
            teamDataSeasons.push({seasonId: game.game.season.id, season: game.game.season.season})
          }
          catch {
            // do nothing in case there is no season.
          }
        //}
        //else {
        //  playerDataStatsSeasons.push({seasonId: 2, season: '2024'})
        //}


      })

   //console.log(JSON.stringify(teamDataSeasons) + ' teamDataSeasons');

      //const uniquePlayerDataStatsSeasons = [...new Set(playerDataStatsSeasons.map(item => item.seasonId))]; // [ 'A', 'B']

      const key = 'seasonId';
      const uniqueTeamDataSeasons = [...new Map(teamDataSeasons.map(item => [item[key], item])).values()];

   //console.log(JSON.stringify(uniqueTeamDataSeasons) + ' c');

      setUniqueSeasons(uniqueTeamDataSeasons)
    }

  },[playerUserDataSeasonsDisplay, seasonId, season, checkSortPlayer])

  const addSeasonSelect = (value: string) => {

    if (value === 'new') {
      navigate('AddSeasonHome');
    }
    else {

      let valueInt = Number(value)
      const seasonIndex = playerUserDataSeasons.seasons.findIndex(x => x.id === valueInt);
      const seasonName = playerUserDataSeasons.seasons[seasonIndex].season
      const seasonId = playerUserDataSeasons.seasons[seasonIndex].id
      //prevGamesSeason.season = seasonName
      //prevGamesSeason.id = seasonId
      setSeason(seasonName)
      setSeasonId(valueInt)

      dispatch(updatePlayerUserData(
      playerUserTeams,
      playerUserPlayers,
      playerUserDataSeasons,
      seasonName,
      seasonId))

      userRef.doc('playerUserData').update({
        teams: playerUserTeams,
        players: playerUserPlayers,
        seasons: playerUserDataSeasons,
        seasonsDisplay: seasonName,
        seasonsDisplayId: seasonId
        })
        .catch(error => this.setState({ errorMessage: error.message }))

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

    dispatch(updatePlayerUserData(
    playerUserTeams,
    playerUserPlayers,
    playerUserDataSeasons,
    valueInt,
    0))

    userRef.doc('playerUserData').update({
      teams: playerUserTeams,
      players: playerUserPlayers,
      seasons: playerUserDataSeasons,
      seasonsDisplay: valueInt,
      seasonsDisplayId: 0
      })
      .catch(error => this.setState({ errorMessage: error.message }))

  }

  /*
  useEffect(() => {

 //console.log('hitting here no?');
      dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))

  },[prevGamesTeam.id, prevGamesSeason.id])
  */

  const addGameTimeSelect = (value: string) => {



      let valueInt = Number(value)
      const teamNamesAway = props.route.params.awayTeams
      const teamIndex = teamNamesAway.findIndex(x => x.id === valueInt);
      const teamName = teamNamesAway[teamIndex].teamName
      const teamNameShort = teamNamesAway[teamIndex].teamNameShort
      const teamAwayId = teamNamesAway[teamIndex].id
      //prevGamesTeam.teamName = teamName
      //prevGamesTeam.teamNameShort = teamNameShort
      //prevGamesTeam.id = teamAwayId
      setOppTeam(teamName)
      setOppTeamId(valueInt)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
      setIsOpen(false)

  }

  const changeTime = () => {

    const valueInt = ''
    //prevGamesTeam.teamName = ''
    //prevGamesTeam.teamNameShort = ''
    //prevGamesTeam.id = 99999998
    setOppTeam(valueInt)
    setOppTeamId(0)
    //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))

  }

  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
  }

  const continueSetup = () => {

      navigate('HomePlayerTeamsList');

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

                  <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 10, paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
                    View Previous Games
                  </Heading>
                  </LinearGradient>
                  </Box>
                  <Text style={{marginBottom: 10, color: '#fff' }}>Select your Team and Season to view game events (goals, saves, assists, etc) and player game-times</Text>
                  <Box bg="tertiary.100" style={{zIndex: 3, elevation: 3, marginBottom: 10}}>

                  {isOpen === false &&
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHide}>
                    <Button style={{justifyContent: 'flex-start'}} variant="unstyled" onPress={() => setOpenStatus(true)}>
                      <HStack>
                        {isOpen ? minusIcon : plusIcon}
                        <Center>
                          <Text style={{color: '#fff', fontSize: 16, textAlign: 'left', paddingLeft: 5}}>SHOW SEASON FILTER</Text>
                          </Center>
                      </HStack>
                    </Button>
                    </LinearGradient>
                  }
                  {isOpen === true &&
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHide}>
                    <Button variant="unstyled" onPress={() => setOpenStatus(false)}>
                    <HStack>
                      {isOpen ? minusIcon : plusIcon}
                      <Center pl="2">
                        <Text style={{color: '#fff', fontSize: 20}}>HIDE SEASON FILTER</Text>
                      </Center>
                    </HStack>
                    </Button>
                    </LinearGradient>
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
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradientHideDisplay}>
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

                      {uniqueSeasons !== "" ? (
                          uniqueSeasons.map(item => {
                              return <Select.Item label={item.season} value={item.seasonId} />;
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
                  </PresenceTransition>
                }
                  </Box>

                  </View>
                </HStack>
              </Box>
              <ScrollView>
                <Text style={{color: 'transparent', fontSize: 0, lineHeight: 0}}>{seasonId}</Text>
                <Text style={{color: 'transparent', fontSize: 0, lineHeight: 0}}>{oppTeamId}</Text>
                {seasonId > 0 &&
                  <DisplayPrevGames navigation={props.navigation} teamId={oppTeamId} whereFrom={props.route.params.whereFrom} teamGameData={props.route.params.teamGameData}/>
                }
              </ScrollView>
            </Container>
            <Box minW="100%" safeAreaTop alignSelf="center" mt="5" mb="10" style={{paddingTop: 0, paddingBottom: 50, paddingLeft: 20, paddingRight: 20}}>
              <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} >
                <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
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
})

export default HomePlayerPreviousGamesHome;

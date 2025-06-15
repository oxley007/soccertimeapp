import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';
import { updateSeasons } from '../../Reducers/seasons';

//import DisplayPlayerStats from './DisplayPlayerStats.js'
import IndividualPlayerStatsHome from '../PlayerStats/IndividualPlayerStatsHome.js'

const HomePlayerStatsHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [getPrevGames, setPrevGames] = useState([]);
  const [oppTeam, setOppTeam] = useState('');
  const [oppTeamId, setOppTeamId] = useState(0);
  const [season, setSeason] = useState('');
  const [seasonId, setSeasonId] = useState(0);
  const [selctedPlayer, setSelctedPlayer] = useState('');
  const [selctedPlayerId, setSelctedPlayerId] = useState(0);
  const [playerData, setPlayerData] = useState([]);
  const [playerDataLength, setPlayerDataLength] = useState(0);
  const [uniqueSeasons, setUniqueSeasons] = useState([]);
  const [selectedUniqueSeason, setSelectedUniqueSeason] = useState('');
  const [selectedUniqueSeasonId, setSelectedUniqueSeasonId] = useState(0);



  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;


  useEffect(() => {

 //console.log(JSON.stringify(playerData) + ' wtf playerData');

    const playerDataLengthRaw = playerData.id

 //console.log(playerDataLengthRaw + ' playerDataLengthRaw here');

      setPlayerDataLength(playerDataLengthRaw)

   //console.log(JSON.stringify(props.route.params.playerData) + ' check props.route.params.playerData');
   //console.log(JSON.stringify(props.route.params.playerData.stats) + ' check props.route.params.playerData.stats');

      const playerDataStats = props.route.params.playerData.stats

      let playerDataStatsSeasons = []
      try {
        playerDataStats.map(stat => {


          let seasonName = ''
          if (stat.seasonName === undefined) {
            seasonName = '2023'
          }
          else {
            seasonName = stat.seasonName
          }

          //if (stat.gameId !== 184) {
              playerDataStatsSeasons.push({seasonId: stat.season, season: seasonName})
          //}
          //else {
          //  playerDataStatsSeasons.push({seasonId: 2, season: '2024'})
          //}


        })
      }
      catch {
        console.log('hotiing on he and i shoundt.');
      }

   //console.log(JSON.stringify(playerDataStatsSeasons) + ' playerDataStatsSeasons');

      //const uniquePlayerDataStatsSeasons = [...new Set(playerDataStatsSeasons.map(item => item.seasonId))]; // [ 'A', 'B']

      const key = 'seasonId';
      const uniquePlayerDataStatsSeasons = [...new Map(playerDataStatsSeasons.map(item => [item[key], item])).values()];

   //console.log(JSON.stringify(uniquePlayerDataStatsSeasons) + ' uniquePlayerDataStatsSeasons');

      setUniqueSeasons(uniquePlayerDataStatsSeasons)

  },[playerData.length])


  useEffect(() => {


   //console.log(playerUserDataSeasonsDisplay + ' what is playerUserDataSeasonsDisplay');
      const seasonYear = playerUserDataSeasonsDisplay
      //prevGamesSeason.season = seasonsDisplay
   //console.log(seasonYear + ' what is seasonYear');

      const seasonIndex = playerUserDataSeasons.seasons.findIndex(x => x.season === playerUserDataSeasonsDisplay);
      let valueInt = 0
      try {
      valueInt = playerUserDataSeasons.seasons[seasonIndex].id
      //prevGamesSeason.id = playerUserDataSeasons.seasons[seasonIndex].id
      }
      catch {
        valueInt = 0
      }
      setSeason(seasonYear)
      setSeasonId(valueInt)
      setSelectedUniqueSeason(seasonYear)
      setSelectedUniqueSeasonId(valueInt)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))


  },[playerUserDataSeasonsDisplay])


  const addSeasonSelect = (value: string, ) => {

    if (value === 'new') {
      navigate('AddSeasonHome');
    }
    else {

      let valueInt = Number(value)
      //const seasonIndex = playerUserDataSeasons.seasons.findIndex(x => x.id === valueInt);
      //const seasonName = playerUserDataSeasons.seasons[seasonIndex].season
      //const seasonId = playerUserDataSeasons.seasons[seasonIndex].id

      const uniqueSeasonIndex = uniqueSeasons.findIndex(x => x.seasonId === valueInt);
      const seasonName = uniqueSeasons[uniqueSeasonIndex].season
      const seasonId = uniqueSeasons[uniqueSeasonIndex].seasonId

   //console.log(seasonName + ' seasonName what is?');
      dispatch(updateSeasons(seasons, seasonName, seasonId))

      //let seasons = useSelector(state => state.seasons.seasons);
      //let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);

      //prevGamesSeason.season = seasonName
      //prevGamesSeason.id = seasonId
   //console.log(seasonName + ' label is?');
      setSeason(seasonName)
      setSeasonId(seasonId)
      setSelectedUniqueSeason(seasonName)
      setSelectedUniqueSeasonId(seasonId)
      //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
    }
  }

  const changeSeason = () => {

    const valueInt = ''
    //prevGamesSeason.season = ''
    //prevGamesSeason.id= 99999999
    setSeason(valueInt)
    setSeasonId(0)
    setSelectedUniqueSeason(valueInt)
    setSelectedUniqueSeasonId(0)
    //dispatch(updatePrevGames(prevGamesTeam, prevGamesSeason))
    //dispatch(updateSeasons(seasons, ''))
  }


  const continueSetup = () => {

      navigate('HomePlayerPlayersList');

  }

const checkDataTest = () => {

  //need to check if gameFullTime in below.
 console.log(JSON.stringify(props.route.params.teamPosData) + ' props.route.params.teamPosData test')
 console.log(JSON.stringify(props.route.params.teamDocData) + ' props.route.params.teamDocData')
 console.log(props.route.params.whereFrom + ' where from props.route.params.whereFrom?');

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
                    View Player Stats
                  </Heading>
                  </LinearGradient>
                  </Box>
                  <Text style={{marginBottom: 10, color: '#fff'}}>Select your Season to view stats (goals, saves, assists, etc) and player game-times</Text>
                  <Box style={{zIndex: 3, elevation: 3, marginBottom: 10}}>

                  <Box shadow="7">
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']} style={props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradient}>
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
                  </Box>

                  </View>
                </HStack>
              </Box>
              <ScrollView>

              {seasonId > 0 &&
                <View>

                  <IndividualPlayerStatsHome navigation={props.navigation} playerData={props.route.params.playerData} team={props.route.params.team} teamId={props.route.params.teamId} season={selectedUniqueSeason} seasonId={selectedUniqueSeasonId} whereFrom={props.route.params.whereFrom} teamPosData={props.route.params.teamPosData} teamDocData={props.route.params.teamDocData} whereData={'playerData'}/>
                </View>
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
  linearGradientBg: {
    minWidth: '100%',
  },
})

export default HomePlayerStatsHome;

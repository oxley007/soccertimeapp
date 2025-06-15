import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, FlatList, VStack, HStack, Spacer } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const pencilIcon = <Icon name="pencil" size={16} color="#eee" />;

import { updateGames } from '../../Reducers/games';
import { updateGameSetup } from '../../Reducers/gameSetup';

const SelectTeamList = (props)=>{

  const [getTeamId, setGetTeamId] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsFull = useSelector(state => state.seasons.seasons);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let checkSort = useSelector(state => state.checkSort.checkSort);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamType = props.teamType
  const { navigate } = props.navigation;


/*
    useEffect(() => {

      if (checkSort === 0) {
        setGetTeamId(99999999)
      }

    }, [checkSort])
    */


  const editTeam = (item) => {
    navigate('EditTeamName', {
      teamData: item,
      teamType: teamType,
    });
  }

  const addTeam = (id, teamIdCode) => {

    setGetTeamId(id)

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }
    //console.log(JSON.stringify(_games)  + ' check intial _games hmm');
    //console.log(JSON.stringify(_games[0])  + ' check intial _games[0] hmm');

      const teamIndex = teamNames.findIndex(x => x.id === id);

      if (teamType === 1) {
        _games[0].teamNames.awayTeamName = teamNames[teamIndex].teamName
        _games[0].teamNames.awayTeamShortName = teamNames[teamIndex].teamNameShort
        _games[0].teamNames.awayTeamId = teamNames[teamIndex].id
      }
      else {

        _games[0].teamId = id
        _games[0].teamIdCode = teamIdCode
        _games[0].teamPlayers = []
        _games[0].teamNames.homeTeamName = teamNames[teamIndex].teamName
        _games[0].teamNames.homeTeamShortName = teamNames[teamIndex].teamNameShort
        _games[0].teamNames.homeTeamId = teamNames[teamIndex].id
        _games[0].grade = teamNames[teamIndex].grade

        let currentSeason = ''
        let currentSeasonsDisplayId = 99999998
        if (seasonsDisplay === '') {
          currentSeason = ''
          currentSeasonsDisplayId = 99999998
        }
        else {
          currentSeason = seasonsDisplay
          currentSeasonsDisplayId = seasonsDisplayId
        }

        _games[0].season.season = currentSeason
        _games[0].season.id = currentSeasonsDisplayId

      /*
      teamPlayers.map(player => {
        if (player.teamId === _games[0].teamId && player.delete !== true)
          _games[0].teamPlayers.push({id: player.id, playerId: player.playerId, teamId: player.teamId, teamIdCode: player.teamIdCode, playerName: player.playerName, currentPosition: 'sub', postionTimes: {fwd: {}, mid: {}, def: {}, gol: {}, sub: {}}, season: currentSeason, positionDetails: { row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '' }})
      })
      */

      teamPlayers.forEach(player => {
        if (player.teamId === _games[0].teamId && player.delete !== true) {
          // Create a new playerPositions object
          const playedPositions = {
            fwd: player.playerPositions?.fwd ?? true,
            mid: player.playerPositions?.mid ?? true,
            def: player.playerPositions?.def ?? true,
            gol: player.playerPositions?.gol ?? true
          };

          _games[0].teamPlayers.push({
            id: player.id,
            playerId: player.playerId,
            teamId: player.teamId,
            teamIdCode: player.teamIdCode,
            playerName: player.playerName,
            currentPosition: 'sub',
            postionTimes: { fwd: {}, mid: {}, def: {}, gol: {}, sub: {} },
            season: currentSeason,
            positionDetails: { row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '' },
            playerPositions: playedPositions
          });
        }
      });


    }

    dispatch(updateGames(_games))

    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb
    /*
    let teamGames = []
    _games.map(game => {
      if (game.teamIdCode === teamIdCodeGames) {
        teamGames.push(game)
      }
    })
    */

 //console.log(teamIdCodeGames + ' teamIdCodeGames');
 //console.log(gameIdDb + ' gameIdDb');


    /*************
    READ ME
    the reason we add games to the team DB here is that no teamm had been selected until this
    stage in the create game process.
    **************/

    /*
    function findUnsupportedFields(obj, path = '') {
      for (const key in obj) {
        const value = obj[key];
        const fullPath = path ? `${path}.${key}` : key;

        if (value === undefined) {
          console.warn(`Unsupported value (undefined) at: ${fullPath}`);
        } else if (typeof value === 'function') {
          console.warn(`Unsupported value (function) at: ${fullPath}`);
        } else if (typeof value === 'object' && value !== null) {
          // Firestore supports only plain objects, not class instances or special types
          const isPlainObject = Object.prototype.toString.call(value) === '[object Object]';
          if (!isPlainObject && !Array.isArray(value)) {
            console.warn(`Unsupported object type at: ${fullPath}`);
          } else {
            findUnsupportedFields(value, fullPath);
          }
        }
      }
    }
    */


    /*
    function removeUndefined(obj) {
      if (Array.isArray(obj)) {
        return obj.map(removeUndefined);
      } else if (typeof obj === 'object' && obj !== null) {
        return Object.entries(obj)
          .filter(([_, v]) => v !== undefined)
          .reduce((acc, [k, v]) => {
            acc[k] = removeUndefined(v);
            return acc;
          }, {});
      }
      return obj;
    }
    */

    async function saveGameData() {
      if (!_games || !_games[0]) {
        console.warn("No game data to save");
        return;
      }

      // Update _games[0] in place or create a new updated copy
      _games[0].aiSubTime = typeof _games[0].aiSubTime === 'number' ? _games[0].aiSubTime : 0;
      _games[0].playersRemainder = typeof _games[0].playersRemainder === 'number' ? _games[0].playersRemainder : 0;

      try {
        await firestore()
          .collection(teamIdCodeGames)
          .doc(gameIdDb)
          .set({ game: _games[0] });  // Save the updated object
      } catch (error) {
        console.error("Firestore write error:", error);
      }
    }

    saveGameData();

    /*
    const cleanData = {
      ..._games[0],
      aiSubTime: typeof _games[0].aiSubTime === 'number' ? _games[0].aiSubTime : 0,
      playersRemainder: typeof _games[0].playersRemainder === 'number' ? _games[0].playersRemainder : 0,
    };

    //findUnsupportedFields(_games[0]);
    //const cleanData = removeUndefined(_games[0]);
    try {
      await firestore()
        .collection(teamIdCodeGames)
        .doc(gameIdDb)
        .set({ game: cleanData });
    } catch (error) {
      console.error("Firestore write error:", error);
    }
    */




  //console.log('Crash check 1');

     const seasonsFullSave = seasonsFull
  //console.log('Crash check 2');
  //console.log(JSON.stringify(seasonsFullSave)  + ' seasonsFullSave check');



      try {
        firestore().collection(teamIdCodeGames).doc('seasons').set({
           seasons: seasonsFullSave,
         })
      } catch (error) {
        console.error("Firestore write error:", error);
      }

   //console.log('Crash check 3');

  }

  const removeTeam = (id) => {

    setGetTeamId(99999999)

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    _games[0].teamId = 99999999
    _games[0].teamIdCode = 99999999

    _games[0].teamPlayers = []

    dispatch(updateGames(_games))

    /*
    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).set({
       game: _games[0],
     })
     */

  }

  const setOpenStatus = (isOpen, id) => {

    setIsOpen(isOpen)

  }

  const getTeams = () => {

    let _teamNames = []
    try {
      _teamNames = [...teamNames]
    }
    catch {
      _teamNames = [{...teamNames}]
    }

    let teamToShow = 0
    _teamNames.map(team => {
      if (team.teamType === teamType) {
        teamToShow++
      }
    })

    //const gamesOutput = JSON.stringify(_games)

      return (
        <Box shadow="7">
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#333', '#333']} style={styles.linearGradient}>
          <Box minW="100%">
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', marginBottom: 2}}>
              Teams
            </Text>
            {teamToShow > 0 &&
          <FlatList data={_teamNames} renderItem={({
            item
            }) =>
            <View>
            {item.id === getTeamId && item.deleted !== true && item.teamType === teamType &&
              <Box borderBottomWidth="1" _dark={{
                borderColor: "muted.50"
              }} borderColor="transparent" py="2" bg="#E879F9" rounded="lg">
                <HStack justifyContent="space-between" pr="2">
                  <Button ml="0" size="xs" variant="unstyled" onPress={() => editTeam(item)}>{pencilIcon}</Button>
                  <Center>
                  <VStack>
                    <Text color="#fff" fontSize="md">
                      {item.teamName}
                    </Text>
                  </VStack>
                  </Center>
                  <Spacer />
                  <Button ml="1"size="md" variant="subtle" bg="white" onPress={() => removeTeam(item.id, item.teamId)}>-</Button>
                </HStack>
              </Box>
            }
            {item.id !== getTeamId && item.deleted !== true && item.teamType === teamType &&
                <Box borderBottomWidth="1" _dark={{
                  borderColor: "muted.50"
                }} borderColor="#eee" py="2">
                  <HStack justifyContent="space-between" pr="2">
                    <Button ml="0" size="xs" variant="unstyled" onPress={() => editTeam(item)}>{pencilIcon}</Button>
                    <Center>
                    <VStack>
                      <Text color="#fff" fontSize="md">
                        {item.teamName}
                      </Text>
                    </VStack>
                    </Center>
                    <Spacer />
                    <Button ml="1" size="md" variant="subtle" bg="#E879F9" stlye={{color: '#fff'}} onPress={() => addTeam(item.id, item.teamId)}><Text style={{color: '#fff', fontSize: 26, paddingTop: 4}}>+</Text></Button>
                  </HStack>
                </Box>
              }
            </View>
        }
          keyExtractor={item => item.id} />
        }
        <View>
        {teamToShow > 0 &&
        <View>
          {isOpen === false &&
            <HStack mt="5">
                  <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(true)}>
                    {isOpen ? '-Hide Deleted Teams' : '+Show Deleted Teams'}
                  </Button>
                  </HStack>
                }
                {isOpen === true &&
                  <Box mt="5">
                  <HStack mb="3">
                        <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: "underline"}} onPress={() => setOpenStatus(false)}>
                          {isOpen ? '-Hide Deleted Teams' : '+Show Deleted Teams'}
                        </Button>
                        </HStack>
                        <HStack>

          <FlatList data={_teamNames} renderItem={({
            item
            }) =>
            <View>
            {item.id === getTeamId && item.deleted === true && item.teamType === teamType &&
              <Box borderBottomWidth="1" _dark={{
                borderColor: "muted.50"
              }} borderColor="transparent" py="2" bg="tertiary.300" rounded="lg">
                <HStack justifyContent="space-between" pr="2">
                  <Button ml="0" size="xs" variant="unstyled" onPress={() => editTeam(item)}>{pencilIcon}</Button>
                  <Center>
                  <VStack>
                    <Text color="#333" fontSize="md">
                      {item.teamName}
                    </Text>
                  </VStack>
                  </Center>
                  <Spacer />
                  <Button ml="1"size="md" variant="subtle" bg="white" onPress={() => removeTeam(item.id, item.teamId)}>-</Button>
                </HStack>
              </Box>
            }
            {item.id !== getTeamId && item.deleted === true && item.teamType === teamType &&
                <Box borderBottomWidth="1" _dark={{
                  borderColor: "muted.50"
                }} borderColor="#eee" py="2">
                  <HStack justifyContent="space-between" pr="2">
                    <Button ml="0" size="xs" variant="unstyled" onPress={() => editTeam(item)}>{pencilIcon}</Button>
                    <Center>
                    <VStack>
                      <Text color="#fff" fontSize="md">
                        {item.teamName}
                      </Text>
                    </VStack>
                    </Center>
                    <Spacer />
                    <Button ml="1" size="md" variant="subtle" bg="tertiary.300" onPress={() => addTeam(item.id, item.teamId)}>+</Button>
                  </HStack>
                </Box>
              }
            </View>
        }
          keyExtractor={item => item.id} />

          </HStack>



          </Box>
        }
        </View>
        }
        </View>
        {teamToShow === 0 &&
        <HStack>
          <Text style={{color: '#fff'}}>No teams added</Text>
        </HStack>
        }

    </Box>
    </LinearGradient>
    </Box>
      )
    }

        return (
          <ScrollView>
              {getTeams()}
          </ScrollView>
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
    width: '100%',
    marginTop: 15
  },
})

export default SelectTeamList;

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

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamType = props.teamType
  const { navigate } = props.navigation;

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
        if (seasonsDisplay === '') {
          currentSeason = ''
        }
        else {
          currentSeason = seasonsDisplay
        }

      teamPlayers.map(player => {
        if (player.teamId === _games[0].teamId)
          _games[0].teamPlayers.push({id: player.id, playerId: player.playerId, teamId: player.teamId, teamIdCode: player.teamIdCode, playerName: player.playerName, currentPosition: 'NA', postionTimes: {fwd: {}, mid: {}, def: {}, gol: {}, sub: {}}, season: currentSeason})
      })
    }

    dispatch(updateGames(_games))

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

    dispatch(updateGames(_games))

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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
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
                    <Button ml="1" size="md" variant="subtle" bg="tertiary.300" onPress={() => addTeam(item.id, item.teamId)}>+</Button>
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
                  <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: true}} onPress={() => setOpenStatus(true)}>
                    {isOpen ? '-Hide Deleted Teams' : '+Show Deleted Teams'}
                  </Button>
                  </HStack>
                }
                {isOpen === true &&
                  <Box mt="5">
                  <HStack mb="3">
                        <Button p="0" variant="unstyled" _text={{color: '#fff', textDecorationLine: true}} onPress={() => setOpenStatus(false)}>
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

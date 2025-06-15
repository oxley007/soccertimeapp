import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon, FlatList } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updatePrevGames } from '../../Reducers/prevGames';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const DisplayPlayerStats = (props)=>{

  const [getPrevGames, setPrevGames] = useState([]);

  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  const { navigate } = props.navigation;

  const playerId = props.playerId;



  useEffect(() => {

    //console.log(prevGamesSeason.id + ' prevGamesSeason.id change?');
    //console.log(prevGamesTeam.id + ' prevGamesTeam.id change?');
    //console.log(prevGamesSeason.season + ' what is prevGamesSeason.season prev');
      const seasonYear = prevGamesSeason.season
      const seasonId = prevGamesSeason.id
      const teamName = prevGamesTeam.teamName
      const teamNameShort = prevGamesTeam.teamNameShort
      const teamId = prevGamesTeam.id
    //console.log(seasonYear + ' what is seasonYear prev');
    //console.log(seasonId + ' what is seasonId prev');

      let displayGames = []
      games.map(game => {
        if ((game.season.id === seasonId && game.teamNames.homeTeamId === teamId && game.halfTime === 5) || (game.season.season === 'all' && game.teamNames.homeTeamId === teamId && game.halfTime === 5) ) {
          displayGames.push(game)
        }
        else {
          //do nothing
        }
      })

      setPrevGames(displayGames)

  },[prevGamesTeam.id, prevGamesSeason.id])

  const viewPrevGame = (item) => {
    navigate('PrevGamesEventsHome',{
      gameData: item,
      whereFrom: 77,
    });
  }

  return (
    <Box>
    <Text>Hi! {prevGamesTeam.id} + {prevGamesSeason.id}</Text>
    <Text>{playerId}</Text>
    <FlatList style={{paddingBottom: 200}} extraData={getPrevGames} data={getPrevGames} mt="3" renderItem={({
      item, index
      }) =>
    <Box shadow="7" style={{borderBottomColor: '#333', borderBottomWidth: 1}}>
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradient}>

    <Center>
    <Box mt="0" pt="1" pb="3" minW="100%">
      <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
    </Box>
    <HStack pt="2">
    <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
      {item.teamNames.homeTeamName}
    </Text>
    </HStack>
    <HStack>
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      vs
    </Text>
    </HStack>
    <HStack mb="2">
    <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
      {item.teamNames.awayTeamName}
    </Text>
    </HStack>

    </Center>
    <Box mt="0" pt="1" pb="3" minW="100%">
      <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
    </Box>
    <Center>
    <Text style={{fontSize: 16, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, marginBottom: 5}}>
      12/03/23  |  Game ID: {item.id}
    </Text>

    <Box mt="0" pt="1" pb="3" minW="100%">
      <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
    </Box>
    <Box bg="#fff" style={{borderRadius: 5}} pt="3" pb="3" pl="5" pr="5" mt="2">
    <Text style={{fontSize: 20, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 30}}>
      {item.teamNames.homeTeamShortName}
      <Center>
      <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
        <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
         {item.score.homeTeam}
        </Text>
      </Box>
      </Center>
       vs
       <Center>
       <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
         <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
          {item.score.awayTeam}
         </Text>
       </Box>
       </Center> {item.teamNames.awayTeamShortName}
    </Text>
    </Box>
    <Button minW="100%" bg="tertiary.400" mt="5"  size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => viewPrevGame(item)}>View Game Details</Button>
    </Center>

    </LinearGradient>
    </ImageBackground>
    </Box>
    }
    keyExtractor={item => item.id} />
    </Box>
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
    minWidth: '100%',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
})

export default DisplayPlayerStats;

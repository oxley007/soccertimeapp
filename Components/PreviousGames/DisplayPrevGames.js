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

const DisplayPrevGames = (props)=>{

  const [getPrevGames, setPrevGames] = useState([]);

  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
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


  const { navigate } = props.navigation;



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
   //console.log(props.whereFrom + ' props.whereFrom where?');
      if (props.whereFrom === 181 || props.whereFrom === 182 || props.whereFrom === 183) {
     //console.log(JSON.stringify(displayGames) + ' displayGames is here 1');
        displayGames = props.teamGameData
      }
      else {
        games.map(game => {
          if ((game.season.id === seasonId && game.teamNames.homeTeamId === teamId && game.halfTime === 5) || (game.season.season === 'all' && game.teamNames.homeTeamId === teamId && game.halfTime === 5) ) {
            displayGames.push(game)
          }
          else {
            //do nothing
          }
        })
      }

   //console.log(JSON.stringify(displayGames) + ' displayGames check here 1');

      setPrevGames(displayGames)

  },[prevGamesTeam.id, prevGamesSeason.id])

  const checkData = (item) => {
 //console.log(JSON.stringify(item) + ' checking itme here 1');
  }

  const viewPrevGame = (item) => {

    let whereFormPassOn = 77
    if (props.whereFrom === 181) {
      whereFormPassOn = 181
    }
    else if (props.whereFrom === 182) {
      whereFormPassOn = 182
    }
    else if (props.whereFrom === 183) {
      whereFormPassOn = 183
    }
    else if (props.whereFrom === 55) {
      whereFormPassOn = 55
    }
    else {
      whereFormPassOn = 77
    }

 //console.log(whereFormPassOn + ' what is whereFormPassOn');
 //console.log(whereFormPassOn + ' what is whereFormPassOn');

   if (props.whereFrom === 55) {

       if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
         navigate('PrevGamesEventsHome',{
           gameData: item,
           whereFrom: whereFormPassOn,
         });
     }
     else {
       Alert.alert(
       'Buy Pro!',
       'You need to upgrade to pro to view previous game stats',
       [
         {text: 'View Pro Subscriptions', onPress: () => {

         navigate('Iap');

         }},
         {
           text: 'Cancel',
           onPress: () => console.log('Cancel Pressed'),
           style: 'cancel',
         },
       ],
       {cancelable: false},
     );

     }
   }
   else {

      navigate('PrevGamesEventsHome',{
        gameData: item,
        whereFrom: whereFormPassOn,
      });
    }
  }

  return (
    <Box>
    <FlatList style={{paddingBottom: 200}} extraData={getPrevGames} data={getPrevGames} mt="3" renderItem={({
      item, index
      }) =>
    <Box style={{borderBottomColor: '#333', borderBottomWidth: 1}}>
    {props.whereFrom !== 182 && props.whereFrom !== 183 &&
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>

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
      {item.gameDate}  |  Game ID: {item.id}
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
    <Button minW="100%" bg="#E879F9" mt="5"  size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => viewPrevGame(item)}>View Game Details</Button>
    </Center>

    </LinearGradient>
    </ImageBackground>
  }
  <Box>
  {props.whereFrom === 182 &&
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>

    <Center>
    <Box mt="0" pt="1" pb="3" minW="100%">
      <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
    </Box>
    <HStack pt="2">
    <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
      {item.gameIds[0].gameData.homeTeamName}
    </Text>
    </HStack>
    <HStack>
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      vs
    </Text>
    </HStack>
    <HStack mb="2">
    <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
      {item.gameIds[0].gameData.awayTeamName}
    </Text>
    </HStack>

    </Center>
    <Box mt="0" pt="1" pb="3" minW="100%">
      <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
    </Box>
    <Center>
    <Text style={{fontSize: 16, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, marginBottom: 5}}>
      {item.gameDate}  |  Game ID: {item.id}
    </Text>

    <Box mt="0" pt="1" pb="3" minW="100%">
      <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
    </Box>
    <Box bg="#fff" style={{borderRadius: 5}} pt="3" pb="3" pl="5" pr="5" mt="2">
    <Text style={{fontSize: 20, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 30}}>
      {item.gameIds[0].gameData.homeTeamShort}
      <Center>
      <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
        <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
         {item.gameIds[0].gameData.homeTeamScore}
        </Text>
      </Box>
      </Center>
       vs
       <Center>
       <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
         <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
          {item.gameIds[0].gameData.awayTeamScore}
         </Text>
       </Box>
       </Center> {item.gameIds[0].gameData.awayTeamShort}
    </Text>
    </Box>
    <Button minW="100%" bg="#E879F9" mt="5"  size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => viewPrevGame(item)}>View Game Details</Button>
    </Center>

    </LinearGradient>
    </ImageBackground>
    }
    </Box>
    <Box>
    {props.whereFrom === 183 &&
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>

      <Center>
      {checkData(item)}
      <Box mt="0" pt="1" pb="3" minW="100%">
        <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
      </Box>
      <HStack pt="2">
      <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
        {item.game.teamNames.homeTeamName}
      </Text>
      </HStack>
      <HStack>
      <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
        vs
      </Text>
      </HStack>
      <HStack mb="2">
      <Text style={{fontSize: 26, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 28}}>
        {item.game.teamNames.awayTeamName}
      </Text>
      </HStack>

      </Center>
      <Box mt="0" pt="1" pb="3" minW="100%">
        <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
      </Box>
      <Center>
      <Text style={{fontSize: 16, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, marginBottom: 5}}>
        {item.game.gameDate}  |  Game ID: {item.game.id}
      </Text>

      <Box mt="0" pt="1" pb="3" minW="100%">
        <View  style={{borderBottomColor: "#ccc", borderBottomWidth: 1}} />
      </Box>
      <Box bg="#fff" style={{borderRadius: 5}} pt="3" pb="3" pl="5" pr="5" mt="2">
      <Text style={{fontSize: 20, color: '#333', fontWeight: '400', textAlign: 'left', paddingBottom: 3, lineHeight: 30}}>
        {item.game.teamNames.homeTeamShortName}
        <Center>
        <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
          <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
           {item.game.score.homeTeam}
          </Text>
        </Box>
        </Center>
         vs
         <Center>
         <Box bg="#a855f7" style={{borderRadius: 5}} ml="2" mr="2" pt="0" pb="0" pl="1" pr="1" maxW="10">
           <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', paddingBottom: 3, textAlign: 'center', minWidth: 20}}>
            {item.game.score.awayTeam}
           </Text>
         </Box>
         </Center> {item.game.teamNames.awayTeamShortName}
      </Text>
      </Box>
      <Button minW="100%" bg="#E879F9" mt="5"  size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => viewPrevGame(item)}>View Game Details</Button>
      </Center>

      </LinearGradient>
      </ImageBackground>
      }
      </Box>
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

export default DisplayPrevGames;

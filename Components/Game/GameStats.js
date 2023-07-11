import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

import GameStatsLive from '../Stats/GameStatsLive'
import StatsBoard from '../Stats/StatsBoard'

const GameStats = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData
  //const { navigate } = props.navigation;

        return (
          <View>
          <Center>
            <HStack>
              <StatsBoard statsPlayerId={playerData.id}/>
            </HStack>
            </Center>
            </View>

        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default GameStats;

/*
<HStack>
<Box alignSelf="center" mt="3" ml="3">
  <Button bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Goals: {playerData.gameStats[0].gol}</Text></Button>
</Box>
<Box alignSelf="center" mt="3" ml="3">
  <Button bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Assists: {playerData.gameStats[0].asst}</Text></Button>
</Box>
</HStack>

<HStack>
  <Box alignSelf="center" mt="3" ml="3">
    <Button  bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Def. Tackle/Save: {playerData.gameStats[0].asst}</Text></Button>
  </Box>
  <Box mt="3" ml="3" >
    <Button bg="cyan.400" size="md"><Text style={{color: '#fff', fontSize: 16}}>Goalie Save: {playerData.gameStats[0].gol}</Text></Button>
  </Box>
</HStack>
*/

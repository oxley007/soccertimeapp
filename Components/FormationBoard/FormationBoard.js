import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

const FormationBoard = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const checkPlayersFlag = () => {

    let checkPlayersFlag = false
    games[0].teamPlayers.map(player => {
      //console.log(player.currentPosition + ' cehck each player.currentPosition.');
      if (player.currentPosition !== 'NA' || player.currentPosition === undefined) {
        //console.log('getting hit why?');
        checkPlayersFlag = true
      }
    })

    //console.log(checkPlayersFlag + ' check checkPlayersFlag bfore condition.');

    if (checkPlayersFlag === false) {
      return (
        <Box minW="10%" alignSelf="center" bg="fuchsia.200" pl="5" pr="5" pt="2" pb="2" ml="1" mr="1" shadow="9" rounded="md">
          <Text style={{textAlign: 'center'}}>No players added to a position. Select player position from the list below.</Text>
        </Box>
      )
    }

  }

  const checkGolformation = () => {


    try {
    let displayReturn = games[0].teamPlayers.map(player => {
      if (player.currentPosition === 'gol') {
        const playerInitials = player.playerName.match(/\b(\w)/g);
        return (
          <Box minW="10%" alignSelf="center" bg="fuchsia.200" ml="1" mr="1" shadow="9" rounded="md">
            <Text style={{textAlign: 'center'}}>{playerInitials}</Text>
          </Box>
        )
      }
    })

    return displayReturn
  }
  catch {
    // return nothing.
  }

  }

  const checkMidFormation = () => {

    try {
    let displayReturn = games[0].teamPlayers.map(player => {
      if (player.currentPosition === 'mid') {
        const playerInitials = player.playerName.match(/\b(\w)/g);
        return (
          <Box minW="10%" alignSelf="center" bg="yellow.100" ml="1" mr="1" shadow="9" rounded="md">
            <Text style={{textAlign: 'center'}}>{playerInitials}</Text>
          </Box>
        )
      }
    })

    return displayReturn
  }
  catch {
    // return nothing.
  }

  }

  const checkDefFormation = () => {

    try {
    let displayReturn = games[0].teamPlayers.map(player => {
      if (player.currentPosition === 'def') {
        const playerInitials = player.playerName.match(/\b(\w)/g);
        return (
          <Box minW="10%" alignSelf="center" bg="warning.200" ml="1" mr="1" shadow="9" rounded="md">
            <Text style={{textAlign: 'center'}}>{playerInitials}</Text>
          </Box>
        )
      }
    })

    return displayReturn
  }
  catch {
    // return nothing.
  }

  }

  const checkFwdFormation = () => {

    try {
    let displayReturn = games[0].teamPlayers.map(player => {
      if (player.currentPosition === 'fwd') {
        const playerInitials = player.playerName.match(/\b(\w)/g);
        return (
          <Box bg="primary.100" minW="10%" alignSelf="center" ml="1" mr="1" shadow="9" rounded="md">
            <Text style={{textAlign: 'center'}}>{playerInitials}</Text>
          </Box>
        )
      }
    })

    return displayReturn
  }
  catch {
    // return nothing.
  }

  }

  const checkSubFormation = () => {

    try {
    let displayReturn = games[0].teamPlayers.map(player => {
      if (player.currentPosition === 'sub') {
        const playerInitials = player.playerName.match(/\b(\w)/g);
        return (
          <Box bg="emerald.200" minW="28%"alignSelf="center" mt="3" pl="2" pr="2" shadow="9" rounded="md">
            <Text style={{textAlign: 'center'}}>{playerInitials}</Text>
          </Box>
        )
      }
    })

    return displayReturn
  }
  catch {
    // return nothing.
  }

  }


        return (
          <Box maxW="100%" minW="100%" style={{top: 0}} p="0" m="0" rounded="md">
            <ImageBackground source={require(`../../assets/soccerFeild.png`)} resizeMode="stretch" imageStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} style={styles.backgroundImage}>
              <HStack>
                <VStack minW="16%" maxW="16%" mt="1">
                  {checkSubFormation()}
                </VStack>
                <VStack>
                  <Center minW='100%'>
                    <HStack p="0" pr="18%" mt="3">
                      {checkGolformation()}
                    </HStack>
                  </Center>
                  <Center minW='100%'>
                    <HStack p="0" pr="18%" mt="9">
                      {checkDefFormation()}
                      {checkPlayersFlag()}
                    </HStack>
                  </Center>
                  <Center minW='100%'>
                    <HStack MinW='100%' p="0" pr="18%" mt="9">
                      {checkMidFormation()}
                    </HStack>
                  </Center>
                  <Center minW='100%'>
                    <HStack MinW='100%' p="0" pr="18%" mt="9">
                      {checkFwdFormation()}
                    </HStack>
                  </Center>
                </VStack>
              </HStack>
          </ImageBackground>
        </Box>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    //justifyContent: 'center',
    maxWidth: '100%',
    height: 250,
    paddingTop: 10,
    //borderBottomLeftRadius: 55,
    //borderBottomRightRadius: 55,
    //borderRadius: 55
  },
})

export default FormationBoard;

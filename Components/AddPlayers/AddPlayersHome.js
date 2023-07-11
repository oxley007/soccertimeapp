import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;

import { updateGames } from '../../Reducers/games';

import InputPlayerName from './InputPlayerName.js'
import SelectPlayerList from './SelectPlayerList.js'
import FormationBoard from '../FormationBoard/FormationBoard.js'

const AddPlayersHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamId = props.route.params.teamId
  const teamIdCode = props.route.params.teamIdCode
  const whereFrom = props.route.params.whereFrom

  const { navigate } = props.navigation;

  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
  }

  const continueSetup = () => {

    let naCount = 0
    games[0].teamPlayers.map(player => {
      if (player.delete === true ) {
          // do nothing.
      }
      else if (player.currentPosition === 'NA') {
        naCount = naCount + 1
      }
      else if (player.currentPosition === 'fwd') {
        //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
        //console.log(JSON.stringify(player.postionTimes.fwd) + ' what is player.postionTimes[0].fwd');
        player.postionTimes.fwd = [{st: 0, fin: 99999999}]
      }
      else if (player.currentPosition === 'mid') {
        //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
        //console.log(JSON.stringify(player.postionTimes.mid) + ' what is player.postionTimes[0].mid');
        player.postionTimes.mid = [{st: 0, fin: 99999999}]
      }
      else if (player.currentPosition === 'def') {
        //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
        //console.log(JSON.stringify(player.postionTimes.def) + ' what is player.postionTimes[0].def');
        player.postionTimes.def = [{st: 0, fin: 99999999}]
      }
      else if (player.currentPosition === 'gol') {
        //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
        //console.log(JSON.stringify(player.postionTimes.gol) + ' what is player.postionTimes[0].gol');
        player.postionTimes.gol = [{st: 0, fin: 99999999}]
      }
      else if (player.currentPosition === 'sub') {
        //console.log(JSON.stringify(player.postionTimes) + ' what is player.postionTimes[0]');
        //console.log(JSON.stringify(player.postionTimes.sub) + ' what is player.postionTimes[0].sub');
        player.postionTimes.sub = [{st: 0, fin: 99999999}]
      }
    })

    if (games[0].season.season !== '') {
        Alert.alert("Please select a season from the 'Select Current Season' dropdown box" )
    }
    else if (naCount === 0) {
      navigate('SetupHome', {
        teamId: games[0].teamId,
        teamIdCode: games[0].teamIdCode
      });
    }
    else {


        Alert.alert("Please add a position for each player, or select 'ABS' if player is absent." )

    }

  }

  const teamType = props.route.params.teamType

        return (
          <Center>
            <Container h="100%" w="100%" maxWidth="100%">
            <Box minW='100%' bg="tertiary.100" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1}}>
            <HStack>

            {isOpen === false &&
              <Button variant="unstyled" onPress={() => setOpenStatus(true)}>
                <HStack>
                  {isOpen ? minusIcon : plusIcon}
                  <Center pl="2">
                    <Text style={{color: '#0891b2', fontSize: 20}}>SHOW FORMATION</Text>
                  </Center>
                </HStack>
              </Button>
            }
            {isOpen === true &&
              <Button variant="unstyled" onPress={() => setOpenStatus(false)}>
              <HStack>
                {isOpen ? minusIcon : plusIcon}
                <Center pl="2">
                  <Text style={{color: '#0891b2', fontSize: 20}}>HIDE FORMATION</Text>
                </Center>
              </HStack>
              </Button>

            }
            </HStack>
            </Box>
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
              <Center style={{position:'absolute', left: 0, top: 0, right: 0, height: 'auto', zIndex: 3, elevation: 3 }} bg="tertiary.400" p="0" mt="0" rounded="lg" minW="100%" h="300" shadow="9" _text={{
              color: "white"
            }}>
                <FormationBoard/>
              </Center>
            </PresenceTransition>
            <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
              <Heading mt="2" mb="2">
                Select Your Players
              </Heading>
              <InputPlayerName teamId={teamId} teamIdCode={teamIdCode} />
              <Box mt="3" minW="100%">
                <View  style={{borderBottomColor: "#aaa", borderBottomWidth: 2}} />
              </Box>
              <SelectPlayerList teamId={teamId} teamIdCode={teamIdCode} navigation={props.navigation} whereFrom={7}/>
              <Box mt="0" pt="0" minW="100%">
                <View  style={{borderBottomColor: "#aaa", borderBottomWidth: 2}} />
              </Box>
              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

              <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="10" shadow={6} >
          <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Continue</Button>
                </HStack>
        </Box>
        </View>
            </Container>

          </Center>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default AddPlayersHome;

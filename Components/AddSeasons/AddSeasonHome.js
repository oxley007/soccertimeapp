import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;

import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';

import InputSeason from './InputSeason.js'
import SelectSeasonList from './SelectSeasonList.js'

const AddSeasonHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;

  const setOpenStatus = (isOpen) => {

    setIsOpen(isOpen)
  }

  const continueSetup = () => {

  //console.log(props.route.params.addTeamOnly + ' props.route.params.addTeamOnly um ok.');

    if (props.route.params.whereFrom === 'addTeamSetup') {
      navigate('SelectSeasonHome',
    {
      teamId: props.route.params.teamId,
      teamIdCode: props.route.params.teamIdCode,
      whereFrom: props.route.params.whereFrom
    });
    }
    else {
      navigate('AddPlayersHome',
    {
      whereFrom: 7,
      addTeamOnly: props.route.params.addTeamOnly,
      teamIdCode: games[0].teamIdCode,
      teamId: games[0].teamId,
    });
  }

  }

  //const teamType = props.route.params.teamType

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Container h="100%" w="100%" maxWidth="100%">
              <Box minW='100%' bg="#333" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1}}>
                <HStack>
                  <View style={{paddingRight: '5%', paddingLeft: '5%'}}>

                    <Heading style={{color: '#fff'}} mt="2" mb="2">
                      Select Season
                    </Heading>

                    <InputSeason navigation={props.navigation} whereFrom={props.route.params.whereFrom} teamId={props.route.params.teamId} teamIdCode={props.route.params.teamIdCode} addTeamOnly={props.route.params.addTeamOnly}/>

                    <Box mt="3" minW="100%">
                      <View  style={{borderBottomColor: "#aaa", borderBottomWidth: 2}} />
                    </Box>
                    <Box mt="3" maxH="51%">
                      <SelectSeasonList navigation={props.navigation} />
                    </Box>
                    <Box mt="0" pt="0" minW="100%">
                      <View  style={{borderBottomColor: "#aaa", borderBottomWidth: 2}} />
                    </Box>

                    <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, zIndex: 88}}>
                      <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="10" shadow={6} >
                        <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
                      </HStack>
                    </Box>
                  </View>
                </HStack>
              </Box>

            </Container>
            </LinearGradient>
          </Center>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default AddSeasonHome;

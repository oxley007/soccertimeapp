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

      navigate('AddPlayersHome',
    {
      whereFrom: 7
    });

  }

  //const teamType = props.route.params.teamType

        return (
          <Center>
            <Container h="100%" w="100%" maxWidth="100%">
              <Box minW='100%' bg="tertiary.100" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1}}>
                <HStack>
                  <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
                    <Heading mt="2" mb="2">
                      Select Season
                    </Heading>
                    <InputSeason navigation={props.navigation} />
                    <Box mt="3" minW="100%">
                      <View  style={{borderBottomColor: "#aaa", borderBottomWidth: 2}} />
                    </Box>
                    <SelectSeasonList navigation={props.navigation}/>
                    <Box mt="0" pt="0" minW="100%">
                      <View  style={{borderBottomColor: "#aaa", borderBottomWidth: 2}} />
                    </Box>
                    <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>
                      <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="10" shadow={6} >
                        <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
                      </HStack>
                    </Box>
                  </View>
                </HStack>
              </Box>
            </Container>
          </Center>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default AddSeasonHome;

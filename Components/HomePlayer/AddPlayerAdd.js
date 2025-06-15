import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack, Stack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const plusCircle = <IconAnt name="pluscircleo" size={40} color="#fff" />;
const plusCircleBlack = <IconAnt name="pluscircleo" size={40} color="#000" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;

import * as Animatable from 'react-native-animatable';

import HomePlayerAddPlayer from './HomePlayerAddPlayer.js'
import HomePlayerListPlayers from './HomePlayerListPlayers.js'

import { updateGames } from '../../Reducers/games';
import { updatePlayerUserData } from '../../Reducers/playerUserData';


const AddPlayerAdd = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [collectionNameStore, setCollectionNameStore] = useState('');
  const [errorMessage, setErrorMessage] = useState(0);



  //let games = useSelector(state => state.games.games);
  //let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')
  //const teamRef = firestore().collection('GBHFX6572JL')
  let collectionName = ''

  const { navigate } = props.navigation;

  const teams = useRef();

  useEffect(() => {

    //const teamData = {teamName: ''}
    setGetTeam(props.route.params.teamData)
    setErrorMessage(0)


  }, [])

  useEffect(() => {

    //update

  }, [playerUserDataTeams])

  useEffect(() => {

    //update

  }, [playerUserDataPlayers])


   const previousGames = () => {

     navigate('PreviousGamesHome');

   }

   const continueSetup = () => {

       navigate('AddPlayerHome');

   }


        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Center>
            <Container h="100%" w="100%" maxWidth="100%" pr="5" pl="5">
            <ScrollView>
                <View>

                <Box pt="3">
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(234,51,230,0.8)', 'rgba(147,51,234,0.8)']} style={styles.linearGradient}>
                    <Text style={{color: '#d1fae5', fontSize: 16, }}>If you have a player ID, enter the ID below to access player stats.</Text>
                  </LinearGradient>
                </Box>
                <HomePlayerAddPlayer navigation={navigate} teamData={getTeam} teamDataFull={props.route.params.teamData}/>

                </View>

                {errorMessage === 1 &&
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(234,51,230,0.8)', 'rgba(147,51,234,0.8)']} style={styles.linearGradient}>
                  <Text style={{color: '#d1fae5', fontSize: 16, }}>{getTeam.teamName} Added!</Text>
                </LinearGradient>
              }

              {errorMessage === 3 &&
                <View>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(234,51,230,0.8)', 'rgba(147,51,234,0.8)']} style={styles.linearGradient}>
                  <Text style={{color: '#d1fae5', fontSize: 16, }}>{getTeam.teamName} has already been added to your profile!</Text>
                  <Text style={{color: '#d1fae5', fontSize: 16, }}>If you have a player ID, enter the ID below to access player stats.</Text>
                </LinearGradient>
                <HomePlayerAddPlayer navigation={navigate} teamData={getTeam} teamDataFull={props.route.params.teamData} />

                </View>
              }

            </ScrollView>
              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>
              <Center>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/SoccerTimeLive-logoMain400pxTrans.png')}
                  />
              </Center>
              <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} ml="5" mr="5">
                <Button minW="100%" maxW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
              </HStack>
            </Box>
          </Container>
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
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 25,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  tinyLogo: {
    //width: 400,
    resizeMode: 'contain',
    marginBottom: 10
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      borderRadius: 5,
  },
  linearGradientBg: {
    minWidth: '100%',
  }
})

export default AddPlayerAdd;

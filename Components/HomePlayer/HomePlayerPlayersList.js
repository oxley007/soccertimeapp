import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
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

import HomePlayerListPlayers from './HomePlayerListPlayers.js'


import { updateGames } from '../../Reducers/games';
import { updatePlayerUserData } from '../../Reducers/playerUserData';

const HomePlayerPlayersList = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);

  //let games = useSelector(state => state.games.games);
  //let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;


  useEffect(() => {

 //console.log('is this hit on player add??');
    //update
    //getPlayers()

  }, [playerUserDataPlayers])

   const continueSetup = () => {

       navigate('HomePlayer',{
         playerUserDataLength: playerUserDataTeams.length
       });

   }

   const getTeamsDisplay = () => {

   return (
     <HomePlayerListPlayers navigation={props.navigation} />
   )

   }

   const getMessageDisplay = () => {

     try {
       return (
         <View>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(234,51,230,0.8)', 'rgba(147,51,234,0.8)']} style={styles.linearGradient}>
            <Text style={{color: '#d1fae5', fontSize: 16, }}>{props.route.params.messageDisplay}</Text>
           </LinearGradient>
         </View>
       )
     }
     catch {
       //show nothing.
     }


   }

        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Center>
            <Container maxW="100%" pl="3" pr="3">
            <ScrollView>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientHeading}>
              <Heading mb="2" mt="2" style={{color: '#fff'}}>Select a Player</Heading>
              </LinearGradient>
              {getMessageDisplay()}
              {getTeamsDisplay()}

            </ScrollView>
              <Box minW="100%" maxW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, borderTopColor: '#bbb', borderTopWidth: 1}}>
              <Center pt="2">
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
    marginBottom: 50
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  linearGradientHeading: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 15,
    marginBottom: 5,

  },
})

export default HomePlayerPlayersList;

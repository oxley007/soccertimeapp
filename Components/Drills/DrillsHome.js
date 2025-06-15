import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, ActivityIndicator } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SoccerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const myIcon = <Icon name="rocket" size={30} color="#900" />;
const barChart = <Icon name="bar-chart" size={26} color="#E879F9" />;
const history = <Icon name="history" size={26} color="#E879F9" />;
const plusCircle = <IconAnt name="pluscircleo" size={50} color="#fff" />;
const plus = <IconAnt name="plus" size={30} color="#fff" />;
const users = <Icon name="users" size={15} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const chevronRight = <Icon name="chevron-right" size={20} color="#999" />;
const chevronRightWhite = <Icon name="chevron-right" size={20} color="#fff" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;
const arrowdowncircle = <FeatherIcon name="arrow-down-circle" size={26} color="#fff" />;
const feildIcon = <SoccerIcon name="soccer" size={40} color="#E879F9" />;
const trafficLightIcon = <SoccerIcon name="traffic-light-outline" size={25} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const gateIcon = <SoccerIcon name="gate" size={22} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const peopleIcon = <Ionicons name="people" size={22} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const sharkFinIcon = <SoccerIcon name="shark-fin" size={22} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const exclamationCircleIcon = <IconAnt name="exclamationcircle" size={22} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const bootIcon = <SoccerIcon name="shoe-cleat" size={22} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const snowIcon = <Ionicons name="snow" size={22} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;

import * as Animatable from 'react-native-animatable';

import Purchases from 'react-native-purchases';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateSeasons } from '../../Reducers/seasons';
import { updateIap } from '../../Reducers/iap';
import { updateUserProfile } from '../../Reducers/userProfile';
import { updateCheckSort } from '../../Reducers/checkSort';

const DrillsHome = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [posts, setPosts] = useState();
  const [animateLoading, setAnimateLoading] = useState(false);
  const [hideCircle, setHideCircle] = useState(true);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let seasons = useSelector(state => state.seasons.seasons);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let userProfile = useSelector(state => state.userProfile.userProfile);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  let userRef = null
  try {
  userRef = firestore().collection(currentUser.uid);
  }
  catch {
    //do nothing.
  }
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;

    const teams = useRef();


   const showDrillInstruc = (drillOption) => {

     if (drillOption === 6) {
       if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
         navigate('DrillsInstructions',{
           drillOption: drillOption,
         });
       }
       else {
           Alert.alert(
           'Buy Pro!',
           'You need to upgrade to pro to view this drill',
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

       navigate('DrillsInstructions',{
         drillOption: drillOption,
       });
    }

   }

   const proPage = () => {
     navigate('Iap');
   }

   const proBanner = () => {

     return (
       <Button bg="transparent" p="0" onPress={() => proPage()}>
         <Box bg="#222" mb="0">
           <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', minWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}><Text style={{fontSize: 16, fontWeight: '600'}}>UPGRADE TO PRO</Text></Box>
         </Box>
       </Button>
     )

   }

   const backHome = () => {

     navigate('Home');

   }



        return (
          <Center>
          <LinearGradient colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Container maxW="100%" pl="5" mr="5">
            <ScrollView>
              <Box>
                <Heading mt="5" style={{color: '#fff'}}>Drills & Exercises</Heading>
                <Text style={{color: '#ccc', marginBottom: 5}}>Soccer Drills that are ideal for ages 5 - 14</Text>
              </Box>
              <Box alignItems="center" mt="3" shadow="6">
              <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradient}>
                  <Button minW="100%" size="md" variant="subtle" _text={{
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: '500'
                  }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => showDrillInstruc(0)}>

                  <HStack minW="100%" maxW="100%">
                  <Center>
                    <HStack minW="10%">
                      <VStack>
                        <Center style={{borderRadius: 5, overflow: 'hidden'}}>
                          {trafficLightIcon}
                        </Center>
                      </VStack>
                    </HStack>
                    </Center>
                    <HStack minW="78%">
                      <VStack pl="5">
                        <HStack p="1" pl='0'>
                          <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Red Light / Green Light</Text>
                        </HStack>
                        <HStack p="0.5" pl='0'>
                          <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Ideal for the youngest players</Text>
                        </HStack>
                        <HStack p="0.5" pl='0'>
                          <Text style={{fontSize: 12, fontWeight: '600', color: '#E879F9', lineHeight: 14}}>Core skills: dribbiling</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <HStack minW="10%">
                      <Center>
                        <VStack pt="2">
                          <Center>
                            {chevronRight}
                          </Center>
                        </VStack>
                      </Center>
                    </HStack>
                  </HStack>
                </Button>
              </LinearGradient>
            </ImageBackground>
          </Box>

          <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => showDrillInstruc(1)}>

              <HStack minW="100%" maxW="100%">
              <Center>
                <HStack minW="10%">
                  <VStack>
                    <Center style={{borderRadius: 5, overflow: 'hidden'}}>
                      {gateIcon}
                    </Center>
                  </VStack>
                </HStack>
                </Center>
                <HStack minW="78%" maxW="78%">
                  <VStack pl="5">
                    <HStack p="1" pl='0'>
                      <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Passing Through the Gate</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Ideal for the young players to improve passing</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 12, fontWeight: '600', color: '#E879F9', lineHeight: 14}}>Core skills: passing</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <HStack minW="10%">
                  <Center>
                    <VStack pt="2">
                      <Center>
                        {chevronRight}
                      </Center>
                    </VStack>
                  </Center>
                </HStack>
              </HStack>
            </Button>
          </LinearGradient>
        </ImageBackground>
      </Box>

        <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => showDrillInstruc(2)}>

              <HStack minW="100%" maxW="100%">
              <Center>
                <HStack minW="10%">
                  <VStack>
                    <Center style={{borderRadius: 5, overflow: 'hidden'}}>
                      {peopleIcon}
                    </Center>
                  </VStack>
                </HStack>
                </Center>
                <HStack minW="78%" maxW="78%">
                  <VStack pl="5">
                    <HStack p="1" pl='0'>
                      <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>1v1 Race To The Ball</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Ideal for the young players to improve their shooting and defence</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 12, fontWeight: '600', color: '#E879F9', lineHeight: 14}}>Core skills: shooting, defending</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <HStack minW="10%">
                  <Center>
                    <VStack pt="2">
                      <Center>
                        {chevronRight}
                      </Center>
                    </VStack>
                  </Center>
                </HStack>
              </HStack>
            </Button>
          </LinearGradient>
        </ImageBackground>
      </Box>

      <Box alignItems="center" mt="3" shadow="6">
        <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradient}>
            <Button minW="100%" size="md" variant="subtle" _text={{
              color: "#ffffff",
              fontSize: 25,
              fontWeight: '500'
            }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => showDrillInstruc(3)}>

            <HStack minW="100%" maxW="100%">
            <Center>
              <HStack minW="10%">
                <VStack>
                  <Center style={{borderRadius: 5, overflow: 'hidden'}}>
                    {sharkFinIcon}
                  </Center>
                </VStack>
              </HStack>
              </Center>
              <HStack minW="78%" maxW="78%">
                <VStack pl="5">
                  <HStack p="1" pl='0'>
                    <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Sharks and Minnows</Text>
                  </HStack>
                  <HStack p="0.5" pl='0'>
                    <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Ideal for the young players to dribble away from pressure</Text>
                  </HStack>
                  <HStack p="0.5" pl='0'>
                    <Text style={{fontSize: 12, fontWeight: '600', color: '#E879F9', lineHeight: 14}}>Core skills: dribbling, defending</Text>
                  </HStack>
                </VStack>
              </HStack>
              <HStack minW="10%">
                <Center>
                  <VStack pt="2">
                    <Center>
                      {chevronRight}
                    </Center>
                  </VStack>
                </Center>
              </HStack>
            </HStack>
          </Button>
        </LinearGradient>
      </ImageBackground>
      </Box>

        <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => showDrillInstruc(4)}>

              <HStack minW="100%" maxW="100%">
              <Center>
                <HStack minW="10%">
                  <VStack>
                    <Center style={{borderRadius: 5, overflow: 'hidden'}}>
                      {exclamationCircleIcon}
                    </Center>
                  </VStack>
                </HStack>
                </Center>
                <HStack minW="78%" maxW="78%">
                  <VStack pl="5">
                    <HStack p="1" pl='0'>
                      <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Knockout!</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Ideal for the young players to practice dribbling</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 12, fontWeight: '600', color: '#E879F9', lineHeight: 14}}>Core skills: dribbling</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <HStack minW="10%">
                  <Center>
                    <VStack pt="2">
                      <Center>
                        {chevronRight}
                      </Center>
                    </VStack>
                  </Center>
                </HStack>
              </HStack>
            </Button>
          </LinearGradient>
        </ImageBackground>
        </Box>

        <Box alignItems="center" mt="3" shadow="6">
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradient}>
              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => showDrillInstruc(5)}>

              <HStack minW="100%" maxW="100%">
              <Center>
                <HStack minW="10%">
                  <VStack>
                    <Center style={{borderRadius: 5, overflow: 'hidden'}}>
                      {bootIcon}
                    </Center>
                  </VStack>
                </HStack>
                </Center>
                <HStack minW="78%" maxW="78%">
                  <VStack pl="5">
                    <HStack p="1" pl='0'>
                      <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>4 Goal Shoot</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Ideal for the young players to practice attacking</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 12, fontWeight: '600', color: '#E879F9', lineHeight: 14}}>Core skills: shooting, defending</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <HStack minW="10%">
                  <Center>
                    <VStack pt="2">
                      <Center>
                        {chevronRight}
                      </Center>
                    </VStack>
                  </Center>
                </HStack>
              </HStack>
            </Button>
          </LinearGradient>
        </ImageBackground>
        </Box>

        <Box alignItems="center" mt="3" shadow="6">
          {proBanner()}
          <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImagePro}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradient}>

              <Button minW="100%" size="md" variant="subtle" _text={{
                color: "#ffffff",
                fontSize: 25,
                fontWeight: '500'
              }} style={{justifyContent: 'flex-start'}} bg="transparent" pt="3" pb="3" onPress={() => showDrillInstruc(6)}>
              <HStack minW="100%" maxW="100%">
              <Center>
                <HStack minW="10%">
                  <VStack>
                    <Center style={{borderRadius: 5, overflow: 'hidden'}}>
                      {snowIcon}
                    </Center>
                  </VStack>
                </HStack>
                </Center>
                <HStack minW="78%" maxW="78%">
                  <VStack pl="5">
                    <HStack p="1" pl='0'>
                      <Text style={{fontSize: 16, color: '#fff', fontWeight: '700', lineHeight: 16}}>Soccer Freeze Tag</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 14, color: '#ccc', lineHeight: 14}}>Ideal for coaches to manage low-skilled players with high-skilled players</Text>
                    </HStack>
                    <HStack p="0.5" pl='0'>
                      <Text style={{fontSize: 12, fontWeight: '600', color: '#E879F9', lineHeight: 14}}>Core skills: dribbling, teamwork</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <HStack minW="10%">
                  <Center>
                    <VStack pt="2">
                      <Center>
                        {chevronRight}
                      </Center>
                    </VStack>
                  </Center>
                </HStack>
              </HStack>
            </Button>
          </LinearGradient>
        </ImageBackground>
        </Box>


            </ScrollView>
            <HStack alignItems="center" safeAreaBottom p="0" mt="3" shadow={6} >
              <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => backHome()}>Back to Home</Button>
            </HStack>
          </Container>
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
    paddingLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
  },
  linearGradientLoading: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  statsLogo: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
    //marginBottom: 50
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderRadius: 5,
  },
  backgroundImagePro: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderRadius: 5,
      borderColor: '#E879F9',
      borderWidth: 1
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  activityIndicatorTest: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
  activityIndicator: {
    backgroundColor: '#e879f9',
  },
  activityIndicatorLarge: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  activityIndicatorNone: {
    height: '0%',
  },
  backgroundImageLive: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    height: 150,
    borderRadius: 5,
    borderColor: '#aaa',
    borderWidth: 0.5,
    overflow: 'hidden'
  },
  containerYouTube: {
    //flex: 1,
    //backgroundColor: 'darkblue',
    paddingTop: 15
  },
})

export default DrillsHome;

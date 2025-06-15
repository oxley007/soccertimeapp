import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, KeyboardAvoidingView, Platform } from 'react-native'
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
import { updateIap } from '../../Reducers/iap';


const HomePlayerAddTeam = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [collectionNameStore, setCollectionNameStore] = useState('');
  const [errorMessage, setErrorMessage] = useState(0);
  const [playersCheck, setPlayersCheck] = useState(0);


  //let games = useSelector(state => state.games.games);
  //let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);
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
  //const teamRef = firestore().collection('GBHFX6572JL')
  let collectionName = ''

  const { navigate } = props.navigation;

  const teams = useRef();

  useEffect(() => {

    const teamData = {teamName: ''}
    setGetTeam(teamData)
    setErrorMessage(0)

    let playerAvailable = 0
    try {
    if (playerUserDataPlayers !== undefined || playerUserDataPlayers.length > 0 || playerUserDataPlayers !== []) {
      playerAvailable = 1
    }
  }
  catch {
    //do nothing.
  }
    setPlayersCheck(playerAvailable)

  }, [])

  useEffect(() => {

    //update

  }, [playerUserDataTeams])

  const onLiveCollectionUpdate = (documentSnapshot) => {

 //console.log('hit snapshot.');
 //console.log(documentSnapshot + ' documentSnapshot check.');
    let teamData = []
    let errorMessage = 0
    try {
    const teamName = documentSnapshot.data().teamName;
    const teamId = documentSnapshot.data().teamId;
    //const pro_forever_indiv_snapshot = documentSnapshot.data().pro_forever_indiv;
    //const pro_yearly_indiv_snapshot = documentSnapshot.data().pro_yearly_indiv;
    const pro_yearly_team_snapshot = documentSnapshot.data().pro_yearly_team;
    const pro_forever_team_snapshot = documentSnapshot.data().pro_forever_team;
    //const pro_yearly_player_snapshot = documentSnapshot.data().pro_yearly_player;
    //const pro_forever_player_snapshot = documentSnapshot.data().pro_forever_player;
    //const id = documentSnapshot.data().id;

 //console.log(teamName + ' name');
 //console.log(teamId + ' teamId');
  //console.log(id + ' id');

    teamData = {teamName: teamName, teamId: teamId}
    errorMessage = 1

 //console.log(playerUserDataTeams + ' what is playerUserData.teams here?');
 //console.log(JSON.stringify(playerUserDataTeams) + ' what is JSON playerUserData.teams here?');


 //console.log(JSON.stringify(pro_yearly_indiv) + ' check pro_yearly_indiv');
 //console.log(pro_forever_indiv[0].purchased + ' wht is pro_forever_indiv[0].purchased?');
 //console.log(pro_yearly_indiv[0].purchased + ' wht is pro_yearly_indiv[0].purchased?');

    if (pro_forever_player[0].purchased === false || pro_forever_team[0].purchased === false) {
      let temp_pro_yearly_team = []
      let temp_pro_forever_team = []
      if (pro_yearly_team[0].purchased === false) {
        temp_pro_yearly_team = pro_yearly_team_snapshot
      }
      else {
        temp_pro_yearly_team = pro_yearly_team
      }

      if (pro_forever_team[0].purchased === false) {
        temp_pro_forever_team = pro_forever_team_snapshot
      }
      else {
        temp_pro_forever_team = pro_forever_team
      }

      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, temp_pro_yearly_team, temp_pro_forever_team, pro_yearly_player, pro_forever_player))

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: temp_pro_yearly_team,
          pro_forever_team: temp_pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))

    }

    if (playerUserDataTeams === undefined) {
      playerUserDataTeams = []
      playerUserDataTeams.unshift(teamData)

      dispatch(updatePlayerUserData(playerUserDataTeams, playerUserDataPlayers, playerUserDataSeasons, playerUserDataSeasonsDisplay, playerUserDataSeasonsDisplayId))

      userRef.doc('playerUserData').update({
        teams: playerUserDataTeams,
        players: playerUserDataPlayers,
        seasons: playerUserDataSeasons,
        seasonsDisplay: playerUserDataSeasonsDisplay,
        seasonsDisplayId: playerUserDataSeasonsDisplayId
        })
        .catch(error => this.setState({ errorMessage: error.message }))

    }
    else {

    let teamExists = false
      try {
      playerUserDataTeams.map(team => {
        if (team.teamName === teamName) {
          teamExists = true
          errorMessage = 3
        }
        else {
          //do nothing
        }
      })
    }
    catch {
      teamExists = false
    }

 //console.log(JSON.stringify(playerUserDataTeams) + ' playerUserDataTeams next.' );

    if (teamExists === false) {
   //console.log(JSON.stringify(playerUserDataTeams) + ' playerUserDataTeams');
   //console.log(JSON.stringify(playerUserDataTeams) + ' playerUserData.teams');

      playerUserDataTeams.unshift(teamData)

      dispatch(updatePlayerUserData(playerUserDataTeams, playerUserDataPlayers, playerUserDataSeasons, playerUserDataSeasonsDisplay, playerUserDataSeasonsDisplayId))

      userRef.doc('playerUserData').update({
        teams: playerUserDataTeams,
        players: playerUserDataPlayers,
        seasons: playerUserDataSeasons,
        seasonsDisplay: playerUserDataSeasonsDisplay,
        seasonsDisplayId: playerUserDataSeasonsDisplayId
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }

    }
  }
    catch {
      teamData = {teamName: ''}
      errorMessage = 2
    }


    setGetTeam(teamData)
    setErrorMessage(errorMessage)

  }


   const previousGames = () => {

     navigate('PreviousGamesHome');

   }

   const inputHandler = (text, key)=>{
     const _inputs = [...inputs];
     //const _inputsNew = [...inputsNew];

     const upperCaseText = text.toUpperCase();

     _inputs[key].value = upperCaseText;
     _inputs[key].key = key;
     //_inputsNew[key].value = text;
     //_inputsNew[key].key = key;
     setInputs(_inputs);
     //setInputsNew(_inputsNew);
   }

   const getInputs = () => {
     return (
       <VStack width="100%" alignItems="center" mt="2">
         {inputs.map((input, key)=>(
           <Stack minW="100%" mx="auto" bg="#333" pt="3" pb="3" pl="3">
             <TextInput placeholder={"Team ID"} style={styles.textInputName} placeholderTextColor="#999" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
           </Stack>
         ))}
       </VStack>
     )
   }

   const checkAndAddTeam = () => {

  //console.log('hitting me kno or not? 1');
     const _inputs = [...inputs];
  //console.log(JSON.stringify(_inputs) + ' what do we see with _inputs?');
  //console.log(_inputs.value + ' what do we see with _inputs.value?');
  //console.log(_inputs[0].value + ' what do we see with _inputs[0].value?');
     //const inputValue = _inputs[0].value;
     const inputValue = _inputs[0].value.trim(); // Trim whitespace here
  //console.log(inputValue + ' check inputValue thanks.');

     //const refTeam = firestore().collection('GBHFX6572JL').doc('GBHFX6572JL');
     try {
       const refTeam = firestore().collection(inputValue).doc(inputValue);
       const teams = refTeam.onSnapshot(onLiveCollectionUpdate)
    }
    catch {
      setErrorMessage(2)
    }



   }

   const continueSetup = () => {

     let backToSelectProfileCheck = false
     try {
       backToSelectProfileCheck = props.route.params.backToSelectProfile
     }
     catch {
       backToSelectProfileCheck = false
     }

      if (backToSelectProfileCheck === true) {
        navigate('HomeSelectProfile',{
          playerUserDataLength: playerUserDataTeams.length
        });
      }
      else {
        navigate('HomePlayer',{
          playerUserDataLength: playerUserDataTeams.length
        });
      }



   }


        return (

          <Center>

          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Center>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ flex: 1 }}
              keyboardVerticalOffset={0} // Adjust if you have a header or SafeArea
            >
            <Container w="100%" maxWidth="100%" pr="5" pl="5">
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }} style={{minHeight: 2000}}>
              <Box alignItems="center" mt="5" shadow="6" >
              <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                    Enter Team ID
                  </Text>
                  {getInputs()}
                </LinearGradient>
                </ImageBackground>

          <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

          <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="0" shadow={6} >
      <Button minW="100%" bg="#E879F9" size="md" pt="5" pb="5" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => checkAndAddTeam()}>Submit Team ID</Button>
            </HStack>
    </Box>
    {errorMessage === 0 &&
      <Text style={{color: '#fff'}}>Team ID can be copied from the message sent by your coach or manager. If you can't find the message, please ask your coach/manager to resend.</Text>
    }


                {errorMessage === 2 &&
                  <Text style={{color: '#fff'}}>No team with that Team ID. If possible, please try and copy & paste.</Text>
                }

              </Box>
              {errorMessage === 1 &&
                <View>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  <Text style={{color: '#d1fae5', fontSize: 16, }}>{getTeam.teamName} Added!</Text>
                </LinearGradient>
                <Box pt="3">
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                    <Text style={{color: '#d1fae5', fontSize: 16, }}>If you have a player ID, enter the ID below to access player stats.</Text>
                  </LinearGradient>
                </Box>
                <HomePlayerAddPlayer navigation={navigate} teamData={getTeam} />
                {playersCheck > 0 &&
                  <HomePlayerListPlayers  navigation={navigate} teamData={getTeam} />
                }
                </View>
              }
              {errorMessage === 3 &&
                <View style={{paddingBottom: 500}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.linearGradient}>
                  <Text style={{color: '#d1fae5', fontSize: 16, }}>{getTeam.teamName} has already been added to your profile!</Text>
                  <Text style={{color: '#d1fae5', fontSize: 16, }}>If you have a player ID, enter the ID below to access player stats.</Text>
                </LinearGradient>
                <HomePlayerAddPlayer navigation={navigate} teamData={getTeam} />
                {playersCheck > 0 &&
                  <HomePlayerListPlayers  navigation={navigate} teamData={getTeam} />
                }
                </View>
              }

            </ScrollView>

          </Container>
          </KeyboardAvoidingView>
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="#000"
            safeAreaBottom
          >
            <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} ml="5" mr="5">
              <Button minW="100%" maxW="100%" bg="#fff" size="md" _text={{fontSize: "xl", color: '#000'}} variant="subtle" onPress={() => continueSetup()}>Home</Button>
            </HStack>
          </Box>
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
      overflow: 'hidden'
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  textInputName: {
    color: '#fff',
    ...Platform.select({
      ios: {
        flex: 1,
        maxHeight: 16,
        lineHeight: 16,
        minHeight: 16,
      },
      android: {
        padding: 0,
      },
      default: {
        flex: 1,
        maxHeight: 14,
        lineHeight: 14,
        minHeight: 14,
      }
      })
  }
})

export default HomePlayerAddTeam;

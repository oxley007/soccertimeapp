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

import { getGamesDataOnce } from '../../Util/getGamesDataOnce.js';

//import HomePlayerAddPlayer from './HomePlayerAddPlayer.js'
//import HomePlayerListPlayers from './HomePlayerListPlayers.js'

import { updateGames } from '../../Reducers/games';
import { updatePlayerUserData } from '../../Reducers/playerUserData';
import { updateIap } from '../../Reducers/iap';
import { updateParentCoachView } from '../../Reducers/parentCoachView';


const HomeParentAddTeam = (props)=>{

  const [getTeam, setGetTeam] = useState([]);
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [collectionNameStore, setCollectionNameStore] = useState('');
  const [errorMessage, setErrorMessage] = useState(0);
  const [playersCheck, setPlayersCheck] = useState(0);
  const [posts, setPosts] = useState();
  const [getLoading, setLoading] = useState(false);
  const [getError, setError] = useState(null);


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
  let parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  //let parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);
  //let userProfile = useSelector(state => state.userProfile.userProfile);
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
    //let teamData = []
    let tempErrorMessage = 0
    try {
    const userProfileId = documentSnapshot.data().uid;

    tempErrorMessage = 1

    dispatch(updateParentCoachView(userProfileId))

    }
    catch {
      tempErrorMessage = 2
    }


    setErrorMessage(tempErrorMessage)

  }


   const previousGames = () => {

     navigate('PreviousGamesHome');

   }

   const inputHandler = (text, key)=>{
     const _inputs = [...inputs];
     //const _inputsNew = [...inputsNew];

     //const upperCaseText = text.toUpperCase();

     //_inputs[key].value = upperCaseText;
     //_inputs[key].key = key;
     _inputs[key].value = text;
     _inputs[key].key = key;
     setInputs(_inputs);
     //setInputsNew(_inputsNew);
   }

   const getInputs = () => {
     return (
       <VStack width="100%" alignItems="center" mt="2">
         {inputs.map((input, key)=>(
           <Stack minW="100%" mx="auto" bg="#333" pt="3" pb="3" pl="3">
             <TextInput placeholder={"Coach Profile ID"} style={styles.textInputName} placeholderTextColor="#999" textColor="#fff" value={input.value} onChangeText={(text)=>inputHandler(text,key)}/>
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
     const inputValue = _inputs[0].value;
  //console.log(inputValue + ' check inputValue thanks.');

     //const refTeam = firestore().collection('GBHFX6572JL').doc('GBHFX6572JL');
     try {
       const refTeam = firestore().collection(inputValue).doc('userData');
       const teams = refTeam.onSnapshot(onLiveCollectionUpdate)
    }
    catch {
      setErrorMessage(2)
    }



   }



   const continueSetup = async (navOption) => {



     if (navOption === 1) {
       navigate('HomeSelectProfile');
     }
     else {

       setLoading(true)
       let gameData = []
       let gameDataReverse = []
       try {
         const data = await getGamesDataOnce(parentCoachView); // <-- replace collection name

         setPosts(data);
      //console.log('getting here aye?');

         data.map(game => {
        //console.log(JSON.stringify(game) + ' what do we have in here?');
           try {
             if (game.game.isGame === true) {
               //console.log(game.game.id + ' game id t4esting only');
               gameData.push(game.game)
              }
            }
            catch {
             //do nothing.
           }
          })

        const gameDataIdOrder = gameData.sort((a, b) => a.id - b.id);
        gameDataReverse = gameDataIdOrder.reverse();

         dispatch(updateGames(gameDataReverse))
         //dispatch(setItems(data));
         setLoading(false)
       } catch (error) {
         setError(error.message)
         console.log('error her thanks ' + error.message);
         setLoading(false)
       }

       navigate('Home');
     }

   }


        return (
          <Center>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
            <Center>
            <Container h="100%" w="100%" maxWidth="100%" pr="5" pl="5">
            <ScrollView>
              <Box alignItems="center" mt="5" shadow="6">
              <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                  <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                    Paste Coach Profile ID:
                  </Text>
                  {getInputs()}
                </LinearGradient>
                </ImageBackground>

          <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>

          <HStack alignItems="center" safeAreaBottom p="0" mt="3"  pb="0" shadow={6} >
      <Button minW="100%" bg="#E879F9" size="md" pt="5" pb="5" _text={{fontSize: 26, color: '#fff'}} variant="subtle" onPress={() => checkAndAddTeam()}>Submit Profile ID</Button>
            </HStack>
    </Box>
    {errorMessage === 0 &&
      <Text style={{color: '#fff'}}>Coach Profile ID can be copied from the message sent by your coach or manager. If you can't find the message, please ask your coach/manager to resend.</Text>
    }
    {errorMessage === 1 &&
      <Box>
        <Text style={{color: '#fff'}}>Coach Profile ID added succesully!</Text>
        <Button minW="100%" maxW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup(0)}>Continue</Button>
      </Box>
    }


                {errorMessage === 2 &&
                  <Text style={{color: '#fff'}}>No coach with that Profile ID. Please copy & paste the ID again.</Text>
                }

              </Box>

            </ScrollView>
              <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0}}>
              <Center>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/SoccerTimeLive-logoMain400pxTrans.png')}
                  />
              </Center>
              <HStack alignItems="center" safeAreaBottom p="0"  shadow={6} ml="5" mr="5">
                <Button minW="100%" maxW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => continueSetup(0)}>Back</Button>
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

export default HomeParentAddTeam;

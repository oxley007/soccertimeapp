import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';
const doubleright = <Icon name="doubleright" size={20} color="#333" />;
const doubleleft = <Icon name="doubleleft" size={20} color="#333" />;
import LinearGradient from 'react-native-linear-gradient';


const StepLast = (props)=>{

  //const [getTeam, setGetTeam] = useState([]);


  /*
  let teamNames = useSelector(state => state.teamNames.teamNames);
  */

  const dispatch = useDispatch()

  const { navigate } = props.navigation;

  useEffect(() => {




      //setProductList(prodsInOrder)


  },[])

  const backButton = () => {

    let fromSetup = false
    let helpFromLiveGame = false

    try {
      fromSetup = props.route.params.fromSetup
      helpFromLiveGame = props.route.params.helpFromLiveGame
    }
    catch {
      fromSetup = false
      helpFromLiveGame = false
    }

      navigate('StepSeven',{
        fromSetup: fromSetup,
        helpFromLiveGame: helpFromLiveGame
      });


  }

  const nextButton = () => {

    let fromSetup = false
    let helpFromLiveGame = false

    try {
      fromSetup = props.route.params.fromSetup
      helpFromLiveGame = props.route.params.helpFromLiveGame
    }
    catch {
      fromSetup = false
      helpFromLiveGame = false
    }

 //console.log(fromSetup);

    if (fromSetup === true) {
      navigate('GameHome', {
        fromContinue: 0,
      });
    }
    else if (helpFromLiveGame === true) {
      navigate('GameHome', {
        fromContinue: 0,
      });
    }
    else {
      navigate('Home');
    }



  }


  const checkStartGameOrBack = (whereFromText) => {

    let fromSetup = false
    let helpFromLiveGame = false

    try {
      fromSetup = props.route.params.fromSetup
      helpFromLiveGame = props.route.params.helpFromLiveGame
    }
    catch {
      fromSetup = false
      helpFromLiveGame = false
    }

 //console.log(helpFromLiveGame);

    if (fromSetup === true && whereFromText === 2) {
      return (
        <Center>
          <Text style={styles.textThirty}>Start Game {doubleright}</Text>
        </Center>
      )
    }
    else if (helpFromLiveGame === true && whereFromText === 2) {
      return (
        <Center>
          <Text style={styles.textThirty}>Back to Game {doubleright}</Text>
        </Center>
      )
    }
    else if (whereFromText === 2) {
      return (
        <Center>
          <Text style={styles.textThirty}>Back Home {doubleright}</Text>
        </Center>
      )
    }
    else if (fromSetup === true && whereFromText === 1) {
      return (
        <Text>Tap <Text style={{fontWeight: '900'}}>Start Game</Text> at the bottom of the page to continue.</Text>
      )
    }
    else if (helpFromLiveGame === true && whereFromText === 1) {
      return (
        <Text>Tap <Text style={{fontWeight: '900'}}>Back to Game</Text> at the bottom of the page to continue.</Text>
      )
    }
    else if (whereFromText === 1) {
      return (
        <Text>Tap <Text style={{fontWeight: '900'}}>Back Home</Text> at the bottom of the page to continue.</Text>
      )
    }

  }




        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="16" >
                <Box>
                <Box style={styles.instructionBoxTop}>
                  <Center>
                    <Text style={{paddingTop: 10, paddingBottom: 10, fontSize: 30, fontWeight: 500, color: '#e879f9'}}>You're Ready to Play!</Text>
                  </Center>
                  <Text style={{paddingBottom: 10}}>You can find these instructions anytime you need to refresh your memory by tapping the menu on the top left and tapping ‘Game Instructions’. Please remember to send email invites to your team so they can view live game events and stats (You can send email invites from the homepage). Enjoy!</Text>
                  {checkStartGameOrBack(1)}
                </Box>
                <Center>
                  <Image
                      style={styles.screenshotImage}
                      source={require('../../assets/step_first_last.png')}
                    />
                </Center>
                </Box>
                </Container>
                <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, paddingBottom: 50}}>
                <HStack>
                <VStack>
                  <Box bg="#e8fdf2" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 150}}>
                    <Button minW="33.33%" variant="unstyled" onPress={() => backButton()}>
                      <HStack>
                        <Center>
                          <Text style={styles.textThirty}>{doubleleft} Back</Text>
                        </Center>
                      </HStack>
                    </Button>
                  </Box>
                </VStack>
                  <VStack>
                    <Box bg="#baf8d8" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 150}}>
                      <Button minW="66.66%" variant="unstyled" onPress={() => nextButton()}>
                        <HStack>
                          {checkStartGameOrBack(2)}
                        </HStack>
                      </Button>
                    </Box>
                  </VStack>
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 10
  },
  linearGradientBg: {
    minWidth: '100%',
  },
  screenshotImage: {
    maxWidth: '100%',
    resizeMode: 'contain',
    flex: 1
    //marginBottom: 50
  },
  instructionBoxTop: {
    position: 'absolute', top: '25%', zIndex: 1, backgroundColor: '#fff', padding: 25, minWidth: '100%'
  },
  instructionBoxBottom: {
    position: 'absolute', bottom: 0, zIndex: 1, backgroundColor: '#fff', padding: 15, minWidth: '100%'
  },
  textThirty: {
    color: '#333',
    fontSize: 30,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 30,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
})

export default StepLast;

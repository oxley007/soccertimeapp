import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';
const doubleright = <Icon name="doubleright" size={20} color="#333" />;
const doubleleft = <Icon name="doubleleft" size={20} color="#333" />;
import LinearGradient from 'react-native-linear-gradient';


const StepFirst = (props)=>{

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

    if (helpFromLiveGame === true) {
      navigate('GameHome',{
        fromSetup: fromSetup,
        helpFromLiveGame: helpFromLiveGame
      });
    }
    else {
      navigate('StepZero',{
        fromSetup: fromSetup,
        helpFromLiveGame: helpFromLiveGame
      });
    }



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

 //console.log(helpFromLiveGame + ' helpFromLiveGame is?');

      navigate('StepOne',{
        fromSetup: fromSetup,
        helpFromLiveGame: helpFromLiveGame
      });

  }


        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="16" >
                <Box>
                <Box style={styles.instructionBoxTop}>
                  <Center>
                    <Text style={{paddingTop: 10, paddingBottom: 10, fontSize: 30, fontWeight: 500, color: '#e879f9'}}>How to Play!</Text>
                  </Center>
                  <Text style={{paddingBottom: 10}}>The following screens explain the simple process of of how to add live scores & stats during a game.</Text>
                  <Text>Tap <Text style={{fontWeight: '900'}}>Start</Text> at the bottom of the page to continue.</Text>
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
                      <Button minW="100%" variant="unstyled" onPress={() => nextButton()}>
                        <HStack>
                          <Center>
                            <Text style={styles.textThirty}>Start {doubleright}</Text>
                          </Center>
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

export default StepFirst;

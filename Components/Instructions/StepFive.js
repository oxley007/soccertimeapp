import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';
const doubleright = <Icon name="doubleright" size={20} color="#333" />;
const doubleleft = <Icon name="doubleleft" size={20} color="#333" />;
const minuscircleo = <Icon name="minuscircleo" size={16} color="#333" />;
const pluscircleo = <Icon name="pluscircleo" size={16} color="#333" />;
import LinearGradient from 'react-native-linear-gradient';


const StepFive = (props)=>{

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

      navigate('StepFour',{
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

 //console.log(helpFromLiveGame + ' helpFromLiveGame is?');

      navigate('StepSeven',{
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
                  <Text style={{paddingBottom: 10}}>Tap 'Compare Player Time/Stats' button <Text style={{fontWeight: '900'}}>(1)</Text>.
                  Select ‘current season’ or ‘current game’ stats.</Text>
                  <Text>You can filter by specific stats by selecting the option in the ‘sort by’ dropdown. <Text style={{fontWeight: '900'}}>(2)</Text>.</Text>
                  <Text>you can then hold down the player to make the substatution <Text style={{fontWeight: '900'}}>(3)</Text>.</Text>
                </Box>
                <Center>
                  <Image
                      style={styles.screenshotImage}
                      source={require('../../assets/Step_5_instructions.gif')}
                    />
                </Center>
                </Box>
                </Container>
                <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 0, paddingBottom: 50}}>
                <HStack>
                  <VStack minW="33.33%" maxW="33.33%">

              <Box bg="#baf8d8" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 100}}>

                <Button variant="unstyled" onPress={() => backButton()}>
                  <HStack >
                  <Center>
                    <Text style={styles.textTwentyFour}>{doubleleft} Back</Text>
                    </Center>
                  </HStack>
                </Button>


              </Box>
              </VStack>
              <VStack minW="33.33%" maxW="33.33%">
              <Box bg="tertiary.100" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 100}}>




                <Button variant="unstyled">
                  <HStack >
                  <Center pl="2">
                    <Text style={styles.textTwentyFour}>5 of 6</Text>
                    </Center>
                  </HStack>
                </Button>


              </Box>
              </VStack>

              <VStack minW="33.33%" maxW="33.33%">
              <Box bg="#e8fdf2" style={{zIndex: 3, elevation: 3, borderBottomColor: '#fff', borderBottomWidth: 1, minHeight: 100}}>
                <Button variant="unstyled" onPress={() => nextButton()}>
                <HStack>
                  <Center>
                  <Text style={styles.textTwentyFour}>Next {doubleright}</Text>
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
    position: 'absolute', top: '5%', zIndex: 1, backgroundColor: '#fff', padding: 15, minWidth: '100%'
  },
  instructionBoxTopTwo: {
    position: 'absolute', top: '45%', zIndex: 1, backgroundColor: '#fff', padding: 15, minWidth: '100%'
  },
  instructionBoxBottom: {
    position: 'absolute', bottom: 0, zIndex: 1, backgroundColor: '#fff', padding: 15, minWidth: '100%'
  },
  textTwentyFour: {
    color: '#333',
    fontSize: 24,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 24,
      },
      default: {
        lineHeight: 0,
      }
      })
  },

})

export default StepFive;

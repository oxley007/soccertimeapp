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


const StepSix = (props)=>{

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

    try {
      fromSetup = props.route.params.fromSetup
    }
    catch {
      fromSetup = false
    }

    navigate('StepFive',{
      fromSetup: fromSetup
    });

  }

  const nextButton = () => {

    let fromSetup = false

    try {
      fromSetup = props.route.params.fromSetup
    }
    catch {
      fromSetup = false
    }

    navigate('StepSeven',{
      fromSetup: fromSetup
    });


  }



        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="16" >
                <Box>
                <Box style={styles.instructionBoxTop}>
                  <Text>You can filter by specific stats (i.e. Hishest % played as Sub, Hishest % played as forward, etc) by selecting the optin in the ‘sort by’ dropdown. You can then view player stats by scrolling down <Text style={{fontWeight: '900'}}>(3)</Text>.</Text>

                </Box>
                <Center>
                  <Image
                      style={styles.screenshotImage}
                      source={require('../../assets/step_6.png')}
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
                    <Text style={styles.textTwentyFour}>6 of 7</Text>
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
    position: 'absolute', top: '1%', zIndex: 1, backgroundColor: '#fff', padding: 15, minWidth: '100%'
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

export default StepSix;

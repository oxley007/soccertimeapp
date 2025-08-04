import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated, Linking } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from "react-redux";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SupportPage = (props)=>{

  //const [getTeam, setGetTeam] = useState(null);

  //let uid = useSelector(state => state.uid);
  //const [uidState, setu] = useState(true);

  let userProfile = useSelector(state => state.userProfile.userProfile);

  //const dispatch = useDispatch()

  const { currentUser } = auth()
  //const userRef = firestore().collection(currentUser.uid);

  const { navigate } = props.navigation;


  const backHome = () => {
     //console.log(error);
       navigate('Loading', {
         signedOut: true
       });

    }

    const handleEmailPress = () => {

      const uid = currentUser.uid

      const subject = 'Help with Subscription';
      const body = `Hi,\n\nI need help with my subscription. My UID is: ${uid}`;
      const email = `mailto:andrew@4dot6digital.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      Linking.openURL(email);
    };

    const navHome = () => {

      if (userProfile === 2) {
        navigate('HomePlayer')
      }
      else {
        navigate('Home')
      }


    }

        return (
          <Container maxW="100%">
          <Center style={{height:'100%',width:'100%',alignItems: 'center'}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <ScrollView style={{height:'100%',width:'100%'}}>
                <Box style={{paddingTop: 50, minWidth: "100%", padding: 15}}>
                  <Center>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/SoccerTimeLive-logoMain400pxTrans.png')}
                      />
                  </Center>
                </Box>
                <Center>
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>If you find any bugs or need help please contact support.
                </Text>
                <Button transparent light style={styles.textButton}
                  onPress={handleEmailPress}
                  >
                    <Text style={styles.whiteText}>Contact Support</Text>
                </Button>
                </Center>
                <Box style={{paddingTop: 40}}>
                <Center>
                <Text style={{ color: '#fff', fontSize: 12 }}>2.4.21</Text>
                <Button transparent light style={styles.textButtonBack}
                  onPress={() => navHome()}
                  >
                  <Text style={styles.whiteText}>Back to Home.</Text>
                </Button>
                </Center>
                </Box>
                </ScrollView>
            </LinearGradient>
          </Center>
          </Container>

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
  textButton: {
    minWidth: '80%',
    backgroundColor: '#E879F9',
    marginTop: 20
  },
  textButtonBack: {
    minWidth: '80%',
    backgroundColor: '#fff'
  },
})

export default SupportPage;

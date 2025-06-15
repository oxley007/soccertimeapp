import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Linking, Platform, Clipboard } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, PresenceTransition, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const plusIcon = <Icon name="plus" size={30} color="#0891b2" />;
const minusIcon = <Icon name="minus" size={30} color="#0891b2" />;
const copyIcon = <FontAwesomeIcon name="copy" size={20} color="#fff" />;
const copyIconLarge = <FontAwesomeIcon name="copy" size={30} color="#fff" />;

import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updatePrevGames } from '../../Reducers/prevGames';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateCopyDisplayBoard } from '../../Reducers/copyDisplayBoard';


//import EventsDisplay from '../Events/EventsDisplay.js'


const CopyCoachId = (props)=>{

  const [inviteSent, setSetInviteSent] = useState(0);
  const [copyDisplayBoard, setCopyDisplayBoard] = useState(false);


  //let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let teamNames = useSelector(state => state.teamNames.teamNames);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  let parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  let userRef = null
  try {
    if (userProfile === 4) {
      console.log('profile 4 is hit!');
      console.log(parentCoachView + ' parentCoachView ID is?');
      userRef = firestore().collection(parentCoachView);
    }
    else {
      userRef = firestore().collection(currentUser.uid);
    }
  }
  catch {
    //do nothing.
  }
  const teamRef = firestore().collection('teamTest1')

  const whereFrom = props.whereFrom

  useEffect(() => {

 //console.log('teamPlayers updated');

    getTeamPlayers()

  },[inviteSent])

  const getTeamPlayers = () => {

    const teamPlayerData = props.playerData

    let status = 'Invite not sent'
    let buttonStatus = 'Send'



    const teamInvitePlayers = teamPlayerData.map(player => {

      if (player.inviteStatus === 0) {
        status = 'Invite not sent'
        buttonStatus = 'Send'
      }
      else if (player.inviteStatus === 1) {
        status = 'Invite copied!'
        buttonStatus = 'Re-send'
      }
      else if (player.inviteStatus === 2) {
        status = 'Player signed up and viewing stats!'
        buttonStatus = 'Done'
      }
      else {
        status = 'Invite not sent'
      }

    return (
      <Box alignItems="center" mt="5" shadow="6">
      <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.9)', 'rgba(216,180,254,0.9)']} style={styles.linearGradient}>
          <Center>
          <HStack>
            <VStack minW="75%">
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
              {player.playerName}
          </Text>
          <Text style={styles.textFourteenBold}>
            Status:
        </Text>
        {player.inviteStatus < 1 &&
          <Text style={styles.textFourteenBlue}>
            {status}
          </Text>
        }
        {player.inviteStatus >= 1 &&
          <Text style={styles.textFourteenGreen}>
            {status}
          </Text>
        }
          </VStack>
          <Center>
          <VStack minW="20%">
            <TouchableOpacity style={{borderColor: '#fff', borderWidth: 1, padding: 5, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 5}} onPress={() => copyInvite(player)}>
            <Center>
              <Text>{copyIcon}</Text>
              <Text style={{color: '#fff'}}>Copy Invite</Text>
              </Center>
            </TouchableOpacity>
          </VStack>
          </Center>
          </HStack>
        </Center>
      </LinearGradient>
    </ImageBackground>
    </Box>
    )
  })

  return teamInvitePlayers

  }

  const copyTeamInvite = () => {
    Alert.alert(
    'How to send a Coach Profile ID!',
    'A template with your Coach Profile ID will automatically be created & copied to your clipboard. Please paste the text into a messenger service or email to send an assistant or parent the ID. Click "Copy Coach Profile ID" to continue.',
    [
      {text: 'Copy Coach Profile ID', onPress: () => {

        openTeamInvite();

      }},
      {
        text: 'Cancel',
        onPress: () => {

       //console.log('cancel.');

        }
      },
    ],
    {cancelable: true},
    );
  }


  const openTeamInvite = () => {

      const coachProfileId = currentUser.uid

      Clipboard.setString(
        `Hi!
        \nThis season, our team will be using the SoccerTime Live App, which lets an assistant or parent track live scores during the game and help manage player substitutions.
        \nCoach Profile ID: ${coachProfileId}
        \nTo help manage player substitutions, the app allows access to the coach's view. You can then help make sure each player has a fair amount of playing time.
        \nWe've selected you to help manage substitutions for our upcoming game!
        \nIf you haven't already, you can download the app from the App Store:
        \n•	iPhone/iPad: https://apps.apple.com/app/id6450653830
        \n•	Android: https://play.google.com/store/apps/details?id=com.soccertimeapp
        \nAfter logging in, please follow the instructions below:
        \n1.	On the first screen, tap "Manage Substitutions for Coach"\n2.	Enter the Coach Profile ID: ${coachProfileId}\n3.	Tap continue\n4. Tap "Subs Management" and follow the setup instructions
        \nYou can now manage substitutions and create real-time live scores and events for the other parents/supporters on our team!
        \nFeel free to watch this video for more information on how to set up Sub Management for our team.
        \nIf you have any questions, let me know.
        \nEnjoy & thanks in advance for your help!`);



    //test adding a variable to email url link:
    /*
    const testName = "Andrew Oxley"
    Linking.openURL(`mailto:?subject=Quote&body=I%20would%20like%20to%20accept%20this%20quote&body=Hi%20%7B${testName}%7D%2C%0A%0AThis%20season`)
    */
    dispatch(updateCopyDisplayBoard(true))

    setTimeout(function(){
      //console.log(copyDisplayBoard + ' copyDisplayBoard on click invite 1!')
      dispatch(updateCopyDisplayBoard(false))
    }, 3000);

  }



        return (

          <Box ml="5" mr="5" mt="5">
            <Box alignItems="center" mt="3" shadow="6">
              <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradient}>
                  <Center>
                    <Box mt="0" pt="1" pb="3" minW="100%">
                      <Heading pt="2" pb="2" style={{color: '#fff'}}>
                        Team: <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>{props.team}</Heading>
                      </Heading>
                      <Text style={{fontWeight: '600', color: '#fff'}}>Season: <Text style={{fontWeight: '300'}}>{props.season}</Text></Text>
                    </Box>
                  </Center>

                    <TouchableOpacity style={{borderColor: '#fff', borderWidth: 1, padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 5}} onPress={() => copyTeamInvite()}>
                    <Center>
                      <Text>{copyIcon}</Text>
                      <Text style={{color: '#fff', fontSize: 20}}>Copy Coach Profile ID</Text>
                      </Center>
                    </TouchableOpacity>

                </LinearGradient>
              </ImageBackground>
              </Box>
          </Box>


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
    maxWidth: '100%',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradientGameStats: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: '100%',
    marginBottom: 10
  },
  textFourteenBold: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '700',
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 14,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textFourteenBlue: {
    color: '#be123c',
    fontSize: 14,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 14,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  textFourteenGreen: {
    color: 'green',
    fontSize: 14,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 14,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
})

export default CopyCoachId;

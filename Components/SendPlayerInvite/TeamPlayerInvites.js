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


const TeamPlayerInvites = (props)=>{

  const [inviteSent, setSetInviteSent] = useState(0);
  const [copyDisplayBoard, setCopyDisplayBoard] = useState(false);


  //let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let teamNames = useSelector(state => state.teamNames.teamNames);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
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
    'How to send a team invite!',
    'A template with your Team ID and Individual Player IDs will automatically be created & copied to your clipboard. Please paste the text into your Group Chat or Email Loop to send your team their player invites. Click "Copy Invite - Entire Team" to continue.',
    [
      {text: 'Copy Invite - Entire Team', onPress: () => {

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

  const copyInvite = (player) => {

    Alert.alert(
    'Individual player invite!',
    'If you prefer you can individually send a personalised template with the players individual ID. A template will automatically be created & copied to your clipboard. Please paste the text into a messenger service to individually send the player their invite. Click "Copy Invite" to continue.',
    [
      {text: 'Copy Invite', onPress: () => {

        openInviteEmail(player, 1);

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

  const sendInvite = (player) => {

    Alert.alert(
    'How to send an invite!',
    'An email template with your Team ID and individual Player ID will automatically open on your email. Please enter the players email address to send them their invite. Click "Open Email" to continue.',
    [
      {text: 'Open Email', onPress: () => {

        openInviteEmail(player, 0);

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




    const teamPlayerData = props.playerData

    let teamNamesAndCodeArray = []
    let teamIdCodeGames = 0
    teamPlayerData.map(player => {
      const playerIndex = teamPlayers.findIndex(x => x.id === player.id);
      //need to create varigable for:
      teamIdCodeGames = teamPlayers[playerIndex].teamIdCode
      const playerId = teamPlayers[playerIndex].playerId
      const playerName = teamPlayers[playerIndex].playerName
      const fullNameSplit = playerName.split(' ')
      const firstName = fullNameSplit[0]

      if (teamPlayers[playerIndex].inviteStatus < 1) {
          teamPlayers[playerIndex].inviteStatus = 1
          userRef.doc(playerId).update({
              inviteStatus: 1,
            })
            .catch(error => this.setState({ errorMessage: error.message }))


            firestore().collection(teamIdCodeGames).doc(playerId).update({
               inviteStatus: 1
             })
      }

      teamNamesAndCodeArray.push({teamIdCodeGames: teamIdCodeGames, playerId: playerId, playerName: playerName, fullNameSplit: fullNameSplit, firstName: firstName})
    })

    //console.log(JSON.stringify(teamNamesAndCodeArray) + ' teamNamesAndCodeArray check. here.');

    //const teamName = //(nice to have. If to tricky, don't worry.)
    const teamIndex = teamNames.findIndex(x => x.teamId === teamIdCodeGames);

    const teamNameDisplayRaw = teamNames[teamIndex].teamName


    const teamNameDisplaySplitted = teamNameDisplayRaw.split(" ");
 //console.log(teamNameDisplaySplitted + ' teamNameDisplaySplitted');
    const teamNameDisplay = teamNameDisplayRaw
    /*
    if (Platform.OS === 'ios') {
      teamNameDisplay = teamNameDisplayRaw
    }
    else {
      teamNameDisplaySplitted.map(word => {
        teamNameDisplay = teamNameDisplay + word + "%20"
      })
    }
    */
    //const teamNameDisplay = teamNameDisplaySplitted[0] + "%20" +

 //console.log(teamNameDisplay + ' what is teamNameDisplay?');



 //console.log(JSON.stringify(teamPlayers[playerIndex]) + ' check teamPlayers[playerIndex] here to see what i need.');


    dispatch(updateTeamPlayers(teamPlayers))


    let inviteSentNew = inviteSent

    inviteSentNew = inviteSentNew + 1
    setSetInviteSent(inviteSentNew)

    /*
    const testName = "Andrew Oxley"
    const bodyVariable = `mailto:?subject=Quote&body=I%20would%20like%20to%20accept%20this%20quote&body=Hi%20%7B${testName}%7D%2C%0A%0AThis%20season`

    Linking.openURL(bodyVariable)
    */

    //const testName = "Andrew"

    let playerNameCodeString = ''
    teamNamesAndCodeArray.map(playerNameCode => {
      playerNameCodeString = playerNameCodeString + "'\n'" +
      playerNameCode.playerName + ": " + playerNameCode.playerId
    })

    const playerNameCodeStringFinal = playerNameCodeString.replace(/'/g, '');

    //console.log(playerNameCodeStringFinal + ' playerNameCodeStringFinal is what??');

      Clipboard.setString(
        `Hi Team!
        \nThis season, our team will be using the SoccerTime Live App, which allows you to view live scores during the game, player stats and game-time played!
        \nPlease follow the steps below once you’ve downloaded the app:
        \nDownload the app from your app store:
        \n•	iPhone/iPad: https://apps.apple.com/app/id6450653830
        \n•	Android: https://play.google.com/store/apps/details?id=com.soccertimeapp
        \n1.	Open the app on your device\n2.	On the first screen, tap "Player or Parent"\n3.	Enter our Team ID: ${teamIdCodeGames}\n4.	Enter your Player ID (the five-digit number below):
        ${playerNameCodeStringFinal}
        \nYou’ll now be able to view player stats, total game-time played, and live scores during the game!
        \nFeel free to share this message with any friends or family who’d like to follow our live updates. Just have them enter the Team ID (${teamIdCodeGames}) in the SoccerTime app to see the scores.
        \nIf you have any questions, let me know.
        \nEnjoy!`);



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

  const openInviteEmail = (player, sendType) => {

    const playerIndex = teamPlayers.findIndex(x => x.id === player.id);

    //need to create varigable for:

    const teamIdCodeGames = teamPlayers[playerIndex].teamIdCode
    const playerId = teamPlayers[playerIndex].playerId
    const playerName = teamPlayers[playerIndex].playerName
    const fullNameSplit = playerName.split(' ')
    const firstName = fullNameSplit[0]

    //const teamName = //(nice to have. If to tricky, don't worry.)
    const teamIndex = teamNames.findIndex(x => x.teamId === teamIdCodeGames);

    const teamNameDisplayRaw = teamNames[teamIndex].teamName


    const teamNameDisplaySplitted = teamNameDisplayRaw.split(" ");
 //console.log(teamNameDisplaySplitted + ' teamNameDisplaySplitted');
    let teamNameDisplay = ''
    if (Platform.OS === 'ios') {
      teamNameDisplay = teamNameDisplayRaw
    }
    else {
      teamNameDisplaySplitted.map(word => {
        teamNameDisplay = teamNameDisplay + word + "%20"
      })
    }
    //const teamNameDisplay = teamNameDisplaySplitted[0] + "%20" +

 //console.log(teamNameDisplay + ' what is teamNameDisplay?');

    if (teamPlayers[playerIndex].inviteStatus < 1) {
        teamPlayers[playerIndex].inviteStatus = 1
        userRef.doc(playerId).update({
            inviteStatus: 1,
          })
          .catch(error => this.setState({ errorMessage: error.message }))


          firestore().collection(teamIdCodeGames).doc(playerId).update({
             inviteStatus: 1
           })
    }

 //console.log(JSON.stringify(teamPlayers[playerIndex]) + ' check teamPlayers[playerIndex] here to see what i need.');


    dispatch(updateTeamPlayers(teamPlayers))


    let inviteSentNew = inviteSent

    inviteSentNew = inviteSentNew + 1
    setSetInviteSent(inviteSentNew)

    /*
    const testName = "Andrew Oxley"
    const bodyVariable = `mailto:?subject=Quote&body=I%20would%20like%20to%20accept%20this%20quote&body=Hi%20%7B${testName}%7D%2C%0A%0AThis%20season`

    Linking.openURL(bodyVariable)
    */

    //const testName = "Andrew"

    if (sendType === 0) {
      if (Platform.OS === 'ios') {
        Linking.openURL(`mailto:?subject=View ${teamNameDisplay} team stats and live scores&body=Hi ${firstName},

          This season our team will be using the SoccerTime Live App that allows you to view player stats, total game-time played for each player and live scores during the game!

          Once downloaded please follow the below instructions:

          1. Open the app on your device
          2. On the first screen tap "Player or Parent"
          3. On the next screen tap "Add Team"
          4. Then, enter our Team ID: ${teamIdCodeGames}
          5. Then, enter your Player ID: ${playerId}

          Please download the app from your app store:
          iPhone/iPad - https://apps.apple.com/app/id6450653830
          Android - https://play.google.com/store/apps/details?id=com.soccertimeapp

          You are now able to view player stats, total game-time played and live scores during the game!

          Feel free to forward this email to any friends or family which might want to watch our live updates during the game. Make sure they enter the above Team ID into the SoccerTime Live! app to watch live scores.

          Any questions or concerns please let me know by reply email.

          Enjoy!`)
      }
      else {
        Linking.openURL(`mailto:?subject=View%20${teamNameDisplay}team%20stats%20and%20live%20scores&body=Hi%20${firstName}%2C%0A%0AThis%20season%20our%20team%20will%20be%20using%20the%20SoccerTime%20Live%20App%20that%20allows%20you%20to%20view%20player%20stats%2C%20total%20game-time%20played%20for%20each%20player%20and%20live%20scores%20during%20the%20game!%0A%0AOnce%20downloaded%20please%20follow%20the%20below%20instructions%3A%0A%0A1.%20Open%20the%20app%20on%20your%20device%0A2.%20On%20the%20first%20screen%20tap%20%E2%80%98Player%20or%20Parent%E2%80%99%0A3.%20On%20the%20next%20screen%20tap%20%E2%80%98Add%20Team%E2%80%99%0A4.%20Then%2C%20enter%20your%20Team%20ID%3A%20${teamIdCodeGames}%20%0A5.%20Then%2C%20enter%20you%20Player%20ID%3A%20${playerId}%0A%0APlease%20download%20the%20app%20from%20your%20app%20store%3A%0ASoccerTime%20Live!%20Apple%20iPhone%2FiPad%20-%20https%3A%2F%2Fapps.apple.com%2Fapp%2Fid6450653830%0ASoccerTime%20Live!%20Google%20Play%20https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.soccertimeapp %0A%0AYou%20are%20now%20able%20to%20view%20player%20stats%2C%20total%20game-time%20played%20and%20live%20scores%20during%20the%20game!%0A%0AFeel%20free%20to%20forward%20this%20email%20to%20any%20friends%20or%20family%20which%20might%20want%20to%20watch%20our%20live%20updates%20during%20the%20game.%20Make%20sure%20they%20enter%20the%20above%20Team%20ID%20into%20the%20SoccerTime%20Live!%20app%20to%20watch%20live%20scores.%20%20%0A%0AAny%20questions%20or%20concerns%20please%20let%20me%20know%20by%20reply%20email.%0A%0AEnjoy!`)
      }
    }
    else {
      Clipboard.setString(
        `Hi ${firstName},
        \nThis season, our team will be using the SoccerTime Live App, which allows you to view live scores during the game, player stats and game-time played!
        \nPlease follow the steps below once you’ve downloaded the app:
        \n1. Open the app on your device\n2. On the first screen tap "Player or Parent"\n3. On the next screen tap "Add Team"\n4. Then, enter our Team ID: ${teamIdCodeGames}\n5. Then, enter your Player ID: ${playerId}
        \nDownload the app from your app store:
        \n•	iPhone/iPad: https://apps.apple.com/app/id6450653830
        \n•	Android: https://play.google.com/store/apps/details?id=com.soccertimeapp
        \nYou’ll now be able to view player stats, total game-time played, and live scores during the game!
        \nFeel free to share this message with any friends or family who’d like to follow our live updates. Just have them enter the Team ID (${teamIdCodeGames}) in the SoccerTime app to see the scores.
        \nIf you have any questions, let me know.
        \nEnjoy!`);
    }

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

  //const teamType = props.route.params.teamType

//console.log(getGame + ' what is getGame');

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
                      <Text style={{color: '#fff', fontSize: 20}}>Copy Invite - Entire Team</Text>
                      </Center>
                    </TouchableOpacity>

                </LinearGradient>
              </ImageBackground>
              </Box>
            {getTeamPlayers()}
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

export default TeamPlayerInvites;

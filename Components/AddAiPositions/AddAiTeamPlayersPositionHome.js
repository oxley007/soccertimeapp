import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, KeyboardAvoidingView, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, PresenceTransition } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const arrowdowncircle = <FeatherIcon name="arrow-down-circle" size={26} color="#fff" />;
import LinearGradient from 'react-native-linear-gradient';
import SoccerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const feildIcon = <SoccerIcon name="soccer" size={30} color="#fff" />;
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const trayArrowUp = <IconMaterialCommunityIcons name="tray-arrow-up" size={26} color="#000" />;

import { updateGames } from '../../Reducers/games';

import TeamPlayersPositions from './TeamPlayersPositions.js'

const AddAiTeamPlayersPositionHome = (props)=>{

  const [getTeam, setGetTeam] = useState([]);


  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const teamId = props.route.params.teamId
  const teamIdCode = props.route.params.teamIdCode
  const whereFrom = props.route.params.whereFrom

  let addTeamOnly = 0

  try {
    addTeamOnly = props.route.params.addTeamOnly
  }
  catch {
    addTeamOnly = 0
    //nothing.
  }

  const { navigate } = props.navigation;

    return (
      <Center>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>Add AI Season Positions</Heading>
            <Text style={{color: '#ccc', marginBottom: 2}}>Update the positions your players will play during the season so our AI understands their roles during the game. This allows for smarter suggestions on positions and substitutions.</Text>
            <Text style={{color: '#ccc', marginBottom: 2}}>If all team members play every position, you can leave the below selection as default.</Text>
          </Box>
          <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 12 }} />
          <TeamPlayersPositions games={games} />
        </LinearGradient>
      </Center>
    )

  }

  const styles = StyleSheet.create({
    linearGradientBg: {
      minWidth: '100%',
      paddingLeft: 15,
      paddingRight: 15,
    },
  })


export default AddAiTeamPlayersPositionHome;

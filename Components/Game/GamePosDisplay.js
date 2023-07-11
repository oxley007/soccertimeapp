import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, Select } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';

const GamePosDisplay = (props)=>{

  const [getTeam, setGetTeam] = useState([]);

  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerPos = props.playerPos

        return (
          <Box mr="1" alignSelf="center">
            {playerPos === 'fwd' &&
              <Button bg="primary.100" pl="1" pr="1" minW="41" _text={{color: '#0891b2'}} _pressed={{ backgroundColor: 'primary.100', opacity: 1 }} size="md" >FWD</Button>
            }
            {playerPos === 'mid' &&
              <Button bg="yellow.100" pl="1" pr="1" minW="41" _text={{color: '#0891b2'}} _pressed={{ backgroundColor: 'yellow.100', opacity: 1 }} size="md" >MID</Button>
            }
            {playerPos === 'def' &&
              <Button bg="warning.200" pl="1" pr="1" minW="41" _text={{color: '#0891b2'}} _pressed={{ backgroundColor: 'warning.200', opacity: 1 }} size="md" >DEF</Button>
            }
            {playerPos === 'gol' &&
              <Button bg="fuchsia.200" pl="1" pr="1" minW="41" _text={{color: '#0891b2'}} _pressed={{ backgroundColor: 'fuchsia.200', opacity: 1 }} size="md" >GOL</Button>
            }
            {playerPos === 'sub' &&
              <Button bg="emerald.200" pl="1" pr="1" minW="41" _text={{color: '#0891b2'}} _pressed={{ backgroundColor: 'emerald.200', opacity: 1 }} size="md" >SUB</Button>
            }
          </Box>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default GamePosDisplay;

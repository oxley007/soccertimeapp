import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const SelectGameTime = (props)=>{

  const [gameTime, setGameTime] = useState(0);

  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')




  const addGameTimeSelect = (value: string) => {

    let valueInt = Number(value)
    valueInt = valueInt * 60
    setGameTime(valueInt)
    games[0].gameHalfTime = valueInt
    dispatch(updateGames(games))

  }

  const changeTime = () => {

    const valueInt = 0
    setGameTime(valueInt)
    games[0].gameHalfTime = valueInt
    dispatch(updateGames(games))

  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7" minW="100%">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      How long is each half?
    </Text>
    {gameTime === 0 &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={gameTime} minWidth="100%" bg="#fff" accessibilityLabel="Select Game-Time" placeholder="Select Game-Time" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1}  onValueChange={addGameTimeSelect.bind(this)} >
          <Select.Item label="5min (10min total game)" value="5" />
          <Select.Item label="10min (20min total game)" value="10" />
          <Select.Item label="15min (30min total game)" value="15" />
          <Select.Item label="20min (40min total game)" value="20" />
          <Select.Item label="25min (50min total game)" value="25" />
          <Select.Item label="30min (60min total game)" value="30" />
          <Select.Item label="35min (70min total game)" value="35" />
          <Select.Item label="40min (80min total game)" value="40" />
          <Select.Item label="45min (90min total game)" value="45" />
          <Select.Item label="1min (2min total game)" value="1" />
          <Select.Item label="6min (12min total game)" value="6" />
          <Select.Item label="7min (14min total game)" value="7" />
          <Select.Item label="8min (16min total game)" value="8" />
          <Select.Item label="9min (18min total game)" value="9" />
          <Select.Item label="11min (22min total game)" value="11" />
          <Select.Item label="12min (24min total game)" value="12" />
          <Select.Item label="13min (26min total game)" value="13" />
          <Select.Item label="14min (28min total game)" value="14" />
          <Select.Item label="16min (32min total game)" value="16" />
          <Select.Item label="17min (34min total game)" value="17" />
          <Select.Item label="18min (36min total game)" value="18" />
          <Select.Item label="19min (38min total game)" value="19" />
          <Select.Item label="21min (42min total game)" value="21" />
          <Select.Item label="22min (44min total game)" value="22" />
          <Select.Item label="23min (46min total game)" value="23" />
          <Select.Item label="24min (48min total game)" value="24" />
          <Select.Item label="26min (52min total game)" value="26" />
          <Select.Item label="27min (54min total game)" value="27" />
          <Select.Item label="28min (56min total game)" value="28" />
          <Select.Item label="29min (58min total game)" value="29" />
          <Select.Item label="31min (62min total game)" value="31" />
          <Select.Item label="32min (64min total game)" value="32" />
          <Select.Item label="33min (66min total game)" value="33" />
          <Select.Item label="34min (68min total game)" value="34" />
          <Select.Item label="36min (72min total game)" value="36" />
          <Select.Item label="37min (74min total game)" value="37" />
          <Select.Item label="38min (76min total game)" value="38" />
          <Select.Item label="39min (78min total game)" value="39" />
          <Select.Item label="41min (82min total game)" value="41" />
          <Select.Item label="42min (84min total game)" value="42" />
          <Select.Item label="43min (86min total game)" value="43" />
          <Select.Item label="44min (88min total game)" value="44" />
          <Select.Item label="45min (90min total game)" value="45" />
        </Select>
      </Box>
      </Center>
    }
    {gameTime > 0 &&
      <Box>
      <HStack>
      <Text style={{paddingTop: 5, color: '#fff'}}>Time for each half: {formattedSeconds(gameTime)}min</Text>
      <Button size="xs" _text={{fontSize: "xs", textDecorationLine: true}} variant="link" onPress={() => changeTime()}>Change time</Button>
      </HStack>
      </Box>
    }

    </LinearGradient>
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
    marginTop: 30
  },
})

export default SelectGameTime;

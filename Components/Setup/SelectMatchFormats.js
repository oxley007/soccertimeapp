import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';

const SelectMatchFormats = (props)=>{

  const [getMatchFormat, setMatchFormat] = useState('');
  const [getMatchFormatId, setMatchFormatId] = useState(0);

  let games = useSelector(state => state.games.games);
  //let seasons = useSelector(state => state.seasons.seasons);
  //let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);

  useEffect(() => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    console.log(props.whereFrom + ' props.whereFrom wher is this from?');

    ///if (props.whereFrom === 1) {
      //const teamName = _games[0].teamNames.awayTeamName
      const valueInt = _games[0].matchFormat
      setMatchFormatId(valueInt)
    //}

  },[])

  const addMatchFormatSelect = (value: string) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

   //console.log(JSON.stringify(_games[0]) + ' _games[0] first check.');

      let valueInt = Number(value)
      setMatchFormatId(valueInt)
      _games[0].matchFormat = valueInt
      dispatch(updateGames(_games))

  }

  const changeMatchFormat = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    setMatchFormatId(0)
    _games[0].matchFormat = 0
    dispatch(updateGames(_games))


  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={ props.isOpen === 0 ? styles.linearGradientIsOpenZero : props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradient}>
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, paddingTop: 10}}>
      Select Match Format
    </Text>
    {getMatchFormatId === 0 &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={getMatchFormatId} minWidth="100%" bg="#333" accessibilityLabel="Select Match Format" placeholder="Select Match Format" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1}  onValueChange={addMatchFormatSelect.bind(this)} >
        <Select.Item label="11-a-Side" value="11" />
        <Select.Item label="10-a-Side" value="10" />
        <Select.Item label="9-a-Side" value="9" />
        <Select.Item label="8-a-Side" value="8" />
        <Select.Item label="7-a-Side" value="7" />
        <Select.Item label="6-a-Side" value="6" />
        <Select.Item label="5-a-Side" value="5" />
        <Select.Item label="4-a-Side" value="4" />
        <Select.Item label="3-a-Side" value="3" />
        <Select.Item label="2-a-Side" value="2" />
        <Select.Item label="1-on-1" value="1" />
        </Select>
      </Box>
      </Center>
    }
    {getMatchFormatId > 0 &&
      <Box>
        <HStack>
        <Text style={{fontSize: 12, paddingTop: 5, color: '#fff', fontWeight: '300'}}>Current Match Format Selected: {getMatchFormatId}-a-side</Text>
        <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeMatchFormat()}>Change</Button>
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
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: '100%',
    marginTop: 30
  },
  linearGradientSeven: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: '100%',
    marginBottom: 15
  },
  linearGradientIsOpenZero: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: '100%',
    marginBottom: 15,
    marginTop: 0,
    paddingBottom: 20
  }
})

export default SelectMatchFormats;

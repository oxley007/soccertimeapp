import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';

const SelectEnableAi = (props)=>{

  const [getEnableAi, setEnableAi] = useState('');
  const [getEnableAiId, setEnableAiId] = useState(0);

  let games = useSelector(state => state.games.games);
  //let seasons = useSelector(state => state.seasons.seasons);
  //let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);

  const addEnableAiSelect = (value: string) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

   //console.log(JSON.stringify(_games[0]) + ' _games[0] first check.');

      let valueInt = Number(value)
      setEnableAiId(valueInt)
      let EnableAiString = 'No'
      if (valueInt === 1) {
        EnableAiString = 'Yes'
      }
      else if (valueInt === 2) {
        EnableAiString = 'No'
      }
      setEnableAi(EnableAiString)
      _games[0].enableAi = valueInt
      dispatch(updateGames(_games))

  }

  const changeEnableAi = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    setEnableAiId(0)
    setEnableAi('No')
    _games[0].enableAi = 0
    dispatch(updateGames(_games))


  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={ props.isOpen === 0 ? styles.linearGradientIsOpenZero : props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradient}>
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, paddingTop: 10}}>
      Do you want to enable AI subs?
    </Text>
    <Text style={{fontSize: 16, color: '#ddd', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      You can change this later under ‘Game Options’.
    </Text>
    {getEnableAiId === 0 &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={getEnableAiId} minWidth="100%" bg="#333" accessibilityLabel="Select Match Format" placeholder="Select Match Format" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1}  onValueChange={addEnableAiSelect.bind(this)} >
          <Select.Item label="Yes – Show AI sub suggestions" value="1" />
          <Select.Item label="No – I'll manage subs myself" value="2" />
        </Select>
      </Box>
      </Center>
    }
    {getEnableAiId > 0 &&
      <Box>
        <HStack>
        <Text style={{fontSize: 12, paddingTop: 5, color: '#fff', fontWeight: '300'}}>Dedicated Goalie: {getEnableAi}</Text>
        <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeEnableAi()}>Change</Button>
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

export default SelectEnableAi;

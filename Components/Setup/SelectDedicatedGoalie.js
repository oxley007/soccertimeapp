import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';

const SelectDedicatedGoalie = (props)=>{

  const [getDedicatedGoalie, setDedicatedGoalie] = useState('');
  const [getDedicatedGoalieId, setDedicatedGoalieId] = useState(0);

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
      const valueInt = _games[0].dedicatedGoalie
      setDedicatedGoalieId(valueInt)
    //}

  },[])

  const addDedicatedGoalieSelect = (value: string) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

   //console.log(JSON.stringify(_games[0]) + ' _games[0] first check.');

      let valueInt = Number(value)
      setDedicatedGoalieId(valueInt)
      let dedicatedGoalieString = 'No'
      if (valueInt === 1) {
        dedicatedGoalieString = 'Yes'
      }
      else if (valueInt === 2 || valueInt === 3) {
        dedicatedGoalieString = 'No'
      }
      setDedicatedGoalie(dedicatedGoalieString)
      _games[0].dedicatedGoalie = valueInt
      dispatch(updateGames(_games))

  }

  const changeDedicatedGoalie = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    setDedicatedGoalieId(0)
    setDedicatedGoalie('No')
    _games[0].dedicatedGoalie = 0
    dispatch(updateGames(_games))


  }

  const outPutDedGoalieTrueFalse = () => {

    let dedGoalieText = ''
    if (getDedicatedGoalieId === 1) {
      dedGoalieText = 'No'
    }
    else if (getDedicatedGoalieId === 2) {
      dedGoalieText = 'Yes'
    }
    else if (getDedicatedGoalieId === 3) {
      dedGoalieText = 'Not sure yet'
    }

    return (
      <Text style={{fontSize: 12, paddingTop: 5, color: '#fff', fontWeight: '300'}}>Goalie Play Outfield: {dedGoalieText}</Text>
    )

  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={ props.isOpen === 0 ? styles.linearGradientIsOpenZero : props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradient}>
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, paddingTop: 10}}>
      Will your goalie(s) sub to play outfield?
    </Text>
    <Text style={{fontSize: 16, color: '#ddd', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      This info helps our Smart-Subs calculate when to sub outfield players.
    </Text>
    {getDedicatedGoalieId === 0 &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={getDedicatedGoalieId} minWidth="100%" bg="#333" accessibilityLabel="Select Match Format" placeholder="Select Match Format" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1}  onValueChange={addDedicatedGoalieSelect.bind(this)} >
          <Select.Item label="No - Goalie(s) will not play outfield" value="1" />
          <Select.Item label="Yes - Goalie(s) will sub to play outfield" value="2" />
          <Select.Item label="Not sure yet" value="3" />
        </Select>
      </Box>
      </Center>
    }
      <Box>
        <HStack>
        {outPutDedGoalieTrueFalse()}
        <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeDedicatedGoalie()}>Change</Button>
        </HStack>
      </Box>
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

export default SelectDedicatedGoalie;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateAwayTeamDetails } from '../../Reducers/awayTeamDetails';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const SelectOppTeam = (props)=>{

  const [oppTeam, setOppTeam] = useState('');
  const [oppTeamId, setOppTeamId] = useState(0);

  let games = useSelector(state => state.games.games);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let checkSort = useSelector(state => state.checkSort.checkSort);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  const { navigate } = props.navigation;

  useEffect(() => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    if (props.whereFrom === 1) {
      const teamName = _games[0].teamNames.awayTeamName
      const valueInt = _games[0].teamNames.awayTeamId
      setOppTeam(teamName)
      setOppTeamId(valueInt)
    }

  },[games[0].teamNames.awayTeamName])

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
      const teamName = _games[0].teamNames.awayTeamName
      const valueInt = _games[0].teamNames.awayTeamId
      setOppTeam(teamName)
      setOppTeamId(valueInt)
    //}

  },[])


  /*
    useEffect(() => {
      let _games = []
      try {
        _games = [...games]
      }
      catch {
        _games = [{...games}]
      }

      if (checkSort !== 2) {
        const valueInt = ''
        _games[0].teamNames.awayTeamName = ''
        _games[0].teamNames.awayTeamShortName = ''
        _games[0].teamNames.awayTeamId = 99999998
        setOppTeam(valueInt)
        setOppTeamId(0)
      }

    }, [checkSort])
    */

  const addGameTimeSelect = (value: string) => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    if (value === 'new') {
      navigate('AddTeamHome', {
        teamType: 1,
        whereFrom: 66
      });
    }
    else {
   //console.log('addGameTimeSelect hit');
      let valueInt = Number(value)
      const teamIndex = teamNames.findIndex(x => x.id === valueInt);
      const teamName = teamNames[teamIndex].teamName
      const teamNameShort = teamNames[teamIndex].teamNameShort
      const teamAwayId = teamNames[teamIndex].id
      _games[0].teamNames.awayTeamName = teamName
      _games[0].teamNames.awayTeamShortName = teamNameShort
      _games[0].teamNames.awayTeamId = teamAwayId
      setOppTeam(teamName)
      setOppTeamId(valueInt)
      dispatch(updateGames(_games))
      dispatch(updateAwayTeamDetails(teamName, teamNameShort, teamAwayId))

      const teamIdCodeGames = _games[0].teamIdCode
      const gameIdDb = _games[0].gameIdDb

      /*
      function findUnsupportedFields(obj, path = '') {
        for (const key in obj) {
          const value = obj[key];
          const fullPath = path ? `${path}.${key}` : key;

          if (value === undefined) {
            console.warn(`Unsupported value (undefined) at: ${fullPath}`);
          } else if (typeof value === 'function') {
            console.warn(`Unsupported value (function) at: ${fullPath}`);
          } else if (typeof value === 'object' && value !== null) {
            // Firestore supports only plain objects, not class instances or special types
            const isPlainObject = Object.prototype.toString.call(value) === '[object Object]';
            if (!isPlainObject && !Array.isArray(value)) {
              console.warn(`Unsupported object type at: ${fullPath}`);
            } else {
              findUnsupportedFields(value, fullPath);
            }
          }
        }
      }
      */


      //findUnsupportedFields(_games[0]);
      try {
        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: _games[0],
         })
      } catch (error) {
        console.error("Firestore write error:", error);
      }

    }
  }

  const changeTime = () => {

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

 //console.log('changeTime hit');
    const valueInt = ''
    _games[0].teamNames.awayTeamName = ''
    _games[0].teamNames.awayTeamShortName = ''
    _games[0].teamNames.awayTeamId = 99999998
    setOppTeam(valueInt)
    setOppTeamId(0)
    dispatch(updateGames(_games))

    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: _games[0],
     })

  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>

    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      Select Opposition Team
    </Text>
    {(oppTeamId === 0 || oppTeamId === 99999998)   &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={oppTeamId} minWidth="100%" bg="#333" accessibilityLabel="Select Game-Time" placeholder="Select Game-Time" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1}  onValueChange={addGameTimeSelect.bind(this)} >
        <Select.Item label="+Add new team" value="new" />
        {teamNames !== "" ? (
            teamNames.map(item => {
              if (item.teamType !== 0) {
                return <Select.Item label={item.teamName} value={item.id} />;
              }
            })
        ) : (
            <Picker.Item label="Loading..." value="0" />
        )}
        </Select>
      </Box>
      </Center>
    }
    {oppTeamId > 0 &&
      <Box>
      <HStack>
      <Text style={{paddingTop: 5, color: '#fff'}}>{oppTeam}</Text>
      <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline"}} variant="link" onPress={() => changeTime()}>Change team</Button>
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

export default SelectOppTeam;

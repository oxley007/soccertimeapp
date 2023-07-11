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

const SelectOppTeam = (props)=>{

  const [oppTeam, setOppTeam] = useState('');
  const [oppTeamId, setOppTeamId] = useState(0);

  let games = useSelector(state => state.games.games);
  let teamNames = useSelector(state => state.teamNames.teamNames);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  const { navigate } = props.navigation;

  useEffect(() => {

    if (props.whereFrom === 1) {
      const teamName = games[0].teamNames.awayTeamName
      const valueInt = games[0].teamNames.awayTeamId
      setOppTeam(teamName)
      setOppTeamId(valueInt)
    }

  },[games[0].teamNames.awayTeamName])

  const addGameTimeSelect = (value: string) => {

    if (value === 'new') {
      navigate('AddTeamHome', {
        teamType: 1,
        whereFrom: 66
      });
    }
    else {

      let valueInt = Number(value)
      const teamIndex = teamNames.findIndex(x => x.id === valueInt);
      const teamName = teamNames[teamIndex].teamName
      const teamNameShort = teamNames[teamIndex].teamNameShort
      const teamAwayId = teamNames[teamIndex].id
      games[0].teamNames.awayTeamName = teamName
      games[0].teamNames.awayTeamShortName = teamNameShort
      games[0].teamNames.awayTeamId = teamAwayId
      setOppTeam(teamName)
      setOppTeamId(valueInt)
      dispatch(updateGames(games))
    }
  }

  const changeTime = () => {

    const valueInt = ''
    games[0].teamNames.awayTeamName = ''
    games[0].teamNames.awayTeamShortName = ''
    games[0].teamNames.awayTeamId = 99999998
    setOppTeam(valueInt)
    setOppTeamId(0)
    dispatch(updateGames(games))

  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={styles.linearGradient}>

    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      Select Opposition Team
    </Text>
    {oppTeamId === 0 &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={oppTeamId} minWidth="100%" bg="#fff" accessibilityLabel="Select Game-Time" placeholder="Select Game-Time" _selectedItem={{
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

export default SelectOppTeam;

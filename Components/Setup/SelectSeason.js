import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateSeasons } from '../../Reducers/seasons';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const SelectSeason = (props)=>{

  const [season, setSeason] = useState('');
  const [seasonId, setSeasonId] = useState(0);

  let games = useSelector(state => state.games.games);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  const { navigate } = props.navigation;

  useEffect(() => {

    if (props.whereFrom === 2) {
      const seasonYear = games[0].season.season
      const valueInt = games[0].season.id
      setSeason(seasonYear)
      setSeasonId(valueInt)
    }

  },[games[0].season.season])

  useEffect(() => {

    if (props.whereFrom === 7) {
      console.log(seasonsDisplay + ' what is seasonsDisplay');
      const seasonYear = seasonsDisplay
      console.log(seasonYear + ' what is seasonYear');

      const seasonIndex = seasons.findIndex(x => x.season === seasonsDisplay);
      let valueInt = 0
      try {
      valueInt = seasons[seasonIndex].id
      }
      catch {
        valueInt = 0
      }
      setSeason(seasonYear)
      setSeasonId(valueInt)
    }

  },[seasonsDisplay])

  const addSeasonSelect = (value: string) => {

    if (value === 'new') {
      navigate('AddSeasonHome');
    }
    else {

      let valueInt = Number(value)
      const seasonIndex = seasons.findIndex(x => x.id === valueInt);
      const seasonName = seasons[seasonIndex].season
      const seasonId = seasons[seasonIndex].id
      games[0].season.season = seasonName
      games[0].season.id = seasonId
      setSeason(seasonName)
      setSeasonId(valueInt)
      dispatch(updateGames(games))
      dispatch(updateSeasons(seasons, seasonName, seasonIndex))
    }
  }

  const changeTime = () => {

    const valueInt = ''
    games[0].season.season = ''
    games[0].season.id = 99999999
    setSeason(valueInt)
    setSeasonId(0)
    dispatch(updateGames(games))
    //dispatch(updateSeasons(seasons, ''))
  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a855f7', '#e879f9']} style={props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradient}>
    {seasonId > 0 &&
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      Current Season Selected:
    </Text>
    }
    {seasonId === 0 &&
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
      Select Current Season
    </Text>
    }
    {seasonId === 0 &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={seasonId} minWidth="100%" bg="#fff" accessibilityLabel="Select Game-Time" placeholder="Select Season" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1}  onValueChange={addSeasonSelect.bind(this)} >
        <Select.Item label="+Add new season" value="new" />
        {seasons !== "" ? (
            seasons.map(item => {
              if (item.teamType !== 0) {
                return <Select.Item label={item.season} value={item.id} />;
              }
            })
        ) : (
            <Picker.Item label="Loading..." value="0" />
        )}
        </Select>
      </Box>
      </Center>
    }
    {seasonId > 0 &&
      <Box>
      <HStack>
      <Text style={{fontSize: 20, paddingTop: 5, color: '#fff', fontWeight: '700'}}>{season}</Text>
      <Button size="xs" _text={{fontSize: "xs", textDecorationLine: true}} variant="link" onPress={() => changeTime()}>Change Season</Button>
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
  linearGradientSeven: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
    marginBottom: 15
  },
})

export default SelectSeason;

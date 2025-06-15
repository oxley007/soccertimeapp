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

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

    if (props.whereFrom === 2) {
      const seasonYear = _games[0].season.season
      const valueInt = _games[0].season.id
      setSeason(seasonYear)
      setSeasonId(valueInt)
    }

  },[games[0].season.season])

  useEffect(() => {

    if (props.whereFrom === 7) {
   //console.log(seasonsDisplay + ' what is seasonsDisplay');
      const seasonYear = seasonsDisplay
   //console.log(seasonYear + ' what is seasonYear');

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

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }

  //console.log(props.addTeamOnly + ' props.addTeamOnly chekcy');

    if (value === 'new') {
      navigate('AddSeasonHome', {
        whereFrom: props.whereFrom,
        addTeamOnly: props.addTeamOnly,
        teamId: props.teamIdCode,
      });
    }
    else {

   //console.log(JSON.stringify(_games[0]) + ' _games[0] first check.');

      let valueInt = Number(value)
      const seasonIndex = seasons.findIndex(x => x.id === valueInt);
      const seasonName = seasons[seasonIndex].season
      const seasonId = seasons[seasonIndex].id
      _games[0].season.season = seasonName
      _games[0].season.id = seasonId
      setSeason(seasonName)
      setSeasonId(valueInt)
      dispatch(updateGames(_games))

      const teamIdCodeGames = _games[0].teamIdCode
      const gameIdDb = _games[0].gameIdDb

   //console.log(teamIdCodeGames + ' teamIdCodeGames check');
   //console.log(gameIdDb + ' gameIdDb check');


        firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
           game: _games[0],
         })


      dispatch(updateSeasons(seasons, seasonName, seasonId))

      const seasonsSave = seasons


     userRef.doc("seasons").set({
         seasons: seasonsSave,
       })
       .catch(error => this.setState({ errorMessage: error.message }))

       firestore().collection(teamIdCodeGames).doc('seasons').set({
          seasons: seasonsSave,
        })




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

    const valueInt = ''
    _games[0].season.season = ''
    _games[0].season.id = 99999999
    setSeason(valueInt)
    setSeasonId(0)
    dispatch(updateGames(_games))

    const teamIdCodeGames = _games[0].teamIdCode
    const gameIdDb = _games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: _games[0],
     })
    //dispatch(updateSeasons(seasons, ''))
  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box shadow="7">
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={ props.isOpen === 0 ? styles.linearGradientIsOpenZero : props.whereFrom === 7 ? styles.linearGradientSeven : styles.linearGradient}>
    {seasonId > 0 &&
      <View>
        {props.isOpen === 1 &&
          <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3}}>
            Current Season Selected:
          </Text>
        }
      </View>
    }
    {seasonId === 0 &&
    <Text style={{fontSize: 20, color: '#fff', fontWeight: '400', textAlign: 'left', paddingBottom: 3, paddingTop: 10}}>
      Select Current Season
    </Text>
    }
    {seasonId === 0 &&
      <Center>
      <Box maxW="100%">
        <Select selectedValue={seasonId} minWidth="100%" bg="#333" accessibilityLabel="Select Game-Time" placeholder="Select Season" _selectedItem={{
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
      {props.isOpen === 0 &&
        <HStack>
        <Text style={{fontSize: 12, paddingTop: 5, color: '#fff', fontWeight: '300'}}>Current Season Selected: {season}</Text>
        <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeTime()}>Change</Button>
        </HStack>
      }
      {props.isOpen === 1 &&
        <HStack>
        <Text style={{fontSize: 20, paddingTop: 5, color: '#fff', fontWeight: '700'}}>{season}</Text>
        <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeTime()}>Change</Button>
        </HStack>
      }
      {props.whereFrom !== 7 &&
      <HStack>
      <Text style={{fontSize: 20, paddingTop: 5, color: '#fff', fontWeight: '700'}}>{season}</Text>
      <Button size="xs" _text={{fontSize: "xs", textDecorationLine: "underline", color: '#E879F9'}} variant="link" onPress={() => changeTime()}>Change</Button>
      </HStack>
      }
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

export default SelectSeason;

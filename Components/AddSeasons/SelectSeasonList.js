import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, FlatList, VStack, HStack, Spacer } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
const deleteIcon = <Icon name="delete" size={20} color="#fff" />;

import { updateGames } from '../../Reducers/games';

import AddPositions from '../AddPositions/AddPositions'
import SubstitutionTimes from '../Substitution/SubstitutionTimes'
import GameTimeSubTime from '../Game/GameTimeSubTime'
import SeasonStats from '../SeasonStats/SeasonStats'
import SeasonPositionStats from '../SeasonStats/SeasonPositionStats'

const SelectSeasonList = (props)=>{

  const [getTeamId, setGetTeamId] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenPlayer, setIsOpenPlayer] = React.useState(false);

  let seasons = useSelector(state => state.seasons.seasons);
  let games = useSelector(state => state.games.games);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const whereFrom = props.whereFrom

  const { navigate } = props.navigation;


  const deleteSeason = (item) => {

    const seasonIndex = seasons.findIndex(x => x.id === item.id);
    seasons.splice(seasonIndex, 1); // 2nd parameter means remove one item only

  }

  const getPlayers = () => {

    let _seasons = []
    try {
      _seasons = [...seasons]
    }
    catch {
      _seasons = [{...seasons}]
    }

    let _games = []
    try {
      _games = [...games]
    }
    catch {
      _games = [{...games}]
    }


      return (
        <Box minW="100%" mt="3">
          <FlatList data={_seasons} renderItem={({
            item
            }) =>
            <View style={{marginBottom: 10}}>
            {item.delete !== true &&
              <Box shadow="7">
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradient}>
                <Box borderBottomWidth="1" _dark={{
                  borderColor: "muted.50"
                }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                  <HStack space={[2, 3]} justifyContent="space-between">
                  <Center>
                    <VStack>
                      <Text _dark={{
                        color: "warmGray.50"
                      }} color="#fff" bold style={{fontSize: 20}}>
                          {item.season}
                        </Text>
                    </VStack>
                    </Center>
                    <Spacer />
                    <Button ml="0" size="xs" variant="unstyled" onPress={() => deleteSeason(item)}>{deleteIcon}</Button>
                  </HStack>
                  </Box>

                  </LinearGradient>
                </Box>
              }
            </View>
        }
          keyExtractor={item => item.id} />
    </Box>
      )
    }

  const teamType = props.teamType

        return (

          <ScrollView>
              {getPlayers()}
          </ScrollView>

        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
})

export default SelectSeasonList;

import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { updateGames } from '../../Reducers/games';
import { updateTeamNames } from '../../Reducers/teamNames';
//import { updateSeasons } from '../../Reducers/grades';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

const SelectAgeGrade = (props)=>{

  const [grade, setGrade] = useState('');
  const [gradeId, setGradeId] = useState('');

  let games = useSelector(state => state.games.games);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  //let grades = useSelector(state => state.grades.grades);
  //let gradesDisplay = useSelector(state => state.grades.gradesDisplay);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')


  //const { navigate } = props.navigation;


  const addGradeSelect = (value: string) => {

      //let valueInt = Number(value)
      //const gradeIndex = grades.findIndex(x => x.id === valueInt);
      //const gradeName = grades[gradeIndex].grade

    //console.log(value + ' does value work?');
      let gradeShortStr = ''
      if (value === 'Senior (18+)') {
        gradeShortStr = 'over18'
      }
      else {
        gradeShortStr = 'u18'
      }
      games[0].grade = gradeShortStr
      //games[0].grade.id = gradeId
      setGrade(value)
      setGradeId(gradeShortStr)
      dispatch(updateGames(games))

      const teamIdCodeGames = games[0].teamIdCode
      const gameIdDb = games[0].gameIdDb

   //console.log(gradeShortStr + ' gradeShortStr');
   //console.log(props.whereFrom + ' props.whereFrom is??');

      if (props.whereFrom === "editTeam") {

        const teamIndex = teamNames.findIndex(x => x.id === props.teamData.id);
        const teamId = props.teamData.teamId

        teamNames[teamIndex].grade = gradeShortStr

        dispatch(updateTeamNames(teamNames))

        userRef.doc("teamNames").update({
            teamNames: teamNames,
          })
          .catch(error => this.setState({ errorMessage: error.message }))

        //console.log('hitting test add?');
          //const teamName = 'teamTest3'
          //const teamId = 'AO123'
          firestore().collection(teamId).doc(teamId).update({
             grade: gradeShortStr
           })

      }

      /*
      firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
         game: games[0],
       })
       */
      //dispatch(updateSeasons(grades, gradeName))

  }

  const changeGrade = () => {

    const valueInt = ''
    games[0].grade = ''
    //games[0].grade = 99999999
    setGrade(valueInt)
    setGradeId('')
    dispatch(updateGames(games))

    const teamIdCodeGames = games[0].teamIdCode
    const gameIdDb = games[0].gameIdDb

    firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
       game: games[0],
     })
    //dispatch(updateSeasons(grades, ''))
  }

  //onValueChange={itemValue => setService(itemValue)}

  return (
    <Box>

      <Center>
      <Box maxW="100%">
        <Select selectedValue={grade} minWidth="100%" style={{color: '#fff'}} bg="#333" accessibilityLabel="Select Age Grade" placeholder="Select Age Grade" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1}  onValueChange={addGradeSelect.bind(this)} >
        <Select.Item label="Junior/Youth (U18)" value="Junior/Youth (U18)" />
        <Select.Item label="Senior (18+)" value="Senior (18+)" />
        </Select>
      </Box>
      </Center>

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

export default SelectAgeGrade;

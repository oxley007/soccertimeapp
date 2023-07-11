// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import {Row,Col,Container,Content} from 'native-base';

//import LinearGradient from 'react-native-linear-gradient';

//import SplashScreen from 'react-native-splash-screen';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class Loading extends React.Component {

  componentDidMount() {
    //SplashScreen.hide()
    auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })
  }


  render() {
    return (
                <Text style={styles.whiteText}>Loading...</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStylingCol :{
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 0,
    justifyContent: 'center'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  whiteText: {
    color: '#fff',
  }
})

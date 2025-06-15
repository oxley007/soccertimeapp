// Loading.js
//import React from 'react'
import React, { useEffect, useState, Component, useRef } from 'react'
//import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Animated } from 'react-native'
//import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import {Row,Col,Container,Content} from 'native-base';

//import LinearGradient from 'react-native-linear-gradient';

import SplashScreen from 'react-native-splash-screen';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

let signedOut = false

try {
  signedOut = props.route.params.signedOut
}
catch {
  //nothing.
}



//export default class Loading extends React.Component {
  const Loading = (props)=>{

    //let teamNames = useSelector(state => state.teamNames.teamNames);
    let userProfile = useSelector(state => state.userProfile.userProfile);

    const { navigate } = props.navigation;

  //purchaseUpdateSubscription = null;
  //purchaseErrorSubscription = null;

  /*
  componentDidMount() {
    //SplashScreen.hide()
    auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })

  }
  */

  useEffect(() => {
    SplashScreen.hide()
 //console.log(userProfile + ' what is userProfile?');

    auth().onAuthStateChanged(user => {
   //console.log(user + ' what is user?');
     if (!user) {
     //console.log('hitting here loading 4');
       navigate('SignUp');
     }
      else if (userProfile === 1) {
      //console.log('hitting here loading 1');
        navigate('Home')
      }
      else if (userProfile === 2) {
      //console.log('hitting here loading 2');
        navigate('HomePlayer');
      }
      else if (userProfile === 3) {
      //console.log('hitting here loading 3');
        navigate('HomePlayer');
      }
      else {
      //console.log('hitting here loading 5');
        navigate(user ? 'HomeSelectProfile' : 'SignUp', {
          newSignIn: true,
        })
      }
      //this.props.navigation.navigate(user ? 'Home' : 'SignUp')
      //navigate(user ? 'Home' : 'SignUp')
    })
  }, [])

  /*
  useEffect(() => {
 //console.log(signedOut + ' what is signedOut?');

    auth().onAuthStateChanged(user => {
   //console.log(user + ' what is user signedOut?');
      if (userProfile === 1) {
      //console.log('hitting here loading 1 signedOut');
        navigate('Home')
      }
      else if (userProfile === 2) {
      //console.log('hitting here loading 2 signedOut');
        navigate('HomePlayer');
      }
      else if (userProfile === 3) {
      //console.log('hitting here loading 3 signedOut');
        navigate('HomePlayer');
      }
      else if (user === null) {
      //console.log('hitting here loading 4 signedOut');
        navigate('SignUp');
      }
      else {
      //console.log('hitting here loading 5 signedOut');
        navigate(user ? 'HomeSelectProfile' : 'SignUp', {
          newSignIn: true,
        })
      }
      //this.props.navigation.navigate(user ? 'Home' : 'SignUp')
      //navigate(user ? 'Home' : 'SignUp')
    })
  }, [signedOut])
  */


/*
  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }

    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }
  */


  return (
                <Text style={styles.whiteText}>Loading...</Text>
    )
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


export default Loading;

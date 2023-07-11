import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, PixelRatio, Animated, Image } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition } from 'native-base';

const HeaderImage = (props)=>{

        return (
          <Center maxW="200" style={{marginLeft: 30, marginRight: 30}} >
    <Image
        style={styles.tinyLogo}
        source={require('../../assets/SoccerTimeLive-logo300pxTrans.png')}
      />
    </Center>
        )
    }


const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    resizeMode: 'contain',
  },
})

export default HeaderImage;

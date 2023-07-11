/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image} from 'react-native';
/*
import {
      createStackNavigator,
      createAppContainer,
      DrawerItems
    } from 'react-navigation';
    */

    import {
      DrawerItems
} from '@react-navigation/drawer'


import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createAppContainer } from "react-navigation";

  import { createDrawerNavigator } from '@react-navigation/drawer';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

    //const Drawer = createDrawerNavigator();
//import LoginScreen from './Components/App/LoginScreen.js';


import Home from './Components/App/Home.js';
//import SignUp from './Components/App/SignUp.js';
//import SignOut from './Components/App/SignOut.js';
//import Loading from './Components/App/Loading.js';
//import Login from './Components/App/Login.js';



//import MenuHidden from './MenuHidden';


class Hidden extends React.Component {
  render() {
    return null;
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#12c2e9' }}>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./assets/4dot6-logo-500px.png')} style={{height: 120, width: 120, borderRadius: 60, borderColor: '#fff', borderWidth:4}} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
  );


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" contentComponent={CustomDrawerComponent} drawerStyle={{
        backgroundColor: '#333',
        color: '#fff',
        textColor: '#fff'
      }}
      drawerContentOptions={{activeTintColor:'#fff', inactiveTintColor:'#fff', itemsContainerStyle: {
    marginTop: 50,
  }, labelStyle: {

    },
    itemStyle: {

      }}}
  >
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12c2e9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
});


/*
<Drawer.Screen name="SignOut" component={SignOut} options={{ drawerLabel: 'Sign Out'}} />
<Drawer.Screen name="SignUp" component={SignUp} options={{ drawerLabel: ''}} />
<Drawer.Screen name="Loading" component={Loading} options={{ drawerLabel: ''}} />
<Drawer.Screen name="Login" component={Login} options={{ drawerLabel: ''}} />
*/

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

import Stopwatch from './Components/Game/Stopwatch.js';
import HeaderImage from './Components/App/HeaderImage.js';


    //const Drawer = createDrawerNavigator();
//import LoginScreen from './Components/App/LoginScreen.js';


import Home from './Components/App/Home.js';
import SignUp from './Components/App/SignUp.js';
import SignOut from './Components/App/SignOut.js';
import Loading from './Components/App/Loading.js';
import Login from './Components/App/Login.js';
import AddTeamHome from './Components/AddTeam/AddTeamHome.js';
import AddPlayersHome from './Components/AddPlayers/AddPlayersHome.js';
import GameHome from './Components/Game/GameHome.js';
import SubstitutionHome from './Components/Substitution/SubstitutionHome.js';
import GameEnds from './Components/Game/GameEnds.js';
import SetupHome from './Components/Setup/SetupHome.js';
import EditTeamName from './Components/AddTeam/EditTeamName.js';
import EditPlayerName from './Components/AddPlayers/EditPlayerName.js';
import EventsHome from './Components/Events/EventsHome.js';
import AddSeasonHome from './Components/AddSeasons/AddSeasonHome.js';
import PreviousGamesHome from './Components/PreviousGames/PreviousGamesHome.js';
import PrevGamesEventsHome from './Components/PreviousGames/PrevGamesEventsHome.js';




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
      <Drawer.Navigator initialRouteName="Loading" contentComponent={CustomDrawerComponent} drawerStyle={{
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
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e879f9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
  >
        <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Home', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="SignOut" component={SignOut} options={{ drawerLabel: 'Sign Out', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="SignUp" component={SignUp} options={{ drawerLabel: 'Sign Up', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="Loading" component={Loading} options={{ drawerLabel: 'Loading...', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="Login" component={Login} options={{ drawerLabel: 'Login', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="AddTeamHome" component={AddTeamHome} options={{ drawerLabel: 'Add Team', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="AddPlayersHome" component={AddPlayersHome} options={{ drawerLabel: 'Add Players', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="GameHome" component={GameHome} options={{drawerLabel: '', title: 'Live Game', headerTitle: (props) => <Stopwatch /> }} />
        <Drawer.Screen name="SubstitutionHome" component={SubstitutionHome} options={{ drawerLabel: 'Make Subs', headerTitle: (props) => <Stopwatch /> }} />
        <Drawer.Screen name="GameEnds" component={GameEnds} options={{ drawerLabel: 'Game Over!', headerTitle: (props) => <Stopwatch /> }} />
        <Drawer.Screen name="SetupHome" component={SetupHome} options={{ drawerLabel: 'Game Options', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="EditTeamName" component={EditTeamName} options={{ drawerLabel: 'EditTeamName', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="EditPlayerName" component={EditPlayerName} options={{ drawerLabel: 'EditPlayerName', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="EventsHome" component={EventsHome} options={{ drawerLabel: 'EventsHome', headerTitle: (props) => <Stopwatch /> }} />
        <Drawer.Screen name="AddSeasonHome" component={AddSeasonHome} options={{ drawerLabel: 'AddSeasonHome', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="PreviousGamesHome" component={PreviousGamesHome} options={{ drawerLabel: 'PreviousGamesHome', headerTitle: (props) => <HeaderImage /> }} />
        <Drawer.Screen name="PrevGamesEventsHome" component={PrevGamesEventsHome} options={{ drawerLabel: 'PrevGamesEventsHome', headerTitle: (props) => <HeaderImage /> }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

/* to hide mmenu in grawer - add this to options:
drawerItemStyle: {
       display: "none",
     },

  }}
*/

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

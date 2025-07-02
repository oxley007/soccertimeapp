/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {Component, useEffect} from 'react';
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
import Purchases from 'react-native-purchases';
import { ApolloProvider } from '@apollo/client';
import { client } from './Util/apolloClient'; // your Apollo client setup


import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createAppContainer } from "react-navigation";

  import { createDrawerNavigator } from '@react-navigation/drawer';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//import {withIAPContext} from 'react-native-iap';

import Stopwatch from './Components/Game/Stopwatch.js';
import HeaderImage from './Components/App/HeaderImage.js';


    //const Drawer = createDrawerNavigator();
//import LoginScreen from './Components/App/LoginScreen.js';


import Home from './Components/App/Home.js';
import KnightMoves from './Components/SelectPlayers/KnightMoves.tsx';
import SelectPlayersDragDrop from './Components/SelectPlayers/SelectPlayersDragDrop.tsx';
import HomeSelectProfile from './Components/App/HomeSelectProfile.js';
import HomePlayer from './Components/HomePlayer/HomePlayer.js';
import HomePlayerAddTeam from './Components/HomePlayer/HomePlayerAddTeam.js';
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
import PlayerStatsHome from './Components/PlayerStats/PlayerStatsHome.js';
import IndividualPlayerStatsHome from './Components/PlayerStats/IndividualPlayerStatsHome.js';
import SendPlayerInviteHome from './Components/SendPlayerInvite/SendPlayerInviteHome.js';
import HomePlayerTeamsList from './Components/HomePlayer/HomePlayerTeamsList.js';
import HomePlayerPreviousGamesHome from './Components/HomePlayer/HomePlayerPreviousGamesHome.js';
import AddPlayerHome from './Components/HomePlayer/AddPlayerHome.js';
import AddPlayerAdd from './Components/HomePlayer/AddPlayerAdd.js';
import HomePlayerPlayersList from './Components/HomePlayer/HomePlayerPlayersList.js';
import HomePlayerStatsHome from './Components/HomePlayer/HomePlayerStatsHome.js'
import HomePlayerLiveScores from './Components/HomePlayer/HomePlayerLiveScores.js'
import EventsHomePlayer from './Components/Events/EventsHomePlayer.js'
import StatsHomePlayer from './Components/Events/StatsHomePlayer.js'
import Iap from './Components/Iap/Iap.js'
import IapConfrim from './Components/Iap/IapConfrim.js'
import StepOne from './Components/Instructions/StepOne.js'
import StepTwo from './Components/Instructions/StepTwo.js'
import StepThree from './Components/Instructions/StepThree.js'
import StepImportant from './Components/Instructions/StepImportant.js'
import StepFour from './Components/Instructions/StepFour.js'
import StepFive from './Components/Instructions/StepFive.js'
import StepSix from './Components/Instructions/StepSix.js'
import StepSeven from './Components/Instructions/StepSeven.js'
import StepFirst from './Components/Instructions/StepFirst.js'
import StepLast from './Components/Instructions/StepLast.js'
import EditGameTime from './Components/Game/EditGameTime.js'
import SeasonPositionSortAllHome from './Components/PlayerStats/SeasonPositionSortAllHome.js'
import SelectSeasonHome from './Components/AddSeasons/SelectSeasonHome.js'
import DeleteUser from './Components/App/DeleteUser.js';
import AddPlayersList from './Components/SelectPlayers/AddPlayersList.js';
import DrillsHome from './Components/Drills/DrillsHome.js';
import DrillsInstructions from './Components/Drills/DrillsInstructions.js';
import SendCoachIdHome from './Components/SendCoachId/SendCoachIdHome.js';
import HomeParentAddTeam from './Components/App/HomeParentAddTeam.js';
import SelectPlayerTimeDesc from './Components/SelectPlayers/SelectPlayerTimeDesc.js';
import SupportPage from './Components/App/SupportPage.js';
import SelectSubTimeDesc from './Components/SelectPlayers/SelectSubTimeDesc.js';
import AddAiTeamPlayersPositionHome from './Components/AddAiPositions/AddAiTeamPlayersPositionHome.js';
import AppolloHooksTest from './Components/GraphQLTest/AppolloHooksTest.tsx';




//import MenuHidden from './MenuHidden';
import * as Sentry from '@sentry/react-native';

const commonConfig = {
  dsn: 'https://your-dsn@sentry.io/project-id',
  sendDefaultPii: true,
  integrations: [Sentry.feedbackIntegration()], // remove heavy mobileReplayIntegration in dev
};

if (__DEV__) {
  Sentry.init({
    ...commonConfig,
    // Disable debug logs to reduce console spam and overhead
    debug: false,
    // Disable session replay in dev (heavy)
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
  });
} else {
  Sentry.init({
    ...commonConfig,
    integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
    replaysSessionSampleRate: 0.1,  // production replay sampling
    replaysOnErrorSampleRate: 1,
  });
}



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

export default Sentry.wrap(function App() {

  useEffect(() => {
    const apiKey = Platform.OS === 'ios'
      ? 'appl_AiWRjxtNooUlINbXhTHZhTrLkWv'
      : 'goog_pfrcDUZxKWnrnDzWlAkAGXYDZpG';

    Purchases.configure({ apiKey });
  }, []);

  return (
    <ApolloProvider client={client}>
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
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
          <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Home', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="KnightMoves" component={KnightMoves} options={{ drawerLabel: 'KnightMoves', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}}} />
          <Drawer.Screen name="SelectPlayersDragDrop" component={SelectPlayersDragDrop} options={{ drawerLabel: 'SelectPlayersDragDrop', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="HomeSelectProfile" component={HomeSelectProfile} options={{ drawerLabel: 'Change Profile', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, headerShown: false }} />
          <Drawer.Screen name="HomePlayer" component={HomePlayer} options={{ drawerLabel: 'Player Home', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="HomePlayerAddTeam" component={HomePlayerAddTeam} options={{ drawerLabel: 'Player Home Add Team', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="SignUp" component={SignUp} options={{ drawerLabel: 'Sign Up', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="Loading" component={Loading} options={{ drawerLabel: 'Loading...', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="Login" component={Login} options={{ drawerLabel: 'Login', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="AddTeamHome" component={AddTeamHome} options={{ drawerLabel: 'Add Team', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="AddPlayersHome" component={AddPlayersHome} options={{ drawerLabel: 'Add Players', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false  }} />
          <Drawer.Screen name="GameHome" component={GameHome}  options={{ drawerLabel: 'Game Home', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }}/>
          <Drawer.Screen name="SubstitutionHome" component={SubstitutionHome} options={{ headerShown: false, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="GameEnds" component={GameEnds} options={{ drawerLabel: 'Game Home', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="SetupHome" component={SetupHome} options={{ drawerLabel: 'Game Options', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="EditTeamName" component={EditTeamName} options={{ drawerLabel: 'EditTeamName', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="EditPlayerName" component={EditPlayerName} options={{ drawerLabel: 'EditPlayerName', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="EventsHome" component={EventsHome} options={{ drawerLabel: 'EventsHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="AddSeasonHome" component={AddSeasonHome} options={{ drawerLabel: 'AddSeasonHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="PreviousGamesHome" component={PreviousGamesHome} options={{ drawerLabel: 'PreviousGamesHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="PrevGamesEventsHome" component={PrevGamesEventsHome} options={{ drawerLabel: 'PrevGamesEventsHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="PlayerStatsHome" component={PlayerStatsHome} options={{ drawerLabel: 'PlayerStatsHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="IndividualPlayerStatsHome" component={IndividualPlayerStatsHome} options={{ drawerLabel: 'IndividualPlayerStatsHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="SendPlayerInviteHome" component={SendPlayerInviteHome} options={{ drawerLabel: 'Share Live Scores', headerTitle: (props) => <HeaderImage /> }} />
          <Drawer.Screen name="HomePlayerTeamsList" component={HomePlayerTeamsList} options={{ drawerLabel: 'HomePlayerTeamsList', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="HomePlayerPreviousGamesHome" component={HomePlayerPreviousGamesHome} options={{ drawerLabel: 'HomePlayerPreviousGamesHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="AddPlayerHome" component={AddPlayerHome} options={{ drawerLabel: 'AddPlayerHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="AddPlayerAdd" component={AddPlayerAdd} options={{ drawerLabel: 'AddPlayerAdd', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="HomePlayerPlayersList" component={HomePlayerPlayersList} options={{ drawerLabel: 'HomePlayerPlayersList', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="HomePlayerStatsHome" component={HomePlayerStatsHome} options={{ drawerLabel: 'HomePlayerStatsHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="HomePlayerLiveScores" component={HomePlayerLiveScores} options={{ drawerLabel: 'HomePlayerLiveScores', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="EventsHomePlayer" component={EventsHomePlayer} options={{ drawerLabel: 'EventsHomePlayer', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, unmountOnBlur: true }} />
          <Drawer.Screen name="StatsHomePlayer" component={StatsHomePlayer} options={{ drawerLabel: 'StatsHomePlayer', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="SignOut" component={SignOut} options={{ drawerLabel: 'Sign Out', headerTitle: (props) => <HeaderImage /> }} />
          <Drawer.Screen name="DeleteUser" component={DeleteUser} options={{ drawerLabel: 'Delete User Profile', headerTitle: (props) => <HeaderImage /> }} />
          <Drawer.Screen name="StepOne" component={StepOne} options={{ drawerLabel: 'StepOne', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepTwo" component={StepTwo} options={{ drawerLabel: 'StepTwo', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepThree" component={StepThree} options={{ drawerLabel: 'StepThree', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepImportant" component={StepImportant} options={{ drawerLabel: 'StepImportant', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepFour" component={StepFour} options={{ drawerLabel: 'StepFour', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepFive" component={StepFive} options={{ drawerLabel: 'StepFive', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepSix" component={StepSix} options={{ drawerLabel: 'StepSix', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepSeven" component={StepSeven} options={{ drawerLabel: 'StepSeven', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="StepFirst" component={StepFirst} options={{ drawerLabel: 'Game Instructions', headerTitle: (props) => <HeaderImage />, headerShown: false, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="StepLast" component={StepLast} options={{ drawerLabel: 'StepLast', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="EditGameTime" component={EditGameTime} options={{ drawerLabel: 'EditGameTime', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="SeasonPositionSortAllHome" component={SeasonPositionSortAllHome} options={{ drawerLabel: 'SeasonPositionSortAllHome', drawerItemStyle: {display: "none"}, headerShown: false }} />
          <Drawer.Screen name="SelectSeasonHome" component={SelectSeasonHome} options={{ drawerLabel: 'SelectSeasonHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="AddPlayersList" component={AddPlayersList} options={{ drawerLabel: 'AddPlayersList', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="DrillsHome" component={DrillsHome} options={{ drawerLabel: 'DrillsHome', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="DrillsInstructions" component={DrillsInstructions} options={{ drawerLabel: 'DrillsInstructions', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="Iap" component={Iap} options={{ drawerLabel: 'Buy Pro', headerTitle: (props) => <HeaderImage /> }} />
          <Drawer.Screen name="IapConfrim" component={IapConfrim} options={{ drawerLabel: 'IapConfrim', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="SendCoachIdHome" component={SendCoachIdHome} options={{ drawerLabel: 'SendCoachIdHome', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="HomeParentAddTeam" component={HomeParentAddTeam} options={{ drawerLabel: 'HomeParentAddTeam', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="SelectPlayerTimeDesc" component={SelectPlayerTimeDesc} options={{ drawerLabel: 'SelectPlayerTimeDesc', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="SupportPage" component={SupportPage} options={{ drawerLabel: 'Contact Support', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage /> }} />
          <Drawer.Screen name="SelectSubTimeDesc" component={SelectSubTimeDesc} options={{ drawerLabel: 'SelectSubTimeDesc', title: 'SoccerTime! Live.', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="AddAiTeamPlayersPositionHome" component={AddAiTeamPlayersPositionHome} options={{ drawerLabel: 'AddAiTeamPlayersPositionHome', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
          <Drawer.Screen name="AppolloHooksTest" component={AppolloHooksTest} options={{ drawerLabel: 'AppolloHooksTest', headerTitle: (props) => <HeaderImage />, drawerItemStyle: {display: "none"} }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
});

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

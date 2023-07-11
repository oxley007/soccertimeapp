import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
//import App from './App0';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import { Provider } from "react-redux";
import { store, persistor } from "./Store/store";
import { PersistGate } from 'redux-persist/integration/react'

import App from './App.tsx';
//import App from './App.js';

/*
import SideBar from "./Components/SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: App },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

*/

class SoccerTimeApp extends Component {

render() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <App />
      </PersistGate>
    </Provider>
          );
        }
      }

AppRegistry.registerComponent('SoccerTimeApp', () => SoccerTimeApp);
//AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Main)); 

//export default HomeScreenRouter;

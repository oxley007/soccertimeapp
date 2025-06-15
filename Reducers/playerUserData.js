
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_PLAYERUSERDATA = 'UPDATE_PLAYERUSERDATA';

export const updatePlayerUserData = ( teams, players, seasons, seasonsDisplay, seasonsDisplayId ) => ({
  type: UPDATE_PLAYERUSERDATA,
  teams,
  players,
  seasons,
  seasonsDisplay,
  seasonsDisplayId
});

const initialState = {
  teams: [],
  players: [],
  seasons: [],
  seasonsDisplay: '',
  seasonsDisplayId: 99999998
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYERUSERDATA:
  //console.log(action.seasons);
      return {
        ...state,
        teams: action.teams,
        players: action.players,
        seasons: action.seasons,
        seasonsDisplay: action.seasonsDisplay,
        seasonsDisplayId: action.seasonsDisplayId,
      };
    default:
      return state;
  }
};

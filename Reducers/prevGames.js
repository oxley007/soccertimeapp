
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_PREVGAMES = 'UPDATE_PREVGAMES';

export const updatePrevGames = ( team, season ) => ({
  type: UPDATE_PREVGAMES,
  team,
  season,
});

const initialState = {
  team: [],
  season: []
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PREVGAMES:
    //console.log(action.seasons);
      return {
        ...state,
        team: action.team,
        season: action.season,
      };
    default:
      return state;
  }
};

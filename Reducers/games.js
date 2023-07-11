
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_GAMES = 'UPDATE_GAMES';

export const updateGames = ( games ) => ({
  type: UPDATE_GAMES,
  games,
});

const initialState = {
  games: [],
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAMES:
    //console.log(action.games);
      return {
        ...state,
        games: action.games,
      };
    default:
      return state;
  }
};

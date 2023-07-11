
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_GAMESETUP = 'UPDATE_GAMESETUP';

export const updateGameSetup = ( gameSetup ) => ({
  type: UPDATE_GAMESETUP,
  gameSetup,
});

const initialState = {
  gameSetup: [],
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAMESETUP:
    //console.log(action.gameSetup);
      return {
        ...state,
        gameSetup: action.gameSetup,
      };
    default:
      return state;
  }
};

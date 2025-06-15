
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_FROMCONTINUEGAME = 'UPDATE_FROMCONTINUEGAME';

export const updateFromContinueGame = ( fromContinueGame ) => ({
  type: UPDATE_FROMCONTINUEGAME,
  fromContinueGame,
});

const initialState = {
  fromContinueGame: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FROMCONTINUEGAME:
  //console.log(action.checkSort);
      return {
        ...state,
        fromContinueGame: action.fromContinueGame,
      };
    default:
      return state;
  }
};

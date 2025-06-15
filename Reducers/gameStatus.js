
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_GAMESTATUS = 'UPDATE_GAMESTATUS';

export const updateGameStatus = ( gameStatus ) => ({
  type: UPDATE_GAMESTATUS,
  gameStatus,
});

const initialState = {
  gameStatus: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAMESTATUS:
  //console.log(action.gameStatus);
      return {
        ...state,
        gameStatus: action.gameStatus,
      };
    default:
      return state;
  }
};

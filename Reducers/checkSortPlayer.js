
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_CHECKSORTPLAYER = 'UPDATE_CHECKSORTPLAYER';

export const updateCheckSortPlayer = ( checkSortPlayer ) => ({
  type: UPDATE_CHECKSORTPLAYER,
  checkSortPlayer,
});

const initialState = {
  checkSortPlayer: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHECKSORTPLAYER:
  //console.log(action.checkSort);
      return {
        ...state,
        checkSortPlayer: action.checkSortPlayer,
      };
    default:
      return state;
  }
};

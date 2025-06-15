
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_POSARRAY = 'UPDATE_POSARRAY';

export const updatePosArray = ( posArray, posArrayReset ) => ({
  type: UPDATE_POSARRAY,
  posArray,
  posArrayReset,
});

const initialState = {
  posArray: [],
  posArrayReset: [],
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POSARRAY:
  //console.log(action.posArray);
      return {
        ...state,
        posArray: action.posArray,
        posArrayReset: action.posArrayReset,
      };
    default:
      return state;
  }
};

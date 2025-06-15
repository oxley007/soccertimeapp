
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_CHECKSORTIAP = 'UPDATE_CHECKSORTIAP';

export const updateCheckSortIap = ( checkSortIap ) => ({
  type: UPDATE_CHECKSORTIAP,
  checkSortIap,
});

const initialState = {
  checkSortIap: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHECKSORTIAP:
  //console.log(action.checkSort);
      return {
        ...state,
        checkSortIap: action.checkSortIap,
      };
    default:
      return state;
  }
};

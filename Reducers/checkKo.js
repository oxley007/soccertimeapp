
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_CHECKKO = 'UPDATE_CHECKKO';

export const updateCheckKo = ( checkKo ) => ({
  type: UPDATE_CHECKKO,
  checkKo,
});

const initialState = {
  checkKo: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHECKKO:
  //console.log(action.checkKo);
      return {
        ...state,
        checkKo: action.checkKo,
      };
    default:
      return state;
  }
};

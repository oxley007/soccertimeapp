
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_CHECKSORT = 'UPDATE_CHECKSORT';

export const updateCheckSort = ( checkSort ) => ({
  type: UPDATE_CHECKSORT,
  checkSort,
});

const initialState = {
  checkSort: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHECKSORT:
  //console.log(action.checkSort);
      return {
        ...state,
        checkSort: action.checkSort,
      };
    default:
      return state;
  }
};

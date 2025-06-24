
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_SUBSUGGESTIONS = 'UPDATE_SUBSUGGESTIONS';

export const updateSubSuggestions = ( seasonSubSuggestions, liveSubSuggestions ) => ({
  type: UPDATE_SUBSUGGESTIONS,
  seasonSubSuggestions,
  liveSubSuggestions
});

const initialState = {
  seasonSubSuggestions: [],
  liveSubSuggestions: [],
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUBSUGGESTIONS:
  //console.log(action.subSuggestions);
      return {
        ...state,
        seasonSubSuggestions: action.seasonSubSuggestions,
        liveSubSuggestions: action.liveSubSuggestions,
      };
    default:
      return state;
  }
};

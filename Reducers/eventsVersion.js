
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_EVENTSVERSION = 'UPDATE_EVENTSVERSION';

export const updateEventsVersion = ( eventsVersion ) => ({
  type: UPDATE_EVENTSVERSION,
  eventsVersion,
});

const initialState = {
  eventsVersion: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EVENTSVERSION:
  //console.log(action.eventsVersion);
      return {
        ...state,
        eventsVersion: action.eventsVersion,
      };
    default:
      return state;
  }
};

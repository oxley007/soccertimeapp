
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_TEAMNAMES = 'UPDATE_TEAMNAMES';

export const updateTeamNames = ( teamNames ) => ({
  type: UPDATE_TEAMNAMES,
  teamNames,
});

const initialState = {
  teamNames: [],
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEAMNAMES:
  //console.log(action.teamNames);
      return {
        ...state,
        teamNames: action.teamNames,
      };
    default:
      return state;
  }
};

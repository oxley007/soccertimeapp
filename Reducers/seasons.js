
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_SEASONS = 'UPDATE_SEASONS';

export const updateSeasons = ( seasons, seasonsDisplay, seasonsDisplayId ) => ({
  type: UPDATE_SEASONS,
  seasons,
  seasonsDisplay,
  seasonsDisplayId,
});

const initialState = {
  seasons: [],
  seasonsDisplay: '',
  seasonsDisplayId: 99999998
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEASONS:
  //console.log(action.seasons);
      return {
        ...state,
        seasons: action.seasons,
        seasonsDisplay: action.seasonsDisplay,
        seasonsDisplayId: action.seasonsDisplayId,
      };
    default:
      return state;
  }
};

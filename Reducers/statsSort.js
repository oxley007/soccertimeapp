
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_STATSSORT = 'ADD_STATSSORT';

export const updateStatsSort = ( statsSort, playerId ) => ({
  type: ADD_STATSSORT,
  statsSort,
});

const initialState = {
  statsSort: [],
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.statsSort + ' statsSort check n');
  switch (action.type) {
    case ADD_STATSSORT:
    return {
      ...state,
      statsSort: action.statsSort,
    };
    default:
      return state;
  }
};

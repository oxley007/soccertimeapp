
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_SORTINDEX = 'ADD_SORTINDEX';

export const updateSortIndex = ( sortIndex, sortIndexType ) => ({
  type: ADD_SORTINDEX,
  sortIndex,
  sortIndexType,
});

const initialState = {
  sortIndex: 0,
  sortIndexType: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.statsSort + ' statsSort check n');
  switch (action.type) {
    case ADD_SORTINDEX:
    return {
      ...state,
      sortIndex: action.sortIndex,
      sortIndexType: action.sortIndexType,
    };
    default:
      return state;
  }
};

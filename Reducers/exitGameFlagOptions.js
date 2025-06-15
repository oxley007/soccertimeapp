
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_EXITGAMEFLAGOPTIONS = 'ADD_EXITGAMEFLAGOPTIONS';

export const updateExitGameFlagOptions = ( exitGameFlagOptions ) => ({
  type: ADD_EXITGAMEFLAGOPTIONS,
  exitGameFlagOptions,
});

const initialState = {
  exitGameFlagOptions: false,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.stoptimer + ' stoptimer check n');
  switch (action.type) {
    case ADD_EXITGAMEFLAGOPTIONS:
    return {
      ...state,
      exitGameFlagOptions: action.exitGameFlagOptions,
    };
    default:
      return state;
  }
};

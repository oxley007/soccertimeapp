
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_EXITGAMEFLAG = 'ADD_EXITGAMEFLAG';

export const updateExitGameFlag = ( exitGameFlag ) => ({
  type: ADD_EXITGAMEFLAG,
  exitGameFlag,
});

const initialState = {
  exitGameFlag: false,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.stoptimer + ' stoptimer check n');
  switch (action.type) {
    case ADD_EXITGAMEFLAG:
    return {
      ...state,
      exitGameFlag: action.exitGameFlag,
    };
    default:
      return state;
  }
};

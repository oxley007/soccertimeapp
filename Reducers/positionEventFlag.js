
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_POSITIONEVENTFLAG = 'ADD_POSITIONEVENTFLAG';

export const updatePositionEventFlag = ( positionEventFlag ) => ({
  type: ADD_POSITIONEVENTFLAG,
  positionEventFlag,
});

const initialState = {
  positionEventFlag: false,
};

//console.log('hitting rootReducer');
//console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.stoptimer + ' stoptimer check n');
  switch (action.type) {
    case ADD_POSITIONEVENTFLAG:
    return {
      ...state,
      positionEventFlag: action.positionEventFlag,
    };
    default:
      return state;
  }
};

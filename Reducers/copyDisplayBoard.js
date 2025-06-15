
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_COPYDISPLAYBOARD = 'ADD_COPYDISPLAYBOARD';

export const updateCopyDisplayBoard = ( copyDisplayBoard ) => ({
  type: ADD_COPYDISPLAYBOARD,
  copyDisplayBoard,
});

const initialState = {
  copyDisplayBoard: false,
};

//console.log('hitting rootReducer');
//console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.stoptimer + ' stoptimer check n');
  switch (action.type) {
    case ADD_COPYDISPLAYBOARD:
    return {
      ...state,
      copyDisplayBoard: action.copyDisplayBoard,
    };
    default:
      return state;
  }
};

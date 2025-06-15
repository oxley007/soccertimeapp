
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_PLAYERINDEX = 'ADD_PLAYERINDEX';

export const updatePlayerIndex = ( playerIndex ) => ({
  type: ADD_PLAYERINDEX,
  playerIndex,
});

const initialState = {
  playerIndex: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.statsSort + ' statsSort check n');
  switch (action.type) {
    case ADD_PLAYERINDEX:
    return {
      ...state,
      playerIndex: action.playerIndex,
    };
    default:
      return state;
  }
};


import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_STATSBOARD = 'ADD_STATSBOARD';

export const updateStatsBoard = ( statsBoard, playerId ) => ({
  type: ADD_STATSBOARD,
  statsBoard,
  playerId,
});

const initialState = {
  statsBoard: false,
  playerId: 99999999,
};

//console.log('hitting rootReducer');
//console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  //console.log(action.statsBoard + ' statsBoard check n');
  switch (action.type) {
    case ADD_STATSBOARD:
    return {
      ...state,
      statsBoard: action.statsBoard,
      playerId: action.playerId,
    };
    default:
      return state;
  }
};

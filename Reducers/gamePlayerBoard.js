
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_GAMEPLAYERBOARD = 'ADD_GAMEPLAYERBOARD';

export const updateGamePlayerBoard = ( gamePlayerBoard, playerId ) => ({
  type: ADD_GAMEPLAYERBOARD,
  gamePlayerBoard,
  playerId
});

const initialState = {
  gamePlayerBoard: false,
  playerId: 99999999,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.gamePlayerBoard + ' gamePlayerBoard check n');
  switch (action.type) {
    case ADD_GAMEPLAYERBOARD:
    return {
      ...state,
      gamePlayerBoard: action.gamePlayerBoard,
      playerId: action.playerId,
    };
    default:
      return state;
  }
};

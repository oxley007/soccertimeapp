
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_GAMEOPTIONBOARD = 'ADD_GAMEOPTIONBOARD';

export const updateGameOptionBoard = ( gameOptionBoard, playerId ) => ({
  type: ADD_GAMEOPTIONBOARD,
  gameOptionBoard,
  playerId
});

const initialState = {
  gameOptionBoard: false,
  playerId: 99999999,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.gameOptionBoard + ' gameOptionBoard check n');
  switch (action.type) {
    case ADD_GAMEOPTIONBOARD:
    return {
      ...state,
      gameOptionBoard: action.gameOptionBoard,
      playerId: action.playerId,
    };
    default:
      return state;
  }
};


import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_GAMEOPTIONBOARDFROM = 'ADD_GAMEOPTIONBOARDFROM';

export const updateGameOptionBoardFrom = ( gameOptionBoardFrom ) => ({
  type: ADD_GAMEOPTIONBOARDFROM,
  gameOptionBoardFrom,
});

const initialState = {
  gameOptionBoardFrom: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.gameOptionBoardFrom + ' gameOptionBoardFrom check n');
  switch (action.type) {
    case ADD_GAMEOPTIONBOARDFROM:
    return {
      ...state,
      gameOptionBoardFrom: action.gameOptionBoardFrom,
    };
    default:
      return state;
  }
};

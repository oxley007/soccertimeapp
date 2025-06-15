
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_GAMEBOARDHIDEBTN = 'ADD_GAMEBOARDHIDEBTN';

export const updateGameBoardHideBtn = ( gameBoardHideBtn ) => ({
  type: ADD_GAMEBOARDHIDEBTN,
  gameBoardHideBtn,
});

const initialState = {
  gameBoardHideBtn: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.stoptimer + ' stoptimer check n');
  switch (action.type) {
    case ADD_GAMEBOARDHIDEBTN:
    return {
      ...state,
      gameBoardHideBtn: action.gameBoardHideBtn,
    };
    default:
      return state;
  }
};

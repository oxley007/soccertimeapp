
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_AITOKENS = 'UPDATE_AITOKENS';

export const updateAiTokens = ( aiTokens ) => ({
  type: UPDATE_AITOKENS,
  aiTokens,
});

const initialState = {
  aiTokens: 10,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AITOKENS:
  //console.log(action.checkSort);
      return {
        ...state,
        aiTokens: action.aiTokens,
      };
    default:
      return state;
  }
};

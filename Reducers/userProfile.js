
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_USERPROFILE = 'UPDATE_USERPROFILE';

export const updateUserProfile = ( userProfile ) => ({
  type: UPDATE_USERPROFILE,
  userProfile,
});

const initialState = {
  userProfile: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERPROFILE:
  //console.log(action.userProfile);
      return {
        ...state,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
};

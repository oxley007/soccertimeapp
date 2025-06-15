
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_PARENTCOACHVIEW = 'UPDATE_PARENTCOACHVIEW';

export const updateParentCoachView = ( parentCoachView ) => ({
  type: UPDATE_PARENTCOACHVIEW,
  parentCoachView,
});

const initialState = {
  parentCoachView: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PARENTCOACHVIEW:
  //console.log(action.parentCoachView);
      return {
        ...state,
        parentCoachView: action.parentCoachView,
      };
    default:
      return state;
  }
};


//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_DRAGDROPDISPLAYCOUNT = 'UPDATE_DRAGDROPDISPLAYCOUNT';

export const updateDragDropDisplayCount = ( dragDropDisplayCount ) => ({
  type: UPDATE_DRAGDROPDISPLAYCOUNT,
  dragDropDisplayCount,
});

const initialState = {
  dragDropDisplayCount: 0,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DRAGDROPDISPLAYCOUNT:
  //console.log(action.userProfile);
      return {
        ...state,
        dragDropDisplayCount: action.dragDropDisplayCount,
      };
    default:
      return state;
  }
};

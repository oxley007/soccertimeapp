
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_ASSIGNEDIDS = 'ADD_ASSIGNEDIDS';

export const updateAssignedIds = ( assignedIds ) => ({
  type: ADD_ASSIGNEDIDS,
  assignedIds,
});

const initialState = {
  assignedIds: [],
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.assignedIds + ' assignedIds check n');
  switch (action.type) {
    case ADD_ASSIGNEDIDS:
    return {
      ...state,
      assignedIds: action.assignedIds,
    };
    default:
      return state;
  }
};

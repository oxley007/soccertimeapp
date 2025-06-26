
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_SHOWLIVETOGGLE = 'ADD_SHOWLIVETOGGLE';

export const updateShowLiveToggle = ( showLiveToggle ) => ({
  type: ADD_SHOWLIVETOGGLE,
  showLiveToggle,
});

const initialState = {
  showLiveToggle: true,
};

//console.log('hitting rootReducer');
//console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.stoptimer + ' stoptimer check n');
  switch (action.type) {
    case ADD_SHOWLIVETOGGLE:
    return {
      ...state,
      showLiveToggle: action.showLiveToggle,
    };
    default:
      return state;
  }
};

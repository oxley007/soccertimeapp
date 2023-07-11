
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_EVENTDISPLAYBOARD = 'ADD_EVENTDISPLAYBOARD';

export const updateEventDisplayBoard = ( eventDisplayBoard, playerId, eventText ) => ({
  type: ADD_EVENTDISPLAYBOARD,
  eventDisplayBoard,
  playerId,
  eventText
});

const initialState = {
  eventDisplayBoard: false,
  playerId: 99999999,
  eventText: 99999999,
};

//console.log('hitting rootReducer');
//console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  //console.log(action.eventDisplayBoard + ' eventDisplayBoard check n');
  switch (action.type) {
    case ADD_EVENTDISPLAYBOARD:
    return {
      ...state,
      eventDisplayBoard: action.eventDisplayBoard,
      playerId: action.playerId,
      eventText: action.eventText,
    };
    default:
      return state;
  }
};

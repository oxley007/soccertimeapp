
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_AWAYTEAMDETAILS = 'ADD_AWAYTEAMDETAILS';

export const updateAwayTeamDetails = ( awayTeamName, awayTeamNameShort, awayTeamNameId ) => ({
  type: ADD_AWAYTEAMDETAILS,
  awayTeamName,
  awayTeamNameShort,
  awayTeamNameId
});

const initialState = {
  awayTeamName: false,
  awayTeamNameShort: 99999999,
  awayTeamNameId: 99999999,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
//console.log(action.eventDisplayBoard + ' eventDisplayBoard check n');
  switch (action.type) {
    case ADD_AWAYTEAMDETAILS:
    return {
      ...state,
      awayTeamName: action.awayTeamName,
      awayTeamNameShort: action.awayTeamNameShort,
      awayTeamNameId: action.awayTeamNameId,
    };
    default:
      return state;
  }
};

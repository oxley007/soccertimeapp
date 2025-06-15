
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_IAP = 'UPDATE_IAP';

export const updateIap = ( pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player ) => ({
  type: UPDATE_IAP,
  pro_forever_indiv,
  pro_yearly_indiv,
  pro_yearly_team,
  pro_forever_team,
  pro_yearly_player,
  pro_forever_player,
});

const initialState = {
  pro_forever_indiv: [{purchased: false, expiryDate: null}],
  pro_yearly_indiv: [{purchased: false, expiryDate: null}],
  pro_yearly_team: [{purchased: false, expiryDate: null}],
  pro_forever_team: [{purchased: false, expiryDate: null}],
  pro_yearly_player: [{purchased: false, expiryDate: null}],
  pro_forever_player: [{purchased: false, expiryDate: null}],
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_IAP:
  //console.log(action.games);
      return {
        ...state,
        pro_forever_indiv: action.pro_forever_indiv,
        pro_yearly_indiv: action.pro_yearly_indiv,
        pro_yearly_team: action.pro_yearly_team,
        pro_forever_team: action.pro_forever_team,
        pro_yearly_player: action.pro_yearly_player,
        pro_forever_player: action.pro_forever_player,
      };
    default:
      return state;
  }
};

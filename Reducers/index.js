import { combineReducers } from 'redux';


import games from './games';
import teamNames from './teamNames';
import gameSetup from './gameSetup';
import teamPlayers from './teamPlayers';
import stopwatch from './stopwatch';
import stoptimer from './stoptimer';
import statsBoard from './statsBoard';
import gameOptionBoard from './gameOptionBoard';
import gamePlayerBoard from './gamePlayerBoard';
import eventDisplayBoard from './eventDisplayBoard';
import seasons from './seasons';
import prevGames from './prevGames';

export default combineReducers({
  games,
  teamNames,
  gameSetup,
  teamPlayers,
  stopwatch,
  stoptimer,
  statsBoard,
  gameOptionBoard,
  gamePlayerBoard,
  eventDisplayBoard,
  seasons,
  prevGames,
});

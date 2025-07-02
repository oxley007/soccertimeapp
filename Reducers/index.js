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
import statsSort from './statsSort';
import playerUserData from './playerUserData';
import iap from './iap';
import userProfile from './userProfile'
import playerIndex from './playerIndex'
import sortIndex from './sortIndex'
import exitGameFlag from './exitGameFlag'
import dragDropDisplayCount from './dragDropDisplayCount'
import checkSort from './checkSort'
import posArray from './posArray'
import checkSortPlayer from './checkSortPlayer'
import awayTeamDetails from './awayTeamDetails'
import gameBoardHideBtn from './gameBoardHideBtn'
import copyDisplayBoard from './copyDisplayBoard'
import exitGameFlagOptions from './exitGameFlagOptions'
import parentCoachView from './parentCoachView'
import eventsVersion from './eventsVersion'
import gameOptionBoardFrom from './gameOptionBoardFrom'
import checkSortIap from './checkSortIap'
import fromContinueGame from './fromContinueGame'
import subSuggestions from './subSuggestions'
import aiTokens from './aiTokens'
import showLiveToggle from './showLiveToggle'
import assignedIds from './assignedIds'
import positionEventFlag from './positionEventFlag'


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
  statsSort,
  playerUserData,
  iap,
  userProfile,
  playerIndex,
  sortIndex,
  exitGameFlag,
  dragDropDisplayCount,
  checkSort,
  posArray,
  checkSortPlayer,
  awayTeamDetails,
  gameBoardHideBtn,
  copyDisplayBoard,
  exitGameFlagOptions,
  parentCoachView,
  eventsVersion,
  gameOptionBoardFrom,
  checkSortIap,
  fromContinueGame,
  subSuggestions,
  aiTokens,
  showLiveToggle,
  assignedIds,
  positionEventFlag,
});

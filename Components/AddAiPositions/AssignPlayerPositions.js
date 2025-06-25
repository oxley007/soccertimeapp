import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, FlatList, Dimensions } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
  cancelAnimation,
} from 'react-native-reanimated';


import SeasonStats from '../SeasonStats/SeasonStats'
import SubSuggestions from './SubSuggestions'

import Ionicons from 'react-native-vector-icons/Ionicons';
const swapIcon = <Ionicons name="swap-horizontal" size={18} color="#E879F9" />;
const swapIconWhite = <Ionicons name="swap-horizontal" size={22} color="#fff" />;

import { calculatePlayerLiveStats, calculatePlayerStats, combineSeasonAndLiveStats } from '../../Util/playerStatsUtils';

const { width } = Dimensions.get('window');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// Example usage:
//const liveStats = calculatePlayerLiveStats(player);


import { updateGames } from '../../Reducers/games';
import { updateStatsSort } from '../../Reducers/statsSort';
import { updateSortIndex } from '../../Reducers/sortIndex';
import { updateEventsVersion } from '../../Reducers/eventsVersion';
import { updateSubSuggestions } from '../../Reducers/subSuggestions';
import { updateAiTokens } from '../../Reducers/aiTokens';


const AssignPlayerPositions = (props)=>{

  const [playerStats, setPlayerStats] = useState([]);
  const [filteredStats, setFilteredStats] = useState(playerStats);
  const [selectedFilter, setSelectedFilter] = useState('mostPlayed');
  const [playerLiveStats, setPlayerLiveStats] = useState([]);
  const [combinedPlayerStats, setCombinedPlayerStats] = useState([]);
  const [aiToeknDisplay, setAiToeknDisplay] = useState('0');
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [result, setResult] = useState({});
  const [liveAssignmentsState, setLiveAssignmentsState] = useState({});



  //let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
  let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
  let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let statsBoardPlayerId = useSelector(state => state.statsBoard.playerId)
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let playerUserDataPlayers = useSelector(state => state.playerUserData.players);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  //let playerIndexReducer = useSelector(state => state.playerIndex.playerIndex)
  let sortIndex = useSelector(state => state.sortIndex.sortIndex);
  let sortIndexType = useSelector(state => state.sortIndex.sortIndexType);
  let statePlayerIndex = useSelector(state => state.playerIndex.playerIndex);
  let fromContinueGame = useSelector(state => state.fromContinueGame.fromContinueGame);
  let eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);
  const seasonSubSuggestions = useSelector(
    (state: RootState) => state.subSuggestions.seasonSubSuggestions
  );
  const liveSubSuggestions = useSelector(
    (state: RootState) => state.subSuggestions.liveSubSuggestions
  );
  let aiTokens = useSelector(state => state.aiTokens.aiTokens);


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData
  const whereFrom = props.whereFrom
  const whatData = props.whatData

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60)

    const [isPulsing, setIsPulsing] = useState(true);
      const scale = useSharedValue(1);
      const shadowOpacity = useSharedValue(0.3);

      useEffect(() => {
        if (isPulsing) {
          scale.value = withRepeat(
            withSequence(
              withTiming(1.1, { duration: 700 }),
              withTiming(1, { duration: 700 })
            ),
            -1,
            true
          );
          shadowOpacity.value = withRepeat(
            withSequence(
              withTiming(0.8, { duration: 700 }),
              withTiming(0.3, { duration: 700 })
            ),
            -1,
            true
          );
        } else {
          // Stop animations by cancelling ongoing ones and resetting values
          cancelAnimation(scale);
          cancelAnimation(shadowOpacity);
          scale.value = 1;
          shadowOpacity.value = 0.3;
        }
      }, [isPulsing]);

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        shadowColor: '#E879F9',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: shadowOpacity.value,
        shadowRadius: 10,
        elevation: 10,
      }));


    const { navigate } = props.navigation;


    useEffect(() => {
    const stats = teamPlayers.map((player) => calculatePlayerStats(player));
    setPlayerStats(stats);

    if (games.length > 0 && Array.isArray(games[0].teamPlayers)) {
      console.log('games[0].teamPlayers subs check ' + JSON.stringify(games[0].teamPlayers));
      const statsLive = games[0].teamPlayers.map((player) =>
        calculatePlayerLiveStats(player, sixtySecondsMark) // <== now passing dynamic value
      );
      setPlayerLiveStats(statsLive);

      const combinedStats = combineSeasonAndLiveStats(stats, statsLive);
      setCombinedPlayerStats(combinedStats);
    } else {
      setPlayerLiveStats([]);
      setCombinedPlayerStats(stats);
      console.log('combinedPlayerStats... ' + JSON.stringify(combinedPlayerStats));
    }
  }, [teamPlayers, games, sixtySecondsMark]);


  useEffect(() => {
    const purchases = [
      pro_forever_indiv[0].purchased,
      pro_yearly_indiv[0].purchased,
      pro_yearly_team[0].purchased,
      pro_forever_team[0].purchased,
      pro_yearly_player[0].purchased,
      pro_forever_player[0].purchased,
    ];

    const hasProSubscription = purchases.some(purchased => purchased === true);


    try {
      if (hasProSubscription) {
        setAiToeknDisplay('\u221E')
      }
      else {
        setAiToeknDisplay(aiTokens.toString())
        //dispatch(updateAiTokens(aiTokensTotal));
      }
    }
    catch {
      setAiToeknDisplay(0)
    }


  },[aiTokens, pro_forever_indiv[0].purchased, pro_yearly_indiv[0].purchased, pro_yearly_team[0].purchased, pro_forever_team[0].purchased, pro_yearly_player[0].purchased, pro_forever_player[0].purchased])



  /*
  const showAiSubsAlert = () => {
    let playerOnField = 0;

    try {
      games[0].teamPlayers.map(player => {
        if (player.positionDetails.column > 1 && player.positionDetails.row < 4) {
          playerOnField += 1;
        }
      });
    } catch {
      playerOnField = 0;
    }

    if (fromContinueGame === 0) {
      Alert.alert(
        'Automatically Sort Positions with AI!!',
        "Let our AI recommend player positions based on the ones selected on the 'Season Positions' page and the time spent in each position throughout the season.\n\nYou can always sort manually by drag and drop if you prefer not to use the AI suggestions.\n\nThe AI suggestions are designed to promote fairness and inclusiveness by helping ensure every player gets a fair amount of game time in their selected positions.",
        [
          {
            text: 'Sort with AI',
            onPress: () => {
              const stats = teamPlayers.map((player) => calculatePlayerStats(player));
              setPlayerStats(stats);

              if (games.length > 0 && Array.isArray(games[0].teamPlayers)) {
                console.log('games[0].teamPlayers subs check ' + JSON.stringify(games[0].teamPlayers));
                const statsLive = games[0].teamPlayers.map((player) =>
                  calculatePlayerLiveStats(player, sixtySecondsMark) // <== now passing dynamic value
                );
                setPlayerLiveStats(statsLive);

                const combinedStats = combineSeasonAndLiveStats(stats, statsLive);
                setCombinedPlayerStats(combinedStats);
              } else {
                setPlayerLiveStats([]);
                setCombinedPlayerStats(stats);
                console.log('combinedPlayerStats... ' + JSON.stringify(combinedPlayerStats));
              }
              callPlayerSort();
            },
            style: 'default' // this is optional; it's the default anyway
          },
          {
            text: 'Sort Manually',
            onPress: () => {
              // Do nothing or show manual sort UI
            },
            style: 'cancel' // cancels on iOS = left, Android = bolded
          }
        ],
        { cancelable: true }
      );
    }
  };
  */


  const testData = () => {

    console.log('combinedPlayerStats.. 2 ' + JSON.stringify(combinedPlayerStats));

  }

  function assignPlayersByMatchFormat(gameIndex = 0) {
    const teamPlayers = games[gameIndex].teamPlayers;
    const matchFormat = games[gameIndex].matchFormat || 11;
    const assignedPlayerIds = new Set();
    const assignments = {};

    const formationByFormat = {
      1: { gol: 1 },
      2: { gol: 1, fwd: 1 },
      3: { gol: 1, fwd: 1, def: 1 },
      4: { gol: 1, fwd: 1, def: 1, mid: 1 },
      5: { gol: 1, fwd: 1, def: 2, mid: 1 },
      6: { gol: 1, fwd: 1, def: 2, mid: 2 },
      7: { gol: 1, fwd: 2, def: 2, mid: 2 },
      8: { gol: 1, fwd: 2, def: 3, mid: 2 },
      9: { gol: 1, fwd: 2, def: 3, mid: 3 },
      10: { gol: 1, fwd: 2, def: 4, mid: 3 },
      11: { gol: 1, fwd: 2, def: 4, mid: 4 },
    };

    const formationLayouts = {
      1: [{ pos: 'gol', row: 0, column: 4 }],
      2: [{ pos: 'gol', row: 0, column: 4 }, { pos: 'fwd', row: 3, column: 4 }],
      3: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 4 },
        { pos: 'def', row: 1, column: 4 },
      ],
      4: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 4 },
        { pos: 'def', row: 1, column: 4 },
        { pos: 'mid', row: 2, column: 4 },
      ],
      5: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 4 },
        { pos: 'def', row: 1, column: 3 },
        { pos: 'def', row: 1, column: 5 },
        { pos: 'mid', row: 2, column: 4 },
      ],
      6: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 4 },
        { pos: 'def', row: 1, column: 3 },
        { pos: 'def', row: 1, column: 5 },
        { pos: 'mid', row: 2, column: 3 },
        { pos: 'mid', row: 2, column: 5 },
      ],
      7: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 3 },
        { pos: 'fwd', row: 3, column: 5 },
        { pos: 'def', row: 1, column: 3 },
        { pos: 'def', row: 1, column: 5 },
        { pos: 'mid', row: 2, column: 3 },
        { pos: 'mid', row: 2, column: 5 },
      ],
      8: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 3 },
        { pos: 'fwd', row: 3, column: 5 },
        { pos: 'def', row: 1, column: 2 },
        { pos: 'def', row: 1, column: 4 },
        { pos: 'def', row: 1, column: 6 },
        { pos: 'mid', row: 2, column: 3 },
        { pos: 'mid', row: 2, column: 5 },
      ],
      9: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 3 },
        { pos: 'fwd', row: 3, column: 5 },
        { pos: 'def', row: 1, column: 2 },
        { pos: 'def', row: 1, column: 4 },
        { pos: 'def', row: 1, column: 6 },
        { pos: 'mid', row: 2, column: 2 },
        { pos: 'mid', row: 2, column: 4 },
        { pos: 'mid', row: 2, column: 6 },
      ],
      10: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 3 },
        { pos: 'fwd', row: 3, column: 5 },
        { pos: 'def', row: 1, column: 1 },
        { pos: 'def', row: 1, column: 3 },
        { pos: 'def', row: 1, column: 5 },
        { pos: 'def', row: 1, column: 7 },
        { pos: 'mid', row: 2, column: 2 },
        { pos: 'mid', row: 2, column: 4 },
        { pos: 'mid', row: 2, column: 6 },
      ],
      11: [
        { pos: 'gol', row: 0, column: 4 },
        { pos: 'fwd', row: 3, column: 3 },
        { pos: 'fwd', row: 3, column: 5 },
        { pos: 'def', row: 1, column: 1 },
        { pos: 'def', row: 1, column: 3 },
        { pos: 'def', row: 1, column: 5 },
        { pos: 'def', row: 1, column: 7 },
        { pos: 'mid', row: 2, column: 1 },
        { pos: 'mid', row: 2, column: 3 },
        { pos: 'mid', row: 2, column: 5 },
        { pos: 'mid', row: 2, column: 7 },
      ],
    };


    const formation = formationByFormat[matchFormat] || formationByFormat[11];
    const layout = formationLayouts[matchFormat] || [];
    const positionCount = { gol: 0, fwd: 0, def: 0, mid: 0 };
    const positions = ['gol', 'fwd', 'def', 'mid'];

    const buildBreakdown = (stats) => {
      const fwd = (stats?.fwdTotalPercent || 0) + (stats?.liveStats?.fwdTotalPercent || 0);
      const mid = (stats?.midTotalPercent || 0) + (stats?.liveStats?.midTotalPercent || 0);
      const def = (stats?.defTotalPercent || 0) + (stats?.liveStats?.defTotalPercent || 0);
      const gol = (stats?.golTotalPercent || 0) + (stats?.liveStats?.golTotalPercent || 0);

      const sum = fwd + mid + def + gol;
      const sub = Math.max(0, 100 - sum);

      return { fwd, mid, def, gol, sub };
    };

    positions.forEach((position) => {
      const needed = formation[position] || 0;
      if (needed === 0) return;

      const eligible = teamPlayers
        .map((player) => {
          if (
            player.playerPositions?.[position] &&
            !assignedPlayerIds.has(player.playerId)
          ) {
            const stats = combinedPlayerStats.find((p) => p.playerId === player.playerId);
            if (!stats) return null;

            const breakdown = buildBreakdown(stats);
            const totalPercent = breakdown[position];

            return {
              playerId: player.playerId,
              playerName: player.playerName,
              totalPercent,
              assignedPosition: position,
              breakdown,
            };
          }
          return null;
        })
        .filter(Boolean);

      const allZero = eligible.every((p) => p.totalPercent === 0);
      if (allZero) {
        eligible.sort((a, b) => a.playerName.localeCompare(b.playerName));
      } else {
        eligible.sort((a, b) => a.totalPercent - b.totalPercent);
      }

      for (let i = 0; i < Math.min(needed, eligible.length); i++) {
        const player = eligible[i];
        assignedPlayerIds.add(player.playerId);

        const matchingLayout = layout.filter((pos) => pos.pos === position)[positionCount[position]];
        const column = matchingLayout?.column ?? null;
        const row = matchingLayout?.row ?? null;
        positionCount[position]++;

        assignments[player.playerId] = {
          playerId: player.playerId,
          playerName: player.playerName,
          assignedPosition: position,
          totalPercent: player.totalPercent,
          breakdown: player.breakdown,
          positionDetails: { column, row },
        };
      }
    });

    const subLayout = [
      { row: 4, column: 1 }, { row: 4, column: 2 }, { row: 4, column: 3 }, { row: 4, column: 4 }, { row: 4, column: 5 }, { row: 4, column: 6 }, { row: 4, column: 7 },
      { row: 5, column: 1 }, { row: 5, column: 2 }, { row: 5, column: 3 }, { row: 5, column: 4 }, { row: 5, column: 5 }, { row: 5, column: 6 }, { row: 5, column: 7 },
      { row: 6, column: 1 }, { row: 6, column: 2 }, { row: 6, column: 3 }, { row: 6, column: 4 }, { row: 6, column: 5 }, { row: 6, column: 6 }, { row: 6, column: 7 },
      { row: 4, column: 0 }, { row: 4, column: 8 }, { row: 5, column: 0 }, { row: 5, column: 8 }, { row: 6, column: 0 }, { row: 6, column: 8 },
    ];

    let subIndex = 0;

    teamPlayers.forEach((player) => {
      if (!assignedPlayerIds.has(player.playerId)) {
        const stats = combinedPlayerStats.find((p) => p.playerId === player.playerId);
        const breakdown = buildBreakdown(stats || {});
        const totalPercent = breakdown.sub || 0;

        const subPos = subLayout[subIndex] || { row: null, column: null };
        subIndex++;

        assignments[player.playerId] = {
          playerId: player.playerId,
          playerName: player.playerName,
          assignedPosition: 'sub',
          totalPercent,
          breakdown,
          positionDetails: subPos,
        };
      }
    });

    // Repeat the logic but using only playerLiveStats
    const liveAssignedPlayerIds = new Set();
    const liveAssignments = {};
    const livePositionCount = { gol: 0, fwd: 0, def: 0, mid: 0 };

    positions.forEach((position) => {
      const needed = formation[position] || 0;
      if (needed === 0) return;

      console.log('playerLiveStats hitting here ' + JSON.stringify(playerLiveStats));
      const eligible = games[0].teamPlayers
        .map((player) => {
          if (
            player.playerPositions?.[position] &&
            !liveAssignedPlayerIds.has(player.playerId)
          ) {
            const stats = playerLiveStats.find((p) => p.playerId === player.playerId);
            if (!stats) return null;

            const breakdown = buildBreakdown({ liveStats: stats });
            const totalPercent = breakdown[position];

            return {
              playerId: player.playerId,
              playerName: player.playerName,
              totalPercent,
              assignedPosition: position,
              breakdown,
            };
          }
          return null;
        })
        .filter(Boolean);

      const allZero = eligible.every((p) => p.totalPercent === 0);
      if (allZero) {
        eligible.sort((a, b) => a.playerName.localeCompare(b.playerName));
      } else {
        eligible.sort((a, b) => a.totalPercent - b.totalPercent);
      }

      for (let i = 0; i < Math.min(needed, eligible.length); i++) {
        const player = eligible[i];
        liveAssignedPlayerIds.add(player.playerId);

        const matchingLayout = layout.filter((pos) => pos.pos === position)[livePositionCount[position]];
        const column = matchingLayout?.column ?? null;
        const row = matchingLayout?.row ?? null;
        livePositionCount[position]++;

        liveAssignments[player.playerId] = {
          playerId: player.playerId,
          playerName: player.playerName,
          assignedPosition: position,
          totalPercent: player.totalPercent,
          breakdown: player.breakdown,
          positionDetails: { column, row },
        };
      }
    });

    // Assign live subs
    let liveSubIndex = 0;
    games[0].teamPlayers.forEach((player) => {
      if (!liveAssignedPlayerIds.has(player.playerId)) {
        const stats = playerLiveStats.find((p) => p.playerId === player.playerId);
        const breakdown = buildBreakdown({ liveStats: stats || {} });
        const totalPercent = breakdown.sub || 0;

        const subPos = subLayout[liveSubIndex] || { row: null, column: null };
        liveSubIndex++;

        liveAssignments[player.playerId] = {
          playerId: player.playerId,
          playerName: player.playerName,
          assignedPosition: 'sub',
          totalPercent,
          breakdown,
          positionDetails: subPos,
        };
      }
    });


    //return assignments;
    return [assignments, liveAssignments];

  }

  const assignPlayersByLiveStats = (totalGameTime = sixtySecondsMark) => {
    const liveAssignments = {};

    const getMostPlayedPosition = (breakdown) => {
      // If sub % is significant (e.g., > 20%), consider player a sub
      if (breakdown.sub > 20) return 'sub';

      let topPosition = 'sub';
      let highest = 0;

      for (const [pos, percent] of Object.entries(breakdown)) {
        if (pos !== 'sub' && percent > highest) {
          highest = percent;
          topPosition = pos;
        }
      }

      return topPosition;
    };

    playerLiveStats.forEach((player) => {
      const {
        fwdTotalTime = 0,
        midTotalTime = 0,
        defTotalTime = 0,
        golTotalTime = 0,
      } = player;

      const playedTime = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime;
      const subTime = Math.max(totalGameTime - playedTime, 0);

      const percent = (time) => parseFloat(((time / totalGameTime) * 100).toFixed(1));

      const breakdown = {
        fwd: percent(fwdTotalTime),
        mid: percent(midTotalTime),
        def: percent(defTotalTime),
        gol: percent(golTotalTime),
        sub: percent(subTime),
      };

      const assignedPosition = getMostPlayedPosition(breakdown);

      liveAssignments[player.playerId] = {
        playerId: player.playerId,
        playerName: player.playerName,
        assignedPosition,
        totalPercent: percent(playedTime),
        breakdown,
        positionDetails: {
          ...player.positionDetails,
        },
      };
    });

    return liveAssignments;
  };




  // Define this function once (at top of your file or inside getSuggestedSubChanges)
  const getLiveTimePlayedMinutes = (playerId) => {
    const liveStats = playerLiveStats.find(p => p.playerId === playerId);
    if (!liveStats) return 0;

    const totalSeconds =
      (parseFloat(liveStats.fwdTotalTime) || 0) +
      (parseFloat(liveStats.midTotalTime) || 0) +
      (parseFloat(liveStats.defTotalTime) || 0) +
      (parseFloat(liveStats.golTotalTime) || 0);

    return Math.round(totalSeconds / 60);
  };


  function getSuggestedSubChanges(assignments, checkTimePlayed = false) {
    if (!Array.isArray(games[0].teamPlayers)) {
      console.warn('teamPlayers is not defined or not an array');
      return [];
    }

    const playerMap = games[0].teamPlayers.reduce((acc, p) => {
      acc[p.playerId] = p;
      return acc;
    }, {});

    // Filter on-field players excluding goalkeepers
    const onFieldPlayers = Object.values(assignments).filter(p => {
      const live = playerMap[p.playerId];
      return p.assignedPosition !== 'sub' && p.assignedPosition !== 'gol' && live?.currentPosition !== 'sub';
    });

    const subs = Object.values(assignments).filter(p => {
      const live = playerMap[p.playerId];
      return p.assignedPosition === 'sub' && live?.currentPosition === 'sub';
    });

    const suggestions = [];
    const alreadySuggestedFieldPlayerIds = new Set();
    const alreadySuggestedSubIds = new Set();

    // Sort on-field players by descending time played
    const sortedFieldPlayers = onFieldPlayers.slice().sort((a, b) => {
      return getLiveTimePlayedMinutes(b.playerId) - getLiveTimePlayedMinutes(a.playerId);
    });

    for (const fieldPlayer of sortedFieldPlayers) {
      if (alreadySuggestedFieldPlayerIds.has(fieldPlayer.playerId)) continue;

      const fieldPlayerTimePlayed = getLiveTimePlayedMinutes(fieldPlayer.playerId);
      const fieldPlayerData = playerMap[fieldPlayer.playerId];
      if (!fieldPlayerData) continue;

      // Ignore field players assigned as 'gol'
      if (fieldPlayer.assignedPosition === 'gol') continue;

      for (const sub of subs) {
        if (alreadySuggestedSubIds.has(sub.playerId)) continue;

        const subData = playerMap[sub.playerId];
        if (!subData) continue;

        // Check sub eligible positions, ignore 'gol'
        const eligiblePositions = subData.playerPositions || {};
        if (!eligiblePositions[fieldPlayer.assignedPosition]) continue;
        if (fieldPlayer.assignedPosition === 'gol') continue; // double-check ignore goalie

        const subTimePlayed = getLiveTimePlayedMinutes(sub.playerId);

        if (checkTimePlayed && subTimePlayed > fieldPlayerTimePlayed) continue;

        const subBreakdown = assignments[sub.playerId]?.breakdown || {};

        suggestions.push({
          subName: sub.playerName,
          subId: sub.playerId,
          subPercent: subBreakdown[fieldPlayer.assignedPosition] || 0,
          breakdown: subBreakdown,
          positionDetails: sub.positionDetails || {},
          timePlayed: subTimePlayed,

          fieldPlayerName: fieldPlayer.playerName,
          fieldPlayerId: fieldPlayer.playerId,
          fieldPercent: assignments[fieldPlayer.playerId]?.breakdown[fieldPlayer.assignedPosition] || 0,
          fieldPlayerPositionDetails: fieldPlayer.positionDetails || {},
          fieldPlayerTimePlayed,

          position: fieldPlayer.assignedPosition,
          improvement:
            (assignments[fieldPlayer.playerId]?.breakdown[fieldPlayer.assignedPosition] || 0) -
            (subBreakdown[fieldPlayer.assignedPosition] || 0),
        });

        alreadySuggestedFieldPlayerIds.add(fieldPlayer.playerId);
        alreadySuggestedSubIds.add(sub.playerId);

        break; // move on to next field player
      }
    }

    return suggestions;
  }






  const callSubsSort = () => {

    const purchases = [
      pro_forever_indiv[0].purchased,
      pro_yearly_indiv[0].purchased,
      pro_yearly_team[0].purchased,
      pro_forever_team[0].purchased,
      pro_yearly_player[0].purchased,
      pro_forever_player[0].purchased,
    ];

    const hasProSubscription = purchases.some(purchased => purchased === true);

    if (aiTokens < 1 && !hasProSubscription) {
      Alert.alert(
        'Tokens all gone!',
        "If you want our AI to keep recommending player positions based on time spent in each role, please tap Buy Tokens and upgrade to a Pro subscription.",
        [
          {
            text: 'Buy Tokens',
            onPress: () => {
              goToIap()
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              // Do nothing or show manual sort UI
            },
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );
    }
    else {
      console.log('teamPlayers ' + JSON.stringify(teamPlayers));
      console.log('games[0].teamPlayers on button click ' + JSON.stringify(games[0].teamPlayers));

      const seasonAssignments = assignPlayersByMatchFormat(); // original
      const liveAssignments = assignPlayersByLiveStats(); // new

      console.log('assignments (season) ' + JSON.stringify(seasonAssignments));
      console.log('assignments (live). ' + JSON.stringify(liveAssignments));

      const subSuggestions = getSuggestedSubChanges(seasonAssignments);
      const liveSubSuggestions = getSuggestedSubChanges(liveAssignments, true);

      console.log('liveSubSuggestions (live) ' + JSON.stringify(liveSubSuggestions));

      // Check if suggestions exist
      const hasSuggestions =
      (subSuggestions && subSuggestions.length > 0) ||
      (liveSubSuggestions && liveSubSuggestions.length > 0);

      if (hasSuggestions) {
        dispatch(updateSubSuggestions(subSuggestions, liveSubSuggestions));
        const aiTokensTotal = aiTokens - 1;
        dispatch(updateAiTokens(aiTokensTotal));
        setAiMessage(''); // Clear message if there was one previously
      } else {
        setAiMessage('AI has no substitution suggestions right now — all players are currently well-balanced.');
        setTimeout(() => {
          setAiMessage('');
        }, 10000); // 10,000 milliseconds = 10 seconds
      }
    }

  };


  const callLiveSubsSort = () => {

    const assignments = assignPlayersByMatchFormat();
    console.log('assignments ' + JSON.stringify(assignments[0]));

    const liveSubSuggestions = getSuggestedSubChanges(assignments[1]);
    console.log('liveSubSuggestions ' + JSON.stringify(liveSubSuggestions));

  }


  const callPlayerSort = () => {

    setLoading(true);
    console.log('we getting a hit here?');

    try {
      setIsPulsing(false); // stop the animation
      console.log('we getting a hit here?');
      const assignments = assignPlayersByMatchFormat()[0]; // ✅ Grabs the first item directly

      const _games = [...games]; // create local copy
      const teamPlayers = _games[0].teamPlayers;

      if (teamPlayers && teamPlayers.length > 0) {
        teamPlayers.forEach((player, index) => {
          const assigned = assignments[player.playerId];
          if (assigned) {
            teamPlayers[index] = {
              ...player,
              currentPosition: assigned.assignedPosition,
              positionDetails: {
                ...player.positionDetails,
                ...(assigned.positionDetails || {}),
              },
            };
          }
        });

        console.log('we getting a hit here? 2');
        const updatedEventsVersion = eventsVersion + 1;

        dispatch(updateGames(_games));
        dispatch(updateEventsVersion(updatedEventsVersion));

        const teamIdCodeGames = _games[0].teamIdCode;
        const gameIdDb = _games[0].gameIdDb;

        firestore()
          .collection(teamIdCodeGames)
          .doc(gameIdDb)
          .set({ game: _games[0] }, { merge: true });

        userRef
          .doc(gameIdDb)
          .set({ game: _games[0] }, { merge: true });
      }
    } catch (error) {
          console.error('Error in callPlayerSort:', error);
        } finally {
          setLoading(false); // stop loading spinner
        }

  }


  const aiButtonDisplay = () => {

    if (props.fromMenu === true) {
      return (
        <Button variant="unstyled" bg="transparent" onPress={() => callSubsSort()}>
          <HStack >
          <Center pl="2">
            {swapIcon}
            <Text style={styles.textBottomMenu}>Get AI Subs</Text>
            </Center>
          </HStack>
        </Button>

      )
    }
    else if (props.fromAiAssign === true) {
      return (
        <Button minW="59%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => callSubsSort()}>Get AI Subs</Button>
      )
    }
    //<Button minW="59%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => callSubsSort()}>Get AI Subs</Button>

  }

  const getButtonText = () => {
    if (
      fromContinueGame === 1 &&
      props.fromMenu !== true &&
      Array.isArray(seasonSubSuggestions) &&
      seasonSubSuggestions.length === 0 &&
      Array.isArray(liveSubSuggestions) &&
      liveSubSuggestions.length === 0
    ) {
      return (
        <>
          {swapIconWhite} Get AI Sub Suggestions
        </>
      );
    } else {
      return (
        <>
          {swapIconWhite} Update AI Sub Suggestions
        </>
      );
    }
  };

  const goToIap = () => {

    navigate('Iap',{
      navigateBack: true,
      navigateBackName: 'SeasonPositionSortAllHome',
      gameIdDb: games[0].gameIdDb
    });

  }

  const handleClick = () => {
    const assignments = assignPlayersByLiveStats();
    setLiveAssignmentsState(assignments);

    const playerMap = Object.fromEntries(teamPlayers.map(p => [p.playerId, p]));
    const output = {};

    Object.values(assignments).forEach(subPlayer => {
      if (subPlayer.assignedPosition !== 'sub') return;

      const subPercent = subPlayer.totalPercent;
      const subId = subPlayer.playerId;

      const subOriginal = playerMap[subId];
      const subEligiblePositions = subOriginal
        ? Object.entries(subOriginal.playerPositions)
            .filter(([_, eligible]) => eligible)
            .map(([pos]) => pos)
        : [];

      const higherFieldPlayers = Object.values(assignments).filter(fieldPlayer => {
        const isField = ['mid', 'fwd', 'def'].includes(fieldPlayer.assignedPosition);
        return isField && fieldPlayer.totalPercent > subPercent;
      });

      output[subId] = {
        subName: subPlayer.playerName,
        subEligiblePositions,
        higherFieldPlayers: higherFieldPlayers.map(fieldPlayer => {
          const original = playerMap[fieldPlayer.playerId];
          const eligiblePositions = original
            ? Object.entries(original.playerPositions)
                .filter(([_, eligible]) => eligible)
                .map(([pos]) => pos)
            : [];

          return {
            playerId: fieldPlayer.playerId,
            playerName: fieldPlayer.playerName,
            position: fieldPlayer.assignedPosition,
            totalPercent: fieldPlayer.totalPercent,
            eligiblePositions
          };
        })
      };
    });

    setResult(output);
  };




        return (
          <View style={styles.container}>
            {testData()}
            {fromContinueGame === 0 &&
              <View>
                <HStack alignItems="center" pb="3" shadow={6}>
                  <Animated.View style={[animatedStyle]}>
                      <Button
                        minW="100%"
                        bg="#E879F9"
                        size="md"
                        _text={{ fontSize: 22, color: '#fff' }}
                        variant="subtle"
                        onPress={callPlayerSort}
                        borderRadius={6}
                        isDisabled={loading}
                        leftIcon={loading ? <Spinner color="white" size="sm" /> : null}
                      >
                        {loading ? 'Sorting...' : 'Auto Sort Positions with AI'}
                      </Button>
                    </Animated.View>
                  </HStack>
                  {isPulsing === true &&
                    <View>
                      <Text style={{ color: '#fff', paddingBottom: 5 }}>
                        Let our AI suggest player positions based on selections from the Season Positions page and time spent in each position.
                      </Text>
                      <Text style={{ color: '#fff', paddingBottom: 5 }}>
                        You can still sort manually using drag and drop to make adjustments.
                      </Text>
                      <Text style={{ color: '#fff' }}>
                        AI suggestions aim to promote fairness and ensure all players get balanced time in their chosen positions.
                      </Text>
                    </View>
                  }
              </View>
            }
            {(fromContinueGame === 1 && props.fromMenu !== true) &&
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#333', marginBottom: 10 }}>
                  <Text style={{ color: '#fff', fontSize: 22, fontWeight: '600' }}>
                    AI Sub Suggestions:
                  </Text>
                  <Text style={{ color: '#ccc', fontSize: 12, marginLeft: 8 }}>
                    ({' '}AI Tokens: {aiToeknDisplay} -
                  </Text>
                  <Button
                    bg="transparent"
                    size="sm"
                    m="0"
                    p="0"
                    variant="subtle"
                    onPress={() => goToIap()}
                    _text={{ color: '#E879F9', fontSize: 12, fontWeight: '600', textDecorationLine: 'underline', marginLeft: 1 }}
                  >
                    Buy Tokens
                  </Button>
                  <Text style={{ color: '#ccc', fontSize: 12, marginLeft: 4 }}>
                    )
                  </Text>
                </View>

                <Button
                    bg="#E879F9"
                    size="md"
                    maxW="100%"
                    style={{ borderRadius: 5 }}
                    _text={{ fontSize: 20, color: '#fff' }}
                    mb="2.5"
                    variant="subtle"
                    onPress={() => callSubsSort()}
                  >
                    <Text style={{ fontSize: 20, color: '#fff' }}>
                      {getButtonText()}
                    </Text>
                  </Button>
                  {aiMessage !== '' && (
                    <Text style={{ color: 'red', marginBottom: 10 }}>{aiMessage}</Text>
                  )}
                <SubSuggestions navigation={props.navigation} />
              </View>
            }
            <View style={{ padding: 16 }}>
                  <Button title="Compare Subs to Field Players" onPress={handleClick}>
                    <Text>Compare Subs to Field Players</Text>
                  </Button>
                  <ScrollView style={{ marginTop: 16, maxHeight: 500 }}>
                  {Object.entries(result).map(([subId, data]) => (
                    <View key={subId} style={{ marginBottom: 20, padding: 10, backgroundColor: '#f2f2f2' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        Sub: {data.subName} ({subId})
                      </Text>
                      <Text style={{ fontStyle: 'italic', marginBottom: 6 }}>
                        Eligible positions: {(data.subEligiblePositions || []).join(', ')}
                      </Text>

                      {data.higherFieldPlayers.length === 0 ? (
                        <Text style={{ color: 'gray' }}>No field players with higher %</Text>
                      ) : (
                        data.higherFieldPlayers.map((fieldPlayer, idx) => (
                          <View key={fieldPlayer.playerId + idx} style={{ marginTop: 8, padding: 6, backgroundColor: '#fff', borderRadius: 6 }}>
                            <Text>{fieldPlayer.playerName} ({fieldPlayer.playerId})</Text>
                            <Text>Playing as: {fieldPlayer.position}</Text>
                            <Text>Total %: {fieldPlayer.totalPercent}</Text>
                            <Text>Eligible for: {fieldPlayer.eligiblePositions.join(', ')}</Text>
                          </View>
                        ))
                      )}
                    </View>
                  ))}
                  </ScrollView>
                </View>
        </View>
        )
    }


const styles = StyleSheet.create({
  container: {
    width: '100%',       // ensures the container takes full width
    padding: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff'
  },
  bar: {
    flexDirection: 'row',
    height: 30,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  segment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentLabel: {
    fontSize: 12,
    color: '#333',
    paddingHorizontal: 4,
  },
  largePadding: {
    padding: 20,
    backgroundColor: '#333',
    flex: 1,
  },
  noPadding: {
    padding: 0,
    backgroundColor: '#333',
    flex: 1,
  },
  percent: percentTotal => ({
    minWidth: percentTotal,
    maxWidth: percentTotal,
    backgroundColor: '#34d399',
    height: 25,
    alignItems: 'left',
    justifyContent: 'center',
}),
percentPlayed: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#0891b2',
  height: 25,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentFwd: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#cffafe',
  height: 25,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentMid: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#fef9c3',
  height: 25,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentDef: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#fed7aa',
  height: 25,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentGoalie: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#f5d0fe',
  height: 25,
  alignItems: 'left',
  justifyContent: 'center',
}),
percentGrey: percentTotal => ({
  minWidth: percentTotal,
  maxWidth: percentTotal,
  backgroundColor: '#333',
  height: 25,
  alignItems: 'left',
  justifyContent: 'center',
  borderWidth: 1,
  borderRightColor: '#999',
}),
barGrey: {
  flexDirection: 'row',
  height: 30,
  borderRadius: 6,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#999',
},
textBottomMenu: {
  color: '#fff',
  fontSize: 14,
},
})

export default AssignPlayerPositions;

/*





              {playerStats.map((p) => (
                <View key={p.playerId} style={{ marginBottom: 20, padding: 10 }}>
                  <Text style={styles.name}>{p.playerName} (ID: {p.playerId})</Text>
                  <Text style={styles.name}>Total Time % on Field: {p.percentTotal}%</Text>
                  <Text style={styles.name}>FWD: {p.fwdTotalTime}s ({p.fwdTotalPercent}%)</Text>
                  <Text style={styles.name}>MID: {p.midTotalTime}s ({p.midTotalPercent}%)</Text>
                  <Text style={styles.name}>DEF: {p.defTotalTime}s ({p.defTotalPercent}%)</Text>
                  <Text style={styles.name}>GOL: {p.golTotalTime}s ({p.golTotalPercent}%)</Text>
                  <Text style={styles.name}>SUB: {p.subTotalTime}s</Text>
                </View>
              ))}
*/





/*
// Step 1: Get season stats for all team players
const seasonStats = games[playerIndex].teamPlayers.map(calculatePlayerStats);

// Step 2: Merge with live stats from current game
const mergedStats = combineSeasonAndLiveStats(
  seasonStats,
  games[playerIndex].teamPlayers.map(p => p.liveStats)
);

// Step 3: Assign players to positions using improved logic (random if equal lowest time)
const assignLowestTimePlayers = () => {
  const assigned = {};
  const usedPlayerIds = new Set();

  for (const pos of ['fwd', 'mid', 'def', 'gol']) {
    let candidates = [];

    for (const player of games[playerIndex].teamPlayers) {
      const stats = mergedStats.find(p => p.playerId === player.playerId);
      const isEligible = player.playerPositions?.[pos];

      if (!isEligible || usedPlayerIds.has(player.playerId)) continue;

      const timeKey = `${pos}TotalTime`;
      const time = stats?.[timeKey] ?? Infinity;

      candidates.push({
        playerName: player.playerName,
        playerId: player.playerId,
        assignedPosition: pos,
        totalTimePlayedInPosition: time
      });
    }

    const minTime = Math.min(...candidates.map(c => c.totalTimePlayedInPosition));
    const lowestCandidates = candidates.filter(c => c.totalTimePlayedInPosition === minTime);
    const chosen = lowestCandidates[Math.floor(Math.random() * lowestCandidates.length)];

    if (chosen) {
      assigned[pos] = chosen;
      usedPlayerIds.add(chosen.playerId);
    }
  }

  return assigned;
};

const positionAssignments = assignLowestTimePlayers();
console.log(positionAssignments);
*/

/*
<HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6} >
  <Button minW="59%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => callPlayerSort()}>Get AI Positions</Button>
</HStack>
<HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6} >
  <Button minW="59%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => callSubsSort()}>Get AI Subs</Button>
</HStack>
<HStack alignItems="center" safeAreaBottom ml="5" mr="5" mt="3" pb="1" shadow={6} >
  <Button minW="59%" bg="#E879F9" size="md" _text={{fontSize: 16, color: '#fff'}} variant="subtle" onPress={() => callLiveSubsSort()}>Get Live AI Subs</Button>
</HStack>
<Text style={styles.name}>{JSON.stringify(combinedPlayerStats)}...</Text>
*/

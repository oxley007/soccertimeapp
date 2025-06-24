import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, FlatList } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, VStack, Select, CheckIcon } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import SeasonStats from '../SeasonStats/SeasonStats'

import { calculatePlayerLiveStats, calculatePlayerStats, combineSeasonAndLiveStats } from '../../Util/playerStatsUtils';

// Example usage:
//const liveStats = calculatePlayerLiveStats(player);


import { updateGames } from '../../Reducers/games';
import { updateStatsSort } from '../../Reducers/statsSort';
import { updateSortIndex } from '../../Reducers/sortIndex';


const PositionSortNew = (props)=>{

  const [playerStats, setPlayerStats] = useState([]);
  const [filteredStats, setFilteredStats] = useState(playerStats);
  const [selectedFilter, setSelectedFilter] = useState('mostPlayed');
  const [playerLiveStats, setPlayerLiveStats] = useState([]);
  const [combinedPlayerStats, setCombinedPlayerStats] = useState([]);



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


  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  const playerData = props.playerData
  const whereFrom = props.whereFrom
  const whatData = props.whatData

  const formattedSeconds = (sec) =>
    Math.floor(sec / 60)

    const { navigate } = props.navigation;

    useEffect(() => {
    const stats = teamPlayers.map((player) => calculatePlayerStats(player));
    console.log('stats are??? ' + JSON.stringify(stats) );
    setPlayerStats(stats);

    if (games.length > 0 && Array.isArray(games[0].teamPlayers)) {
      const statsLive = games[0].teamPlayers.map((player) =>
        calculatePlayerLiveStats(player, sixtySecondsMark) // <== now passing dynamic value
      );
      setPlayerLiveStats(statsLive);

      const combinedStats = combineSeasonAndLiveStats(stats, statsLive);
      console.log('combinedStats are?? ' + JSON.stringify(combinedStats) );
      setCombinedPlayerStats(combinedStats);
    } else {
      setPlayerLiveStats([]);
      setCombinedPlayerStats(stats);
    }
  }, [teamPlayers, games, sixtySecondsMark]);


    useEffect(() => {
      const sorted = sortPlayerStats(combinedPlayerStats, selectedFilter);
      console.log('Sorted stats with filter:', selectedFilter, sorted.map(p => p.playerName));
      setFilteredStats(sorted);
    }, [selectedFilter, combinedPlayerStats]);

    const positionKeys = ['fwd', 'mid', 'def', 'gol', 'sub'];

  const calculatePlayerStatsOld = (player) => {
    const totals = { fwd: 0, mid: 0, def: 0, gol: 0, sub: 0 };

    const gamesArray = Array.isArray(player.postionTimeStats) ? player.postionTimeStats : [];

    for (const game of gamesArray) {
      const posTimes = game.posTimes || {};
      for (const pos of positionKeys) {
        const entries = Array.isArray(posTimes[pos]) ? posTimes[pos] : [];
        for (const { st = 0, fin = 0 } of entries) {
          const duration = Math.max(0, fin - st);
          if (duration > 0 && duration < 1000000) {
            totals[pos] += duration;
          }
        }
      }
    }


    const onFieldTime = totals.fwd + totals.mid + totals.def + totals.gol;
    const totalTime = onFieldTime + totals.sub;
    const percent = (val) => (totalTime > 0 ? Math.round((val / totalTime) * 100) : 0);

    return {
      playerName: player.playerName,
      playerId: player.playerId,
      id: player.id,
      percentTotal: percent(onFieldTime).toString(),
      fwdTotalPercent: (percent(totals.fwd) - 0).toString(),
      midTotalPercent: (percent(totals.mid) - 0).toString(),
      defTotalPercent: (percent(totals.def) - 0).toString(),
      golTotalPercent: (percent(totals.gol) - 0).toString(),
      fwdTotalTime: totals.fwd,
      midTotalTime: totals.mid,
      defTotalTime: totals.def,
      golTotalTime: totals.gol,
      subTotalTime: totals.sub,
    };
  };

    /*
    useEffect(() => {
      const stats = games[0].teamPlayers.map((player) => calculatePlayerLiveStats(player));
      setPlayerLiveStats(stats)
    }, [sixtySecondsMark]);
    */

    /*
    const calculatePlayerLiveStats = (player) => {
      const { playerName, playerId, currentPosition, gameStats, postionTimes } = player;

      const toArray = (pos) =>
        Array.isArray(pos) ? pos : typeof pos === 'object' && Object.keys(pos).length > 0 ? [pos] : [];

      const calcTotalTime = (arr) =>
        toArray(arr).reduce((sum, t) => {
          const start = typeof t.st === 'number' ? t.st : 0;
          const end =
            typeof t.fin === 'number'
              ? (t.fin === 99999999 ? sixtySecondsMark : t.fin)
              : sixtySecondsMark;
          return sum + Math.max(0, end - start);
        }, 0);

      const fwdTotalTime = calcTotalTime(postionTimes?.fwd);
      const midTotalTime = calcTotalTime(postionTimes?.mid);
      const defTotalTime = calcTotalTime(postionTimes?.def);
      const golTotalTime = calcTotalTime(postionTimes?.gol);
      const subTotalTime = calcTotalTime(postionTimes?.sub);

      const total = fwdTotalTime + midTotalTime + defTotalTime + golTotalTime;

      const percent = (val) => (total > 0 ? ((val / total) * 100).toFixed(1) : 0);

      return {
        playerName,
        playerId,
        position: currentPosition,
        stats: gameStats,
        percentTotal: total > 0 ? 100 : 0,
        fwdTotalTime,
        fwdTotalPercent: percent(fwdTotalTime),
        midTotalTime,
        midTotalPercent: percent(midTotalTime),
        defTotalTime,
        defTotalPercent: percent(defTotalTime),
        golTotalTime,
        golTotalPercent: percent(golTotalTime),
        subTotalTime,
      };
    };


    const positionKeys = ['fwd', 'mid', 'def', 'gol', 'sub'];

  const calculatePlayerStats = (player) => {
    const totals = { fwd: 0, mid: 0, def: 0, gol: 0, sub: 0 };

    const gamesArray = Array.isArray(player.postionTimeStats) ? player.postionTimeStats : [];

    for (const game of gamesArray) {
      const posTimes = game.posTimes || {};
      for (const pos of positionKeys) {
        const entries = Array.isArray(posTimes[pos]) ? posTimes[pos] : [];
        for (const { st = 0, fin = 0 } of entries) {
          const duration = Math.max(0, fin - st);
          if (duration > 0 && duration < 1000000) {
            totals[pos] += duration;
          }
        }
      }
    }


    const onFieldTime = totals.fwd + totals.mid + totals.def + totals.gol;
    const totalTime = onFieldTime + totals.sub;
    const percent = (val) => (totalTime > 0 ? Math.round((val / totalTime) * 100) : 0);

    return {
      playerName: player.playerName,
      playerId: player.playerId,
      id: player.id,
      percentTotal: percent(onFieldTime).toString(),
      fwdTotalPercent: (percent(totals.fwd) - 0).toString(),
      midTotalPercent: (percent(totals.mid) - 0).toString(),
      defTotalPercent: (percent(totals.def) - 0).toString(),
      golTotalPercent: (percent(totals.gol) - 0).toString(),
      fwdTotalTime: totals.fwd,
      midTotalTime: totals.mid,
      defTotalTime: totals.def,
      golTotalTime: totals.gol,
      subTotalTime: totals.sub,
    };
  };

  const combineSeasonAndLiveStats = (seasonStats, liveStats) => {
  return seasonStats.map((seasonPlayer) => {
    const livePlayer = liveStats.find((p) => p.playerId === seasonPlayer.playerId);

    if (!livePlayer) return seasonPlayer;

    const add = (a, b) => (Number(a) || 0) + (Number(b) || 0);

    const fwd = add(seasonPlayer.fwdTotalTime, livePlayer.fwdTotalTime);
    const mid = add(seasonPlayer.midTotalTime, livePlayer.midTotalTime);
    const def = add(seasonPlayer.defTotalTime, livePlayer.defTotalTime);
    const gol = add(seasonPlayer.golTotalTime, livePlayer.golTotalTime);
    const sub = add(seasonPlayer.subTotalTime, livePlayer.subTotalTime);

    const totalTime = fwd + mid + def + gol + sub;
    const onFieldTime = totalTime - sub;

    const safePercent = (value) => totalTime > 0 ? Math.round((value / totalTime) * 100) : 0;

    return {
      ...seasonPlayer,
      fwdTotalTime: fwd,
      midTotalTime: mid,
      defTotalTime: def,
      golTotalTime: gol,
      subTotalTime: sub,
      percentTotal: safePercent(onFieldTime),
      fwdTotalPercent: safePercent(fwd),
      midTotalPercent: safePercent(mid),
      defTotalPercent: safePercent(def),
      golTotalPercent: safePercent(gol),
      // optionally include live stats too
      liveStats: livePlayer,
    };
  });
};
*/

const getPositionBar = (stats) => {

  console.log(props.playerIndex + ' what is props.playerIndex??');
  console.log(stats.id + ' what is stats.id??');
  console.log(stats.playerName + ' what is stats.playerName');
  console.log(JSON.stringify(stats) + ' stats did it work>');

  if (props.playerIndex === stats.id || props.fromLiveGame !== true) {

    // Parse as integers
    if (!stats) return null;

    const safePercent = (value) => {
      const num = parseInt(value);
      return isNaN(num) || num < 0 ? 0 : num;
    };

    const fwd = safePercent(stats.fwdTotalPercent);
    const mid = safePercent(stats.midTotalPercent);
    const def = safePercent(stats.defTotalPercent);
    const gol = safePercent(stats.golTotalPercent);

    const used = fwd + mid + def + gol;
    const sub = Math.max(0, 100 - used);

    const segments = [
      { label: 'fwd', percent: fwd, color: '#cffafe' },
      { label: 'mid', percent: mid, color: '#fef9c3' },
      { label: 'def', percent: def, color: '#fed7aa' },
      { label: 'gol', percent: gol, color: '#f5d0fe' },
      { label: 'sub', percent: sub, color: '#34d399' },
    ];

    const hasAnyData = segments.some(s => s.percent > 0);

    if (!hasAnyData) {
      return (
        <View style={styles.container}>
          <Text style={styles.name}>{stats.playerName}</Text>
          <Text style={styles.noData}>No stats available yet</Text>
        </View>
      );
    }



    return (
        <View>
          {fromContinueGame === 0 &&
            <Text style={styles.name}>{stats.playerName}</Text>
          }
          <View style={styles.bar}>
            {segments.map(({ label, percent, color }) =>
              percent > 0 ? (
                <View
                  key={label}
                  style={[styles.segment, { flex: percent, backgroundColor: color }]}
                >
                  <Text style={styles.segmentLabel}>{label} {percent}%</Text>
                </View>
              ) : null
            )}
          </View>
        </View>
      );

  }
};

const sortPlayerStats = (stats, sortType) => {
  if (!Array.isArray(stats)) return [];

  const safePercent = (val) => parseFloat(val) || 0;

  switch (sortType) {
    case 'mostPlayed':
      // Outfield = 100% - sub%
      return [...stats].sort((a, b) => {
        const aOutfield = safePercent(a.percentTotal) - (safePercent(a.subTotalTime) / 60);
        const bOutfield = safePercent(b.percentTotal) - (safePercent(b.subTotalTime) / 60);
        return bOutfield - aOutfield;
      });

    case 'leastPlayed':
      return [...stats].sort((a, b) => b.subTotalTime - a.subTotalTime);

    case 'mostFwd':
      return [...stats].sort((a, b) => safePercent(b.fwdTotalPercent) - safePercent(a.fwdTotalPercent));
    case 'leastFwd':
      return [...stats].sort((a, b) => safePercent(a.fwdTotalPercent) - safePercent(b.fwdTotalPercent));

    case 'mostMid':
      return [...stats].sort((a, b) => safePercent(b.midTotalPercent) - safePercent(a.midTotalPercent));
    case 'leastMid':
      return [...stats].sort((a, b) => safePercent(a.midTotalPercent) - safePercent(b.midTotalPercent));

    case 'mostDef':
      return [...stats].sort((a, b) => safePercent(b.defTotalPercent) - safePercent(a.defTotalPercent));
    case 'leastDef':
      return [...stats].sort((a, b) => safePercent(a.defTotalPercent) - safePercent(b.defTotalPercent));

    case 'mostGol':
      return [...stats].sort((a, b) => safePercent(b.golTotalPercent) - safePercent(a.golTotalPercent));
    case 'leastGol':
      return [...stats].sort((a, b) => safePercent(a.golTotalPercent) - safePercent(b.golTotalPercent));

    default:
      return stats;
  }
};

const filterOptions = [
  { label: 'Most Played %', value: 'mostPlayed' },
  { label: 'Most Sub %', value: 'leastPlayed' },
  { label: 'Most Forward %', value: 'mostFwd' },
  { label: 'Least Forward %', value: 'leastFwd' },
  { label: 'Most Midfield %', value: 'mostMid' },
  { label: 'Least Midfield %', value: 'leastMid' },
  { label: 'Most Defender %', value: 'mostDef' },
  { label: 'Least Defender %', value: 'leastDef' },
  { label: 'Most Goalkeeper %', value: 'mostGol' },
  { label: 'Least Goalkeeper %', value: 'leastGol' },
];

const logOutPuts = () => {

  console.log(JSON.stringify(playerLiveStats) + ' playerLiveStats hre is all');
  console.log(JSON.stringify(playerStats) + ' playerStats hre is all.');
  console.log(JSON.stringify(combinedPlayerStats) + ' combinedPlayerStats hre is all.');


}

const upgradeToPro = () => {

    navigate('Iap',{
      navigateBack: true,
      navigateBackName: 'SeasonPositionSortAllHome'
    });

}

  const checkProUser = () => {

    if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {
      return (
        <Box>

          <FlatList
            data={filteredStats}
            keyExtractor={(item) => item.playerId}
            renderItem={({ item }) => getPositionBar(item)}
          />
        </Box>
      )
    }
    else {
      return (
        <Box>
          <HStack pb="5" style={styles.barGrey}>
            <View style={styles.percentGrey('20%')}>
              <Text style={{color: '#999',marginLeft: 3, fontSize: 12}}>FWD %</Text>
            </View>
            <View style={styles.percentGrey('20%')}>
              <Text style={{color: '#999',marginLeft: 3, fontSize: 12}}>MID %</Text>
            </View>
            <View style={styles.percentGrey('20%')}>
              <Text style={{color: '#999',marginLeft: 3, fontSize: 12}}>DEF %</Text>
            </View>
            <View style={styles.percentGrey('20%')}>
              <Text style={{color: '#999',marginLeft: 3, fontSize: 12}}>GOL %</Text>
            </View>
            <View style={styles.percentGrey('20%')}>
              <Text style={{color: '#999',marginLeft: 3, fontSize: 12}}>SUB %</Text>
            </View>
          </HStack>
          <Button
            minW="100%"
            variant="unstyled"
            size="md"
            mt="0"
            mb="0"
            pl="0"
            pt="0"
            pb="0"
            justifyContent="flex-start" // aligns content inside Button to the left
            onPress={() => upgradeToPro()}
            _text={{ fontSize: 14, color: '#999', textAlign: 'left' }} // fallback text style
          >
            <Text style={{ textAlign: 'left', fontSize: 14, color: '#999', marginTop: 0 }}>
              <Text style={{ color: '#E879F9', textDecorationLine: 'underline' }}>Upgrade to pro </Text>
              to display correct season stats
            </Text>
          </Button>
        </Box>
      )
        /*
        Alert.alert(
        'Buy Pro!',
        'You need to upgrade to pro to view this drill',
        [
          {text: 'View Pro Subscriptions', onPress: () => {

          navigate('Iap');

          }},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      */
    }

  }

        return (
          <Box>
          {fromContinueGame === 0 &&
          <Box style={props.whereFromPlayer === undefined ? styles.largePadding : styles.noPadding} >



            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#fff' }}>
              Season Stats:
            </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '400', paddingBottom: 5}}>Key:</Text>
            <HStack pb="5">
              <View style={styles.percentFwd('20%')}>
                <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Forward</Text>
              </View>
              <View style={styles.percentMid('20%')}>
                <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Midfeild</Text>
              </View>
              <View style={styles.percentDef('20%')}>
                <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Defender</Text>
              </View>
              <View style={styles.percentGoalie('20%')}>
                <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Golie</Text>
              </View>
              <View style={styles.percent('20%')}>
                <Text style={{color: '#333',marginLeft: 3, fontSize: 8}}>Sub</Text>
              </View>
            </HStack>
            <Box mb={4} p={3} bg="#666" borderRadius={8}>
              <Text fontSize="lg" style={{color: '#fff'}} fontWeight="bold" mb={2} color="#1e293b">Filter Players By:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {filterOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={{
                      margin: 4,
                      backgroundColor: selectedFilter === option.value ? '#E879F9' : '#e5e7eb',
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      borderRadius: 6,
                    }}
                    onPress={() => setSelectedFilter(option.value)}
                  >
                    <Text style={{ color: selectedFilter === option.value ? '#fff' : '#000', fontSize: 11 }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Box>




              <FlatList
                data={filteredStats}
                keyExtractor={(item) => item.playerId}
                renderItem={({ item }) => getPositionBar(item)}
              />






          </Box>
        }
        {fromContinueGame === 1 &&
          <Box minW="100%">
          <Text style={{ fontSize: 16, color: '#ddd', paddingBottom: 5 }}>
            Season Stats:
          </Text>
            {checkProUser()}
          </Box>
        }
        </Box>

        )
    }


const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    padding: 5,
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
})

export default PositionSortNew;

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

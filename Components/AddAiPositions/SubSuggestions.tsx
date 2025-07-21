import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Switch,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AssignPlayerPositions from './AssignPlayerPositions'

import { updateSubSuggestions } from '../../Reducers/subSuggestions';
import { updateGames } from '../../Reducers/games';
import { updateEventsVersion } from '../../Reducers/eventsVersion';
import { updateShowLiveToggle } from '../../Reducers/showLiveToggle';
import { updateAssignedIds } from '../../Reducers/assignedIds';

import Ionicons from 'react-native-vector-icons/Ionicons';
const swapIcon = <Ionicons name="swap-horizontal" size={18} color="#E879F9" />;

const screenWidth = Dimensions.get('window').width;

type Breakdown = {
  fwd: number;
  mid: number;
  def: number;
  gol: number;
  sub: number;
};

type SubSuggestion = {
  subName: string;
  subId: string;
  subPercent: number;
  breakdown: Breakdown;
  positionDetails: { row: number; column: number };
  fieldPlayerName: string;
  fieldPlayerId: string;
  fieldPercent: number;
  fieldPlayerPositionDetails: { column: number; row: number };
  position: string;
  improvement: number;
};

type RootState = {
  subSuggestions: {
    seasonSubSuggestions: SubSuggestion[];
    liveSubSuggestions: SubSuggestion[];
  };
};

const SubSuggestions: React.FC<any> = (props) => {

  const dispatch = useDispatch()

  const { navigate } = props.navigation;

  const [playerLiveStats, setPlayerLiveStats] = useState([]);
  const [combinedPlayerStats, setCombinedPlayerStats] = useState([]);
  const [activeSubId, setActiveSubId] = useState(null);

  const seasonSubSuggestions = useSelector(
    (state: RootState) => state.subSuggestions.seasonSubSuggestions
  );
  const liveSubSuggestions = useSelector(
    (state: RootState) => state.subSuggestions.liveSubSuggestions
  );
  let eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);
  let games = useSelector(state => state.games.games);
  let showLiveToggle = useSelector(state => state.showLiveToggle.showLiveToggle);
  const assignedIds = useSelector(state => state.assignedIds.assignedIds);

  //const [showLive, setShowLive] = useState<boolean>(true); // Default live ON
  const activeSuggestions = showLiveToggle ? liveSubSuggestions : seasonSubSuggestions;

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);

  useEffect(() => {
    dispatch(updateSubSuggestions([], []));
  },[])

  const clearAiSubs = () => {
    dispatch(updateSubSuggestions([], []));
  }

  const handleMakeSub = (suggestion) => {
    const handleMakeSub = (suggestion) => {
      const updatedAssignedIds = assignedIds.filter(id => id !== suggestion.fieldPlayerId);
      dispatch(updateAssignedIds(updatedAssignedIds));
    };
    setActiveSubId(suggestion.subId); // Start loading this sub

    try {
      const _games = [...games];
      const teamPlayers = _games[0].teamPlayers;

      const subIndex = teamPlayers.findIndex(p => p.playerId === suggestion.subId);
      const fieldIndex = teamPlayers.findIndex(p => p.playerId === suggestion.fieldPlayerId);

      if (subIndex === -1 || fieldIndex === -1) {
        console.warn('One or both players not found for substitution');
        setActiveSubId(null); // Clear loading if early exit
        return;
      }

      // Swap field player → sub
      teamPlayers[fieldIndex] = {
        ...teamPlayers[fieldIndex],
        currentPosition: 'sub',
        positionDetails: {
          ...teamPlayers[fieldIndex].positionDetails,
          ...(suggestion.positionDetails || {}),
        },
      };

      // Swap sub → field
      teamPlayers[subIndex] = {
        ...teamPlayers[subIndex],
        currentPosition: suggestion.position,
        positionDetails: {
          ...teamPlayers[subIndex].positionDetails,
          ...(suggestion.fieldPlayerPositionDetails || {}),
        },
      };

      // Get players
      const subPlayer = teamPlayers[subIndex];     // Coming ON
      const fieldPlayer = teamPlayers[fieldIndex]; // Going OFF

      const position = subPlayer.currentPosition; // new position sub is going into

      console.log('position hceck hm', position);

      const positionLabels = {
        fwd: 'is now playing as a Forward',
        mid: 'is now playing Midfield',
        def: 'is now playing as a Defender',
        gol: 'is now playing as Goalkeeper',
        sub: 'has been substituted off',
      };

      // Event time
      const eventTime = games[0].secondsElapsed;

      // Create event entries
      const eventsToAdd = [];

      // Event: player coming ON
      if (position !== 'sub') {
        console.log('positionLabels[position]', positionLabels[position]);

        const subOnText = `${subPlayer.playerName} ${positionLabels[position] || 'has entered the game'}`;
        eventsToAdd.push({
          eventType: 'pos',
          eventText: subOnText,
          eventTime,
        });
      }

      // Event: player going OFF
      const fieldOffText = `${fieldPlayer.playerName} ${positionLabels['sub']}`;
      eventsToAdd.push({
        eventType: 'sub',
        eventText: fieldOffText,
        eventTime,
      });

      // Push safely to game events
      if (!Array.isArray(games[0].gameEvents)) {
        games[0].gameEvents = [];
      }

      games[0].gameEvents.push(...eventsToAdd);

      console.log('Substitution events logged:', eventsToAdd);

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

      // Filter out sub from both suggestion lists
      const updatedSeasonSubs = seasonSubSuggestions.filter(s => s.subId !== suggestion.subId);
      const updatedLiveSubs = liveSubSuggestions.filter(s => s.subId !== suggestion.subId);

      dispatch(updateSubSuggestions(updatedSeasonSubs, updatedLiveSubs));
    } catch (error) {
      console.error('Error making sub:', error);
    }

    // Keep the loading indicator for 3 seconds manually
    setTimeout(() => {
      setActiveSubId(null); // Clear loading state after 3 seconds
    }, 3000);
  };



  const handleRemoveSuggestion = (subId: string) => {
    const updatedSeason = seasonSubSuggestions.filter(s => s.subId !== subId);
    const updatedLive = liveSubSuggestions.filter(s => s.subId !== subId);

    dispatch(updateSubSuggestions(updatedSeason, updatedLive));
  };



  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#000', borderColor: '#ddd', borderWidth: 1 }}>



      {showLiveToggle === false &&
        <Text style={{ marginBottom: 5, color: '#fff', fontSize: 14 }}>When Season is toggled on, substitution suggestions prioritize players who have played fewer minutes in a position, replacing those who have played that position the most.</Text>
      }
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <Button bg="transparent" p="0" size="md" variant="subtle" onPress={() => clearAiSubs()}>
          <Text style={{ marginRight: 8, color: '#E879F9', textDecorationLine: 'underline', fontSize: 18 }}>
            Clear Smart-Sub Suggestions
          </Text>
        </Button>

      </View>

      <ScrollView>
      {activeSuggestions.map((suggestion, index) => (
        <View
          key={index}
          style={{
            marginBottom: 24,
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#777',
            backgroundColor: '#333',
          }}
        >
          {suggestion.matched ? (
            <>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>
                {suggestion.subName}
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '300' }}>
                  {' '}(Game-Time: <Text style={{ fontSize: 16, color: '#ccc', fontWeight: 'bold' }}>{suggestion.timePlayed}min</Text>)
                </Text>
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 4, color: '#eee' }}>
                {swapIcon} Swap with: <Text style={{ fontWeight: 'bold', color: '#fff' }}>{suggestion.fieldPlayerName}</Text>
                <Text style={{ fontSize: 14, color: '#ccc' }}>
                  {' '}(Game-Time: <Text style={{ fontSize: 14, color: '#ccc', fontWeight: 'bold' }}>{suggestion.fieldPlayerTimePlayed}min)</Text>
                </Text>
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 8, color: '#ccc' }}>
                Sub Into Position:{' '}
                <Text style={{ fontSize: 16, marginBottom: 8, color: '#E879F9', fontWeight: '600' }}>
                  {suggestion.position.toUpperCase()}
                </Text>
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {Object.entries(suggestion.breakdown).map(([key, value]) => (
                  <View key={key} style={{ alignItems: 'center', minWidth: 40 }}>
                    <Text style={{ color: '#fff', fontWeight: '600' }}>{key.toUpperCase()}</Text>
                    <Text style={{ color: '#aaa' }}>{value}%</Text>
                  </View>
                ))}
              </View>
              {suggestion.validPositions && Object.keys(suggestion.validPositions).length > 0 && (
                <View style={{ marginTop: 12 }}>
                  <Text style={{ fontSize: 14, color: '#ccc' }}>
                    Allocated Positions:{' '}
                    <Text style={{ fontWeight: '600', color: '#EAB308' }}>
                      {Object.entries(suggestion.validPositions)
                        .filter(([_, isValid]) => isValid)
                        .map(([position]) => position.toUpperCase())
                        .join(', ')}
                    </Text>
                  </Text>
                </View>
              )}

              {/* Action buttons */}
              <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginRight: 8,
                    padding: 10,
                    borderRadius: 6,
                    backgroundColor: activeSubId === null ? '#34d399' : '#a7f3d0',
                    opacity: activeSubId !== null ? 0.5 : 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  disabled={activeSubId !== null}
                  onPress={() => handleMakeSub(suggestion)}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>
                    {activeSubId === suggestion.subId ? 'Loading...' : 'Make Sub'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    padding: 10,
                    borderRadius: 6,
                    backgroundColor: '#ff3b30',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handleRemoveSuggestion(suggestion.subId)}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>
                    Remove Suggestion
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>
                {suggestion.subName}
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '300' }}>
                  {' '}(Game-Time: <Text style={{ fontSize: 16, color: '#ccc', fontWeight: 'bold' }}>{suggestion.timePlayed}min</Text>)
                </Text>
              </Text>

              <Text style={{ fontSize: 16, color: '#aaa', marginTop: 8 }}>
                ⚠️ No substitution available — <Text style={{ color: '#f87171' }}>{suggestion.noSubReason}</Text>
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                {Object.entries(suggestion.breakdown).map(([key, value]) => (
                  <View key={key} style={{ alignItems: 'center', minWidth: 40 }}>
                    <Text style={{ color: '#fff', fontWeight: '600' }}>{key.toUpperCase()}</Text>
                    <Text style={{ color: '#aaa' }}>{value}%</Text>
                  </View>
                ))}
              </View>
              {suggestion.validPositions && Object.keys(suggestion.validPositions).length > 0 && (
                <View style={{ marginTop: 12 }}>
                  <Text style={{ fontSize: 14, color: '#ccc' }}>
                    Allocated Positions:{' '}
                    <Text style={{ fontWeight: '600', color: '#EAB308' }}>
                      {Object.entries(suggestion.validPositions)
                        .filter(([_, isValid]) => isValid)
                        .map(([position]) => position.toUpperCase())
                        .join(', ')}
                    </Text>
                  </Text>
                </View>
              )}


              <View style={{ marginTop: 12 }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 6,
                    backgroundColor: '#ff3b30',
                  }}
                  onPress={() => handleRemoveSuggestion(suggestion.subId)}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>
                    Remove Suggestion
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

export default SubSuggestions;


/*
swtich logic to add back in
<View style={{ flexDirection: 'row', marginBottom: 5 }}>
  <Text style={{ marginRight: 8, color: '#fff', fontSize: 16, fontWeight: '600' }}>
    Show Subs based on stats from:
  </Text>
</View>
<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
  <Text style={{ marginRight: 8, color: '#fff' }}>Season</Text>
  <Switch
    value={showLiveToggle}
    onValueChange={(value) => dispatch(updateShowLiveToggle(value))}
  />
  <Text style={{ marginLeft: 8, color: '#fff' }}>Live Game</Text>
</View>
*/

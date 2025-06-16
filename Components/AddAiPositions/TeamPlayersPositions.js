import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
//import { updateGames, updateTeamPlayers } from '../redux/actions'; // adjust path if needed
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';

const positionLabels = {
  fwd: 'Forward',
  mid: 'Midfield',
  def: 'Defender',
  gol: 'Goalie',
};

const TeamPlayersPositions = ({ games }) => {

  const dispatch = useDispatch();
  const currentUser = auth().currentUser;

  if (!currentUser) {
    return <Text>Loading user info...</Text>;
  }

  const userRef = firestore().collection(currentUser.uid);
  const teamPlayers = games[0]?.teamPlayers || [];

  const handleTogglePosition = async (playerIndex, posKey) => {
    const updatedGames = [...games];
    const updatedTeamPlayers = [...teamPlayers];

    // Get current player object
    const player = { ...updatedTeamPlayers[playerIndex] };

    // Ensure playerPositions object exists
    if (!player.playerPositions) {
      player.playerPositions = {};
    }

    // Toggle the boolean
    const currentStatus = player.playerPositions[posKey] ?? false;
    player.playerPositions[posKey] = !currentStatus;

    // Save changes back to both arrays
    updatedTeamPlayers[playerIndex] = player;
    updatedGames[0].teamPlayers = updatedTeamPlayers;

    // Dispatch to Redux
    dispatch(updateTeamPlayers(updatedTeamPlayers));
    dispatch(updateGames(updatedGames));

    if (!player.playerId) {
      console.warn('playerId missing for player at index', playerIndex);
      return;
    }

    try {
      await userRef.doc(player.playerId).set(
        {
          playerPositions: player.playerPositions,
        },
        { merge: true } // <-- this merges the update with existing data, not overwrite whole doc
      );
    } catch (error) {
      console.error('Error updating playerPositions in Firestore:', error.message);
    }

  };

  return (
    <FlatList
      data={teamPlayers}
      keyExtractor={(item, index) => item.playerId || index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.playerContainer}>
          <Text style={styles.playerName}>{item.playerName}</Text>
          <View style={styles.buttonsContainer}>
            {Object.entries(positionLabels).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  handleTogglePosition(index, key).catch(console.error);
                }}
                style={[
                  styles.positionButton,
                  item.playerPositions?.[key] && styles.activeButton,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    item.playerPositions?.[key] && styles.activeButtonText,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#222'
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff'
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  positionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginRight: 8,
    marginBottom: 8,
  },
  activeButton: {
    backgroundColor: '#E879F9',
  },
  buttonText: {
    fontSize: 14,
    color: '#888',
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TeamPlayersPositions;

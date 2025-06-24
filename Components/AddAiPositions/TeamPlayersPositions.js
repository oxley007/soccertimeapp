import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
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

  const [loadingPlayerId, setLoadingPlayerId] = useState(null); // <-- loading state

  if (!currentUser) {
    return <Text>Loading user info...</Text>;
  }

  const userRef = firestore().collection(currentUser.uid);
  const teamPlayers = games[0]?.teamPlayers || [];

  const handleTogglePosition = async (playerIndex, posKey) => {
    const updatedGames = [...games];
    const updatedTeamPlayers = [...teamPlayers];
    const player = { ...updatedTeamPlayers[playerIndex] };

    if (!player.playerId) {
      console.warn('playerId missing for player at index', playerIndex);
      return;
    }

    setLoadingPlayerId(player.playerId); // <-- start loading

    try {
      if (!player.playerPositions) {
        player.playerPositions = {};
      }

      const currentStatus = player.playerPositions[posKey] ?? false;
      player.playerPositions[posKey] = !currentStatus;

      updatedTeamPlayers[playerIndex] = player;
      updatedGames[0].teamPlayers = updatedTeamPlayers;

      dispatch(updateTeamPlayers(updatedTeamPlayers));
      dispatch(updateGames(updatedGames));

      await userRef.doc(player.playerId).set(
        {
          playerPositions: player.playerPositions,
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating playerPositions in Firestore:', error.message);
    } finally {
      setLoadingPlayerId(null); // <-- stop loading
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
            {Object.entries(positionLabels).map(([key, label]) => {
              const isActive = item.playerPositions?.[key];
              const isLoading = loadingPlayerId === item.playerId;

              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleTogglePosition(index, key).catch(console.error)}
                  disabled={isLoading}
                  style={[
                    styles.positionButton,
                    isActive && styles.activeButton,
                    isLoading && { opacity: 0.6 },
                  ]}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        isActive && styles.activeButtonText,
                      ]}
                    >
                      {label}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
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
    backgroundColor: '#222',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
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

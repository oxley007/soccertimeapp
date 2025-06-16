import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLAYERS } from './queries'; // or define inline

export default function PlayersList() {
  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View>
      {data.players.map(player => (
        <Text key={player.id}>{player.name} - {player.position}</Text>
      ))}
    </View>
  );
}

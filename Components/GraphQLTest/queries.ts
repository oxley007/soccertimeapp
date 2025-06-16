import { gql } from '@apollo/client';

const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      name
      position
    }
  }
`;

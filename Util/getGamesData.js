// Util/getGamesData.js
import firestore from '@react-native-firebase/firestore';

import { updateGames } from '../Reducers/games';
import { updateEventsVersion } from '../Reducers/eventsVersion';

export const getGamesData = (dispatch, userProfile, parentCoachView, userId, eventsVersion, currentUserUid) => {
    console.log('anytinher ere ??');
    console.log(userId + ' userId??');
  const unsubscribe = firestore()
    .collection(userId)
    .onSnapshot(snapshot => {
        console.log('Snapshot triggered');
      if (snapshot.metadata.hasPendingWrites) {
        console.log('Skipping local writes...');
        return;
      }

      const postData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const gameData = postData
        .map(game => {
          try {
            if (game.game.isGame === true) {
              return game.game;
            }
          } catch {
            return null;
          }
        })
        .filter(game => game !== null);

      const gameDataSorted = [...gameData].sort((a, b) => b.id - a.id); // Descending sort

      try {
        console.log(`${gameDataSorted.length} gameDataSorted length check`);
      } catch {
        console.log('gameDataSorted has no length check');
      }

      const latestGame = gameDataSorted[0];

      // Check if the latest update was made by this user

      const latestUpdateUid = latestGame?.latestUpdateUid || null;

      console.log(latestUpdateUid + ' latestUpdateUid is?');



      /*
      if (latestUpdateUid !== currentUserUid) {
        console.log('Change made by another user - dispatching updateGames');
        dispatch(updateGames(gameDataSorted));
        eventsVersion = eventsVersion + 1;
        dispatch(updateEventsVersion(eventsVersion));
      } else {
        console.log('Change made by current user - skipping Redux update');
      }
      */


    console.log('gameDataSorted need to check ' + JSON.stringify(gameDataSorted));


      dispatch(updateGames(gameDataSorted));
      eventsVersion = eventsVersion + 1;
      dispatch(updateEventsVersion(eventsVersion));




    }, error => {
      console.error("Firestore error: ", error);
    });

  return unsubscribe;
};

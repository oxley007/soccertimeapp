import firestore from '@react-native-firebase/firestore';

export const getGamesDataOnce = async (collectionName) => {
  const querySnapshot = await firestore().collection(collectionName).get();
  const items = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return items;
};

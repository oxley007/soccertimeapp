import React, { useEffect, useState, Component, useRef, useCallback } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, ActivityIndicator, Platform, Linking } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;
const checkIcon = <FaIcon name="check" size={14} color="#E879F9" />;
const crossIcon = <Entypo name="cross" size={14} color="#ff0f0f" />;

import LinearGradient from 'react-native-linear-gradient';

//import { requestPurchase, requestSubscription, initConnection, useIAP} from 'react-native-iap';
import Purchases from 'react-native-purchases';

//import { updateGames } from '../../Reducers/games';
import { updateIap } from '../../Reducers/iap';
import { updateCheckSortIap } from '../../Reducers/checkSortIap';

//import DisplayPrevGames from '../PreviousGames/DisplayPrevGames.js'


const Iap = (props)=>{

  //const [getTeam, setGetTeam] = useState([]);
  //const [isOpen, setIsOpen] = useState(true);
  const [getProductList, setProductList] = useState([]);
  const [pro_forever_indivState, setPro_forever_indivState] = useState(false);
  const [pro_yearly_indivState, setPro_yearly_indivState] = useState(false);
  const [pro_yearly_teamState, setPro_yearly_teamState] = useState(false);
  const [pro_forever_teamState, setPro_forever_teamState] = useState(false);
  const [pro_yearly_playerState, setPro_yearly_playerState] = useState(false);
  const [pro_forever_playerState, setPro_forever_playerState] = useState(false);
  const [userProfileState, setUserProfileState] = useState(2);
  const [teamYearlyCost, setTeamYearlyCost] = useState(0);
  const [teamForeverCost, setTeamForeverCost] = useState(0);
  const [playerYearlyCost, setPlayerYearlyCost] = useState(0);
  const [animateLoading, setAnimateLoading] = useState(false);
  const [getMoreinfo, setMoreinfo] = useState(0);
  const [getAddTeamOnly, setAddTeamOnly] = useState(1);
  const [getTeamType, setTeamType] = useState(0);
  const [getGameIdDb, setGameIdDb] = useState(0);
  const [key, setKey] = useState(0);
  const [reload, setReload] = useState(false);
  const [indivProds, setIndivProds] = useState([]);
  const [teamProds, setTeamProds] = useState([]);
  const [playerProds, setPlayerProds] = useState([]);
  const [getProMonthlyPlayerCost, setProMonthlyPlayerCost] = useState([]);


  /*
  let teamNames = useSelector(state => state.teamNames.teamNames);

  let prevGamesSeason = useSelector(state => state.prevGames.season);
  let prevGamesTeam = useSelector(state => state.prevGames.team);
  let seasons = useSelector(state => state.seasons.seasons);
  let seasonsDisplay = useSelector(state => state.seasons.seasonsDisplay);
  let playerUserDataSeasons = useSelector(state => state.playerUserData.seasons);
  let playerUserDataSeasonsDisplay = useSelector(state => state.playerUserData.seasonsDisplay);
  let playerUserDataSeasonsDisplayId = useSelector(state => state.playerUserData.seasonsDisplayId);
  */

  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let userProfile = useSelector(state => state.userProfile.userProfile);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let playerUserDataTeams = useSelector(state => state.playerUserData.teams);
  let games = useSelector(state => state.games.games);
  let checkSortIap = useSelector(state => state.checkSortIap.checkSortIap);
  //{purchased: false, expiryDate: null}]

  const dispatch = useDispatch()

  const isFocused = useIsFocused();

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamIdnavigateBack
  //const teamIdCode = props.route.params.teamIdCode


  const { navigate } = props.navigation;


  /*
  useFocusEffect(
    useCallback(() => {
      // This runs every time screen comes into focus

      // Trigger rerender by changing state
      setKey(prev => prev + 1);

      // Optionally return cleanup if needed
      return () => {};
    }, [])
  );
  */

  useEffect(() => {
    (async () => {
      const { indivProds, teamProds, prodsPlayer, proMonthlyPlayerCost } = await mainProductsNew();
      setIndivProds(indivProds);
      setTeamProds(teamProds);
      setPlayerProds(prodsPlayer);
      setProMonthlyPlayerCost(proMonthlyPlayerCost)
    })();
  }, []);


  useEffect(() => {
    if (isFocused) {
      // Force rerender or reload data here
      setReload(prev => !prev);
    }
  }, [isFocused]);

try {
  useEffect(() => {
    console.log('hitting each time?');
    /*
    const { addTeamOnlyApp } = props.route.params ?? {};
    console.log(addTeamOnlyApp + ' addTeamOnlyApp is now?');
    */

    /*
    const { addTeamOnlyApp } = props.route?.params ?? {};
    console.log('Params:', props.route?.params);  // Add this to debug
    */

    let addTeamOnlyIap = 1
    try {
      addTeamOnlyIap = props.route.params.addTeamOnly
      setAddTeamOnly(addTeamOnlyIap)

    }
    catch {
      addTeamOnlyIap = 1
      setAddTeamOnly(addTeamOnlyIap)
    }

    let teamType = 0
    try {
      teamType = props.route.params.teamType
      setTeamType(teamType)

    }
    catch {
      teamType = 0
      setTeamType(teamType)
    }

    let gameIdDb = 0
    try {
      gameIdDb = props.route.params.gameIdDb
      setGameIdDb(gameIdDb)
    }
    catch {
      gameIdDb = 0
      setGameIdDb(gameIdDb)
    }

    console.log(getAddTeamOnly + ' setAddTeamOnly is?');

  },[games.length])
}
catch {
  //nothong.
}

  useEffect(() => {

   console.log(pro_forever_indiv[0].purchased + ' hit?');
      setPro_forever_indivState(pro_forever_indiv[0].purchased)
      setPro_yearly_indivState(pro_yearly_indiv[0].purchased)
      setPro_yearly_teamState(pro_yearly_team[0].purchased)
      setPro_forever_teamState(pro_forever_team[0].purchased)
      setPro_yearly_playerState(pro_yearly_player[0].purchased)
      setPro_forever_playerState(pro_forever_player[0].purchased)

  },[pro_forever_indiv[0].purchased, pro_yearly_indiv[0].purchased, pro_yearly_team[0].purchased, pro_forever_team[0].purchased, pro_yearly_player[0].purchased, pro_forever_player[0].purchased])

  useEffect(() => {

   console.log(userProfile + ' hit?');
      setUserProfileState(userProfile)
      setAnimateLoading(true)
      mainProducts()

  },[userProfile])

  useEffect(() => {



    setAnimateLoading(true)
    mainProducts()
    //setAnimateLoading(false)


  },[])


  const sortOrder = ['monthly', 'season', 'yearly'];

  const mainProductsNew = async () => {
    console.log('mainProductsNew when do i get here 1');
    Purchases.setDebugLogsEnabled(true);

    let prods = [];
    let prodsPlayer = [];

    if (Platform.OS === 'ios') {
      console.log('mainProductsNew when do i get here 2.');
      /*
      await Purchases.configure({
        apiKey: "appl_AiWRjxtNooUlINbXhTHZhTrLkWv"
      });
      */

        console.log('mainProductsNew when do i get here 2.1.');

      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);


      console.log('mainProductsNew when do i get here 2.5');

      /*
      const offerings = await Purchases.getOfferings();
      console.log('offerings:', offerings);
      */



      /*const offerings = await Purchases.getOfferings();
      console.log('Offerings:', offerings);

      if (offerings.current) {
        console.log('Available packages:', offerings.current.availablePackages);
      }*/

      /*
      const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));

      let allProds = [];
      try {
        allProds = await Promise.race([
          Purchases.getProducts([
            "pro_yearly_indiv", "pro_yearly_team",
            "pro_monthly_indv", "pro_monthly_team",
            "pro_season_indv", "pro_season_team"
          ]),
          timeout(5000)
        ]);
        console.log('Products:', allProds);
      } catch (e) {
        setAnimateLoading(false)
        console.log('Fetching products failed or timed out:', e.message);
      }
      */

      const timeout = (ms) =>
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));

      const productIds = [
        "pro_yearly_indiv", "pro_yearly_team",
        "pro_monthly_indv", "pro_monthly_team",
        "pro_season_indv", "pro_season_team"
      ];

      let allProds = [];

      for (const id of productIds) {
        try {
          // Wrap each single product fetch in a timeout race
          const prods = await Promise.race([
            Purchases.getProducts([id]),
            timeout(5000)
          ]);
          allProds.push(...prods);
          console.log(`Fetched product ${id}`, prods);
        } catch (e) {
          console.log(`Fetching product ${id} failed or timed out:`, e.message);
        }
      }

      console.log('All fetched products:', allProds);



      console.log('mainProductsNew when do i get here 3');

      /*
      const allPlayerProds = await Purchases.getProducts([
        "pro_yearly_player",
        "pro_monthly_player", "pro_season_player"
      ]);
      */

      const playerProductIds = [
        "pro_yearly_player",
        "pro_monthly_player",
        "pro_season_player"
      ];

      let allPlayerProds = [];

      for (const id of playerProductIds) {
        try {
          const prods = await Promise.race([
            Purchases.getProducts([id]),
            timeout(5000)
          ]);
          allPlayerProds.push(...prods);
          console.log(`Fetched player product ${id}`, prods);
        } catch (e) {
          console.log(`Fetching player product ${id} failed or timed out:`, e.message);
        }
      }



      prods = allProds.filter(p => !p.identifier.includes("forever"));
      prodsPlayer = allPlayerProds.filter(p => !p.identifier.includes("forever"));
      console.log('mainProductsNew when do i get here 4');
    } else {
      /*
      await Purchases.configure({
        apiKey: "goog_pfrcDUZxKWnrnDzWlAkAGXYDZpG"
      });
      */


      const subs = await Purchases.getProducts([
        "pro_yearly_indiv_android", "pro_yearly_team_android",
        "pro_monthly_indiv_android", "pro_monthly_team_android",
        "pro_season_indiv_android", "pro_season_team_android"
      ], 'subs');

      prods = subs;

      /*
      const iap = await Purchases.getProducts([
        "pro_forever_indiv_android", "pro_forever_team_android"
      ], 'inapp');
      */

    //prods = subs.filter(p => !p.identifier.includes("forever"));

      const playerSubs = await Purchases.getProducts([
        "pro_yearly_player", "pro_monthly_player_android", "pro_season_player_android"
      ], 'subs');

      prodsPlayer = playerSubs;

      console.log('mainProductsNew when do i get here 5');

      /*
      const playerIap = await Purchases.getProducts([
        "pro_forever_player_android"
      ], 'inapp');
      */

      //prodsPlayer = playerSubs.filter(p => !p.identifier.includes("forever"));
    }

    const sortByPeriod = (a, b) => {
      console.log('mainProductsNew when do i get here 6');
      const aKey = sortOrder.findIndex(k => a.identifier.includes(k));
      const bKey = sortOrder.findIndex(k => b.identifier.includes(k));
      return aKey - bKey;
    };

    //const indivProds = prods.filter(p => p.identifier.includes("indiv")).sort(sortByPeriod);
    const indivProds = prods
      .filter(p => p.identifier.includes("indiv") || p.identifier.includes("indv"))
      .sort(sortByPeriod);
    const teamProds = prods.filter(p => p.identifier.includes("team")).sort(sortByPeriod);
    prodsPlayer = prodsPlayer.sort(sortByPeriod);

    console.log('mainProductsNew when do i get here 7');

    let proMonthlyPlayerCost = null;

    const monthlyPlayerId = Platform.OS === 'ios'
      ? 'pro_monthly_player'
      : 'pro_monthly_player_android';

      console.log('mainProductsNew when do i get here 8');

    const monthlyPlayerProduct = prodsPlayer.find(p => p.identifier === monthlyPlayerId);

    if (monthlyPlayerProduct) {
      console.log('mainProductsNew when do i get here 9');
      // Remove currency symbols and keep numeric value
      proMonthlyPlayerCost = monthlyPlayerProduct.priceString.replace(/[^0-9.]/g, '');
    }

    console.log('mainProductsNew when do i get here 10');

    setAnimateLoading(false)

    return { indivProds, teamProds, prodsPlayer, proMonthlyPlayerCost };
};


  const mainProducts = async () => {
    Purchases.setDebugLogsEnabled(true)
    //Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    let prods = []
    let prodsPlayer = []

    if (Platform.OS === 'ios') {
      await Purchases.configure({
        apiKey: "appl_AiWRjxtNooUlINbXhTHZhTrLkWv"
      })
      prods = await Purchases.getProducts(["pro_forever_indiv", "pro_forever_team"])
      prodsPlayer = await Purchases.getProducts(["pro_forever_player"])
    } else if (Platform.OS === 'android') {
      await Purchases.configure({
        apiKey: "goog_pfrcDUZxKWnrnDzWlAkAGXYDZpG"
      })
      //const offerings = await Purchases.getOfferings();
    console.log(JSON.stringify(offerings) + ' what offerings do i have?');
      //const prodsSubs = await Purchases.getProducts(["pro_yearly_indiv_android", "pro_yearly_team_android"])

      /*
      const products = await Purchases.getProducts(
        ["pro_yearly_indiv_android", "pro_yearly_team_android", "pro_monthly_indiv_android", "pro_monthly_team_android", "pro_season_indiv_android", "pro_season_team_android"],
        'subs'  // Specify that you want subscription products
      );
      */

      const prodsIap = await Purchases.getProducts(["pro_forever_indiv_android", "pro_forever_team_android"], 'inapp')
      //prods = prodsSubs.concat(prodsIap);


      const prodsPlayerIap = await Purchases.getProducts(["pro_forever_player_android"], 'inapp')
      //prodsPlayer = prodsPlayerSubs.concat(prodsPlayerIap);


      prods = prodsIap;
      prodsPlayer = prodsPlayerIap;

   }

    //const prods = await Purchases.getProducts(["pro_yearly_indiv", "pro_yearly_team", "pro_forever_indiv", "pro_forever_team"])

    //const prodsPlayer = await Purchases.getProducts(["pro_yearly_player", "pro_forever_player"])

 console.log(JSON.stringify(prods) + ' output products.');
 console.log(JSON.stringify(prodsPlayer) + ' prodsPlayer output products.');
    //add team yearly & team forever costs to state here:
    //TODO:



    //let countProds = 0
    //let prodsInOrder = [1,2,3,4]
    let prodsInOrder = [1,2]
    const prodsInOrderMap = () => {

      if (userProfile === 1) {


      prods.map(prod => {
        if (prod.identifier === 'pro_forever_indiv' || prod.identifier === 'pro_forever_indiv_android') {
       console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 3'));
          prodsInOrder.splice(0, 1)
          prodsInOrder.splice(0, 0, prod);
        }
        else if (prod.identifier === 'pro_forever_team' || prod.identifier === 'pro_forever_team_android') {
       console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 4'));
          prodsInOrder.splice(1, 1)
          /*
          if (prodsInOrder.length < 4) {
              prodsInOrder.pop();
              prodsInOrder.push(prod)
              //prodsInOrder.splice(3, 0, prod);
           console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 5'));
          }
          else {
          */
              prodsInOrder.splice(1, 0, prod);
          //}
        }
      })
    }
    else {
      //prodsInOrder = [1,2]
      prodsInOrder = [1]
      prodsPlayer.map(prod => {
     console.log(JSON.stringify(prod) + ' output prod player.');
        if ( prod.identifier === "pro_forever_player" || prod.identifier === "pro_forever_player_android") {
       console.log(JSON.stringify(prodsInOrder + ' prodsInOrder player 2'));
          prodsInOrder.splice(0, 1)
          prodsInOrder.splice(0, 0, prod);
        }
      })
    }

      setProductList(prodsInOrder)

    }



    prodsInOrderMap()

 console.log(JSON.stringify(prodsInOrder) + ' output prodsInOrder products.');


    /*
    if (prodsInOrder.length < 3) {
      setProductList(prods)
    }
    */

    setAnimateLoading(false)

  }

/*
  const {
    currentPurchaseError,
    currentPurchase,
    getProducts,
    getSubscriptions,
  } = useIAP();

  useEffect(() => {

    getItemToDisplay()

  },[])

  useEffect(() => {
    // ... listen to currentPurchaseError, to check if any error happened
  }, [currentPurchaseError]);

  useEffect(() => {
    // ... listen to currentPurchase, to check if the purchase went through
  }, [currentPurchase]);
  */


/*
  const getItemToDisplay = async () => {

 console.log('weer hit in items to display.');

    try {
      const result = await initConnection();
     console.log('result', result);
      } catch (err) {
        console.warn(err.code, err.message);
      }

    //try {
   console.log(itemSkus + ' check itemSkus list');
      //const getProductsAndPurchases = async () => {

         const products = await getProducts({skus: itemSkus});
         //await getProducts({skus: itemSkus});

      //};

      //const products = await getProducts(itemSkus);
      let subscriptions = []
        if (Platform.OS === 'ios') {
          subscriptions = []
        }
        else {
            //subscriptions = await getSubscriptions(itemSkus);
            subscriptions = await getSubscriptions({skus: itemSkus});
        }

   console.log('Products', products);
   console.log('subscriptions', subscriptions);
      const productAll = subscriptions.concat(products)
   console.log('productAll', productAll);
      setProductList(productAll)
    //} catch (err) {
      console.warn(err.code, err.message);
    //}

 console.log(getProductList + ' check getProductList here.');

  }
  */

/*
  const purchase = async (sku: string) => {
    try {
      await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };
  */

/*
  const subscribe = async (sku: string, offerToken: string) => {
    try {
      await requestSubscription({
        sku,
        ...(offerToken && {subscriptionOffers: [{sku, offerToken}]}),
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };
  */

  const continueSetup = () => {

    if (userProfile === 1 || userProfile === 4) {
      let navigateBackCheck = false
      try {
        navigateBackCheck = props.route.params.navigateBack
      }
      catch {
        navigateBackCheck = false
      }

      if (navigateBackCheck === true) {
        navigate(props.route.params.navigateBackName, {
          fromContinue: false,
          gameIdDb: props.route.params.gameIdDb,
        })
      }
      else {
        navigate('Home')
      }

    }
    else if (userProfile === 2) {
      navigate('HomePlayer',{
        playerUserDataLength: playerUserDataTeams.length
      });
    }
    else if (userProfile === 3) {
      navigate('HomePlayer',{
        playerUserDataLength: playerUserDataTeams.length
      });
    }
    else {
      navigate('Home');
    }

  }


  const getPrice = (priceString) => {
    const price = JSON.parse(priceString);
    //return (<H1 style={styles.textHeaderNumber}>${price}</H1>)
    return(<Text style={styles.buttonTextBackWhite}>${price}</Text>)
  }

  const getTitle = (titleString) => {

    const title = JSON.parse(titleString);
    return(<Text style={styles.textHeaderTitle}>Pro Subscription</Text>)
    //return(<Text style={styles.textHeaderTitle}>{title}</Text>)
  }

  const getDescription = (descString) => {

    const desc = JSON.parse(descString);
    return(<Row><Text style={styles.textDesc}>{desc}</Text></Row>)
  }



  /**
   * For one-time products
   */
   const oneTimeProduct = () => {
    return (
      <Pressable onPress={() => purchase(product.productId)}>
        <Text>Update to Pro</Text>
      </Pressable>
    );
  };


  /**
   * For subscriptions products
   */
   /*
  const subProduct = () => {
    if (Platform.OS == 'android') {
      return product.subscriptionOfferDetails.map((offer) => (
        <Pressable
          onPress={() =>
            subscribe(product.productId, offer.offerToken)
          }
        >

        </Pressable>
      ));
    } else {
      return (
        <Pressable
          onPress={() => subscribe(product.productId, null)}
        >

        </Pressable>
      );
    }
  }
  */

  const cancelSub = () => {
    if (Platform.OS === 'ios') {
        return (
    <Text style={{color: '#fff', textAlign: 'center'}}
      onPress={() => Linking.openURL('https://support.apple.com/en-nz/HT202039')}>
      Cancel Subscriptiion
    </Text>
    )
  }
    else {
    <Text style={{color: '#fff', textAlign: 'center', fontSize: 12}}
      onPress={() => Linking.openURL('https://support.google.com/googleplay/answer/7018481?hl=en&co=GENIE.Platform%3DAndroid')}>
      Cancel Subscriptiion
    </Text>
    }
  }

  const termsAndCond = () => {
    if (Platform.OS === 'ios') {
      return (
        <VStack>
          <HStack>
          <Text style={styles.termsTextUnder}
            onPress={() => Linking.openURL('https://www.4dot6digital.com/privacy-policy')}>
            Privacy Policy |
          </Text>
          <Text style={styles.termsTextUnder}
            onPress={() => Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')}>
            <Text> </Text>Terms of Use
          </Text>
          </HStack>
        </VStack>
  )
}
  else {
  //do nothing.
  }
  }

  const resetBuyTest = () => {

      pro_yearly_indiv[0].purchased = false
      pro_yearly_indiv[0].expiryDate = null
      pro_yearly_team[0].purchased = false
      pro_yearly_team[0].expiryDate = null
      pro_forever_indiv[0].purchased = false
      pro_forever_indiv[0].expiryDate = null
      pro_forever_team[0].purchased = false
      pro_forever_team[0].expiryDate = null
      pro_yearly_player[0].purchased = false
      pro_yearly_player[0].expiryDate = null
      pro_forever_player[0].purchased = false
      pro_forever_player[0].expiryDate = null

      //pro_yearly_player = [{purchased: false, expiryDate: null}]
      //pro_forever_player = [{purchased: false, expiryDate: null}]

      //pro_yearly_player[0].expiryDate = 1709517774

      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: pro_yearly_team,
          pro_forever_team: pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))

      //Map through teamName array to add subscription to each team in account:
      try {
      teamNames.map(team => {
        if (team.teamType === 0) {
        const teamIdCodeGames = team.teamId
      firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
       })
     }
     })
    }
    catch {
   console.log('hit my catch teamanems resetBuyTest');
      // do nothing.
    }


  }

  const buyTest = (storeProduct) => {
 console.log(JSON.stringify(storeProduct) + ' output prod.');

    /*
    const expiryDateForProds = getExpiryDateForProds(storeProduct)
    const epochDate = expiryDateForProds[0]
    const productNameTitle = expiryDateForProds[1]
    */

    //const expiryDateForProds = getExpiryDateForProds(storeProduct, null)
    //const epochDate = expiryDateForProds[0]
    //const productNameTitle = expiryDateForProds[1]

 //console.log(epochDate + ' checking epochDate here thanks');
 //console.log(productNameTitle + ' checking productNameTitle here thanks');

    navigate('IapConfrim', {
      purchasedProduct: storeProduct,
      expiryDate: 1749784035000,
      productNameTitle: "test Sub pro_monthly_team",
      teamType: getTeamType,
      addTeamOnly: getAddTeamOnly,
      gameIdDb: getGameIdDb
    });
  }

  const getRestore = async (storeProduct) => {

    try {
      const restores = await Purchases.restorePurchases();
   console.log(JSON.stringify(restores) + ' what do we have in restore?');
      // ... check restored purchaserInfo to see if entitlement is now active

      const customerInfoPurchase = await Purchases.getCustomerInfo();
   console.log(JSON.stringify(customerInfoPurchase) + ' customerInfoPurchase  iap page');





      let restoredTitles = [];
      let epochDate = null
      let productNameTitle = ''
      let storeProduct = []

      restores.allPurchasedProductIdentifiers.forEach(restore => {

     console.log(JSON.stringify(restore) + ' what do i get fro restore?');

        let expirationDate = null
        if (restore === 'pro_yearly_indiv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv
        }
        else if (restore === 'pro_monthly_indv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_indv
        }
        else if (restore === 'pro_season_indv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_indv
        }
        else if (restore === 'pro_yearly_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team
        }
        else if (restore === 'pro_monthly_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_team
        }
        else if (restore === 'pro_season_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_team
        }
        else if (restore === 'pro_yearly_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player
        }
        else if (restore === 'pro_monthly_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_player
        }
        else if (restore === 'pro_season_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_player
        }
        else if (restore === 'pro_forever_indiv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv + ' check specific expiry date pro_forever_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv
        }
        else if (restore === 'pro_forever_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_team + ' check specific expiry date pro_forever_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_team
        }
        else if (restore === 'pro_forever_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_player + ' check specific expiry date pro_forever_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_player
        }
        else if (restore === 'pro_yearly_indiv_android:yearly-sub-799') {
       console.log('next hit is what i want to check.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
        console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_android:yearly-sub-799']
        }
        else if (restore === 'pro_monthly_indiv_android:month-sub-499') {
       console.log('next hit is what i want to check.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
        console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_indiv_android:month-sub-499']
        }
        else if (restore === 'pro_season_indiv_android:season-sub-2499') {
       console.log('next hit is what i want to check.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
        console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_indiv_android:season-sub-2499']
        }
        else if (restore === 'pro_yearly_team_android:yearly-sub-69') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_android:yearly-sub-69']
        }
        else if (restore === 'pro_monthly_team_android:monthly-sub-team-2999') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_team_android:monthly-sub-team-2999']
        }
        else if (restore === 'pro_season_team_android:season-sub-team-13999') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_team_android:season-sub-team-13999']
        }
        else if (restore === 'pro_yearly_player:yearly-sub-7-99') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99']
        }
        else if (restore === 'pro_monthly_player_android:month-sub-player-499') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_player_android:month-sub-player-499']
        }
        else if (restore === 'pro_season_player_android:season-sub-player-2499') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_player_android:season-sub-player-2499']
        }
        else if (restore === 'pro_forever_indiv_android') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv_android + ' check specific expiry date pro_forever_indiv_android iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv_android
        }
        else if (restore === 'pro_forever_team_android') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_team_android + ' check specific expiry date pro_forever_team_android iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_team_android
        }
        else if (restore === 'pro_forever_player_android') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_player_android + ' check specific expiry date pro_forever_player_android iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_player_android
        }

     console.log(JSON.stringify(restore) + ' restore name');
     console.log(JSON.stringify(expirationDate) + ' expirationDate ');

        const expiryDateForProds = getExpiryDateForProds(restore, expirationDate)
        epochDate = expiryDateForProds[0]
        productNameTitle = expiryDateForProds[1]
        storeProduct = restore

      })

      navigate('IapConfrim', {
        purchasedProduct: storeProduct,
        expiryDate: epochDate,
        productNameTitle: productNameTitle,
        teamType: getTeamType,
        addTeamOnly: getAddTeamOnly,
        gameIdDb: getGameIdDb
      });

    } catch (e) {
      console.warn(e); // standardized err.code and err.message available
      Alert.alert(e.message);
    }

  }

  const purchaseProductDisplay = async (storeProduct) => {

 console.log('check here 1');
    setAnimateLoading(true)

 console.log(JSON.stringify(storeProduct) + ' storeProduct is what? thanks');
 console.log(JSON.stringify(storeProduct.identifier) + ' storeProduct.identifier is what? thanks');

    try {
      //if (Platform.OS === 'ios') {
      const { customerInfo, productIdentifier } =
        await Purchases.purchaseStoreProduct({
          identifier: storeProduct.identifier,
          description: storeProduct.description,
          title: storeProduct.title,
          price: storeProduct.price,
          priceString: storeProduct.priceString,
          currencyCode: storeProduct.currencyCode,
          introPrice: storeProduct.introPrice,
          discounts: storeProduct.discounts,
          productCategory: storeProduct.productCategory,
          subscriptionPeriod: storeProduct.subscriptionPeriod,
          defaultOption: null,
          subscriptionOptions: null,
          presentedOfferingIdentifier: null,
        });
      /*}
      else {
     console.log(storeProduct.identifier + ' storeProduct.identifier is?');
     console.log(storeProduct.defaultOption.productId + ' storeProduct.defaultOption.productId is?');


        const { customerInfo, productIdentifier } =
          await Purchases.purchaseStoreProduct({
            identifier: storeProduct.defaultOption.productId,
            description: storeProduct.description,
            title: storeProduct.title,
            price: storeProduct.price,
            priceString: storeProduct.priceString,
            currencyCode: storeProduct.currencyCode,
            introPrice: storeProduct.introPrice,
            discounts: storeProduct.discounts,
            productCategory: storeProduct.productCategory,
            subscriptionPeriod: storeProduct.subscriptionPeriod,
            defaultOption: null,
            subscriptionOptions: null,
            presentedOfferingIdentifier: null,
          });



            //const { customerInfo } = await Purchases.purchaseStoreProduct(storeProduct.defaultOption.productId);


      }*/




     console.log('check here 2');

        const customerInfoPurchase = await Purchases.getCustomerInfo();
     console.log(JSON.stringify(customerInfoPurchase) + ' customerInfoPurchase  iap page');
     console.log('check here 3');

        /*
     console.log(JSON.stringify(customerInfo.activeSubscriptions) + ' check activeSubscriptions');

        if (customerInfo.activeSubscriptions !== null) {
       console.log('just testing.');
        }
        */

        let idProduct = ''
        if (Platform.OS !== 'ios') {
          const idWithColon = storeProduct.identifier
          try {
             idProduct = idWithColon.replace(/:/g, '');
          }
          catch {
            idProduct = storeProduct.identifier
          }
         }
         else {
           idProduct = storeProduct.identifier
         }


        let expirationDate = null
        if (idProduct === 'pro_yearly_indiv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv
        }
        else if (idProduct === 'pro_monthly_indv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_indv
        }
        else if (idProduct === 'pro_season_indv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_indv
        }
        else if (idProduct === 'pro_yearly_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team
        }
        else if (idProduct === 'pro_monthly_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_team
        }
        else if (idProduct === 'pro_season_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_team
        }
        else if (idProduct === 'pro_yearly_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player
        }
        else if (idProduct === 'pro_monthly_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_monthly_player
        }
        else if (idProduct === 'pro_season_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_season_player
        }
        else if (idProduct === 'pro_yearly_indiv_androidyearly-sub-799') {
       console.log('next hit is what i want to check.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
        console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_android:yearly-sub-799']
        }
        else if (idProduct === 'pro_monthly_indiv_androidmonth-sub-499') {
       console.log('next hit is what i want to check.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
        console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_indiv_android:month-sub-499']
        }
        else if (idProduct === 'pro_season_indiv_androidseason-sub-2499') {
       console.log('next hit is what i want to check.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page 2');
        console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv_android[':yearly-sub-799'] + ' check specific expiry date pro_yearly_indiv[:yearly-sub-799] iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_indiv_android:season-sub-2499']
        }
        else if (idProduct === 'pro_yearly_team_androidyearly-sub-69') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_android:yearly-sub-69']
        }
        else if (idProduct === 'pro_monthly_team_androidmonthly-sub-team-2999') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_team_android:monthly-sub-team-2999']
        }
        else if (idProduct === 'pro_season_team_androidseason-sub-team-13999') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_team_android:season-sub-team-13999']
        }
        else if (idProduct === 'pro_yearly_playeryearly-sub-7-99') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99']
        }
        else if (idProduct === 'pro_monthly_player_androidmonth-sub-player-499') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_monthly_player_android:month-sub-player-499']
        }
        else if (idProduct === 'pro_season_player_androidseason-sub-player-2499') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_season_player_android:season-sub-player-2499']
        }
        /*
        if (idProduct === 'pro_yearly_indiv') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv
        }
        else if (idProduct === 'pro_yearly_team') {
         console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team
        }
        else if (idProduct === 'pro_yearly_player') {
       console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player
        }
        else if (idProduct === 'pro_yearly_indiv_androidyearly-sub-799') {
       console.log(JSON.stringify(customerInfoPurchase) + ' customerInfoPurchase for andorid pro_yearly_indiv_android.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_androidyearly-sub-799'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_indiv_android:yearly-sub-799']
        }
        else if (idProduct === 'pro_yearly_team_androidyearly-sub-69') {
       console.log(JSON.stringify(customerInfoPurchase) + ' customerInfoPurchase for andorid pro_yearly_team_android.');
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_androidyearly-sub-69'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_team_android:yearly-sub-69']
        }
        else if (idProduct === 'pro_yearly_playeryearly-sub-7-99') {
       console.log(customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99'] + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis['pro_yearly_player:yearly-sub-7-99']
        }
        */
     console.log('check here 4');

        const expiryDateForProds = getExpiryDateForProds(storeProduct, expirationDate)
        const epochDate = expiryDateForProds[0]
        const productNameTitle = expiryDateForProds[1]

     console.log('check here 10');

        navigate('IapConfrim', {
          purchasedProduct: storeProduct.identifier,
          expiryDate: epochDate,
          productNameTitle: productNameTitle,
          teamType: getTeamType,
          addTeamOnly: getAddTeamOnly,
          gameIdDb: getGameIdDb
        });

    } catch (e) {
   console.log(JSON.stringify(e) + ' JSON payment error');
   console.log(e + ' payment error');
      if (!e.userCancelled) {
        setAnimateLoading(false)
        Alert.alert(e.userCancelled);
      }
      else {
        setAnimateLoading(false)
          Alert.alert(e.message);
      }
    }

    setAnimateLoading(false)
 console.log('check here 11');

  }

  //const getExpiryDateForProds = (storeProduct, expirationDate) => {
  const getExpiryDateForProds = async (storeProduct, expirationDate) => {

 console.log('check here 5');
 console.log(JSON.stringify(storeProduct) + ' output prod.');

 let idProduct = ''
 if (Platform.OS !== 'ios') {
   const idWithColon = storeProduct.identifier

   try {
      idProduct = idWithColon.replace(/:/g, '');
   }
   catch {
     idProduct = storeProduct.identifier
   }
  }
  else {
    idProduct = storeProduct.identifier
  }

    let epochDate = new Date();
    let productNameTitle = ''
    if (idProduct === 'pro_yearly_indiv' || storeProduct === 'pro_yearly_indiv' || idProduct === 'pro_yearly_indiv_androidyearly-sub-799' || storeProduct === 'pro_yearly_indiv_androidyearly-sub-799' || idProduct === 'pro_monthly_indv' || storeProduct === 'pro_monthly_indv' || idProduct === 'pro_monthly_indiv_androidmonth-sub-499' || storeProduct === 'pro_monthly_indiv_androidmonth-sub-499' || idProduct === 'pro_season_indv' || storeProduct === 'pro_season_indv' || idProduct === 'pro_season_indiv_androidseason-sub-2499' || storeProduct === 'pro_season_indiv_androidseason-sub-2499') {
      pro_yearly_indiv[0].purchased = true
      /*
    console.log(epochDate + ' epochDate cehcek. here. one');
      epochDate.setFullYear(epochDate.getFullYear() + 1);
    console.log(epochDate + ' epochDate cehcek. here. two');
      epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
    console.log(epochDate + ' epochDate cehcek. here. three');

      epochDate = epochDate * 1000
      */

   console.log('check here 6a');
      pro_yearly_indiv[0].expiryDate = expirationDate
      pro_yearly_indiv[0].identifier = storeProduct.identifier
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   console.log(JSON.stringify(pro_yearly_indiv) + ' show me pro_yearly_indiv here now.');

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: pro_yearly_team,
          pro_forever_team: pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))
     console.log('check here 7a');

      //Map through teamName array to add subscription to each team in account:
      try {

        await Promise.all(teamNames.map(team => {
          if (team.teamType === 0) {
            const teamIdCodeGames = team.teamId;
            return firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
              pro_forever_indiv,
              pro_yearly_indiv,
              pro_yearly_team,
              pro_forever_team,
              pro_yearly_player,
              pro_forever_player
            });
          }
        }))

        /*
      teamNames.map(team => {
        if (team.teamType === 0) {
          const teamIdCodeGames = team.teamId
          firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
             pro_forever_indiv: pro_forever_indiv,
             pro_yearly_indiv: pro_yearly_indiv,
             pro_yearly_team: pro_yearly_team,
             pro_forever_team: pro_forever_team,
             pro_yearly_player: pro_yearly_player,
             pro_forever_player: pro_forever_player,
           })
         }
     })*/
  console.log('check here 8a');
    }
    catch {
   console.log('hit my catch teamanems pro_yearly_indiv');
      // do nothing.
    }
      //productNameTitle = 'Pro Manager/Coach - Year Subscription'
      /*const extractAndCapitalizePlanType = (str) => {
        const match = str.match(/pro_(.*?)_(?:indiv|indv)/); // matches both _indv and _indiv
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };*/
      const extractAndCapitalizePlanType = (str) => {
        if (typeof str !== 'string') return null; // Guard clause to avoid the TypeError
        const match = str.match(/pro_(.*?)_(?:indiv|indv)/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return 'Pro Season Stats - Subscription';
      };
      const typeOfProduct = extractAndCapitalizePlanType(idProduct)
      productNameTitle = 'Pro Season Stats - ' + typeOfProduct + ' Subscription'
    }
    else if ( idProduct === 'pro_yearly_team' || storeProduct === 'pro_yearly_team' || idProduct === 'pro_yearly_team_androidyearly-sub-69' || storeProduct === 'pro_yearly_team_androidyearly-sub-69' || idProduct === 'pro_monthly_team' || storeProduct === 'pro_monthly_team' || idProduct === 'pro_monthly_team_androidmonthly-sub-team-2999' || storeProduct === 'pro_monthly_team_androidmonthly-sub-team-2999' ||  idProduct === 'pro_season_team' || storeProduct === 'pro_season_team' || idProduct === 'pro_season_team_androidseason-sub-team-13999' || storeProduct === 'pro_season_team_androidseason-sub-team-13999') {
      pro_yearly_team[0].purchased = true
   console.log('check here 6b');
      /*
    console.log(epochDate + ' epochDate cehcek. here. one');
      epochDate.setFullYear(epochDate.getFullYear() + 1);
    console.log(epochDate + ' epochDate cehcek. here. two');
      epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
    console.log(epochDate + ' epochDate cehcek. here. three');

      epochDate = epochDate * 1000
      */

      pro_yearly_team[0].expiryDate = expirationDate
      pro_yearly_team[0].identifier = storeProduct.identifier
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   console.log('check here 7b');
      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: pro_yearly_team,
          pro_forever_team: pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))

      //Map through teamName array to add subscription to each team in account:
      try {
        await Promise.all(teamNames.map(team => {
          if (team.teamType === 0) {
            const teamIdCodeGames = team.teamId;
            return firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
              pro_forever_indiv,
              pro_yearly_indiv,
              pro_yearly_team,
              pro_forever_team,
              pro_yearly_player,
              pro_forever_player
            });
          }
        }))

        /*
      teamNames.map(team => {
        if (team.teamType === 0) {
        const teamIdCodeGames = team.teamId
      firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
     */
  console.log('check here 8b');
    }
    catch {
   console.log('hit my catch teamanems pro_yearly_team');
      // do nothing.
    }
      const extractAndCapitalizePlanType = (str) => {
        const match = str.match(/pro_(.*?)_team/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return 'Pro Live Scores - Subscription';
      };
      const typeOfProduct = extractAndCapitalizePlanType(idProduct)
      productNameTitle = 'Pro Live Scores - ' + typeOfProduct + ' Subscription'
    }
    else if ( idProduct === 'pro_yearly_player' || storeProduct === 'pro_yearly_player' || idProduct === 'pro_yearly_playeryearly-sub-7-99' || storeProduct === 'pro_yearly_playeryearly-sub-7-99' || idProduct === 'pro_monthly_player' || storeProduct === 'pro_monthly_player' || idProduct === 'pro_monthly_player_androidmonth-sub-player-499' || storeProduct === 'pro_monthly_player_androidmonth-sub-player-499' || idProduct === 'pro_season_player' || storeProduct === 'pro_season_player' || idProduct === 'pro_season_player_androidseason-sub-player-2499' || storeProduct === 'pro_season_player_androidseason-sub-player-2499') {
      pro_yearly_player[0].purchased = true
   console.log('check here 6c');

      /*
    console.log(epochDate + ' epochDate cehcek. here. one');
      epochDate.setFullYear(epochDate.getFullYear() + 1);
    console.log(epochDate + ' epochDate cehcek. here. two');
      epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
    console.log(epochDate + ' epochDate cehcek. here. three');

      epochDate = epochDate * 1000
      */

      pro_yearly_player[0].expiryDate = expirationDate
      pro_yearly_player[0].identifier = storeProduct.identifier
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   console.log('check here 67');

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: pro_yearly_team,
          pro_forever_team: pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))

      //Map through teamName array to add subscription to each team in account:
      try {
        await Promise.all(teamNames.map(team => {
          if (team.teamType === 0) {
            const teamIdCodeGames = team.teamId;
            return firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
              pro_forever_indiv,
              pro_yearly_indiv,
              pro_yearly_team,
              pro_forever_team,
              pro_yearly_player,
              pro_forever_player
            });
          }
        }));

        /*
      teamNames.map(team => {
        if (team.teamType === 0) {
        const teamIdCodeGames = team.teamId
      firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
     */
  console.log('check here 8c');
    }
    catch {
   console.log('hit my catch teamanems pro_yearly_player');
      // do nothing.
    }
      const extractAndCapitalizePlanType = (str) => {
        const match = str.match(/pro_(.*?)_player/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return 'Pro Live Scores & Stats - Subscription';
      };
      const typeOfProduct = extractAndCapitalizePlanType(idProduct)
      productNameTitle = 'Pro Live Scores & Stats - ' + typeOfProduct + ' Subscription'
      //productNameTitle = 'Pro - Year Subscription'
    }
    else if (idProduct === 'pro_forever_indiv' || storeProduct === 'pro_forever_indiv' || idProduct === 'pro_forever_indiv_android' || storeProduct === 'pro_forever_indiv_android') {
      pro_forever_indiv[0].purchased = true
      epochDate = null
      pro_forever_indiv[0].identifier = storeProduct.identifier
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   console.log('check here 6d');

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: pro_yearly_team,
          pro_forever_team: pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))


      //Map through teamName array to add subscription to each team in account:
      try {

        await Promise.all(teamNames.map(team => {
          if (team.teamType === 0) {
            const teamIdCodeGames = team.teamId;
            return firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
              pro_forever_indiv,
              pro_yearly_indiv,
              pro_yearly_team,
              pro_forever_team,
              pro_yearly_player,
              pro_forever_player
            });
          }
        }))

        /*
      teamNames.map(team => {
        if (team.teamType === 0) {
        const teamIdCodeGames = team.teamId
      firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
     */
  console.log('check here 7d');
    }
    catch {
   console.log('hit my catch teamanems pro_forever_indiv');
      // do nothing.
    }

      productNameTitle = 'Pro Manager/Coach - Forever Bundle'
    }
    else if (idProduct === 'pro_forever_team' || storeProduct === 'pro_forever_team' || idProduct === 'pro_forever_team_android' || storeProduct === 'pro_forever_team_android') {
      pro_forever_team[0].purchased = true
      epochDate = null
      pro_forever_team[0].identifier = storeProduct.identifier
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   console.log('check here 6e');

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: pro_yearly_team,
          pro_forever_team: pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))

      //Map through teamName array to add subscription to each team in account:
      try {
        await Promise.all(teamNames.map(team => {
          if (team.teamType === 0) {
            const teamIdCodeGames = team.teamId;
            return firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
              pro_forever_indiv,
              pro_yearly_indiv,
              pro_yearly_team,
              pro_forever_team,
              pro_yearly_player,
              pro_forever_player
            });
          }
        }))

        /*
      teamNames.map(team => {
        if (team.teamType === 0) {
        const teamIdCodeGames = team.teamId
      firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
   })*/
  console.log('check here 7e');
    }
    catch {
   console.log('hit my catch teamanems pro_forever_team');
      // do nothing.
    }

      productNameTitle = 'Pro Live Scores - Forever Bundle'
    }
    else if (idProduct === 'pro_forever_player' || storeProduct === 'pro_forever_player' || idProduct === 'pro_forever_player_android' || storeProduct === 'pro_forever_player_android') {
      pro_forever_player[0].purchased = true
      epochDate = null
      pro_forever_player[0].identifier = storeProduct.identifier
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   console.log('check here 6f');

      userRef.doc('iap').update({
          pro_forever_indiv: pro_forever_indiv,
          pro_yearly_indiv: pro_yearly_indiv,
          pro_yearly_team: pro_yearly_team,
          pro_forever_team: pro_forever_team,
          pro_yearly_player: pro_yearly_player,
          pro_forever_player: pro_forever_player
        })
        .catch(error => this.setState({ errorMessage: error.message }))

      //Map through teamName array to add subscription to each team in account:
      try {
        await Promise.all(teamNames.map(team => {
          if (team.teamType === 0) {
            const teamIdCodeGames = team.teamId;
            return firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
              pro_forever_indiv,
              pro_yearly_indiv,
              pro_yearly_team,
              pro_forever_team,
              pro_yearly_player,
              pro_forever_player
            });
          }
        }))

        /*
      teamNames.map(team => {
        if (team.teamType === 0) {
        const teamIdCodeGames = team.teamId
      firestore().collection(teamIdCodeGames).doc(teamIdCodeGames).update({
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
   })*/
  console.log('check here 7f');
    }
    catch {
   console.log('hit my catch teamanems pro_forever_player');
      // do nothing.
    }

      productNameTitle = 'Pro - Forever Bundle'
    }

 console.log('check here 9');

    return [epochDate, productNameTitle]

  }

  const productDisplay = (product) => {
    /*
    return (
    <View>
          <Row>
            <Text style={styles.textHeaderTitle}>{product.title}</Text>
            <Text style={styles.buttonTextBackWhite}>{product.priceString}</Text>
          </Row>
          <Row>
            <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => purchaseProductDisplay(product)}>Buy</Button>
          </Row>
      </View>
    )
    */

    const getProdDesc = (productDescIdentifier, price) => {

   console.log(productDescIdentifier + ' productDescIdentifier is?');

      const teamPrice = price + 2
      const teamPriceString = teamPrice.toString()

      console.log(teamForeverCost + ' teamForeverCost here ' + price);
      //if (productDescIdentifier === 'pro_yearly_player') {
        console.log('do we get hit??');
          //setTeamForeverCost(price)
          let priceExtra = (price / 10) + 2
          priceExtra = Number(priceExtra.toFixed(2))
          //setTeamYearlyCost(priceExtra)
      //}



      if (productDescIdentifier === 'pro_forever_indiv' || productDescIdentifier === 'pro_forever_indiv_android') {

        /*
        if (teamForeverCost === 0) {
            const totalPriceForTwelve = teamPrice * 12
            const totalPriceForTwelveTwoDP = Number(totalPriceForTwelve.toFixed(2))
            //setTeamForeverCost(totalPriceForTwelveTwoDP)
        }
        */

        return (
          <Box>
          <VStack style={{paddingTop: 5}}>
          <HStack>
            <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
            <Text style={styles.textFourteen}>
            Forever subscription - pay once and have pro forever
            </Text>
          </HStack>
          {checkSortIap === 0 &&
            <Box>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                  Subs Management
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                  Real-Time Player Sub Tracking
                </Text>
              </HStack>
            </Box>
          }
          <HStack>
            <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
            <Text style={styles.textFourteen}>
            Access to all drills and advanced variations
            </Text>
          </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access player names on season stats
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
                Individual performance analytics
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              team performance data.
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Previous games data
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
              <Text style={styles.textFourteen}>
              Pay for entire team to view Pro Features
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
              <Text style={styles.textFourteen}>
              Full team access to real-time live events (goals, subs, etc)
              </Text>
            </HStack>
            </VStack>
          </Box>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_indiv' || productDescIdentifier === 'pro_yearly_indiv_androidyearly-sub-799') {

        /*
        if (teamYearlyCost === 0) {
            const totalPriceForTwelve = teamPrice
            const totalPriceForTwelveTwoDP = Number(totalPriceForTwelve.toFixed(2))
            setTeamYearlyCost(totalPriceForTwelveTwoDP)
        }
        */

        return (
          <Box>
          <VStack style={{paddingTop: 5}}>
          {checkSortIap === 0 &&
            <Box>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                  Subs Management
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                  Real-Time Player Sub Tracking
                </Text>
              </HStack>
            </Box>
          }
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access player names on season stats
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
                Individual performance analytics
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              team performance data.
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Previous games data
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access to all drills and advanced variations
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
              <Text style={styles.textFourteen}>
              Pay for entire team to view Pro Features
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
              <Text style={styles.textFourteen}>
              Full team access to real-time live events (goals, subs, etc)
              </Text>
            </HStack>
            </VStack>
          </Box>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_team' || productDescIdentifier === 'pro_yearly_team_androidyearly-sub-69') {
        return (
          <Box style={{maxWidth: '100%'}}>
          <VStack style={{paddingTop: 5}}>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              All features from 'Pro Season Stats & Drills' included
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Pay for entire team to view Pro Features
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Full team access to real-time live events (goals, subs, etc)
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
                Full team access to season stats
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              As coach, you also receive live scores and stats
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access to all drills and advanced variations
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Save your team ${priceExtra} each buying individual subscriptions
              </Text>
            </HStack>
            <Button style={{justifyContent: 'left', margin: 0, padding: 0}} bg="transparent" variant="subtle" onPress={() => setMoreinfo(1)}>
              <Text bold style={styles.textFourteenInfo}>More info...</Text>
            </Button>
            {getMoreinfo === 1 &&
              <Box style={{marginLeft: 15}}>
                <Text style={styles.textFourteen}>When you purchase this plan, any team member or parent who enters your unique Team ID while setting up Live Scores — including those who’ve already set it up — will automatically receive Pro features on their account.</Text>
              </Box>
            }
            </VStack>
        </Box>
        )
      }
      else if (productDescIdentifier === 'pro_forever_team' || productDescIdentifier === 'pro_forever_team_android') {
        return (
          <Box style={{maxWidth: '100%'}}>
          <VStack style={{paddingTop: 5}}>
          <HStack>
            <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
            <Text style={styles.textFourteen}>
            Forever subscription - pay once and have pro forever
            </Text>
          </HStack>
          <HStack>
            <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
            <Text style={styles.textFourteen}>
            All features from 'Pro Season Stats & Drills' included
            </Text>
          </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Pay for entire team to view Pro Features
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Full team access to real-time live events (goals, subs, etc)
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
                Full team access to season stats
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              As coach, you also receive live scores and stats
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access to all drills and advanced variations
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Save your team buying individual subscriptions
              </Text>
            </HStack>
            <Button style={{justifyContent: 'left', margin: 0, padding: 0}} bg="transparent" variant="subtle" onPress={() => setMoreinfo(1)}>
              <Text bold style={styles.textFourteenInfo}>More info...</Text>
            </Button>
            {getMoreinfo === 1 &&
              <Box style={{marginLeft: 15}}>
                <Text style={styles.textFourteen}>When you purchase this plan, any team member or parent who enters your unique Team ID while setting up Live Scores — including those who’ve already set it up — will automatically receive Pro features on their account.</Text>
              </Box>
            }
            </VStack>
        </Box>

        )
      }
      else if (productDescIdentifier === 'pro_yearly_player' || productDescIdentifier === 'pro_yearly_playeryearly-sub-7-99') {
     console.log('do we hit this userProfile 2 dispay text 5');
        return (
          <Box>
          <VStack style={{paddingTop: 5}}>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
                Player names on live scores & substitutes
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Individual performance analytics
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access to team data
              </Text>
            </HStack>
            </VStack>
        </Box>
        )
      }
      else if (productDescIdentifier === 'pro_forever_player' || productDescIdentifier === 'pro_forever_player_android') {
     console.log('do we hit this userProfile 2 dispay text 6');
        return (
          <Box>
          <VStack style={{paddingTop: 5}}>
          <HStack>
            <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
            <Text style={styles.textFourteen}>
              Forever subscription - pay once and have pro forever
            </Text>
          </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
                Player names on live scores & substitutes
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Individual performance analytics
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access to team data
              </Text>
            </HStack>
            </VStack>
          </Box>

        )
      }
    }

    const getProdTitle = (productDescIdentifier) => {

   console.log(productDescIdentifier + ' productDescIdentifier is?');


      if (productDescIdentifier === 'pro_forever_indiv' || productDescIdentifier === 'pro_forever_indiv_android') {
        return (
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 24, lineHeight: 24}}>
            Pro Season Stats & Drills - Forever Bundle
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_indiv' || productDescIdentifier === 'pro_yearly_indiv_androidyearly-sub-799') {
        return (
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>
            Pro Season Stats & Drills
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_team' || productDescIdentifier === 'pro_yearly_team_androidyearly-sub-69') {
        return (
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>
            Team Stats & Live Scores
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_forever_team' || productDescIdentifier === 'pro_forever_team_android') {
        return (
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 24, lineHeight: 24}}>
            Pro Team Live Scores - Forever Bundle
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_player' || productDescIdentifier === 'pro_yearly_playeryearly-sub-7-99') {
     console.log('do we hit this userProfile 2 dispay text 3');
        return (
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>
            Pro Live Scores & Stats
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_forever_player' || productDescIdentifier === 'pro_forever_player_android') {
     console.log('do we hit this userProfile 2 dispay text 4');
        return (
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 24, lineHeight: 24}}>
            Pro Live Scores & Stats - Forever Bundle
        </Text>
        )
      }
    }

    const outputJsonIap = (product) => {
      console.log(JSON.stringify(product) + ' JSON IAP');
      console.log(product.identifier + ' product.identifier text');
      console.log(JSON.stringify(product.subscriptionOptions) + ' product.subscriptionOptions new');
      console.log(JSON.stringify(product.subscriptionOptions[0].id) + ' product.subscriptionOptions[0].id new');
    }

    const getProductBox = (product) => {
   console.log('do we hit this userProfile 2 dispay text 2.');

   let idProduct = ''
   if (Platform.OS !== 'ios') {
     const idWithColon = product.identifier
     try {
        idProduct = idWithColon.replace(/:/g, '');
     }
     catch {
       idProduct = product.identifier
     }
    }
    else {
      idProduct = product.identifier
    }
    console.log(idProduct + ' what is idProduct?');

      return (
        <Box alignItems="center" mt="5" shadow="6" ml="5" mr="5" style={{overflow: 'hidden'}}>
        <Box style={[idProduct === 'pro_yearly_team' ? styles.backgroundImageBorderNew : idProduct === 'pro_forever_team' ? styles.backgroundImageBorderNew : idProduct === 'pro_forever_team_android' ? styles.backgroundImageBorderNew : idProduct === 'pro_yearly_team_androidyearly-sub-69' ? styles.backgroundImageBorderNew : styles.backgroundImageNew]}>
        {idProduct === 'pro_yearly_team' &&

          <Box bg="#222">
            <Box style={{backgroundColor: '#FACC15', maxWidth: '50%', borderTopLeftRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5}}><Text style={{fontSize: 16, fontWeight: '600'}}>RECOMMENDED</Text></Box>
          </Box>

        }
        {idProduct === 'pro_yearly_team_androidyearly-sub-69' &&
        <Box bg="#222">
          <Box style={{backgroundColor: '#FACC15', maxWidth: '50%', borderTopLeftRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5}}><Text style={{fontSize: 16, fontWeight: '600'}}>RECOMMENDED</Text></Box>
        </Box>
        }
        {idProduct === 'pro_forever_team' &&
        <Box bg="#222">
          <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', borderTopLeftRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5}}><Text style={{fontSize: 24, lineHeight: 26, fontWeight: '600'}}>HIGHLY RECOMMENDED</Text></Box>
        </Box>
        }
        {idProduct === 'pro_forever_team_android' &&
        <Box bg="#222">
          <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', borderTopLeftRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5}}><Text style={{fontSize: 24, lineHeight: 26, fontWeight: '600'}}>HIGHLY RECOMMENDED</Text></Box>
        </Box>
        }

          <Box style={styles.paddingForNewBg}>

            <HStack>
              <VStack minW="75%">
                {getProdTitle(idProduct)}
<HStack>
                <Text style={styles.textSixteen}>

              {product.priceString}
                {((idProduct === 'pro_yearly_indiv' || idProduct === 'pro_yearly_indiv_androidyearly-sub-799') || (idProduct === 'pro_yearly_team' || idProduct === 'pro_yearly_team_androidyearly-sub-69') || (idProduct === 'pro_yearly_player' || idProduct === 'pro_yearly_playeryearly-sub-7-99')) &&
                <HStack>

                      <Text style={{color: '#ccc', fontSize: 12}}>/year</Text>
                      </HStack>


                }
                </Text>
                </HStack>

                {((idProduct === 'pro_yearly_indiv' || idProduct === 'pro_yearly_indiv_androidyearly-sub-799') || (idProduct === 'pro_yearly_team' || idProduct === 'pro_yearly_team_androidyearly-sub-69') || (idProduct === 'pro_yearly_player' || idProduct === 'pro_yearly_playeryearly-sub-7-99')) &&

                  <HStack>
                    <Box style={{backgroundColor: '#E879F9', borderRadius: 15, padding: 3, paddingLeft: 10, paddingRight: 10, marginTop: 5}}>
                      <Text style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>Risk Free - 1 Month Free Trial - Cancel Anytime!</Text>
                    </Box>
                    </HStack>

                }



              {getProdDesc(idProduct, product.price)}
              <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "sm", color: '#fff'}} mt="5" variant="subtle" onPress={() => purchaseProductDisplay(product)}>
                <Text bold style={{color: '#fff', fontSize: 20}}>Buy Now! ({product.priceString})</Text>
              </Button>
              {Platform.OS === 'ios' &&
                <Text style={styles.termsText}>Cancel your subscription at anytime.</Text>

              }
              {Platform.OS !== 'ios' &&
                <Text style={styles.termsText}>Cancel your subscription at anytime.</Text>
              }
              {termsAndCond()}
            </VStack>
            </HStack>

        </Box>
      </Box>
      </Box>
      )
    }

 console.log(userProfile + ' what do we have userProfile set as?');
 console.log(JSON.stringify(product) + ' what do we have product set as?');
 console.log(product.identifier + ' what do we have product.identifier set as?');

   let idProduct = ''
   if (Platform.OS !== 'ios') {
       const idWithColon = product.identifier
       try {
          idProduct = idWithColon.replace(/:/g, '');
       }
       catch {
         idProduct = product.identifier
       }
    }
    else {
      idProduct = product.identifier
    }

    if (userProfile === 1) {
      if ((pro_forever_indiv[0].purchased === true && pro_yearly_team[0].purchased === false) && (idProduct === 'pro_yearly_team' || idProduct === 'pro_forever_team' || idProduct === 'pro_yearly_team_androidyearly-sub-69' || idProduct === 'pro_forever_team_android')) {
      return (
          getProductBox(product)
      )
    }
    else if ((pro_forever_team[0].purchased === true) || (pro_forever_indiv[0].purchased === true && pro_yearly_team[0].purchased === true) || (pro_yearly_team[0].purchased === true)) {
      // return nopthing. nothing to upgrade to.
    }
    else if ((pro_yearly_indiv[0].purchased === true && pro_yearly_team[0].purchased === false) && (idProduct === 'pro_yearly_team' || idProduct === 'pro_forever_team' || idProduct === 'pro_yearly_team_androidyearly-sub-69' || idProduct === 'pro_forever_team_android')) {
      return (
          getProductBox(product)
      )
    }
    else if (pro_yearly_indiv[0].purchased === false && pro_forever_indiv[0].purchased === false && pro_forever_team[0].purchased === false && pro_yearly_team[0].purchased === false)
    {
   console.log('are we hitting this?');
      return (
        getProductBox(product)
      )
    }
    else {
      //return nothing.
    }
    }
    else if (userProfile === 2 || userProfile === 3 || userProfile === 3 || userProfile === 0) {
      if ((pro_yearly_team[0].purchased === true || pro_yearly_indiv[0].purchased === true) && (idProduct === 'pro_yearly_player' || idProduct === 'pro_yearly_playeryearly-sub-7-99')) {
        // return nopthing. nothing to upgrade to.
      }
      else if ((pro_yearly_player[0].purchased === true) && (idProduct === 'pro_yearly_player' || idProduct === 'pro_yearly_playeryearly-sub-7-99')) {
        // return nopthing. nothing to upgrade to.
      }
      else {
     console.log('do we hit this userProfile 2 dispay text.');
        return (
          getProductBox(product)
        )
      }
    }

  }

  const getExpiryDate = () => {

 console.log('hit cehcek 1');
 console.log(pro_forever_indiv + ' pro_forever_indiv');
 console.log();

    if (pro_forever_indiv[0].purchased === true && pro_yearly_team[0].purchased === false) {
   console.log('hit pro_forever_indiv === true && pro_yearly_team === false');
      return (
        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18, paddingBottom: 10}}>Pro Manager/Coach - Forever Bundle</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Your current subscription doesn't expire and allows YOU to view stats and scores! Upgrade to 'Pro Live Scores - Forever Bundle' or 'Pro Live Scores - Year Subscription' to allow your ENTIRE TEAM to view live scores and stats!
                    </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
      )
    }
    else if ( pro_forever_team[0].purchased === true) {
   console.log('hit cehcek 2');
      return (
        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18, paddingBottom: 10}}>Pro Live Scores - Forever Bundle</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Your current subscription doesn't expire and allows YOU and your TEAM can view live scores and stats FOREVER!
                    </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
      )
    }
    else if (pro_forever_indiv[0].purchased === true && pro_yearly_team[0].purchased === true) {
console.log('hit cehcek 3');
      const expiryDate = new Date(pro_yearly_indiv[0].expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;

      /*const extractAndCapitalizePlanType = (str) => {
        const match = str.match(/pro_(.*?)_team/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };*/
      const extractAndCapitalizePlanType = (str) => {
        if (typeof str !== 'string') return null; // Prevent TypeError on undefined/null
        const match = str.match(/pro_(.*?)_team/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };

      const typeOfProduct = extractAndCapitalizePlanType(pro_yearly_team[0].identifier)
      const productNameTitle = 'Pro Live Scores - ' + typeOfProduct + ' Subscription'

      return (

        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>{productNameTitle}</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Expires: {time}
                    </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
      )
    }
    else if (pro_yearly_indiv[0].purchased === true && pro_yearly_team[0].purchased === false) {
 console.log('hit cehcek 4');
 console.log(JSON.stringify(pro_yearly_indiv) + ' pro_yearly_indiv expiry.');
      const expiryDate = new Date(pro_yearly_indiv[0].expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;

      /*const extractAndCapitalizePlanType = (str) => {
        const match = str.match(/pro_(.*?)_(?:indiv|indv)/); // matches both _indv and _indiv
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };*/
      const extractAndCapitalizePlanType = (str) => {
        if (typeof str !== 'string') return null; // Guard clause to avoid the TypeError
        const match = str.match(/pro_(.*?)_(?:indiv|indv)/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };
      const typeOfProduct = extractAndCapitalizePlanType(pro_yearly_indiv[0].identifier)
      const productNameTitle = 'Pro Season Stats - ' + typeOfProduct + ' Subscription'

      return (
        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>{productNameTitle}</Text>
                    <Text style={{color: '#fff', fontSize: 16, paddingBottom: 10}}>
                      Expires: {time}
                    </Text>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Upgrade to 'Pro Live Scores - Year Subscription' to allow your team to see live scores and stats for the next year!
                    </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
      )
    }
    else if (pro_yearly_team[0].purchased === true) {
   console.log('hit cehcek 5');
      const expiryDate = new Date(pro_yearly_team[0].expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;

      /*const extractAndCapitalizePlanType = (str) => {
        const match = str.match(/pro_(.*?)_team/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };*/
      const extractAndCapitalizePlanType = (str) => {
        if (typeof str !== 'string') return null; // Prevent calling .match() on undefined
        const match = str.match(/pro_(.*?)_team/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };

      const typeOfProduct = extractAndCapitalizePlanType(pro_yearly_team[0].identifier)
      const productNameTitle = 'Pro Live Scores - ' + typeOfProduct + ' Subscription'

      return (

        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>{productNameTitle}</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Expires: {time}
                    </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
      )
    }
    else if (pro_yearly_player[0].purchased === true) {
   console.log('hit cehcek 5');
      const expiryDate = new Date(pro_yearly_player[0].expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;

      /*const extractAndCapitalizePlanType = (str) => {
        const match = str.match(/pro_(.*?)_player/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };*/
      const extractAndCapitalizePlanType = (str) => {
        if (typeof str !== 'string') return null; // Guard to prevent TypeError
        const match = str.match(/pro_(.*?)_player/);
        if (match && match[1]) {
          const word = match[1];
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return null;
      };

      const typeOfProduct = extractAndCapitalizePlanType(pro_yearly_player[0].identifier)
      const productNameTitle = 'Pro Live Scores & Stats - ' + typeOfProduct + ' Subscription'

      return (

        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>{productNameTitle}</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Expires: {time}
                    </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
      )
    }
    else if ( pro_forever_player[0].purchased === true) {
   console.log('hit cehcek 2');
      return (
        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18, paddingBottom: 10}}>Pro Live Scores - Forever Bundle</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Your current subscription doesn't expire and allows you to view live scores and stats FOREVER!
                    </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Center>
            </LinearGradient>
          </ImageBackground>
          </Box>
      )
    }

    /*
    const expiryDate = new Date(pro_yearly_indiv[0].expiryDate);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = expiryDate.getFullYear();
    const month = months[expiryDate.getMonth()];
    const date = expiryDate.getDate();
    const time = date + ' ' + month + ' ' + year;

    return (
      <VStack>
        <HStack style={{justifyContent: 'center',}}>
          <Text style={{color: '#fff', fontSize: 16}}>
            Current Subscription Ends: {time}
          </Text>
        </HStack>
      </VStack>
    )
    */

  }

  const getPageTitleDisplay = () => {
    //const addTeamOnly = props.route.params.addTeamOnly

    if (checkSortIap !== 0) {
      return (
        <Box minW='100%' style={{zIndex: 3, elevation: 3, borderBottomColor: '#ccc', borderBottomWidth: 0, paddingTop: 41, overflow: 'hidden'}}>
          <HStack>
            <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
              <Box shadow="7" mt="20" mb="2">
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientTitle}>
                  <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 0, paddingLeft: 0, paddingTop: 10, paddingRight: 20}}>
                    Upgrade to Pro!
                  </Heading>
                  <Text style={{color: '#ccc'}}>Choose your subscription plan</Text>
                </LinearGradient>
              </Box>

            </View>
          </HStack>
        </Box>
      )
    }
    else {
      return (
        <Box minW='100%' style={{zIndex: 3, elevation: 3, borderBottomColor: '#ccc', borderBottomWidth: 0, paddingTop: 0, overflow: 'hidden', marginTop: -16}}>
          <HStack>
            <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
              <Box shadow="7" mt="20" mb="2">
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientTitle}>
                  <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 0, paddingLeft: 0, paddingTop: 10, paddingRight: 20}}>
                    Choose a Plan to Continue
                  </Heading>
                  <Text style={{color: '#ccc'}}>Select a plan to continue subs management setup</Text>
                </LinearGradient>
              </Box>
            </View>
          </HStack>
        </Box>
      )
    }
  }

  const getPagePaidTitleDisplay = () => {
    //const addTeamOnly = props.route.params.addTeamOnly

    if (checkSortIap === 0 && pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true) {
      return (

              <Box shadow="7" mt="2" ml="5" mr="5">
                <Box bg="#222">
                  <Box style={{backgroundColor: '#FACC15', width: '100%', borderTopLeftRadius: 5, paddingTop: 5, paddingBottom: 5, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 16, fontWeight: '600'}}>Upgrade Your Plan!</Text></Box>
                </Box>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={{color: '#fff', fontSize: 24, lineHeight: 26, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#ccc'}}>Continue to Support Our Parent-Led Initiative!</Text>
                </LinearGradient>
              </Box>
      )
    }
    else if (checkSortIap === 0) {
      return (

              <Box shadow="7" mt="5" ml="5" mr="5">
                <Box bg="#222">
                  <Box style={{backgroundColor: '#FACC15', width: '100%', borderTopLeftRadius: 5, paddingTop: 5, paddingBottom: 5, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 24, lineHeight: 26, fontWeight: '600'}}>Support Our Parent-Led Initiative!</Text></Box>
                </Box>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={{color: '#fff', fontSize: 16, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#ccc', fontSize: 20,}}>Select a paid plan to updarde to pro!</Text>
                </LinearGradient>
              </Box>
      )
    }
  }

  const getDisplayFreePlan = () => {

    //const addTeamOnly = props.route.params.addTeamOnly

    if (checkSortIap === 0 && pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true) {
      return (
        <Center>
          <Button minW="90%" maxW="90%" bg="#E879F9" size="md" _text={{fontSize: 20, color: '#fff'}} mt="7" mb="5" variant="subtle" onPress={() => continueForFree()}>
            <Text bold style={{color: '#fff', fontSize: 20, padding: 10}}>Continue with Current Plan</Text>
          </Button>
        </Center>
      )
    }
    else if (checkSortIap === 0) {
      return (
        <Box alignItems="center" mt="0" shadow="6" ml="5" mr="5" style={{overflow: 'hidden'}}>
        <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#222', '#222']} style={styles.linearGradientProduct}>
            <HStack>
              <VStack minW="75%">
                <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>
                Free Subs Management
                </Text>
                <HStack>
                  <Text style={styles.textSixteen}>
                    FREE
                  </Text>
                </HStack>
                <Box>
                  <VStack style={{paddingTop: 5}}>
                    <HStack>
                      <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                      <Text style={styles.textFourteen}>
                        Subs Management
                      </Text>
                    </HStack>
                    <HStack>
                      <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                      <Text style={styles.textFourteenFree}>
                        Real-Time Player Sub Tracking
                      </Text>
                    </HStack>
                    <HStack>
                      <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
                      <Text style={styles.textFourteenFree}>
                      Access player names on season stats
                      </Text>
                    </HStack>
                  <HStack>
                    <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
                    <Text style={styles.textFourteenFree}>
                      Individual performance analytics
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
                    <Text style={styles.textFourteenFree}>
                    team performance data.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
                    <Text style={styles.textFourteenFree}>
                    Previous games data
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
                    <Text style={styles.textFourteenFree}>
                    Pay for entire team to view Pro Features
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={{paddingRight: 5, paddingTop: 2}}>{crossIcon}</Text>
                    <Text style={styles.textFourteenFree}>
                    Full team access to real-time live events (goals, subs, etc)
                    </Text>
                  </HStack>
                  </VStack>
                </Box>


              <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: 20, color: '#fff'}} mt="5" variant="subtle" onPress={() => continueForFree()}>
                <Text bold style={{color: '#fff', fontSize: 20}}>Continue for Free</Text>
              </Button>
            </VStack>
            </HStack>

        </LinearGradient>
      </ImageBackground>
      </Box>

      )
    }

  }

  const continueForFree = () => {
    dispatch(updateCheckSortIap(1))
    navigate('AddTeamHome', {
      teamType: getTeamType,
      addTeamOnly: getAddTeamOnly,
      gameIdDb: getGameIdDb
    });
  }

  const displayFooter = () => {

    if (checkSortIap === 0) {
      return (
        <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 10, paddingBottom: 0, paddingLeft: 20, paddingRight: 20, height: '15%'}}>
          <HStack style={{ justifyContent: 'center'}}>
            <Button style={{textDecorationLine: 'underline', backgroundColor: 'transparent', textAlign: 'center'}} onPress={() => getRestore()}><Text style={{color: '#E879F9'}}>Restore Purchases</Text></Button>
          </HStack>
        </Box>
      )
    }
    else {
      return (
        <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 10, paddingBottom: 0, paddingLeft: 20, paddingRight: 20, height: '35%'}}>
          <HStack style={{paddingBottom: 5}} alignItems="center" safeAreaBottom p="0" pb="0" shadow={6} >
            <Button minW="100%" bg="#222" size="md" _text={{fontSize: "16", color: '#fff'}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
          </HStack>
          <HStack style={{ justifyContent: 'center'}}>
            <Button style={{textDecorationLine: 'underline', backgroundColor: 'transparent', textAlign: 'center'}} onPress={() => getRestore()}><Text style={{color: '#E879F9'}}>Restore Purchases</Text></Button>
          </HStack>

            <HStack style={{ justifyContent: 'center'}}>
              {cancelSub()}
            </HStack>
        </Box>
      )
    }
  }

  const productDescDisplay = (iapBlock) => {

    if (iapBlock === 'coach') {
      return (
        <Box>
        <VStack minW="75%" pt="2">
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 24, lineHeight: 24 }}>
          Pro Season Stats & Drills
          </Text>
          <Box
          mt="2"
          mb="2"
          height="1"
          bg="#ccc"
          width="100%"
          opacity={0.3}
          borderRadius="full"
          />
          </VStack>
          <Box>
            <VStack style={{ paddingTop: 5 }}>
              <HStack>
                <Text style={{ paddingRight: 5, paddingTop: 2 }}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>Access player names on season stats</Text>
              </HStack>
              <HStack>
                <Text style={{ paddingRight: 5, paddingTop: 2 }}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>Individual performance analytics</Text>
              </HStack>
              <HStack>
                <Text style={{ paddingRight: 5, paddingTop: 2 }}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>Team performance data.</Text>
              </HStack>
              <HStack>
                <Text style={{ paddingRight: 5, paddingTop: 2 }}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>Previous games data</Text>
              </HStack>
              <HStack>
                <Text style={{ paddingRight: 5, paddingTop: 2 }}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                  Access to all drills and advanced variations
                </Text>
              </HStack>
              <HStack>
                <Text style={{ paddingRight: 5, paddingTop: 2 }}>{crossIcon}</Text>
                <Text style={styles.textFourteen}>
                  Pay for entire team to view Pro Features
                </Text>
              </HStack>
              <HStack>
                <Text style={{ paddingRight: 5, paddingTop: 2 }}>{crossIcon}</Text>
                <Text style={styles.textFourteen}>
                  Full team access to real-time live events (goals, subs, etc)
                </Text>
              </HStack>
            </VStack>
          </Box>
          <Box
          mt="2"
          mb="2"
          height="1"
          bg="#ccc"
          width="100%"
          opacity={0.3}
          borderRadius="full"
          />
          <VStack space="4">
            {renderProductButtons(indivProds, "Individual Plans")}
          </VStack>
          </Box>
      )
    }
    else if (iapBlock === 'team') {
      return (
        <Box>
        <VStack minW="75%" pt="2">
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 24, lineHeight: 24 }}>
          Team Stats & Live Scores
          </Text>
          <Box
          mt="2"
          mb="2"
          height="1"
          bg="#ccc"
          width="100%"
          opacity={0.3}
          borderRadius="full"
          />
          </VStack>
          <Box style={{maxWidth: '100%'}}>
            <VStack style={{paddingTop: 5}}>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                All features from 'Pro Season Stats & Drills' included
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                Pay for entire team to view Pro Features
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                Full team access to real-time live events (goals, subs, etc)
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                  Full team access to season stats
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                As coach, you also receive live scores and stats
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                Access to all drills and advanced variations
                </Text>
              </HStack>
              <HStack>
                <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
                <Text style={styles.textFourteen}>
                  Save your team ${getProMonthlyPlayerCost}/month per player compared to when players/parents buy individual subscriptions themselves
                </Text>
              </HStack>
              <Button style={{justifyContent: 'left', margin: 0, padding: 0}} bg="transparent" variant="subtle" onPress={() => setMoreinfo(1)}>
                <Text bold style={styles.textFourteenInfo}>More info...</Text>
              </Button>
              {getMoreinfo === 1 &&
                <Box style={{marginLeft: 15}}>
                  <Text style={styles.textFourteen}>When you purchase this plan, any team member or parent who enters your unique Team ID while setting up Live Scores — including those who’ve already set it up — will automatically receive Pro features on their account. They’ll then have full access to real-time live events, including goals, substitutions, and more.</Text>
                </Box>
              }
              </VStack>
          </Box>
          <Box
          mt="2"
          mb="2"
          height="1"
          bg="#ccc"
          width="100%"
          opacity={0.3}
          borderRadius="full"
          />
          <VStack space="4">
            {renderProductButtons(teamProds, "Team Plans")}
          </VStack>
          </Box>
      )
    }
    else if (iapBlock === 'player') {
      return (
        <Box>
        <VStack minW="75%" pt="2">
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 24, lineHeight: 24 }}>
          Pro Live Scores & Stats
          </Text>
          <Box
          mt="2"
          mb="2"
          height="1"
          bg="#ccc"
          width="100%"
          opacity={0.3}
          borderRadius="full"
          />
          </VStack>
          <Box>
          <VStack style={{paddingTop: 5}}>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
                Player names on live scores & substitutes
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Individual performance analytics
              </Text>
            </HStack>
            <HStack>
              <Text style={{paddingRight: 5, paddingTop: 2}}>{checkIcon}</Text>
              <Text style={styles.textFourteen}>
              Access to team data
              </Text>
            </HStack>
            </VStack>
          </Box>
          <Box
          mt="2"
          mb="2"
          height="1"
          bg="#ccc"
          width="100%"
          opacity={0.3}
          borderRadius="full"
          />
          <VStack space="4">
            {renderProductButtons(playerProds, "Player Plans")}
          </VStack>
        </Box>
      )
    }

  }

  const proSeasonStats = (iapBlock) => {

    return (
      <Box alignItems="center" mt="5" shadow="6" ml="5" mr="5" style={{ overflow: 'hidden' }}>
        <Box style={[iapBlock === 'team' ? styles.backgroundImageBorderNew : styles.backgroundImageNew]}>
          {iapBlock === 'team' &&
            <Box bg="transparent">
              <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', borderTopLeftRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5}}><Text style={{fontSize: 24, lineHeight: 26,fontWeight: '600'}}>RECOMMENDED</Text></Box>
            </Box>
          }
          <Box style={styles.paddingForNewBg}>
            {productDescDisplay(iapBlock)}
          </Box>
        </Box>
      </Box>


    )

  }

  const renderProductButtons = (products, label) => {



    return (
    <Box mt="4">
      {products.map(product => (
        <Box>
          {getButtonText(product)}
        </Box>
      ))}
      {Platform.OS === 'ios' && (
        <Text style={styles.termsText}>Cancel your subscription at anytime.</Text>
      )}
      {Platform.OS !== 'ios' && (
        <Text style={styles.termsText}>Cancel your subscription at anytime.</Text>
      )}
      {termsAndCond()}
      <Box
      mt="5"
      mb="5"
      height="1"
      bg="#ccc"
      width="100%"
      opacity={0.3}
      borderRadius="full"
      />
    </Box>
    )
  };

  const getButtonText = (product) => {

    console.log(JSON.stringify(product) + ' lokky lookly products info');

    let productButtontext = ''
    if (product.identifier === 'pro_season_indv' || product.identifier === 'pro_season_indiv_android:season-sub-2499' || product.identifier === 'pro_season_team' || product.identifier === 'pro_season_team_android:season-sub-team-13999' || product.identifier === 'pro_season_player' || product.identifier === 'pro_season_player_android:season-sub-player-2499') {
      productButtontext = 'Season (6 Month) Subscription'
    }
    else if (product.identifier === 'pro_monthly_indv' || product.identifier === 'pro_monthly_indiv_android:month-sub-499' || product.identifier === 'pro_monthly_team'|| product.identifier === 'pro_monthly_team_android:monthly-sub-team-2999' || product.identifier === 'pro_monthly_player' || product.identifier === 'pro_monthly_player_android:month-sub-player-499') {
      productButtontext = '1 Month Subscription'
    }
    else if (product.identifier === 'pro_yearly_indiv' || product.identifier === 'pro_yearly_indiv_android:yearly-sub-799' || product.identifier === 'pro_yearly_team' || product.identifier === 'pro_yearly_team_android:yearly-sub-69' || product.identifier === 'pro_yearly_player' || product.identifier === 'pro_yearly_player:yearly-sub-7-99') {
      productButtontext = '1 Year Subscription'
    }



    if (productButtontext !== '') {
      return (
        <Box>
          <Text style={{ color: '#fff', fontSize: 22, lineHeight: 22, marginBottom: 6 }}>{productButtontext}:</Text>
          <Text style={{ color: '#fff', fontSize: 12, lineHeight: 12, marginBottom: 6 }}>product identifier: {product.identifier}</Text>
          {(product.identifier === 'pro_season_indv' || product.identifier === 'pro_season_team' || product.identifier === 'pro_season_player' || product.identifier === 'pro_season_indiv_android:season-sub-2499' || product.identifier === 'pro_season_team_android:season-sub-team-13999' || product.identifier === 'pro_season_player_android:season-sub-player-2499') &&
            <Box style={{backgroundColor: '#FACC15', borderRadius: 15, padding: 3, paddingLeft: 10, paddingRight: 10, marginTop: 5}}>
              <Text style={{color: '#000', fontSize: 12, fontWeight: '600'}}>Risk Free - 1 week Free Trial - Cancel Anytime!</Text>
            </Box>
          }
          {(product.identifier === 'pro_yearly_indiv' || product.identifier === 'pro_yearly_team' || product.identifier === 'pro_yearly_player' || product.identifier === 'pro_yearly_team_android:yearly-sub-69' || product.identifier === 'pro_yearly_team_android:yearly-sub-69' || product.identifier === 'pro_yearly_player:yearly-sub-7-99') &&
            <Box style={{backgroundColor: '#FACC15', borderRadius: 15, padding: 3, paddingLeft: 10, paddingRight: 10, marginTop: 5}}>
              <Text style={{color: '#000', fontSize: 14, fontWeight: '600'}}>Risk Free - 2 weeks Free Trial - Cancel Anytime!</Text>
            </Box>
          }
          <Button
            key={product.identifier}
            bg="#E879F9"
            size="md"
            mt="2"
            onPress={() => purchaseProductDisplay(product)}
          >
          <Text bold style={{color: '#fff', fontSize: 20}}>
            Buy Now! ({product.priceString})
          </Text>
          </Button>
          {(product.identifier === 'pro_yearly_indiv' || product.identifier === 'pro_yearly_team' || product.identifier === 'pro_yearly_player' || product.identifier === 'pro_yearly_team_android:yearly-sub-69' || product.identifier === 'pro_yearly_team_android:yearly-sub-69' || product.identifier === 'pro_yearly_player:yearly-sub-7-99') &&
            <Box>

              <Box
              mt="5"
              height="0.5"
              bg="#ccc"
              width="100%"
              opacity={0.3}
              borderRadius="full"
              />
            </Box>
          }
          {(product.identifier === 'pro_monthly_indv' || product.identifier === 'pro_monthly_team' || product.identifier === 'pro_monthly_player' || product.identifier === 'pro_monthly_indiv_android:month-sub-499' || product.identifier === 'pro_monthly_team_android:monthly-sub-team-2999' || product.identifier === 'pro_monthly_player_android:month-sub-player-499') &&
            <Box
            mt="5"
            mb="5"
            height="0.5"
            bg="#ccc"
            width="100%"
            opacity={0.3}
            borderRadius="full"
            />
          }
          {(product.identifier === 'pro_season_indv' || product.identifier === 'pro_season_team' || product.identifier === 'pro_season_player' || product.identifier === 'pro_season_indiv_android:season-sub-2499' || product.identifier === 'pro_season_team_android:season-sub-team-13999' || product.identifier === 'pro_season_player_android:season-sub-player-2499') &&
            <Box
            mt="5"
            mb="5"
            height="0.5"
            bg="#ccc"
            width="100%"
            opacity={0.3}
            borderRadius="full"
            />
          }
        </Box>
      )
    }
    else {
      return (
        <Box>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16, marginBottom: 6 }}></Text>
          <Button
            key={product.identifier}
            bg="#E879F9"
            size="md"
            mt="2"
            onPress={() => purchaseProductDisplay(product)}
          >
          <Text bold style={{color: '#fff', fontSize: 20}}>
            Buy Now! ({product.priceString})
          </Text>
          </Button>
        </Box>
      )
    }

  }




        return (
          <View key={key}>
          <Center style={{overflow: 'hidden', maxWidth: '100%'}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <Center style={{ height: '100%', overflow: 'hidden'}}>
                <Container h="100%" w="100%" maxWidth="100%" style={{overflow: 'hidden'}}>
                  <ScrollView style={{overflow: 'hidden', maxWidth: '100%'}}>
                    <Text style={{color: 'transparent', fontSize: 16, color: '#fff'}}>Reload toggled: {reload ? 'Yes' : 'No'} & {getAddTeamOnly}</Text>
                    {getPageTitleDisplay()}
                    {getExpiryDate()}
                    {getDisplayFreePlan()}
                    {getPagePaidTitleDisplay()}
                    {userProfile === 1 &&
                      <Box>
                        {(pro_yearly_indiv[0].purchased === false) &&
                          <Box>
                            {proSeasonStats('coach')}
                          </Box>
                        }
                        {(pro_yearly_team[0].purchased === false)  &&
                          <Box>
                            {proSeasonStats('team')}
                          </Box>
                        }

                      </Box>
                    }
                    {userProfile === 2 &&
                      <Box>
                        {(pro_yearly_player[0].purchased === false)  &&
                          <Box>
                            {proSeasonStats('player')}
                          </Box>
                        }
                      </Box>
                    }
                    {
                      getProductList.map((product, i) => {
                     console.log(JSON.stringify(product) + ' check product info');
                     console.log(product.title + ' check product.title info');
                        return (
                            productDisplay(product)

                        );
                      })
                    }
                    {getProductList === undefined || getProductList.length < 0 &&
                      <Text style={{color: '#fff'}}><ActivityIndicator size="large" color="#fff" animating={true} /> Loading...</Text>
                    }

                  </ScrollView>
                </Container>
                  {displayFooter()}
              </Center>
            </LinearGradient>
            <View style={[styles.activityIndicatorTest, animateLoading ? styles.activityIndicatorLarge : styles.activityIndicatorNone]}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientLoading}>
                <ActivityIndicator size="large" color="#fff" animating={animateLoading} />
                <Heading style={{color: '#fff'}}>AWAITING APP STORE...</Heading>
              </LinearGradient>
            </View>
          </Center>
          </View>
        )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 10
  },
  linearGradientTitle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    minWidth: '100%',
    marginTop: 10,
    borderColor: '#fff',
    borderWidth: 1
  },
  linearGradientProduct: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: '100%',
    overflow: 'hidden',
  },
  linearGradientHide: {
    minWidth: '100%',
  },
  linearGradientHideDisplay: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
    minWidth: '100%',
  },
  linearGradientBg: {
    minWidth: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  textHeader: {
    color: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
  textHeaderTitle: {
    color: '#333',
    fontSize: 22,
    paddingLeft: 20
  },
  buttonTextBackWhite: {
    fontSize: 20,
    color: '#333',
    fontWeight: '400',
    paddingLeft: 20
  },
  backgroundImage: {
      //flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      ...Platform.select({
        ios: {
          flex: 'inherit'
        },
        android: {

        },
        default: {
          flex: 1,
        }
        })
  },
  backgroundImageNew: {
      //flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderColor: '#ddd',
      borderWidth: 0,
      backgroundColor: 'rgba(232,121,249,0.6)',
      borderRadius: 15,
      //paddingTop: 20,
      //paddingLeft: 20,
      //paddingRight: 20,
      //paddingBottom: 40,
      maxWidth: '100%',
      ...Platform.select({
        ios: {
          flex: 'inherit'
        },
        android: {

        },
        default: {
          flex: 1,
        }
        })
  },
  paddingForNewBg: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  backgroundImageBorderNew: {
      //flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
      borderColor: '#FACC15',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: 'rgba(232,121,249,0.6)',
      borderRadius: 15,
      //paddingTop: 20,
      //paddingLeft: 20,
      //paddingRight: 20,
      //paddingBottom: 40,
      maxWidth: '100%',
      ...Platform.select({
        ios: {
          flex: 'inherit'
        },
        android: {

        },
        default: {
          flex: 1,
        }
        })
  },
  activityIndicatorTest: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
  activityIndicator: {
    backgroundColor: '#e879f9',
  },
  activityIndicatorLarge: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  activityIndicatorNone: {
    height: '0%',
  },
  linearGradientLoading: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  invisible: {
  display: 'none',
  /* OR */
  visibility: 'hidden',
  opacity: 0,
},
textFourteen: {
  color: '#fff',
  fontSize: 14,
  paddingTop: 5,
  paddingBottom: 10,
  ...Platform.select({
    ios: {
      lineHeight: 0,
    },
    android: {
      lineHeight: 14,
    },
    default: {
      lineHeight: 0,
    }
    })
},
textFourteenInfo: {
  color: '#fff',
  fontSize: 14,
  ...Platform.select({
    ios: {
      lineHeight: 0,
    },
    android: {
      lineHeight: 14,
    },
    default: {
      lineHeight: 0,
    }
    })
},
textFourteenFree: {
  color: '#fff',
  fontSize: 14,
  paddingTop: 5,
  paddingBottom: 5,
  ...Platform.select({
    ios: {
      lineHeight: 0,
    },
    android: {
      lineHeight: 14,
    },
    default: {
      lineHeight: 0,
    }
    })
},
textSixteen: {
  color: '#fff',
  fontSize: 24,
  fontWeight: '700',
  marginTop: 5,
  ...Platform.select({
    ios: {
      lineHeight: 0,
    },
    android: {
      lineHeight: 24,
    },
    default: {
      lineHeight: 0,
    }
    })
},
termsText:
  {
    fontSize: 10,
    color: '#ccc',
    paddingTop: 10,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 10,
      },
      default: {
        lineHeight: 0,
      }
      })
  },
  termsTextUnder:
    {
      fontSize: 10,
      color: '#ccc',
      paddingTop: 10,
      textDecorationLine: 'underline',
      ...Platform.select({
        ios: {
          lineHeight: 0,
        },
        android: {
          lineHeight: 10,
        },
        default: {
          lineHeight: 0,
        }
        })
    }
})

export default Iap;

/*

<Box alignItems="center" mt="3" shadow="6">
  <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
      <Center>
        <Box mt="0" pt="1" pb="3" minW="100%">
            <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Pro Description</Heading>
          <HStack>
            <VStack>
              <Text style={{fontWeight: '600', color: '#fff'}}>Pro One: <Text style={{fontWeight: '300'}}>See season minutes played in each position. See a percentage time played on the field and a percentage time as substitute. These stats allow you to easily decide who starts as a sub, and who starts on the field.</Text></Text>
              <Text style={{fontWeight: '600', color: '#fff', marginTop: 5}}>Pro Two: <Text style={{fontWeight: '300'}}>See season stats. Includes total goals scored, total assists, total defensive tackles and total goals saved</Text></Text>
              <Text style={{fontWeight: '600', color: '#fff', marginTop: 5}}>Pro Three: <Text style={{fontWeight: '300'}}>Purchase the ‘Team bundle’ to give access for your players/parents/fans to see the above pro stats AND real-time live scores & stats during the game by downloading the SoccerTime Live app on their phones. Alternatively, players/parents/fans will need to pay themselves to see stats & live scores.</Text></Text>
              <Text style={{fontWeight: '600', color: '#fff', marginTop: 15}}>Scroll down for all purcahse options!</Text>
            </VStack>
          </HStack>
        </Box>
      </Center>
    </LinearGradient>
  </ImageBackground>
  </Box>

  */

/*
<View>
        <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => buyTest("pro_monthly_team")}>Product Subscriptions Test</Button>
  </View>
*/

/*
<View>
        <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => resetBuyTest()}>Reset Product Subscriptions</Button>
  </View>
  */

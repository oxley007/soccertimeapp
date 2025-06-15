import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, Image, PixelRatio, Pressable, ActivityIndicator, Platform } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, HStack, PresenceTransition, Select, CheckIcon, VStack } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
const plusIcon = <Icon name="plus" size={30} color="#fff" />;
const minusIcon = <Icon name="minus" size={30} color="#fff" />;
import LinearGradient from 'react-native-linear-gradient';

//import { requestPurchase, requestSubscription, initConnection, useIAP} from 'react-native-iap';
import Purchases from 'react-native-purchases';

//import { updateGames } from '../../Reducers/games';
import { updateIap } from '../../Reducers/iap';

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


  /*
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let games = useSelector(state => state.games.games);
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
  //{purchased: false, expiryDate: null}]

  const dispatch = useDispatch()

  const { currentUser } = auth()
  const userRef = firestore().collection(currentUser.uid);
  const teamRef = firestore().collection('teamTest1')

  //const teamId = props.route.params.teamId
  //const teamIdCode = props.route.params.teamIdCode

  const { navigate } = props.navigation;

  useEffect(() => {

   //console.log(pro_forever_indiv[0].purchased + ' hit?');
      setPro_forever_indivState(pro_forever_indiv[0].purchased)
      setPro_yearly_indivState(pro_yearly_indiv[0].purchased)
      setPro_yearly_teamState(pro_yearly_team[0].purchased)
      setPro_forever_teamState(pro_forever_team[0].purchased)
      setPro_yearly_playerState(pro_yearly_player[0].purchased)
      setPro_forever_playerState(pro_forever_player[0].purchased)

  },[pro_forever_indiv[0].purchased, pro_yearly_indiv[0].purchased, pro_yearly_team[0].purchased, pro_forever_team[0].purchased, pro_yearly_player[0].purchased, pro_forever_player[0].purchased])

  useEffect(() => {

   //console.log(userProfile + ' hit?');
      setUserProfileState(userProfile)

  },[userProfile])

  useEffect(() => {

    const mainProducts = async () => {
      Purchases.setDebugLogsEnabled(true)
      //Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      let prods = []
      let prodsPlayer = []
      if (Platform.OS === 'ios') {
        await Purchases.configure({
          apiKey: "appl_AiWRjxtNooUlINbXhTHZhTrLkWv"
        })
        prods = await Purchases.getProducts(["pro_yearly_indiv", "pro_yearly_team", "pro_forever_indiv", "pro_forever_team"])
        prodsPlayer = await Purchases.getProducts(["pro_yearly_player", "pro_forever_player"])
      } else if (Platform.OS === 'android') {
        //Purchases.configure({apiKey: <revenuecat_project_google_api_key>});
     }

      //const prods = await Purchases.getProducts(["pro_yearly_indiv", "pro_yearly_team", "pro_forever_indiv", "pro_forever_team"])

      //const prodsPlayer = await Purchases.getProducts(["pro_yearly_player", "pro_forever_player"])

   //console.log(JSON.stringify(prods) + ' output products.');
   //console.log(JSON.stringify(prodsPlayer) + ' prodsPlayer output products.');
      //add team yearly & team forever costs to state here:
      //TODO:



      //let countProds = 0
      let prodsInOrder = [1,2,3,4]
      const prodsInOrderMap = () => {

        if (userProfile === 1) {


        prods.map(prod => {
       //console.log(JSON.stringify(prod) + ' output prod.');
          if (prod.identifier === 'pro_yearly_indiv') {
         //console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 1'));
            prodsInOrder.splice(0, 1)
            prodsInOrder.splice(0, 0, prod);
          }
          else if ( prod.identifier === 'pro_yearly_team') {
         //console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 2'));
            prodsInOrder.splice(1, 1)
            prodsInOrder.splice(1, 0, prod);
          }
          else if (prod.identifier === 'pro_forever_indiv') {
         //console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 3'));
            prodsInOrder.splice(2, 1)
            prodsInOrder.splice(2, 0, prod);
          }
          else if (prod.identifier === 'pro_forever_team') {
         //console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 4'));
            prodsInOrder.splice(3, 1)
            /*
            if (prodsInOrder.length < 4) {
                prodsInOrder.pop();
                prodsInOrder.push(prod)
                //prodsInOrder.splice(3, 0, prod);
             //console.log(JSON.stringify(prodsInOrder + ' prodsInOrder 5'));
            }
            else {
            */
                prodsInOrder.splice(3, 0, prod);
            //}
          }

        })
      }
      else {
        prodsInOrder = [1,2]
        prodsPlayer.map(prod => {
       //console.log(JSON.stringify(prod) + ' output prod player.');
          if (prod.identifier === "pro_yearly_player") {
         //console.log(JSON.stringify(prodsInOrder + ' prodsInOrder player 1'));
            prodsInOrder.splice(0, 1)
            prodsInOrder.splice(0, 0, prod);
          }
          else if ( prod.identifier === "pro_forever_player") {
         //console.log(JSON.stringify(prodsInOrder + ' prodsInOrder player 2'));
            prodsInOrder.splice(1, 1)
            prodsInOrder.splice(1, 0, prod);
          }
        })
      }

        setProductList(prodsInOrder)

      }



      prodsInOrderMap()

   //console.log(JSON.stringify(prodsInOrder) + ' output prodsInOrder products.');


      /*
      if (prodsInOrder.length < 3) {
        setProductList(prods)
      }
      */

      setAnimateLoading(false)

    }

    setAnimateLoading(true)
    mainProducts()

  },[])

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

 //console.log('weer hit in items to display.');

    try {
      const result = await initConnection();
     //console.log('result', result);
      } catch (err) {
        console.warn(err.code, err.message);
      }

    //try {
   //console.log(itemSkus + ' check itemSkus list');
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

   //console.log('Products', products);
   //console.log('subscriptions', subscriptions);
      const productAll = subscriptions.concat(products)
   //console.log('productAll', productAll);
      setProductList(productAll)
    //} catch (err) {
      //console.warn(err.code, err.message);
    //}

 //console.log(getProductList + ' check getProductList here.');

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

    if (userProfile === 1) {
      navigate('Home')
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
  <Text style={{textDecorationLine: 'underline', color: '#fff', textAlign: 'center'}}
    onPress={() => Linking.openURL('https://support.apple.com/en-nz/HT202039')}>
    Cancel Subscriptiion
  </Text>
  )
}
  else {
  <Text style={{textDecorationLine: 'underline', color: '#fff', textAlign: 'center', fontSize: 12}}
    onPress={() => Linking.openURL('https://support.google.com/googleplay/answer/7018481?hl=en&co=GENIE.Platform%3DAndroid')}>
    Cancel Subscriptiion
  </Text>
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
   //console.log('hit my catch teamanems resetBuyTest');
      // do nothing.
    }


  }

  const buyTest = (storeProduct) => {
 //console.log(JSON.stringify(storeProduct) + ' output prod.');

    /*
    const expiryDateForProds = getExpiryDateForProds(storeProduct)
    const epochDate = expiryDateForProds[0]
    const productNameTitle = expiryDateForProds[1]
    */

    const expiryDateForProds = getExpiryDateForProds(storeProduct, null)
    const epochDate = expiryDateForProds[0]
    const productNameTitle = expiryDateForProds[1]

    navigate('IapConfrim', {
      purchasedProduct: storeProduct,
      expiryDate: epochDate,
      productNameTitle: productNameTitle
    });
  }

  const getRestore = async (storeProduct) => {

    try {
      const restores = await Purchases.restorePurchases();
   //console.log(JSON.stringify(restores) + ' what do we have in restore?');
      // ... check restored purchaserInfo to see if entitlement is now active

      const customerInfoPurchase = await Purchases.getCustomerInfo();
   //console.log(JSON.stringify(customerInfoPurchase) + ' customerInfoPurchase  iap page');





      let restoredTitles = [];
      let epochDate = null
      let productNameTitle = ''
      let storeProduct = []

      restores.allPurchasedProductIdentifiers.forEach(restore => {

     //console.log(JSON.stringify(restore) + ' what do i get fro restore?');

        let expirationDate = null
        if (restore === 'pro_yearly_indiv') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv
        }
        else if (restore === 'pro_yearly_team') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team
        }
        else if (restore === 'pro_yearly_player') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player
        }
        else if (restore === 'pro_forever_indiv') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv + ' check specific expiry date pro_forever_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_indiv
        }
        else if (restore === 'pro_forever_team') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_team + ' check specific expiry date pro_forever_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_team
        }
        else if (restore === 'pro_forever_player') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_forever_player + ' check specific expiry date pro_forever_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_forever_player
        }

     //console.log(JSON.stringify(restore) + ' restore name');
     //console.log(JSON.stringify(expirationDate) + ' expirationDate ');

        const expiryDateForProds = getExpiryDateForProds(restore, expirationDate)
        epochDate = expiryDateForProds[0]
        productNameTitle = expiryDateForProds[1]
        storeProduct = restore

      })

      navigate('IapConfrim', {
        purchasedProduct: storeProduct,
        expiryDate: epochDate,
        productNameTitle: productNameTitle
      });

    } catch (e) {
      console.warn(e); // standardized err.code and err.message available
      Alert.alert(e.message);
    }

  }

  const purchaseProductDisplay = async (storeProduct) => {

 //console.log('check here 1');
    setAnimateLoading(true)

    try {
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

     //console.log('check here 2');

        const customerInfoPurchase = await Purchases.getCustomerInfo();
     //console.log(JSON.stringify(customerInfoPurchase) + ' customerInfoPurchase  iap page');
     //console.log('check here 3');

        /*
     //console.log(JSON.stringify(customerInfo.activeSubscriptions) + ' check activeSubscriptions');

        if (customerInfo.activeSubscriptions !== null) {
       //console.log('just testing.');
        }
        */

        let expirationDate = null
        if (storeProduct.identifier === 'pro_yearly_indiv') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv + ' check specific expiry date pro_yearly_indiv iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_indiv
        }
        else if (storeProduct.identifier === 'pro_yearly_team') {
         //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team + ' check specific expiry date pro_yearly_team iap page');
            expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_team
        }
        else if (storeProduct.identifier === 'pro_yearly_player') {
       //console.log(customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player + ' check specific expiry date pro_yearly_player iap page');
          expirationDate = customerInfoPurchase.allExpirationDatesMillis.pro_yearly_player
        }
     //console.log('check here 4');

        const expiryDateForProds = getExpiryDateForProds(storeProduct, expirationDate)
        const epochDate = expiryDateForProds[0]
        const productNameTitle = expiryDateForProds[1]

     //console.log('check here 10');

        navigate('IapConfrim', {
          purchasedProduct: storeProduct,
          expiryDate: epochDate,
          productNameTitle: productNameTitle
        });

    } catch (e) {
   //console.log(JSON.stringify(e) + ' JSON payment error');
   //console.log(e + ' payment error');
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
 //console.log('check here 11');

  }

  const getExpiryDateForProds = (storeProduct, expirationDate) => {

 //console.log('check here 5');
 //console.log(JSON.stringify(storeProduct) + ' output prod.');
    let epochDate = new Date();
    let productNameTitle = ''
    if (storeProduct.identifier === 'pro_yearly_indiv' || storeProduct === 'pro_yearly_indiv') {
      pro_yearly_indiv[0].purchased = true
      /*
    //console.log(epochDate + ' epochDate cehcek. here. one');
      epochDate.setFullYear(epochDate.getFullYear() + 1);
    //console.log(epochDate + ' epochDate cehcek. here. two');
      epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
    //console.log(epochDate + ' epochDate cehcek. here. three');

      epochDate = epochDate * 1000
      */

   //console.log('check here 6a');
      pro_yearly_indiv[0].expiryDate = expirationDate
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
     //console.log('check here 7a');

      //Map through teamName array to add subscription to each team in account:
      try {
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
  //console.log('check here 8a');
    }
    catch {
   //console.log('hit my catch teamanems pro_yearly_indiv');
      // do nothing.
    }
      productNameTitle = 'Pro Manager/Coach - Year Subscription'
    }
    else if ( storeProduct.identifier === 'pro_yearly_team' || storeProduct === 'pro_yearly_team') {
      pro_yearly_team[0].purchased = true
   //console.log('check here 6b');
      /*
    //console.log(epochDate + ' epochDate cehcek. here. one');
      epochDate.setFullYear(epochDate.getFullYear() + 1);
    //console.log(epochDate + ' epochDate cehcek. here. two');
      epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
    //console.log(epochDate + ' epochDate cehcek. here. three');

      epochDate = epochDate * 1000
      */

      pro_yearly_team[0].expiryDate = expirationDate
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   //console.log('check here 7b');
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
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
  //console.log('check here 8b');
    }
    catch {
   //console.log('hit my catch teamanems pro_yearly_team');
      // do nothing.
    }

      productNameTitle = 'Pro Live Scores - Year Subscription'
    }
    else if ( storeProduct.identifier === 'pro_yearly_player' || storeProduct === 'pro_yearly_player') {
      pro_yearly_player[0].purchased = true
   //console.log('check here 6c');

      /*
    //console.log(epochDate + ' epochDate cehcek. here. one');
      epochDate.setFullYear(epochDate.getFullYear() + 1);
    //console.log(epochDate + ' epochDate cehcek. here. two');
      epochDate = Math.floor(new Date(epochDate).getTime() / 1000)
    //console.log(epochDate + ' epochDate cehcek. here. three');

      epochDate = epochDate * 1000
      */

      pro_yearly_player[0].expiryDate = expirationDate
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   //console.log('check here 67');

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
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
  //console.log('check here 8c');
    }
    catch {
   //console.log('hit my catch teamanems pro_yearly_player');
      // do nothing.
    }

      productNameTitle = 'Pro - Year Subscription'
    }
    else if (storeProduct.identifier === 'pro_forever_indiv' || storeProduct === 'pro_forever_indiv') {
      pro_forever_indiv[0].purchased = true
      epochDate = null
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   //console.log('check here 6d');

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
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
  //console.log('check here 7d');
    }
    catch {
   //console.log('hit my catch teamanems pro_forever_indiv');
      // do nothing.
    }

      productNameTitle = 'Pro Manager/Coach - Forever Bundle'
    }
    else if (storeProduct.identifier === 'pro_forever_team' || storeProduct === 'pro_forever_team') {
      pro_forever_team[0].purchased = true
      epochDate = null
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   //console.log('check here 6e');

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
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
  //console.log('check here 7e');
    }
    catch {
   //console.log('hit my catch teamanems pro_forever_team');
      // do nothing.
    }

      productNameTitle = 'Pro Live Scores - Forever Bundle'
    }
    else if (storeProduct.identifier === 'pro_forever_player' || storeProduct === 'pro_forever_player') {
      pro_forever_player[0].purchased = true
      epochDate = null
      dispatch(updateIap(pro_forever_indiv, pro_yearly_indiv, pro_yearly_team, pro_forever_team, pro_yearly_player, pro_forever_player))

   //console.log('check here 6f');

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
         pro_forever_indiv: pro_forever_indiv,
         pro_yearly_indiv: pro_yearly_indiv,
         pro_yearly_team: pro_yearly_team,
         pro_forever_team: pro_forever_team,
         pro_yearly_player: pro_yearly_player,
         pro_forever_player: pro_forever_player,
       })
     }
     })
  //console.log('check here 7f');
    }
    catch {
   //console.log('hit my catch teamanems pro_forever_player');
      // do nothing.
    }

      productNameTitle = 'Pro - Forever Bundle'
    }

 //console.log('check here 9');

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

   //console.log(productDescIdentifier + ' productDescIdentifier is?');

      const teamPrice = price + 2
      const teamPriceString = teamPrice.toString()


      if (productDescIdentifier === 'pro_forever_indiv') {

        if (teamForeverCost === 0) {
            const totalPriceForTwelve = price * 12
            const totalPriceForTwelveTwoDP = Number(totalPriceForTwelve.toFixed(2))
            setTeamForeverCost(totalPriceForTwelveTwoDP)
        }

        return (
          <Text style={styles.textFourteen}>
            Forever subscription where you as the <Text style={{fontWeight: 600}}>COACH/MANAGER</Text> can view player and team stats with <Text style={{fontWeight: 600}}>NO EXPIRY!</Text>
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_indiv') {

        if (teamYearlyCost === 0) {
            const totalPriceForTwelve = price * 12
            const totalPriceForTwelveTwoDP = Number(totalPriceForTwelve.toFixed(2))
            setTeamYearlyCost(totalPriceForTwelveTwoDP)
        }

        return (
          <Text style={styles.textFourteen}>
            1 year subscription where you as the <Text style={{fontWeight: 600}}>COACH/MANAGER</Text> can view player and team stats for the whole year!
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_team') {
        return (
          <Text style={styles.textFourteen}>
            1 year subscription where you as the <Text style={{fontWeight: 600}}>COACH/MANAGER</Text> and your <Text style={{fontWeight: 600}}>ENTIRE TEAM</Text> can view player and team stats. AND Players/Parents can view <Text style={{fontWeight: 600}}>LIVE SCORES</Text> for the whole year for free! Alternatively it'll cost your team a total of ${teamYearlyCost} if each parent or player bought the yearly subscription themselves (based on a team with 12 players)
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_forever_team') {
        return (
          <Text style={styles.textFourteen}>
            Forever subscription where you as the <Text style={{fontWeight: 600}}>COACH/MANAGER</Text> and your <Text style={{fontWeight: 600}}>ENTIRE TEAM</Text> can view player and team stats with <Text style={{fontWeight: 600}}>NO EXPIRY!</Text> AND Players/Parents can view <Text style={{fontWeight: 600}}>LIVE SCORES</Text> for <Text style={{fontWeight: 600}}>FOREVER</Text> for free! Alternatively it'll cost your team a total of ${teamForeverCost} if each parent or player bought the forever subscription themselves (based on a team with 12 players)
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_player') {
     //console.log('do we hit this userProfile 2 dispay text 5');
        return (
          <Text style={styles.textFourteen}>
            1 year subscription where you can view player stats, team stats and <Text style={{fontWeight: 600}}>LIVE SCORES!</Text>
          </Text>
        )
      }
      else if (productDescIdentifier === 'pro_forever_player') {
     //console.log('do we hit this userProfile 2 dispay text 6');
        return (
          <Text style={styles.textFourteen}>
            Forever subscription where you can view player stats, team stats and <Text style={{fontWeight: 600}}>LIVE SCORES</Text> with <Text style={{fontWeight: 600}}>NO EXPIRY!</Text>
          </Text>
        )
      }
    }

    const getProdTitle = (productDescIdentifier) => {

   //console.log(productDescIdentifier + ' productDescIdentifier is?');


      if (productDescIdentifier === 'pro_forever_indiv') {
        return (
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
            Pro Manager/Coach - Forever Bundle
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_indiv') {
        return (
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
            Pro Manager/Coach - Year Subscription
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_team') {
        return (
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
            Pro Live Scores - Year Subscription
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_forever_team') {
        return (
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
            Pro Live Scores - Forever Bundle
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_yearly_player') {
     //console.log('do we hit this userProfile 2 dispay text 3');
        return (
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
            Pro - Year Subscription
        </Text>
        )
      }
      else if (productDescIdentifier === 'pro_forever_player') {
     //console.log('do we hit this userProfile 2 dispay text 4');
        return (
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
            Pro - Forever Bundle
        </Text>
        )
      }
    }

    const getProductBox = (product) => {
   //console.log('do we hit this userProfile 2 dispay text 2.');
      return (
        <Box alignItems="center" mt="5" shadow="6" ml="5" mr="5">
        <ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.9)', 'rgba(216,180,254,0.9)']} style={styles.linearGradientProduct}>
            <Center>
            <HStack>
              <VStack minW="75%">

                {getProdTitle(product.identifier)}

            <Text style={styles.textSixteen}>
              {product.priceString}
          </Text>
              {getProdDesc(product.identifier, product.price)}
              <Button bg="tertiary.400" size="md" _text={{fontSize: "sm", color: '#fff'}} mt="5" variant="subtle" onPress={() => purchaseProductDisplay(product)}>
                Buy Now!
              </Button>
            </VStack>
            </HStack>
          </Center>
        </LinearGradient>
      </ImageBackground>
      </Box>
      )
    }


    if (userProfile === 1) {
      if ((pro_forever_indiv[0].purchased === true && pro_yearly_team[0].purchased === false) && (product.identifier === 'pro_yearly_team' || product.identifier === 'pro_forever_team')) {
      return (
          getProductBox(product)
      )
    }
    else if ((pro_forever_team[0].purchased === true) || (pro_forever_indiv[0].purchased === true && pro_yearly_team[0].purchased === true) || (pro_yearly_team[0].purchased === true)) {
      // return nopthing. nothing to upgrade to.
    }
    else if ((pro_yearly_indiv[0].purchased === true && pro_yearly_team[0].purchased === false) && (product.identifier === 'pro_yearly_team' || product.identifier === 'pro_forever_team')) {
      return (
          getProductBox(product)
      )
    }
    else if (pro_yearly_indiv[0].purchased === false && pro_forever_indiv[0].purchased === false && pro_forever_team[0].purchased === false && pro_yearly_team[0].purchased === false)
    {
   //console.log('are we hitting this?');
      return (
        getProductBox(product)
      )
    }
    else {
      //return nothing.
    }
    }
    else if (userProfile === 2 || userProfile === 3 || userProfile === 0) {
      if ((pro_yearly_team[0].purchased === true || pro_yearly_indiv[0].purchased === true) && (product.identifier === 'pro_yearly_player')) {
        // return nopthing. nothing to upgrade to.
      }
      else if ((pro_yearly_player[0].purchased === true) && (product.identifier === 'pro_yearly_player')) {
        // return nopthing. nothing to upgrade to.
      }
      else {
     //console.log('do we hit this userProfile 2 dispay text.');
        return (
          getProductBox(product)
        )
      }
    }

  }

  const getExpiryDate = () => {

 //console.log('hit cehcek 1');
 //console.log(pro_forever_indiv + ' pro_forever_indiv');
 //console.log();

    if (pro_forever_indiv[0].purchased === true && pro_yearly_team[0].purchased === false) {
   //console.log('hit pro_forever_indiv === true && pro_yearly_team === false');
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
   //console.log('hit cehcek 2');
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

      return (

        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>Pro Live Scores - Year Subscription</Text>
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
      const expiryDate = new Date(pro_yearly_indiv[0].expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;

      return (
        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>Pro Manager/Coach - Year Subscription</Text>
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
   //console.log('hit cehcek 5');
      const expiryDate = new Date(pro_yearly_team[0].expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;

      return (

        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>Pro Live Scores - Year Subscription</Text>
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
   //console.log('hit cehcek 5');
      const expiryDate = new Date(pro_yearly_player[0].expiryDate);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const year = expiryDate.getFullYear();
      const month = months[expiryDate.getMonth()];
      const date = expiryDate.getDate();
      const time = date + ' ' + month + ' ' + year;

      return (

        <Box alignItems="center" mt="3" shadow="6" ml="5" mr="5">
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 5}} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(168,85,247,0.8)', 'rgba(216,180,254,0.8)']} style={styles.linearGradientProduct}>
              <Center>
                <Box mt="0" pt="1" pb="3" minW="100%">
                  <HStack>
                    <VStack>
                    <Heading style={{color: '#fff', fontWeight: '400', fontSize: 20}}>Your Current Subscription:</Heading>
                    <Text style={{color: '#eee', fontWeight: '600', fontSize: 18}}>Pro - Year Subscription</Text>
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
   //console.log('hit cehcek 2');
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

        return (
          <Center>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
              <Center style={{minWidth: "100%", height: '100%'}}>
                <Container h="100%" w="100%" maxWidth="100%" pt="16" >
                  <ScrollView>
                    <Box minW='100%' style={{zIndex: 3, elevation: 3, borderBottomColor: '#ccc', borderBottomWidth: 0, paddingTop: 25}}>
                      <HStack>
                        <View style={{paddingRight: '5%', paddingLeft: '5%'}}>
                          <Box shadow="7" mt="10" mb="2">
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#111', '#111']} style={styles.linearGradientTitle}>
                              <Heading style={{color: '#fff', textAlign: 'left', paddingBottom: 10, paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
                                Upgrade to Pro!
                              </Heading>
                            </LinearGradient>
                          </Box>

                        </View>
                      </HStack>
                    </Box>
                    {getExpiryDate()}
                    {
                      getProductList.map((product, i) => {
                     //console.log(JSON.stringify(product) + ' check product info');
                     //console.log(product.title + ' check product.title info');
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
                <Box minW="100%" safeAreaTop alignSelf="center" style={{paddingTop: 10, paddingBottom: 0, paddingLeft: 20, paddingRight: 20, height: '35%'}}>
                  <HStack style={{paddingBottom: 5}} alignItems="center" safeAreaBottom p="0" pb="0" shadow={6} >
                    <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => continueSetup()}>Back</Button>
                  </HStack>
                  <HStack style={{ justifyContent: 'center'}}>
                    <Text style={{textDecorationLine: 'underline', color: '#fff', textAlign: 'center'}} onPress={() => getRestore()}>Restore Purchases</Text>
                  </HStack>

                    <HStack style={{ justifyContent: 'center'}}>
                      {cancelSub()}
                    </HStack>
                </Box>
              </Center>
            </LinearGradient>
            <View style={[styles.activityIndicatorTest, animateLoading ? styles.activityIndicatorLarge : styles.activityIndicatorNone]}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#e879f9', '#a855f7']} style={styles.linearGradientLoading}>
                <ActivityIndicator size="large" color="#fff" animating={animateLoading} />
                <Heading style={{color: '#fff'}}>AWAITING APP STORE...</Heading>
              </LinearGradient>
            </View>
          </Center>
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
    borderRadius: 5,
    minWidth: '100%',
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
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
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
  color: '#ddd',
  fontSize: 16,
  fontWeight: '700',
  ...Platform.select({
    ios: {
      lineHeight: 0,
    },
    android: {
      lineHeight: 16,
    },
    default: {
      lineHeight: 0,
    }
    })
},
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
        <Button minW="100%" bg="tertiary.400" size="md" _text={{fontSize: "xl"}} variant="subtle" onPress={() => resetBuyTest()}>Reset Product Subscriptions</Button>
  </View>
  */

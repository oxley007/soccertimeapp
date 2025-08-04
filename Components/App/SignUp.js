  // SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, PixelRatio, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, H1, ScrollView, ActivityIndicator } from 'react-native';
import {Row,Col,Container,Content,Form, Item, Input, Label, Button, Stack, Box, Center, Heading} from 'native-base';

//import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from "react-redux";

//import { AppleButton } from 'react-native-apple-authentication';
//import { AppleButton } from 'react-native-apple-authentication';
//import { SignInWithAppleButton } from '@invertase/react-native-apple-authentication';
//import { AppleButton } from 'react-native-apple-authentication'
//import { SignInWithAppleButton } from 'react-native-apple-authentication'
//import { appleAuth } from 'react-native-apple-authentication'
//import { SignInWithAppleButton } from 'react-native-apple-authentication';
//import { AppleButton } from 'react-native-apple-authentication'
//import { appleAuth } from 'react-native-apple-authentication';

import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  //iosClientId: '113660204781-6mq5sb2d8erjndm7dllpdfv5hajrbruh.apps.googleusercontent.com',
  //iosClientId: 'com.googleusercontent.apps.113660204781-6mq5sb2d8erjndm7dllpdfv5hajrbruh',
    //webClientId: '113660204781-6mq5sb2d8erjndm7dllpdfv5hajrbruh.apps.googleusercontent.com',
    //webClientId: '113660204781-b365ipdsc910t2jd7h3dqlt08vnoak6o.apps.googleusercontent.com'
    webClientId: '164057827422-uq4j7a751upfi23kpqn1mdftcqhrjb53.apps.googleusercontent.com'//from the google-services.json file > "Client_id" from "client_type": 3
  //webClientId: '',
  //iosClientId: '#id.apps.googleusercontent.com',
    //webClientId: '#id.apps.googleusercontent.com',
    //offlineAccess: false
});

/*
import { updateDragDropDisplayCount } from '../../Reducers/dragDropDisplayCount';
import { updateEventDisplayBoard } from '../../Reducers/eventDisplayBoard';
import { updateExitGameFlag } from '../../Reducers/exitGameFlag';
import { updateGameOptionBoard } from '../../Reducers/gameOptionBoard';
import { updateGamePlayerBoard } from '../../Reducers/gamePlayerBoard';
import { updateGames } from '../../Reducers/games';
import { updateGameSetup } from '../../Reducers/gameSetup';
import { updateGameStatus } from '../../Reducers/gameStatus';
import { updateIap } from '../../Reducers/iap';
import { updatePlayerIndex } from '../../Reducers/playerIndex';
import { updatePlayerUserData } from '../../Reducers/playerUserData';
import { updatePrevGames } from '../../Reducers/prevGames';
import { updateSeasons } from '../../Reducers/seasons';
import { updateSortIndex } from '../../Reducers/sortIndex';
import { updateStatsBoard } from '../../Reducers/statsBoard';
import { updateStatsSort } from '../../Reducers/statsSort';
import { updateStoptimer } from '../../Reducers/stoptimer';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateUserProfile } from '../../Reducers/userProfile';
*/

import LinearGradient from 'react-native-linear-gradient';
/*
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
*/

/*
GoogleSignin.configure({

    //from the google-services.json file > "Client_id" from "client_type": 3
    //webClientId: '491833064477-5asu4eg1dj1mnshu7f6pfuisp6s5vh1n.apps.googleusercontent.com'

});
*/

export default class SignUp extends React.Component {
  state = { email: '',
   password: '',
   uid: '',
   loading: false,
   errorMessage: null,
   animateLoading: false,
   spinnerClass: 'invisible',
  }


  onGoogleSignIn = () => {
    if (Platform.OS !== 'ios') {
  return (
    <GoogleSigninButton
    style={{ width: 260, height: 48, marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5, }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    //onPress={this.onGoogleButtonPress}
    onPress={() => this.onGoogleButtonPress().then(() => console.log('Google sign-in complete!'))}
    disabled={this.state.isSigninInProgress} />
  );
  }
  }

  AppleSignIn = () => {

    if (Platform.OS === 'ios') {
    return(

    <Center style={{marginTop: 40}}>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 300, // You must specify a width
          height: 55, // You must specify a height
          //minWidth: '100%',
          marginBottom: 40,
          //marginTop: 140,
          marginTop: 0,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
          marginRight: 'auto',
          marginBottom: 'auto',
          marginLeft: 'auto',
          borderColor: '#fff',
          borderWidth: 1
        }}
        onPress={() => this.onAppleButtonPress()}
      />
    </Center>
  )
}


      /*
    <View style = {styles.containerViewButton}>
      <Image
       source={require('../../assets/white-logo-masked-circular_2x.png')}
       style={{
         width: 35,
         height: 35,
         color: '#fff',
         alignItems: 'flex-end',
         justifyContent: 'flex-end',
         position: 'absolute',
         left: 10,
         top: 5,
       }}
       />
     {SignInWithAppleButton({
          buttonStyle: styles.appleBtn,
          callBack: this.onAppleButtonPress,
          buttonText: "Sign in with Apple",
        })}
    </View>)
    */

    /*
      return (
    <AppleButton
      //buttonStyle={AppleButton.Style.WHITE}
      //buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 260,
        height: 45,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
      }}
      onPress={() => this.onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
    />
  );
  */

}

/*
AppleSignIn = () => {
  if (Platform.OS === 'ios') {
    return (
      {SignInWithAppleButton({
              buttonStyle: styles.appleBtn,
              callBack: this.appleSignIn,
              buttonText: "Sign Up With Apple",
            })}
);
}
}


AppleSignIn = () => {
  if (Platform.OS === 'ios') {
return (
  <AppleButton
    //buttonStyle={AppleButton.Style.WHITE}
    //buttonType={AppleButton.Type.SIGN_IN}
    style={{
      width: 260,
      height: 45,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 5,
    }}
    onPress={() => this.onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
  />
);
}
}
*/

//async function onAppleButtonPress() {

onGoogleButtonPress = async() => {

    this.setState({animateLoading: true });
 //console.log('we hotting htis?');
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

 //console.log('we hotting htis 2?');

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
 //console.log('does this giet hit here Google Sign in?');
    //return auth().signInWithCredential(googleCredential)
    const credentialPromise = auth().signInWithCredential(googleCredential);
    credentialPromise.then((credential) => {
     //console.log(credential.additionalUserInfo.isNewUser);
     //console.log(JSON.stringify(credential.additionalUserInfo));

   //console.log(JSON.stringify(auth().currentUser) + ' auth().currentUser');
      //let uid = auth().currentUser.uid;
      const user = auth().currentUser;
      this.setState({ uid: user.uid });
   //console.log(credential.additionalUserInfo.isNewUser + ' credential.additionalUserInfo.isNewUser');

     setTimeout(() => {
   //console.log('during timeout');
       this.setState({animateLoading: false });
     }, 2000);

      if (credential && credential.additionalUserInfo.isNewUser === false) {
       // you can do something here. user details already created.
       //could actaully load all the data here in future...
    //console.log('user should exisit.');

    //console.log('before settime out 6')
      setTimeout(() => {
    //console.log('during timeout');
        this.setState({animateLoading: false });
      }, 2000);

      } else {
     //console.log(user.displayName + ' user.displayName');
     //console.log(user.email + ' user.email');
     //console.log(user.uid + ' user.uid');
      firestore().collection('users').doc(auth().currentUser.uid)
          .set({
              fname: user.displayName,
              lname: null,
              email: user.email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
              uid: user.uid,
          });

        firestore().collection(this.state.uid).doc("userData").set({
           uid: this.state.uid,
           loginType: 'Google',
           userProfile: 1,
           ramData: null,
           version: '2.4.21',
         })

       firestore().collection(this.state.uid).doc("playerStats").set({
          gameStats: [],
          proIap: false,
          proPlusIap: false,
          proIapEx: false,
          gameIap: 999999999999999999,
        })

      firestore().collection(this.state.uid).doc("games").set({
         games: [],
       })

      firestore().collection(this.state.uid).doc("teamNames").set({
        teamNames: [],
      })

      firestore().collection(this.state.uid).doc("seasons").set({
       seasons: [],
       seasonsDisplay: '',
       seasonsDisplayId: 99999998
       })

      firestore().collection(this.state.uid).doc("iap").set({
       pro_forever_indiv: [{purchased: false, expiryDate: null}],
       pro_yearly_indiv: [{purchased: false, expiryDate: null}],
       pro_yearly_team: [{purchased: false, expiryDate: null}],
       pro_forever_team: [{purchased: false, expiryDate: null}],
       pro_yearly_player: [{purchased: false, expiryDate: null}],
       pro_forever_player: [{purchased: false, expiryDate: null}],
      })

      firestore().collection(this.state.uid).doc("playerUserData").set({
       teams: [],
       players: [],
       seasons: [],
       seasonsDisplay: '',
       seasonsDisplayId: 99999998
      })

      }
   //console.log('handleSignUp Apple email')
   //console.log('before settime out 1')
      setTimeout(() => {
    //console.log('during timeout');
        this.setState({animateLoading: false });
      }, 2000);
    })
  }

   onAppleButtonPress = async() => {
     this.setState({animateLoading: true });
  //console.log('hit onAppleButtonPress');
     // Start the sign-in request
     const appleAuthRequestResponse = await appleAuth.performRequest({
       requestedOperation: appleAuth.Operation.LOGIN,
       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
     });

     // Ensure Apple returned a user identityToken
     if (!appleAuthRequestResponse.identityToken) {
       throw 'Apple Sign-In failed - no identify token returned';
     }

  //console.log('hit onAppleButtonPress past check.');
     // Create a Firebase credential from the response
     const { identityToken, nonce } = appleAuthRequestResponse;
     const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

     // Sign the user in with the credential
     //return auth().signInWithCredential(appleCredential)
     await auth().signInWithCredential(appleCredential);
  //console.log('hit onAppleButtonPress past check 2.');
        const existingUserDoc = await firestore().collection('users').doc(auth().currentUser.uid).get();
     //console.log(auth().currentUser.uid + ' auth().currentUser.uid');
        let uid = auth().currentUser.uid;
        this.setState({ uid: uid });

        setTimeout(() => {
      //console.log('during timeout');
          this.setState({animateLoading: false });
        }, 2000);

        if (existingUserDoc && existingUserDoc.exists) {
         // you can do something here. user details already created.
         //could actaully load all the data here in future...
      //console.log('user should exisit.');

      //console.log('before settime out 2')
        setTimeout(() => {
      //console.log('during timeout');
          this.setState({animateLoading: false });
        }, 2000);

        } else {
        firestore().collection('users').doc(auth().currentUser.uid)
            .set({
                fname: appleAuthRequestResponse.fullName.givenName,
                lname: appleAuthRequestResponse.fullName.familyName,
                email: appleAuthRequestResponse.email,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                userImg: null,
                uid: this.state.uid,
            });

            firestore().collection(this.state.uid).doc("userData").set({
               uid: this.state.uid,
               loginType: 'Apple',
               userProfile: 1,
               ramData: null,
               version: '2.4.21',
             })

           firestore().collection(this.state.uid).doc("playerStats").set({
              gameStats: [],
              proIap: false,
              proPlusIap: false,
              proIapEx: false,
              gameIap: 999999999999999999,
            })

          firestore().collection(this.state.uid).doc("games").set({
             games: [],
           })

         firestore().collection(this.state.uid).doc("teamNames").set({
            teamNames: [],
          })

         firestore().collection(this.state.uid).doc("seasons").set({
           seasons: [],
           seasonsDisplay: '',
           seasonsDisplayId: 99999998
           })

         firestore().collection(this.state.uid).doc("iap").set({
           pro_forever_indiv: [{purchased: false, expiryDate: null}],
           pro_yearly_indiv: [{purchased: false, expiryDate: null}],
           pro_yearly_team: [{purchased: false, expiryDate: null}],
           pro_forever_team: [{purchased: false, expiryDate: null}],
           pro_yearly_player: [{purchased: false, expiryDate: null}],
           pro_forever_player: [{purchased: false, expiryDate: null}],
          })

         firestore().collection(this.state.uid).doc("playerUserData").set({
           teams: [],
           players: [],
           seasons: [],
           seasonsDisplay: '',
           seasonsDisplayId: 99999998
          })

        }
    //console.log('handleSignUp Apple email')
    //console.log('before settime out 3')
       setTimeout(() => {
        //console.log('during timeout');
            this.setState({animateLoading: false });
          }, 2000);
}



  //handleSignUp = () => {
  handleSignUp = async() => {

 //console.log('still alive 0');
      this.setState({animateLoading: true });


      const email = this.state.email.trim();
      const password = this.state.password.trim();

      //setTimeout(() => {
     //console.log('still alive 1');
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
           //console.log('still alive 2');
              let uid = data.user.uid;
           //console.log('still alive 3');
              this.setState({ uid: uid });

           //console.log('still alive 4');
       //console.log("User ID :- ", data.user.uid);
         })
         .then(data => {return firestore().collection("users").doc(this.state.uid).set({
           email: this.state.email,
           createdAt: firestore.Timestamp.fromDate(new Date()),
           userImg: null,
           uid: this.state.uid,
          })
        })
         .then(data => {return firestore().collection(this.state.uid).doc("userData").set({
            uid: this.state.uid,
            loginType: 'email',
            userProfile: 1,
            ramData: null,
            version: '2.4.21',
          })
        })
        .then(data => {return firestore().collection(this.state.uid).doc("playerStats").set({
           gameStats: [],
           proIap: false,
           proPlusIap: false,
           proIapEx: false,
           gameIap: 999999999999999999,
         })
       })
       .then(data => {return firestore().collection(this.state.uid).doc("games").set({
          games: [],
        })
      })
      .then(data => {return firestore().collection(this.state.uid).doc("teamNames").set({
         teamNames: [],
       })
      })
      .then(data => {return firestore().collection(this.state.uid).doc("seasons").set({
        seasons: [],
        seasonsDisplay: '',
        seasonsDisplayId: 99999998
        })
      })
      .then(data => {return firestore().collection(this.state.uid).doc("iap").set({
        pro_forever_indiv: [{purchased: false, expiryDate: null}],
        pro_yearly_indiv: [{purchased: false, expiryDate: null}],
        pro_yearly_team: [{purchased: false, expiryDate: null}],
        pro_forever_team: [{purchased: false, expiryDate: null}],
        pro_yearly_player: [{purchased: false, expiryDate: null}],
        pro_forever_player: [{purchased: false, expiryDate: null}],
       })
      })
      .then(data => {return firestore().collection(this.state.uid).doc("playerUserData").set({
        teams: [],
        players: [],
        seasons: [],
        seasonsDisplay: '',
        seasonsDisplayId: 99999998
       })
      })
            //.then(() => this.props.navigation.navigate('GameAddPlayers'))
            .catch((error, data) => {
        if (error.code === 'auth/email-already-in-use') {
       //console.log('auth/email-already-in-use');
          auth()
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then(data => {
             //console.log('still alive 2');
                let uid = data.user.uid;
             //console.log('still alive 3');
                this.setState({ uid: uid });
             //console.log('still alive 4');
         //console.log("User ID :- ", data.user.uid);

         })
          /*
       //console.log('still alive 2');
          let uid = data.user.uid;
       //console.log('still alive 3');
          this.setState({ uid: uid });
       //console.log('still alive 4');
   //console.log("User ID :- ", data.user.uid);
      */

        }

        if (error.code === 'auth/invalid-email') {
       //console.log('That email address is invalid!');
          this.setState({animateLoading: false });
        }

        console.error(error);
      });
   //console.log('handleSignUp email')

    //}, 1000);

  //console.log('before settime out 4')
    setTimeout(() => {
     //console.log('during timeout');
         this.setState({animateLoading: false });
       }, 2000);

}

testSignUp = async() => {
//testSignUp = () => {

console.log('before timeout.');

this.setState({animateLoading: true });

//console.log('before settime out 5')
  setTimeout(() => {
   //console.log('during timeout');
       this.setState({animateLoading: false });
     }, 5000);

  //console.log('after timeout');


}


emailSignup = () => {
  //if (Platform.OS === 'ios') {
  return (
    <Box style={{paddingTop: 40}}>

      <Text style={styles.whiteTextSmallHeader}>or, sign up with email :</Text>
      <Stack space={4} style={{paddingTop: 20}} minW="80%">
        {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
          {this.state.errorMessage}
          </Text>}
          <Box style={{paddingTop: 4}}>
            <Input size="2xl" variant="unstyled" placeholder="Email" autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email} />
          </Box>
          <Box style={{paddingTop: 8}}>
            <Input size="2xl" variant="unstyled" placeholder="Password" secureTextEntry
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password} />
          </Box>
          <Button size="md" bg="#E879F9" variant="subtle" _text={{
            color: "#ffffff",
            fontSize: 25,
            fontWeight: '500'
          }} pt="4" mt="2" pb="4" onPress={() => this.handleSignUp()}>

            <Text style={styles.buttonTextBack}>Sign Up</Text>

          </Button>
        </Stack>
        <ActivityIndicator size="large" color="#fff" animating={this.state.animateLoading} />
      </Box>
)
//}
}


render() {
    return (
      <Container maxW="100%">
      <Center style={{height:'100%',width:'100%',alignItems: 'center'}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientBg}>
          <ScrollView style={{height:'100%',width:'100%'}}>
            <Box style={{paddingTop: 20}}>
              <Center>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/SoccerTimeLive-logoMain400pxTrans.png')}
                  />
              </Center>
            </Box>
            <Center>
            {this.AppleSignIn()}
            {this.onGoogleSignIn()}
            {this.emailSignup()}
            </Center>


            </ScrollView>
        </LinearGradient>
      </Center>
      <View style={[styles.activityIndicatorTest, this.state.animateLoading ? styles.activityIndicatorLarge : styles.activityIndicatorNone]}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', '#000']} style={styles.linearGradientLoading}>
          <ActivityIndicator size="large" color="#fff" animating={this.state.animateLoading} />
          <Heading style={{color: '#fff'}}>LOADING...</Heading>
        </LinearGradient>
      </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    color: '#ccc',
    //paddingTop: 8,
    backgroundColor: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteTextSmallHeader: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
  },
  borderDisplay: {
    borderColor: '#fff',
    borderWidth: 0.5,
  },
  largeButton: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    marginTop: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  textButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttonTextBack: {
    fontSize: 20,
    color: '#fff',
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    fontWeight: '200',
    fontWeight: 600,
  },
  appleBtn: {
    height: 44,
    width: 250,
    fontWeight: '200',
  },
  containerViewButton: {
    backgroundColor: '#000',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20
  },
  logoStyle: {

    resizeMode: 'contain',

    ...Platform.select({
      ios: {
        top: -0,
        width: PixelRatio.get() === 1 ? 140 : PixelRatio.get() === 1.5 ? 150 : PixelRatio.get() === 2 ? 160 : PixelRatio.get() === 3 ? 160 : 200,
      },
      android: {
        top: -0,
        width: PixelRatio.get() === 1 ? 160 : PixelRatio.get() === 1.5 ? 170 : PixelRatio.get() === 2 ? 180 : PixelRatio.get() === 3 ? 200 : 210,
        //: 14,
      },
      default: {
        width: '90%',
      }
      })
  },
  imageStyleName: {
    resizeMode: 'contain',
    //height: 180,
    //width: 180,
    //top: -45,
    ...Platform.select({
      ios: {
        //height: 180,
        //width: 180,
        top: PixelRatio.get() === 1 ? 0 : PixelRatio.get() === 1.5 ? 0 : PixelRatio.get() === 2 ? 0 : PixelRatio.get() === 3 ? 0 : -45,
        height: PixelRatio.get() === 1 ? 60 : PixelRatio.get() === 1.5 ? 70 : PixelRatio.get() === 2 ? 80 : PixelRatio.get() === 3 ? 120 : 160,
      },
      android: {
        height: PixelRatio.get() === 1 ? 60 : PixelRatio.get() === 1.5 ? 70 : PixelRatio.get() === 2 ? 80 : PixelRatio.get() === 3 ? 100 : 130,
        //width: 130,
        top: 0
      },
      default: {
        height: 180,
        width: 180,
        top: -45
      }
      })
  },
  linearGradientBg: {
    minWidth: '100%',
    minHeight: '100%',
    paddingTop: 50,
  },
  tinyLogo: {
    //width: 400,
    resizeMode: 'contain',
    marginBottom: 20
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
  }
})

//{this.onGoogleSignIn()}
//

/*
<Box style={{paddingTop: 40}}>
<Button transparent light style={styles.textButton}
  onPress={() => this.props.navigation.navigate('Login')}
  >
  <Text style={styles.whiteText}>Already have an account? Login here.</Text>
</Button>
</Box>
*/


/*
<Button size="md" variant="subtle" _text={{
  color: "#ffffff",
  fontSize: 25,
  fontWeight: '500'
}} pt="4" mt="2" pb="4" onPress={() => this.testSignUp()}>

  <Text style={styles.buttonTextBack}>Sign Up Test</Text>

</Button>
*/

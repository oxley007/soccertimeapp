  // SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, PixelRatio, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, H1 } from 'react-native';
import {Row,Col,Container,Content,Form, Item, Input, Label, Button, Stack, Box} from 'native-base';

//import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
  }


/*
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
*/

  AppleSignIn = () => {

    if (Platform.OS === 'ios') {
    return(

    <View>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 240, // You must specify a width
          height: 55, // You must specify a height
          marginBottom: 40,
          marginTop: 0,
        }}
        onPress={() => this.onAppleButtonPress()}
      />
    </View>
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

  console.log('we hotting htis?');
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  console.log('we hotting htis 2?');

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  console.log('does this gi=et hit here?');
  return auth().signInWithCredential(googleCredential)
  .then(data => {
    console.log("Android User ID 0 :- ", data.user.uid);
    let uid = data.user.uid;
    console.log("Android User ID 1 :- ", data.user.uid);
    console.log(uid + ' this is  userID');
    this.setState({ uid: uid });
    console.log("Android User ID 2 :- ", data.user.uid);
})
 .then(data => {return firestore().collection(this.state.uid).doc("").set({
    gameId: 1,
    gameName: 'Game two hello1!',
    uid: this.state.uid,
    displayId: 1,
    gameResult: 3,
  })
})
.then(data => {return firestore().collection(this.state.uid).doc("playerStats").set({
   winningStreak: 0,
   longestStreak: 0,
   highestPlayerScore: 0,
   highestPlayerScoreId: 0,
   highestTeamScore: 0,
   gameId: 4,
   displayId: 1,
   gameResult: 3,
   autoNotOut: 3,
   tokens: 10,
   totalGamesPlayed: 0,
   totalRunsScored: 0,
   totalMinPlayed: 0,
   highestInningsTeamScore: 0,
   totalTeamOvers: 0,
   totalTeamWickets: 0,
   gameStats: [],
   proIap: false,
   proPlusIap: false,
   proIapEx: false,
   gameIap: 999999999999999999,
 })
})
  .then(data => {return firestore().collection(this.state.uid).doc("liveGamesPlayed").set({
     liveGamesPlayed: [],
   })
 })
 .then(data => {return firestore().collection(this.state.uid).doc("players").set({
    players: [],
  })
    })
      //.then(() => this.props.navigation.navigate('GameAddPlayers'))
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleSignUp Android')
}

   onAppleButtonPress = async() => {
     console.log('hit onAppleButtonPress');
     // Start the sign-in request
     const appleAuthRequestResponse = await appleAuth.performRequest({
       requestedOperation: appleAuth.Operation.LOGIN,
       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
     });

     // Ensure Apple returned a user identityToken
     if (!appleAuthRequestResponse.identityToken) {
       throw 'Apple Sign-In failed - no identify token returned';
     }

     console.log('hit onAppleButtonPress past check.');
     // Create a Firebase credential from the response
     const { identityToken, nonce } = appleAuthRequestResponse;
     const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

     // Sign the user in with the credential
     return auth().signInWithCredential(appleCredential)
     .then(data => {
       let uid = data.user.uid;
       this.setState({ uid: uid });
   console.log("User ID :- ", data.user.uid);
})
    .then(data => {return firestore().collection(this.state.uid).doc("userData").set({
       uid: this.state.uid,
       loginType: 'Apple Auth'
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
 .then(data => {return firestore().collection(this.state.uid).doc("players").set({
    players: [],
  })
})
     //.then(() => this.props.navigation.navigate('GameAddPlayers'))
     .catch(error => this.setState({ errorMessage: error.message }))
console.log('handleSignUp')
}



  //handleSignUp = () => {
  handleSignUp = async() => {
    console.log('still alive 1');
    auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => {
          console.log('still alive 2');
          let uid = data.user.uid;
          console.log('still alive 3');
          this.setState({ uid: uid });
          console.log('still alive 4');
      console.log("User ID :- ", data.user.uid);
   })
   .then(data => {return firestore().collection(this.state.uid).doc("userData").set({
      uid: this.state.uid,
      loginType: 'email'
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
.then(data => {return firestore().collection(this.state.uid).doc("players").set({
   players: [],
 })
})
        //.then(() => this.props.navigation.navigate('GameAddPlayers'))
        .catch(error => {
            this.setState({ errorMessage: error.message })
            console.log(error.message + 'error message');
        })
  console.log('handleSignUp email')
}


emailSignup = () => {
  if (Platform.OS === 'ios') {
  return (
    <Box>
    <Text style={styles.whiteTextSmallHeader}>or, sign up with email :</Text>
    <Stack>
    {this.state.errorMessage &&
    <Text style={{ color: 'red' }}>
        {this.state.errorMessage}
    </Text>}
      <Input size="md" placeholder="Email" autoCapitalize="none"
      style={styles.textInput}
      onChangeText={email => this.setState({ email })}
      value={this.state.email} />
      <Input size="md" placeholder="Password" secureTextEntry
      autoCapitalize="none"
      style={styles.textInput}
      onChangeText={password => this.setState({ password })}
      value={this.state.password} />
      <Button rounded large warning style={styles.largeButton}
        onPress={() => this.handleSignUp()} >
          <Text style={styles.buttonTextBack}>Sign Up</Text>
      </Button>
    </Stack>
    </Box>
)
}
}


render() {
    return (
      <Container>
            <Image
            source={require('../../assets/4dot6logo-transparent.png')}
            style={styles.logoStyle}
            />

            <Image
              source={require('../../assets/GullyBYCScorebookLogoTrtans.png')}
              style={styles.imageStyleName}
            />

            {this.AppleSignIn()}
            {this.emailSignup()}


            <Button transparent light style={styles.textButton}
              onPress={() => this.props.navigation.navigate('Login')}
              >
              <Text style={styles.whiteText}>Already have an account? Login here.</Text>
            </Button>
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
    color: '#fff',
    marginTop: 8
  },
  whiteText: {
    color: '#fff',
  },
  whiteTextSmallHeader: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
  },
  largeButton: {
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    marginTop: 20,
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
    color: '#c471ed',
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    fontWeight: '200',
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
})

//{this.onGoogleSignIn()}
//

// SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {Row,Col,Container,Content,Form, Item, Input, Label, H1, Button} from 'native-base';

//import RNRestart from 'react-native-restart';
//import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { connect } from "react-redux";
import { updateGames } from '../../Reducers/games';
//import { updateGameId } from '../../Reducers/gameId';

class SignOut_old extends React.PureComponent {
  constructor(props) {
    super(props);
    const { currentUser } = auth()
    this.ref = firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        loading: true,
        games: [],
    };
  }

  state = {
    email: '',
   password: '',
   uid: '',
   errorMessage: null,
   games: this.props.games.games || [],
  }

  handleChange = ( games ) => {
    this.setState({ games });
  };

/*
  handleSignUp = () => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => {
          let uid = data.user.uid;
          this.setState({ uid: uid });
   //console.log("User ID :- ", data.user.uid);
   })
        .then(data => {return firebase.firestore().collection(this.state.uid).doc("Hello1").set({
          gameId: 1,
          gameName: 'Game two hello1!',
          uid: this.state.uid,
        })
      })
        .then(() => this.props.navigation.navigate('GameAddPlayers'))
        .catch(error => this.setState({ errorMessage: error.message }))
 console.log('handleSignUp')
}
*/


signOutUser = () => {

  /*
  this.setState({
    games: [],
  }, function () {
    const { games } = this.state
    this.props.dispatch(updateGames(this.state.games));
  })

  this.setState({
    keyID: '0',
    gameID: '0',
  }, function () {
    const { keyID, gameID } = this.state
    this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
  })
  */

  auth().signOut().then(function() {
    RNRestart.Restart()
 //console.log('hit restart / signout.');
  // Sign-out successful.
  })
  .catch(function(error) {
  // An error happened.
  });
}

/*
signOutUser = () => {
  firebase.auth().signOut()
  .then(RNRestart.Restart());
}
*/


render() {
    return (
      <Container>
            <Image
            source={require('../../assets/4dot6logo-transparent.png')}
            style={{ width: '90%', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
            />
            <H1 style={styles.whiteText}>Click the below button to sign out of 4dot6</H1>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
            </Text>}
            <Button rounded large warning style={styles.largeButton}
              onPress={() => this.signOutUser()} >
                <Text style={styles.buttonTextBack}>Sign Out</Text>
            </Button>
            <Button transparent light style={styles.textButton}
              onPress={() => this.props.navigation.navigate('Login')}
              >
              <Text style={styles.whiteText}>Or click here to go back</Text>
            </Button>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games,
});

export default connect(mapStateToProps)(SignOut_old);

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
})

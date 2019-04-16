import React, { Component } from "react";
import firebase from "../../firebase";
import Button from "../../components/CustomButtons/Button.jsx";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";

export default class FirebaseTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  pushToFirebase(reference, object) {
    const ref = firebase.database().ref(reference);
    ref.push(object);
  }

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <p>
            <p>Logged In! Welcome {firebase.auth().currentUser.displayName}</p>
            <Button color="primary" onClick={() => firebase.auth().signOut()}>
              Click to sign out
            </Button>
          </p>
        ) : (
          <p>
            <p>Log in with</p>
            <FirebaseAuth
              style={{
                display: "inline-block"
              }}
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </p>
        )}
      </div>
    );
  }
}

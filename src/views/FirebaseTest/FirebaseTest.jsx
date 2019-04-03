import React, { Component } from "react";
import firebase from "../../firebase";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default class FirebaseTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      number: 0,
      name: ""
    };
    this.buttonHandler = this.buttonHandler.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.submitNameHandler = this.submitNameHandler.bind(this);
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

  buttonHandler(e) {
    e.preventDefault();
    this.setState({
      number: Math.floor(Math.random() * 100)
    });
  }

  submitNameHandler(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    this.setState({
      name: name
    });
    document.getElementById("name").value = "";
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.number !== prevState.number) {
      this.pushToFirebase("number", this.state.number);
    }
    if (this.state.name !== prevState.name) {
      this.pushToFirebase("name", this.state.name);
    }
  }

  pushToFirebase(reference, object) {
    const ref = firebase.database().ref(reference);
    ref.push(object);
  }

  render() {
    return (
      <div>
        {console.log(this.state.isSignedIn)}
        {this.state.isSignedIn ? (
          <div>
            <h1>
              Logged In! Welcome {firebase.auth().currentUser.displayName}
            </h1>
            <Button color="primary" onClick={() => firebase.auth().signOut()}>
              Click to sign out
            </Button>
          </div>
        ) : (
          <div>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
        <CustomInput
          labelText="Name"
          id="name"
          formControlProps={{
            fullWidth: false
          }}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.submitNameHandler(e);
            }
          }}
        />
        <Button color="primary" onClick={this.submitNameHandler}>
          Submit Name
        </Button>
        <h1>{this.state.number}</h1>
        <Button color="primary" onClick={this.buttonHandler}>
          Generate Random Number
        </Button>
      </div>
    );
  }
}

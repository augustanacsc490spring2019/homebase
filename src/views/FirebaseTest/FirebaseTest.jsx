import React, { Component } from "react";
import firebase from "../../firebase";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

export default class FirebaseTest extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
      name: ""
    };
    this.buttonHandler = this.buttonHandler.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
    this.submitNameHandler = this.submitNameHandler.bind(this);
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
        <Button onClick={this.buttonHandler}>Generate Random Number</Button>
      </div>
    );
  }
}

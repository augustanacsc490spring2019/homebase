import React, { Component } from "react";
import firebase from "../../firebase";

export default class FirebaseTest extends Component {
  constructor() {
    super();
    this.state = {
      number: 0
    };
    this.buttonHandler = this.buttonHandler.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
  }

  buttonHandler(e) {
    e.preventDefault();
    this.setState({
      number: Math.floor(Math.random() * 100)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.number !== prevState.number) {
      this.pushToFirebase("number", this.state.number);
    }
  }

  pushToFirebase(reference, object) {
    const ref = firebase.database().ref(reference);
    ref.push(object);
  }

  render() {
    return (
      <div>
        <h1>{this.state.number}</h1>
        <button onClick={this.buttonHandler}>Generate Random Number</button>
      </div>
    );
  }
}

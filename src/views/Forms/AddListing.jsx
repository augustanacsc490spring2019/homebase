import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import { pushToFirebase } from "../../reference/firebase/index";

const defaultState = {
  name: "",
  desc: "",
  rules: "",
  price: "",
  type: "",
  status: "",
  rooms: ""
};

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  inputChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      [id]: value
    });
  };

  submitForm = e => {
    e.preventDefault();
    pushToFirebase("listings", this.state);
    this.setState({ ...defaultState });
  };

  render() {
    return (
      <div>
        {!this.props.isSignedIn ? (
          <h2>Please sign in!</h2>
        ) : (
          <form onSubmit={this.submitForm} autoComplete="off">
            <CustomInput
              labelText="Name"
              id="name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.name
              }}
            />
            <CustomInput
              labelText="Description"
              id="desc"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.desc
              }}
            />
            <CustomInput
              labelText="Rules"
              id="rules"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.rules
              }}
            />
            <CustomInput
              labelText="Price"
              id="price"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.price
              }}
            />
            <CustomInput
              labelText="Type"
              id="type"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.type
              }}
            />
            <CustomInput
              labelText="Rooms"
              id="rooms"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.rooms
              }}
            />
            <Button color="primary" type="submit">
              Add Property
            </Button>
            <Button color="info">Clear Form</Button>
          </form>
        )}
      </div>
    );
  }
}

AddListing.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isSignedIn: state.signInState.isSignedIn
});
export default connect(mapStateToProps)(AddListing);

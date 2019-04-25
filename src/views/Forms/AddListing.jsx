import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import { pushToFirebase } from "../../reference/firebase/index";

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      rules: "",
      price: "",
      type: "",
      status: "",
      rooms: [
        {
          name: "",
          type: ""
        }
      ]
    };
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
  };

  render() {
    console.log(this.props.isSignedIn);
    return (
      <div>
        {!this.props.isSignedIn ? (
          <h2>Please sign in!</h2>
        ) : (
          <form onSubmit={this.submitForm}>
            <CustomInput
              labelText="Name"
              id="name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ onChange: this.inputChange }}
            />
            <CustomInput
              labelText="Description"
              id="desc"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ onChange: this.inputChange }}
            />
            <CustomInput
              labelText="Rules"
              id="rules"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ onChange: this.inputChange }}
            />
            <CustomInput
              labelText="Price"
              id="price"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ onChange: this.inputChange }}
            />
            <CustomInput
              labelText="Type"
              id="type"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ onChange: this.inputChange }}
            />
            <CustomInput
              labelText="Rooms"
              id="rooms"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{ onChange: this.inputChange }}
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route } from "react-router-dom";
import PropertiesPage from "../../views/Properties/Properties";

import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import { pushToFirebase } from "../../reference/firebase/index";
import { Snackbar, IconButton, Input } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import { Map, GoogleApiWrapper } from "google-maps-react";
import firebase from "../../reference/firebase";
import placeholderImg from "../../assets/img/placeholderImg.jpg";

const defaultState = {
  name: "",
  desc: "",
  rules: "",
  price: "",
  type: "",
  status: "",
  rooms: "",
  pic: "",
  owner: {}
};

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      snackbarOpen: false,
      progress: 0,
      isUploading: false
    };
  }

  inputChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      [id]: value
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  submitForm = e => {
    e.preventDefault();
    const currentUser = firebase.auth().currentUser;
    // excluding other state elements
    const { snackbarOpen, process, isUploading, ...curState } = this.state;
    pushToFirebase("listings", {
      ...curState,
      owner: {
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid
      }
    });
    this.setState({ ...defaultState, snackbarOpen: true });
    return <Route path={"/admin/properties"} component={PropertiesPage} />;
  };

  initAutocomplete = mapProps => {
    const { google } = mapProps;
    this.autoComplete = new google.maps.places.Autocomplete(
      document.getElementById("autoComplete")
    );
    this.autoComplete.setFields(["geometry"]);
    this.autoComplete.addListener("place_changed", () => {
      const place = this.autoComplete.getPlace();
      if (place.geometry) {
        // TODO: change the state accordingly
        console.log(place.geometry.location);
      }
    });
  };

  // https://www.npmjs.com/package/react-firebase-file-uploader
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress: progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ pic: url }));
  };
  // https://material-ui.com/demos/snackbars/
  snackBar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.state.snackbarOpen}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Listing created!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  };

  render() {
    console.log(process.env.REACT_APP_MAP_API_KEY);
    return (
      <div>
        {!this.props.isSignedIn ? (
          <h2>Please sign in!</h2>
        ) : (
          <form onSubmit={this.submitForm} autoComplete="off">
            {this.snackBar()}
            {/* https://www.npmjs.com/package/react-firebase-file-uploader */}
            {this.state.pic ? (
              <img
                style={{ width: "20%", height: "auto" }}
                src={this.state.pic}
                alt={`${firebase.auth().currentUser.displayName} listing`}
              />
            ) : this.state.isUploading ? (
              `Loading...`
            ) : (
              <img
                style={{ width: "20%", height: "auto" }}
                src={placeholderImg}
                alt={`${firebase.auth().currentUser.displayName} listing`}
              />
            )}
            <Button
              color="primary"
              component={CustomUploadButton}
              hidden
              accept="image/*"
              name="listing"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            >
              <AddPhotoAlternateIcon />
            </Button>
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
            <Input placeholder="Address" type="text" id="autoComplete" />
            <Map
              google={this.props.google}
              initialCenter={{
                lat: 41.503152,
                lng: -90.550617
              }}
              onClick={this.props.google}
              zoom={14}
              onReady={this.initAutocomplete}
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

export default compose(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY
  }),
  connect(mapStateToProps)
)(AddListing);

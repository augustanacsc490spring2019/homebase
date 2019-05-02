import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route } from "react-router-dom";
import PropertiesPage from "../../views/Properties/Properties";

import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { pushToFirebase } from "../../reference/firebase/index";
import { Snackbar, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ClearIcon from "@material-ui/icons/Clear";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import { Map, GoogleApiWrapper } from "google-maps-react";
import firebase from "../../reference/firebase";
import placeholderImg from "../../assets/img/placeholderImg.jpg";

const defaultState = {
  name: "",
  address: "",
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

  clearForm = e => {
    this.setState({ ...defaultState, snackbarOpen: false });
  };

  initAutocomplete = mapProps => {
    const { google } = mapProps;
    this.autoComplete = new google.maps.places.Autocomplete(
      document.getElementById("address")
    );
    this.autoComplete.setFields(["geometry", "formatted_address"]);
    this.autoComplete.addListener("place_changed", () => {
      const place = this.autoComplete.getPlace();
      this.setState({
        address: place.formatted_address
      });
      document.getElementById("address").value = place.formatted_address;
      if (place.geometry) {
        // TODO: change the state accordingly
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
    return (
      <div>
        {!this.props.isSignedIn ? (
          <h2>Please sign in!</h2>
        ) : (
          <form onSubmit={this.submitForm} autoComplete="off">
            <Map
              google={this.props.google}
              onClick={this.props.google}
              visible={false}
              onReady={this.initAutocomplete}
            />

            {this.snackBar()}
            <br />
            <Typography variant="h5">Listing Image</Typography>
            {/* https://www.npmjs.com/package/react-firebase-file-uploader */}

            <GridContainer
              spacing={24}
              alignItems="center"
              justify="flex-start"
            >
              <GridItem xs={6}>
                {this.state.pic ? (
                  <img
                    style={{ width: "50%", height: "auto" }}
                    src={this.state.pic}
                    alt={`${firebase.auth().currentUser.displayName} listing`}
                  />
                ) : this.state.isUploading ? (
                  `Loading...`
                ) : (
                  <img
                    style={{ width: "50%", height: "auto" }}
                    src={placeholderImg}
                    alt={`${firebase.auth().currentUser.displayName} listing`}
                  />
                )}
              </GridItem>
              <GridItem xs={3}>
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
              </GridItem>
            </GridContainer>
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
              labelText="Address"
              id="address"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.address
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
            <Button color="info" onClick={this.clearForm}>
              <ClearIcon /> Clear All
            </Button>
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

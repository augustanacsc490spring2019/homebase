import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import { pushToFirebase } from "../../reference/firebase/index";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FileUploader from "react-firebase-file-uploader";
import firebase from "../../reference/firebase";

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
  };
  // https://www.npmjs.com/package/react-firebase-file-uploader
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
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
            {this.snackBar()}
            {/* https://www.npmjs.com/package/react-firebase-file-uploader */}
            <Button color="primary">
              Upload an image for your listing
              <FileUploader
                hidden
                accept="image/*"
                name="listing"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
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
            <CustomInput
              labelText="Photo"
              id="photo"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.inputChange,
                value: this.state.photo
              }}
              type="file"
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

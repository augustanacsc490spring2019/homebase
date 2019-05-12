import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
// @material-ui/core components
import { Redirect } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PublishIcon from "@material-ui/icons/Publish";
import SaveIcon from "@material-ui/icons/Save";
import HomeIcon from "@material-ui/icons/Home";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";

import firebase from "../../reference/firebase";
import { fetchCurrentUserInfo } from "../../reference/redux/actions/userAction";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

// const uiConfig = {
//   signInFlow: "popup",
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   callbacks: {
//     signInSuccess: () => false
//   }
// };
class UserProfile extends Component {
  state = {
    cancel: false,
    email: "",
    description: "",
    avatar: "",
    location: "",
    work: ""
  };
  inputChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      [id]: value
    });
  };
  getUserInfo = () => {
    console.log(this.props.users);
    this.props.users.forEach(item => {
      console.log(
        item.id + " <- item, curUser -> " + firebase.auth().currentUser.uid
      );
      if (item.id === firebase.auth().currentUser.uid) {
        this.setState({ userInfo: item });
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isSignedIn &&
      this.props.isSignedIn !== nextProps.isSignedIn
    ) {
      this.props.fetchUsersInfo();
      this.props.fetchCurrentUserInfo();
    }
  }

  handleCancelClick = () => {
    this.setState({ cancel: true });
  };

  render() {
    const { classes } = this.props;
    const currentUser = firebase.auth().currentUser;
    if (this.state.cancel) {
      return <Redirect push exact to="/admin/user/profile" />;
    }
    return (
      <div>
        {!this.props.isSignedIn ? (
          <Redirect push to="/admin/user/profile" />
        ) : (
          <Card profile>
            <CardAvatar profile>
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={`${currentUser.displayName} avatar`}
                />
              ) : (
                <PersonIcon />
              )}
            </CardAvatar>
            <CardBody profile>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={12}>
                  <Button color="rose" round>
                    <PublishIcon />
                    Upload Avatar
                  </Button>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <h3
                    className={classes.CardBody}
                    style={{ fontWeight: "bold" }}
                  >
                    {currentUser.displayName}
                  </h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      label="Email"
                      id="email"
                      style={{
                        display: "inline",
                        margin: "10px"
                      }}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        )
                      }}
                      value={this.state.email}
                      onChange={this.inputChange}
                    />
                  </GridContainer>
                  <GridContainer
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <EmailIcon />
                    <h4
                      style={{
                        display: "inline",
                        margin: "10px"
                      }}
                      className={classes.CardBody}
                    >
                      {currentUser.email}
                    </h4>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      label="Where You Live"
                      id="location"
                      style={{
                        display: "inline",
                        margin: "10px"
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon />
                          </InputAdornment>
                        )
                      }}
                      fullWidth
                      value={this.state.location}
                      onChange={this.inputChange}
                    />
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      label="Describe Yourself"
                      id="description"
                      multiline={true}
                      style={{
                        display: "inline",
                        margin: "10px"
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FormatQuoteIcon />
                          </InputAdornment>
                        )
                      }}
                      fullWidth
                      value={this.state.description}
                      onChange={this.inputChange}
                    />
                  </GridContainer>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Button color="primary" round>
                    <SaveIcon />
                    Save
                  </Button>
                  <Button
                    color="danger"
                    round
                    onClick={this.handleCancelClick}
                    style={{ margin: "20px" }}
                  >
                    Cancel
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

UserProfile.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  curUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isSignedIn: state.signInState.isSignedIn,
  users: state.usersState.users,
  curUser: state.usersState.curUser
});

export default compose(
  connect(
    mapStateToProps,
    { fetchCurrentUserInfo }
  ),
  withStyles(styles)
)(UserProfile);

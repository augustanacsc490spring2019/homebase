import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
// @material-ui/core components
import { Typography, Paper, Divider } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import EditIcon from "@material-ui/icons/Edit";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";

import firebase from "../../reference/firebase";
import {
  logIn,
  logOut,
  fetchUsersInfo,
  fetchCurrentUserInfo
} from "../../reference/redux/actions/userAction";
import { StyledFirebaseAuth } from "react-firebaseui";

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

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: () => false
  }
};
class UserProfile extends Component {
  state = { route: false };
  getUserInfo = () => {
    this.props.users.forEach(item => {
      if (item.id === firebase.auth().currentUser.uid) {
        this.setState({ userInfo: item });
      }
    });
  };

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchUsersInfo();
      this.props.fetchCurrentUserInfo();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isSignedIn &&
      this.props.isSignedIn !== nextProps.isSignedIn
    ) {
      this.props.fetchUsersInfo();
      this.props.fetchCurrentUserInfo();
    }
  }

  handleEditProfile = () => {
    this.setState({ route: true });
  };

  render() {
    const { classes } = this.props;
    const currentUser = firebase.auth().currentUser;
    const userInfo = this.props.curUser;
    if (this.state.route) {
      return <Redirect push exact to="/admin/user/edit" />;
    }
    return (
      <div>
        {!this.props.isSignedIn ? (
          <Paper>
            <GridContainer spacing={24}>
              <GridItem xs={12} sm={12} md={12}>
                <Typography variant="h4" style={{ padding: "20px" }}>
                  JOIN THE MARKET NOW!
                </Typography>
                <Divider variant="middle" />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </GridItem>
            </GridContainer>
          </Paper>
        ) : (
          <GridContainer spacing={24}>
            <GridItem xs={12} sm={12} md={12}>
              <Card profile>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color="danger"
                    round
                    onClick={() => firebase.auth().signOut()}
                    style={{ margin: "20px", float: "right" }}
                  >
                    Log Out
                  </Button>
                </GridItem>
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
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      color="primary"
                      round
                      onClick={this.handleEditProfile}
                    >
                      <EditIcon />
                      Edit Profile
                    </Button>
                  </GridItem>
                  <GridContainer>
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
                        <EmailIcon />
                        <h4
                          style={{ display: "inline", margin: "10px" }}
                          className={classes.CardBody}
                        >
                          {currentUser.email}
                        </h4>
                      </GridContainer>
                    </GridItem>

                    <GridItem xs={4} sm={4} md={4}>
                      <GridContainer style={{ float: "right" }}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h3
                            style={{ display: "inline" }}
                            className={classes.CardHeader}
                          >
                            {userInfo.listings}
                          </h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          Listings
                        </GridItem>
                      </GridContainer>
                    </GridItem>

                    <GridItem xs={4} sm={4} md={4}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <h3
                            style={{ display: "inline" }}
                            className={classes.CardHeader}
                          >
                            {userInfo.rents}
                          </h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          Rents
                        </GridItem>
                      </GridContainer>
                    </GridItem>

                    <GridItem xs={4} sm={4} md={4}>
                      <GridContainer style={{ float: "left" }}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h3
                            style={{ display: "inline" }}
                            className={classes.CardHeader}
                          >
                            {isNaN(userInfo.ratings)
                              ? userInfo.ratings
                              : userInfo.ratings.toFixed(1)}
                          </h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          Ratings
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </div>
    );
  }
}

UserProfile.propTypes = {
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
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
    { logIn, logOut, fetchUsersInfo, fetchCurrentUserInfo }
  ),
  withStyles(styles)
)(UserProfile);

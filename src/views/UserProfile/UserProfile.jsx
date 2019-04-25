import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import EditIcon from "@material-ui/icons/Edit";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Primary from "components/Typography/Primary.jsx";

import avatar from "assets/img/faces/marc.jpg";
import firebase from "../../reference/firebase";
import { logIn, logOut } from "../../reference/redux/actions/userAction";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Divider } from "@material-ui/core";

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
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      !!user ? this.props.logIn() : this.props.logOut();
    });
  }

  componentWillReceiveProps(prevProps, nextProps) {
    if (nextProps.isSignedIn !== prevProps.isSignedIn) {
      // this.props.isSignedIn = nextProps.isSignedIn;
    }
  }

  render() {
    const { classes } = this.props;
    const currentUser = firebase.auth().currentUser;
    return (
      <div>
        {!this.props.signInState.isSignedIn ? (
          <div>
            <Primary>
              You are not signed in. Please sign in to join the market!
            </Primary>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        ) : (
          <GridContainer spacing={24}>
            <GridItem xs={12} sm={12} md={12}>
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
                  <GridItem xs={12} sm={12} md={12}>
                    <Button color="primary" round>
                      <EditIcon />
                      Edit Profile
                    </Button>
                  </GridItem>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <h1
                        className={classes.cardTitle}
                        style={{ fontWeight: "bold" }}
                      >
                        {currentUser.displayName}
                      </h1>
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
                            0
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
                            0
                          </h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          Listings
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
                            0
                          </h3>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          Listings
                        </GridItem>
                      </GridContainer>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        color="primary"
                        round
                        onClick={() => firebase.auth().signOut()}
                      >
                        Log Out
                      </Button>
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
  signInState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  signInState: state.signInState
});

export default compose(
  connect(
    mapStateToProps,
    { logIn, logOut }
  ),
  withStyles(styles)
)(UserProfile);

import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";

import { Link } from "react-router-dom";
// core components

import firebase from "../../reference/firebase";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  //https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  resize = () => this.forceUpdate();

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
          component={Link}
          to="/admin/user/profile"
        >
          {this.props.isSignedIn && firebase.auth().currentUser.photoURL ? (
            <img
              src={firebase.auth().currentUser.photoURL}
              alt={`${firebase.auth().currentUser.displayName} avatar`}
              style={
                window.innerWidth > 959
                  ? {
                      display: "block",
                      height: "170%",
                      width: "170%",
                      borderRadius: "85%"
                    }
                  : {
                      display: "block",
                      height: "30px",
                      width: "30px",
                      borderRadius: "15px"
                    }
              }
              className={classes.icons}
            />
          ) : (
            <Person className={classes.icons} />
          )}
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.signInState.isSignedIn
});

export default compose(
  connect(mapStateToProps),
  withStyles(headerLinksStyle)
)(HeaderLinks);

import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import ListItem from "@material-ui/core/ListItem";
// import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}></div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <Link to="/" className={classes.a}>
              Homebase
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default withStyles(footerStyle)(Footer);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MediaCard from "@material-ui/core/CardMedia";

import PropertyItem from "../../components/PropertyItem";
import ModalInfo from "../../components/ModalInfo";
import { bugs, website, server } from "variables/general.jsx";

import { pullFromFirebase } from "../../reference/firebase";
import { debug } from "util";

const styles = {};
const style = {
  text: {
    textAlign: "center"
  },
  mainConatinerStyle: {
    flexDirection: "column",
    flex: 1
  },
  floatingMenuButtonStyle: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10
  }
};

class Properties extends React.Component {
  state = {
    listings: [],
    modalOpen: false
  };
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  listProperties = () => {
    pullFromFirebase("listings", snapshot => {
      let listings = [];
      snapshot.forEach(item => {
        listings = listings.concat({
          id: item.key,
          ...item.val()
        });
      });
      this.setState({ listings: listings });
    });
  };

  componentDidMount() {
    this.listProperties();
  }

  render() {
    const { classes } = this.props;
    const { listings } = this.state;
    return (
      <GridContainer>
        {listings.map((listing, key) => (
          <PropertyItem
            id={listing.id}
            key={key}
            imagePath={listing.pic}
            address={listing.name}
            price={listing.price}
            rooms={listing.rooms}
            description={listing.desc}
            info={listing}
            styles={styles}
            classes={classes}
          />
        ))}
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Properties);

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";
import PropertyItem from "../../components/Property/PropertyItem";
// import ModalInfo from "../../components/ModalInfo";
// import { bugs, website, server } from "variables/general.jsx";
import { pullFromFirebase } from "../../reference/firebase";
// import { debug } from "util";
import * as geometry from 'spherical-geometry-js';
import { Paper, Typography } from "@material-ui/core";

const styles = {};
class Properties extends Component {
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

  componentDidMount = () => this.listProperties();

  render() {
    const { classes } = this.props;
    const { listings } = this.state;
    console.log(this.props.history.location.state)
    return (
      <GridContainer>
        {listings.map(
          (listing, key) => {
            if(this.props.history.location.state && geometry.computeDistanceBetween(listing.position, this.props.history.location.state)/1600 <= 10){
              return (<PropertyItem
                id={listing.id}
                key={key}
                imagePath={listing.pic}
                address={listing.name}
                lat={listing.lat}
                lng={listing.lng}
                price={listing.price}
                rooms={listing.rooms}
                description={listing.desc}
                info={listing}
                styles={styles}
                classes={classes}
              />)
          } else if (!this.props.history.location.state) {
            return (<PropertyItem
            id={listing.id}
            key={key}
            imagePath={listing.pic}
            name={listing.name}
            address={listing.address}
            lat={listing.lat}
            lng={listing.lng}
            price={listing.price}
            rooms={listing.rooms}
            description={listing.desc}
            info={listing}
            styles={styles}
            classes={classes}
          />)
          } 
        })};
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Properties);

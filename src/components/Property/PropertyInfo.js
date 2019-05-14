import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Typography, CardMedia, CardContent, Divider } from "@material-ui/core";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import PropertyMap from "../Map/PropertyMap";

export default class PropertyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.history.location.state.info
    };
  }
  render() {
    return (
      <Card style={{ width: "auto", height: "auto", margin: "0 auto" }}>
        <CardMedia
          component="img"
          image={
            this.state.pic ||
            "https://firebasestorage.googleapis.com/v0/b/homebase-3336e.appspot.com/o/placeholderImg.jpg?alt=media&token=13b6c9e5-7fdf-4955-a46f-a55d34f6f4b6"
          }
          title={this.state.address}
        />
        <CardContent style={{ padding: "1em" }}>
          <GridContainer spacing={24}>
            <GridItem xs={12} sm={2} md={2}>
              <img
                src={this.state.owner.photoURL}
                alt="avatar"
                width="100"
                height="100"
                style={{
                  borderRadius: "50%"
                }}
              />
              <Typography variant="subtitle1">
                {this.state.owner.displayName}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={10} md={10}>
              <Typography variant="h3">{this.state.name}</Typography>
              <Typography variant="subtitle1">{this.state.desc}</Typography>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <Divider variant="middle" />
              <PropertyMap
                style={{ margin: "20px" }}
                zoom={17}
                width="60%"
                height="300px"
                lat={this.state.position.lat}
                lng={this.state.position.lng}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Typography variant="body1">
                <strong>Address: </strong>
                {this.state.address}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Typography variant="body1">
                <strong>Status: </strong>
                {this.state.status}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Typography variant="body1">
                <strong>Number of Rooms: </strong>
                {this.state.rooms}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Typography variant="body1">
                <strong>Type: </strong>
                {this.state.type}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Typography variant="body1">
                <strong>Rules: </strong>
                {this.state.rules}
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Typography variant="body1">
                <strong>Price: </strong>
                {this.state.price}
              </Typography>
            </GridItem>
          </GridContainer>
        </CardContent>
      </Card>
    );
  }
}

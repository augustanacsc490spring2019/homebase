import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Typography, CardMedia, CardContent } from "@material-ui/core";
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
          <PropertyMap
            zoom={17}
            width="60%"
            height="300px"
            lat={this.state.lat}
            lng={this.state.lng}
          />
          <Typography variant="h1">{this.state.name}</Typography>
          <Typography variant="h2">{this.state.desc}</Typography>
          <Typography variant="body1">
            <strong>Owner: </strong>
            {this.state.owner.displayName}
          </Typography>
          <Typography variant="body1">
            <strong>Address: </strong>
            {this.state.address}
          </Typography>
          <Typography variant="body1">
            <strong>Status: </strong>
            {this.state.status}
          </Typography>
          <Typography variant="body1">
            <strong>Number of Rooms: </strong>
            {this.state.rooms}
          </Typography>
          <Typography variant="body1">
            <strong>Type: </strong>
            {this.state.type}
          </Typography>
          <Typography variant="body1">
            <strong>Rules: </strong>
            {this.state.rules}
          </Typography>
          <Typography variant="body1">
            <strong>Price: </strong>
            {this.state.price}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

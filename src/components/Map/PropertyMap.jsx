import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { TIMEOUT } from "dns";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
          defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
          defaultZoom={this.props.zoom}
          options={{ fullscreenControl: false, gestureHandling: "cooperative" }}
        >
          <LocationOnIcon
            lat={this.props.lat}
            lng={this.props.lng}
            color="secondary"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;

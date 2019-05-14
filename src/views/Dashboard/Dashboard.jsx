import React from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
// import GridItem from "components/Grid/GridItem.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
import Search from "@material-ui/icons/Search";
import Location from "@material-ui/icons/LocationOn";
import Button from "components/CustomButtons/Button.jsx";
import Typography from "@material-ui/core/Typography";
import MapAutocomplete from "../../components/MapAutocomplete";
import { setAddress } from "../../reference/redux/actions/addListingAction";
import { connect } from "react-redux";
import * as geometry from 'spherical-geometry-js';

// import { bugs, website, server } from "variables/general.jsx";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { compose } from "../../../../../AppData/Local/Microsoft/TypeScript/3.4.3/node_modules/redux";
import { Link } from "react-router-dom";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {address: ""};
  }

  inputChange = e => {
    const value = e.target.value;
    this.setState({
      address: value
    });
  };

  render() {
    return (
      <div>
        <center>
          <img
            src={require("../../assets/img/homebaselogo.png")}
            alt="logo"
            style={{
              width: 200,
              height: 200
            }}
          />
          <Typography component="h2" variant="h2" gutterBottom>
            Welcome to homebase.
          </Typography>
          <MapAutocomplete
            label="Address"
            value={this.state.address}
            id="address"
            onChange={this.inputChange}
          />
          <Button color="white" aria-label="edit" justIcon round component={Link} to={`/admin/listings/${this.props.position.lat}/${this.props.position.lng}`}>
            <Search />
          </Button>
          <Button color="white" aria-label="edit" justIcon round>
            <Location />
          </Button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  address: state.formState.address,
  position: state.formState.position
});

export default compose(
  connect(
    mapStateToProps,
    { setAddress }
  ),
  withStyles(dashboardStyle)
)(Dashboard);
// export default withStyles(dashboardStyle)(Dashboard);

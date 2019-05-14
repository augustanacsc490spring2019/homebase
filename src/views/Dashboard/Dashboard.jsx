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

// import { bugs, website, server } from "variables/general.jsx";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
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
          <MapAutocomplete value={this.state.address} id="landingInput" />
          <Button color="white" aria-label="edit" justIcon round>
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

export default withStyles(dashboardStyle)(Dashboard);

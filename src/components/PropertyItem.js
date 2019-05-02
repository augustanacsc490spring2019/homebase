import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import DescriptionIcon from "@material-ui/icons/Description";
import MoneyIcon from "@material-ui/icons/Money";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

class PropertyItem extends React.Component {
  render() {
    return (
      <GridItem xs={12} sm={6} md={3} style={{ margin: "1em 0" }}>
        <Link
          to={{
            pathname: `/listing/${this.props.id}`,
            state: {
              info: this.props.info
            }
          }}
        >
          <Card className={this.props.classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                className={this.props.classes.media}
                height="100%"
                width="100%"
                image={this.props.imagePath}
                title={this.props.address}
                style={this.props.styles.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.address}
                </Typography>
                <GridContainer justify="flex-start" alignItems="center">
                  <Typography component="p" style={{ margin: "1em" }}>
                    <DescriptionIcon color="primary" />
                    {this.props.description}
                  </Typography>
                </GridContainer>

                <GridContainer justify="flex-start" alignItems="center">
                  <Typography component="p" style={{ margin: "1em" }}>
                    <MoneyIcon color="primary" />
                    {this.props.price}
                  </Typography>
                </GridContainer>

                <GridContainer justify="flex-start" alignItems="center">
                  <Typography component="p" style={{ margin: "1em" }}>
                    <MeetingRoomIcon color="primary" />
                    {this.props.rooms}
                  </Typography>
                </GridContainer>
                <Typography component="p">{this.props.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </GridItem>
    );
  }
}

export { PropertyItem as default };

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
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});
class PropertyItem extends React.Component {
  render() {
    const { id, info, classes, address, styles, description, price, rooms, imagePath } = this.props;
    const { card } = classes;
    const { media } = styles;
    return (
      <GridItem xs={12} sm={6} md={3} style={{ margin: "1em 0" }}>
        <Link
          to={{
            pathname: `/admin/listings/view/${id}`, //path => /admin/listings/:id
            state: {
              info
            }
          }}
        >
          <Card className={card}>

            <CardActionArea>
              <CardMedia
                component="img"
                className={media}
                height="100%"
                width="100%"
                image={
                  imagePath ||
                  "https://firebasestorage.googleapis.com/v0/b/homebase-3336e.appspot.com/o/placeholderImg.jpg?alt=media&token=13b6c9e5-7fdf-4955-a46f-a55d34f6f4b6"
                }
                title={address}
                style={media}
              />
              <CardContent>

                <Typography gutterBottom variant="h5" component="h2">
                  {address}
                </Typography>
                <GridContainer justify="flex-start" alignItems="center">
                  <Typography component="p" style={{ margin: "1em" }}>
                    <DescriptionIcon color="primary" />
                    {description}
                  </Typography>
                </GridContainer>

                <GridContainer justify="flex-start" alignItems="center">
                  <Typography component="p" style={{ margin: "1em" }}>
                    <MoneyIcon color="primary" />
                    {price}
                  </Typography>
                </GridContainer>

                <GridContainer justify="flex-start" alignItems="center">
                  <Typography component="p" style={{ margin: "1em" }}>
                    <MeetingRoomIcon color="primary" />
                    {rooms}
                  </Typography>
                </GridContainer>
                <Typography component="p">{description}</Typography>

                <GridContainer justify="space-between" alignItems="center">
                  <Button variant="contained" color="primary" className={classes.button}>
                    Edit
              </Button>
                  <Button variant="contained" color="secondary" className={classes.button}>
                    Delete
              </Button>
                </GridContainer>
              </CardContent>
            </CardActionArea>

          </Card>

        </Link>

      </GridItem>
    );
  }
}

export default withStyles(styles)(PropertyItem)

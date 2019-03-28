import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MediaCard from '@material-ui/core/CardMedia';

class PropertyItem extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card className={this.props.classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    className={this.props.classes.media}
                                    height="140"
                                    image={require(`../assets/${this.props.imagePath}`)}
                                    title={this.props.address}
                                    style={this.props.styles.media}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {this.props.address}
                        </Typography>
                                    <Typography component="p">
                                        {this.props.description}
                        </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                        </Button>
                                <Button size="small" color="primary">
                                    Learn More
                        </Button>
                            </CardActions>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export { PropertyItem as default }
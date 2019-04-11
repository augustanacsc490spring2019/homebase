import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

class PropertyItem extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <GridItem xs={12} sm={6} md={3}>
                <Card className={this.props.classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={this.props.classes.media}
                            height="100%"
                            width="100%"
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
                </Card>
            </GridItem>
        )
    }
}

export { PropertyItem as default }
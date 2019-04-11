import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
      };
}
const styles = theme => ({
    paper: {
      position: "absolute",
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: "none"
    }
  });

class ModalInfo extends Component {
  render() {
      const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <img src={require('../assets/img/homes/home1.jpg')} alt="fido" width="400" />
            <Typography variant="h6" id="modal-title">
              PUP
            </Typography>
            <Typography variant="subtitle1" id="age">
              2
            </Typography>
            <Typography variant="body1" id="simple-modal-description">
              Dis a real gud pup.
            </Typography>
            <Typography variant="subtitle2" id="phone">
              (309)867-5309
            </Typography>
            <Button onClick={this.props.handleClose}>Close</Button>
            <ModalInfoWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

const ModalInfoWrapped = withStyles(styles)(ModalInfo)

export default ModalInfoWrapped

import React, { Component } from "react";

// @Material component
import { SnackbarContent, IconButton, Snackbar } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";
import CloseIcon from '@material-ui/icons/Close';

// @npm component
import clsx from 'clsx';
import PropTypes from 'prop-types';

// @Custom component
import CustomClasses from "./../styles/Alert"

class AlertMessage extends Component {

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clicaway')
            return;
        this.props.handleClose();
    }

    render = () => {
        const { classes } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={this.props.open}
                autoHideDuration={3000}
                onClose={this.props.handleClose}
            >
                <SnackbarContent
                    className={clsx(classes[this.props.variant])}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            {this.props.message}
                        </span>
                    }
                    action={[
                        <IconButton key="close" color='inherit' onClick={this.handleCloseSnackbar}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    ]}
                />
            </Snackbar>
        );
    }
}

AlertMessage.propTypes = {
    variant: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export default withStyles(CustomClasses)(AlertMessage);
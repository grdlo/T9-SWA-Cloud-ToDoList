import React from 'react';

// @material Component
import { Button, Modal, Card, Typography, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @jss component
import CustomClasses from "./../styles/Modal"

// @npm Component
import { createBrowserHistory } from "history";

const useStyles = makeStyles(theme => (CustomClasses));

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
const LoginModal = props => {
    const classes = useStyles();
    if (props.open === false)
        return (<></>);
    return (
        <Modal
            aria-labelledby="authentification-modal-title"
            aria-describedby="authentification-modal-description"
            className={classes.modal}
            open={props.open}
        >
            <Card className={classes.paper}>
                <CardContent>
                    <Typography>click on Connect for accessing this website</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => props.loginCallback()}>
                        Connection
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
}

export default LoginModal
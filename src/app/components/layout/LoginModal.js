import React, { Component } from 'react';

// @material Component
import { Button, Modal, Card, Typography, CardActions, CardContent, TextField, Container, Link, FormControl } from '@material-ui/core';

// @jss component
import CustomClasses from "./../styles/Modal"

// @npm Component
import { withStyles } from '@material-ui/styles';

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            error: {
                login: false,
                password: false
            }
        }
    }

    handleConnection = () => {
        this.props.loginCallback()
    }

    render = () => {
        const { classes } = this.props;
        if (this.props.open === false)
            return (<></>);
        return (
            <Modal
                aria-labelledby="authentification-modal-title"
                aria-describedby="authentification-modal-description"
                className={classes.modal}
                open={this.props.open}
            >
                <Card className={classes.paper}>
                    <CardContent>
                        <Typography variant='h6'>Authentification </Typography>
                        <Typography>Please enter your credential for accessing this service </Typography>
                        <FormControl fullWidth={true} margin='dense'>
                            <TextField id="filled-basic" label="Username" variant="outlined"
                                error={this.state.error.login} value={this.state.login} />
                        </FormControl>
                        <FormControl fullWidth={true} margin='dense'>
                            <TextField id="filled-basic" label="Password" type="password" variant="outlined"
                                error={this.state.error.password} value={this.state.password} />
                        </FormControl>
                        <FormControl margin='normal'>
                            <Button variant='contained' color="primary" onClick={() => this.handleConnection()}>
                                connexion
                            </Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Modal>
        );
    }
}

export default withStyles(CustomClasses)(LoginModal);
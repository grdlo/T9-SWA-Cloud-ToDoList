import React, { Component } from 'react';

// @material Component
import { Button, Modal, Card, Typography, CardContent, TextField, FormControl } from '@material-ui/core';

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
            username: '',
            password: ''
        }
    }

    handleConnection = () => {
        this.props.loginCallback(this.state.username, this.state.password);
    }

    handleUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
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
                        <form>
                            <Typography variant='h6'>Authentification </Typography>
                            <Typography>Please enter your credential for accessing this service </Typography>
                            <FormControl fullWidth={true} margin='dense'>
                                <TextField id="loginUsername" label="Username" variant="outlined"
                                    error={this.props.error} value={this.state.username}
                                    onChange={this.handleUsername} autoComplete='on' />
                            </FormControl>
                            <FormControl fullWidth={true} margin='dense'>
                                <TextField id="loginPassword" label="Password" type="password" variant="outlined"
                                    error={this.props.error} value={this.state.password}
                                    onChange={this.handlePassword} autoComplete='on' />
                            </FormControl>
                            <FormControl margin='normal' className={classes.submitControl}>
                                <Button variant='contained' color="primary" onClick={this.handleConnection}>
                                    Connexion
                            </Button>
                                <Button color="primary" onClick={this.props.handleSwitchModal}>
                                    New account
                            </Button>
                            </FormControl>
                        </form>
                    </CardContent>
                </Card>
            </Modal>
        );
    }
}

export default withStyles(CustomClasses)(LoginModal);
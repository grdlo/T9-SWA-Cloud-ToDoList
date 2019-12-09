import React, { Component } from 'react';

// @material component
import { Button, Modal, Card, Typography, CardContent, TextField, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// @npm component
import Axios from 'axios';

// @jss component
import CustomClasses from "./../styles/Modal"
import AlertMessage from './AlertMessage';

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
            snackbar: {
                display: false,
                message: '',
                variant: ''
            }
        }
    }

    handleCloseAlert = () => {
        this.setState({ snackbar: { display: false, message: '' } })
    }

    handleUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleCreation = () => {

        Axios.put('http://localhost:8080/users', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            this.setState({ snackbar: { display: true, variant: 'success', message: 'registration success' } });
            this.props.update();
        }).catch(error => {
            this.setState({ snackbar: { display: true, variant: 'error', message: error.response.data.error } })
        });
    }

    render = () => {
        const { classes } = this.props;
        if (this.props.open === false)
            return (<></>);
        return (
            <>
                <AlertMessage open={this.state.snackbar.display}
                    handleClose={this.handleCloseAlert.bind()}
                    message={this.state.snackbar.message}
                    variant={this.state.snackbar.variant} />
                <Modal
                    className={classes.modal}
                    open={this.props.open}
                >
                    <Card className={classes.paper}>
                        <CardContent>
                            <form>
                                <Typography variant='h6'>New Account </Typography>
                                {
                                    !this.props.adminPanel &&
                                    <>
                                        <Typography>Please register your information </Typography>
                                    </>
                                }
                                <FormControl fullWidth={true} margin='dense'>
                                    <TextField id="registerUsername" label="Username" variant="outlined"
                                        value={this.state.name} onChange={this.handleUsername} autoComplete='off' />
                                </FormControl>
                                <FormControl fullWidth={true} margin='dense'>
                                    <TextField id="registerPassword" label="password" type="password" variant="outlined"
                                        value={this.state.description} onChange={this.handlePassword} autoComplete='off' />
                                </FormControl>
                                <FormControl margin='normal' className={classes.submitControl}>
                                    <Button variant='contained' color="primary" onClick={this.handleCreation}>
                                        Creation
                                    </Button>
                                    <Button color="primary" onClick={this.props.handleSwitchModal}>
                                        {
                                            this.props.adminPanel ? 'cancel' : 'Connexion'
                                        }
                                    </Button>
                                </FormControl>
                            </form>
                        </CardContent>
                    </Card>
                </Modal>
            </>
        );
    }
}

export default withStyles(CustomClasses)(RegisterForm);
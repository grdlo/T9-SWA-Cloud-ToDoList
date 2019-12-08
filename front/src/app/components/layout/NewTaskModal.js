import React, { Component } from 'react';

// @material Component
import { Button, Modal, Card, Typography, CardContent, TextField, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// @jss component
import CustomClasses from "../styles/Modal"

// @npm Component
import Cookies from 'universal-cookie';
import Axios from 'axios';

const cookies = new Cookies();

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
class NewTaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            error: false
        }
    }

    handleCreation = () => {
        if (this.state.title !== '') {
            const accessToken = cookies.get("access-token");
            Axios.request({
                url: 'http://localhost:8080/tasks',
                method: 'put',
                headers: {
                    'access-token': accessToken
                },
                data: {
                    title: this.state.title
                }
            }).then(response => {
                console.log(response);
                this.props.update();
            }).catch(error => {
                this.setState({ error: true })
            })
        } else {
            this.setState({ error: true })
        }
    }

    handleTitle = (event) => {
        this.setState({ title: event.target.value });
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
                            <Typography variant='h6'>New Task </Typography>
                            <FormControl fullWidth={true} margin='dense'>
                                <TextField id="loginUsername" label="taskname" variant="outlined"
                                    value={this.state.title} onChange={this.handleTitle} autoComplete='off' />
                            </FormControl>
                            <FormControl margin='normal' className={classes.submitControl}>
                                <Button variant='contained' color="primary" onClick={this.handleCreation}>
                                    Create
                            </Button>
                                <Button color="primary" onClick={this.props.closeCallback}>
                                    Cancel
                            </Button>
                            </FormControl>
                        </form>
                    </CardContent>
                </Card>
            </Modal>
        );
    }
}

export default withStyles(CustomClasses)(NewTaskModal);
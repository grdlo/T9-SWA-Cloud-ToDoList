import React, { Component } from 'react';

// @Material component
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/AddRounded'

// @Jss component
import PageStyle from '../components/styles/Page';

// @Custom component
import VerticalList from '../components/layout/VerticalList';
import NewTaskModal from '../components/layout/NewTaskModal';

// @npm component
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode'
import Axios from 'axios';

const cookies = new Cookies();

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            createModal: false
        }
    }

    /**
     * Call to databse
     * it's will get all the task from the userid saved in the jwt saved in cookies
     */
    loadUserTask = () => {
        const accessToken = cookies.get("access-token");
        const data = jwt(accessToken);
        Axios.get('http://localhost:8080/users/' + data.id + '/tasks', {
            headers: {
                'access-token': accessToken
            }
        }).then(response => {
            this.setState({ tasks: response.data.tasks });
        }).catch(error => {
            console.log(error.response);
        })
    }

    componentDidMount = () => {
        this.loadUserTask();
    }

    handleModalSwitch = () => {
        this.setState({ createModal: !this.state.createModal });
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div>
                <Container className={classes.page}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography className={classes.title} variant="h5">
                                Tasks
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="small" color="primary" onClick={this.handleModalSwitch}>
                                <AddIcon fontSize="small" /><Typography variant='caption'>new task</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <VerticalList list={this.state.tasks} update={this.loadUserTask.bind(this)}/>
                </Container>
                <NewTaskModal open={this.state.createModal} closeCallback={this.handleModalSwitch.bind(this)} update={this.loadUserTask.bind(this)} />
            </div >
        );
    }
}

export default withStyles(PageStyle)(HomePage);
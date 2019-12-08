import React, { Component } from 'react';

// @Material component
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/AddRounded'
import FilterIcon from '@material-ui/icons/FilterListRounded';
import ViewChange from '@material-ui/icons/ViewCarouselRounded';

// @Jss component
import PageStyle from '../components/styles/Page';

// @Custom component
import VerticalTaskList from '../components/layout/VerticalTaskList';
import NewTaskModal from '../components/layout/NewTaskModal';

// @npm component
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode'
import Axios from 'axios';
import VerticalUserList from '../components/layout/VerticalUserList';
import RegisterForm from '../components/layout/RegisterForm';

const cookies = new Cookies();

class HomePage extends Component {

    constructor(props) {
        super(props);
        const accessToken = cookies.get("access-token");
        const data = jwt(accessToken);
        this.state = {
            tasks: [],
            users: [],
            createModal: false,
            createUser: false,
            filter: 'none',
            userId: data.id,
            taskView: true
        }
    }

    /**
     * Call on API
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
            this.setState({ tasks: response.data.tasks, taskView: true, userId: data.id });
        }).catch(error => {
            console.log(error.response);
        })
    }

    /**
     * Call on API
     * it's will get all the users in the database
     */
    loadUserProfile = () => {
        const accessToken = cookies.get("access-token");
        const data = jwt(accessToken);
        if (data.role === 'SWA') {
            Axios.get('http://localhost:8080/users/', {
                headers: {
                    'access-token': accessToken
                }
            }).then(response => {
                this.setState({ users: response.data.users });
            }).catch(error => {
                console.log(error.response);
            })
        }
    }

    /**
     * Function executed on the mount of the component
     */
    componentDidMount = () => {
        const accessToken = cookies.get("access-token");
        const data = jwt(accessToken);
        this.loadUserTask(data.id);
        this.loadUserProfile();
    }

    /**
     * Switch on open/close the modal of the CreateModal
     */
    handleModalSwitch = () => {
        this.setState({ createModal: !this.state.createModal });
    }

    handleModalSwitchCreateUser = () => {
        this.setState({ createUser: !this.state.createUser });
    }

    /**
     * Set the filter for the task in list
     */
    handleFilterSwitch = () => {
        if (this.state.filter === 'none')
            this.setState({ filter: 'undone' })
        else if (this.state.filter === 'undone')
            this.setState({ filter: 'done' })
        else
            this.setState({ filter: 'none' })
    }

    handleViewSwitch = () => {
        this.setState({ taskView: !this.state.taskView });
    }

    handleTaskView = (userId) => {
        const accessToken = cookies.get("access-token");
        Axios.get('http://localhost:8080/users/' + userId + '/tasks', {
            headers: {
                'access-token': accessToken
            }
        }).then(response => {
            this.setState({ tasks: response.data.tasks, taskView: true, userId: userId });
        }).catch(error => {
            console.log(error.response);
        })
    }

    render = () => {
        const accessToken = cookies.get("access-token");
        const data = jwt(accessToken);
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
                        <Grid item className={classes.spacing}>
                            {
                                (data.role === "SWA" && this.state.taskView === true) &&
                                <Button variant="contained" size="small" color={data.role === 'SWA' ? 'secondary' : 'primary'} onClick={this.handleViewSwitch}>
                                    <ViewChange fontSize="small" /><Typography variant='caption'>User List</Typography>
                                </Button>
                            }
                            {
                                (data.id !== this.state.userId || this.state.taskView === false) &&
                                <Button variant="contained" size="small" color={data.role === 'SWA' ? 'secondary' : 'primary'} onClick={() => this.handleTaskView(data.id)}>
                                    <ViewChange fontSize="small" /><Typography variant='caption'>my task</Typography>
                                </Button>
                            }
                        </Grid>
                        <Grid item className={classes.spacing}>
                            {
                                (this.state.taskView) &&
                                <>

                                    <Button variant="contained" size="small" color={data.role === 'SWA' ? 'secondary' : 'primary'} onClick={this.handleFilterSwitch}>
                                        <FilterIcon fontSize="small" /><Typography variant='caption'>filter</Typography>
                                    </Button>
                                    <Button variant="contained" size="small" color={data.role === 'SWA' ? 'secondary' : 'primary'} onClick={this.handleModalSwitch}>
                                        <AddIcon fontSize="small" /><Typography variant='caption'>new task</Typography>
                                    </Button>
                                </>
                            }
                            {
                                (!this.state.taskView) &&
                                <Button variant="contained" size="small" color={data.role === 'SWA' ? 'secondary' : 'primary'} onClick={this.handleModalSwitchCreateUser}>
                                    <AddIcon fontSize="small" /><Typography variant='caption'>new user</Typography>
                                </Button>
                            }
                        </Grid>
                    </Grid>

                    {
                        this.state.taskView === true ?
                            <VerticalTaskList list={this.state.tasks} update={this.loadUserTask.bind(this)} filter={this.state.filter} />
                            :
                            <VerticalUserList list={this.state.users} update={this.loadUserProfile.bind(this)} viewSwitch={this.handleTaskView.bind(this)} />
                    }
                </Container>
                <NewTaskModal open={this.state.createModal} closeCallback={this.handleModalSwitch.bind(this)} update={this.loadUserTask.bind(this)} />
                <RegisterForm open={this.state.createUser} handleSwitchModal={this.handleModalSwitchCreateUser.bind()} adminPanel={true} />
            </div >
        );
    }
}

export default withStyles(PageStyle)(HomePage);
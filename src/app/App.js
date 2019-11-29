import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// @material component
import { Button, Modal, Card, Typography, CardActions, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// @npm component
import Cookies from 'universal-cookie';

// @page holder component
import HomePage from './pages/HomePage'

// @custom component
import Header from './components/layout/Header';

// @jss component
import CustomClasses from "./components/styles/Modal"

const cookies = new Cookies();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = this.isAuthenticate();
    }

    /**
     * Check authentification state 
     */
    isAuthenticate = () => {
        const accessToken = cookies.get("access-token");
        /**
         * CREATE REQUEST ON SERVER FOR CHECKING ACCESS TOKEN
         */
        if (accessToken !== undefined && accessToken !== '')
            return ({ authenticate: true, openAuthModal: false })
        return ({ authenticate: false, openAuthModal: true });
    }

    handleConnection = () => {
        /**
         * CREATE ON SERVER FOR GETTING ACCES TOKEN
         */
        cookies.set("access-token", "--token--", { path: "/" });
        this.setState({ authenticate: true, openAuthModal: false });
    }

    handleLogout = () => {
        console.log("Logout handled");
        cookies.remove("access-token", { path: "/" });
        this.setState({ authenticate: false, openAuthModal: true });
    }

    /**
     * PrivateRoute creator for blocking access of user not unauthenticate
     */
    PrivateRoute = ({ children, rest }) => {
        return (
            <Route
                {...rest}
                render={
                    ({ location }) => {
                        if (this.state.authenticate === true)
                            return (children);
                        return (<></>);
                    }
                }
            />
        );
    }

    /**
     * Called each time the Component is load
     */
    render = () => {
        console.log(this.state);
        const { classes } = this.props;
        return (
            <Router>
                <Header logoutCallback={this.handleLogout.bind(this)} />
                <Switch>
                    <this.PrivateRoute path="/" component={HomePage} exact />
                </Switch>
                <Modal
                    aria-labelledby="authentification-modal-title"
                    aria-describedby="authentification-modal-description"
                    className={classes.modal}
                    open={this.state.openAuthModal}
                >
                    <Card className={classes.paper}>
                        <CardContent>
                            <Typography>click on Connect for accessing this website</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => this.handleConnection()}>
                                Connect
                            </Button>
                        </CardActions>
                    </Card>
                </Modal>
            </Router>
        );
    }
}

export default withStyles(CustomClasses)(App);
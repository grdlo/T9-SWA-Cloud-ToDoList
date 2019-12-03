import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// @npm component
import Cookies from 'universal-cookie';

// @page holder component
import HomePage from './pages/HomePage'

// @custom component
import Header from './components/layout/Header';
import LoginModal from './components/layout/LoginModal';
import Private from './components/utils/Private';

const cookies = new Cookies();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = this.isAuthenticate();
    }

    /**
     * Load authentification on loading page
     */
    isAuthenticate = () => {
        const accessToken = cookies.get("access-token");
        if (accessToken !== undefined && accessToken !== '')
            return ({ authenticate: true, openAuthModal: false })
        return ({ authenticate: false, openAuthModal: true });
    }

    /**
     * Allow a button to open a modal which will request an authentification from the user
     */
    handleConnection = () => {
        // if user already connected, do nothing
        if (this.state.authenticate)
            return;
        /**
         * CREATE SERVER REQUEST FOR GETTING ACCES TOKEN
         */

        // Creating a cookie with the authentification token and refresh state
        cookies.set("access-token", "--token--", { path: "/" });
        this.setState({ authenticate: true, openAuthModal: false });
    }

    /**
     * Logout method, allow to a button to disconnect a user
     */
    handleLogout = () => {
        // if user already disconnected, do nothing
        if (!this.state.authenticate)
            return;

        // Removing the cookie with the authentification token and refresh state
        cookies.remove("access-token", { path: "/" });
        this.setState({ authenticate: false, openAuthModal: true });
    }

    /**
     * Called each time the Component is load
     */
    render = () => {
        console.log(this.state);
        return (
            <Router>
                <Header logoutCallback={this.handleLogout.bind(this)} />
                <Switch>
                    <Private show={this.state.authenticate}>
                    <Route path="/" component={HomePage} exact />
                    </Private>
                </Switch>
                <LoginModal loginCallback={this.handleConnection.bind(this)}
                    open={this.state.openAuthModal} />
            </Router>
        );
    }
}

export default App;
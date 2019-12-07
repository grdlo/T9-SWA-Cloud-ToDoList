import React, { Component } from 'react';

// @npm component
import Cookies from 'universal-cookie';
import Axios from 'axios';

// @page holder component
import HomePage from './pages/HomePage'

// @custom component
import Header from './components/layout/Header';
import LoginModal from './components/layout/LoginModal';
import Private from './components/utils/Private';
import RegisterForm from './components/layout/RegisterForm';

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
            return ({ authenticate: true, openAuthModal: false, openRegisterForm: false, route: '/', error: false })
        return ({ authenticate: false, openAuthModal: true, openRegisterForm: false, route: '/', error: false });
    }

    /**
     * Allow a button to open a modal which will request an authentification from the user
     */
    handleConnection = (username, password) => {
        // if user already connected, do nothing
        if (this.state.authenticate)
            return;
        // authentication for getting a personnel jwt token
        Axios.post('http://localhost:8080/auth/login', { username: username, password: password })
            .then(response => {
                cookies.set("access-token", response.data.token, { path: '/' });
                this.setState({ authenticate: true, openAuthModal: false, openRegisterForm: false, error: false });
            }).catch(error => {
                this.setState({ authenticate: false, openAuthModal: true, openRegisterForm: false, error: true });
            });
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
        this.setState({ authenticate: false, openAuthModal: true, openRegisterForm: false });
    }

    /**
     * Switch between the Connection modal and the Creation Modal
     */
    handleSwitchModal = () => {
        this.setState({ openAuthModal: !this.state.openAuthModal, openRegisterForm: !this.state.openRegisterForm })
    }

    /**
     * Called each time the Component is load
     */
    render = () => {
        return (
            <>
                <Header logoutCallback={this.handleLogout.bind(this)} auth={this.state.authenticate} />
                <LoginModal loginCallback={this.handleConnection.bind(this)} handleSwitchModal={this.handleSwitchModal.bind(this)}
                    open={this.state.openAuthModal} error={this.state.error} />
                <RegisterForm handleSwitchModal={this.handleSwitchModal.bind(this)}
                    open={this.state.openRegisterForm} />
                <Private show={this.state.authenticate}>
                    <HomePage />
                </Private>
            </>
        );
    }
}

export default App;
import React, { Component } from 'react';

// @npm Component
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie'

class LogoutPage extends Component {
    render = () => {
        const cookies = new Cookies();
        cookies.remove("auth");
        console.log('User disconnected');
        return (
            <Redirect to="/" />
        );
    }
}

export default LogoutPage;

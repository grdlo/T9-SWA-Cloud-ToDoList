import React, { Component } from 'react';

// @npm Component
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode';

// @Custom Component
import Header from '../components/layout/Header';

class HomePage extends Component {

    /**
     * Called each time the Component is load
    */
    render = () => {
        const cookies = new Cookies();
        let decoded = jwt(cookies.get("auth"));
        return (
            <></>
        );
    }
}

export default HomePage;
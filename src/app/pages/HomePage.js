import React from 'react';

// @npm Component
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode';

// @Custom Component
import Header from '../components/layout/Header';

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
const AuthentificationPage = () => {
    const cookies = new Cookies();
    let decoded = jwt(cookies.get("auth"));
    return (
        <Header />
    );
}

export default AuthentificationPage;

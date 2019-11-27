import React from 'react';

// @npm Component
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie'

// @Custom Component
const AuthentificationPage = () => {
    const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjRlZGQ0MGM4Njc2MmUwZmIxMjAwMDAwMyIsInJvbGUiOiJTV0EifQ.GcDtJAN36WzgWhODkpxEBd-JF04voLVlEbez0sP2clc";
    const cookies = new Cookies();
    cookies.set("auth", jwt);
    
    return (
        <Redirect to="/" />
    );
}

export default AuthentificationPage;

import React from 'react';

// @npm Component
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Cookies from 'universal-cookie'

// @Page holder Component
import AuthentificationPage from './pages/AuthentificationPage';
import LogoutPage from './pages/LogoutPage';
import HomePage from './pages/HomePage'

const pageWithoutAuth = [ '/login', '/logout', '/register' ];
const history = createBrowserHistory();
const cookies = new Cookies();

/**
 * Called in each page load
 * if the user isn't connected, he will be redirected to the /login page
 */
const authRedirection = () => {
    const pathname = history.location.pathname;
    if (!pageWithoutAuth.includes(pathname)) {
        const token = cookies.get("auth");
        if (token === undefined)
            return (<Redirect to="/login" />);
    }
}

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
const App = props => {
    return (
        <BrowserRouter>
            {
                /* If no authentification Cookie are available, this function will be called */
                authRedirection()
            }
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={AuthentificationPage} />
            <Route path="/logout" exact component={LogoutPage} />
        </BrowserRouter>
    );
}

export default App;
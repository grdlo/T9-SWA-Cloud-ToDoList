import React from 'react';

// @material Component
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @npm Component
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
const Header = props => {
    const classes = useStyles();

    let admin = false;
    if (props.auth === true) {
        const cookies = new Cookies();
        const data = jwt(cookies.get("access-token"));
        admin = (data.role === "SWA");
    }

    return (
        <div className={classes.root}>
            <AppBar color={(admin) ? 'secondary' : 'primary'} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {admin ? 'Administrator Pannel' : 'Application'}
                    </Typography>
                    {
                        props.auth &&
                        <Button color="inherit" onClick={() => { props.logoutCallback(); }}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </div >
    );
}

export default Header
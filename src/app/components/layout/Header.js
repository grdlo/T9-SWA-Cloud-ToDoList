import React from 'react';
import { Redirect } from 'react-router-dom';

// @material Component
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @materiel icon
import AccountCircle from '@material-ui/icons/AccountCircle';

// @npm Component
import { createBrowserHistory } from "history";
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

const history = createBrowserHistory();

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
const Header = props => {
    const classes = useStyles();
    const cookies = new Cookies();
    let decoded = jwt(cookies.get("auth"));
    const admin = (decoded.role === "SWA");

    const [redirection, setRedirection] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (redirection !== '' && history.location.pathname !== redirection) {
        return (<Redirect to={redirection} />);
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Application
                    </Typography>
                    {admin && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => setRedirection('/')}>Home</MenuItem>
                                <MenuItem onClick={() => setRedirection('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={() => setRedirection('/logout')}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header
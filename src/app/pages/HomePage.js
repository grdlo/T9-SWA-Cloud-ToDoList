import React from 'react';

// @Material component
import { Container, Typography } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

// @Custom component
import Header from '../components/layout/Header'
import VerticalList from '../components/layout/VerticalList';

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */

const list = [
    { _id: "9239", name: "Lorem ipsum", icon: "delete", color: orange[500], checked: true }
];

const HomePage = props => {

    console.log(props.auth);
    return (
        <div>
            <Container>
                <Typography>
                    This is the HomePage
                </Typography>
                { /* <VerticalList list={list} /> */}
            </Container>
        </div>
    );
}

export default HomePage;
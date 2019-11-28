import React from 'react';

import { orange } from '@material-ui/core/colors';

import Header from '../components/layout/Header'
import VerticalList from '../components/layout/VerticalList';

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */

const list = [
    { _id: "9239", name: "Lorem ipsum", icon: "delete", color: orange[500], checked: true}
];
 
const HomePage = props => {
    return (
        <>
            <Header />
            <VerticalList list={list} />
        </>
    );
}

export default HomePage;
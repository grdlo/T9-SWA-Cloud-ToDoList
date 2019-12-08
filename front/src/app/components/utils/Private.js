import React from 'react';

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */
const Private = props => {
    if (props.show === true)
        return (props.children);
    return (<></>);
}

export default Private
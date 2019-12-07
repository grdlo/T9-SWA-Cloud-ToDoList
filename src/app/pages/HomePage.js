import React from 'react';

// @Material component
import { Container, Typography, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddRounded'
import { orange } from '@material-ui/core/colors';

// @Jss component
import PageStyle from '../components/styles/Page';

// @Custom component
import VerticalList from '../components/layout/VerticalList';
import { makeStyles } from '@material-ui/styles';

/**
 * Called each time the Component is load
 * @param {*} props all parameters of the component
 */

const list = [
    { _id: "9239", name: "Lorem ipsum", icon: "delete", color: orange[500], checked: true }
];

const HomePage = props => {
    const classes = (makeStyles(PageStyle))();
    return (
        <div>
            <Container className={classes.page}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography className={classes.title} variant="h5">
                            Tasks
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="small" color="primary">
                            <AddIcon fontSize="small" /><Typography variant='caption'>new task</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <VerticalList list={list} />
            </Container>
        </div>
    );
}

export default HomePage;
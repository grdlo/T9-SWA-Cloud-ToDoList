import React, { Component } from "react";

// @Material component
import { Paper, Grid, Typography, Avatar, IconButton, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/CreateRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ViewIcon from '@material-ui/icons/VisibilityRounded';

// @npm Component
import Cookies from 'universal-cookie';
import Axios from 'axios';

// @Custom style
import CustomClasses from "./../styles/TaskItem"

const cookies = new Cookies();

class UserItem extends Component {

    handleRemove = () => {
        const accessToken = cookies.get("access-token");
        Axios.request({
            url: 'http://localhost:8080/users/' + this.props.userId,
            method: 'delete',
            headers: {
                'access-token': accessToken
            }
        }).then(response => {
            this.props.update();
        }).catch(error => {
            console.log(error.response);
        })
    }

    render = () => {
        const { classes } = this.props;
        return (
            <Paper className={classes.taskItem}>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs>
                        <Box component="div" display="flex"
                            alignItems="center">
                            <Avatar className={classes.taskIcon}>
                                <AccountCircle />
                            </Avatar>
                            <Typography className={classes.title}>
                                {this.props.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="viewTask" className={classes.margin}
                            onClick={() => this.props.viewSwitch(this.props.userId)} >
                            <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" className={classes.margin}
                            onClick={this.handleRemove} >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(CustomClasses)(UserItem);
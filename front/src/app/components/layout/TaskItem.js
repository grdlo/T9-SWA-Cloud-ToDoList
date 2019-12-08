import React, { Component } from "react";

// @Material component
import { Paper, Grid, Typography, Checkbox, Avatar, IconButton, Box } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";
import AssignementIcon from "@material-ui/icons/AssignmentRounded"
import DeleteIcon from "@material-ui/icons/Delete"

// @npm Component
import Cookies from 'universal-cookie';
import Axios from 'axios';

// @Custom style
import CustomClasses from "./../styles/TaskItem"

const cookies = new Cookies();

const StyledCheckBox = () => ({
    root: { ...CustomClasses.taskCheckBox },
    checked: { ...CustomClasses['&$checked'] }
});

const GreenCheckBox = withStyles(StyledCheckBox)(Checkbox);

const LiveStyle = {
    ...CustomClasses,
    taskIcon: props => ({
        backgroundColor: props.color
    })
}

class TaskItem extends Component {

    handleChange = () => {
        const accessToken = cookies.get("access-token");
        Axios.request({
            url: 'http://localhost:8080/tasks/' + this.props.id,
            method: 'patch',
            headers: {
                'access-token': accessToken
            },
            data: {
                task: {
                    done: !this.props.done
                }
            }
        }).then(response => {
            this.props.update();
        }).catch(error => {
            console.log(error.response);
        })
    }

    handleRemove = () => {
        const accessToken = cookies.get("access-token");
        Axios.request({
            url: 'http://localhost:8080/tasks/' + this.props.id,
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
                            <Avatar variant="rounded" className={classes.taskIcon}>
                                <AssignementIcon />
                            </Avatar>
                            <Typography className={classes.title}>
                                {this.props.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="delete" className={classes.margin}
                            onClick={this.handleRemove} >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <GreenCheckBox
                            checked={this.props.done}
                            onChange={this.handleChange}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(LiveStyle)(TaskItem);
import React, { Component } from "react";

// @Material component
import { Paper, Grid, Typography, Checkbox, Avatar, Icon, IconButton } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";
import AssignementIcon from "@material-ui/icons/AssignmentIndRounded"
import CreateIcon from "@material-ui/icons/Create"

// @Custom style
import CustomClasses from "./../styles/TaskItem"

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

    constructor(props) {
        super(props);
        this.state = {
            taskId: this.props.id,
            checked: this.props.isCheck
        }
    }

    handleChange = () => event => {
        this.setState({ ...this.state, checked: event.target.checked })
    }

    render = () => {
        const { classes } = this.props;
        return (
            <Paper className={classes.taskItem}>
                <Grid container wrap="nowrap" alignItems="center" justify="space-between" direction="row" spacing={2}>
                    <Grid item xs={1}>
                        <Avatar variant="rounded" className={classes.taskIcon}>
                            <AssignementIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs container>
                        <Typography>
                            {this.props.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton aria-label="delete" className={classes.margin}>
                            <CreateIcon fontSize="small" />
                        </IconButton>
                        <GreenCheckBox
                            checked={this.state.isCheck}
                            onChange={this.handleChange()}
                            value='isCheck'
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(LiveStyle)(TaskItem);
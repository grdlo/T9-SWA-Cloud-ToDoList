import React, { Component } from "react";

// @Material component
import { Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";
import { orange } from '@material-ui/core/colors';

// @Custom Style
import TaskItem from "./TaskItem";
import CustomClasses from "../styles/VerticalList"

class VerticalList extends Component {

    render = () => {
        const { classes } = this.props
        return (
            <>
                <Grid
                    className={classes.VerticalList}
                >
                    {
                        this.props.list.map((item) => {
                            if (this.props.filter === 'none'
                                || (this.props.filter === 'done' && item.done === true)
                                || (this.props.filter === 'undone' && item.done === false))
                                return (
                                    <Grid item key={item._id}>
                                        <TaskItem
                                            id={item._id}
                                            key={item._id}
                                            name={item.title}
                                            icon={item.icon}
                                            color={orange[400]}
                                            done={item.done}
                                            update={this.props.update}
                                        />
                                    </Grid>
                                );
                        })
                    }
                </Grid>
            </>
        );
    }
}

export default withStyles(CustomClasses)(VerticalList);
import React, { Component } from "react";

// @Material component
import { Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";

// @Custom Style
import TaskItem from "./TaskItem";
import CustomClasses from "./../styles/VerticalList"

class VerticalList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterActive: undefined
        }
    }

    handleFilterOptions = option => {
        this.setState({ filterActive: option });
    }

    render = () => {
        const { classes } = this.props
        return (
            <>
            <Grid
                className={classes.VerticalList}
            >
                {
                    this.props.list.map((item) => {
                        return (
                            <Grid item key={item._id}>
                                <TaskItem
                                    id={item._id}
                                    key={item._id}
                                    name={item.name}
                                    icon={item.icon}
                                    color={item.color}
                                    isCheck={item.checked}
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
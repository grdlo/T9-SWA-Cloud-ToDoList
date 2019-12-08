import React, { Component } from "react";

// @Material component
import { Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";

// @Custom Style
import CustomClasses from "../styles/VerticalList"
import UserItem from "./UserItem";

class VerticalUserList extends Component {

    render = () => {
        const { classes } = this.props
        return (
            <>
                <Grid
                    className={classes.VerticalUserList}
                >
                    {
                        this.props.list.map((item) => {
                            return (
                                <Grid item key={item._id}>
                                    <UserItem
                                        id={item._id}
                                        key={item._id}
                                        name={item.username}
                                        userId={item._id}
                                        update={this.props.update}
                                        viewSwitch={this.props.viewSwitch}
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

export default withStyles(CustomClasses)(VerticalUserList);
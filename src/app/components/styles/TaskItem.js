import { green } from "@material-ui/core/colors"

export default {
    taskItem: {
        padding: 8,
        margin: 12
    },
    taskCheckBox: {
        '&$checked': {
            color: green[600]
        }
    },
    title: {
        marginLeft: 16
    }
}
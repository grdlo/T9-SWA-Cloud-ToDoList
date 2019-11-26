import { green } from "@material-ui/core/colors"

export default {
    taskItem: {
        padding: 8,
        margin: 8
    },
    taskCheckBox: {
        '&$checked': {
            color: green[600]
        }
    }
}
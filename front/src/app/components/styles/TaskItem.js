import { green } from "@material-ui/core/colors"

export default {
    taskItem: {
        padding: 8,
        marginTop: 16,
        marginBottom: 16,
        marginRight: 8,
        marginLeft: 8
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
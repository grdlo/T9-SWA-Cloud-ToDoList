import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme();

export default {
    error: {
        backgroundColor: theme.palette.error.dark
    },
    success: {
        backgroundColor: green[600]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.2,
        paddingRight: 16
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    snackbar: {
        margin: 8
    }
};
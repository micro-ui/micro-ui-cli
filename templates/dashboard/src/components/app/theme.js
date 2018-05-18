import blue from 'material-ui/colors/blue'
import red from 'material-ui/colors/red'

export default {
    palette: {
        primary: {
            light: blue[500],
            main: blue[800],
            dark: blue[900],
            contrastText: '#fff'
        },
        secondary: {
            light: red[500],
            main: red[700],
            dark: red[900],
            contrastText: '#fff'
        }
    },
    status: {
        danger: 'red',
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
    },
}

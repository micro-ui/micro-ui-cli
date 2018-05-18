import { h, Component } from 'preact'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import { Provider } from 'mobx-preact'
import { enableLogging as enableMobXLogging } from 'mobx-logger'
import {
    userStore,
    notificationsStore,
} from 'src/state/'
import { suppressPropTypesWarnings } from 'src/etc/utils'
import Routes from './routes'
import theme from './theme'

if (process.env.PREACT_APP_DEBUG === 'true') {
    enableMobXLogging()
}

suppressPropTypesWarnings()

export default class App extends Component {

    render() {
        let applyTheme = createMuiTheme(theme)

        return (
            <MuiThemeProvider theme={applyTheme}>
                <Provider
                    userStore={userStore}
                    notificationsStore={notificationsStore}
                >
                    <Routes />
                </Provider>
            </MuiThemeProvider>
        )
    }

}

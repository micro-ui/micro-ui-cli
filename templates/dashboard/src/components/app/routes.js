import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import { connect } from 'mobx-preact'
import Header from 'src/components/header/'
import Sidebar from 'src/components/sidebar/'
import Redirect from 'src/components/redirect/'
import Notifications from 'src/components/notifications/'
import Dashboard from 'async!src/routes/dashboard/'
import Login from 'async!src/routes/login/'

@connect(['userStore'])
class AuthenticatedRoute extends Component {

    componentWillMount() {
        this.accessPermitted = this.props.userStore.isAuthenticated

        if (!this.accessPermitted) this.props.userStore.setInitialPage(typeof window !== 'undefined' ? window.location.pathname : '')
    }

    render({ route:Route, ...props }) {
        return (
            this.accessPermitted
            ?
                <div id="app" class="app-container fixed-drawer">
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                    <Sidebar currentUrl={props.currentUrl} />

                    <div class="app-main-container">
                        <div class="app-header">
                            <Header />
                        </div>

                        <main class="app-main-content-wrapper">
                            <div class="app-main-content">
                                <Route {...props} />
                                <Notifications />
                            </div>
                        </main>
                    </div>
                </div>
            :
                <Redirect to="/login" />
        )
    }

}

export default class Routes extends Component {

    constructor() {
        super()

        this.state = {
            currentUrl: null
        }
    }

    handleRoute(e) {
        this.setState({
            currentUrl: e.url
        })
    }

    render() {
        return (
            <Router onChange={this.handleRoute.bind(this)}>
                <Login default />
                <AuthenticatedRoute path="/dashboard" route={Dashboard} currentUrl={this.state.currentUrl} />
            </Router>
        )
    }

}

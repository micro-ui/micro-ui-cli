import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'mobx-preact'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'

@connect(['userStore'])
export default class Header extends Component {

    async handleLogout() {
        try {
            await this.props.userStore.logout()
        } catch(err) {
            // empty catch, we'll go to login page regardless as the session cookie is gone
        }

        route('/login', true)
    }

    render() {
        return (
            <AppBar className="app-main-header">
                <Toolbar className="app-toolbar" disableGutters={false}>
                    <a href="/" class="app-logo">
                        <span>
                            {{projectTitle}}
                        </span>
                    </a>

                    <ul className="header-notifications list-inline ml-auto">
                        <li className="list-inline-item">
                            <a href="javascript:;" onClick={this.handleLogout.bind(this)}>
                                <i class="zmdi zmdi-power mr-2"></i>
                                <span>Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </Toolbar>
            </AppBar>
        )
    }

}

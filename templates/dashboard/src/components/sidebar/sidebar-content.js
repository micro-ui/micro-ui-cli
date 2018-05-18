import { h, Component } from 'preact'
import NavigationLink from './navigation-link'

export default class SidebarContent extends Component {

    render() {
        return (
            <ul class="nav-menu">
                <li class="nav-header">
                    Pages
                </li>

                <li class="menu no-arrow">
                    <NavigationLink
                        to="/patients"
                        icon="accounts"
                        title="Patient Search"
                        isActive={this.props.currentUrl === '/patients' ? true : false}
                    />
                </li>
            </ul>
        )
    }

}

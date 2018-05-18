import { h, Component } from 'preact'
import Drawer from 'material-ui/Drawer'
import UserInfo from './user-info'
import SidebarContent from './sidebar-content'

export default class Sidebar extends Component {

    render() {
        const type = 'permanent'
        const open = true

        return (
            <div class='app-sidebar d-none d-xl-flex'>
                <Drawer class='app-sidebar-content'
                        variant={type}
                        open={open}
                        classes={{
                            paper: 'side-nav'
                        }}
                >
                    <UserInfo />
                    <SidebarContent currentUrl={this.props.currentUrl} />
                </Drawer>
            </div>
        )
    }

}

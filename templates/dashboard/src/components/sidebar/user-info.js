import { h, Component } from 'preact'
import { connect } from 'mobx-preact'
import Avatar from 'material-ui/Avatar'

const PROFILE_PICTURE = 'https://media.licdn.com/dms/image/C4D03AQEpacDCM2DyJQ/profile-displayphoto-shrink_800_800/0?e=1526691600&v=alpha&t=6_3t_0f3QRDAoQdD_Q2jlLzOzqFD4p34vplvC7YO4Zk'

@connect(['userStore'])
export default class UserInfo extends Component {

    render({ userStore }) {
        let children = undefined

        return (
            <div class='user-profile d-flex flex-row align-items-center'>
                <div class='user-detail'>
                    <h4 class='user-name'>
                        {userStore.user && userStore.user.displayName}
                    </h4>
                </div>
            </div>
        )
    }

}

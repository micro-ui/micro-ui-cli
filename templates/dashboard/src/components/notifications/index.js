import { h, Component } from 'preact'
import { observe } from 'mobx'
import { connect } from 'mobx-preact'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

@connect(['notificationsStore'])
export default class Notifications extends Component {

    constructor() {
        super()

        this.state = {
            open: false,
            message: null,
            type: 'danger',
        }
    }

    componentWillMount() {
        observe(this.props.notificationsStore, 'notification', change => {
            if (!change.newValue || !change.newValue.text) {
                this.setState({ open: false })
            } else {
                this.setState({
                    message: change.newValue.text,
                    type: change.newValue.type,
                    open: true,
                })

                this.hideNotificationAfterMillis(change.newValue.autoHideDuration)
            }
        })
    }

    hideNotificationAfterMillis(hideAfterMillis) {
        setTimeout(() => this.props.notificationsStore.hideNotification(), hideAfterMillis)
    }

    render({}, { open, message, type }) {
        let contentProps = {
            'aria-describedby': 'message-id',
            'className': `mb-4 bg-${type}`,
        }

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                SnackbarContentProps={contentProps}
                message={<span id="message-id">{message}</span>}
            />
        )
    }

}

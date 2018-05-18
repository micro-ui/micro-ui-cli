import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'mobx-preact'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import { userStore } from 'src/state/'
import Notifications from 'src/components/notifications/'

@connect(['userStore', 'notificationsStore'])
export default class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
        }
    }

    componentWillMount() {
        if (this.props.userStore.isAuthenticated) this.redirectToInitialPage()
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
        this.validateForm()
    }

    handleLogin(e) {
        e.preventDefault()

        this.setState({ submitted: true })

        if (!this.validateForm()) return

        this.props.userStore.login(this.state)
            .then(() => this.redirectToInitialPage())
            .catch(err => this.props.notificationsStore.showNotification(err))
    }

    validateForm() {
        let usernameError = this.state.submitted && !this.state.username ? 'Username is required' : null
        let passwordError = this.state.submitted && !this.state.password ? 'Password is required' : null

        this.setState({ usernameError, passwordError })

        return !usernameError && !passwordError
    }

    redirectToInitialPage() {
        this.props.notificationsStore.hideNotification()
        route(this.props.userStore.initialPage || '/dashboard')
    }

	render({ userStore }, { ...state }) {
        return (
            <div className="app-main">
                <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                    <div className="login-content">
                        <div className="login-header mb-2">
                            <a href="javascript:;" className="app-logo" title="{{projectTitle}}">
                                <img src="/assets/images/logo.png" alt="" style="min-height: 55px;" />
                            </a>
                        </div>

                        <div className="login-form">
                            <form onSubmit={this.handleLogin.bind(this)}>
                                <fieldset>
                                    <TextField
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        onChange={this.handleChange.bind(this)}
                                        defaultValue={state.username}
                                        margin="normal"
                                        className="mt-1"
                                        error={state.usernameError ? true : false}
                                        helperText={state.usernameError}
                                        autoFocus
                                    />

                                    <TextField
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="Password"
                                        fullWidth
                                        onChange={this.handleChange.bind(this)}
                                        defaultValue={state.password}
                                        margin="normal"
                                        className="mt-1"
                                        error={state.passwordError ? true : false}
                                        helperText={state.passwordError}
                                    />

                                    <div className="loading-button mt-4">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="raised"
                                            className="text-white"
                                            disabled={userStore.login.match({
                                                pending: () => true, rejected: () => false, resolved: () => false
                                            })}
                                        >
                                            Sign In
                                        </Button>

                                        {userStore.login.match({
                                            pending: () => <CircularProgress size={24} className="loading-button-spinner" />,
                                        })}
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

                <Notifications />
            </div>
		)
	}

}

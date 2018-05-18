import { h, Component } from 'preact'

export default class NavigationLink extends Component {

	render() {
		return (
            <a
                href={this.props.to}
                class={(this.props.isActive ? ' active' : '')}
                aria-current={(this.props.isActive ? ' active' : '')}
            >
                <i class={'zmdi zmdi-hc-fw zmdi-' + this.props.icon}></i>
                <span class="nav-text">
                    <span>{this.props.title}</span>
                </span>
            </a>
		)
    }

}

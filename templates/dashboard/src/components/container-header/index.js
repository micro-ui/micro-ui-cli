import { h, Component } from 'preact'

export default class ContainerHeader extends Component {

    render({ children }) {
        return (
            <div class='page-heading d-sm-flex justify-content-sm-between align-items-sm-center'>
                <h2 class='title mb-3 mb-sm-0'>
                    {this.props.title}
                </h2>

                <div>
                    {children}
                </div>
            </div>
        )
    }

}

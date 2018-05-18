import { h, Component } from 'preact'
import { Alert as ReactStrapAlert } from 'reactstrap'

export default class Alert extends Component {

    render({ icon, type, text }) {
        if (icon) {
            return (
                <ReactStrapAlert className={`bg-${type} shadow-lg text-white`} style="padding-left: 80px">
                    <span className="icon-addon alert-addon">
                        <i className={`zmdi zmdi-${icon} zmdi-hc-fw zmdi-hc-lg`} />
                    </span>

                    <span className="d-inline-block">
                        {text}
                    </span>
                </ReactStrapAlert>
            )
        } else {
            return (
                <ReactStrapAlert className={`bg-${type} shadow-lg text-white`}>
                    {text}
                </ReactStrapAlert>
            )
        }
	}

}

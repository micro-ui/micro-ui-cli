import { h, Component } from 'preact'

export default class Card extends Component {

    render({ title, children }) {
        return (
            <div className="jr-card">
                {title &&
                    <div className="jr-card-header">
                        <h3 className="card-heading">
                            {title}
                        </h3>
                    </div>
                }

                <div className="jr-card-body">
                    {children}
                </div>
            </div>
        )
    }

}

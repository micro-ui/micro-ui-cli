import { h, Component } from 'preact'

export default class AppModuleHeader extends Component {

	render({ placeholder }) {
		return (
			<div className="module-box-header-inner">
                <div className="search-bar right-side-icon bg-transparent d-none d-sm-block">
                    <div className="form-group">
                        <input className="form-control border-0" type="search" placeholder={placeholder} />
                        <button className="search-icon"><i className="zmdi zmdi-search zmdi-hc-lg"/></button>
                    </div>
                </div>
            </div>
		)
	}

}

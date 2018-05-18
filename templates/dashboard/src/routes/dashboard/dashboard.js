import { h, Component } from 'preact'
import { connect } from 'mobx-preact'
import AppModuleHeader from 'src/components/app-module-header/'
import ContainerHeader from 'src/components/container-header/'
import Pagination from 'src/components/pagination/'

export default class Dashboard extends Component {

	render() {
		return (
			<div class='app-wrapper'>
				<div class='app-module'>
					dashboard
				</div>
			</div>
		)
	}

}

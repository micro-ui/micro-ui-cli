import { h, Component } from 'preact'
import { CircularProgress } from 'material-ui/Progress'
import style from './style.scss'

export default class Loading extends Component {

    render({ text = 'Loading' }) {
        return (
			<div className={style.loading}>
                <CircularProgress className={style.loadingIcon} color="primary" size={30} />
                {text}
            </div>
		)
	}

}

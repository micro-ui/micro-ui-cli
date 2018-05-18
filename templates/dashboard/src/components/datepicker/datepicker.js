import { h, Component } from 'preact'
import { DatePicker as MaterialDatePicker } from 'material-ui-pickers'

export default class DatePicker extends Component {

    state = {
        dirty: false,
    }

    handleChange(date) {
        let target = {
            name: this.props.name,
            value: date
        }

        this.props.onChange({ target })
    }

    handleBlur(e) {
        this.setState({ dirty: true })
    }

    render({ ...props }, { ...state }) {
        let errorProperty = `${props.name}Error`
        let errorMessage = state.dirty ? props.model[errorProperty] : null

        let inputProps = Object.assign({
            onBlur: this.handleBlur.bind(this)
        }, props.inputProps)

        let date = props.model && props.name in props.model ? props.model[props.name] : null

        return (
            <MaterialDatePicker
                { ...props }
                id={props.name}
                format="YYYY-MM-DD"
                onChange={this.handleChange.bind(this)}
                value={date}
                error={state.dirty && errorProperty in props.model}
                helperText={errorMessage}
                inputProps={inputProps}
                clearable={true}
            />
		)
	}

}

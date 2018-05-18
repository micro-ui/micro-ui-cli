import { h, Component } from 'preact'
import TextField from 'material-ui/TextField'

export default class Input extends Component {

    state = {
        dirty: false,
    }

    handleChange(e) {
        this.props.onChange(e)
    }

    handleBlur(e) {
        this.setState({ dirty: true })
    }

    render({ ...props }, { ...state }) {
        let key = props.propertyKey || props.name
        let errorProperty = `${key}Error`
        let errorMessage = state.dirty && errorProperty in props.model ? props.model[errorProperty] : null
        let value = props.model ? props.model[key] : null

        let inputProps = Object.assign({
            onBlur: this.handleBlur.bind(this),
            dataKey: key,
        }, props.inputProps)

        return (
            <TextField
                { ...props }
                id={props.name}
                onChange={this.handleChange.bind(this)}
                value={value}
                error={state.dirty && errorProperty in props.model}
                helperText={errorMessage}
                inputProps={inputProps}
            />
		)
	}

}

import { h, Component } from 'preact'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import { default as MaterialSelect } from 'material-ui/Select'

export default class Select extends Component {

    handleChange(e) {
        this.props.onChange(e)
    }

    render({ ...props }) {
        return (
            <FormControl className={props.className} error={props.error}>
                <InputLabel htmlFor={`${props.name}-input`}>
                    {props.label}
                </InputLabel>

                <MaterialSelect
                    native
                    name={props.name}
                    defaultValue={props.value}
                    value={props.value}
                    onChange={this.handleChange.bind(this)}
                    input={<Input id={`${props.name}-input`}/>}
                >
                    {props.children}
                </MaterialSelect>

                {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
            </FormControl>
        )
    }

}

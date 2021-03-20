import React from "react";
import DefaultTextField from '@material-ui/core/TextField';

export const TextField = (props) => {
    const { label, placeholder, onChange, field = {}, form = {} } = props;
    const { setFieldValue, errors = {}, touched = {} } = form;
    const helperText = errors[field.name]
    const error = helperText && touched[field.name]

    const onFieldChange = (event) => {
        const { target: { value } } = event;

        field.name && setFieldValue && setFieldValue(field.name, value || '');
        onChange && onChange(value);
    }

    return (
        <DefaultTextField
            label={label}
            style={{ margin: '8px 0' }}
            placeholder={placeholder}
            helperText={error ? helperText : ''}
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            error={error}
            onChange={onFieldChange}
            value={field.value}
        />
    )
}

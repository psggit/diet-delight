import React from "react";
import DefaultTextField from '@material-ui/core/TextField';

export const TextField = (props) => {
	const { label, onChange, field = {}, form = {}, type, disabled, defaultValue, rows, multiline } = props;
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
			helperText={error ? helperText : ''}
			fullWidth
			margin="normal"
			variant="outlined"
			error={error}
			onChange={onFieldChange}
			value={field.value}
			type={type}
			disabled={disabled}
			defaultValue={defaultValue}
			rows={rows}
			multiline={multiline}
		/>
	)
}

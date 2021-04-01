import React from 'react';
import { Autocomplete as DefaultAutocomplete } from '@material-ui/lab';
import { TextField } from "@material-ui/core";

export const AutoComplete = (props) => {
	const { label, onChange, field = {}, form = {}, options } = props;
	const { setFieldValue, errors = {}, touched = {} } = form;
	const helperText = errors[field.name]
	const error = helperText && touched[field.name]

	const onFieldChange = (_, value) => {
		field.name && setFieldValue && setFieldValue(field.name, value.id || '');
		onChange && onChange(value);
	}

	return (
		<DefaultAutocomplete
			options={options}
			getOptionLabel={(option) => option.name}
			renderInput={(params) => <TextField {...params} label={label} variant="outlined" error={error} helperText={error ? helperText : ''} />}
			onChange={onFieldChange}
			value={field.value}
			getOptionSelected={(option, value) => option.id === value}
		/>
	)
}

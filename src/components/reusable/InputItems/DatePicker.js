import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import get from 'lodash.get';

export const DatePicker = (props) => {
	const { label, onChange, field = {}, form = {}, type, disabled, fieldPath } = props;
	const { setFieldValue, errors = {}, touched = {} } = form;
	const helperText = fieldPath ? get(errors, fieldPath, '') : errors[field.name]
	let error = false;

	if (helperText) {
		error = fieldPath ? get(touched, fieldPath, false) : touched[field.name]
	}

	const onFieldChange = (date) => {
		field.name && setFieldValue && setFieldValue(field.name, date);
		onChange && onChange(date);
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				autoOk
				label={label}
				style={{ margin: '8px 0' }}
				helperText={error ? helperText : ''}
				format="dd/MM/yyyy"
				margin="normal"
				inputVariant="outlined"
				variant="inline"
				error={error}
				onChange={onFieldChange}
				value={field.value}
				disabled={disabled}
				InputAdornmentProps={{ position: "start" }}
			/>
		</MuiPickersUtilsProvider>
	)
}

import React from "react";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const TimePicker = (props) => {
	const { label, onChange, field = {}, form = {}, type, disabled } = props;
	const { setFieldValue, errors = {}, touched = {} } = form;
	const helperText = errors[field.name]
	const error = helperText && touched[field.name]

	const onFieldChange = (time) => {
		field.name && setFieldValue && setFieldValue(field.name, time);
		onChange && onChange(time);
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardTimePicker
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
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
			/>
		</MuiPickersUtilsProvider>

	)
}

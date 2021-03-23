import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const DatePicker = (props) => {
	const { label, onChange, field = {}, form = {}, type, disabled } = props;
	const { setFieldValue, errors = {}, touched = {} } = form;
	const helperText = errors[field.name]
	const error = helperText && touched[field.name]

	const onFieldChange = (date) => {
		field.name && setFieldValue && setFieldValue(field.name, date);
		onChange && onChange(date);
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				label={label}
				style={{ margin: '8px 0' }}
				helperText={error ? helperText : ''}
				fullWidth
				format="MM/dd/yyyy"
				margin="normal"
				variant="outlined"
				error={error}
				onChange={onFieldChange}
				value={field.value}
				type={type}
				disabled={disabled}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	)
}

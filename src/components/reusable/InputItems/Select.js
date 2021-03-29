import React from "react";
import { Select as DefaultSelect, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
import get from 'lodash.get';

const useStyles = makeStyles(() => ({
	formControl: {
		minWidth: 120,
	},
	label: {
		marginBottom: 0,
	}
}));

export const Select = (props) => {
	const { label, onChange, field = {}, form = {}, options, disabled, fieldPath } = props;
	const { setFieldValue, errors = {}, touched = {} } = form;
	const helperText = fieldPath ? get(errors, fieldPath, '') : errors[field.name]
	let error = false;

	if (helperText) {
		error = fieldPath ? get(touched, fieldPath, false) : touched[field.name]
	}

	const classes = useStyles();

	const onFieldChange = (event) => {
		const { target: { value } } = event;

		field.name && setFieldValue && setFieldValue(field.name, value || '');
		onChange && onChange(value);
	}

	return (
		<FormControl style={{ width: '100%' }} variant="outlined" className={classes.formControl}>
			<InputLabel className={classes.label} id={label} style={error ? { color: 'red' } : {}}>
				{label}
			</InputLabel>
			<DefaultSelect
				labelId={label}
				id={`${label}-select`}
				style={{ margin: '8px 0' }}
				fullWidth
				onChange={onFieldChange}
				className={classes.selectEmpty}
				value={field.value}
				label={label}
				disabled={disabled}
			>
				{options.map((option, index) => {
					if (typeof option === 'object') {
						return <MenuItem key={index} value={option.id || ''}>{option.name || ''}</MenuItem>
					}
					return <MenuItem key={index} value={option}>{option}</MenuItem>
				})}
			</DefaultSelect>
			<FormHelperText style={{ color: 'red' }}>{error ? helperText : ''}</FormHelperText>
		</FormControl>
	)
}

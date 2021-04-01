import React from "react";
import { FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText, makeStyles, Checkbox } from '@material-ui/core';
import get from 'lodash.get';

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

export const CheckboxGroup = (props) => {
	const classes = useStyles();
	const { label, checkboxOptions = [], field = {}, form = {}, onChange, fieldPath, disabled, selectAll } = props;
	const { setFieldValue, errors = {}, touched = {} } = form;
	const helperText = fieldPath ? get(errors, fieldPath, '') : errors[field.name]
	let error = false;

	if (helperText) {
		error = fieldPath ? get(touched, fieldPath, false) : touched[field.name]
	}

	const onFieldChange = (event) => {
		const { target: { name, checked } } = event;
		let temp = field.value || [];

		if (checked) {
			temp.push(name);
		} else {
			temp = temp.filter(i => i !== name);
		}

		field.name && setFieldValue && setFieldValue(field.name, temp);
		onChange && onChange(temp);
	}

	return (
		<FormControl required error={error} component="fieldset" className={classes.formControl}>
			{label && <FormLabel>{label}</FormLabel>}
			<FormGroup style={{ display: 'flex', flexFlow: 'row wrap' }}>
				{checkboxOptions.map(option => {
					return (
						<FormControlLabel
							control={(
								<Checkbox
									disabled={disabled}
									color="primary"
									checked={selectAll ? true : (field.value || []).includes(option.id)}
									onChange={onFieldChange}
									name={option.id}
								/>
							)}
							label={option.name}
						/>
					)
				})}
			</FormGroup>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	)
}
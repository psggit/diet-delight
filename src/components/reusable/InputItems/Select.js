import React from "react";
import { Select as DefaultSelect, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
    },
}));

export const Select = (props) => {
    const { label, onChange, field = {}, form = {}, options } = props;
    const { setFieldValue, errors = {}, touched = {} } = form;
    const helperText = errors[field.name]
    const error = helperText && touched[field.name]

    const classes = useStyles();

    const onFieldChange = (event) => {
        const { target: { value } } = event;

        field.name && setFieldValue && setFieldValue(field.name, value || '');
        onChange && onChange(value);
    }

    return (
        <FormControl style={{ width: '100%' }} className={classes.formControl}>
            <InputLabel style={error ? { color: 'red' } : {}} shrink>
                {label}
            </InputLabel>
            <DefaultSelect
                labelId="demo-simple-select-placeholder-label-label"
                style={{ margin: 8 }}
                fullWidth
                onChange={onFieldChange}
                className={classes.selectEmpty}
                value={field.value}
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

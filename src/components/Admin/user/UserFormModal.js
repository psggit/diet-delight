import React from "react";
import { Button, Grid } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { GENDER_TYPE } from '../Constants';

const UserFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {}, roleOptions = [], showRoleField = true } = props;

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('Please enter First Name'),
		lastName: Yup.string().required('Please enter Last Name'),
		email: Yup.string().required('Please enter Email'),
		password: Yup.string().when('email', {
			is: () => mode === 'Add',
			then: Yup.string().required('Please enter Password'),
			otherwise: Yup.string().nullable(),
		}),
		age: Yup.number(),
		gender: Yup.string().required('Please enter Gender'),
		phoneNumber: Yup.string(),
		primaryAddressLine1: Yup.string(),
		primaryAddressLine2: Yup.string(),
		secondaryAddressLine1: Yup.string(),
		secondaryAddressLine2: Yup.string(),
		role: Yup.string(),
		bmi: Yup.string(),
		calories: Yup.string(),
	});

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} User`}
			requireFooter={false}
		>
			<Formik
				initialValues={values}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{(formProps) => {
					return (
						<Form>
							<Field
								name="firstName"
								component={TextField}
								label="First Name*"
							/>
							<Field
								name="lastName"
								component={TextField}
								label="Last Name*"
							/>
							<Grid container spacing={2}>
								<Grid item xs>
									<Field name="age" component={TextField} label="Age" />
								</Grid>
								<Grid item xs>
									<Field
										name="gender"
										component={Select}
										label="Gender"
										options={GENDER_TYPE}
									/>
								</Grid>
							</Grid>
							<Field
								name="email"
								component={TextField}
								label="Email*"
							/>
							{mode === 'Add' && <Field
								name="password"
								component={TextField}
								label="Password*"
								type="password"
							/>}
							<Field
								name="phoneNumber"
								component={TextField}
								label="Phone Number"
							/>
							<Grid container spacing={2}>
								<Grid item xs>
									<Field
										name="primaryAddressLine1"
										component={TextField}
										label="Primary Address Line 1"
									/>
								</Grid>
								<Grid item xs>
									<Field
										name="primaryAddressLine2"
										component={TextField}
										label="Primary Address Line 2"
									/>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs>
									<Field
										name="secondaryAddressLine1"
										component={TextField}
										label="Secondary Address Line 1"
									/>
								</Grid>
								<Grid item xs>
									<Field
										name="secondaryAddressLine2"
										component={TextField}
										label="Secondary Address Line 2"
									/>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs>
									<Field
										name="bmi"
										component={TextField}
										label="BMI"
									/>
								</Grid>
								<Grid item xs>
									<Field
										name="calories"
										component={TextField}
										label="Recommended Calories"
									/>
								</Grid>
							</Grid>
							{showRoleField && <Field
								name="role"
								component={Select}
								label="Role"
								options={roleOptions}
							/>}
							<Mini style={{ marginTop: "10px" }}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									style={{ margin: "8px 8px 8px 0", background: "#800080", padding: '8px 20px' }}
								>
									Submit
                </Button>
								<Button
									variant="contained"
									color="primary"
									style={{ margin: "8px 0 8px 8px", background: "#800080", padding: '8px 20px' }}
									onClick={onClose}
								>
									Close
              	</Button>
							</Mini>
						</Form>
					)
				}}
			</Formik>
		</Modal>
	)
}

export default UserFormModal;

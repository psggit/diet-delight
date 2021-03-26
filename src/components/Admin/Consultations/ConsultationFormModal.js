import React from "react";
import { Button, Grid } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select, AutoComplete, DatePicker, TimePicker } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { CONSULTATION_STATUS, CONSULTATION_MODE } from '../Constants';

const validationSchema = Yup.object().shape({
	customer: Yup.string().required('Please select Customer'),
	consultant: Yup.string().required('Please select Consultant'),
	consultationPackage: Yup.string().required('Please select Consultation Package'),
	status: Yup.string().required('Please select Status'),
	email: Yup.string().nullable(),
	mobile: Yup.string().nullable(),
	mode: Yup.string().required('Please select Mode'),
	appointmentDate: Yup.date(),
	appointmentTime: Yup.date(),
});

const ConsultationFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {}, customers = [], consultants, consultationPackages } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Consultation`}
			requireFooter={false}
		>
			<Formik
				initialValues={{ 
					...values, 
					mode: (typeof values.mode === 'number') ? values.mode + 1 : '', 
					status: (typeof values.status === 'number') ? values.status + 1 : '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit({...values, status: values.status - 1, mode: values.mode - 1})}
			>
				{({ setFieldValue, values: { email, mobile } }) => (
					<Form>
						<Field
							name="customer"
							component={Select}
							label="Customer*"
							options={customers}
							onChange={(value) => {
								const selectedCustomer = customers.find((c) => c.id === value) || { email: '', mobile: '' }

								setFieldValue('email', selectedCustomer.email);
								setFieldValue('mobile', selectedCustomer.mobile);
							}}
						/>
						<Field
							name="email"
							component={TextField}
							label="Email"
							defaultValue={email}
							disabled
						/>
						<Field
							name="mobile"
							component={TextField}
							label="Mobile"
							defaultValue={mobile}
							disabled
						/>
						<Field
							name="consultant"
							component={Select}
							label="Consultant*"
							options={consultants}
						/>
						<div style={{ marginTop: '12px' }}>
							<Field
								name="consultationPackage"
								component={Select}
								label="Consultation Package*"
								options={consultationPackages}
							/>
						</div>
						<Grid container spacing={2} style={{ marginTop: '12px' }}>
							<Grid item xs>
								<Field
									name="status"
									component={Select}
									label="Status*"
									options={CONSULTATION_STATUS.map((option) => ({ ...option, id: option.id + 1 }))}
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="mode"
									component={Select}
									label="Mode"
									options={CONSULTATION_MODE.map((option) => ({ ...option, id: option.id + 1 }))}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="appointmentDate"
									component={DatePicker}
									label="Appointment Date"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="appointmentTime"
									component={TimePicker}
									label="Appointment Time"
								/>
							</Grid>
						</Grid>

						<Field
							name="notes"
							component={TextField}
							label="Notes"
							multiline
							rows={4}
						/>
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
				)}
			</Formik>
		</Modal>
	)
}

export default ConsultationFormModal;

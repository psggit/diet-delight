import React from "react";
import { Button, Grid } from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { TRANSACTION_PURCHASE_STATUS } from '../Constants';

const validationSchema = Yup.object().shape({
	user: Yup.string().required('Please select User'),
	consultationPackage: Yup.string().required('Please select Consultation Package'),
	paymentId: Yup.string().required('Please enter Payment Id'),
	amountPaid: Yup.number().required('Please enter Amount paid'),
	status: Yup.string(),
	billingAddressLine1: Yup.string(),
	billingAddressLine2: Yup.string(),
});

const ConsultationPurchaseFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {}, customers = [], consultationPackages = [] } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Consultation Purchase`}
			requireFooter={false}
		>
			<Formik
				initialValues={{ ...values, status: (typeof values.status === 'number') ? values.status + 1 : '', }}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit({ ...values, status: values.status - 1 })}
			>
				{() => (
					<Form>
						<Field
							name="user"
							component={Select}
							label="Customer*"
							options={customers}
							disabled={mode === 'Update'}
						/>
						<Field
							name="consultationPackage"
							component={Select}
							label="Consultation Package*"
							options={consultationPackages}
						/>
						<Field
							name="paymentId"
							component={TextField}
							label="Payment Id*"
						/>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="amountPaid"
									component={TextField}
									label="Amount Paid*"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="status"
									component={Select}
									label="Status"
									options={TRANSACTION_PURCHASE_STATUS.map(option => ({ ...option, id: option.id + 1 }))}
								/>
							</Grid>
						</Grid>
						<Field
							name="billingAddressLine1"
							component={TextField}
							label="Billing Address Line 1"
						/>
						<Field
							name="billingAddressLine2"
							component={TextField}
							label="Billing Address Line 2"
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

export default ConsultationPurchaseFormModal;

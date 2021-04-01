import React from "react";
import { Button, Grid } from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select, CheckboxGroup, DatePicker } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { WEEK_DAYS, TRANSACTION_PURCHASE_STATUS } from '../Constants';

const validationSchema = Yup.object().shape({
	user: Yup.string().required('Please select User'),
	mealPlan: Yup.string().required('Please select Meal Plan'),
	paymentId: Yup.string().required('Please enter Payment Id'),
	amountPaid: Yup.number().required('Please enter Amount paid'),
	status: Yup.string(),
	startDate: Yup.date().required('Please select Start Date'),
	endDate: Yup.date(),
	billingAddressLine1: Yup.string(),
	billingAddressLine2: Yup.string(),
	shippingAddressLine1: Yup.string(),
	shippingAddressLine2: Yup.string(),
	kcal: Yup.number(),
	portions: Yup.number(),
	weekdays: Yup.array().nullable(),
});

const MealPurchaseFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {}, customers = [], mealPlans = [] } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Meal Plan Subscription`}
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
							name="mealPlan"
							component={Select}
							label="Meal Plan*"
							options={mealPlans}
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
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="startDate"
									component={DatePicker}
									label="Start Date*"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="endDate"
									component={DatePicker}
									label="End Date"
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="billingAddressLine1"
									component={TextField}
									label="Billing Address Line 1"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="billingAddressLine2"
									component={TextField}
									label="Billing Address Line 2"
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="shippingAddressLine1"
									component={TextField}
									label="Shipping Address Line 1"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="shippingAddressLine2"
									component={TextField}
									label="Shipping Address Line 2"
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="kcal"
									component={TextField}
									label="Calories"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="portions"
									component={TextField}
									label="Portions"
								/>
							</Grid>
						</Grid>
						<Field
							name="weekdays"
							component={CheckboxGroup}
							label="Week Days"
							checkboxOptions={WEEK_DAYS}
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

export default MealPurchaseFormModal;

import React from "react";
import { Button, Grid } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { CONSULTATION_PACKAGE_STATUS } from '../Constants';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Please enter Name'),
	duration: Yup.number().required('Please enter Duration'),
	order: Yup.string().required('Pleae enter Order'),
	status: Yup.string().required('Pleae select Status'),
	subtitle: Yup.string(),
	details: Yup.string(),
	price: Yup.number().required('Pleae enter Price'),
	salePrice: Yup.number().required('Pleae enter Sale Price'),

});

const ConsultantPackageFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {} } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Consultation Package`}
			requireFooter={false}
		>
			<Formik
				initialValues={values}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{(formValues) => (
					<Form>
						<Field
							name="name"
							component={TextField}
							label="Name*"
						/>
						<Field
							name="subtitle"
							component={TextField}
							label="Subtitle"
						/>
						<Field
							name="order"
							component={TextField}
							label="Order*"
						/>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="duration"
									component={TextField}
									label="Duration*"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="status"
									component={Select}
									label="Status*"
									options={CONSULTATION_PACKAGE_STATUS}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="price"
									component={TextField}
									label="Price"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="salePrice"
									component={TextField}
									label="Sale Price"
								/>
							</Grid>
						</Grid>
						<Field
							name="details"
							component={TextField}
							label="Details"
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

export default ConsultantPackageFormModal;

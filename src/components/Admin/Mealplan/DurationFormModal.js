import React, { useState } from "react";
import { Button } from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";

const validationSchema = Yup.object().shape({
	title: Yup.string().required('Please enter Title'),
	subtitle: Yup.string(),
	duration: Yup.number().required('Please enter Duration'),
	order: Yup.number().required('Please enter Order'),
	details: Yup.string(),
});

const DurationFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {} } = props;

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Duration`}
			requireFooter={false}
		>
			<Formik
				initialValues={values}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit(values)}
			>
				{() => (
					<Form>
						<Field
							name="title"
							component={TextField}
							label="Title*"
						/>
						<Field
							name="subtitle"
							component={TextField}
							label="Subtitle"
						/>
						<Field
							name="duration"
							component={TextField}
							label="Duration*"
						/>
						<Field
							name="order"
							component={TextField}
							label="Order*"
							placeholder="Order"
						/>
						<Field
							name="details"
							component={TextField}
							label="Details"
							multiline
							rows={3}
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

export default DurationFormModal;

import React, { useState } from "react";
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
	order: Yup.string().required('Please enter Order'),
	status: Yup.string().required('Please select Status'),
	subtitle: Yup.string(),
	details: Yup.string(),
	price: Yup.number().required('Please enter Price'),
	salePrice: Yup.number().required('Please enter Sale Price'),

});

const ConsultantPackageFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {} } = props;
	const [file, setFile] = useState('');

	const processImage = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			setFile(reader.result);
		}

		reader.readAsDataURL(e.target.files[0]);
	}

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title={`${mode} Consultation Package`}
			requireFooter={false}
		>
			<Formik
				initialValues={{ ...values, status: (typeof values.status === 'number') ? values.status + 1 : '' }}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit({ ...values, status: values.status - 1, picture: file ? file : '' })}
			>
				{() => (
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
									options={CONSULTATION_PACKAGE_STATUS.map((option) => ({ ...option, id: option.id + 1 }))}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="price"
									component={TextField}
									label="Price*"
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="salePrice"
									component={TextField}
									label="Sale Price*"
								/>
							</Grid>
						</Grid>
						{mode === 'Add' && (
							<Field
								name="picture"
								component={TextField}
								label="Picture"
								type="file"
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									onChange: (e) => {
										if (['image/jpg', 'image/jpeg', 'image/png'].includes(e.target.files[0].type)) {
											processImage(e);
										} else {
											e.target.value = '';
										}
									},
								}}
							/>
						)}
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

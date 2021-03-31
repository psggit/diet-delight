import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from '../../reusable/InputItems';
import Modal from '../../reusable/Modal';
import { Mini } from "../Elements";
import { MEAL_PLAN_STATUS, MEAL_PLAN_TYPE } from '../Constants';

const validationSchema = Yup.object().shape({
	title: Yup.string().required('Please enter Title'),
	subtitle: Yup.string(),
	menu: Yup.string().required('Please select Menu'),
	duration: Yup.string().required('Please select Duration'),
	order: Yup.number().required('Please enter Order'),
	status: Yup.string(),
	type: Yup.string(),
	price: Yup.number(),
	salePrice: Yup.number(),
	details: Yup.string(),
});

const MealPlanFormModal = (props) => {
	const { visible, onClose, onSubmit, mode, values = {}, durations = [], menus = [] } = props;
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
			title={`${mode} Meal Plan`}
			requireFooter={false}
		>
			<Formik
				initialValues={{
					...values,
					type: (typeof values.type === 'number') ? values.type + 1 : '',
					status: (typeof values.status === 'number') ? values.status + 1 : ''
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit({ ...values, type: values.type - 1, status: values.status - 1, picture: file ? file : '' })}
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
							name="menu"
							component={Select}
							label="Menu*"
							options={menus}
						/>
						<Field
							name="duration"
							component={Select}
							label="Duration*"
							options={durations}
						/>
						<Field
							name="order"
							component={TextField}
							label="Order*"
							placeholder="Order"
						/>
						<Grid container spacing={2}>
							<Grid item xs>
								<Field
									name="status"
									component={Select}
									label="Status"
									options={MEAL_PLAN_STATUS.map((option) => ({ ...option, id: option.id + 1 }))}
								/>
							</Grid>
							<Grid item xs>
								<Field
									name="type"
									component={Select}
									label="Type"
									options={MEAL_PLAN_TYPE.map((option) => ({ ...option, id: option.id + 1 }))}
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

export default MealPlanFormModal;
